# Conceitos extraídos — Aulas 01 a 10 (Python)

Conceitos, habilidades, exemplos e palavras-chave das aulas de Introdução à Programação com Python, para suporte à geração de exercícios.

---

## Aula 01 — Introdução à Programação com Python

### concepts
- pirâmide de Glasser (retenção por forma de estudo)
- curva do aprendizado / curva do esquecimento (Ebbinghaus)
- avaliação por competência (DNL, DM, ND)
- TPs obrigatórios como pré-requisito do AT
- cronograma trimestral (11 semanas, datas TP1/TP2/TP3/AT)
- Python: tipagem dinâmica e forte
- origem do Python (Guido van Rossum, 1991, Monty Python)
- linguagem de alto nível, multiplataforma, multiparadigma

### skills
- explicar o papel do aluno na EaD (prática, revisão)
- interpretar consequências de atraso (TP/AT) e prazos
- diferenciar tipagem dinâmica e tipagem forte

### examples
- (conceitual: relógio tkinter como motivação; sem código detalhado)

### keywords
- Python, pirâmide de Glasser, curva do aprendizado, curva do esquecimento, avaliação por competência, AT, TP, tipagem dinâmica, tipagem forte, TIOBE, pensamento computacional

---

## Aula 02 — Algoritmos e ambiente de programação

### concepts
- algoritmo (sequência explícita, limitada, sistemática; clareza, finitude, determinístico)
- pensamento computacional / algorítmico
- Deepnote: workspace, projetos, notebooks, blocos (Code, SQL, Text, Chart, Input)
- TPs obrigatórios; consequências de atraso (DL, D, reprovação)
- níveis de competência (ND, D, DL, DML)

### skills
- definir algoritmo e citar as três características
- identificar workspace, projeto e tipos de blocos no Deepnote
- explicar regras de TP/AT e níveis ND/D/DL/DML

### examples
- algoritmo “fazer café” em lista e pseudo-código; função `fazer_cafe()` com `print()` por passo
- notebook com células de código e saída (ex.: Fibonacci, matplotlib)

### keywords
- algoritmo, clareza, finitude, determinístico, pensamento computacional, Deepnote, IDE, workspace, projeto, notebook, blocos, ND, D, DL, DML

---

## Aula 03 — Variáveis e tipos de dados

### concepts
- variável (abstração de armazenamento na memória)
- tipo de dado (semântica do valor: int, float, bool, str)
- comentário de linha (`#`) e docstring (`'''` / `"""`)
- nomes válidos: começar com letra ou `_`; palavras reservadas
- convenções PEP 8, snake_case, Zen do Python
- case sensitive; reatribuição (último valor vale)
- tipagem dinâmica; tudo é objeto
- `type()`, `help()`, `dir()`

### skills
- escrever comentário de linha e docstring
- criar variáveis com nomes válidos e convenções PEP 8
- usar `type()`, `help()` e `dir()` para inspecionar tipos

### examples
- `# Hello World` + `print("Hello World!")`
- `var = 1`, `outra_variavel = False`; `type(1)` → `<class 'int'>`
- `variavel_dinamica = 1` depois `variavel_dinamica = False` (tipagem dinâmica)
- `import this` (Zen do Python)

### keywords
- variável, tipo de dado, int, float, bool, str, type(), comentário, docstring, palavra reservada, snake_case, atribuição, case sensitive, tipagem dinâmica, PEP 8, Zen do Python, help, dir

---

## Aula 04 — Conversão de tipos e operadores aritméticos

### concepts
- conversão de tipos: `int()`, `float()`, `bool()`, `str()`
- tipagem forte (string não numérica → int/float gera ValueError)
- operadores aritméticos: `+`, `-`, `*`, `/`, `//`, `%`, `**`
- divisão `/` (sempre float em Python 3) vs `//` (piso) e `%` (resto)
- precedência: `()` > `**` > `*` `/` `//` `%` > `+` `-`
- truncamento em `int(float)` (sem arredondamento)

### skills
- converter valores com `int()`, `float()`, `str()` e evitar ValueError
- usar operadores aritméticos e respeitar precedência
- distinguir `/`, `//` e `%` em expressões

### examples
- `str(12)` → `'12'`; `int(12.98)` → `12`; `float('3.14')` → `3.14`
- `17 // 4` → 4; `17 % 4` → 1; `17 ** 4` → 83521
- `float('texto')` → ValueError

### keywords
- conversão de tipos, int(), float(), bool(), str(), tipagem forte, ValueError, operadores aritméticos, divisão inteira, módulo, exponenciação, precedência, piso

---

## Aula 05 — Exercícios resolvidos e strings

### concepts
- fórmula ºC → ºF: `graus_fahrenheit = graus_celsius * 9/5 + 32`
- retângulo: perímetro = soma dos lados; área = base × altura
- atribuição encadeada `a = b = valor` (avaliação da direita para a esquerda)
- raiz como potência: `x ** (1/2)`, `x ** (1/3)`
- string: aspas simples/duplas (uma linha); docstring para multilinha
- aspas no texto: delimitar com o tipo oposto para evitar SyntaxError
- convenção de nomes (ex.: base/altura no retângulo)

### skills
- implementar conversão ºC→ºF, perímetro e área do retângulo
- usar atribuição encadeada e raiz via `** (1/n)`
- definir strings com aspas e docstring; evitar unterminated string literal

### examples
- `graus_celsius = 0`; `graus_fahrenheit = graus_celsius * 9/5 + 32`
- `lado_a = lado_b = 10`, `lado_c = lado_d = 50`; `perimetro_retangulo = lado_a + lado_b + lado_c + lado_d`
- `loren = 'Lorem... "de Finibus"...'` (aspas duplas no texto → aspas simples por fora)

### keywords
- Celsius, Fahrenheit, retângulo, perímetro, área, média geométrica, desvio padrão, raiz quadrada, potência 1/2 1/3, atribuição encadeada, string, aspas simples/duplas, docstring, SyntaxError unterminated string literal

---

## Aula 06 — Strings: escape, concatenação e multiplicação

### concepts
- escape: `\n` (quebra), `\t` (tab), `\\` (barra), `\'` (aspa)
- raw string `r'...'` (nenhum escape interpretado)
- concatenação com `+` só entre strings; `int + str` → TypeError
- multiplicação `str * int` (repetição da string)
- tipagem forte na concatenação (usar `str()` ou `int()` conforme objetivo)

### skills
- usar `\n`, `\t`, `\\`, `\'` e raw string `r'...'`
- concatenar strings e converter com `str()`/`int()` para evitar TypeError
- usar `string * n` para separadores (ex.: `30*'-'`)

### examples
- `print('A\nB')` → A, quebra, B; `print(r'A\nB')` → A\nB
- `str(123) + 'abc'` → `'123abc'`; `123 + 'abc'` → TypeError
- `5 * 'Python'` → `'PythonPythonPythonPythonPython'`; `print(30*'-')`

### keywords
- escape, raw string, concatenação, multiplicação de strings, tipagem forte, TypeError, str(), int()

---

## Aula 07 — Strings: índices, slice e métodos

### concepts
- índices positivos (0 = primeiro) e negativos (-1 = último)
- operador `[]` para um caractere; slice `[inicio:fim:passo]` (fim não-inclusivo)
- passo negativo: `[::-1]` para inverter string
- `len()` é builtin (não método): `len(s)` ✅, `s.len()` → AttributeError
- métodos: `upper()`, `lower()`, `isupper()`, `islower()`, `swapcase()`, `capitalize()`, `title()`, `replace(old, new)` (case-sensitive), `split(sep)`, `join(lista)`, `strip()`
- `split` e `join` como operações inversas

### skills
- acessar caractere por índice e usar slice com fim não-inclusivo
- inverter string com `[::-1]`
- usar métodos de caixa e `replace()`; diferenciar `capitalize()` e `title()`
- usar `split()` e `join()`; chamar `len(s)` (não `s.len()`)

### examples
- `hello = 'hello python'`; `hello[2]` → `'l'`; `hello[-6]` → `'p'`
- `hello[2:7]` → `'llo p'`; `hello[::-1]` → `'nohtyp olleh'`
- `'hello python'.capitalize()` → `'Hello python'`; `.title()` → `'Hello Python'`
- `', '.join(['a', 'b', 'c'])` → `'a, b, c'`

### keywords
- índice, índice negativo, [], slice, passo, não-inclusivo, substring, upper, lower, swapcase, capitalize, title, replace, len, split, join, strip, AttributeError, IndexError, case-sensitive

---

## Aula 08 — Formatação de strings e input()

### concepts
- interpolação: estilo `%` (`%s`, `%d`, `%f`, `%%`); `.format()` com `{}` (posição/nome); f-string (código Python nas chaves)
- precisão decimal: `%.2f`, `:.2f` em f-string
- `input()` sempre retorna `str`; converter com `int()` ou `float()` antes de operar
- TypeError ao operar resultado de `input()` sem conversão

### skills
- usar estilo `%`, `.format()` e f-string para interpolação
- usar f-string com expressões/métodos nas chaves
- capturar entrada com `input()` e converter com `int(input())` ou `float(input())`

### examples
- `'%s pesa %d kg' % ('gato', 5)`; `'%.2f' % 63.155` → `'63.16'`
- `'The {thing} is in the {place}'.format(thing='duck', place='bathtub')`
- `f'The {thing.capitalize()} is in the {place}'`
- `graus_f = int(input('Digite Fahrenheit: '))`; usar `graus_f` em cálculo

### keywords
- interpolação, estilo %, %s, %d, %f, %%, .format(), f-string, {}, input(), int(), float(), TypeError, ValueError

---

## Aula 09 — Desvio condicional

### concepts
- `if` / `else` (dois caminhos); `elif` (múltiplos testes encadeados)
- bloco definido por indentação (obrigatório); `:` após condição
- operadores relacionais: `<`, `>`, `==`, `>=`, `<=`
- notação de intervalo: `18.5 <= imc <= 24.9`
- operador `%` para par/ímpar: `numero % 2 == 0`
- usar `==` na condição (não `=`); primeiro `elif` verdadeiro executa, demais ignorados

### skills
- escrever `if/else` e `if/elif/else` com indentação correta
- usar notação de intervalo e `%` para divisibilidade
- evitar `=` em condição (usar `==`)

### examples
- `if numero % 2 == 0: mensagem = 'PAR'` / `else: mensagem = 'IMPAR'`
- `if media >= 7: ... elif media >= 5: ... else: ...`
- `if 18.5 <= imc <= 24.9: mensagem = 'Peso ideal (Normal)'`

### keywords
- if, elif, else, bloco de código, indentação, ==, %, notação de intervalo, SyntaxError, IndentationError

---

## Aula 10 — Operadores lógicos e match/case

### concepts
- `and` (todos True → True); `or` (um True → True); `not` (inverte)
- tabela verdade para AND e OR
- `if` sem `else` é válido; ifs aninhados
- padronização de string: `strip().lower()` (ou `upper()`) ao comparar com input
- valores falsy: `False`, `None`, `0`, `''`; demais truthy
- `match/case` (Python 3.10+): correspondência por valor; alternativa a if/elif

### skills
- combinar condições com `and`, `or`, `not` e parênteses
- aplicar tabela verdade em expressões
- comparar input com `texto.strip().lower() == 'sim'`
- usar `match/case` quando a versão for 3.10+

### examples
- `if (numero_1 > 10) and (numero_2 < 5): print('Teste realizado')`
- `resposta = input('Sim ou nao? ').strip().lower(); if resposta == 'sim': ...`
- `match dia: case 1: print('Domingo') case 2: print('Segunda') ...`

### keywords
- and, or, not, tabela verdade, if opcional, ifs aninhados, strip, lower, truthy, falsy, match, case, PEP 636, Python 3.10

---

## Resumo consolidado (para geração de exercícios)

### concepts (aglutinado)
- Algoritmo (clareza, finitude, determinístico); pensamento computacional; Deepnote (workspace, projetos, blocos).
- Variável, tipo (int, float, bool, str); comentário e docstring; PEP 8, snake_case; tipagem dinâmica e forte; type(), help(), dir().
- Conversão int/float/bool/str; operadores aritméticos e precedência; / vs // vs %.
- Strings: aspas, docstring, escape, raw string, concatenação, multiplicação; índices e slice (fim não-inclusivo, [::-1]); métodos (upper, lower, capitalize, title, replace, split, join, strip); len() como builtin.
- Interpolação (%, .format(), f-string); input() retorna str; conversão com int()/float().
- if/else/elif; indentação e bloco; operadores relacionais; notação de intervalo; % para par/ímpar.
- and, or, not; tabela verdade; padronização de string (strip().lower()); truthy/falsy; match/case (3.10+).

### skills (aglutinado)
- Definir algoritmo e usar Deepnote.
- Criar variáveis, comentar, inspecionar tipos.
- Converter tipos e usar operadores aritméticos.
- Manipular strings (escape, concatenação, slice, métodos, formatação).
- Capturar e converter input(); montar mensagens com f-string.
- Escrever condições com if/elif/else e notação de intervalo.
- Combinar condições com and/or/not; padronizar comparação de strings; usar match/case quando aplicável.

### examples (referências rápidas)
- `type(x)`, `int(12.98)`, `17 // 4`, `17 % 4`
- `'a\nb'` vs `r'a\nb'`; `str(123) + 'abc'`; `5 * 'Python'`
- `s[2]`, `s[2:7]`, `s[::-1]`; `s.upper()`, `s.capitalize()`, `s.title()`; `len(s)`; `sep.join(lista)`
- `f'{x}'`, `int(input('...'))`
- `if n % 2 == 0:`; `if 18.5 <= imc <= 24.9:`
- `(a and b)`; `texto.strip().lower() == 'sim'`; `match x: case 1: ...`

### keywords (aglutinado)
- algoritmo, variável, tipo, int, float, bool, str, comentário, docstring, PEP 8, snake_case, tipagem dinâmica, tipagem forte, type, help, dir, conversão, operadores aritméticos, //, %, **, precedência, string, escape, raw string, concatenação, slice, índice, upper, lower, capitalize, title, replace, split, join, strip, len, interpolação, %, .format(), f-string, input, if, elif, else, indentação, notação de intervalo, and, or, not, tabela verdade, strip, lower, truthy, falsy, match, case, Python 3.10
