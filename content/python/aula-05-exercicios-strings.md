---
title: "Exercícios resolvidos e strings"
slug: "exercicios-strings"
discipline: "python"
order: 5
description: "Resolução dos três exercícios (ºC→ºF, retângulo, três números) e conceitos de strings: aspas, multilinha, aspas no texto"
exercises:
  - question: "Por que uma string definida com aspas simples em uma linha não pode conter quebra de linha no meio do texto?"
    answer: "Em Python, string com aspas simples (ou duplas) deve abrir e fechar na mesma linha. A quebra de linha dentro do texto encerra a linha antes do fechamento da aspa, gerando SyntaxError: unterminated string literal. Para múltiplas linhas usa-se docstring (três aspas ''' ou \"\"\")."
    hint: "Pense em como o interpretador detecta o fim da string."
  - question: "Ao definir loren = \"Lorem... \"de Finibus...\" e executar, ocorre SyntaxError. Por quê e como corrigir?"
    answer: "A string começa com aspa dupla; ao encontrar outra aspa dupla no meio (em \"de Finibus\"), o interpretador entende que a string terminou ali e o resto vira código inválido. Corrigir definindo a string com aspas simples: loren = 'Lorem... \"de Finibus\"...' — assim as aspas duplas internas são parte do texto."
  - question: "Qual a diferença entre lado_a = 10; lado_b = 10 e lado_a = lado_b = 10 para o resultado final? E a ordem de avaliação na segunda forma?"
    answer: "No resultado final as duas variáveis ficam com valor 10 em ambos os casos. Na forma lado_a = lado_b = 10, o Python avalia da direita para a esquerda: primeiro atribui 10 a lado_b, depois atribui o valor de lado_b a lado_a. É uma forma pythônica de garantir mesmo valor em duas variáveis."
  - question: "Como obter raiz cúbica e raiz quadrada em Python usando apenas operadores aritméticos?"
    answer: "Raiz quadrada: x ** (1/2) ou x ** 0.5. Raiz cúbica: x ** (1/3). A radiciação é equivalente à potência com expoente fracionário: raiz n-ésima de x = x ** (1/n)."
  - question: "O que é convenção no código (ex.: 'base será lado_c ou lado_d') e por que importa no exercício do retângulo?"
    answer: "Convenção é um acordo que o programador adota para dar significado aos nomes (ex.: qual lado é base e qual é altura). No retângulo, perímetro = soma dos quatro lados; área = base × altura. Se convencionamos base = lado_c e altura = lado_a, então area_retangulo = lado_c * lado_a — o código fica legível e consistente."
  - question: "Ao usar print(obs_1) com obs_1 = 'texto entre aspas', a saída pode mostrar as aspas. Quando isso acontece e quando não acontece?"
    answer: "print(variavel) exibe o valor da string sem as aspas delimitadoras. Se a string contiver aspas como caractere (ex.: 'texto entre aspas' com aspas simples dentro), o print mostra essas aspas porque elas fazem parte do conteúdo. A diferença está no conteúdo armazenado na variável, não na função print."
---
## Resumo

- **Exercício 1 — ºC → ºF:** Variável `graus_celsius`; fórmula `graus_fahrenheit = graus_celsius * 9/5 + 32`; `print` com rótulos. Ex.: 0 ºC → 32.0 ºF; 100 ºC → 212.0 ºF.
- **Exercício 2 — Retângulo:** Quatro variáveis para lados (lado_a = lado_b, lado_c = lado_d). Perímetro = soma dos quatro lados; área = base × altura (convenção: base = lado_c ou lado_d, altura = lado_a ou lado_b). Atribuição explícita ou encadeada (`lado_a = lado_b = 10`); na encadeada a avaliação é da direita para a esquerda.
- **Exercício 3 — Três números:** Média = (n1 + n2 + n3) / 3. Média geométrica = (n1*n2*n3)**(1/3). Desvio padrão = raiz quadrada da média dos desvios quadráticos em relação à média. Dobro da soma = 2*(soma); triplo do produto = 3*(produto); raiz da soma dos quadrados = (n1**2 + n2**2 + n3**2)**(1/2). Raiz como potência: x**(1/n).
- **Strings:** Tipo `str` = cadeia de caracteres. Definir com aspas simples `'...'` ou duplas `"..."` — mesmo tipo; definição em **uma única linha**. Várias linhas: **docstring** `'''...'''` ou `"""..."""`. Se o texto tiver aspas, usar o outro tipo por fora (ex.: texto com `"de Finibus"` → string com aspas simples).
- **Erro comum:** String com aspas duplas contendo aspas duplas no texto → **SyntaxError: unterminated string literal**; o interpretador entende o primeiro `"` interno como fim da string. Solução: delimitar com aspas simples.
- **Resumo em 5 linhas:** (1) Exercícios: ºC→ºF (9/5*C+32), retângulo (perímetro = soma lados, área = base×altura), três números (média, média geométrica, desvio padrão, dobro da soma, triplo do produto, raiz da soma dos quadrados). (2) Atribuição múltipla: `a = b = valor` avalia da direita para a esquerda. (3) String: aspas simples ou duplas, uma linha; multilinha com `'''` ou `"""`. (4) Aspas no texto: delimitar com o tipo oposto para evitar SyntaxError. (5) Convenções e nomes expressivos (snake_case) melhoram legibilidade.
- **Palavras-chave:** exercício Celsius Fahrenheit, retângulo perímetro área, média geométrica, desvio padrão, raiz quadrada potência 1/2 1/3, atribuição encadeada, string, aspas simples duplas, docstring, multilinha, SyntaxError unterminated string literal.

## Explicações

### 1. Tema e escopo

**Tema:** Quinto encontro: resolução dos três exercícios da aula anterior (conversão ºC→ºF, área e perímetro do retângulo, três números — média, média geométrica, desvio padrão, dobro da soma, triplo do produto, raiz da soma dos quadrados); atribuição encadeada e ordem de avaliação; introdução a strings (aspas simples/duplas, string em uma linha, docstring multilinha, aspas dentro do texto e SyntaxError).

**Problema que resolve:** Aplicar variáveis e operadores em problemas concretos; evitar erro de string não terminada e saber usar aspas quando o texto contém aspas.

**Inclui:** Exercício 1 com fórmula e print; exercício 2 com duas formas (lados explícitos e `lado_a = lado_b = 10`, `lado_c = lado_d = 50`), convenção base/altura, perímetro e área; exercício 3 com todas as fórmulas (média, média geométrica como raiz cúbica via `**(1/3)`, desvio padrão populacional, dobro da soma, triplo do produto, raiz da soma dos quadrados via `**(1/2)`); strings com `'` e `"`, tipo `str`, cadeia de caracteres; string em uma linha; erro com quebra de linha; docstring para multilinha; exemplo Lorem Ipsum com aspas duplas internas e correção com aspas simples externas; observação sobre print e aspas no conteúdo.

**Não coberto no material:** Operações avançadas com strings (slice, métodos, formatação); escape de caracteres (`\'`, `\"`); módulo `math` para raiz; desvio padrão amostral (n-1).

### 2. Contexto na disciplina

- Segue à aula 4 (conversão de tipos e operadores aritméticos) e à lista de três exercícios deixada naquela aula.
- Pré-requisito: variáveis, tipos, operadores +, -, *, /, **, parênteses, print.
- Base para o resto do curso: modelo “problema do mundo real → algoritmo em Python” e uso de strings em qualquer programa com texto.

### 3. Visão conceitual geral

Aula **técnica**: resolução dos exercícios usando variáveis, operadores e fórmulas (matemática básica e estatística); reforço de convenções (base/altura, nomes em snake_case) e de que o algoritmo codifica um problema do mundo real. Em seguida, strings: definição com aspas simples ou duplas, restrição de uma linha, multilinha com docstring, e como evitar SyntaxError quando o texto contém aspas.

### 4. Ideias-chave (máx. 7)

1. **Problema → algoritmo:** Cada exercício é um problema (conversão de temperatura, retângulo, estatísticas); o código em Python é o algoritmo que o computador executa para obter o resultado. O que precisa estar correto é o resultado (determinístico); a forma de chegar lá pode variar.
2. **Raiz como potência:** Raiz n-ésima de x = x elevado a 1/n. Em Python: raiz quadrada `x ** (1/2)` ou `x ** 0.5`; raiz cúbica `x ** (1/3)`. Não é obrigatório usar módulo; operador `**` resolve.
3. **Atribuição encadeada:** `lado_a = lado_b = 10` — o Python avalia da direita para a esquerda: primeiro `lado_b = 10`, depois `lado_a = lado_b`. Garante mesmo valor em duas variáveis sem repetir o número; alternativa à atribuição explícita em cada uma.
4. **String em uma linha:** Com aspas simples ou duplas, a string deve começar e terminar na mesma linha. Quebra de linha no meio do texto → **SyntaxError: unterminated string literal**. Para texto em várias linhas usar docstring (`'''` ou `"""`).
5. **Docstring = string multilinha:** Três aspas consecutivas no início e no fim permitem várias linhas e preservam quebras. Usado para poemas, blocos de texto, e depois para documentação de funções/módulos.
6. **Aspas dentro do texto:** Se o texto contém aspas duplas, delimitar a string com aspas simples (e vice-versa). Caso contrário a aspa interna é interpretada como fim da string → SyntaxError. Ex.: `'Lorem... "de Finibus"...'` está correto; `"Lorem... "de Finibus"...`" gera erro.
7. **Convenção no código:** Acordo sobre o significado dos nomes (ex.: “base = lado_c ou lado_d, altura = lado_a ou lado_b”). Não muda a execução, mas torna o código legível e consistente para quem lê.

### 5. Conceitos essenciais — explicação operacional

#### Exercício 1 — Conversão ºC → ºF

- **Fórmula:** °F = °C × 9/5 + 32. Em Python:
```bash
graus_fahrenheit = graus_celsius * 9/5 + 32
```
- **Passos:** (1) Definir `graus_celsius` (ex.: 0 ou 100). (2) Calcular `graus_fahrenheit`. (3) print com rótulos para conferir (ex.: 0 → 32.0; 100 → 212.0).
- **Erro típico:** Esquecer parênteses ou ordem de operações; 9/5 e +32 devem aplicar ao valor em Celsius. Usar `* 9/5 + 32` está correto pela precedência.

#### Exercício 2 — Retângulo (perímetro e área)

- **Convenção (material):** lado_a e lado_b têm o mesmo valor (altura); lado_c e lado_d têm o mesmo valor (base). Perímetro = lado_a + lado_b + lado_c + lado_d. Área = base × altura = lado_c * lado_a (ou lado_d * lado_b).
- **Forma 1 — Atribuição explícita:** `lado_a = 10`, `lado_b = 10`, `lado_c = 50`, `lado_d = 50`. O programador garante que pares sejam iguais.
- **Forma 2 — Atribuição encadeada:** `lado_a = lado_b = 10`, `lado_c = lado_d = 50`. Avaliação da direita para a esquerda; ambas as variáveis recebem o mesmo valor. Não há “melhor” em termos de resultado; a segunda evita repetir o valor e reduz risco de digitar diferente.
- **Cálculos:** `perimetro_retangulo = lado_a + lado_b + lado_c + lado_d`; `area_retangulo = lado_c * lado_a` (ou conforme convenção). Ex.: lados 10, 10, 50, 50 → perímetro 120, área 500.
- 🛠️ **Aplicação:** Definir os quatro lados (respeitando retângulo), calcular perímetro e área, fazer print dos lados, do perímetro e da área. Critério de acerto: valores numéricos corretos.

#### Exercício 3 — Três números

- **Variáveis:** `numero_1`, `numero_2`, `numero_3` (ex.: 3, 5, 7).
- **Média aritmética:** `media = (numero_1 + numero_2 + numero_3) / 3`.
- **Média geométrica:** raiz cúbica do produto: `media_geometrica = (numero_1 * numero_2 * numero_3) ** (1/3)`.
- **Desvio padrão (populacional):** raiz quadrada da média dos desvios quadráticos em relação à média:  
  `desvio_padrao = (((numero_1 - media)**2 + (numero_2 - media)**2 + (numero_3 - media)**2) / 3) ** (1/2)`.
- **Dobro da soma:** `dobro_soma = 2 * (numero_1 + numero_2 + numero_3)`.
- **Triplo do produto:** `triplo_produto = 3 * (numero_1 * numero_2 * numero_3)`.
- **Raiz quadrada da soma dos quadrados:** `raiz_soma_quadrado = ((numero_1**2) + (numero_2**2) + (numero_3**2)) ** (1/2)`.
- **Parênteses:** Usar parênteses para deixar explícita a ordem (soma antes de dividir, quadrados antes de somar, etc.), mesmo quando a precedência já faria certo — boa prática de legibilidade.
- ❌ **Erro comum:** Esquecer o desvio padrão ou a média na fórmula do desvio; usar 2 em vez de 3 no denominador (populacional vs amostral). Nesta aula foi usado 3 (populacional).

#### Strings — Aspas simples ou duplas

- **Definição:** `aspas_simples = 'string com aspas simples'` e `aspas_duplas = "string com aspas duplas"` produzem tipo `str`. Tanto faz para o tipo; escolha por estilo ou para permitir aspas dentro do texto.
- **String = cadeia de caracteres:** Pode ser palavra, frase, números, símbolos; em geral associada a texto. Pode conter dígitos e caracteres especiais; o tipo é sempre `str` quando definida entre aspas.
- **Verificação:**
```bash
print(variavel, type(variavel))
```
mostra o valor e `<class 'str'>`.

#### String em uma linha e multilinha

- **Regra (aspas simples ou duplas):** A string deve começar e terminar na mesma linha. Se houver quebra de linha no meio do texto, o interpretador não encontra o fechamento na mesma linha → **SyntaxError: unterminated string literal** (detected at line 1). A seta do erro aponta para o fim da primeira linha onde a string “terminou” de forma inesperada.
- **Solução para múltiplas linhas:** Docstring — três aspas simples `'''` ou duplas `"""` no início e no fim. Entre elas pode haver várias linhas; as quebras são preservadas. Ex.: fragmentos de poema (Carlos Drummond de Andrade) em variáveis como `poema_carlos_drummond_fragmento_1`, etc.
- **Quando usar:** Texto curto em uma linha → aspas simples ou duplas. Parágrafos, poemas, blocos de documentação → docstring.

#### Aspas dentro do texto e SyntaxError

- **Problema:** String definida com aspas duplas: `loren = "Lorem Ipsum... "de Finibus, Bonorum et Malorum""`. O interpretador vê a primeira `"` como início e a próxima `"` (antes de “de”) como fim da string; o resto vira código inválido → **SyntaxError: unterminated string literal**. A seta indica o ponto onde o erro foi detectado (ex.: na letra “d” de “de”).
- **Solução:** Definir a string com aspas simples para que as aspas duplas internas sejam conteúdo:
```bash
loren = 'Lorem Ipsum... "de Finibus, Bonorum et Malorum"'
```
Ao dar:
```bash
print(loren)
```
o texto é exibido incluindo as aspas duplas.
- **Regra geral:** Se o texto contém aspas duplas, delimitar com aspas simples; se contém aspas simples, delimitar com aspas duplas. Assim não é necessário escape nesta aula.
- **Observação (slides/transcrição):** Quando a string é definida com aspas duplas e dentro há aspas simples, o print mostra as aspas simples como parte do texto; o contrário também. O que importa é não misturar o mesmo tipo de aspa delimitadora com a aspa que faz parte do conteúdo.

### 6. Procedimento / execução

- **Exercícios:** (1) Identificar variáveis e fórmulas do enunciado. (2) Declarar variáveis com nomes expressivos (snake_case). (3) Escrever as expressões em Python (parênteses quando ajudar). (4) Calcular e guardar em variáveis de resultado. (5) Usar print para exibir e conferir.
- **Strings multilinha:** (1) Abrir com `'''` ou `"""`. (2) Escrever o texto em várias linhas. (3) Fechar com `'''` ou `"""`. (4) Atribuir a uma variável ou usar diretamente.
- **Texto com aspas:** (1) Ver se o texto contém `"` ou `'`. (2) Delimitar a string com o tipo oposto. (3) Colar o texto entre as aspas. (4) Executar e, se der SyntaxError, revisar onde a aspa “fecha” a string.

### 7. Exemplos relevantes

- **Exercício 1:**
```bash
graus_celsius = 0
graus_fahrenheit = graus_celsius * 9/5 + 32
print("graus_celsius:", graus_celsius, "graus_fahrenheit:", graus_fahrenheit)
```
→ 0, 32.0.
- **Exercício 2:** `lado_a = lado_b = 10`, `lado_c = lado_d = 50`; `perimetro_retangulo = lado_a + lado_b + lado_c + lado_d`; `area_retangulo = lado_c * lado_a`; prints → Retangulo de lados: 10 10 50 50, Perimetro: 120, Area: 500.
- **Exercício 3:** `numero_1, numero_2, numero_3 = 3, 5, 7`; média 5.0, média geométrica ~4.72, desvio padrão ~1.63, dobro da soma 30, triplo do produto 315, raiz da soma dos quadrados ~9.11.
- **Strings:** `aspas_simples = 'string com aspas simples'`, `aspas_duplas = "string com aspas duplas"` → ambas `<class 'str'>`. Poema multilinha com `'''...'''`. `loren = '... "de Finibus..."'` → print exibe o texto com as aspas duplas.

### 8. Diferenças e confusões comuns

- **Atribuição única vs encadeada:** `a = 10; b = 10` vs `a = b = 10`. Resultado final igual; na encadeada a ordem é direita → esquerda e evita repetir o valor.
- **Aspas simples vs duplas no tipo:** Nenhuma diferença de tipo; ambas geram `str`. A diferença importa quando o texto contém uma delas.
- **Docstring vs comentário:** Docstring é uma string (pode ser atribuída, impressa); comentário com `#` ou `'''` em bloco só para anotação não é executado como valor. Docstring de uma linha no início de função/módulo vira documentação (ex.: `help()`).
- **Unterminated string literal:** O erro não é “string muito longa” e sim “o interpretador encontrou fim de linha (ou outra aspa) antes do fechamento da string”. Verificar onde a string foi “fechada” pelo tipo de aspa errado.

### 9. Como cai em prova

- Pedir a fórmula em Python para média geométrica de três números ou raiz quadrada da soma dos quadrados.
- Dar um trecho com string em aspas duplas contendo `"palavra"` e perguntar o que acontece (SyntaxError) e como corrigir (aspas simples por fora).
- Perguntar a ordem de avaliação de `a = b = 10` (primeiro b, depois a).
- Verdadeiro ou falso: “Em Python, string com aspas simples pode ocupar várias linhas.” (Falso — só em uma linha; multilinha com docstring.)

### 10. Pontos de atenção

- Desvio padrão: na aula usou-se divisão por 3 (populacional). Em estatística amostral costuma-se usar n-1 no denominador; não confundir sem contexto.
- Nome de variável com espaço (ex.: `poema carlos drummond`) gera SyntaxError; usar snake_case `poema_carlos_drummond`.
- Executar células do notebook na ordem quando uma célula usa variáveis definidas em outra (ex.: exercício 3 usa `media` no cálculo do desvio padrão).
- No material há observação sobre print mostrar ou não aspas: o que aparece é o **conteúdo** da string; se as aspas fazem parte do conteúdo, elas aparecem no print.

### 11. Checklist de domínio

- [ ] Sei implementar conversão ºC→ºF, perímetro e área do retângulo, e os seis cálculos do exercício de três números.
- [ ] Sei explicar atribuição encadeada (`a = b = valor`) e a ordem de avaliação (direita para esquerda).
- [ ] Sei usar raiz quadrada e raiz cúbica via `** (1/2)` e `** (1/3)`.
- [ ] Sei definir string com aspas simples e duplas e quando usar cada uma (texto com aspas internas).
- [ ] Sei criar string multilinha com docstring e evitar SyntaxError por quebra de linha ou aspas internas.
