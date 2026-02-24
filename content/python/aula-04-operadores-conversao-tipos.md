---
title: "Conversão de tipos e operadores aritméticos"
slug: "operadores-conversao-tipos"
discipline: "python"
order: 4
description: "Funções de conversão int/float/bool/str, tipagem forte, operadores + - * / // % ** e precedência"
exercises:
  - question: "O que acontece ao executar float('texto qualquer') em Python e por quê?"
    answer: "Ocorre ValueError: could not convert string to float. Python tem tipagem forte: só converte string para número quando o conteúdo da string representa um número; texto não numérico não é convertido."
    hint: "Lembre da diferença entre tipagem dinâmica e tipagem forte."
  - question: "Qual a diferença entre o operador / e o operador // em Python?"
    answer: "/ é divisão real: retorna float (em Python 3 mesmo com inteiros). // é divisão inteira (piso): retorna apenas a parte inteira do quociente. Ex.: 17/4 = 4.25, 17//4 = 4."
  - question: "Ao converter um float para int com int(), o que acontece com a parte decimal?"
    answer: "É truncada (descartada). int(12.98) resulta em 12; não há arredondamento matemático."
  - question: "Em qual ordem o Python avalia os operadores aritméticos em uma expressão sem parênteses?"
    answer: "Maior prioridade: parênteses (). Depois: ** (exponenciação). Em seguida: *, /, //, % (da esquerda para a direita). Menor prioridade: + e - (da esquerda para a direita)."
  - question: "Para que serve o operador % entre dois números inteiros? Dê um exemplo."
    answer: "Retorna o resto (módulo) da divisão inteira. Ex.: 17 % 4 = 1, pois 17 = 4*4 + 1. Útil para verificar paridade (n % 2), ciclos, etc."
  - question: "Uma string que contém apenas dígitos e um ponto decimal pode ser convertida para float? E uma string com letras?"
    answer: "Sim: float('98874368768') e float('3.14') funcionam. String com letras (não numérica) gera ValueError ao usar float() ou int()."
---
## Resumo

- **Conversão de tipos:** funções built-in <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`int()`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`float()`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`bool()`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`str()`</mark> convertem um valor para o tipo indicado. Ex.: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`str(12)`</mark> → `'12'` (string); <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`int(12.98)`</mark> → `12` (trunca); <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`float('3.14')`</mark> → `3.14`. Qualquer valor pode ser convertido para string; só strings que representam número convertem para int/float.
- **Tipagem forte:** Python não converte string não numérica para número.
```bash
float('se aqui tiver um texto...')
```
→ **ValueError**. O erro ocorre na linha da conversão; as linhas seguintes não são executadas.
- **Operadores aritméticos:** <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`+`</mark> soma, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`-`</mark> subtração, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`*`</mark> multiplicação, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`/`</mark> divisão (sempre retorna float em Python 3), <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`//`</mark> divisão inteira (piso), <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`%`</mark> resto (módulo), <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`**`</mark> exponenciação. Trabalham com tipos numéricos (int, float).
- **Precedência (maior → menor):** parênteses <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`()`</mark>; depois <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`**`</mark>; depois <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`*`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`/`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`//`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`%`</mark> (esquerda para direita); por último <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`+`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`-`</mark>.
- **Resumo em 5 linhas:** (1) Conversão: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`int()`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`float()`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`bool()`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`str()`</mark>; usar o tipo desejado como função. (2) Tipagem forte: conversão só entre tipos compatíveis; string não numérica → int/float gera ValueError. (3) Operadores: +, -, *, /, //, %, **; / retorna float; // retorna inteiro; % retorna resto. (4) Precedência: () > ** > * / // % > + -. (5) Nomes expressivos, snake_case, ponto para decimal; erro na conversão interrompe o fluxo naquela linha.
- **Palavras-chave:** conversão de tipos, int float bool str, tipagem forte, tipagem dinâmica, ValueError, operadores aritméticos, divisão inteira, módulo, exponenciação, precedência, piso, literal (nome da variável).

## Explicações

### 1. Tema e escopo

**Tema:** Quarto encontro (final da etapa 2): recapitulação de variáveis e tipos (memória, literal, convenções); funções de conversão de tipos (<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`int()`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`float()`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`bool()`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`str()`</mark>); tipagem forte e erro ao converter string não numérica; operadores aritméticos e precedência; exercícios (Celsius→Fahrenheit, retângulo, três números).

**Problema que resolve:** Permitir transformar valores entre tipos quando necessário e realizar cálculos com operadores aritméticos; evitar ValueError por conversão inválida e entender por que o programa para na linha do erro.

**Inclui:** Recapitulação variáveis/tipos (espaço em memória, tipo = semântica do valor, nome = literal); convenções (snake_case, ponto para decimal); conversão com as quatro funções e exemplos; tipagem forte e ValueError; sete operadores e precedência; exemplos com notas e com valor1/valor2 (//, %, **); exercícios propostos (conversão °C→°F, área/perímetro retângulo, média/média geométrica/desvio padrão/dobro da soma/triplo do produto/raiz da soma dos quadrados de três números).

**Não coberto no material:** Fórmula explícita do desvio padrão e da raiz quadrada na aula (o aluno precisa buscar ou usar <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`**0.5`</mark> / módulo math); detalhe de quando usar cada conversão em projetos reais (apenas mencionado que “vai usar muito”).

### 2. Contexto na disciplina

- Último encontro da segunda etapa; segue às aulas 1–3 (introdução, algoritmo/ambiente, variáveis e tipos).
- Pré-requisito: variáveis, tipos básicos, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`type()`</mark>, atribuição.
- Base para expressões, entrada de dados e aulas seguintes: conversão e operadores são usados em todo o restante do curso.

### 3. Visão conceitual geral

Aula **técnica**: aprofunda variáveis (memória, literal), introduz conversão de tipos e operadores aritméticos. O professor reforça que o tipo define quanto espaço e que semântica o valor tem; que o nome da variável (literal) não ocupa espaço extra; que Python tem tipagem dinâmica (inferência do tipo) mas **tipagem forte** (conversões só entre tipos compatíveis). Operadores permitem construir expressões numéricas; a ordem de avaliação segue a precedência.

### 4. Ideias-chave (máx. 7)

1. **Conversão é explícita com funções do tipo** — <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`int(x)`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`float(x)`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`bool(x)`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`str(x)`</mark>. Não existe conversão implícita de string não numérica para número; isso gera erro.
2. **Tipagem forte** — Só há conversão entre tipos compatíveis. String com dígitos (e ponto) → número OK; string com texto → número gera **ValueError**. O fluxo para na linha da conversão; o que vem depois não executa.
3. **Literal = nome da variável** — O nome não ocupa espaço extra na memória; o que ocupa espaço é o valor (e o tipo define o tamanho). Pode ter nome longo ou curto; o importante é ser expressivo (semântica clara).
4. **Divisão <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`/`</mark> vs divisão inteira <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`//`</mark> e resto <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`%`</mark>** — <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`/`</mark> sempre retorna float (em Python 3). <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`//`</mark> retorna a parte inteira do quociente (piso). <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`%`</mark> retorna o resto da divisão (ex.: 17 % 4 = 1).
5. **Exponenciação e ponto flutuante** — <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`**`</mark> é o operador de potência (ex.: 17 ** 4 = 83521). Em Python não há “vírgula” para decimal; usa-se ponto. Notação de exibição (ex.: 83.521) é formatação; internamente é float/int.
6. **Precedência dos operadores** — Parênteses têm maior prioridade; depois <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`**`</mark>; depois <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`*`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`/`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`//`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`%`</mark> (esquerda para direita); por último <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`+`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`-`</mark>. Usar parênteses quando quiser deixar explícito ou mudar a ordem.
7. **Convenções reforçadas** — Nomes em caixa baixa, snake_case para palavras compostas; ponto para parte decimal (não vírgula); evitar acentuação em código para portabilidade.

### 5. Conceitos essenciais — explicação operacional

#### Recapitulação: variável, tipo, memória

- **Variável:** espaço na memória reservado para um dado; o valor pode mudar durante a execução. O **tipo** é a semântica do valor (int, float, bool, str) e define quanto espaço é reservado.
- **Nome da variável (literal):** apenas identificador para leitura; não ocupa espaço extra. Pode ser qualquer nome válido (letra ou _ no início; depois letras, números, _).
- **Tipagem dinâmica:** o interpretador infere o tipo pelo valor atribuído; não é preciso declarar tipo. **Duck typing:** “se parece com pato, nada como pato…”, o Python trata pelo comportamento (valor) e não por declaração.

#### Funções de conversão de tipos

- **Uso:**
```bash
novo_valor = tipo(valor_ou_variavel)
```
Ex.:
```bash
str(12)
```
→ `'12'`;
```bash
int(12.987)
```
→ `12` (trunca);
```bash
float('98874368768')
```
→ `98874368768.0`;
```bash
str(False)
```
→ `'False'`.
- **Quando usar:** Quando precisar operar ou exibir em outro tipo (ex.: concatenar número com texto usando str(); ler entrada como string e calcular com float() ou int()).
- **Quando NÃO usar:** Não converter string com texto livre para int/float — gera **ValueError**. Verificar se a string representa número (ou tratar exceção) antes de converter.
- ❌ **Erro comum:**
```bash
float('se aqui tiver um texto, o que acontece?')
```
→ <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`ValueError: could not convert string to float: 'se aqui tiver um texto...'`</mark>. O traceback aponta a linha da conversão; as linhas seguintes não são executadas.
- 🧪 **Como testar:** Executar:
```bash
print(type(int(3.9)), int(3.9))
```
e conferir que é <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`int`</mark> e `3`; depois tentar:
```bash
float('abc')
```
e observar o ValueError.

#### Tipagem forte

- **Definição:** Python só realiza conversões entre tipos compatíveis. Qualquer valor pode virar string; nem toda string pode virar número — só as que representam número.
- **Consequência:** Código que depende de dados externos (entrada do usuário, arquivo) deve validar ou tratar exceção ao converter string → número, senão o programa pode abortar com ValueError.

#### Operadores aritméticos

| Operador | Nome           | Exemplo (notas 6.8 e 8.1)     |
|----------|----------------|--------------------------------|
| <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`+`</mark>      | Soma           | 6.8 + 8.1 → 14.9 (float)       |
| <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`-`</mark>      | Subtração      | 6.8 - 8.1 → -1.3 (float)      |
| <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`*`</mark>      | Multiplicação  | 6.8 * 8.1 → 55.08             |
| <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`/`</mark>      | Divisão        | 6.8 / 8.1 → float; 17/4 → 4.25 |
| <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`//`</mark>     | Divisão inteira (piso) | 17 // 4 → 4          |
| <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`%`</mark>      | Módulo (resto) | 17 % 4 → 1                     |
| <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`**`</mark>     | Exponenciação  | 17 ** 4 → 83521               |

- **Precedência (slide):** 1) Parênteses <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`()`</mark> — maior prioridade. 2) Exponenciação <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`**`</mark>. 3) <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`*`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`/`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`//`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`%`</mark> — avaliados da esquerda para a direita. 4) <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`+`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`-`</mark> — menor prioridade.
- ⚠️ **Pegadinha:** Em Python 3, `17 / 4` é `4.25` (float), não divisão inteira. Quem vem de outras linguagens pode esperar inteiro; aqui <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`/`</mark> sempre retorna float quando há divisão “real”.
- 🛠️ **Aplicação mínima:** Definir duas variáveis numéricas, calcular soma, subtração, produto, divisão, piso, resto e potência; usar print() para exibir cada resultado. Critério de acerto: resultados numéricos corretos e tipos coerentes (float onde for <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`/`</mark>).

#### Exercícios propostos na aula

1. **Conversão °C → °F:** Receber um valor em graus Celsius e converter para Fahrenheit (fórmula: F = C * 9/5 + 32 ou equivalente). Usar variáveis e <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`print`</mark>.
2. **Área e perímetro do retângulo:** Receber base e altura (duas variáveis); calcular e exibir área e perímetro (2*base + 2*altura).
3. **Três números:** Declarar três variáveis numéricas; calcular e exibir: média (aritmética), média geométrica, desvio padrão, dobro da soma, triplo do produto, raiz quadrada da soma dos quadrados. *Não coberto na aula:* fórmulas explícitas de desvio padrão e raiz quadrada (aluno pode usar <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`**0.5`</mark> para raiz ou buscar fórmula; para desvio padrão, buscar fórmula ou módulo depois).

### 6. Procedimento / execução

- **Conversão:** (1) Decidir tipo de destino (int, float, bool, str). (2) Chamar a função com o valor ou variável: `resultado = int(var)`. (3) Se for string → número, garantir que a string represente número ou tratar ValueError.
- **Operações:** (1) Definir variáveis com valores numéricos. (2) Criar variável para o resultado usando o operador desejado (ex.:
```bash
soma = a + b
```
). (3) Usar print() para exibir. (4) Respeitar precedência ou usar parênteses para deixar explícito.
- **Erro típico:** Esquecer que string não numérica não converte — executar:
```bash
float(texto)
```
sem validar gera ValueError e interrompe a célula/script naquela linha.
- **Sinal de execução correta:** Valores impressos corretos; nenhum ValueError; tipo esperado (ex.:
```bash
type(soma)
```
pode ser float quando se usa <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`/`</mark> ou números float).

### 7. Exemplos relevantes

- **Número → string:** `variavel_numerica = 12`; `variavel_numerica_convertida_em_str = str(variavel_numerica)` → tipo <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`str`</mark>, valor `'12'`.
- **Float → int:** `primeira_variavel = 12.987...`; `variavel_convertida = int(primeira_variavel)` → tipo <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`int`</mark>, valor `12` (parte decimal descartada).
- **String numérica → float:** `primeira_variavel = '98874368768'`; `variavel_convertida = float(primeira_variavel)` → tipo <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`float`</mark>, valor `98874368768.0`.
- **Bool → string:** `primeira_variavel = False`; `variavel_convertida = str(primeira_variavel)` → tipo <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`str`</mark>, valor `'False'`.
- **Soma/subtração/multiplicação/divisão (slides):** `nota_matematica = 6.8`, `nota_programacao = 8.1`; soma, subtração, multiplicação, divisão com <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`print`</mark> mostrando rótulo e valor.
- **Piso, resto, potência:** `valor1 = 17`, `valor2 = 4`; `piso = valor1 // valor2` → 4; `resto = valor1 % valor2` → 1; `potencia = valor1 ** valor2` → 83521. Divisão normal: `valor1 / valor2` → 4.25.

### 8. Diferenças e confusões comuns

- **Tipagem dinâmica vs forte:** Dinâmica = tipo inferido em tempo de execução, não declarado. Forte = sem conversão implícita entre tipos incompatíveis (ex.: string de texto → número não é feita).
- **<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`/`</mark> vs <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`//`</mark>:** <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`/`</mark> é divisão real (sempre float em Python 3). <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`//`</mark> é quociente inteiro (piso). Não confundir com “divisão que retorna inteiro” em outras linguagens.
- **Conversão direta do valor vs variável:** Tanto:
```bash
str(12)
```
quanto:
```bash
str(variavel)
```
são válidos; a função aceita valor literal ou variável.
- **Nome da variável vs valor:** O nome (literal) não ocupa espaço; o valor e seu tipo definem o espaço em memória. Trocar o valor (e até o tipo) na mesma variável é permitido (reatribuição).

### 9. Como cai em prova

- Perguntar o resultado de:
```bash
int(7.9)
17 // 4
17 % 4
2 ** 10
```
- Dar um trecho com:
```bash
float('abc')
```
e perguntar o que acontece (ValueError e em qual linha).
- Ordem de avaliação em expressão com vários operadores (ex.: `2 + 3 * 4` vs `(2 + 3) * 4`).
- Verdadeiro ou falso: “Em Python, qualquer string pode ser convertida para float.” (Falso — só as que representam número.)

### 10. Pontos de atenção

- Usar **ponto** para decimal em float (ex.: `13.9`), não vírgula; vírgula pode ser interpretada como tupla ou gerar erro.
- String em mais de uma linha na definição (quebra de linha dentro das aspas) gera erro de sintaxe; para múltiplas linhas usar docstring ou concatenar.
- Após um ValueError na conversão, nada abaixo daquela linha na mesma célula/script é executado — o fluxo termina ali.
- Variável não definida (ex.: usar `piso` antes de calcular em outra célula) gera **NameError**; no notebook, executar as células na ordem.

### 11. Checklist de domínio

- [ ] Sei definir conversão de tipos com <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`int()`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`float()`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`bool()`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`str()`</mark> e quando cada uma é adequada.
- [ ] Sei explicar por que <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`float('texto')`</mark> gera ValueError e o que é tipagem forte.
- [ ] Sei reconhecer os sete operadores aritméticos e a precedência (parênteses, **, * / // %, + -).
- [ ] Sei aplicar: converter variável para outro tipo; calcular soma, diferença, produto, divisão, piso, resto e potência com variáveis.
- [ ] Sei evitar: converter string não numérica para número sem validar; confundir <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`/`</mark> com <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`//`</mark>; usar vírgula para decimal em float.
