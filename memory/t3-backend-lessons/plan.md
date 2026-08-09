# Plano T3 — Bloco Backend (3º trimestre)

**Outcome:** Home com filtro `1º|2º|3º|Todos`; 3 disciplinas no catálogo; 15 lições ISS geradas a partir das transcrições + documentos.

## Grafo

| ID | Descrição | Depende | Estado |
|----|-----------|---------|--------|
| T3-INFRA | Filtro UI/JS + `disciplines.json` trimester 3 | — | done |
| T3-MAP | `agents/discipline-map.yaml` + brief mestre | — | done |
| T3-CS01..06 | Lições C# (1 agente/aula) | T3-INFRA, T3-MAP | done |
| T3-JV01..06 | Lições Java (1 agente/aula) | T3-INFRA, T3-MAP | done |
| T3-PB01..03 | Lições Projeto Bloco BK | T3-INFRA, T3-MAP | done |
| T3-INTEGRATE | Atualizar `lessons.json` + `search-index.json` | todos CS/JV/PB | done |
| T3-VALIDATE | JSON parse, unicidade, smoke paths | T3-INTEGRATE | done |

## Critério de fecho

- Filtro 3º mostra as 3 disciplinas; Todos mostra 1+2+3.
- 15 ficheiros `.md` em `content/` com estrutura ISS.
- `lessons.json` / `search-index.json` válidos e alinhados.
