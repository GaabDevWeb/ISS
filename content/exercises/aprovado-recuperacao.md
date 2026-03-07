---
title: "Aprovado, recuperação ou reprovado"
slug: "aprovado-recuperacao"
difficulty: "medium"
concepts: "if/elif/else, input(), float(), comparação"
discipline: "python"
---

## Enunciado

Crie um programa que leia a média final de um aluno (número real). Exiba a situação conforme as regras:

- Média >= 7: "APROVADO(A)"
- Média >= 5 e < 7: "RECUPERAÇÃO"
- Média < 5: "REPROVADO(A)"

Use `if`, `elif` e `else` com indentação correta. O primeiro `elif` deve testar `media >= 5`; assim, quem tem 6.5 cai em RECUPERAÇÃO.

## Solução

```python
media = float(input("Digite a média final: "))
if media >= 7:
    print("APROVADO(A)")
elif media >= 5:
    print("RECUPERAÇÃO")
else:
    print("REPROVADO(A)")
```
