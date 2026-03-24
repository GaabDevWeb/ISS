---
title: "Implementar — wrapper que enriquece retorno de outra função"
slug: "aula-15-35-implementar-wrapper-contexto"
difficulty: "hard"
concepts: ["composição de funções", "return", "parâmetros com valor padrão", "múltiplos retornos"]
discipline: "python"
learning_goal: "Implementar função de ordem superior que envolve o retorno de outra função com contexto adicional."
exercise_type: "implement_function"
stage: 5
context: "análise de logs"
test_cases:
  - input: ""
    output: "contexto: vendas_diarias\nmin: 7\nmax: 88\nmedia: 37.0\namplitude: 81"
---

## Enunciado

Implemente `enriquecer_resultado(funcao_analise, dados, contexto="geral")` que chama `funcao_analise(dados)`, recebe `(min_val, max_val, media)` e retorna dict com `contexto`, `min`, `max`, `media`, `amplitude` (max - min):

```python
def analisar(dados: list) -> tuple:
    return min(dados), max(dados), round(sum(dados)/len(dados), 2)

resultado = enriquecer_resultado(analisar, [12, 45, 7, 88, 33], contexto="vendas_diarias")
for k, v in resultado.items():
    print(f"{k}: {v}")
```

## Solução

```python
def enriquecer_resultado(funcao_analise, dados: list, contexto: str = "geral") -> dict:
    min_val, max_val, media = funcao_analise(dados)
    return {
        "contexto": contexto,
        "min": min_val,
        "max": max_val,
        "media": media,
        "amplitude": max_val - min_val,
    }
```
