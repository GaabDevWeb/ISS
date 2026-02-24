---
title: "Strings: índices, slice e métodos"
slug: "strings-indices-slice-metodos"
discipline: "python"
order: 7
description: "Operador [], índices positivos/negativos, fatiamento com slice [inicio:fim:passo] e métodos essenciais de string"
reading_time: 8
difficulty: "medium"
concepts:
  - índices de string
  - operador []
  - slice
  - passo negativo
  - métodos de string
prerequisites: ["aula-06-strings-escape-concatenacao"]
exercises:
  - question: "hello = 'hello python'. Qual o resultado de hello[2] e hello[-6]?"
    answer: "hello[2] → 'l' (índice positivo, terceira posição, começa em 0). hello[-6] → 'p' (índice negativo conta do fim: -1 é 'n', ..., -6 é 'p')."
    hint: "Índice 0 é o primeiro caractere. Índice -1 é o último."
  - question: "Por que hello[2:7] retorna 5 caracteres e não 6?"
    answer: "O parâmetro fim no slice é não-inclusivo: retorna do índice 2 até o 6 (7 - 1). Sempre que fim = n, o último índice incluído é n-1."
    hint: "Regra fundamental do slice: fim não entra na contagem."
  - question: "Qual slice retorna a string 'hello python' invertida? Dê duas soluções."
    answer: "hello[::-1] (passo -1, percorre do fim ao início, sem especificar início/fim). Alternativa: hello[-1::-1] ou, para parte específica, hello[-1:-13:-1]."
  - question: "O que é errado em hello.len() e como corrigir?"
    answer: "len() é função builtin, não método de string. Chamar hello.len() gera AttributeError: 'str' object has no attribute 'len'. Correto: len(hello)."
    hint: "Métodos usam ponto-notação: hello.upper(). Funções builtin envolvem o objeto: len(hello)."
  - question: "hello = 'HELLO PYTHON'. O que retorna hello.replace('A', '4')? E hello.replace('a', '4')?"
    answer: "hello.replace('A', '4') → 'HELLO PYTHON' (não há 'A' minúsculo — sem alteração). Espera, 'HELLO PYTHON' não tem 'A'. hello.replace('L', '4') → 'HE44O PYTHON'. replace() é case-sensitive: só substitui ocorrências exatas do caractere especificado."
    hint: "replace() diferencia maiúsculas de minúsculas."
  - question: "Qual a diferença entre capitalize() e title()?"
    answer: "capitalize(): primeira letra da string em maiúscula, todas as demais em minúscula. title(): primeira letra de cada palavra em maiúscula. Ex.: 'hello python'.capitalize() → 'Hello python'; 'hello python'.title() → 'Hello Python'."
  - question: "', '.join(['hello', 'mundo', 'python']) — qual é a saída e o que join() faz?"
    answer: "Saída: 'hello, mundo, python'. join() concatena os itens de uma lista de strings usando o separador definido antes do ponto (',' + espaço neste caso). É o inverso do split()."
---
## Resumo

### Mapa da aula

- String é cadeia de caracteres; cada posição tem índice (positivo e negativo)
- Operador <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`[]`</mark> acessa um caractere; slice <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`[inicio:fim:passo]`</mark> extrai substring
- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`fim`</mark> no slice é **não-inclusivo**; passo negativo inverte direção
- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`[::-1]`</mark> inverte a string — padrão idiomático cobrado em prova
- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`len()`</mark> é função builtin (não método); <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`replace()`</mark> é case-sensitive

- **Resumo consolidado:** String = lista de caracteres indexada do 0 ao len-1 (positivos) e do -1 ao -len (negativos). <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`hello[i]`</mark> acessa posição i. <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`hello[inicio:fim:passo]`</mark> retorna substring: fim não-inclusivo, passo default 1, passo negativo inverte percurso. Métodos encadeados via ponto: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`upper()`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`lower()`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`isupper()`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`islower()`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`swapcase()`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`capitalize()`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`title()`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`replace(old, new)`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`split(sep)`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`join(lista)`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`strip()`</mark>. <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`len()`</mark> é builtin — não usar ponto-notação.
- **Resumo em 5 linhas:** (1) <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`hello[2]`</mark> = char na posição 2; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`hello[-6]`</mark> = char na 6ª posição a partir do fim. (2) <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`hello[2:7]`</mark> = chars das posições 2 a 6 (fim não-inclusivo); <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`hello[::2]`</mark> = um em dois. (3) <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`[::-1]`</mark> inverte string; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`hello[-1:-7:-1]`</mark> = substring invertida parcial. (4) Métodos de caixa: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`upper`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`lower`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`swapcase`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`capitalize`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`title`</mark>; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`replace`</mark> é case-sensitive. (5) <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`len(s)`</mark> — builtin; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`split`</mark> divide; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`join`</mark> une; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`strip`</mark> remove espaços das bordas.
- **Palavras-chave:** índice, índice negativo, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`[]`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`slice`</mark>, passo, não-inclusivo, substring, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`upper`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`lower`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`swapcase`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`capitalize`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`title`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`replace`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`len`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`split`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`join`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`strip`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`AttributeError`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`IndexError`</mark>, case-sensitive.

## Explicações

### 1. Tema e escopo

**Tema:** Sétimo encontro — acesso a caracteres por índice, fatiamento de strings (slice) e métodos essenciais de manipulação.

**Problema que resolve:** Extrair partes de uma string sem reescrever; inverter texto; verificar e transformar caixa; dividir e unir strings; limpar espaços extras.

**Inclui:** Operador <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`[]`</mark> com índices positivos e negativos; slice <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`[inicio:fim:passo]`</mark> com todos os parâmetros; métodos <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`upper`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`lower`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`isupper`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`islower`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`swapcase`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`capitalize`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`title`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`replace`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`split`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`join`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`strip`</mark>; função builtin <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`len`</mark>; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`help()`</mark> para consultar documentação.

**Não coberto:** <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`startswith()`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`endswith()`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`find()`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`count()`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`format()`</mark>, f-strings.

### 2. Contexto na disciplina

- Fecha a sequência de strings (aulas 4–7); tudo a partir daqui usa indexação e métodos.
- Pré-requisito: variáveis, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`print()`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`type()`</mark>, operadores, escape e concatenação ([[aula-06-strings-escape-concatenacao]]).
- Base para: validação de entrada, manipulação de dados textuais, listas (mencionado como spoiler: string é lista unidimensional).

### 3. Visão conceitual geral

Aula **técnica**. Python trata strings como sequências indexadas: cada caractere ocupa uma posição com dois índices (positivo e negativo). O operador <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`[]`</mark> acessa posições individuais; o slice recorta intervalos. Métodos são funções acopladas ao objeto string via ponto-notação. <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`len()`</mark> é exceção — função builtin, não método.

### 4. Ideias-chave (máx. 7)

1. **Índice começa em zero:** posição 0 = primeiro char; posição len-1 = último. Cobrado em prova: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`hello[0]`</mark> ≠ <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`hello[1]`</mark>.
2. **Índice negativo:** -1 = último, -2 = penúltimo, -len = primeiro. Equivalente simétrico ao positivo; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`hello[2]`</mark> == <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`hello[-10]`</mark> para string de 12 chars.
3. **Fim não-inclusivo no slice:** <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`hello[2:7]`</mark> retorna 5 chars (posições 2,3,4,5,6). Pegadinha clássica de prova.
4. **Passo negativo inverte direção:** com passo -1 Python percorre de trás para frente. <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`[::-1]`</mark> é o idioma padrão para inverter string — cai em prova.
5. **<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`len()`</mark> é builtin, não método:** <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`len(hello)`</mark> ✅ — <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`hello.len()`</mark> → <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`AttributeError`</mark>. Único da lista que não usa ponto-notação.
6. **<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`replace()`</mark> é case-sensitive:** <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`'HELLO'.replace('h','x')`</mark> não altera nada; diferencia maiúsculas/minúsculas.
7. **<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`split`</mark> / <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`join`</mark> são inversos:** <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`split`</mark> decompõe string em lista; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`join`</mark> compõe lista em string com separador.

### 5. Conceitos essenciais — explicação operacional

#### Operador <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`[]`</mark> — acesso por índice

- **Definição:** Acessa o caractere na posição i da string. Aceita positivo (0 = início) ou negativo (-1 = fim).
- **Exemplo:**

```bash
hello = 'hello python'
print(hello[2])    # 'l' (posição 2)
print(hello[5])    # ' ' (espaço também é caractere)
print(hello[-6])   # 'p' (6ª posição a partir do fim)
print(hello[-1])   # 'n' (último)
```

- **Quando usar:** Acessar caractere específico por posição conhecida.
- **Quando NÃO usar:** Para extrair mais de um caractere — usar slice.
- ❌ <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`hello[12]`</mark> → <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`IndexError: string index out of range`</mark> (índice fora dos limites).

#### Slice <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`[inicio:fim:passo]`</mark>

- **Definição:** Extrai substring. <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`fim`</mark> é não-inclusivo. Parâmetros são opcionais.
- **Regras de omissão:** <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`inicio`</mark> omitido = posição 0; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`fim`</mark> omitido = até o fim; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`passo`</mark> omitido = 1.
- **Exemplo básico:**

```bash
hello = 'hello python'
print(hello[2:7])    # 'llo p' (posições 2,3,4,5,6)
print(hello[-8:])    # 'o python' (de -8 até o fim)
print(hello[:-3])    # 'hello pyt' (do início até -4)
print(hello[1:10:3]) # 'eoy' (posições 1,4,7)
```

- **Passo negativo — inverter:**

```bash
hello = 'hello python'
print(hello[::-1])        # 'nohtyp olleh' — string inteira invertida
print(hello[-1:-7:-1])    # 'nohtyp' — 'python' invertido
```

- **Quando usar passo negativo:** Inverter string ou percorrer do fim para o início.
- ⚠️ <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`hello[-1:-6:-1]`</mark> retorna apenas 5 chars (fim -6 não-inclusivo), não 6.

#### Métodos de caixa

- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`upper()`</mark> → tudo maiúsculo; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`lower()`</mark> → tudo minúsculo.
- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`isupper()`</mark> / <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`islower()`</mark> → <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`True`</mark>/<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`False`</mark>; úteis em validação.
- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`swapcase()`</mark> → inverte cada letra (maiúscula vira minúscula e vice-versa).
- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`capitalize()`</mark> → primeira letra maiúscula, **restante minúscula** (afeta toda a string).
- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`title()`</mark> → primeira letra de **cada palavra** em maiúscula.

```bash
s = 'hello python'
print(s.upper())       # 'HELLO PYTHON'
print(s.capitalize())  # 'Hello python'
print(s.title())       # 'Hello Python'
print(s.swapcase())    # 'HELLO PYTHON' (já está em minúsculas → vira maiúsculas)
```

#### <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`replace(old, new)`</mark> — substituição

- **Regra:** Case-sensitive. Retorna nova string; original não é alterada.

```bash
curso = 'INTRODUCAO A PROGRAMACAO COM PYTHON'
print(curso.replace('A', '4'))  # 'INTRODUC4O 4 PROGR4M4C4O COM PYTHON'
print(curso.replace('a', '4'))  # sem alteração — 'a' minúsculo não existe
```

#### <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`len()`</mark> — comprimento

- **Regra:** Função builtin — envolve o objeto, não usa ponto.

```bash
hello = 'hello python'
print(len(hello))   # 12
# hello.len()       # AttributeError — NÃO existe
```

#### <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`split(sep)`</mark> e <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`join(lista)`</mark>

- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`split()`</mark> sem argumento divide por espaço em branco; com argumento divide pelo separador.
- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`join()`</mark> é chamado **na string separador**, recebendo a lista como argumento.

```bash
hello = 'hello python'
partes = hello.split()          # ['hello', 'python']
partes_p = hello.split('p')     # ['hello ', 'ython']

lista = ['hello python', 'Gesiel Lopes', 'Introducao a programacao']
print(', '.join(lista))         # 'hello python, Gesiel Lopes, Introducao a programacao'
```

#### <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`strip()`</mark> — remoção de bordas

- Remove espaços (ou char especificado) do **início e do fim** da string (não do meio).

```bash
s = '   hello python   '
print(s.strip())       # 'hello python'
print(s.strip(' '))    # 'hello python' (mesmo resultado com espaço explícito)
```

### 5b. Modelo mental

**Indexação:** Python monta internamente dois "marcadores" para cada posição: o positivo (0 → N-1) e o negativo (-N → -1). <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`hello[i]`</mark> busca diretamente nessa tabela — acesso O(1).

**Slice:** Python aplica três valores (inicio, fim, passo) e percorre a sequência pulando <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`passo`</mark> posições por vez, coletando cada caractere encontrado antes de atingir <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`fim`</mark> (exclusivo). Com passo negativo, começa do fim e caminha para trás.

**Métodos vs builtin:** Métodos (<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`upper()`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`replace()`</mark>) pertencem ao objeto <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`str`</mark> — chamados com ponto. <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`len()`</mark> é builtin separado que funciona em qualquer sequência (strings, listas, etc.) — por isso não usa ponto.

### 6. Teste de reconhecimento rápido

**Qual a saída?**
```bash
hello = 'hello python'
print(hello[0])
```
**Resposta:** `h`

**Qual a saída?**
```bash
hello = 'hello python'
print(hello[2:7])
```
**Resposta:** `llo p` (posições 2,3,4,5,6 — fim 7 não-inclusivo)

**Qual a saída?**
```bash
hello = 'hello python'
print(hello[::-1])
```
**Resposta:** `nohtyp olleh`

**O que acontece?**
```bash
hello = 'hello python'
print(hello.len())
```
**Resposta:** `AttributeError: 'str' object has no attribute 'len'` — usar <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`len(hello)`</mark>.

**Qual a saída?**
```bash
s = 'HELLO'
print(s.replace('h', 'x'))
```
**Resposta:** `HELLO` — <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`replace`</mark> é case-sensitive; `'h'` minúsculo não existe na string toda em maiúscula.

**Qual a saída?**
```bash
print(', '.join(['a', 'b', 'c']))
```
**Resposta:** `'a, b, c'`

### 7. Erros clássicos de prova

- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`hello[7]`</mark> inclui o char 7 — **verdadeiro**. <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`hello[2:7]`</mark> inclui o char 7 — **falso** (fim não-inclusivo).
- Confundir <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`hello.len()`</mark> (AttributeError) com <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`len(hello)`</mark> (correto).
- Achar que <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`[::-1]`</mark> exige especificar início e fim — não exige; omitidos, percorre tudo.
- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`capitalize()`</mark> coloca apenas a **primeira letra** em maiúscula e **força minúsculas nas demais** — diferente de <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`title()`</mark> que trata cada palavra.
- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`replace('a', 'x')`</mark> em string com 'A' → não substitui; case-sensitive.
- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`split()`</mark> sem argumento divide por espaço; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`split('p')`</mark> divide pelo caractere `'p'` — resultados diferentes.

### 8. Exemplos de alta densidade

```bash
hello = 'hello python'
hello[2]
```
Saída: `'l'`

```bash
hello[-1]
```
Saída: `'n'`

```bash
hello[2:7]
```
Saída: `'llo p'`

```bash
hello[1:10:3]
```
Saída: `'eoy'`

```bash
hello[::-1]
```
Saída: `'nohtyp olleh'`

```bash
hello[-1:-7:-1]
```
Saída: `'nohtyp'`

```bash
len('hello python')
```
Saída: `12`

```bash
'hello python'.upper()
```
Saída: `'HELLO PYTHON'`

```bash
'hello python'.capitalize()
```
Saída: `'Hello python'`

```bash
'hello python'.title()
```
Saída: `'Hello Python'`

```bash
'hello python'.split()
```
Saída: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`['hello', 'python']`</mark>

```bash
', '.join(['a', 'b', 'c'])
```
Saída: `'a, b, c'`

```bash
'   hello   '.strip()
```
Saída: `'hello'`

### 9. Procedimento / execução

- **Acessar caractere:** <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`string[indice]`</mark> — positivo (0 = início) ou negativo (-1 = fim).
- **Extrair substring:** <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`string[inicio:fim]`</mark> — inicio inclusivo, fim exclusivo.
- **Inverter string:** <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`string[::-1]`</mark> — omitir inicio e fim, passo -1.
- **Verificar/transformar caixa:** <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`.isupper()`</mark> / <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`.islower()`</mark> para checar; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`.upper()`</mark> / <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`.lower()`</mark> para converter.
- **Substituir:** <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`.replace(old, new)`</mark> — atenção ao case; retorna nova string, não altera original.
- **Dividir:** <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`.split(sep)`</mark> — sem argumento usa espaço; retorna lista.
- **Unir:** <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`sep.join(lista)`</mark> — chamar no separador, passar lista.
- **Limpar bordas:** <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`.strip()`</mark> — remove espaços (ou char especificado) início e fim.
- **Consultar documentação:** <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`help(str.replace)`</mark> ou <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`help(str.strip)`</mark> no interpretador.

### 10. Exemplos relevantes

- **Desafio da aula — retornar `'nohtyp'`:**

```bash
hello = 'hello python'
print(hello[::-1])         # 'nohtyp olleh' — string inteira invertida
print(hello[-1:-7:-1])     # 'nohtyp' — apenas 'python' invertido
print(hello[:-7:-1])       # 'nohtyp' — equivalente (fim -7 não-inclusivo)
```

- **Formatação de listagem com tabulação (reutilizando padrão da aula 6):**

```bash
ola = 'olá mundo'
print(ola[2:7])      # 'á mun'
print(ola[-1:-4:-1]) # 'odn'
print(ola.upper())   # 'OLÁ MUNDO'
print(ola.title())   # 'Olá Mundo'
```

- **split + join — processar CPF com máscara:**

```bash
cpf = '123.456.789-00'
partes = cpf.split('.')   # ['123', '456', '789-00']
print(partes[0])          # '123'
```

Veja também: [[aula-06-strings-escape-concatenacao]] (concatenação e multiplicação de strings), [[aula-03-variaveis-tipos]] (tipo <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`str`</mark>).

### 11. Diferenças e confusões comuns

- **<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`capitalize()`</mark> vs <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`title()`</mark>:** <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`capitalize`</mark> afeta toda a string (resto fica minúsculo); <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`title`</mark> afeta apenas as iniciais de cada palavra, não forçando minúsculas no restante do token.
- **<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`split()`</mark> vs <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`split(' ')`</mark>:** sem argumento divide por qualquer espaço em branco (e ignora múltiplos espaços); com `' '` divide por espaço literal (pode gerar strings vazias).
- **<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`join()`</mark> invertido:** a sintaxe <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`sep.join(lista)`</mark> é contraintuitiva. O separador é o objeto, a lista é o argumento.
- **Índice vs slice:** <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`hello[5]`</mark> retorna <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`str`</mark> de 1 char; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`hello[5:6]`</mark> também, mas como slice retorna <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`str`</mark> (mesma saída, mecanismo diferente).

### 12. Como cai em prova

- Dar uma string e pedir a saída de <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`string[i]`</mark> com índice positivo ou negativo específico.
- Dar slice com passo e pedir a saída — testar entendimento de fim não-inclusivo e saltos.
- Pedir o slice que inverte a string (resposta: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`[::-1]`</mark>).
- Mostrar <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`string.len()`</mark> e perguntar o que acontece (AttributeError).
- Dar string com mistura de maiúsculas e pedir resultado de <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`capitalize()`</mark> — pegadinha: transforma restante em minúsculo.
- Perguntar diferença entre <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`split('a')`</mark> e <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`split()`</mark>.

### 13. Pontos de atenção

- **Índice começa em 0**, não em 1. <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`hello[1]`</mark> é o **segundo** caractere.
- **Fim do slice não é incluído** — <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`hello[2:5]`</mark> retorna chars 2, 3, 4 (não 5).
- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`len(hello)`</mark> retorna 12; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`hello[12]`</mark> → <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`IndexError`</mark> (último válido é <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`hello[11]`</mark>).
- Métodos de string **não alteram** a variável original — retornam nova string. Para persistir: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`hello = hello.upper()`</mark>.

### 14. Checklist de domínio

- [ ] Sei acessar caractere por índice positivo e negativo com <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`[]`</mark>.
- [ ] Sei usar slice <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`[inicio:fim:passo]`</mark> e prever a saída incluindo fim não-inclusivo.
- [ ] Sei inverter string com <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`[::-1]`</mark> e explicar por que funciona.
- [ ] Sei a diferença entre <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`capitalize()`</mark> e <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`title()`</mark>.
- [ ] Sei que <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`len()`</mark> é builtin (não método) e evito <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`string.len()`</mark>.
- [ ] Sei usar <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`split()`</mark> e <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`join()`</mark> e entendo que são operações inversas.
- [ ] Sei usar <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`strip()`</mark> para limpar bordas de string.

### 15. Síntese operacional

- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`string[i]`</mark> acessa char; positivo (0=início) ou negativo (-1=fim); <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`IndexError`</mark> se fora do limite.
- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`string[inicio:fim:passo]`</mark> extrai substring; fim não-inclusivo; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`[::-1]`</mark> inverte.
- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`len(string)`</mark> — builtin, sem ponto; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`string.len()`</mark> → <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`AttributeError`</mark>.
- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`capitalize()`</mark> = 1ª maiúscula + restante minúsculo; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`title()`</mark> = inicial de cada palavra maiúscula.
- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`replace(old, new)`</mark> é case-sensitive; retorna nova string sem alterar a original.
- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`split()`</mark> decompõe em lista; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`sep.join(lista)`</mark> recompõe com separador.
