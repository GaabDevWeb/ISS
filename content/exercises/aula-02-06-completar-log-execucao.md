---
title: "Completar log de execução"
slug: "aula-02-06-completar-log-execucao"
difficulty: "easy"
concepts: ["algoritmos", "notebooks e IDE"]
discipline: "python"
learning_goal: "Completar trecho que imprime log de execução de um pipeline."
exercise_type: "complete_the_code"
stage: 3
context: "logs"
expected_output: |
  [OK] Leitura
  [OK] Transformação
  [OK] Escrita
---

## Enunciado

Complete o código para exibir um log de pipeline com três linhas: [OK] Leitura, [OK] Transformação, [OK] Escrita. A segunda linha está faltando.

```python
print("[OK] Leitura")
print(_____)  # preencha: [OK] Transformação
print("[OK] Escrita")
```

## Solução

```python
print("[OK] Leitura")
print("[OK] Transformação")
print("[OK] Escrita")
```
