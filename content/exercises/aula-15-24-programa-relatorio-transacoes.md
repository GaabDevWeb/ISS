---
title: "Programa — relatório de transações com múltiplos retornos e composição"
slug: "aula-15-24-programa-relatorio-transacoes"
difficulty: "hard"
concepts: ["múltiplos retornos", "composição de funções", "parâmetros com valor padrão", "tuple unpacking", "loops for"]
discipline: "python"
learning_goal: "Combinar múltiplos retornos, composição e loops para gerar relatório de transações."
exercise_type: "full_program"
stage: 5
context: "pipeline ETL"
test_cases:
  - input: ""
    output: "Total movimentado: R$4075.90\nTransações altas: 2 | Médias: 1 | Baixas: 2"
---

## Enunciado

Implemente 3 funções e componha-as no `resumo_lote`. Transações no formato `"ID;VALOR;STATUS"`:

1. `parsear_transacao(linha, sep=";")` — retorna `(id, valor_float, status)`.
2. `classificar_valor(valor, limite_alto=1000.0)` — retorna `"alto"`, `"medio"` (>=100) ou `"baixo"`.
3. `resumo_lote(transacoes)` — retorna `(total, qtd_alto, qtd_medio, qtd_baixo)`.

```python
lote = ["TX-001;2500.00;aprovado", "TX-002;350.00;aprovado",
        "TX-003;45.90;recusado", "TX-004;1100.00;aprovado", "TX-005;80.00;aprovado"]

total, alto, medio, baixo = resumo_lote(lote)
print(f"Total movimentado: R${total:.2f}")
print(f"Transações altas: {alto} | Médias: {medio} | Baixas: {baixo}")
```

## Solução

```python
def parsear_transacao(linha: str, sep: str = ";") -> tuple:
    partes = linha.split(sep)
    return partes[0], float(partes[1]), partes[2]

def classificar_valor(valor: float, limite_alto: float = 1000.0) -> str:
    if valor >= limite_alto:
        return "alto"
    if valor >= 100:
        return "medio"
    return "baixo"

def resumo_lote(transacoes: list) -> tuple:
    total = 0.0
    qtd_alto = qtd_medio = qtd_baixo = 0
    for linha in transacoes:
        _, valor, _ = parsear_transacao(linha)
        total += valor
        classe = classificar_valor(valor)
        if classe == "alto":
            qtd_alto += 1
        elif classe == "medio":
            qtd_medio += 1
        else:
            qtd_baixo += 1
    return round(total, 2), qtd_alto, qtd_medio, qtd_baixo
```
