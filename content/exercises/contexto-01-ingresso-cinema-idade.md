---
title: "Verificação de idade para ingresso no cinema"
slug: "contexto-01-ingresso-cinema-idade"
difficulty: "easy"
concepts: ["if/else", "input()", "operadores relacionais"]
discipline: "python"
learning_goal: "Verificar elegibilidade com base em idade para compra com restrição."
exercise_type: "full_program"
stage: 16
context: "validação de entrada"
test_cases:
  - input: "20"
    output: "Ingresso liberado."
  - input: "16"
    output: "Ingresso negado. Classificação 18 anos."
---

## Enunciado

Um cinema exibe filmes com classificação etária e precisa garantir que apenas espectadores com a idade mínima comprem ingressos para sessões restritas. O sistema receberá a idade do comprador como entrada. Seu programa em Python, executado em blocos no Deepnote, deve autorizar ou negar a venda do ingresso para um filme classificado para maiores de 18 anos.

**Tarefa**  
Implemente um programa que verifique se o comprador pode adquirir o ingresso com base na idade informada.

**Entrada**  
Uma única linha contendo um número inteiro positivo representando a idade do comprador.

**Saída**  
- Se a idade for maior ou igual a 18, exiba: `Ingresso liberado.`
- Caso contrário, exiba: `Ingresso negado. Classificação 18 anos.`

## Solução

```python
idade = int(input())
if idade >= 18:
    print("Ingresso liberado.")
else:
    print("Ingresso negado. Classificação 18 anos.")
```
