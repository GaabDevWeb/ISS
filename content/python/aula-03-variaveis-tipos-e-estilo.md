---
title: "Variáveis, tipos de dados e estilo de código em Python"
slug: "variaveis-tipos-estilo-python"
discipline: "python"
order: 3
description: "Como o Python armazena dados em variáveis, quais são os tipos básicos e como escrever código legível seguindo o Zen do Python e a PEP 8."
reading_time: 35
difficulty: "easy"
concepts:
  - variáveis
  - tipos de dados
  - int
  - float
  - bool
  - string
  - comentários
  - case sensitive
  - PEP 8
  - Zen do Python
prerequisites:
  - "por-que-programar-python"
  - "algoritmos-e-notebooks"
learning_objectives:
  - "Explicar o que é uma variável e como ela se relaciona com memória em Python."
  - "Identificar e utilizar corretamente os tipos básicos: int, float, bool e str."
  - "Escrever nomes de variáveis claros, respeitando regras de sintaxe e convenções da PEP 8."
  - "Usar comentários, docstrings e funções built‑in como type(), help() e dir() durante o desenvolvimento."
exercises:
  - question: "Por que é importante dar nomes explícitos para variáveis em vez de usar nomes como `x` ou `v1`?"
    answer: "Porque nomes explícitos tornam o código mais legível e autoexplicativo, alinhados ao Zen do Python ('explicit is better than implicit'), facilitando manutenção, debugging e colaboração."
    hint: "Lembre do exemplo em que a variável é usada para armazenar algo com significado (idade, saldo, mensagem) e de como isso aparece nos prints."
review_after_days: [1, 3, 7, 30]
---

## Visão Geral do Conceito

Esta lição apresenta a **base da manipulação de dados em Python**: variáveis, tipos de dados e estilo de código.

Você vai ver:

- como o Python usa **variáveis** como nomes para dados guardados em memória;
- quais são os **tipos básicos** (`int`, `float`, `bool`, `str`) e o que cada um representa;
- como o interpretador enxerga **nomes de variáveis** (case sensitive, palavras reservadas);
- como escrever código mais legível usando comentários, docstrings, o **Zen do Python** e a **PEP 8**.

## Modelo Mental

### Variáveis como “post‑its” apontando para a memória

Uma boa forma de pensar em variáveis:

- a memória RAM é um grande conjunto de “gavetas” numeradas;
- quando você escreve um comando de atribuição, por exemplo:

```python
idade = 25
```

o Python pede ao computador uma gaveta adequada para guardar o valor `25` e cola um “post‑it” com o nome `idade` apontando para aquela posição.

> **Modelo mental:** o nome da variável não guarda o dado em si; ele aponta para um valor em memória. Ao reatribuir (`idade = 30`), você passa a apontar para outro valor.

### Tipos de dados como significado do valor

Cada valor em Python tem um **tipo**, que diz qual o significado e quais operações fazem sentido:

- `int` (inteiro): números sem parte decimal (`1`, `0`, `-42`).
- `float` (ponto flutuante): números com casas decimais (`1.3`, `0.0`, `-2.5`).
- `bool` (booleano): valores lógicos <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`True`</mark> ou <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`False`</mark>.
- `str` (string): texto, ou seja, cadeias de caracteres como `"Introdução à programação com Python"`.

O tipo orienta o interpretador sobre:

- como armazenar o dado (representação interna);
- como operar com ele (soma, concatenação, comparações, etc.);
- que erros emitir quando uma combinação não faz sentido.

### Estilo de código: Zen do Python e PEP 8

Para além de “funcionar”, código Python deve ser **pitônico** — legível, simples e explícito.  
Do **Zen do Python** (obtido com <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`import this`</mark>), alguns princípios centrais:

- “**Beautiful is better than ugly.**”
- “**Explicit is better than implicit.**”
- “**Simple is better than complex.**”

A **PEP 8** (referência em `docAula.txt`) é o guia de estilo oficial que traduz esses princípios para regras concretas:

- nomes de variáveis em minúsculas, com <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`snake_case`</mark>;
- espaçamento consistente;
- uso adequado de comentários e docstrings;
- organização do código em funções e módulos.

## Mecânica Central

### Atribuição e nomes de variáveis

Uma atribuição simples em Python tem a forma:

```python
nome_variavel = valor
```

Componentes:

- **`nome_variavel`**: identificador que a partir de agora aponta para um valor em memória.
- **`=`**: operador de **atribuição**, não de igualdade matemática.
- **`valor`**: literal numérico, booleano, string, ou resultado de uma expressão.

#### Regras de nomes de variáveis

Em Python, nomes de variáveis:

- **devem começar** com:
  - uma letra (`a`–`z` ou `A`–`Z`), ou
  - um sublinhado (`_`);
- podem continuar com letras, dígitos ou sublinhados;
- **não podem ser palavras reservadas** (keywords) da linguagem, como:
  - <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`if`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`for`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`while`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`class`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`def`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`True`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`False`</mark>, etc.

O módulo <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`keyword`</mark> permite listar todas as keywords:

```python
import keyword

print(keyword.kwlist)
```

#### Case sensitive

Python é **case sensitive**, ou seja, diferencia maiúsculas de minúsculas:

```python
variavel = 12
Variavel = 25

print(variavel)   # 12
print(Variavel)   # 25
```

Nesse exemplo, `variavel` e `Variavel` são **variáveis diferentes**.  
Por isso, a PEP 8 recomenda padronizar: nomes de variáveis em **minúsculas** e, quando compostos, usando <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`snake_case`</mark>:

```python
idade_cliente = 30
saldo_inicial = 1000.0
```

### Tipos básicos e a função `type()`

Você pode verificar o tipo de qualquer valor ou variável com a função built‑in <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`type()`</mark>:

```python
print(type(1))           # <class 'int'>
print(type(1.3))         # <class 'float'>
print(type(True))        # <class 'bool'>
print(type("Python"))    # <class 'str'>
```

Com variáveis:

```python
inteiro = 1
flutuante = 1.3
booleano = True
mensagem = "Introdução à programação com Python"

print(type(inteiro))
print(type(flutuante))
print(type(booleano))
print(type(mensagem))
```

Python usa esses tipos para:

- decidir como representar o valor internamente;
- validar operações (por exemplo, impedir que você some texto e número sem conversão);
- oferecer métodos específicos (por exemplo, `.upper()` para strings).

### Comentários e docstrings

Comentários servem para documentar **por que** o código faz algo, não apenas “o que faz”. Em Python:

- **Comentário de linha única**: começa com `#` até o fim da linha.

```python
# Esta variável guarda a idade mínima para acesso
idade_minima = 18
```

- **Docstrings** (strings de documentação): geralmente usadas para documentar funções, classes e módulos, usando três aspas (`"""` ou `'''`):

```python
def somar(a, b):
    """
    Retorna a soma de dois números.

    Parâmetros:
        a: primeiro número (int ou float)
        b: segundo número (int ou float)
    """
    return a + b
```

No início da aula, o professor também usa docstrings como **comentários de múltiplas linhas** em um notebook; isso funciona porque o valor da string é ignorado quando não é usado em nenhuma expressão.

### Funções built‑in úteis: `help()` e `dir()`

Python disponibiliza várias funções embutidas (**built‑ins**). Três muito úteis para estudo:

- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`print()`</mark>: imprime valores no console (você já está usando).
- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`type()`</mark>: retorna o tipo de um objeto.
- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`help()`</mark> e <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`dir()`</mark>:

```python
print(dir(int))      # Lista atributos e métodos de int
help(int)            # Mostra a documentação da classe int
```

Essas funções expõem a “auto‑documentação” da linguagem e são ferramentas importantes para entender melhor tipos e funções.

## Uso Prático

### Exemplo: definindo variáveis e inspecionando tipos

```python
idade = 25                 # int
altura = 1.73              # float
tem_carteira = True        # bool
curso = "Introdução a Python"  # str

print(idade, type(idade))
print(altura, type(altura))
print(tem_carteira, type(tem_carteira))
print(curso, type(curso))
```

Saída esperada (aproximada):

```text
25 <class 'int'>
1.73 <class 'float'>
True <class 'bool'>
Introdução a Python <class 'str'>
```

### Exemplo: nomes ruins vs. bons nomes

```python
# Nomes ruins (pouco informativos)
x = 25
y = True
z = "ok"

# Nomes melhores (explícitos)
idade_cliente = 25
cliente_ativo = True
status_pedido = "aprovado"
```

Ambas as versões “funcionam”, mas apenas a segunda é legível para outra pessoa (ou para você daqui a algumas semanas).

## Erros Comuns

- **Esquecer o `#` no início de um comentário**  
  Escrever texto livre em um bloco de código sem comentar gera `SyntaxError: invalid syntax`. Sempre inicie comentários de linha com `#`.

- **Começar nomes de variáveis com dígitos**  
  Nomes como `1var` ou `2resultado` são inválidos e geram erro de sintaxe. Use letras ou `_` no início.

- **Reutilizar o mesmo nome sem perceber**  
  Atribuir um novo valor ao mesmo nome sobrescreve o anterior, sem aviso. Isso é esperado em Python, mas pode causar surpresas se você não lembrar onde a variável foi redefinida.

- **Ignorar case sensitive**  
  Achar que `variavel` e `Variavel` são a mesma coisa leva a bugs difíceis de notar. Padronize para minúsculas.

- **Misturar tipos sem conversão**  
  Tentar fazer algo como `"idade: " + 25` causa `TypeError`. É preciso converter (`str(25)`) ou usar f‑strings (`f"idade: {25}"`).

## Visão Geral de Debugging

Para depurar problemas relacionados a variáveis e tipos:

- **Quando recebe `SyntaxError` em um comentário ou nome de variável**:
  - confira se o comentário começa com `#`;
  - verifique se o nome não começa com dígito e não contém espaços;
  - revise se não usou palavra reservada (como `class`, `for`, `if`) como nome.

- **Quando o valor não é o esperado**:
  - adicione `print()` ao longo do notebook para inspecionar valores intermediários;
  - use `type()` para conferir se o tipo está coerente com o que você imagina.

- **Quando não lembra o que um tipo ou função faz**:
  - use `help(objeto)` e `dir(objeto)` para explorar a interface;
  - consulte a PEP 8 (`https://peps.python.org/pep-0008/`) para dúvidas de estilo.

## Principais Pontos

- Variáveis são **nomes** que apontam para valores em memória; a atribuição usa o operador `=`.
- Python é **case sensitive** e tem **palavras reservadas** que não podem ser usadas como nomes de variáveis.
- Os tipos básicos (`int`, `float`, `bool`, `str`) representam números inteiros, decimais, valores lógicos e texto; `type()` revela o tipo de qualquer valor.
- Comentários, docstrings, `help()` e `dir()` são aliados para escrever código legível e autoexplicativo, alinhado ao Zen do Python e à PEP 8.

## Preparação para Prática

Depois desta lição, você deve ser capaz de:

- Criar variáveis com nomes claros, seguindo convenções de estilo.
- Identificar e usar corretamente `int`, `float`, `bool` e `str`.
- Ler e interpretar mensagens de erro simples ligadas a sintaxe e nomes.
- Usar `type()`, `help()` e `dir()` para entender melhor objetos do Python.

Os exercícios do Laboratório de Prática abaixo vão consolidar esses conceitos em exemplos concretos ligados a dados do dia a dia.

## Laboratório de Prática

> Todos os códigos são boilerplates executáveis; complete onde houver `TODO`.

### Exercício Easy — Cadastro simples de aluno

Crie um pequeno script que guarda em variáveis os dados básicos de um aluno:

- `nome` (string),
- `idade` (int),
- `media_nota` (float),
- `aprovado` (bool, baseado em média ≥ 7.0).

Use `type()` para mostrar o tipo de cada variável.

```python
def main() -> None:
    # TODO: atribuir valores às variáveis abaixo, usando tipos adequados
    nome = ""         # str
    idade = 0         # int
    media_nota = 0.0  # float

    aprovado = media_nota >= 7.0  # bool derivado

    print("=== Cadastro de aluno ===")
    print("Nome:", nome, "| tipo:", type(nome))
    print("Idade:", idade, "| tipo:", type(idade))
    print("Média:", media_nota, "| tipo:", type(media_nota))
    print("Aprovado:", aprovado, "| tipo:", type(aprovado))


if __name__ == "__main__":
    main()
```

### Exercício Medium — Verificador de nomes de variáveis

Implemente uma função que receba uma string e verifique se ela **poderia** ser usada como nome de variável em Python, considerando:

- não pode começar com dígito;
- não pode ser palavra reservada;
- pode conter apenas letras, dígitos e `_`.

Use o módulo `keyword`.

```python
import keyword


def eh_nome_valido(nome: str) -> bool:
    """
    Retorna True se 'nome' pode ser usado como nome de variável em Python.
    """
    # TODO: implementar as regras descritas acima
    # 1. Verificar se nome está em keyword.kwlist.
    # 2. Verificar primeiro caractere (letra ou '_').
    # 3. Verificar se todos os caracteres são letras, dígitos ou '_'.
    return False


def main() -> None:
    print("=== Verificador de nomes de variáveis ===")
    candidatos = ["1var", "var", "for", "_oculta", "idade1", "Variavel", "True"]

    for c in candidatos:
        print(f"{c!r}: {'válido' if eh_nome_valido(c) else 'inválido'}")


if __name__ == "__main__":
    main()
```

### Exercício Hard — Diário de tipos com help() e dir()

Escreva um script que:

- Declara uma lista de exemplos de valores (`[0, 1.0, True, "python", [1, 2, 3]]`).
- Para cada valor:
  - imprime o valor e o tipo;
  - usa `dir()` para listar alguns métodos disponíveis;
  - opcionalmente, mostra um trecho curto de `help()` para um dos métodos principais (por exemplo, `help(str.upper)`).

Use comentários para explicar **o que você descobriu** sobre cada tipo.

```python
def inspecionar_objeto(obj: object) -> None:
    """
    Mostra informações básicas sobre um objeto usando type() e dir().
    """
    print("Valor:", repr(obj))
    print("Tipo:", type(obj))

    atributos = dir(obj)
    print("Alguns atributos/métodos:", atributos[:10])  # mostra só os 10 primeiros

    # TODO: para strings, chamar help(str.upper) uma vez e observar a documentação.
    # Use um comentário abaixo para registrar o que você entendeu.


def main() -> None:
    exemplos = [0, 1.0, True, "python", [1, 2, 3]]

    for objeto in exemplos:
        print("\n---")
        inspecionar_objeto(objeto)


if __name__ == "__main__":
    main()
```

<!-- CONCEPT_EXTRACTION
concepts:
  - variáveis em Python
  - tipos básicos int, float, bool, str
  - atribuição e case sensitive
  - palavras reservadas (keywords)
  - comentários e docstrings
  - funções built-in type, help, dir
  - PEP 8 e Zen do Python
skills:
  - Declarar variáveis com nomes claros e válidos
  - Escolher tipos adequados para diferentes dados
  - Usar comentários e docstrings para documentar código
  - Investigar objetos com type(), help() e dir()
examples:
  - cadastro-simples-aluno
  - verificador-nome-variavel
  - diario-tipos-help-dir
-->

<!-- EXERCISES_JSON
[
  {
    "id": "python-cadastro-simples-aluno",
    "slug": "python-cadastro-simples-aluno",
    "difficulty": "easy",
    "title": "Cadastro simples de aluno com tipos básicos",
    "discipline": "python",
    "editorLanguage": "python",
    "tags": ["python", "variaveis", "tipos"],
    "summary": "Criar variáveis para representar os dados de um aluno e inspecionar seus tipos com type()."
  },
  {
    "id": "python-verificador-nome-variavel",
    "slug": "python-verificador-nome-variavel",
    "difficulty": "medium",
    "title": "Verificar se uma string é um nome de variável válido",
    "discipline": "python",
    "editorLanguage": "python",
    "tags": ["python", "variaveis", "keywords"],
    "summary": "Implementar uma função que verifica se uma string pode ser usada como nome de variável, considerando regras de sintaxe e palavras reservadas."
  },
  {
    "id": "python-diario-tipos-help-dir",
    "slug": "python-diario-tipos-help-dir",
    "difficulty": "hard",
    "title": "Explorar tipos com type(), help() e dir()",
    "discipline": "python",
    "editorLanguage": "python",
    "tags": ["python", "tipos", "debugging"],
    "summary": "Construir um script que inspeciona diferentes tipos de objetos usando type(), dir() e help(), registrando descobertas em comentários."
  }
]
-->

