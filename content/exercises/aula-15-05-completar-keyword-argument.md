---
title: "Completar — chamada com argumento nomeado"
slug: "aula-15-05-completar-keyword-argument"
difficulty: "easy"
concepts: ["parâmetros nomeados (keyword arguments)", "parâmetros posicionais"]
discipline: "python"
learning_goal: "Usar argumentos nomeados para tornar chamadas de função autodocumentadas."
exercise_type: "complete_the_code"
stage: 2
context: "processamento de dados de API"
test_cases:
  - input: ""
    output: "Transferência: api → warehouse (128 MB)"
---

## Enunciado

Complete a chamada para que `destino` receba `"warehouse"` e `origem` receba `"api"` usando argumentos nomeados:

```python
def registrar_transferencia(origem, destino, tamanho_mb):
    return f"Transferência: {origem} → {destino} ({tamanho_mb} MB)"

resultado = registrar_transferencia(___, ___, tamanho_mb=128)
print(resultado)
```

## Solução

```python
resultado = registrar_transferencia(destino="warehouse", origem="api", tamanho_mb=128)
print(resultado)
```
