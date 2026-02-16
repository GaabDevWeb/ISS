---
title: "Variáveis e tipos de dados"
slug: "variaveis-tipos"
discipline: "python"
order: 3
description: "Comentários, variáveis, tipos básicos, nomes válidos, convenções PEP 8 e Zen do Python"
exercises:
  - question: "O que é uma variável e o que é tipo de dado (conceito da aula)?"
    answer: "Variável: abstração de um local de armazenamento de dados na memória; os dados armazenados podem mudar ao longo da execução (daí o nome variável). Tipo de dado: determina o significado (semântica) do valor armazenado na variável; o computador usa o tipo para otimizar armazenamento e operações."
  - question: "Quais são os quatro tipos de dados básicos em Python e como identificar o tipo de um valor?"
    answer: "int (inteiro), float (ponto flutuante), bool (True/False), str (cadeia de caracteres, entre aspas simples ou duplas). Usar a função built-in type(valor) ou type(variavel) para obter o tipo em tempo de execução."
  - question: "Como se faz comentário de uma linha e comentário de múltiplas linhas em Python?"
    answer: "Uma linha: # (jogo da velha/c cerquilla); tudo após o # na mesma linha é ignorado. Múltiplas linhas: docstring com três aspas consecutivas no início e no fim (''' texto ''' ou \"\"\" texto \"\"\"); aspas simples ou duplas funcionam."
  - question: "Quais as regras para um nome de variável ser válido em Python? O que são palavras reservadas?"
    answer: "Nome deve começar com letra ou underscore (_); em seguida pode ter letras, números, underscore. Não pode começar com número (ex.: 1var gera SyntaxError: invalid decimal literal). Palavras reservadas (keywords) são termos da sintaxe do Python (if, def, class, True, False, and, or, import, etc.) e não podem ser usadas como nome de variável."
  - question: "O que significa Python ser case sensitive? E o que acontece se atribuir outro valor à mesma variável duas vezes?"
    answer: "Case sensitive: Python diferencia maiúsculas de minúsculas; variavel e Variavel são duas variáveis diferentes. Se atribuir duas vezes ao mesmo nome (ex.: variavel = 12; variavel = 30), a última atribuição vale — você redefine o valor; o interpretador não avisa que o nome já existia."
  - question: "O que é tipagem dinâmica no Python? Dê um exemplo."
    answer: "O interpretador define o tipo da variável em tempo de execução conforme o valor atribuído; não é preciso declarar o tipo. A mesma variável pode receber depois um valor de outro tipo: ex. variavel_dinamica = 1 (tipo int), depois variavel_dinamica = False (tipo bool) — o tipo da variável muda."
  - question: "Para que servem type(), help() e dir()? O que é PEP 8?"
    answer: "type(x): retorna o tipo do objeto (ex.: <class 'int'>). help(obj): abre a documentação do objeto (ex.: help(int)). dir(obj): lista atributos e métodos do objeto. PEP 8: guia de estilo para código Python (legibilidade e consistência); convenções de nomenclatura, indentação, etc."
---
## Resumo

- **Variável:** Abstração de local de armazenamento de dados na memória; o valor pode mudar durante a execução. **Tipo de dado:** significado (semântica) do valor; o computador usa para otimizar armazenamento e operações.
- **Tipos básicos Python:** `int` (inteiro), `float` (ponto flutuante), `bool` (True/False), `str` (cadeia de caracteres; aspas simples ou duplas). Ver tipo:
```bash
type(valor)
```
ou:
```bash
type(variavel)
```
- **Comentários:** Uma linha: `#` (tudo após na mesma linha é ignorado). Múltiplas linhas: docstring `''' ... '''` ou `""" ... """`. Texto sem `#` em linha de código gera **SyntaxError** (interpretador tenta executar como instrução).
- **Nomes de variáveis:** Devem começar com **letra** ou **underscore (_)**; depois podem ter letras, números, underscore. Não podem começar com número (`1var` → SyntaxError: invalid decimal literal). **Palavras reservadas** (keywords: True, False, if, def, class, import, etc.) não podem ser usadas como nome.
- **Convenções (PEP 8 / Zen):** Nomes em caixa baixa; semântica clara (explícito > implícito); palavras compostas em **snake_case** (ex.: `outra_variavel`). Operador de atribuição: `=`. Python é **case sensitive** (`variavel` ≠ `Variavel`). Mesma variável atribuída de novo: último valor vale.
- **Tipagem dinâmica:** O interpretador define o tipo em tempo de execução; não se declara tipo; a mesma variável pode passar a guardar valor de outro tipo. **Tudo em Python é objeto;** classe = estrutura, objeto = instância.
- **Funções built-in:**
```bash
type(x)
help(obj)
dir(obj)
```
**PEP 8:** guia de estilo para código pythônico. **Zen do Python:**
```bash
import this
```
(bonito > feio, explícito > implícito, simples > complexo).
- **Resumo em 5 linhas:** (1) Variável = local de armazenamento na memória; tipo = significado do valor. (2) Tipos básicos: int, float, bool, str; `type()` retorna o tipo. (3) Comentário: `#` ou docstring `'''...'''`; nome de variável começa com letra ou _; não usar keywords. (4) Convenções: snake_case, caixa baixa, semântica clara; Python case sensitive; última atribuição prevalece. (5) Tipagem dinâmica; `help()` e `dir()`; PEP 8 e Zen do Python.
- **Palavras-chave:** variável, tipo de dado, int float bool str, type(), comentário, docstring, palavra reservada, snake_case, atribuição, case sensitive, tipagem dinâmica, PEP 8, Zen do Python, help, dir.

## Explicações

### 1. Tema e escopo

**Tema:** Terceiro encontro (início da etapa 2): recapitulação do Deepnote e do programa como algoritmo; comentários em Python; variáveis e tipos de dados (conceito, tipos básicos, nomes válidos, convenções); funções `type`, `help`, `dir`; PEP 8 e Zen do Python; tipagem dinâmica e “tudo é objeto”.

**Problema que resolve:** Permitir escrever código documentado (comentários), criar e usar variáveis com nomes válidos, identificar tipos e evitar erros de sintaxe por nome inválido ou texto interpretado como código.

**Inclui:** Ambiente Deepnote (workspace, máquina provisionada, salvamento); comentário de linha (#) e docstring; variável e tipo de dado; int, float, bool, str; palavras reservadas; regras de nome (letra ou _ no início); exemplos de nome inválido (1var, 2var) e válido (var, outra_variavel); operador de atribuição (=); convenções (snake_case, caixa baixa, semântica); case sensitive; reatribuição (último valor vale); type(), help(), dir(); PEP 8; Zen do Python; tipagem dinâmica; tudo é objeto.  
**Não inclui:** Conversão de tipos (int(), float(), str()) — citada como próxima aula; detalhe de dunder methods além da menção em help/dir.

### 2. Contexto na disciplina

- Início da etapa 2; segue às aulas 1 (introdução) e 2 (algoritmos e Deepnote).
- Pré-requisito: noção de algoritmo e uso do Deepnote (blocos de código).
- Base para todas as aulas seguintes: variáveis e tipos são usados em expressões, condicionais, laços e funções.

### 3. Visão conceitual geral

Aula **técnica**: primeiro conteúdo de sintaxe e semântica de Python (comentários, variáveis, tipos, nomes, convenções). O professor reforça Zen do Python e PEP 8 para “código pythônico”; variável como abstração de memória e tipo como significado do valor; uso de `type()` para inspecionar tipo e de `help()`/`dir()` para documentação.

### 4. Ideias-chave (máx. 7)

1. **Variável = abstração de armazenamento na memória** — Ao definir uma variável, a linguagem pede ao computador um espaço para guardar o valor; esse valor pode mudar (daí “variável”). Tipo de dado = significado do valor (int, float, bool, str); influencia como o computador armazena e opera.
2. **Comentário não é executado** — `#` comenta até o fim da linha; docstring com `'''` ou `"""` comenta múltiplas linhas. Se escrever texto sem `#`, o Python tenta interpretar como código e pode gerar SyntaxError.
3. **Nome de variável: começa com letra ou _** — Não pode começar com número; `1var` gera SyntaxError (invalid decimal literal). Palavras reservadas (if, def, True, etc.) não podem ser nomes de variáveis.
4. **Convenções PEP 8 / Zen** — Nomes em minúsculas; palavras compostas em snake_case; nome com semântica clara (explícito > implícito). Operador de atribuição é `=`. Python é case sensitive; reatribuir ao mesmo nome redefine o valor (última atribuição vale).
5. **Quatro tipos básicos** — int, float, bool, str. String com aspas simples ou duplas; `type(x)` retorna o tipo. Tipagem dinâmica: o interpretador define o tipo em tempo de execução; a mesma variável pode passar a ter outro tipo ao receber novo valor.
6. **type(), help(), dir()** — Funções built-in: `type(x)` devolve o tipo; `help(obj)` abre a documentação; `dir(obj)` lista atributos e métodos (incluindo dunder methods).
7. **Tudo em Python é objeto** — Classe é a estrutura (a “planta”); objeto é a instância (a “casa construída”). PEP 8 é o guia de estilo; Zen do Python (`import this`) traz princípios de design (bonito > feio, explícito > implícito, simples > complexo).

### 5. Conceitos essenciais — explicação operacional

#### Comentários

- **Comentário de linha:** Tudo após `#` na mesma linha é ignorado pelo interpretador. Usado para documentar ou explicar trecho de código.
- **Docstring (comentário multilinhas):** Três aspas consecutivas no início e no fim — `''' texto '''` ou `""" texto """`. Aspas simples ou duplas funcionam. Nesta aula tratado como comentário de múltiplas linhas; depois serve também para documentação de funções/módulos.
- **Erro típico:** Escrever texto sem `#` numa linha onde o Python espera código → **SyntaxError** (invalid syntax), pois o interpretador tenta executar o texto como instrução.
- **Quando usar:** Sempre que quiser anotar lógica, objetivo de um bloco ou referência sem que isso seja executado.

#### Variável e tipo de dado

- **Variável (transcrição/slide):** “Abstração de locais de armazenamento de dados. Os dados armazenados em uma variável podem mudar ao longo da execução. Daí o nome variável.”
- **Tipo de dado (transcrição/slide):** “Determina o significado dos valores armazenados na variável.” O computador usa o tipo para otimizar armazenamento e operações (ex.: int vs float são tratados diferente).
- **Atribuição:** `nome_variavel = valor`. O `=` é o operador de atribuição (atribui o valor à variável). Ex.: `variavel = 12`; `outra_variavel = False`.
- **print(variavel):** Exibe o valor armazenado na variável. Células/blocos compartilham estado em memória (execução de cima para baixo); ao desligar a máquina do Deepnote, o que só está em memória se perde — o código do notebook deve ser salvo (ex.: Ctrl+S).

#### Tipos básicos (int, float, bool, str)

- **int:** Números inteiros. Ex.: `1`, `12`, `38`.
- **float:** Números de ponto flutuante (casa decimal). Ex.: `1.3`. Operações e armazenamento diferem de int.
- **bool:** Valores lógicos `True` e `False` (primeira letra maiúscula).
- **str:** Cadeia de caracteres (palavra, frase, texto). Entre aspas simples ou duplas; ex.: `'Introdução à programação com Python'` ou `"Hello World!"`. Não há diferença semântica entre aspas simples e duplas.
- **Verificação do tipo:**
```bash
type(valor)
```
ou:
```bash
type(variavel)
```
retorna o tipo, ex.: `<class 'int'>`, `<class 'str'>`.

#### Palavras reservadas (keywords)

- **Definição:** Palavras que fazem parte da sintaxe do Python; usadas para instruções (if, def, class, import, etc.). Não podem ser usadas como nome de variável.
- **Lista (slide/transcrição):** False, None, True, and, as, assert, async, await, break, class, continue, def, del, elif, else, except, finally, for, from, global, if, import, in, is, lambda, nonlocal, not, or, pass, raise, return, try, while, with, yield (entre outras). Obter em código:
```bash
import keyword
keyword.kwlist
```
- **Erro:** Usar keyword como nome (ex.: `class = 1`) gera SyntaxError ou erro de uso de keyword.

#### Regras para nome de variável

- **Obrigatório:** O nome deve **começar** com letra (a–z, A–Z) ou underscore (_). Em seguida pode ter letras, números e underscore.
- **Inválido:** Começar com número — ex.: `1var`, `2var` → **SyntaxError: invalid decimal literal** (interpretador lê o número e depois não aceita “var” como continuação do literal).
- **Válido:** `var`, `outra_variavel`, `_privada`, `x1`. Duas palavras: separar por underscore (snake_case), ex.: `outra_variavel`.
- **Convenções (não obrigatórias):** Caixa baixa; nome com semântica em relação ao que a variável guarda (Zen: explícito > implícito); palavras compostas em snake_case. Tamanho do nome não altera funcionamento; recomenda-se ser explícito.

#### Case sensitive e reatribuição

- **Case sensitive:** Python diferencia maiúsculas de minúsculas. `variavel` e `Variavel` são duas variáveis diferentes. Ex.:
```bash
variavel = 12
Variavel = 25
print(variavel)
print(Variavel)
```
exibem 12 e 25.
- **Mesma variável, duas atribuições:** A última atribuição vale. Ex.: `variavel = 12`; `variavel = 30` → ao usar `variavel`, o valor é 30. O interpretador não avisa que o nome já existia; em linguagens interpretadas o resultado aparece na execução. Por isso nomes explícitos e semântica ajudam.

#### Tipagem dinâmica

- **Definição:** O interpretador define o tipo da variável em tempo de execução, conforme o valor atribuído. Não é preciso (e não se deve) declarar o tipo.
- **Consequência:** A mesma variável pode receber depois um valor de outro tipo; o tipo da variável “muda”. Ex.: `variavel_dinamica = 1` (tipo int); depois `variavel_dinamica = False` (tipo bool). Não é “renomear” a variável; é alterar o valor e, com isso, o tipo que o interpretador associa a ela.
- **Contraste:** Em linguagens de tipagem estática/explícita, ao declarar “variável inteira” só se pode armazenar inteiros; em Python não se declara tipo.

#### Funções built-in: type, help, dir

- **type(x):** Retorna o tipo do objeto x. Ex.:
```bash
type(1)
```
→ `<class 'int'>`;
```bash
type(variavel)
```
→ tipo do valor atual da variável.
- **help(obj):** Abre a documentação do objeto (ex.:
```bash
help(int)
```
mostra descrição da classe int, assinaturas como `int([x])`, `int(x, base=10)`, subclasses como bool, métodos). Útil para entender funções e tipos.
- **dir(obj):** Lista atributos e métodos do objeto (incluindo nomes que começam e terminam com `__`, os “dunder methods”). Ex.: `dir(variavel_str)` mostra métodos de str.
- **Uso:** Inspecionar tipo com `type()`; estudar API com `help()`; explorar atributos com `dir()`.

#### PEP 8 e Zen do Python

- **PEP 8 (slide/transcrição):** Guia de estilo para código Python; foco em legibilidade e consistência. Define convenções de nomenclatura (ex.: snake_case para variáveis/funções), indentação, tamanho de linha, etc. PEP = Python Enhancement Proposal; PEP 8 é a “PEP 8”.
- **Zen do Python:** Princípios de design; exibidos com `import this`. Destaques da aula: “Beautiful is better than ugly”, “Explicit is better than implicit”, “Simple is better than complex”. Base para escrever “código pythônico”.

#### Tudo em Python é objeto

- **Observação da aula:** Tudo que se manipula em Python é objeto. Classe = estrutura (como a “planta da casa”); objeto = instância (a “casa construída”). Detalhes de classes e instâncias ficam para encontros futuros.

### 6. Procedimento / execução

- **Comentário de linha:** Colocar `#` antes do texto; executar a célula — o comentário não é executado.
- **Docstring:** Envolver o texto em `'''` ou `"""`; executar — não gera saída (funciona como comentário).
- **Criar variável:** Escrever:
```bash
nome = valor
```
(ex.:
```bash
variavel = 12
```
); executar a célula. Em outra célula:
```bash
print(nome)
```
exibe o valor.
- **Ver tipo:**
```bash
print(type(variavel))
```
ou apenas:
```bash
type(variavel)
```
na última linha da célula para ver a saída.
- **Erro típico:** Nome começando com número (`1var = 1`) → SyntaxError: invalid decimal literal. Texto sem `#` em linha de código → SyntaxError: invalid syntax.
- **Evidência de acerto:** Célula executa sem erro; type() retorna o tipo esperado;
```bash
print(variavel)
```
mostra o valor atribuído; comentários não geram saída nem erro.

### 7. Exemplos relevantes

- **Hello World + comentário:**
```bash
# Hello World
print("Hello World!")
```
— só o print é executado.
- **Docstring:** `'''Comentario de multiplas linhas\nlinha 1\nlinha 2\nlinha 3'''` — executar não dá erro; usado como comentário multilinhas.
- **SyntaxError:** Linha com apenas “Comentário aqui” sem `#` → erro de sintaxe. Nome `1var` ou `2var` → invalid decimal literal.
- **Variáveis válidas:**
```bash
var = 1
outra_variavel = False
print(var)
print(outra_variavel)
```
→ 1 e False.
- **type():**
```bash
type(1)
```
→ `<class 'int'>`;
```bash
type(1.3)
```
→ `<class 'float'>`;
```bash
type(True)
```
→ `<class 'bool'>`;
```bash
type("Introducao a programacao com python")
```
→ `<class 'str'>`.
- **Tipagem dinâmica:** `variavel_dinamica = 1` → type int; depois `variavel_dinamica = False` → type bool; o mesmo nome guarda primeiro inteiro, depois booleano.
- **Case sensitive:** `variavel = 12` e `Variavel = 25` → dois prints exibem 12 e 25.
- **help(int):** Mostra documentação de int (conversão, base, etc.); exemplo no slide com:
```bash
int('0b100', base=0)
```
→ 4.

### 8. Diferenças e confusões comuns

- **Comentário vs código:** Comentário não é executado; sem `#` (ou sem ser string/docstring), o texto vira código e pode dar SyntaxError.
- **Aspas simples vs duplas em str:** Nenhuma diferença para o tipo; ambas definem string. Para docstring, `'''` e `"""` funcionam igual.
- **Atribuição (=) vs igualdade matemática:** Em Python, `=` é atribuição (“guarde este valor nesta variável”). Igualdade é `==` (visto depois).
- **Nome da variável vs tipo:** O nome é como o programador se refere à variável no código; o tipo é como o interpretador trata o valor em memória. O nome não “tem” tipo; a variável pode mudar de tipo (tipagem dinâmica).
- **Reatribuição vs “duas variáveis”:** `variavel = 12` e depois `variavel = 30` é uma única variável com valor atualizado (30). Não são duas variáveis; a última atribuição prevalece (execução de cima para baixo).

### 9. Como cai em prova

- **Perguntas conceituais:** Definição de variável e de tipo de dado; os quatro tipos básicos (int, float, bool, str); como fazer comentário de linha e multilinhas; regra do nome (começar com letra ou _); o que são palavras reservadas; snake_case; case sensitive; tipagem dinâmica; função de type(), help(), dir(); o que é PEP 8 e Zen do Python.
- **Pegadinha:** “1var é um nome válido porque tem letras” → inválido (não pode começar com número). “O tipo da variável é definido pelo nome” → não; é definido pelo valor (tipagem dinâmica).
- **Aplicação:** Dado um trecho, identificar variáveis, tipos e comentários; dizer se um nome é válido ou não; prever o resultado de type() ou o valor exibido por print() após atribuições.

### 10. Pontos de atenção

- Nome de variável **não pode começar com número**; gera SyntaxError (invalid decimal literal).
- **Palavras reservadas** não podem ser usadas como nome de variável.
- **Case sensitive:** `variavel` e `Variavel` são diferentes; erro de digitação trocando maiúscula/minúscula gera NameError se só uma foi definida.
- No **Deepnote**, o que está só em memória (variáveis, resultados de células) se perde ao desligar a máquina ou quando ela é reciclada; **salvar o notebook** (ex.: Ctrl+S) persiste código e texto.
- **Comentário:** esquecer `#` em texto que não é código gera SyntaxError.
- **Tipagem dinâmica:** a mesma variável pode mudar de tipo ao receber novo valor; não confundir com “duas variáveis com o mesmo nome”.
- Execução **de cima para baixo**; em caso de duas atribuições ao mesmo nome, vale a **última**.

### 11. Checklist de domínio

- [ ] Sei definir variável e tipo de dado no sentido da aula.
- [ ] Sei listar os quatro tipos básicos (int, float, bool, str) e usar type() para inspecionar.
- [ ] Sei escrever comentário de linha (#) e docstring (''' ou """).
- [ ] Sei explicar a regra do nome (começar com letra ou _) e dar exemplo de nome inválido (1var).
- [ ] Sei dizer o que são palavras reservadas e que não podem ser nomes de variáveis.
- [ ] Sei explicar snake_case, case sensitive e que a última atribuição prevalece.
- [ ] Sei explicar tipagem dinâmica e dar exemplo (mesma variável com int e depois bool).
- [ ] Sei para que servem type(), help() e dir() e o que é PEP 8 e Zen do Python.
