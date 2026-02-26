---
title: "Formatação de Strings e input()"
slug: "strings-formatacao-input"
discipline: "python"
order: 8
description: "Interpolação de strings com %, .format() e f-strings; entrada do usuário com input() e conversão de tipo"
reading_time: 7
difficulty: "medium"
concepts:
  - interpolação de strings
  - estilo %
  - .format()
  - f-strings
  - input()
  - conversão de tipo com input
prerequisites: ["aula-07-strings-indices-slice-metodos"]
exercises:
  - question: "Qual a diferença entre %s, %d e %f no estilo % de formatação?"
    answer: "%s formata como string, %d como inteiro decimal, %f como float. %% representa um % literal na saída. Ex.: print('%s pesa %d kg' % ('gato', 5)) → 'gato pesa 5 kg'."
  - question: "O que print('%.2f' % 63.155) imprime e por quê?"
    answer: "'63.16' — %.2f limita a 2 casas decimais com arredondamento automático. O 5 na 3ª casa arredonda a 2ª para cima."
    hint: "O número antes do f define a quantidade de casas decimais."
  - question: "Qual a diferença entre '{}'.format(a, b) e '{0} {1}'.format(a, b)?"
    answer: "No primeiro, {} posicional preenche em ordem (primeiro {} recebe a, segundo {} recebe b). Em '{0} {1}', os índices são explícitos — trocar para '{1} {0}' inverte sem mudar os argumentos."
  - question: "Por que f'{thing.capitalize()} is in the {place.rjust(20)}' é válido, mas '{thing + place}'.format(thing='a', place='b') gera KeyError?"
    answer: "Em f-strings, qualquer código Python é executado dentro de {}. Em .format(), as chaves aceitam apenas referência por posição ou nome — não expressões ou operações."
    hint: "f-string aceita código Python completo; .format() aceita apenas referências."
  - question: "graus_f = input('Digite Fahrenheit: '). Por que graus_c = (graus_f - 32) * 5/9 gera TypeError?"
    answer: "input() sempre retorna str. Operar str - int gera TypeError: unsupported operand type(s) for -: 'str' and 'int'. Correto: graus_f = int(graus_f) antes da operação, ou int(input('...'))."
  - question: "Quais as duas formas equivalentes de capturar e converter input() para inteiro?"
    answer: "1) Duas linhas: n = input('...'); n = int(n). 2) Uma linha: n = int(input('...')). Ambas capturam a string e convertem para int. Usar float() se o valor puder ter decimais."
---
## Resumo

### Mapa da aula

- Interpolação: inserir variáveis em strings dinamicamente — três estilos
- Estilo <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`%`</mark>: legado; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`.format()`</mark>: intermediário; f-string: moderno e preferido
- f-string aceita código Python completo dentro de <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`{}`</mark>
- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`input()`</mark> sempre retorna <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`str`</mark> — sem exceções
- Erro clássico: operar <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`input()`</mark> sem converter → <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`TypeError`</mark>

- **Resumo consolidado:** Interpolação torna strings dinâmicas substituindo marcadores por valores em tempo de execução. Estilo <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`%`</mark> usa <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`%s`</mark>/<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`%d`</mark>/<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`%f`</mark>/<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`%%`</mark>; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`.format()`</mark> usa <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`{}`</mark> por posição ou nome; f-string (prefixo <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`f`</mark>) executa Python real nas chaves. <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`input()`</mark> captura digitação como <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`str`</mark>; para aritmética, converter com <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`int()`</mark> ou <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`float()`</mark>.
- **Resumo em 5 linhas:** (1) <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`'%s pesa %d' % ('gato', 28)`</mark> → substituição posicional por tipo. (2) <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`'{} pesa {}'.format('gato', 28)`</mark> → posicional por ordem ou índice. (3) <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`f'{coisa.capitalize()} na {lugar.rjust(10)}'`</mark> → Python completo nas chaves. (4) <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`input()`</mark> retorna <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`str`</mark>; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`int(input())`</mark> converte na captura. (5) <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`TypeError: unsupported operand type(s)`</mark> = operação aritmética com string.
- **Palavras-chave:** interpolação, estilo <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`%`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`%s`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`%d`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`%f`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`%%`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`.format()`</mark>, f-string, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`{}`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`input()`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`int()`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`float()`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`TypeError`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`ValueError`</mark>.

## Explicações

### 1. Tema e escopo

**Tema:** Oitavo encontro — interpolação de strings (3 estilos) e entrada do usuário com <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`input()`</mark>.

**Inclui:** Estilo <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`%`</mark> com <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`%s`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`%d`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`%f`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`%%`</mark>, precisão decimal (<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`%.2f`</mark>); <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`.format()`</mark> posicional, por índice e por nome; f-strings com código Python nas chaves; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`input()`</mark>; conversão de tipo com <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`int()`</mark> e <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`float()`</mark>.

**Não coberto:** Formatação avançada de <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`.format()`</mark> (alinhamento, padding); f-string com debug <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`f'{var=}'`</mark> (Python 3.8+); especificadores <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`%`</mark> para outros sistemas de numeração (octal, binário).

### 2. Contexto na disciplina

- Fecha o bloco de strings (aulas 3–8); combina tudo que foi visto com dados do usuário.
- Pré-requisito: [[aula-07-strings-indices-slice-metodos]] (métodos de string), [[aula-04-operadores-conversao-tipos]] (conversão de tipos).
- Base para: exercícios interativos, programas que processam entrada real do usuário.

### 3. Visão conceitual geral

Aula **técnica**. Interpolação torna strings dinâmicas — em vez de concatenar com <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`+`</mark>, Python substitui marcadores por valores em tempo de execução. Três gerações de sintaxe coexistem: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`%`</mark> (legado, Python 2), <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`.format()`</mark> (PEP 3101) e f-string (PEP 498, Python 3.6+). <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`input()`</mark> introduz interatividade — o usuário decide o valor em execução, mas o retorno é sempre <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`str`</mark>.

### 4. Ideias-chave

1. **Interpolação ≠ concatenação:** marcadores substituídos automaticamente; mais legível e menos sujeito a <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`TypeError`</mark> de tipos.
2. **Três estilos, preferência clara:** f-string é o padrão moderno; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`%`</mark> e <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`.format()`</mark> aparecem em código legado.
3. **f-string aceita Python completo nas chaves:** métodos, operações, expressões — único dos três com esse poder.
4. **Precisão decimal:** <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`%.2f`</mark> arredonda para 2 casas; disponível em <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`%`</mark> e via <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`:.2f`</mark> em f-string.
5. **<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`input()`</mark> = str obrigatório:** número digitado vira `'32'`, não `32` — sem exceções.
6. **Conversão explícita obrigatória:** <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`int(input())`</mark> ou <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`float(input())`</mark> antes de operar numericamente.
7. **<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`TypeError`</mark> diagnóstica:** ao ver `unsupported operand type(s) for -: 'str' and 'int'`, a causa é quase sempre <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`input()`</mark> sem converter.

### 5. Conceitos essenciais — explicação operacional

#### Estilo <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`%`</mark>

- Marcadores na string; valores após <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`%`</mark> — tupla obrigatória para mais de um valor.
- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`%s`</mark> → string; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`%d`</mark> → inteiro; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`%f`</mark> → float (6 casas por padrão); <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`%%`</mark> → literal `%`.
- Precisão: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`%.5f`</mark> = 5 casas decimais com arredondamento automático.

```bash
cat = 'Chester'
weight = 28
print('Our cat %s weighs %s pounds' % (cat, weight))
# Our cat Chester weighs 28 pounds

value = 63.15983493
print('%f' % value)    # 63.159835
print('%.5f' % value)  # 63.15983
print('%.2f' % value)  # 63.16  (arredondou)
print('%d%%' % 100)    # 100%
```

- **Quando NÃO usar:** código novo — f-string é preferida.
- ❌ <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`'%s %s' % var1, var2`</mark> (sem parênteses) → <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`TypeError`</mark>. Correto: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`'%s %s' % (var1, var2)`</mark>.

#### Método <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`.format()`</mark>

- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`{}`</mark> na string; valores como parâmetros de <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`.format()`</mark>.
- Posicional (<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`{}`</mark> ou <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`{0}`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`{1}`</mark>) ou nomeado (<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`{thing}`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`{place}`</mark>).

```bash
thing = 'woodchuck'
place = 'lake'

print('The {} is in the {}.'.format(thing, place))
# The woodchuck is in the lake.

print('The {1} is in the {0}.'.format(place, thing))
# The woodchuck is in the lake. (índices invertidos)

print('The {thing} is in the {place}.'.format(thing='duck', place='bathtub'))
# The duck is in the bathtub
```

- ❌ <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`'{thing + place}'.format(thing='a', place='b')`</mark> → <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`KeyError`</mark> — operações não são aceitas nas chaves.

#### f-strings

- Prefixo <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`f`</mark> antes das aspas; Python completo dentro de <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`{}`</mark>.

```bash
thing = 'wereduck'
place = 'werepond'

print(f'The {thing} is in the {place}')
# The wereduck is in the werepond

print(f'The test with format string (concat): {thing + place}')
# The test with format string (concat): wereduckwerepond

print(f'The {thing.capitalize()} is in the {place.rjust(20)}')
# The Wereduck is in the            werepond
```

- **Quando usar:** sempre em código novo — mais legível e mais poderoso.
- ❌ Strings aninhadas com as mesmas aspas dentro de <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`{}`</mark> geram <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`SyntaxError`</mark>.

#### <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`input()`</mark>

- Abre caixa de entrada no terminal; pausa execução até Enter.
- Argumento opcional: mensagem de prompt exibida ao usuário.
- Retorna **sempre** <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`str`</mark> — mesmo se o usuário digitar um número.

```bash
name = input('Qual o seu nome: ')
print(f'Hello World {name}, python is fatastic!')
# Qual o seu nome: Gesiel Lopes
# Hello World Gesiel Lopes, python is fatastic!
```

#### Conversão obrigatória com <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`input()`</mark>

```bash
# ERRO: input() retorna str; str - int → TypeError
graus_f = input('Digite o valor em Graus Fahrenheit: ')
graus_c = (graus_f - 32) * 5/9  # TypeError!

# CORRETO: converter antes de operar
graus_f = input('Digite o valor em Graus Fahrenheit: ')
graus_f = int(graus_f)
graus_c = (graus_f - 32) * 5/9
print(f'Graus Fahrenheit: {graus_f} em Graus Celsius: {graus_c}')

# ALTERNATIVA: converter na captura
graus_f = int(input('Digite o valor em Graus Fahrenheit: '))
graus_c = (graus_f - 32) * 5/9
```

- Usar <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`float()`</mark> se o valor puder ter decimais.
- ❌ <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`int('3.14')`</mark> → <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`ValueError`</mark> — string com ponto não converte para int.

### 5b. Modelo mental

**Estilo `%`:** Python varre a string, encontra marcadores <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`%s`</mark>/<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`%d`</mark>/<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`%f`</mark>, e substitui pelos valores da tupla na mesma ordem, convertendo cada valor para o tipo indicado.

**`.format()`:** Constrói a string e depois chama o método — os <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`{}`</mark> são "slots" numerados ou nomeados que o método preenche. Não executa código — só referencia valores.

**f-string:** Em tempo de compilação, Python identifica tudo que está dentro de <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`{}`</mark>, executa como código Python e insere o resultado na string. É o único dos três que executa código real.

**`input()`:** Pausa a execução, mostra o prompt, aguarda Enter e retorna tudo digitado como <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`str`</mark> — sem conversão implícita, sempre.

### 6. Teste de reconhecimento rápido

**Qual a saída?**
```bash
print('%s pesa %d kg' % ('gato', 5))
```
**Resposta:** `gato pesa 5 kg`

**Qual a saída?**
```bash
print('%.2f' % 63.155)
```
**Resposta:** `63.16` — <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`%.2f`</mark> arredonda para 2 casas; o 5 na 3ª casa arredonda para cima.

**O que acontece?**
```bash
n = input('Digite: ')  # usuário digita 32
resultado = n - 10
```
**Resposta:** <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`TypeError: unsupported operand type(s) for -: 'str' and 'int'`</mark> — <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`input()`</mark> retornou `'32'` (string).

**Qual a saída?**
```bash
a, b = 'duck', 'bathtub'
print(f'The {a.capitalize()} is in the {b}')
```
**Resposta:** `The Duck is in the bathtub`

**Qual a saída?**
```bash
print('The {1} is in the {0}'.format('lake', 'duck'))
```
**Resposta:** `The duck is in the lake` — índice 0 = `'lake'`, índice 1 = `'duck'`; chaves com índices trocados invertem a ordem.

### 7. Erros clássicos de prova

- **Esquecer tupla no estilo <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`%`</mark> com múltiplos valores:** <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`'%s %s' % a, b`</mark> → <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`TypeError`</mark>. Correto: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`'%s %s' % (a, b)`</mark>.
- **Usar operação dentro de <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`.format()`</mark>:** <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`'{a+b}'.format(a=1, b=2)`</mark> → <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`KeyError`</mark>. Só f-string aceita expressões.
- **Assumir que <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`input()`</mark> retorna número:** sempre retorna <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`str`</mark> — pegadinha mais cobrada do bloco.
- **<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`int()`</mark> em float string:** <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`int('3.14')`</mark> → <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`ValueError`</mark>. Usar <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`float('3.14')`</mark>.
- **Confundir <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`%f`</mark> com <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`%.2f`</mark>:** <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`%f`</mark> mostra 6 casas por padrão; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`%.2f`</mark> limita e arredonda.

### 8. Exemplos de alta densidade

```bash
print('%s' % 42)
```
Saída: `42`

```bash
print('%.2f' % 63.159)
```
Saída: `63.16`

```bash
print('%d%%' % 100)
```
Saída: `100%`

```bash
print('{}'.format('woodchuck'))
```
Saída: `woodchuck`

```bash
print('{1} {0}'.format('B', 'A'))
```
Saída: `A B`

```bash
x = 'duck'
print(f'{x.upper()} says quack')
```
Saída: `DUCK says quack`

```bash
n = int(input())  # usuário digita 10
print(n + 5)
```
Saída: `15`

```bash
v = 63.15983493
print(f'{v:.2f}')
```
Saída: `63.16`

### 11. Diferenças e confusões comuns

- **<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`.format()`</mark> vs f-string:** ambos usam <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`{}`</mark>, mas f-string executa código Python real; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`.format()`</mark> só referencia valores por posição ou nome.
- **<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`int()`</mark> vs <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`float()`</mark> no <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`input()`</mark>:** <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`int()`</mark> falha se o usuário digitar `3.5`; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`float()`</mark> aceita tanto `3` quanto `3.5`.
- **Interpolação vs concatenação:** <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`f'Olá {name}'`</mark> é mais claro e seguro que <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`'Olá ' + name`</mark> — concatenação com tipos diferentes gera <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`TypeError`</mark>.

Veja também: [[aula-04-operadores-conversao-tipos]] (conversão de tipos), [[aula-06-strings-escape-concatenacao]] (concatenação).

### 15. Síntese operacional

- Estilo <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`%`</mark>: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`%s`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`%d`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`%f`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`%%`</mark>; precisão com <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`%.2f`</mark>; tupla obrigatória para múltiplos valores.
- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`.format()`</mark>: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`{}`</mark> posicional, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`{0}`</mark>/<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`{nome}`</mark> por referência; sem expressões nas chaves.
- f-string: prefixo <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`f`</mark>; código Python completo em <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`{}`</mark>; padrão moderno preferido.
- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`input()`</mark> sempre retorna <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`str`</mark>; converter com <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`int()`</mark> ou <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`float()`</mark> antes de operar.
- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`TypeError: unsupported operand type(s)`</mark> = esqueceu de converter <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`input()`</mark>.
- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`int('3.14')`</mark> → <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`ValueError`</mark>; usar <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`float('3.14')`</mark> para strings com decimais.
