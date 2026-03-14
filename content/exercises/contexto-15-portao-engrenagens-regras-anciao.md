---
title: "Portão das Engrenagens Eternas – regras do ancião"
slug: "contexto-15-portao-engrenagens-regras-anciao"
difficulty: "hard"
concepts: ["operadores lógicos and/or", "múltiplas condições", "if/else"]
discipline: "python"
learning_goal: "Avaliar quatro provas com regras compostas e exibir APROVADO/REPROVADO."
exercise_type: "full_program"
stage: 18
context: "validação de dados"
test_cases:
  - input: "20\n50\n1\n7"
    output: "APROVADO"
  - input: "10\n0\n0\n10"
    output: "APROVADO"
---

## Enunciado

Na vila, o ancião definiu que o jogador é APROVADO somente se TODAS as regras forem satisfeitas: (1) Prova A estritamente entre 15 e 45 E Prova B <= 60. (2) Prova C == 1 OU (Prova C == 0 E A < 20 E B < 30 E D == 10). (3) Prova D >= 5 OU (D < 5 E (A == 10 ou A == 40) E B == 0). Entrada: quatro inteiros (A 0–50, B 0–100, C 0 ou 1, D 0–10). Saída: uma linha "APROVADO" ou "REPROVADO".

**Tarefa**  
Implemente as três regras compostas; o jogador deve satisfazer as três ao mesmo tempo.

**Entrada**  
Quatro linhas: resultados das Provas A, B, C e D (inteiros nos intervalos indicados).

**Saída**  
Uma linha: `APROVADO` ou `REPROVADO`.

## Solução

```python
a = int(input())
b = int(input())
c = int(input())
d = int(input())
r1 = (15 < a < 45) and (b <= 60)
r2 = (c == 1) or (c == 0 and a < 20 and b < 30 and d == 10)
r3 = (d >= 5) or (d < 5 and (a == 10 or a == 40) and b == 0)
if r1 and r2 and r3:
    print("APROVADO")
else:
    print("REPROVADO")
```
