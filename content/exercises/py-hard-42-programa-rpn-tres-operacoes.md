---
title: "HARD — Notação polonesa inversa (4 tokens)"
slug: "py-hard-42-programa-rpn-tres-operacoes"
difficulty: "hard"
concepts: ["listas e sequências iteráveis", "if/elif/else"]
discipline: "python"
learning_goal: "Simular pilha com lista append/pop."
exercise_type: "full_program"
stage: 20
context: "automação"
test_cases:
  - input: "3 4 + 2 *"
    output: "14"
---

## Enunciado

Leia uma linha com 5 tokens: três números inteiros e dois operadores `+` ou `*` alternando pós-fixo clássico de 3 operandos: `a b op1 c op2` avalia como `((a op1 b) op2 c)`. Ex.: `3 4 + 2 *` → (3+4)*2=14. Use lista como pilha.

## Solução

```python
toks = input().split()
st = []
for t in toks:
    if t in '+*':
        b = st.pop()
        a = st.pop()
        if t == '+':
            st.append(a + b)
        else:
            st.append(a * b)
    else:
        st.append(int(t))
print(st[0])
```
