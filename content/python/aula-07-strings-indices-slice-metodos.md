---
title: "Strings em Python: índices, slices e métodos úteis"
slug: "strings-indices-slice-metodos"
discipline: "python"
order: 7
description: "Como enxergar strings como sequências indexadas de caracteres, usar o operador [] para indexação e slicing, e aplicar métodos úteis para análise e limpeza de texto."
reading_time: 50
difficulty: "easy"
concepts:
  - strings
  - sequência de caracteres
  - índice positivo
  - índice negativo
  - operador colchete []
  - slicing [inicio:fim:passo]
  - substrings
  - métodos de string
  - len
  - split
  - join
  - strip
  - upper/lower/title
prerequisites:
  - "por-que-programar-python"
  - "algoritmos-e-notebooks"
  - "variaveis-tipos-estilo-python"
  - "conversao-tipos-operadores-aritmeticos"
  - "strings-literais-multilinhas"
  - "strings-escape-concatenacao"
learning_objectives:
  - "Enxergar strings como sequências indexadas de caracteres, com índices positivos e negativos."
  - "Usar o operador colchete [] para acessar um único caractere de uma string."
  - "Aplicar slicing [inicio:fim:passo] para criar substrings e percorrer texto com passos diferentes, incluindo fatias invertidas."
  - "Utilizar métodos de string (`upper`, `lower`, `title`, `replace`, `split`, `join`, `strip`, entre outros) para análise e limpeza de dados textuais."
exercises:
  - question: "Qual a diferença entre acessar `hello[2]` e `hello[2:7]` em uma string como `hello = 'hello python'`, e por que dizemos que o índice final do slice é 'não inclusivo'?"
    answer: "`hello[2]` acessa apenas um caractere na posição de índice 2 (no exemplo, o `'l'`), enquanto `hello[2:7]` cria uma nova string contendo todos os caracteres do índice 2 até o índice 6; o índice 7 funciona como 'fronteira de parada', não entra na fatia. Dizemos que o índice final é não inclusivo porque o caractere nessa posição não é incluído na substring: o Python pega de `inicio` até `fim - 1`."
    hint: "Compare o diagrama de índices na lousa (0..11 e -12..-1) com a saída do exemplo `hello[2:7]` na aula, que resulta em `'llo p'`."
review_after_days: [1, 3, 7, 30]
---

## Visão Geral do Conceito

Até aqui você aprendeu a **criar** strings (aspas, multilinhas, escapes) e a concatenar ou repetir texto.
Nesta aula você vai enxergar strings como **sequências indexadas de caracteres** e aprender a:

- acessar um caractere específico com o operador colchete `[]`;
- recortar pedaços (substrings) com **slicing** `[inicio:fim:passo]`;
- aplicar métodos úteis para **analisar e limpar texto** (como `upper`, `lower`, `replace`, `split`, `join`, `strip`).

> **Resumo em uma frase:** string em Python é uma sequência indexada; dominar índices, slices e métodos é a base para qualquer tipo de processamento de texto em projetos de dados.

## Modelo Mental

Use a metáfora da aula: pense na string como uma **lista unidimensional de caracteres**.

```python
hello = "hello python"
```

Visualmente:

- índice positivo (da esquerda para a direita):  
  `h   e   l   l   o       p   y   t   h   o   n`  
  `0   1   2   3   4   5   6   7   8   9   10  11`
- índice negativo (da direita para a esquerda):  
  `h   e   l   l   o       p   y   t   h   o   n`  
  `-12 -11 -10 -9  -8  -7  -6  -5  -4  -3  -2  -1`

A variável `hello` aponta para essa “lista de 12 chars”.
O operador `[]` é o **acesso a uma posição** dessa lista; o slicing `[inicio:fim:passo]` é como pedir “um pedaço dessa sequência”.

## Mecânica Central

### Acessando um caractere com `[]`

Com o operador colchete, você pega **um único caractere** pelo índice:

```python
hello = "hello python"

print(hello[2])   # índice positivo 2 -> 'l'
print(hello[5])   # índice 5 -> espaço ' '
print(hello[-6])  # índice negativo -6 -> 'p'
```

- `hello[2]` lê “caractere armazenado na posição de índice 2”.
- `hello[-6]` lê “caractere na posição -6 contando da direita para a esquerda”.

Se você usar essa notação em um notebook (Deepnote, Jupyter) como **última linha da célula**, o ambiente mostra o próprio valor da string, mesmo sem `print()`.

### Slicing: `[inicio:fim:passo]`

O slicing cria **substrings** a partir da string original:

- `[inicio:fim]` → vai do índice `inicio` até `fim - 1` (fim é **não inclusivo**);
- `[inicio:fim:passo]` → percorre a sequência com o passo informado;
- qualquer um dos três parâmetros pode ser omitido.

Exemplos equivalentes aos da aula:

```python
hello = "hello python"

print(hello[2:7])      # 'llo p'
print(hello[1:10:3])   # 'eoy'
print(hello[-8:])      # 'o python'
print(hello[:-3])      # 'hello pyt'
```

- `hello[2:7]`: pega índices 2,3,4,5,6 → `'llo p'`;
- `hello[1:10:3]`: começa no índice 1 (`'e'`), vai até 9 pulando de 3 em 3 → `'eoy'`;
- `hello[-8:]`: de `-8` até o fim (`'o python'`);
- `hello[:-3]`: do início até o índice `-3` (não incluso) → `'hello pyt'`.

### Slices invertidos com passo negativo

Quando o passo é negativo, o Python percorre a string de **trás para frente**.
O exemplo da aula para inverter a string inteira:

```python
hello = "hello python"

invertida = hello[::-1]
print(invertida)  # 'nohtyp olleh'
```

E o desafio “como retornar `NOHTYP`?” é uma variação onde você escolhe bem o `inicio`, o `fim` e o `passo` para pegar só a parte `'python'` na ordem inversa.

### Métodos úteis de `str`

Alguns dos métodos demonstrados no notebook:

- `upper()` / `lower()` / `swapcase()` / `capitalize()` / `title()`  
- `replace(antigo, novo)`  
- função built-in `len(obj)`  
- `split(separador)`  
- `join(iterável_de_strings)`  
- `strip(chars)`  
- `help(obj.metodo)` para ver a docstring.

Exemplos:

```python
hello = "hello python"
nome = "Gesiel Lopes"
curso = "INTRODUCAO A PROGRAMACAO COM PYTHON"

print(hello.upper())      # 'HELLO PYTHON'
print(nome.lower())       # 'gesiel lopes'
print(nome.swapcase())    # 'gESIEL lOPES'
print(hello.capitalize()) # 'Hello python'
print(curso.title())      # 'Introducao A Programacao Com Python'

print(hello.replace(" ", "--"))  # 'hello--python'
print(len(hello))                # 12
```

`split` e `join`:

```python
texto = "hello python"
print(texto.split(" "))   # ['hello', 'python']

string_list = [hello, nome, curso]
using_join_in_string_list = " - ".join(string_list)
print(using_join_in_string_list)
```

`strip` (limpeza de espaços e caracteres nas bordas):

```python
strip_exemplo = "   exemplo de strip   "
print(strip_exemplo.strip())      # 'exemplo de strip'
print("hello python".strip("hn")) # remove 'h'/'n' no início/fim se existirem
```

Você pode usar `help(str.strip)` ou `help(curso.strip)` para ver a documentação completa direto no notebook.

### Diagrama: índices, slices e passo

```mermaid
flowchart TD
    A[String original 'hello python'] --> B[Escolher índice ou fatia]
    B --> C{Acessar um único índice?}
    C -- sim --> D[Usar hello[indice]<br/>retorna 1 caractere]
    C -- não --> E[Definir inicio, fim, passo]
    E --> F[Slice hello[inicio:fim:passo]]
    F --> G{passo > 0?}
    G -- sim --> H[Percorrer da esquerda para a direita<br/>de inicio até fim-1]
    G -- não --> I[Percorrer da direita para a esquerda<br/>de inicio até fim+1]
    F --> J[Resultado é uma nova string (substring)]
```

## Uso Prático

### Exemplos de ADS onde isso aparece o tempo todo

- **Normalizar nomes e títulos**: usar `strip()`, `title()`, `upper()` e `lower()` para padronizar campos como nome de cliente, curso ou produto.
- **Validar formatos simples**: usar slices para extrair prefixos, sufixos e partes de identificadores (por exemplo, validar se um código começa com `"BR-"` ou se um CNPJ tem o número de dígitos correto).
- **Parsear arquivos de texto e logs**: usar `split()` para quebrar linhas em campos, `join()` para remontar textos, e slices para pegar “colunas” fixas em formatos legados.

## Erros Comuns

- **Confundir posição com índice**: lembrar que a “primeira letra” está no índice `0`, não em `1`.
- **Esquecer que o `fim` do slice é não inclusivo**: `texto[0:3]` pega índices `0,1,2`, não `0,1,2,3`.
- **Misturar índices positivos e negativos sem pensar na direção do passo**: `texto[2:-1]` é diferente de `texto[-1:2:-1]`.
- **Achar que `len(texto)` é um método de string** (`texto.len()`); na verdade, é uma função built-in que recebe o objeto como argumento.

## Visão Geral de Debugging

Quando algo estranho acontece com um índice ou slice:

1. **Imprima o texto e os índices** que você acha que está usando, desenhando na lousa (ou em comentário) o mapeamento de 0..n-1 e -n..-1.
2. Teste **passos menores**: primeiro `texto[inicio:fim]`, depois adicione o `passo`.
3. Use `len(texto)` para checar se seu índice está dentro dos limites (de `-len` até `len-1`).
4. Para métodos, chame `help(str.metodo)` ou `help(texto.metodo)` e leia a docstring, como na aula com `help(curso.strip)`.

## Principais Pontos

- Strings são **sequências indexadas** de caracteres com índices positivos e negativos.
- O operador `[]` acessa um caractere; o slicing `[inicio:fim:passo]` cria novas strings a partir da original.
- O índice final do slice é **não inclusivo**; o passo pode ser positivo ou negativo.
- Métodos de string como `upper`, `lower`, `title`, `replace`, `split`, `join` e `strip` são ferramentas fundamentais para limpar e transformar texto em projetos de dados.

## Preparação para Prática

Depois desta lição, você deve conseguir:

- navegar por uma string usando índices e slices para extrair pedaços específicos;
- limpar entradas textuais vindas de formulários, CSVs ou APIs usando métodos de `str`;
- combinar `split` e `join` para reestruturar textos (por exemplo, nomes completos, frases, logs).

No **Laboratório de Prática** você vai aplicar esses conceitos em tarefas típicas de ADS: extrair partes de códigos/textos, padronizar nomes e limpar ruído de espaços.

## Laboratório de Prática

### Desafio Easy — Extrair caracteres por posição

Você está recebendo códigos simples de produtos em um arquivo CSV, e precisa extrair algumas informações de posição fixa.

```python
def extrair_caracteres_codigo(codigo: str) -> tuple[str, str, str]:
    """
    Recebe um código de produto como string, por exemplo 'AB1234X',
    e retorna uma tupla com:
      - primeira_letra: caractere no índice 0
      - ultima_letra: caractere no índice -1
      - miolo: substring do índice 2 até o penúltimo caractere

    Exemplos:
      'AB1234X' -> ('A', 'X', '1234')
    """
    # TODO:
    #   1. Usar indexação simples para pegar primeira e última letra.
    #   2. Usar slicing para pegar o "miolo" (sem as duas letras externas).
    primeira_letra = ""
    ultima_letra = ""
    miolo = ""
    return primeira_letra, ultima_letra, miolo
```

### Desafio Medium — Normalizar nome completo de cliente

Em um cadastro de clientes, os nomes chegam com capitalização e espaços inconsistentes.
Você precisa padronizar esses nomes antes de salvar no banco de dados.

```python
def normalizar_nome_cliente(nome_bruto: str) -> str:
    """
    Recebe um nome de cliente potencialmente "sujo", por exemplo:
      "   gEsIeL   lOpEs   "
    e retorna uma versão normalizada:
      "Gesiel Lopes"

    Regras:
      - Remover espaços extras no início e no fim.
      - Substituir múltiplos espaços internos por um único espaço.
      - Capitalizar cada parte do nome (estilo título).
    """
    # TODO:
    #   1. Usar strip() para remover espaços nas bordas.
    #   2. Usar split() para quebrar nas partes do nome.
    #   3. Normalizar cada parte com lower()/title().
    #   4. Rejuntar com " ".join(...).
    nome_normalizado = ""
    return nome_normalizado
```

### Desafio Hard — Fatiar e reformatar identificadores de registro

Você recebe identificadores de registro no formato `"2026-03-ADS-00123"`, e precisa separar e remontar essas informações em diferentes formatos para relatórios.

```python
from typing import Dict

def analisar_identificador_registro(identificador: str) -> Dict[str, str]:
    """
    Recebe um identificador no formato 'AAAA-MM-CURSO-NNNNN', por exemplo:
      '2026-03-ADS-00123'

    Deve retornar um dicionário com:
      - ano: '2026'
      - mes: '03'
      - curso: 'ADS'
      - numero: '00123'
      - formato_curto: '2026/03-00123'
      - formato_legivel: 'Curso ADS - março/2026 - registro 00123'

    (Não se preocupe com nomes reais de meses; você pode apenas reutilizar o '03'
     no formato_legivel, ou fazer um mapeamento simples se quiser.)
    """
    # TODO:
    #   1. Usar split('-') para quebrar o identificador em partes.
    #   2. Extrair ano, mes, curso e numero.
    #   3. Montar os formatos adicionais usando f-strings ou concatenação.
    resultado: Dict[str, str] = {}
    return resultado
```

<!-- CONCEPT_EXTRACTION
concepts:
  - sequência de caracteres
  - índice positivo e negativo em strings
  - operador colchete []
  - slicing [inicio:fim:passo]
  - substrings
  - métodos de string (upper, lower, swapcase, capitalize, title, replace, split, join, strip)
  - função len para tamanho de strings
skills:
  - Acessar caracteres específicos em uma string usando índices positivos e negativos
  - Criar substrings com slicing, incluindo fatias invertidas com passo negativo
  - Padronizar e limpar textos com métodos de string em pipelines de dados
  - Quebrar e remontar textos com split() e join()
  - Medir o tamanho de strings e usá-lo para validar formatos simples
examples:
  - hello-python-indices-e-slices
  - normalizar-nome-completo-cliente
  - analisar-identificador-registro
-->

<!-- EXERCISES_JSON
[
  {
    "id": "python-extrair-caracteres-codigo-produto",
    "slug": "python-extrair-caracteres-codigo-produto",
    "difficulty": "easy",
    "title": "Extrair caracteres de código de produto por índice",
    "discipline": "python",
    "editorLanguage": "python",
    "tags": ["python", "strings", "indices", "slicing"],
    "summary": "Use indexação simples e slicing para extrair partes de um código de produto como primeira letra, última letra e miolo numérico."
  },
  {
    "id": "python-normalizar-nome-completo-cliente",
    "slug": "python-normalizar-nome-completo-cliente",
    "difficulty": "medium",
    "title": "Normalizar nome completo de cliente com métodos de string",
    "discipline": "python",
    "editorLanguage": "python",
    "tags": ["python", "strings", "limpeza-dados"],
    "summary": "Limpe e padronize nomes de clientes removendo espaços extras e aplicando capitalização adequada usando split, join, strip e title."
  },
  {
    "id": "python-analisar-identificador-registro",
    "slug": "python-analisar-identificador-registro",
    "difficulty": "hard",
    "title": "Analisar e reformatar identificadores de registro",
    "discipline": "python",
    "editorLanguage": "python",
    "tags": ["python", "strings", "slicing", "split", "formatacao"],
    "summary": "Receba identificadores no formato AAAA-MM-CURSO-NNNNN, extraia as partes com split e slicing e gere formatos alternativos para relatórios."
  }
]
-->

