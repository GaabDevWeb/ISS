---
title: "HARD — Extrair ler / peso / main"
slug: "py-hard-15-refatorar-tres-funcoes-log"
difficulty: "hard"
concepts: ["def e chamada de função", "PEP 8 snake_case e funções coesas", "return explícito e None implícito"]
discipline: "python"
learning_goal: "Separar IO, regra e orquestração."
exercise_type: "refactor"
stage: 20
context: "análise de logs"
test_cases:
  - input: "WARN"
    output: "1"
---

## Enunciado

Refatore sem mudar saída:

```python
c = input().strip()
if c == 'ERR':
    print(2)
elif c == 'WARN':
    print(1)
else:
    print(0)
```

Crie `ler_codigo()`, `pontuacao(c)` e `main()`.

## Solução

```python
def ler_codigo():
    return input().strip()


def pontuacao(c):
    if c == 'ERR':
        return 2
    if c == 'WARN':
        return 1
    return 0


def main():
    print(pontuacao(ler_codigo()))


main()
```
