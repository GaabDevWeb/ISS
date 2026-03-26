---
title: Programa — montar aviso de manutenção
slug: aula-05-novo-06-programa-montar-aviso-de-manutenção
difficulty: hard
concepts:
- literais de string
- aspas simples e duplas
- strings multilinha com três aspas
- SyntaxError por string não terminada
discipline: python
learning_goal: 'Praticar: literais de string, aspas simples e duplas, strings multilinha
  com três aspas'
exercise_type: full_program
stage: 5
context: monitoramento
test_cases:
- input: 'api

    '
  output: 'SERVICO: api

    STATUS: MANUTENCAO'
---

## Enunciado

Leia um serviço (str) e imprima um aviso multilinha com:
`SERVICO: <nome>`
`STATUS: MANUTENCAO`

## Solução

```python
servico = input().strip()
print(f"SERVICO: {servico}")
print("STATUS: MANUTENCAO")
```
