---
title: "Programa — análise de métricas de API com composição e múltiplos retornos"
slug: "aula-15-39-programa-analise-metricas-api"
difficulty: "hard"
concepts: ["composição de funções", "múltiplos retornos", "tuple unpacking", "parâmetros com valor padrão", "loops for", "strings"]
discipline: "python"
learning_goal: "Construir analisador de métricas combinando composição de funções, múltiplos retornos e processamento de texto."
exercise_type: "full_program"
stage: 5
context: "dados de monitoramento"
test_cases:
  - input: ""
    output: "Taxa de sucesso: 80.0%\nMédia de duração: 348.1ms\nRequisições lentas (>300ms): 3"
---

## Enunciado

Linhas no formato `"TIMESTAMP;ENDPOINT;DURACAO_MS;STATUS"`. Implemente:

1. `parsear_entrada(linha)` — retorna `(ts, endpoint, duracao, status)` com `duracao` como `float`.
2. `e_sucesso(status)` — `True` se status começa com `"2"`.
3. `analisar_lote(linhas, limite_ms=300.0)` — retorna `(taxa_sucesso_pct, media_duracao, qtd_lentas)`.

```python
linhas = ["10:00:01;/api/login;120.5;200", "10:00:02;/api/dados;450.0;200",
          "10:00:03;/api/login;80.0;401", "10:00:04;/api/upload;890.0;200",
          "10:00:05;/api/dados;200.0;200"]

taxa, media, lentas = analisar_lote(linhas)
print(f"Taxa de sucesso: {taxa:.1f}%")
print(f"Média de duração: {media:.1f}ms")
print(f"Requisições lentas (>{300}ms): {lentas}")
```

## Solução

```python
def parsear_entrada(linha: str) -> tuple:
    partes = linha.split(";")
    return partes[0], partes[1], float(partes[2]), partes[3]

def e_sucesso(status: str) -> bool:
    return status.startswith("2")

def analisar_lote(linhas: list, limite_ms: float = 300.0) -> tuple:
    duracoes = []
    sucessos = 0
    for linha in linhas:
        _, _, duracao, status = parsear_entrada(linha)
        duracoes.append(duracao)
        if e_sucesso(status):
            sucessos += 1
    taxa_sucesso = (sucessos / len(linhas)) * 100
    media = sum(duracoes) / len(duracoes)
    lentas = sum(1 for d in duracoes if d > limite_ms)
    return round(taxa_sucesso, 1), round(media, 1), lentas
```
