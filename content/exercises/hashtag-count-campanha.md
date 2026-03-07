---
title: "Contagem de Hashtags em Postagem"
slug: "hashtag-count-campanha"
difficulty: "medium"
concepts: ["count()", "lower()", "strings"]
discipline: "python"
---

## Enunciado

Uma equipe de marketing digital monitora o desempenho de campanhas em mídias sociais. Eles precisam identificar não apenas o uso exato de hashtags, mas também suas variações de capitalização. Desenvolva um programa que analise textos de postagens.

**Tarefa:** Para uma dada postagem (por exemplo, `texto = 'Participe do #PythonChallenge e ganhe prêmios! #pythonchallenge é sucesso!'`), determine a quantidade de vezes que a hashtag `#PythonChallenge` aparece com a capitalização exata. Em seguida, verifique quantas vezes a versão minúscula `#pythonchallenge` aparece no mesmo texto. Exiba separadamente cada uma dessas contagens (use o método `count()` das strings).

## Solução

```python
texto = 'Participe do #PythonChallenge e ganhe prêmios! #pythonchallenge é sucesso!'
qtd_exata = texto.count('#PythonChallenge')
qtd_minuscula = texto.count('#pythonchallenge')
print("Ocorrências de #PythonChallenge:", qtd_exata)
print("Ocorrências de #pythonchallenge:", qtd_minuscula)
```
