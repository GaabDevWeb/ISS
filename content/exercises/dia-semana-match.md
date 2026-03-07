---
title: "Dia da semana com match/case"
slug: "dia-semana-match"
difficulty: "hard"
concepts: "input(), int(), match/case, Python 3.10+"
discipline: "python"
---

## Enunciado

Crie um programa que leia um número inteiro de 1 a 7 (1 = Domingo, 2 = Segunda, ..., 7 = Sábado) e exiba o nome do dia da semana correspondente.

Use `match` e `case` (Python 3.10+) para fazer a correspondência por valor. Se o número não estiver entre 1 e 7, exiba "Dia inválido".

## Solução

```python
numero = int(input("Digite um número de 1 a 7: "))
match numero:
    case 1:
        print("Domingo")
    case 2:
        print("Segunda")
    case 3:
        print("Terça")
    case 4:
        print("Quarta")
    case 5:
        print("Quinta")
    case 6:
        print("Sexta")
    case 7:
        print("Sábado")
    case _:
        print("Dia inválido")
```
