---
title: "Programa — sistema de alertas de monitoramento com composição"
slug: "aula-15-30-programa-alertas-monitoramento"
difficulty: "hard"
concepts: ["composição de funções", "múltiplos retornos", "tuple unpacking", "parâmetros com valor padrão", "loops for"]
discipline: "python"
learning_goal: "Construir sistema de alertas composto por funções encadeadas com múltiplos retornos."
exercise_type: "full_program"
stage: 5
context: "dados de monitoramento"
test_cases:
  - input: ""
    output: "srv-01 | CRITICO | disco\nsrv-02 | OK | nenhum\nsrv-03 | CRITICO | cpu"
---

## Enunciado

Implemente 3 funções para analisar métricas de servidores no formato `"srv-nome,cpu,mem,disco"`:

1. `parsear_metrica(linha)` — retorna `(nome, cpu, mem, disco)` com floats.
2. `calcular_risco(cpu, mem, disco, limite=80.0)` — retorna `(nivel_risco, componente_critico)`. Risco: `"CRITICO"` (algum > 90), `"ALERTA"` (algum > limite), `"OK"`.
3. `gerar_relatorio(linhas)` — imprime uma linha por servidor.

```python
servidores = ["srv-01,87.5,62.3,91.0", "srv-02,45.0,50.0,55.0", "srv-03,92.1,88.4,70.0"]
gerar_relatorio(servidores)
```

## Solução

```python
def parsear_metrica(linha: str) -> tuple:
    partes = linha.split(",")
    return partes[0], float(partes[1]), float(partes[2]), float(partes[3])

def calcular_risco(cpu: float, mem: float, disco: float, limite: float = 80.0) -> tuple:
    componentes = {"cpu": cpu, "mem": mem, "disco": disco}
    mais_alto = max(componentes, key=lambda k: componentes[k])
    if any(v > 90 for v in componentes.values()):
        return "CRITICO", mais_alto
    if any(v > limite for v in componentes.values()):
        return "ALERTA", mais_alto
    return "OK", "nenhum"

def gerar_relatorio(linhas: list) -> None:
    for linha in linhas:
        nome, cpu, mem, disco = parsear_metrica(linha)
        risco, componente = calcular_risco(cpu, mem, disco)
        print(f"{nome} | {risco} | {componente}")
```
