---
title: "Prever saída — acumulador de soma"
slug: "aula-13-01-prever-saida-acumulador-soma"
difficulty: "easy"
concepts: ["acumulador", "inicialização", "+="]
discipline: "python"
learning_goal: "Prever o valor final de um acumulador após um loop (teste de mesa)."
exercise_type: "predict_output"
stage: 1
context: "validação de dados"
expected_output: "15\n3.0"
---

## Enunciado

Qual é a saída do programa abaixo? Faça um teste de mesa mental: acompanhe os valores de `soma` a cada iteração (valores digitados: 1, 2, 3, 4, 5).

```python
soma = 0
for i in range(5):
    numero = int(input(f'Digite o {i+1}º numero: '))  # suponha: 1, 2, 3, 4, 5
    soma += numero
print(soma)
print(soma / 5)
```

## Solução

A saída é:

```
15
3.0
```

Teste de mesa: 1ª iteração soma=1; 2ª soma=3; 3ª soma=6; 4ª soma=10; 5ª soma=15. Média = 15/5 = 3.0.
