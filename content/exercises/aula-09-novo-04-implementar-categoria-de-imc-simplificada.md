---
title: Implementar — categoria de IMC simplificada
slug: aula-09-novo-04-implementar-categoria-de-imc-simplificada
difficulty: medium
concepts:
- booleanos
- operadores relacionais
- if/elif/else
- blocos identados
- fluxo condicional
- expressão booleana
discipline: python
learning_goal: 'Praticar: booleanos, operadores relacionais, if/elif/else'
exercise_type: implement_function
stage: 4
context: validação de dados
test_cases:
- input: '24.9

    '
  output: normal
- input: '25

    '
  output: fora
---

## Enunciado

Leia `imc` (float). Imprima `normal` se \(18.5 <= imc < 25\), caso contrário `fora`.

## Solução

```python
imc = float(input())
if 18.5 <= imc < 25:
    print("normal")
else:
    print("fora")
```
