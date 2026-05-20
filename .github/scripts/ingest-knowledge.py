#!/usr/bin/env python3
"""
Ingest ISS content/lessons.json into KernelBot MySQL `knowledge` table.

Lê JSONs enriquecidos em jsons/<discipline>/, prefixa o body com bloco de
metadados léxicos (Opção B) e persiste um documento unificado por lição no
campo `content`. O chunking BM25 (~500 palavras, overlap 50) ocorre no
KernelBot/engine/database.py em RAM.

Normalization matches .github/scripts/validate-catalog.mjs (strip, lower, _ → -).
"""

from __future__ import annotations

import json
import os
import re
import sys
from datetime import datetime, timezone
from pathlib import Path

import pymysql

ROOT = Path(__file__).resolve().parents[2]
LESSONS_PATH = ROOT / "content" / "lessons.json"
JSONS_DIR = ROOT / "jsons"
REPORT_DIR = ROOT / ".github" / "reports"
REPORT_PATH = REPORT_DIR / "ingest-report.json"

FRONTMATTER_RE = re.compile(r"\A---\r?\n.*?\r?\n---\r?\n?", re.DOTALL)

META_START = "[CONCEITOS E KEYWORDS DA AULA PARA INDEXAÇÃO LÉXICA]"
META_END = "====== FIM DOS METADADOS ======"

# Alinhado com KernelBot/engine/database.py — mitiga OOM na origem (Job 2).
MAX_CONTENT_CHARS = 4_000_000

_SENSITIVE_ERR_RE = re.compile(
    r"(password\s*[=:]\s*)[^\s,\)\'\"]+", re.IGNORECASE
)


def _sanitize_error(exc: BaseException | str) -> str:
    """Evita vazar credenciais em stderr / ingest-report.json."""
    return _SENSITIVE_ERR_RE.sub(r"\1***", str(exc))


UPSERT_SQL = """
INSERT INTO knowledge (discipline, slug, title, `order`, content, active)
VALUES (%s, %s, %s, %s, %s, 1)
ON DUPLICATE KEY UPDATE
  title = VALUES(title),
  `order` = VALUES(`order`),
  content = VALUES(content),
  active = 1
"""


def normalize_part(value: str) -> str:
    return str(value or "").strip().lower().replace("_", "-")


def normalize_lesson_key(discipline: str, slug: str) -> str:
    return f"{normalize_part(discipline)}:{normalize_part(slug)}"


def strip_frontmatter(text: str) -> str:
    if not text.startswith("---"):
        return text
    stripped, count = FRONTMATTER_RE.subn("", text, count=1)
    return stripped if count else text


def lesson_json_path(discipline: str, slug: str, order: int) -> Path:
    return JSONS_DIR / discipline / f"{discipline}__{order:02d}__{slug}.json"


def build_meta_header(
    discipline: str,
    name: str,
    concepts: list,
    keywords: list,
    learning_objectives: list,
) -> str:
    concepts_str = ", ".join(str(c) for c in concepts) if concepts else ""
    keywords_str = ", ".join(str(k) for k in keywords) if keywords else ""
    objectives_str = (
        "; ".join(str(o) for o in learning_objectives) if learning_objectives else ""
    )
    return (
        f"{META_START}\n"
        f"Disciplina: {discipline}\n"
        f"Título: {name}\n"
        f"Conceitos: {concepts_str}\n"
        f"Keywords: {keywords_str}\n"
        f"Objetivos: {objectives_str}\n"
        f"{META_END}\n\n"
    )


def _as_str_list(value: object, field: str) -> list:
    if value is None:
        return []
    if not isinstance(value, list):
        raise ValueError(f"campo {field} deve ser array")
    return value


def load_lesson_json(discipline: str, slug: str, order: int) -> str:
    path = lesson_json_path(discipline, slug, order)
    if not path.is_file():
        raise FileNotFoundError(f"JSON ausente: {path.relative_to(ROOT)}")

    with path.open(encoding="utf-8") as fh:
        data = json.load(fh)
    if not isinstance(data, dict):
        raise ValueError(f"JSON inválido (objeto esperado): {path.relative_to(ROOT)}")

    discipline_val = str(data.get("discipline", "")).strip()
    name = str(data.get("name", "")).strip()
    raw_content = data.get("content")

    if not discipline_val:
        raise ValueError(f"campo discipline vazio: {path.relative_to(ROOT)}")
    if not name:
        raise ValueError(f"campo name vazio: {path.relative_to(ROOT)}")
    if not isinstance(raw_content, str) or not raw_content.strip():
        raise ValueError(f"campo content vazio: {path.relative_to(ROOT)}")

    concepts = _as_str_list(data.get("concepts"), "concepts")
    keywords = _as_str_list(data.get("keywords"), "keywords")
    learning_objectives = _as_str_list(data.get("learning_objectives"), "learning_objectives")

    meta_header = build_meta_header(
        discipline_val,
        name,
        concepts,
        keywords,
        learning_objectives,
    )
    body = strip_frontmatter(raw_content)
    if not body.strip():
        raise ValueError("conteúdo vazio após frontmatter")

    return meta_header + body


def load_lessons() -> list[dict]:
    with LESSONS_PATH.open(encoding="utf-8") as fh:
        data = json.load(fh)
    if not isinstance(data, list):
        raise ValueError("lessons.json deve ser um array")
    return data


def db_connect() -> pymysql.connections.Connection:
    host = os.environ.get("DB_HOST", "").strip()
    name = os.environ.get("DB_NAME", "").strip()
    user = os.environ.get("DB_USER", "").strip()
    password = os.environ.get("DB_PASSWORD", "")
    port = int(os.environ.get("DB_PORT", "3306") or "3306")

    missing = [k for k, v in [("DB_HOST", host), ("DB_NAME", name), ("DB_USER", user)] if not v]
    if missing:
        raise RuntimeError(f"variáveis de ambiente ausentes: {', '.join(missing)}")

    return pymysql.connect(
        host=host,
        port=port,
        database=name,
        user=user,
        password=password,
        charset="utf8mb4",
        autocommit=False,
    )


def write_report(report: dict) -> None:
    REPORT_DIR.mkdir(parents=True, exist_ok=True)
    with REPORT_PATH.open("w", encoding="utf-8") as fh:
        json.dump(report, fh, indent=2, ensure_ascii=False)
        fh.write("\n")
    print(f"Relatório: {REPORT_PATH}")


def main() -> int:
    errors: list[str] = []
    processed_keys: list[str] = []
    upserted_count = 0
    deactivated_count = 0

    report_base = {
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "success": False,
        "upserted_count": 0,
        "deactivated_count": 0,
        "errors": errors,
        "processed_keys": processed_keys,
    }

    try:
        lessons = load_lessons()
    except Exception as exc:
        errors.append(_sanitize_error(exc))
        write_report({**report_base, "errors": errors})
        print(f"Ingest falhou: {_sanitize_error(exc)}", file=sys.stderr)
        return 1

    rows: list[tuple[str, str, str, int, str]] = []

    for i, lesson in enumerate(lessons):
        prefix = f"lessons[{i}]"
        if not isinstance(lesson, dict):
            errors.append(f"{prefix}: entrada inválida")
            continue

        discipline_raw = str(lesson.get("discipline", "")).strip()
        slug_raw = str(lesson.get("slug", "")).strip()
        title = str(lesson.get("title", "")).strip()
        order = lesson.get("order")
        file_rel = str(lesson.get("file", "")).replace("\\", "/").strip()

        if not discipline_raw or not slug_raw or not title or order is None or not file_rel:
            errors.append(f"{prefix}: campos obrigatórios ausentes")
            continue

        discipline = normalize_part(discipline_raw)
        slug = normalize_part(slug_raw)
        key = normalize_lesson_key(discipline, slug)

        try:
            order_int = int(order)
        except (TypeError, ValueError):
            errors.append(f"{prefix} ({key}): order inválido: {order!r}")
            continue

        try:
            content = load_lesson_json(discipline, slug, order_int)
        except Exception as exc:
            errors.append(f"{prefix} ({key}): {_sanitize_error(exc)}")
            continue

        if len(content) > MAX_CONTENT_CHARS:
            errors.append(
                f"{prefix} ({key}): content excede {MAX_CONTENT_CHARS} caracteres "
                f"({len(content)}) — rejeitado antes do UPSERT"
            )
            continue

        rows.append((discipline, slug, title, order_int, content))
        processed_keys.append(key)

    if errors:
        write_report({**report_base, "errors": errors, "processed_keys": processed_keys})
        print(f"Ingest abortado: {len(errors)} erro(s) em lições.", file=sys.stderr)
        for err in errors:
            print(f"  ERROR: {err}", file=sys.stderr)
        return 1

    if not rows:
        errors.append("nenhuma lição processada — abortando sem desativar registros no banco")
        write_report({**report_base, "errors": errors})
        print(errors[0], file=sys.stderr)
        return 1

    processed_keys.sort()

    try:
        conn = db_connect()
    except Exception as exc:
        errors.append(f"conexão MySQL: {_sanitize_error(exc)}")
        write_report({**report_base, "errors": errors, "processed_keys": processed_keys})
        print(f"Ingest falhou: {_sanitize_error(exc)}", file=sys.stderr)
        return 1

    try:
        with conn:
            with conn.cursor() as cursor:
                for row in rows:
                    cursor.execute(UPSERT_SQL, row)
                    upserted_count += 1

                pair_placeholders = ",".join(["(%s, %s)"] * len(rows))
                deactivate_params: list[str] = []
                for discipline, slug, *_ in rows:
                    deactivate_params.extend([discipline, slug])

                deactivate_sql = (
                    "UPDATE knowledge SET active = 0 "
                    "WHERE active = 1 "
                    f"AND (discipline, slug) NOT IN ({pair_placeholders})"
                )
                cursor.execute(deactivate_sql, deactivate_params)
                deactivated_count = cursor.rowcount

            conn.commit()
    except Exception as exc:
        conn.rollback()
        errors.append(_sanitize_error(exc))
        write_report(
            {
                **report_base,
                "errors": errors,
                "processed_keys": processed_keys,
                "upserted_count": 0,
                "deactivated_count": 0,
            }
        )
        print(f"Ingest falhou (rollback): {_sanitize_error(exc)}", file=sys.stderr)
        return 1

    report = {
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "success": True,
        "upserted_count": upserted_count,
        "deactivated_count": deactivated_count,
        "errors": [],
        "processed_keys": processed_keys,
    }
    write_report(report)
    print(
        f"Ingest OK: {upserted_count} upsert(s), "
        f"{deactivated_count} desativado(s), {len(processed_keys)} chave(s)."
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
