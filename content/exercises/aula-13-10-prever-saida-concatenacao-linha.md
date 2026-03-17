---
title: "Prever saída — concatenação por linha (matriz)"
slug: "aula-13-10-prever-saida-concatenacao-linha"
difficulty: "easy"
concepts: ["loops aninhados", "concatenação por linha", "result"]
discipline: "python"
learning_goal: "Prever saída quando se acumula string por linha e imprime ao sair do loop interno."
exercise_type: "predict_output"
stage: 3
context: "processamento de dados"
expected_output: "(0,0) (0,1) \n(1,0) (1,1) \n"
---

## Enunciado

Qual é a saída do programa abaixo? Observe que em cada linha da matriz se acumula uma string em `result` e depois se imprime.

```python
for i in range(2):
    result = ''
    for j in range(2):
        result += f'({i},{j}) '
    print(result)
```

## Solução

A saída é:

```
(0,0) (0,1) 
(1,0) (1,1) 
```

A cada linha (i), `result` é reinicializado como `''`, acumula os pares (i,j) e ao sair do loop interno um `print(result)` imprime a linha.
