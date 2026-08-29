# Plano T3-WAVE2 — aulas novas StripperScrapper → ISS

**Outcome:** Gerar lições ISS em falta (downloads já no repo; content só até CS06/JV06/PB03) + export `jsons/`.

## Diff (StripperScrapper ≡ ISS downloads)

| Disciplina | Em downloads | Em content | Em falta |
|------------|--------------|------------|----------|
| fundamentos-csharp | 1–12 | 1–6 | **7–12** |
| fundamentos-java | 1–11 | 1–6 | **7–11** |
| projeto-bloco-backend | 1–6 | 1–3 | **4–6** |

Total: **14** lições.

## Policy (SSOT)

- `risk_tier`: standard
- `topology`: fan-out
- `workflow_mode`: standard
- `budget.max_spawns`: **16** (autorizado pelo pedido explícito de orquestrar subagentes por aula; default standard=8)
- `require[]`: gaabwiki_grounding, tests (export/JSON validate)
- `gaabwiki_grounding`: applied (scout iss low_confidence + fallback vault ISS/index + contracts pipeline content)
- `image_attachment`: false
- `pda_spawns`: 0 → sobe com cada spawn

## Grafo

| ID | Estado |
|----|--------|
| W2-MAP | pending |
| W2-CS07..12 | pending |
| W2-JV07..11 | pending |
| W2-PB04..06 | pending |
| W2-INTEGRATE | pending |
| W2-JSON-EXPORT | pending |
| W2-WIKI-LOG | pending |
