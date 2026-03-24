---
title: "Prever saída — parâmetro padrão não passado"
slug: "aula-15-01-prever-padrao-nao-passado"
difficulty: "easy"
concepts: ["parâmetros com valor padrão", "return"]
discipline: "python"
learning_goal: "Prever o comportamento de uma função quando o argumento opcional é omitido."
exercise_type: "predict_output"
stage: 1
context: "processamento de texto"
expected_output: "[INFO] Conexão estabelecida\n[WARN] Timeout na requisição"
---

## Enunciado

Escreva **exatamente** o que será impresso ao executar o código:

```python
def formatar_mensagem(texto, prefixo="[INFO]"):
    return f"{prefixo} {texto}"

print(formatar_mensagem("Conexão estabelecida"))
print(formatar_mensagem("Timeout na requisição", "[WARN]"))
```

## Solução

```
[INFO] Conexão estabelecida
[WARN] Timeout na requisição
```
