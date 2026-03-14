---
title: "Completar range para sequência"
slug: "aula-11-02-completar-range"
difficulty: "easy"
concepts: ["range()", "laços for", "parada não inclusiva"]
discipline: "python"
learning_goal: "Completar range() para exibir 0, 1, 2, 3, 4."
exercise_type: "complete_the_code"
stage: 2
context: "validação de dados"
expected_output: "0\n1\n2\n3\n4"
---

## Enunciado

Complete o for para que exiba os números 0 a 4 (um por linha). Use range com um único argumento (stop).

```python
for i in range(_____):  # preencha: 5
    print(i)
```

## Solução

```python
for i in range(5):
    print(i)
```

range(5) gera 0, 1, 2, 3, 4 (stop não é inclusivo).
