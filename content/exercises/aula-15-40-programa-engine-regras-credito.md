---
title: "Programa — engine de regras de crédito com composição e múltiplos retornos"
slug: "aula-15-40-programa-engine-regras-credito"
difficulty: "hard"
concepts: ["composição de funções", "múltiplos retornos", "tuple unpacking", "parâmetros com valor padrão", "return", "loops for"]
discipline: "python"
learning_goal: "Implementar engine de regras de negócio usando composição de funções e múltiplos retornos para análise de crédito."
exercise_type: "full_program"
stage: 5
context: "validação de dados"
test_cases:
  - input: ""
    output: "Ana: BAIXO | []\nBruno: ALTO | ['Score abaixo do mínimo', 'Comprometimento de renda alto']\nCarla: MEDIO | ['Score abaixo do mínimo']"
---

## Enunciado

Implemente um mini engine de análise de crédito com 3 funções:

1. `calcular_comprometimento(renda, divida)` — retorna `divida / renda * 100`.
2. `classificar_risco(score, comprometimento, limite_comprom=30.0)` — retorna `(risco, motivos)`. Score < 500 → motivo. Comprometimento > limite → motivo. Ambos: `"ALTO"`, um: `"MEDIO"`, nenhum: `"BAIXO"`.
3. `analisar_solicitacoes(solicitacoes)` — retorna lista com `{nome, risco, motivos}`.

```python
solicitacoes = [
    {"nome": "Ana", "renda": 5000.0, "divida": 800.0, "score": 720},
    {"nome": "Bruno", "renda": 3000.0, "divida": 1500.0, "score": 450},
    {"nome": "Carla", "renda": 4000.0, "divida": 500.0, "score": 480},
]
for r in analisar_solicitacoes(solicitacoes):
    print(f"{r['nome']}: {r['risco']} | {r['motivos']}")
```

## Solução

```python
def calcular_comprometimento(renda: float, divida: float) -> float:
    return divida / renda * 100

def classificar_risco(score: int, comprometimento: float, limite_comprom: float = 30.0) -> tuple:
    motivos = []
    if score < 500:
        motivos.append("Score abaixo do mínimo")
    if comprometimento > limite_comprom:
        motivos.append("Comprometimento de renda alto")
    if len(motivos) >= 2:
        risco = "ALTO"
    elif len(motivos) == 1:
        risco = "MEDIO"
    else:
        risco = "BAIXO"
    return risco, motivos

def analisar_solicitacoes(solicitacoes: list) -> list:
    resultados = []
    for s in solicitacoes:
        comprom = calcular_comprometimento(s["renda"], s["divida"])
        risco, motivos = classificar_risco(s["score"], comprom)
        resultados.append({"nome": s["nome"], "risco": risco, "motivos": motivos})
    return resultados
```
