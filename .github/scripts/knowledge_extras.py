#!/usr/bin/env python3
"""Rows extra para a tabela `knowledge` do KernelBot, além das lições.

Duas fontes, ambas geradas a cada ingest (idempotente, UPSERT por (discipline, slug)):

1. **Transcrições brutas** (`downloads/<Pasta>/Aula_NN_-_DDMMYYYY.vtt`)
   As lições em `content/` são resumos gerados por LLM — bons para conceito,
   ruins para "o que o professor disse exatamente". Aqui o texto integral entra
   com marcadores `[mm:ss]` a cada ~60 s, para o bot citar o minuto da gravação.
   Nomes de quem fala são removidos (alunos aparecem na transcrição).
   - discipline: a mesma da lição (via `config/vtt-to-content.json`)
   - slug: `transcricao__NN__DDMMYYYY` (o `__NN__` vira "Aula NN" na UI do KernelBot)

2. **Calendário acadêmico** (Google Sheet pública da Infnet, export CSV)
   Uma row por trimestre com resumo de entregas (TP/AT/PB) e a grelha semanal.
   - discipline: `calendario`
   - slug: `calendario-YYYY-trim-N`

Convenção de "extra" (usada por `verify-kernelbot-sync.mjs` para excluir da contagem
de lições): `discipline = 'calendario'` OU `slug LIKE 'transcricao__%'`.

Uso local: `python3 .github/scripts/knowledge_extras.py --dry-run [--calendar-csv caminho.csv]`
"""

from __future__ import annotations

import argparse
import csv
import io
import json
import os
import re
import sys
import urllib.request
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
DOWNLOADS_DIR = ROOT / "downloads"
VTT_CONFIG_PATH = ROOT / "config" / "vtt-to-content.json"
DISCIPLINES_PATH = ROOT / "content" / "disciplines.json"

CALENDAR_DISCIPLINE = "calendario"
TRANSCRIPT_SLUG_PREFIX = "transcricao__"

# Mesmo padrão de `iss-content.mjs` (VTT_LESSON_RE): Aula_NN_-_DDMMYYYY.vtt
VTT_LESSON_RE = re.compile(r"Aula_(\d{1,3})_-_(\d{8})\.vtt$", re.IGNORECASE)
# Zoom exporta `HH:MM:SS.mmm`; alguns ficheiros vêm sem a hora (`MM:SS.mmm`).
VTT_TIMESTAMP_RE = re.compile(r"^(?:(\d{1,2}):)?(\d{1,2}):(\d{2})[.,](\d{3})\s+-->")
VTT_SPEAKER_RE = re.compile(r"^[^:\n]{1,80}:\s+")

# Intervalo entre marcadores [mm:ss]. ~60 s ≈ 100 palavras; chunks BM25 do KernelBot
# têm 500 palavras, logo cada chunk carrega 3–6 marcadores (só a ponta final pode ficar sem).
TRANSCRIPT_MARKER_SECONDS = int(os.environ.get("TRANSCRIPT_MARKER_SECONDS", "60"))

# Aba 2026 do calendário acadêmico Infnet (planilha pública "qualquer pessoa com o link").
CALENDAR_CSV_URL_DEFAULT = (
    "https://docs.google.com/spreadsheets/d/1b-CaoKxQZVM9zH1q0Bruoyf3BimlUiwIJSvL828N5JU"
    "/export?format=csv&gid=210728555"
)

MESES = {
    "jan": 1, "fev": 2, "mar": 3, "abr": 4, "mai": 5, "jun": 6,
    "jul": 7, "ago": 8, "set": 9, "out": 10, "nov": 11, "dez": 12,
}
CALENDAR_TRACKS = (
    (8, "Disciplinas regulares"),
    (9, "Projeto de Bloco (C1)"),
    (10, "Projeto de Bloco (C2)"),
)

Row = tuple[str, str, str, int, str]  # (discipline, slug, title, order, content)


def is_extra(discipline: str, slug: str) -> bool:
    return discipline == CALENDAR_DISCIPLINE or slug.startswith(TRANSCRIPT_SLUG_PREFIX)


# ----------------------------------------------------------------------------
# Transcrições
# ----------------------------------------------------------------------------


def _load_json(path: Path) -> object:
    with path.open("r", encoding="utf-8") as fh:
        return json.load(fh)


def _discipline_titles() -> dict[str, str]:
    try:
        rows = _load_json(DISCIPLINES_PATH)
    except (OSError, json.JSONDecodeError):
        return {}
    return {str(r.get("slug")): str(r.get("title") or r.get("slug")) for r in rows if isinstance(r, dict)}


def _fmt_mmss(seconds: int) -> str:
    return f"[{seconds // 60:02d}:{seconds % 60:02d}]"


def vtt_to_marked_text(vtt: str, marker_every: int = TRANSCRIPT_MARKER_SECONDS) -> str:
    """Texto corrido da transcrição com `[mm:ss]` a cada `marker_every` segundos.

    Remove cabeçalho WEBVTT, índices de cue, nomes de quem fala e linhas vazias.
    Um cue novo abre parágrafo só quando passa um marcador; o resto é juntado
    com espaço para o chunking por palavras do KernelBot não cortar frases curtas.
    """
    parts: list[str] = []
    next_marker = 0
    for raw in vtt.splitlines():
        line = raw.strip()
        if not line or line == "WEBVTT" or line.isdigit():
            continue
        m = VTT_TIMESTAMP_RE.match(line)
        if m:
            secs = int(m.group(1) or 0) * 3600 + int(m.group(2)) * 60 + int(m.group(3))
            if secs >= next_marker:
                parts.append(f"\n{_fmt_mmss(secs)} ")
                next_marker = (secs // marker_every + 1) * marker_every
            continue
        text = VTT_SPEAKER_RE.sub("", line, count=1).strip()
        if text:
            parts.append(text + " ")
    return re.sub(r"[ \t]+\n", "\n", "".join(parts)).strip()


def build_transcript_rows(
    downloads_dir: Path = DOWNLOADS_DIR,
    config_path: Path = VTT_CONFIG_PATH,
) -> tuple[list[Row], list[str]]:
    """Uma row por .vtt mapeado. Devolve (rows, avisos)."""
    warnings: list[str] = []
    try:
        config = _load_json(config_path)
    except (OSError, json.JSONDecodeError) as exc:
        return [], [f"vtt-to-content.json ilegível: {exc}"]
    folders = config.get("disciplines", {}) if isinstance(config, dict) else {}
    titles = _discipline_titles()
    rows: list[Row] = []

    for folder, entry in sorted(folders.items()):
        discipline = str((entry or {}).get("discipline", "")).strip()
        folder_dir = downloads_dir / folder
        if not discipline or not folder_dir.is_dir():
            continue
        disc_title = titles.get(discipline, discipline)
        for vtt_path in sorted(folder_dir.glob("*.vtt")):
            m = VTT_LESSON_RE.search(vtt_path.name)
            if not m:
                warnings.append(f"ignorado (nome fora do padrão Aula_NN_-_DDMMYYYY): {vtt_path.relative_to(ROOT)}")
                continue
            order = int(m.group(1))
            ddmmyyyy = m.group(2)
            try:
                body = vtt_to_marked_text(vtt_path.read_text(encoding="utf-8", errors="replace"))
            except OSError as exc:
                warnings.append(f"{vtt_path.relative_to(ROOT)}: {exc}")
                continue
            if len(body.split()) < 50:
                warnings.append(f"transcrição quase vazia, ignorada: {vtt_path.relative_to(ROOT)}")
                continue
            human_date = f"{ddmmyyyy[:2]}/{ddmmyyyy[2:4]}/{ddmmyyyy[4:]}"
            title = f"Transcrição da aula {order} — {disc_title} ({human_date})"
            header = (
                f"{title}\n"
                f"Transcrição automática da gravação (Zoom). Os marcadores [mm:ss] indicam o "
                f"minuto da gravação: use-os para citar onde o professor falou sobre o assunto.\n\n"
            )
            rows.append((discipline, f"{TRANSCRIPT_SLUG_PREFIX}{order:02d}__{ddmmyyyy}", title, order, header + body))
    return rows, warnings


# ----------------------------------------------------------------------------
# Calendário
# ----------------------------------------------------------------------------


def _parse_day(cell: str, year: int) -> date | None:
    m = re.match(r"(\d{1,2})/([a-zç]{3})", cell.strip().lower())
    if not m or m.group(2) not in MESES:
        return None
    try:
        return date(year, MESES[m.group(2)], int(m.group(1)))
    except ValueError:
        return None


def _fmt_range(start: date | None, end: date | None) -> str:
    if not start or not end:
        return "?"
    if start.month == end.month:
        return f"{start.day:02d} a {end.day:02d}/{start.month:02d}"
    return f"{start.day:02d}/{start.month:02d} a {end.day:02d}/{end.month:02d}"


def _norm_cell(text: str) -> str:
    return re.sub(r"\s+", " ", text.replace("|", ";")).strip()


_DELIVERY_PATTERNS = (
    (re.compile(r"ENTREGA DO (TP\d)", re.I), "Entrega do {0}"),
    (re.compile(r"ENTREGA/ARGUI[ÇC][ÃA]O DO ASSESSMENT", re.I), "Entrega e arguição do AT (Assessment)"),
    (re.compile(r"REENTREGA DO AT", re.I), "Vista e reentrega do AT"),
    (re.compile(r"ENTREGA DO PROJETO DE BLOCO", re.I), "Entrega do Projeto de Bloco"),
    (re.compile(r"APRESENTA[ÇC][ÕO]ES DE PROJETOS DE BLOCO", re.I), "Apresentações do Projeto de Bloco"),
)


def _deliveries(text: str) -> list[str]:
    out: list[str] = []
    for pattern, label in _DELIVERY_PATTERNS:
        for m in pattern.finditer(text):
            out.append(label.format(*m.groups()))
    return out


def fetch_calendar_csv(source: str, timeout: int = 30) -> str:
    if source.startswith(("http://", "https://")):
        req = urllib.request.Request(source, headers={"User-Agent": "ISS-knowledge-extras/1.0"})
        with urllib.request.urlopen(req, timeout=timeout) as resp:  # noqa: S310 — URL fixa/config
            return resp.read().decode("utf-8")
    return Path(source).read_text(encoding="utf-8")


def build_calendar_rows(csv_text: str) -> list[Row]:
    """Uma row por (ano, trimestre) presente no CSV."""
    weeks_by_trim: dict[tuple[int, int], list[dict]] = {}
    for row in csv.reader(io.StringIO(csv_text)):
        if not row:
            continue
        m = re.match(r"(\d{4}) Trim (\d) \| Semana (\d+)", row[0].strip())
        if not m:
            continue
        year, trim, week = int(m.group(1)), int(m.group(2)), int(m.group(3))
        cell = lambda i: _norm_cell(row[i]) if i < len(row) else ""  # noqa: E731
        weeks_by_trim.setdefault((year, trim), []).append({
            "week": week,
            "start": _parse_day(row[1], year) if len(row) > 1 else None,
            "end": _parse_day(row[6], year) if len(row) > 6 else None,
            "obs": cell(7),
            "tracks": [(label, cell(col)) for col, label in CALENDAR_TRACKS],
        })

    rows: list[Row] = []
    for (year, trim), weeks in sorted(weeks_by_trim.items()):
        weeks.sort(key=lambda w: w["week"])
        first, last = weeks[0], weeks[-1]
        title = f"Calendário acadêmico {year} — Trimestre {trim}"
        lines = [
            title,
            f"Período: {_fmt_range(first['start'], last['end'])}/{year}. Fonte: calendário oficial da Infnet "
            f"(atividades típicas por semana; o dia e a hora exatos de cada entrega são definidos pelo "
            f"professor no portal).",
            "",
            "Resumo de entregas e avaliações (TP = Teste de Performance, AT = Assessment, PB = Projeto de Bloco):",
        ]
        for w in weeks:
            for label, text in w["tracks"]:
                for item in _deliveries(text):
                    lines.append(f"- {item} — {label}: semana {w['week']}, {_fmt_range(w['start'], w['end'])}/{year}")
        lines += ["", "Semana a semana:"]
        for w in weeks:
            parts = [f"{label}: {text}" for label, text in w["tracks"] if text]
            if w["obs"]:
                parts.append(f"Observações: {w['obs']}")
            lines.append(f"Semana {w['week']} ({_fmt_range(w['start'], w['end'])}/{year}) — " + " | ".join(parts))
        # Sem `__N__` no slug: o KernelBot usa esse padrão para rotular "Aula N" na UI.
        rows.append((CALENDAR_DISCIPLINE, f"calendario-{year}-trim-{trim}", title, trim, "\n".join(lines)))
    return rows


def build_extra_rows(calendar_source: str | None = None) -> tuple[list[Row], list[str]]:
    """Transcrições + calendário. Calendário indisponível vira aviso, nunca erro."""
    rows, warnings = build_transcript_rows()
    source = calendar_source or os.environ.get("CALENDAR_CSV_URL", CALENDAR_CSV_URL_DEFAULT)
    if source.strip().lower() in {"", "0", "off", "false"}:
        return rows, warnings
    try:
        rows.extend(build_calendar_rows(fetch_calendar_csv(source)))
    except Exception as exc:  # noqa: BLE001 — rede/planilha não podem derrubar o ingest
        warnings.append(f"calendário indisponível ({type(exc).__name__}: {exc}) — rows de calendário omitidas")
    return rows, warnings


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__.split("\n", 1)[0])
    ap.add_argument("--dry-run", action="store_true", help="só imprime estatísticas")
    ap.add_argument("--calendar-csv", help="URL ou caminho local do CSV (default: planilha pública 2026)")
    ap.add_argument("--dump", metavar="SLUG", help="imprime o content de uma row")
    args = ap.parse_args()

    rows, warnings = build_extra_rows(args.calendar_csv)
    for w in warnings:
        print(f"AVISO: {w}", file=sys.stderr)
    if args.dump:
        for disc, slug, title, order, content in rows:
            if slug == args.dump:
                print(content)
                return 0
        print(f"slug não encontrado: {args.dump}", file=sys.stderr)
        return 1
    by_disc: dict[str, int] = {}
    for disc, *_ in rows:
        by_disc[disc] = by_disc.get(disc, 0) + 1
    print(f"rows extra: {len(rows)}")
    for disc, n in sorted(by_disc.items()):
        print(f"  {disc}: {n}")
    biggest = max(rows, key=lambda r: len(r[4]), default=None)
    if biggest:
        print(f"maior content: {len(biggest[4]):,} chars ({biggest[1]})")
    return 0


if __name__ == "__main__":
    sys.exit(main())
