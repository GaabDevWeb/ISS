---
title: "Strings em Python: interpolação, f-strings e input"
slug: "strings-interpolacao-input"
discipline: "python"
order: 8
description: "Como formatar mensagens com dados dinâmicos usando operadores de formatação, método format, f-strings e ler valores do usuário com input."
reading_time: 50
difficulty: "easy"
concepts:
  - strings
  - interpolação de strings
  - formatação com %
  - método format
  - f-strings
  - input
  - conversão de tipos com input
  - ValueError
  - TypeError
  - casas decimais
prerequisites:
  - "por-que-programar-python"
  - "algoritmos-e-notebooks"
  - "variaveis-tipos-estilo-python"
  - "conversao-tipos-operadores-aritmeticos"
  - "strings-literais-multilinhas"
  - "strings-escape-concatenacao"
  - "strings-indices-slice-metodos"
learning_objectives:
  - "Comparar os estilos de interpolação de strings em Python: operador %, método .format() e f-strings."
  - "Usar f-strings para montar mensagens legíveis combinando texto, variáveis e expressões Python."
  - "Ler dados do usuário com input(), entender que sempre chegam como string e convertê-los para tipos numéricos quando necessário."
  - "Formatar números com número controlado de casas decimais em saídas de texto."
exercises:
  - question: "Por que a expressão `graus_c = (graus_f - 32) * 5/9` falha com `TypeError` se `graus_f` veio direto de `input()`, e quais são os passos corretos para corrigir esse código?"
    answer: "Porque `input()` sempre retorna uma string; ao tentar fazer `graus_f - 32`, o Python está tentando subtrair um inteiro (`int`) de uma string (`str`), o que gera `TypeError: unsupported operand type(s) for -: 'str' and 'int'`. A correção é converter explicitamente a string para número (por exemplo, com `int(graus_f)` ou `float(graus_f)`) antes de usar em operações aritméticas, e então usar o valor numérico convertido na fórmula."
    hint: "Lembre do exemplo da aula em que o primeiro código de conversão gera um `TypeError`, e depois o professor faz `graus_f = int(graus_f)` antes de calcular `graus_c`."
review_after_days: [1, 3, 7, 30]
---

## Visão Geral do Conceito

Depois de entender como criar e manipular strings, o próximo passo é **usar texto para conversar com o usuário**:

- montar mensagens com valores dinâmicos (nome, resultados de contas, medidas);
- ler entradas do usuário e usar esses valores em cálculos.

Nesta lição você aprende três estilos de interpolação de strings em Python (`%`, `.format()` e **f-strings**) e a função **`input()`** para capturar dados digitados, inclusive o cuidado com conversão de tipos.

> **Ideia central:** interpolação e `input()` conectam o seu algoritmo ao usuário — você gera mensagens explicativas e recebe valores reais para processar.

## Modelo Mental

Pense em uma mensagem na tela como um **template com lacunas**:

```text
Hello World {nome}, python is fantastic!
```

As lacunas `{...}` são preenchidas em tempo de execução com:

- **valores de variáveis** (`nome`, `graus_c`, `media`);
- **expressões Python** (`graus_celsius * 9/5 + 32`, `coisa.capitalize()`).

Para receber o valor que vai preencher essas lacunas, você usa:

- `input()` → mostra um prompt, espera o usuário digitar e apertar Enter, e devolve **sempre uma string**;
- depois você converte para o tipo que precisa (`int`, `float`) e usa em contas.

## Mecânica Central

### Estilo 1: operador `%` (formatação antiga)

Este estilo vem do C e ainda aparece em código legado:

```python
valor = 12.345678

print("Número como string: %s" % valor)   # %s -> string
print("Número como float: %f" % valor)    # %f -> float com 6 casas
print("Número com 2 casas: %.2f" % valor) # 2 casas decimais
print("Inteiro: %d" % 42)                 # %d -> inteiro
print("Percentual: %d%%" % 80)            # %% -> literal %
```

Interpolando duas variáveis:

```python
cat = "woodchuck"
weight = 3

template = "%s weighs %dkg"
print(template % (cat, weight))
```

### Estilo 2: método `.format()`

Usa **chaves `{}`** dentro da string e o método `.format()` para preencher:

```python
thing = "woodchuck"
place = "lake"

print("The {} is in the {}.".format(thing, place))
print("The {1} is in the {0}.".format(place, thing))  # reordena pelos índices
print("The {thing} is in the {place}.".format(thing=thing, place=place))
```

Você também pode usar `.format()` para controlar casas decimais:

```python
valor = 113.3333333333
print("Valor com 3 casas: {:.3f}".format(valor))  # 113.333
```

### Estilo 3: f-strings (recomendado)

As **f-strings** são o estilo moderno (Python 3.6+). Basta prefixar a string com `f` e usar `{}`:

```python
thing = "woodchuck"
place = "werepond"

print(f"The {thing} is in the {place}.")
print(f"The {thing.capitalize()} is in the {place.rjust(20)}")
```

Dentro de `{}` você pode colocar **qualquer expressão Python válida**:

```python
nome = "gesiel lopes"
print(f"Hello World {nome.title()}, python is fantastic!")
```

Controle de casas decimais com f-strings:

```python
graus_f = 236
graus_c = (graus_f - 32) * 5/9
print(f"Graus Fahrenheit: {graus_f} em Graus Celsius: {graus_c:.3f}")
```

Aqui `:.3f` significa: formate como float (`f`) com 3 casas decimais.

### Lendo entradas com `input()`

`input()` mostra um prompt e devolve **sempre uma string**:

```python
texto = input()          # usuário digita algo
print(texto, type(texto))  # sempre <class 'str'>
```

Com mensagem amigável:

```python
nome = input("Qual o seu nome: ")
print(f"Hello World {nome}, python is fantastic!")
```

### Cuidado: conversão de tipos com input

Se você precisa fazer contas, deve **converter** o resultado de `input()`:

```python
graus_f = input("Digite o valor em Graus Fahrenheit: ")
graus_c = (graus_f - 32) * 5/9
```

Esse código gera:

```text
TypeError: unsupported operand type(s) for -: 'str' and 'int'
```

Porque `graus_f` é `str`. A versão correta:

```python
graus_f = input("Digite o valor em Graus Fahrenheit: ")
graus_f = int(graus_f)  # ou float(graus_f)
graus_c = (graus_f - 32) * 5/9
print(f"Graus Fahrenheit: {graus_f} em Graus Celsius: {graus_c:.3f}")
```

## Diagrama: fluxo input → conversão → processamento → saída formatada

```mermaid
flowchart TD
    A[Mostrar mensagem com input()] --> B[Usuário digita texto e aperta Enter]
    B --> C[Python recebe uma string]
    C --> D{Precisa fazer contas?}
    D -- não --> E[Usar string direto em f-strings<br/>ou prints]
    D -- sim --> F[Converter com int()/float()]
    F --> G[Calcular resultado numérico]
    G --> H[Formatar com f-string<br/>(por ex.: {valor:.2f})]
    H --> I[Exibir mensagem final no terminal/notebook]
```

## Uso Prático

- **Interfaces simples em notebook**: perguntar nome do aluno, parâmetros de um cálculo, caminho de arquivo, etc.
- **Scripts de conversão de unidades**: receber temperatura, moedas, distâncias, aplicar fórmulas e mostrar resultados legíveis ao usuário.
- **Logs amigáveis**: combinar dados numéricos com texto em mensagens estruturadas usando f-strings.

## Erros Comuns

- **Esquecer que `input()` devolve string** e tentar fazer contas direto → `TypeError`.
- **Misturar número e string na interpolação antiga com `%`** sem a chave correta (`%d` vs `%s`).
- **Não controlar casas decimais** ao mostrar resultados de divisão, produzindo saídas com muitas casas difíceis de ler.
- **Usar `+` para concatenar strings e números** em vez de interpolação ou conversão explícita.

## Visão Geral de Debugging

Quando algo dá errado em código com interpolação ou `input()`:

1. Use `print(repr(valor), type(valor))` logo após o `input()` para ver o tipo real.
2. Verifique a **mensagem de erro**:  
   - `TypeError: ... 'str' and 'int'` → mistura de string com número sem conversão;  
   - `ValueError` ao converter (`int("abc")`) → entrada do usuário inválida.
3. Isole a parte de formatação: teste o cálculo primeiro, depois envolva numa f-string com `:.2f`, `:.3f`, etc.
4. Prefira f-strings em código novo; mantenha `%` ou `.format()` apenas quando necessário em código legado.

## Principais Pontos

- Python oferece três estilos de interpolação de strings: `%`, `.format()` e f-strings — **prefira f-strings** em código novo.
- `input()` sempre retorna string; para realizar contas, converta explicitamente com `int()` ou `float()`.
- Você pode controlar casas decimais com `:.2f`, `:.3f`, etc., tanto em `.format()` quanto em f-strings.
- Interpolação e `input()` juntos permitem construir scripts interativos e mensagens claras, fundamentais em projetos de dados.

## Preparação para Prática

Depois desta lição, você deve ser capaz de:

- construir mensagens contextualizadas com dados vindos de variáveis ou expressões;
- receber entradas do usuário e tratar adequadamente a conversão de tipos;
- formatar resultados numéricos com o nível de precisão desejado.

No **Laboratório de Prática**, você vai criar pequenos scripts de linha de comando que combinam leitura de dados, cálculos e saídas bem formatadas.

## Laboratório de Prática

### Desafio Easy — Boas-vindas personalizadas

Implemente um pequeno script que pergunte o nome da pessoa e devolva uma saudação amigável usando f-strings.

```python
def saudacao_boas_vindas() -> str:
    """
    Pergunta o nome da pessoa e retorna uma mensagem
    no formato:
      "Hello World {nome}, python is fantastic!"
    """
    # TODO:
    #   1. Usar input() para ler o nome.
    #   2. Montar a mensagem usando f-string.
    mensagem = ""
    return mensagem


def main() -> None:
    print(saudacao_boas_vindas())


if __name__ == "__main__":
    main()
```

### Desafio Medium — Conversor interativo de temperaturas

Crie um script que peça ao usuário uma temperatura em graus Fahrenheit, converta para Celsius e mostre o resultado com **3 casas decimais**.

```python
def converter_fahrenheit_para_celsius_interativo() -> None:
    """
    Lê uma temperatura em graus Fahrenheit via input(),
    converte para Celsius e imprime o resultado formatado.

    Exemplo de saída:
      Graus Fahrenheit: 236 em Graus Celsius: 113.333
    """
    # TODO:
    #   1. Ler o valor com input().
    #   2. Converter para float.
    #   3. Aplicar a fórmula: (F - 32) * 5/9.
    #   4. Exibir com f-string usando 3 casas decimais.
    pass


def main() -> None:
    converter_fahrenheit_para_celsius_interativo()


if __name__ == "__main__":
    main()
```

### Desafio Hard — Calculadora de média com formatação

Implemente uma mini calculadora que leia três notas de um aluno via `input()`, calcule a média aritmética e exiba um relatório com as notas e a média formatada com 2 casas decimais.

```python
from typing import Tuple


def ler_tres_notas() -> Tuple[float, float, float]:
    """
    Lê três notas (como strings via input) e retorna
    um tuple de floats (n1, n2, n3).
    """
    # TODO:
    #   1. Chamar input() três vezes.
    #   2. Converter cada entrada para float.
    n1 = 0.0
    n2 = 0.0
    n3 = 0.0
    return n1, n2, n3


def calcular_media(n1: float, n2: float, n3: float) -> float:
    """
    Calcula a média aritmética simples de três notas.
    """
    # TODO: implementar a fórmula da média aritmética.
    media = 0.0
    return media


def imprimir_relatorio_notas() -> None:
    """
    Lê três notas, calcula a média e imprime algo como:

      Notas: 7.0, 8.5, 9.25
      Média: 8.25

    Usando f-strings com 2 casas decimais para a média.
    """
    # TODO:
    #   1. Usar ler_tres_notas() para obter as notas.
    #   2. Calcular a média com calcular_media().
    #   3. Imprimir o relatório formatado.
    pass


def main() -> None:
    imprimir_relatorio_notas()


if __name__ == "__main__":
    main()
```

<!-- CONCEPT_EXTRACTION
concepts:
  - interpolação de strings
  - operador % para formatação
  - método format() de str
  - f-strings
  - input()
  - conversão de tipos após input
  - formatação de casas decimais com :.2f e :.3f
  - TypeError ao misturar str e int
skills:
  - Escolher o estilo adequado de interpolação de strings em Python, preferindo f-strings em código novo
  - Ler dados do usuário com input() e converter explicitamente para tipos numéricos
  - Formatar saídas numéricas com número controlado de casas decimais em .format() e f-strings
  - Diagnosticar e corrigir TypeError causados por operações aritméticas com valores vindos de input()
examples:
  - saudacao-boas-vindas-fstring
  - conversor-fahrenheit-celsius-interativo
  - calculadora-media-tres-notas
-->

<!-- EXERCISES_JSON
[
  {
    "id": "python-saudacao-boas-vindas-fstring",
    "slug": "python-saudacao-boas-vindas-fstring",
    "difficulty": "easy",
    "title": "Saudação personalizada com f-string",
    "discipline": "python",
    "editorLanguage": "python",
    "tags": ["python", "strings", "f-string", "input"],
    "summary": "Leia o nome do usuário com input() e construa uma mensagem de boas-vindas usando f-strings."
  },
  {
    "id": "python-conversor-fahrenheit-celsius-interativo",
    "slug": "python-conversor-fahrenheit-celsius-interativo",
    "difficulty": "medium",
    "title": "Conversor interativo de Fahrenheit para Celsius com 3 casas decimais",
    "discipline": "python",
    "editorLanguage": "python",
    "tags": ["python", "strings", "input", "conversao-tipos", "formatacao"],
    "summary": "Implemente um script que leia uma temperatura em Fahrenheit via input(), converta para Celsius e mostre o resultado com 3 casas decimais usando f-strings."
  },
  {
    "id": "python-calculadora-media-tres-notas",
    "slug": "python-calculadora-media-tres-notas",
    "difficulty": "hard",
    "title": "Calculadora de média de três notas com input e f-strings",
    "discipline": "python",
    "editorLanguage": "python",
    "tags": ["python", "strings", "input", "media"],
    "summary": "Leia três notas com input(), calcule a média aritmética e imprima um relatório formatado com f-strings e 2 casas decimais."
  }
]
-->

