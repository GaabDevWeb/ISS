---
title: "Strings: escape, raw string, concatenação e multiplicação"
slug: "strings-escape-concatenacao"
discipline: "python"
order: 6
description: "Caracteres de escape (\\n, \\t, \\\\, \\'), raw string (r'...'), concatenação (+), multiplicação (string * int), TypeError int+str"
exercises:
  - question: "O que acontece ao executar text = 'aqui esta um texto sobre a \\'' e por que?"
    answer: "SyntaxError: unterminated string literal. A aspa simples escapada (\\') é interpretada como aspa literal, não como fechamento da string; o interpretador não encontra o fechamento na mesma linha. Para terminar a string com aspa simples visível use \\\\' no final (escape da barra e da aspa) ou delimite com aspas duplas."
    hint: "Pense em como o interpretador encontra o fim da string."
  - question: "Qual a diferença entre loren = 'sed do eiusmod tempor\\nincididunt...' e loren = 'sed do eiusmod tempor\\\\nincididunt...' ao dar print?"
    answer: "Na primeira, \\n é interpretado como quebra de linha: o texto sai em duas linhas. Na segunda, \\\\n são dois caracteres (barra e n) impressos literalmente, sem quebra. Para mostrar \\n no texto usa-se \\\\n ou raw string r'...'."
  - question: "Por que numero + string gera TypeError e como obter concatenação (texto) ou soma (número)?"
    answer: "Python tem tipagem forte: + entre int e str não é definido (soma vs concatenação ambíguo). Para concatenar: str(numero) + string. Para somar: numero + int(numero_em_string). O tipo da variável original não muda; a conversão é no momento da expressão."
  - question: "O que é raw string (r'...') e quando usar?"
    answer: "Raw string é string bruta: a barra invertida não inicia sequência de escape; \\n e \\t são dois caracteres impressos. Usar quando o texto contém muitas barras ou quando se quer \\n literal. Em raw string não dá para usar escape (\\n não vira quebra de linha)."
  - question: "O que retorna 5 * 'Python' e o que retorna 5 * 'Python\\n'? E 5 * r'Python\\n'?"
    answer: "'Python' repetido 5 vezes na mesma linha. 5 * 'Python\\n' repete a string que inclui quebra de linha, então aparecem 5 linhas com 'Python'. 5 * r'Python\\n' repete a string literal 'Python\\n' (sem quebra), tudo na mesma linha: Python\\nPython\\n..."
  - question: "Como criar um separador de 30 hífens em Python sem digitar 30 caracteres? E uma caixa '+' + linha de 30 '-' + '+'?"
    answer: "30 * '-' produz a string de 30 hífens. Para a caixa: '+' + 30*'-' + '+'. A multiplicação string * int repete a string; a concatenação com + junta as partes."
---
## Resumo

- **Escape em strings:** Barra invertida `\` indica que o próximo caractere tem tratamento especial. `\n` = quebra de linha; `\t` = tabulação (alinhamento); `\\` = uma barra literal; `\'` = aspa simples literal dentro de string delimitada por aspas simples. String terminando só com `\'` pode gerar **SyntaxError: unterminated string literal** (a aspa escapada não fecha a string).
- **Raw string:** Prefixo `r` antes das aspas (ex.: `r'...\n...'`). Tudo é tratado como caractere literal; `\n` e `\t` não são escape. Útil para texto com muitas barras ou quando se quer `\n` impresso. Dentro de raw string não há “poder” de escape.
- **Concatenação:** Operador `+` entre strings junta o texto. `nome + ' ' + sobrenome` → "Python Programming". **int + str** ou **str + int** → **TypeError: unsupported operand type(s) for +: 'int' and 'str'**. Solução: `str(numero) + string` para texto; `numero + int(numero_em_string)` para soma. A variável original não muda de tipo; `type(numero)` continua `int`.
- **Multiplicação string * int:** Repete a string. `5 * 'Python'` → "PythonPythonPythonPythonPython". `30 * '-'` para separador; `'+' + 30*'-' + '+'` para caixa. Se a string tiver `\n`, cada repetição inclui a quebra; com raw string, `\n` é impresso literalmente.
- **Formatação de saída:** `\t` em print alinha colunas; comprimento do texto antes do `\t` afeta o alinhamento. Separadores dinâmicos com `n * '-'` evitam “força bruta” de muitos caracteres.
- **Resumo em 5 linhas:** (1) Escape: `\n` quebra linha, `\t` tabulação, `\\` barra literal, `\'` aspa literal; string com `\'` no fim pode dar unterminated. (2) Raw string `r'...'`: barras e `\n`/`\t` são literais; sem escape. (3) Concatenação: `+` só entre strings; int+str → TypeError; converter com `str()` ou `int()`. (4) String * int: repete a string; útil para separadores e repetição. (5) print com `\t` e `n*'-'` formata saída; execução é sequencial (print antes de reatribuir mostra valor atual).
- **Palavras-chave:** escape, \n \t \\ \', raw string, string bruta, concatenação, operador +, TypeError int str, tipagem forte, multiplicação de strings, repetição, formatação, separador.

## Explicações

### 1. Tema e escopo

**Tema:** Sexto encontro (final da etapa 3): caracteres de escape em strings (`\n`, `\t`, `\\`, `\'`); raw string (`r'...'`); concatenação com `+` e TypeError ao misturar int e str; conversão para concatenar ou somar; multiplicação de string por inteiro (repetição); formatação de saída com `\t` e separadores dinâmicos.

**Problema que resolve:** Inserir quebras de linha e tabulação em string de uma linha; exibir barra invertida ou aspas dentro da string; juntar textos e números na saída sem erro; repetir strings (separadores, padrões); alinhar colunas no print.

**Inclui:** Recapitulação strings (aspas simples/duplas, docstring, objeto em memória); escape `\n` para quebra de linha; escape `\t` para tabulação; escape `\\` para barra literal; escape `\'` para aspa simples dentro de string com aspas simples; erros (unterminated com `\'` no fim, invalid syntax com aspas não escapadas); raw string e perda do “poder” de escape; operador `+` como concatenação; nome + ' ' + sobrenome; numero + string → TypeError; str(numero) + string e numero + int(numero_em_string); type() inalterado; string * int (5*nome, 30*'-', '+' + 30*'-' + '+'); nome = 'Python\n' e 5*nome vs r'Python\n'*5; print com \t e separadores.

**Não coberto no material:** Operador `%` para formatação (apenas erro "not all arguments converted" em exemplo); f-strings e .format(); métodos de string (split, strip, etc.); slice de strings.

### 2. Contexto na disciplina

- Último encontro da terceira etapa; segue aulas 4 e 5 (operadores/conversão, exercícios e strings básicas).
- Pré-requisito: tipos str, int; aspas simples/duplas e docstring; conversão int(), str().
- Base para qualquer programa que formate texto, leia/grave arquivos ou monte mensagens com variáveis.

### 3. Visão conceitual geral

Aula **técnica**: aprofunda strings com escape (caracteres especiais numa única linha), raw string (tudo literal) e operadores “coringa” + e * com strings: + concatena (só entre str), * repete (string * int). Reforça tipagem forte (TypeError ao misturar int e str) e uso de conversão. Formatação de saída com `\t` e separadores via repetição.

### 4. Ideias-chave (máx. 7)

1. **Escape (`\`) altera o significado do próximo caractere** — `\n` vira quebra de linha, `\t` vira tabulação, `\\` vira uma barra, `\'` vira aspa literal. Assim é possível usar aspas e barras dentro da string sem fechar ou ativar outro escape.
2. **String terminando em `\'` pode dar unterminated** — O interpretador espera fechamento com aspa; a aspa escapada é conteúdo, não delimitador. Usar `\\'` no final ou delimitar com aspas duplas evita o erro.
3. **Raw string (r'...'): nenhum escape** — Tudo é impresso como está; `\n` vira dois caracteres `\` e `n`. Útil para caminhos, regex ou texto onde se quer `\n` literal. Em raw string, `\n` não quebra linha.
4. **Concatenação exige dois str** — `+` com string só faz sentido entre strings. int + str → TypeError; converter com str() para concatenar ou com int() para somar. A variável original não muda; a conversão é só na expressão.
5. **String * int = repetição** — string * n produz a string repetida n vezes. Usado para separadores (30*'-'), caixas ('+'+30*'-'+'+') ou padrões. Se a string tiver `\n`, cada cópia inclui a quebra.
6. **Operadores “coringa”** — Com números: + soma, * multiplica. Com strings: + concatena, * repete. O mesmo símbolo com significado diferente conforme o tipo (tipagem forte impede misturar int e str no +).
7. **Execução sequencial** — Código roda de cima para baixo. Atribuir e em seguida dar print mostra o valor atual; se depois reatribuir e der print de novo, mostra o novo valor. Print antes da reatribuição usa o valor anterior.

### 5. Conceitos essenciais — explicação operacional

#### Caracteres de escape

- **Função:** Incluir em uma única linha caracteres que têm significado especial (quebra de linha, aspa, barra) sem quebrar a sintaxe.
- **\n (newline):** Quebra de linha. Ex.: `loren = "sed do eiusmod tempor\nincididunt ut labore"` → print em duas linhas. Onde colocar `\n`, a saída pula para a próxima linha.
- **\t (tab):** Tabulação; avança até a próxima “parada de tabulação”. Usado para alinhar colunas (ex.: `print('Lorem Ipsum:\t123')`). O número de caracteres antes do `\t` influencia o alinhamento visual.
- **\\ (barra literal):** Uma barra sozinha inicia escape; `\\` é uma barra impressa. Ex.: texto que termina com “barra invertida - \” → usar `'... - \\'` para não deixar string aberta.
- **\' (aspa simples literal):** Dentro de string delimitada por aspas simples, aspa sem escape fecha a string. `\'` faz a aspa ser conteúdo. Ex.: `'aqui esta um texto sobre a \'barra invertida\' - \\'` → imprime aspas em volta de “barra invertida” e uma barra no fim.
- ❌ **Erro comum:** `text = '... sobre a "'` (só uma aspa no fim) ou `'... \'` (string termina com escape de aspa e o interpretador não vê fechamento) → **SyntaxError: unterminated string literal**. Outro: string com aspas simples internas sem escape → **SyntaxError: invalid syntax** (interpretador acha que a string fechou).
- **Quando usar:** Quebra de linha em string de uma linha (`\n`); tabulação para alinhar; texto que contém `'` ou `"` ou `\` sem fechar a string.

#### Raw string (r'...')

- **Sintaxe:** Prefixo `r` (ou `R`) antes da aspa: `r'...'`, `r"..."`, `r'''...'''`.
- **Comportamento:** A barra invertida não inicia sequência de escape; `\n`, `\t`, `\\` são impressos como dois caracteres. Ex.: `r'Lorem... \nconsectetur...'` → no print aparece `\n` no texto, sem quebra.
- **Quando usar:** Texto com muitas barras (ex.: caminhos Windows), regex, ou quando se quer `\n`/`\t` literais. Quando precisar de quebra de linha de verdade, não usar raw para essa parte ou usar `\n` normal noutra string.
- **Limitação:** Dentro de raw string não há escape; não dá para “ativar” `\n` como quebra. Ex.: `nome = r'Python\n'`; `5 * nome` → "Python\n" repetido 5 vezes na mesma linha.

#### Concatenação (+)

- **Regra:** `+` entre duas strings junta o texto. `nome_completo = nome + ' ' + sobrenome` → "Python Programming" (com espaço no meio).
- **TypeError:** `numero + string` ou `string + numero` → **TypeError: unsupported operand type(s) for +: 'int' and 'str'**. Python não decide entre soma e concatenação; tipagem forte exige tipos compatíveis.
- **Solução — concatenar (resultado texto):** `str(numero) + string`. A variável `numero` continua int; na expressão o valor é convertido para str e concatenado.
- **Solução — somar (resultado número):** `numero + int(numero_em_string)`. Só funciona se o conteúdo da string for numérico; senão ValueError. Ex.: numero=123, numero_em_string='123' → resultado=246.
- **type():** `type(numero)` continua `<class 'int'>` após usar str(numero) noutra expressão; a conversão não reatribui.

#### Multiplicação string * int

- **Regra:** `string * n` com n inteiro não negativo produz a string repetida n vezes. `5 * 'Python'` → "PythonPythonPythonPythonPython". Ordem não importa: `'Python' * 5` é igual.
- **Uso típico:** Separadores: `print(30*'-')`; caixa: `print('+' + 30*'-' + '+')`. Evita digitar muitos caracteres e facilita ajuste (mudar 30 para 40).
- **String com \n:** Se `nome = 'Python\n'`, então `5 * nome` é a string "Python\n" repetida 5 vezes; no print aparecem 5 linhas com "Python". O `\n` é interpretado em cada cópia.
- **Raw string * int:** `5 * r'Python\n'` repete a string literal "Python\n" (sem quebra); saída numa linha: Python\nPython\n...

#### Formatação de saída (print com \t e separadores)

- **\t no print:** `print('Name:\t', name)` e `print('Addrs:\t', address)` alinham a segunda coluna. Comprimentos diferentes antes do `\t` geram espaços diferentes (tabulação fixa).
- **Separador dinâmico:** `print(30*'-')` em vez de `print('------------------------------')`. Facilita manter mesmo comprimento e alterar depois.
- **Caixa:** `print('+' + 30*'-' + '+')` produz linha com + nas pontas e 30 hífens no meio.

### 6. Procedimento / execução

- **Inserir quebra de linha:** Dentro da string, no ponto desejado, colocar `\n`. Ou usar docstring em múltiplas linhas.
- **Inserir barra ou aspa literal:** Usar `\\` para barra e `\'` (ou `\"`) para aspa, ou delimitar com o outro tipo de aspa.
- **Concatenar número com texto:** Converter número: `str(numero) + string` ou `string + str(numero)`. Não fazer `numero + string`.
- **Repetir string:** `n * string` ou `string * n`. Para separador: `print(30*'-')`.
- **Erro de formatação com %:** Se aparecer **TypeError: not all arguments converted during string formatting**, a string à esquerda de `%` não tem especificadores suficientes (ex.: `'123' % '456'`); o operador `%` de formatação não foi detalhado na aula — evitar usar sem especificadores.

### 7. Exemplos relevantes

- **Escape barra e aspas:** `text = 'aqui esta um texto explicativo sobre a \'barra invertida\' - \\'` → imprime texto com aspas em "barra invertida" e uma barra no fim.
- **\n e \\n:** `loren = "sed do eiusmod tempor\nincididunt ut labore"` → duas linhas; `loren = "sed do eiusmod tempor\\nincididunt..."` → `\n` impresso literalmente.
- **Raw string:** `text = r'Lorem... \nconsectetur...'` → print mostra `\n` no meio do texto, sem quebra.
- **Concatenação:** `nome = 'Python'`, `sobrenome = 'Programming'`, `nome_completo = nome + ' ' + sobrenome` → "Python Programming". `concatenar_numero_string = str(numero) + string` → "123Aqui eh uma string".
- **TypeError:** `numero + numero_em_string` com numero int e numero_em_string str → TypeError. `numero + int(numero_em_string)` → 246 (ex.: 123+123).
- **Multiplicação:** `resultado_multiplicacao_string = 5 * nome` → "PythonPythonPythonPythonPython". `nome = 'Python\n'`, `multi = 5 * nome`, `print(multi)` → Python em 5 linhas. `nome = r'Python\n'`, `multi = 5 * nome` → Python\n repetido na mesma linha.
- **Separador e caixa:** `print(30*'-')`; `print('+' + 30*'-' + '+')`; `print('Name:\t', name)`.

### 8. Diferenças e confusões comuns

- **\n vs \\n:** `\n` = um caractere (quebra de linha). `\\n` = dois caracteres (barra e n) impressos. Em raw string, `\n` é sempre os dois caracteres.
- **Concatenação vs soma:** Com dois str, + concatena. Com dois int/float, + soma. Com int e str, + não é definido → TypeError. Não é “concatenação que falhou”, é operação não permitida entre esses tipos.
- **str(numero) não altera numero:** A variável numero continua int; str(numero) é um valor usado na expressão. Atribuir a outra variável (ex.: concatenar_numero_string) guarda o resultado da concatenação.
- **Raw string e escape:** Em r'...' não existe “fazer escape” para quebra de linha; tudo é literal. Para ter quebra em raw string é preciso incluir o caractere newline de verdade (mudar de linha dentro das aspas em docstring), não `\n`.

### 9. Como cai em prova

- Perguntar o resultado de `print('a\\nb')` vs `print('a\nb')` vs `print(r'a\nb')`.
- Dar código com numero (int) + string e perguntar o que acontece (TypeError) e como corrigir (str(numero)).
- Perguntar saída de `3 * 'ab'` e de `3 * 'ab\n'`.
- Verdadeiro ou falso: “Em raw string, \n produz quebra de linha.” (Falso — em raw string \n é impresso como dois caracteres.)

### 10. Pontos de atenção

- String que termina com `\'` em aspas simples: o interpretador pode considerar a string não fechada (unterminated). Testar e, se necessário, usar `\\'` ou aspas duplas por fora.
- Aspas simples dentro de string com aspas simples sem escape → SyntaxError. Escapar com `\'` ou usar aspas duplas para delimitar.
- \t alinha a “próxima parada”; textos com tamanhos diferentes antes do \t ficam com espaços diferentes, não necessariamente alinhados num grid perfeito.
- Código executado em sequência: várias atribuições à mesma variável (name, address) seguidas de vários prints mostram um valor por vez; se todos os prints estiverem depois de todas as atribuições, só o último valor aparece em todos.

### 11. Checklist de domínio

- [ ] Sei usar \n, \t, \\, \' em strings e quando cada um é necessário.
- [ ] Sei explicar raw string (r'...') e que nela \n não quebra linha.
- [ ] Sei concatenar strings com + e evitar TypeError ao misturar int e str (str() ou int() conforme o objetivo).
- [ ] Sei usar string * int para repetir e para criar separadores (ex.: 30*'-').
- [ ] Sei prever a saída de print com \n, \\n, raw string e multiplicação (ex.: 5*'Python\n' vs 5*r'Python\n').
