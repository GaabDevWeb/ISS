---
title: "Strings em Python: aspas, literais e textos multilinha"
slug: "strings-literais-multilinhas"
discipline: "python"
order: 5
description: "Como o Python representa texto com strings, diferenças entre aspas simples e duplas, uso de strings multilinha e erros típicos com aspas."
reading_time: 40
difficulty: "easy"
concepts:
  - strings
  - literais de string
  - aspas simples
  - aspas duplas
  - strings multilinha
  - docstrings
  - SyntaxError
  - representação de texto na memória
prerequisites:
  - "por-que-programar-python"
  - "algoritmos-e-notebooks"
  - "variaveis-tipos-estilo-python"
  - "conversao-tipos-operadores-aritmeticos"
learning_objectives:
  - "Entender o que é uma string em Python e como ela é armazenada em memória."
  - "Criar strings usando aspas simples, aspas duplas e literais multilinha com três aspas."
  - "Identificar e corrigir erros comuns de aspas em literais de string (especialmente `SyntaxError: unterminated string literal`)."
  - "Usar strings multilinha para textos longos, docstrings e templates em projetos de dados."
exercises:
  - question: "Por que `poema = 'Que pode uma criatura senão,\\nentre criaturas, amar?` (com quebra de linha no meio) gera um `SyntaxError` em Python, e como corrigir isso mantendo o texto em múltiplas linhas?"
    answer: "Porque literais de string definidos com aspas simples ou duplas precisam começar e terminar na mesma linha; ao quebrar a linha sem indicar continuação, o Python entende que a string terminou e encontra texto 'solto', gerando `SyntaxError: unterminated string literal`. Para manter o texto em múltiplas linhas, você deve usar três aspas simples ou duplas (`''' ... '''` ou \"\"\" ... \"\"\"), criando uma string multilinha (docstring)."
    hint: "Lembre do exemplo com o poema de Carlos Drummond e da diferença entre `'texto'` e `'''texto\\nem\\nvarias\\nlinhas'''`."
review_after_days: [1, 3, 7, 30]
---

## Visão Geral do Conceito

Strings (`str`) são o tipo básico para representar **texto** em Python: tudo que está entre aspas é guardado como uma sequência de caracteres na memória.
Nesta aula você aprende a definir strings com aspas simples, aspas duplas e três aspas, e a evitar o erro clássico de quebrar o texto no meio de um literal.

## Modelo Mental

Pense em uma string como uma **linha de caracteres em caixas consecutivas** na RAM.
O literal entre aspas diz ao Python “guarde exatamente estes caracteres, nesta ordem”; o nome da variável aponta para o início dessa sequência.
Quando há quebras de linha, elas são apenas **caracteres especiais** (`\n`) dentro da mesma sequência.

## Mecânica Central

- `aspas_simples = 'texto'`
- `aspas_duplas = "texto"`
- `multilinha = '''linha 1\nlinha 2\nlinha 3'''` (três aspas simples ou três aspas duplas).

Com **uma** aspa de cada lado (`'...'` ou `"..."`), o Python exige que o literal esteja em **uma única linha**; se você apertar Enter no meio, obtém:

```text
SyntaxError: unterminated string literal
```

Para textos em várias linhas (como o poema do Carlos Drummond da aula), use três aspas:

```python
poema = '''Que pode uma criatura senão,
entre criaturas, amar?'''
```

E para colocar aspas dentro do texto:

- use aspas duplas por fora quando o texto tem aspas simples: `"texto entre 'aspas'"`;
- use aspas simples por fora quando o texto tem aspas duplas: `'Lorem "Ipsum" vem de...'`.

```mermaid
flowchart TD
    A[Quero escrever texto] --> B{Cabe em 1 linha?}
    B -- sim --> C[Usar '...' ou "..."]
    B -- não --> D[Usar '''...''' ou """..."""]
    C --> E{Texto contém aspas simples?}
    E -- sim --> F[Usar aspas duplas por fora]
    E -- não --> G[Escolher estilo preferido]
```

## Uso Prático

- Documentar um caderno de experimentos com um **bloco de texto multilinha** em uma variável.
- Guardar um **e‑mail de notificação** ou um **modelo de mensagem** como string de três aspas.
- Representar corretamente frases com aspas internas, como o exemplo de *Lorem Ipsum* da aula.

## Erros Comuns

- Quebrar um literal `'...'` ou `"..."` no meio da linha → `SyntaxError: unterminated string literal`.
- Esquecer de alternar o tipo de aspas quando o texto já contém aspas internas.
- Confundir o texto exibido no notebook com o literal em si (achar que pode “colar do PDF” sem adaptar para uma string válida).

## Visão Geral de Debugging

Quando aparecer um `SyntaxError` relacionado a string:

1. Veja **onde** o erro foi detectado (linha indicada pela mensagem).
2. Confira se o literal começou e terminou na mesma linha e se há o mesmo tipo de aspa abrindo e fechando.
3. Se o texto é longo ou possui quebras de linha, converta para três aspas.

## Principais Pontos

- Strings são sequências de caracteres entre aspas, todas do tipo `str`.
- Literais com uma aspa de cada lado precisam caber em uma linha; quebras “cruas” geram `SyntaxError`.
- Três aspas criam strings multilinha, ideais para poemas, e‑mails, docstrings e templates.
- Alternar entre aspas simples e duplas é a forma mais simples de incluir aspas dentro do texto.

## Preparação para Prática

Você deve ser capaz de:

- reescrever textos de múltiplas linhas do mundo real em literais Python válidos;
- decidir rapidamente quando usar `'...'`, `"..."` ou `'''...'''`;
- corrigir erros de aspas em código próprio ou de colegas.

## Laboratório de Prática

### Desafio Easy — Guardar um fragmento de poema

Implemente uma função que receba três linhas de texto e devolva uma **string multilinha** com o fragmento formatado, usando três aspas.

```python
def montar_fragmento_poema(linha1: str, linha2: str, linha3: str) -> str:
    """
    Monta um pequeno poema em três linhas, usando uma string multilinha.
    """
    # TODO: retornar uma string criada com ''' ... ''' contendo
    # as três linhas em linhas separadas.
    poema = ""
    return poema
```

### Desafio Medium — Mensagem com aspas internas

Crie uma função que devolva uma mensagem de aviso contendo **aspas simples e duplas** no texto, sem gerar `SyntaxError`.

```python
def mensagem_com_aspas() -> str:
    """
    Retorna algo como:
    Atenção: o campo "observação" não pode conter o caractere '|' .
    """
    # TODO: escolher o tipo de aspas externas adequado
    # para que as aspas internas apareçam corretamente.
    mensagem = ""
    return mensagem
```

### Desafio Hard — Normalizar texto colado do PDF

Suponha que você recebeu um parágrafo colado de um PDF (com várias quebras de linha) e quer transformá‑lo em uma **string de uma linha só**, pronta para ser exibida em logs.

```python
from typing import Iterable

def juntar_linhas_em_uma(linhas: Iterable[str]) -> str:
    """
    Recebe várias linhas (como lidas de um arquivo de texto)
    e devolve uma única string, com espaços entre as linhas.
    """
    # TODO:
    #   1. Juntar as linhas removendo quebras de linha.
    #   2. Garantir que não haja espaços duplos desnecessários.
    texto = ""
    return texto
```

<!-- CONCEPT_EXTRACTION
concepts:
  - literais de string
  - aspas simples e duplas
  - strings multilinha com três aspas
  - SyntaxError por string não terminada
skills:
  - Escolher entre aspas simples, duplas e três aspas ao declarar strings
  - Reescrever textos reais (poemas, parágrafos) como literais de string válidos
  - Diagnosticar e corrigir SyntaxError causados por aspas e quebras de linha
examples:
  - poema-carlos-drummond-multilinha
  - mensagem-aviso-com-aspas
  - normalizar-texto-colado-pdf
-->

<!-- EXERCISES_JSON
[
  {
    "id": "python-poema-carlos-drummond-multilinha",
    "slug": "python-poema-carlos-drummond-multilinha",
    "difficulty": "easy",
    "title": "Montar fragmento de poema com string multilinha",
    "discipline": "python",
    "editorLanguage": "python",
    "tags": ["python", "strings", "multilinha"],
    "summary": "Construa uma string multilinha a partir de três linhas de texto usando literais de três aspas."
  },
  {
    "id": "python-mensagem-aviso-com-aspas",
    "slug": "python-mensagem-aviso-com-aspas",
    "difficulty": "medium",
    "title": "Criar mensagem com aspas internas sem SyntaxError",
    "discipline": "python",
    "editorLanguage": "python",
    "tags": ["python", "strings", "aspas"],
    "summary": "Escreva uma função que retorne uma mensagem contendo aspas simples e duplas, escolhendo o literal de string adequado."
  },
  {
    "id": "python-normalizar-texto-colado-pdf",
    "slug": "python-normalizar-texto-colado-pdf",
    "difficulty": "hard",
    "title": "Normalizar texto colado de PDF em uma única linha",
    "discipline": "python",
    "editorLanguage": "python",
    "tags": ["python", "strings", "limpeza-texto"],
    "summary": "Implemente uma função que recebe várias linhas de texto e devolve uma string única, sem quebras de linha e sem espaços duplicados."
  }
]
-->

