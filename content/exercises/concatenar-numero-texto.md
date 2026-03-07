---
title: "Concatenar número e texto"
slug: "concatenar-numero-texto"
difficulty: "easy"
concepts: "concatenação, str(), tipagem forte"
discipline: "python"
---

## Enunciado

Crie um programa que armazene o número `100` em uma variável e a string `" reais"` em outra. Concatene os dois para formar a string `"100 reais"` e exiba o resultado.

Lembre-se: em Python, `+` entre número e string gera TypeError; use `str()` para converter o número antes de concatenar.

## Solução

```python
valor = 100
sufixo = " reais"
mensagem = str(valor) + sufixo
print(mensagem)
```
