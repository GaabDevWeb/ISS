---
title: "Compatibilidade para doação de sangue (tipo ABO e Rh)"
slug: "contexto-14-compatibilidade-sangue-tipo-rh"
difficulty: "hard"
concepts: ["if/elif/else", "lógica de compatibilidade", "duas etapas"]
discipline: "python"
learning_goal: "Avaliar compatibilidade por tipo e por Rh e exibir resultado único."
exercise_type: "full_program"
stage: 18
context: "validação de dados"
test_cases:
  - input: "A\n+\nO\n+"
    output: "Doacao compativel"
  - input: "O\n-\nA\n+"
    output: "Doacao incompativel"
---

## Enunciado

Um hospital precisa verificar se a Pessoa 2 (doador) pode doar sangue para a Pessoa 1 (receptor). Compatibilidade ABO: A recebe de A e O; B recebe de B e O; AB recebe de A, B, AB e O; O recebe só de O. Compatibilidade Rh: receptor + recebe de + ou -; receptor - recebe só de -. A doação é compatível somente se tipo E Rh forem compatíveis. O programa em Python (Deepnote) lê tipo e Rh do receptor e depois tipo e Rh do doador e exibe "Doacao compativel" ou "Doacao incompativel".

**Tarefa**  
Implemente as regras de compatibilidade por tipo e por Rh e exiba o resultado.

**Entrada**  
Quatro linhas: tipo receptor (A, B, AB ou O), Rh receptor (+ ou -), tipo doador, Rh doador.

**Saída**  
Uma linha: `Doacao compativel` ou `Doacao incompativel`.

## Solução

```python
t1 = input().strip()
r1 = input().strip()
t2 = input().strip()
r2 = input().strip()
abo_ok = False
if t1 == "A": abo_ok = t2 in ("A", "O")
elif t1 == "B": abo_ok = t2 in ("B", "O")
elif t1 == "AB": abo_ok = True
else: abo_ok = t2 == "O"
rh_ok = (r1 == "+") or (r2 == "-")
if abo_ok and rh_ok:
    print("Doacao compativel")
else:
    print("Doacao incompativel")
```
