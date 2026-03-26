---
title: Corrigir bug — aspas em JSON de exemplo
slug: aula-05-novo-01-corrigir-bug-aspas-em-json-de-exemplo
difficulty: easy
concepts:
- literais de string
- aspas simples e duplas
- strings multilinha com três aspas
- SyntaxError por string não terminada
discipline: python
learning_goal: 'Praticar: literais de string, aspas simples e duplas, strings multilinha
  com três aspas'
exercise_type: fix_bug
stage: 1
context: API
test_cases:
- input: ''
  output: '{"ok": true}'
---

## Enunciado

Corrija o literal de string para o programa imprimir exatamente:
`{"ok": true}`

```python
print("{"ok": true}")
```

## Solução

```python
print('{"ok": true}')
```
