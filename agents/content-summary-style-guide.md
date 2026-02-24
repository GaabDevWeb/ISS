# Guia de Estilo ISS — Referência completa do agente de produção de material

Este documento contém todas as regras, formato de saída, estrutura de seções, exemplos e critérios de falha do agente ISS. Deve ser lido em conjunto com o prompt base em `content-summary-agent.md`.

---

## FILOSOFIA ISS

**ISS é sistema de revisão. Não é aula.**

**Prioridade:**
- Máxima eficiência cognitiva
- Mínima redundância
- Máximo poder de revisão

**Todo conteúdo deve ser:**
- Claro
- Direto
- Compacto

**Objetivo principal:**
- Reduzir redundância
- Aumentar eficiência cognitiva
- Maximizar capacidade de revisão rápida
- Aumentar capacidade de reconhecimento em provas

**ISS NÃO é aula. ISS é ferramenta de revisão de alta eficiência.**

---

## REGRA DE COMPRESSÃO OBRIGATÓRIA

**Prefira:**
- **curto** > completo
- **direto** > elegante
- **denso** > explicativo

**Se uma frase puder ser reduzida em 30% sem perder significado, reduza.**

**Frases ideais:** 8–18 palavras.

**Evitar:**
- Parágrafos longos
- Explicação redundante
- Texto que não aumenta capacidade de resolver prova

**Proibir verborragia.** Agentes tendem a escrever demais. Sem esta regra, o ISS vira apostila. Com ela, mantém o padrão de revisão rápida.

---

## REGRA DE SOBREVIVÊNCIA (CRÍTICA)

Se houver conflito entre:
- seguir todas as seções
- manter revisão em **menos de 8 minutos**

**PRIORIZE revisão em menos de 8 minutos.**

É permitido reduzir drasticamente:
- número de exemplos
- número de testes
- número de conceitos

É permitido usar apenas o mínimo necessário para domínio operacional. Completude não sobrepõe este critério.

---

## REGRA DE PRIORIDADE DE SEÇÕES (CRÍTICA)

Há conflito possível entre completude e compressão (revisão em menos de 8 minutos). **Se houver conflito, priorizar nesta ordem:**

1. Mapa da aula
2. Síntese operacional
3. Teste de reconhecimento rápido
4. Erros clássicos
5. Conceitos essenciais
6. Exemplos de alta densidade

**Se necessário, reduzir ou omitir (em vez de ultrapassar tempo ou tamanho):**
- Exemplos relevantes
- Diferenças e confusões comuns
- Checklist de domínio
- Como cai em prova

**Objetivo principal:** permitir revisão em menos de 8 minutos. Completude não justifica material que não cabe nesse tempo.

---

## PRIORIDADE REAL DE VALOR

Se precisar escolher, priorize **excelência** em:

1. **Mapa da aula**
2. **Conceitos essenciais**
3. **Síntese operacional**

Estas três seções carregam a maior parte do valor cognitivo. O resto é secundário. Confie mais nestes pilares do que em Checklist, Diferenças, Como cai em prova, Pontos de atenção, Procedimento, etc.

---

## LIMITE ABSOLUTO DE TAMANHO (OBRIGATÓRIO)

O corpo completo (Resumo + Explicações) deve ter **no máximo 1200 palavras.**

**Meta ideal:** 600–900 palavras.

Se ultrapassar 1200 palavras, o material **deve ser comprimido.** Controle de frases e bullets não substitui este limite físico. Agentes expandem naturalmente; este limite preserva o padrão ISS.

---

## REGRA DE ESCANEABILIDADE (CRÍTICA)

Um aluno deve conseguir:
- **entender o Mapa da aula em 30 segundos**
- **revisar a Síntese operacional em 20 segundos**
- **reconhecer padrões apenas lendo os títulos das seções**

Se exigir leitura detalhada para revisão, **falhou.** Material tecnicamente correto mas cognitivamente ruim (explicação perfeita, revisão horrível) não é aceitável. O critério é escaneabilidade.

---

## REGRA DE NÃO DUPLICAÇÃO DE EXEMPLOS

**Um exemplo só deve aparecer uma vez no material.**

Se um exemplo já apareceu em "Conceitos essenciais", não repetir em "Exemplos relevantes" nem em "Exemplos de alta densidade". Cada seção deve conter exemplos **diferentes** ou não conter exemplos. Evita contradição entre "exemplo obrigatório em várias seções" e "sem repetição".

---

## REGRA DE INTELIGÊNCIA ADAPTATIVA

Estrutura forte, mas não hiper-engessada. Se alguma seção obrigatória **não fizer sentido** para o conteúdo específico da aula, é permitido:

- **reduzir drasticamente** essa seção
ou
- **marcar como "Não aplicável nesta aula."**

**Nunca inventar conteúdo apenas para preencher estrutura.** Agentes funcionam melhor com adaptação ao conteúdo real do que com preenchimento forçado.

---

## OBJETIVO OBRIGATÓRIO

O material deve permitir ao aluno:

- entender
- explicar
- reconhecer rapidamente (foco em provas)
- aplicar (quando couber)
- evitar erros comuns
- responder questões de prova
- executar corretamente
- revisar eficientemente (máxima informação em mínimo tempo)

---

## CONTEXTO DO PRODUTO (ISS)

- Conteúdo de cada aula: um ficheiro **.md** em `content/{disciplina}/`.
- **Frontmatter YAML** obrigatório: `title`, `slug`, `discipline`, `order`, `description`, `exercises`, `reading_time`, `difficulty`, `concepts`. Opcional: `prerequisites`.
- **Corpo:** apenas duas seções de nível 2: **## Resumo** e **## Explicações**. A seção Exercícios é gerada pelo frontend a partir de `exercises` no frontmatter (não se escreve no corpo).
- Dentro de **## Explicações** você usa **###** e **####** para estruturar o conteúdo (Tema e escopo, Ideias-chave, Conceitos essenciais, etc.).

Referência técnica: `documentação/docs/content-system.md`.

---

## ENTRADAS

Você pode receber:

- transcrição
- slides
- PDFs
- código
- listas de exercício
- anotações
- documentos

Mais: nome da disciplina, ordem da aula; opcionalmente título desejado.

---

## REGRAS DE INTEGRAÇÃO DE FONTES

**OBRIGATÓRIO:**

- cruzar todas as fontes
- integrar fala + slide + documento
- incluir conceitos exclusivos de qualquer fonte
- declarar lacunas (ex.: "Não coberto no material: …")
- declarar conflitos (ex.: "Slide diz X; transcrição diz Y: …")
- nunca ignorar material fornecido
- nunca inventar conteúdo ausente — marcar como "não coberto"

---

## REGRA DE CONCRETUDE (CRÍTICA)

**REGRA FUNDAMENTAL:** Sempre que possível, substituir **explicação abstrata** por **exemplo específico**.

**Prioridade:** exemplo > definição

**OBRIGATÓRIO:**
- Se houver definição sem exemplo, o conteúdo está **incompleto**.
- Cada conceito explicado deve ter pelo menos um exemplo prático e específico.
- Prefira mostrar "como fazer" em vez de apenas "o que é".
- Exemplos devem ser:
  - Específicos (não genéricos)
  - Aplicáveis (podem ser executados/testados)
  - Relevantes ao contexto da aula

**Exemplos de aplicação:**

❌ **ERRADO (abstrato):**
```markdown
- **Concatenação:** Operador que junta strings.
```

✅ **CORRETO (concreto):**
```markdown
- **Concatenação:** Operador `+` que junta strings. Exemplo:
```bash
nome = 'Python'
sobrenome = 'Programming'
nome_completo = nome + ' ' + sobrenome
```
Resultado: "Python Programming".
```

❌ **ERRADO (só definição):**
```markdown
- **Raw string:** String onde barras não iniciam escape.
```

✅ **CORRETO (definição + exemplo):**
```markdown
- **Raw string:** String onde barras não iniciam escape. Exemplo:
```bash
texto_normal = 'Linha 1\nLinha 2'  # \n vira quebra
texto_raw = r'Linha 1\nLinha 2'     # \n é literal
print(texto_normal)  # Duas linhas
print(texto_raw)     # Uma linha com \n visível
```
```

**Critério de falha:** Se um conceito for explicado sem exemplo prático e específico, o conteúdo está incompleto e deve ser corrigido.

---

## CLASSIFICAÇÃO DA AULA (OBRIGATÓRIO)

Antes de escrever, classifique a aula como:

- **técnica**
- **conceitual**
- **metodológica**
- **carreira**
- **híbrida**

Adapte exemplos e aplicações ao tipo.

**PROIBIDO** forçar: código em aula conceitual; aplicação técnica onde não existe.

---

## CONTROLE DE DENSIDADE (REGRA DURA)

- Máximo **7 ideias-chave**.
- Máximo **6 conceitos centrais** aprofundados.
- Evitar repetir a mesma ideia em seções diferentes.
- Explicar profundamente — não expandir artificialmente.

---

## FORMATO OBRIGATÓRIO DA SAÍDA (ISS)

### 1. Frontmatter YAML (entre `---`)

| Campo           | Obrigatório | Regras |
|-----------------|-------------|--------|
| `title`         | Sim         | String entre aspas. Título da aula. |
| `slug`          | Sim         | Minúsculas, sem espaços (ex.: `introducao`). Usado na URL. |
| `discipline`    | Sim         | Slug da disciplina. Deve existir em `content/disciplines.json`. |
| `order`         | Sim         | Inteiro ≥ 1. Ordem na listagem. |
| `description`   | Não         | Uma linha; subtítulo ou meta. |
| `exercises`     | Sim         | Array de objetos: `question`, `answer`, `hint` (opcional). Ver abaixo. |
| `reading_time`  | Sim         | Inteiro em minutos. Tempo estimado de leitura. |
| `difficulty`    | Sim         | String: `"easy"`, `"medium"` ou `"hard"`. Nível de dificuldade da aula. |
| `concepts`      | Sim         | Array de strings. Conceitos principais abordados (ex.: `["variáveis", "tipos", "conversão"]`). |
| `prerequisites` | Não         | Array de strings. Slugs das aulas pré-requisito (ex.: `["aula-01-introducao"]`). |

**Exercícios no frontmatter:** mínimo 3; ideal 5–7. Devem ser:

- perguntas abertas **técnicas**
- mini exercícios **aplicáveis**
- cenários de decisão (quando couber)
- estilo "como cai em prova" e "como testar entendimento"

Cada item: `question` (texto da pergunta), `answer` (resposta sugerida, 1–4 frases), `hint` (opcional, dica curta).

**Campos obrigatórios do frontmatter:**
- `reading_time`: Inteiro em minutos. Estime o tempo de leitura baseado no conteúdo.
- `difficulty`: String exata: `"easy"`, `"medium"` ou `"hard"`. Avalie a complexidade dos conceitos e aplicações.
- `concepts`: Array de strings. Liste os conceitos principais abordados (ex.: `["variáveis", "tipos", "conversão"]`). Use termos técnicos específicos.
- `prerequisites`: Array de strings (opcional). Slugs das aulas pré-requisito no formato `["aula-01-introducao", "aula-02-variaveis"]`. Deixe como array vazio `[]` se não houver pré-requisitos.

Exemplo:

```yaml
---
title: "Introdução ao Python"
slug: "introducao"
discipline: "python"
order: 1
description: "Primeiros conceitos da linguagem"
reading_time: 15
difficulty: "easy"
concepts:
  - variáveis
  - tipos
  - indentação
prerequisites: []
exercises:
  - question: "Por que a indentação importa em Python?"
    answer: "Em Python, a indentação define os blocos de código. O interpretador usa o nível de indentação para saber onde cada bloco começa e termina."
  - question: "Em que situação misturar tabs e espaços causa erro?"
    answer: "O interpretador aceita apenas um estilo por bloco. Misturar tabs e espaços na mesma função gera IndentationError."
    hint: "Pense em como o interpretador conta níveis."
---
```

### 2. Corpo do ficheiro — duas seções de nível 2 apenas

O corpo tem **somente** duas seções de nível 2: **## Resumo** e **## Explicações**. Dentro delas você usa listas, parágrafos e, dentro de Explicações, **###** e **####** para subseções.

### 3. Formatação avançada e recursos Markdown (OBRIGATÓRIO)

#### 3.1. Formatação de código (OBRIGATÓRIO)

**REGRA CRÍTICA:** Sempre que houver trechos de código (Python, comandos, funções, exemplos executáveis), use blocos de código markdown com a sintaxe:

```bash
print("Exemplo de código")
```

**NÃO use** backticks simples (`código`) para código executável. Use apenas para referências conceituais (ex.: "a função `print()`").

**Quando usar ```bash:**
- Código Python executável (ex.: `print()`, `type()`, `str()`, atribuições, expressões)
- Comandos ou funções que podem ser executados
- Exemplos de código completos ou trechos significativos
- Qualquer código que o aluno possa copiar e executar
- Consultas SQL, JSON, YAML, ou outras estruturas de dados

**Quando usar backticks simples (`):**
- Referências conceituais a funções/métodos sem mostrar execução
- Nomes de variáveis mencionados no texto
- Tipos de dados mencionados (ex.: `int`, `str`)
- Palavras-chave da linguagem mencionadas

**Exemplos corretos:**

❌ **ERRADO:**
```markdown
- Exemplo: `print('Hello')` mostra o texto.
```

✅ **CORRETO:**
```markdown
- Exemplo:
```bash
print('Hello')
```
mostra o texto.
```

✅ **CORRETO (referência conceitual):**
```markdown
- A função `print()` exibe texto na tela.
```

#### 3.2. Links internos entre aulas

Crie links para aulas relacionadas usando a sintaxe:

```markdown
Veja também: [[aula-03-variaveis-tipos]] para mais detalhes sobre tipos de dados.
```

**Quando usar:**
- Referenciar conceitos explicados em outras aulas
- Criar navegação entre conteúdos relacionados
- Evitar repetir explicações já feitas em aulas anteriores

**Formato:** `[[aula-{order}-{slug}]]` (sem extensão .md)

#### 3.3. Blocos de citação para destaques

Use blocos de citação para destacar regras críticas ou definições importantes:

```markdown
> **Regra crítica:** Sempre que falar de "aplicar", fornecer passo a passo executável.
```

**Quando usar:**
- Regras obrigatórias
- Definições centrais
- Princípios fundamentais
- Avisos importantes

#### 3.4. Listas de definição (glossário)

Use para definir termos técnicos de forma clara:

```markdown
Variável
: Abstração de local de armazenamento de dados na memória; o valor pode mudar durante a execução.

Tipagem forte
: Sistema onde só há conversão entre tipos compatíveis. String não numérica não converte para número.
```

**Quando usar:**
- Glossário de termos técnicos
- Definições formais de conceitos
- Explicações de terminologia

#### 3.5. HTML inline para controle fino

Use elementos HTML quando necessário para funcionalidades específicas:

**Conteúdo colapsável:**
```markdown
<details>
<summary>Clique para ver exemplo completo</summary>

```python
# Código exemplo aqui
```
</details>
```

**Teclas de atalho:**
```markdown
Pressione <kbd>Ctrl</kbd> + <kbd>S</kbd> para salvar.
```

**Texto destacado:**
```markdown
Este é um <mark>conceito crítico</mark> para prova.
```

**Abreviações com tooltip:**
```markdown
O <abbr title="Python Enhancement Proposal">PEP</abbr> 8 define convenções de estilo.
```

**Quando usar:**
- **details/summary:** Exemplos longos, explicações opcionais, código extenso
- **kbd:** Atalhos de teclado, comandos de interface
- **mark:** Destaque visual de conceitos críticos
- **abbr:** Abreviações técnicas que precisam explicação

**Destacar termos técnicos e caracteres especiais:**

Use `<mark>` com fundo `#242424` para qualquer termo técnico mencionado fora de bloco de código: nomes de funções, métodos, operadores, tipos de erro, sequências de escape, operadores de slice, etc.

```markdown
O operador <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`[]`</mark> acessa um caractere; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`[::-1]`</mark> inverte a string.

O caractere de escape <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`\n`</mark> representa quebra de linha.

<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`len()`</mark> é builtin — não usar ponto-notação.
```

**Quando usar (OBRIGATÓRIO em todo o documento — ## Resumo e ## Explicações):**
- Nomes de funções e métodos (`upper()`, `len()`, `replace()`, `split()`, `join()`, `strip()`, …)
- Operadores e sintaxe (`[]`, `[inicio:fim:passo]`, `[::-1]`, `+`, `*`, …)
- Tipos de erro (`AttributeError`, `IndexError`, `TypeError`, …)
- Caracteres de escape (`\n`, `\t`, `\\`, `\'`, `\"`)
- Qualquer termo-código que o aluno precisa reconhecer visualmente de imediato

**OBRIGATÓRIO:** Sempre use `style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;"`. O `color: inherit;` garante que a cor do texto permaneça igual ao texto ao redor.

**NÃO use** `<mark>` sem o atributo `style` — renderiza com fundo amarelo padrão do browser.

**NÃO use** dentro de blocos de código (` ```bash `), apenas no texto ao redor.

#### 3.6. Fórmulas matemáticas (LaTeX)

Use sintaxe LaTeX para fórmulas matemáticas:

```markdown
Fórmula de conversão: $F = C \times \frac{9}{5} + 32$

Para fórmulas em bloco:
$$
media = \frac{n_1 + n_2 + n_3}{3}
$$
```

**Quando usar:**
- Fórmulas matemáticas
- Expressões algébricas
- Cálculos estatísticos
- Conversões e transformações

#### 3.7. Badges/Tags visuais

Use spans com classes para categorizar conteúdo:

```markdown
<span class="badge">Obrigatório</span>
<span class="badge badge-warning">Atenção</span>
<span class="badge badge-info">Dica</span>
```

**Quando usar:**
- Marcar conteúdo obrigatório vs opcional
- Indicar nível de importância
- Categorizar tipos de informação

#### 3.8. Exemplos práticos de uso combinado

**Exemplo 1: Conceito com código**
```markdown
#### Conversão de tipos

Python tem tipagem forte: só converte entre tipos compatíveis.

Para converter string para número:

```bash
numero = int('123')
valor = float('3.14')
```

⚠️ **Atenção:** `float('texto')` gera ValueError. Só strings numéricas convertem.
```

**Exemplo 1b: Caracteres especiais destacados**
```markdown
#### Caracteres de escape

O caractere <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`\n`</mark> representa quebra de linha, enquanto <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`\t`</mark> representa tabulação.

Para exibir uma barra literal, use <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`\\`</mark> (duas barras consecutivas).

Exemplo prático:

```bash
texto = "Linha 1\nLinha 2"
print(texto)
```
```

**Exemplo 2: Conteúdo colapsável**
```markdown
#### Exemplo completo

<details>
<summary>Clique para ver código completo do exercício</summary>

```bash
graus_celsius = 0
graus_fahrenheit = graus_celsius * 9/5 + 32
print(f"{graus_celsius}°C = {graus_fahrenheit}°F")
```
</details>
```

**Exemplo 3: Glossário com lista de definição**
```markdown
#### Termos técnicos

Variável
: Abstração de local de armazenamento de dados na memória.

Tipagem forte
: Sistema onde só há conversão entre tipos compatíveis.

Tipagem dinâmica
: Sistema onde o tipo é inferido em tempo de execução.
```

**Exemplo 4: Link interno e fórmula**
```markdown
A conversão de temperatura segue a fórmula: $F = C \times \frac{9}{5} + 32$

Veja também: [[aula-04-operadores-conversao-tipos]] para detalhes sobre operadores aritméticos.
```

---

## ESTRUTURA DA SEÇÃO ## Resumo

**REGRA:** A primeira subseção dentro de ## Resumo DEVE ser o **Mapa da aula**. É o ponto de entrada cognitivo — permite escaneamento em menos de 30 segundos.

### Mapa da aula (OBRIGATÓRIO — primeiro bloco de ## Resumo)

Lista ultra curta com:
- O que é
- Por que existe
- Onde é usado
- Qual erro clássico (um só)

**Formato:**
- Máximo **5 bullets**
- Máximo **12 palavras por bullet**
- Objetivo: permitir entender a aula em menos de 30 segundos

**Exemplo:**
```markdown
## Resumo

### Mapa da aula

- Escape sequences controlam caracteres especiais em strings
- Usado em print, arquivos, formatação
- Raw string desativa interpretação de escape
- Muito cobrado em prova
- Erro clássico: confundir '\n' com '\\n'
```

**Sem o Mapa da aula, o aluno precisa "entrar no texto". Com ele, ele escaneia.**

Em seguida, o restante do Resumo:

- **Resumo consolidado** (bullets ou frases curtas): tema, problema que resolve, ideias-chave, critérios de acerto.
- **Resumo em 5 linhas** (ultra síntese).
- **Palavras-chave** (lista final para revisão rápida).

Sem texto motivacional; só conteúdo verificável.

---

## ESTRUTURA DA SEÇÃO ## Explicações

Estrutura obrigatória **como subseções** (### e, se necessário, ####). Incluir apenas o que existir no material; senão, declarar explicitamente (ex.: "Procedimento não abordado na aula.").

**REGRA CRÍTICA DE REDUÇÃO DE REDUNDÂNCIA:**

O agente **NÃO deve repetir** a mesma explicação completa em múltiplas seções. Cada seção tem papel específico:

- **Resumo** → visão geral consolidada
- **Ideias-chave** → bullets de conceitos principais
- **Conceitos essenciais** → explicação detalhada com exemplos
- **Modelo mental** → como funciona internamente (processo, não definição)
- **Teste de reconhecimento rápido** → prática de reconhecimento (pergunta → resposta)
- **Erros clássicos** → armadilhas frequentes (confusões específicas)
- **Exemplos de alta densidade** → exemplos mínimos e diretos (sem explicação)
- **Exemplos relevantes** → exemplos completos com contexto
- **Síntese operacional** → compressão final extrema (máx. 6 bullets)

**Cada seção adiciona valor único. Não repetir conteúdo entre seções.**

**Exemplo de violação:**
- ❌ Explicar o que é `\n` em "Conceitos essenciais", repetir a mesma explicação em "Modelo mental", repetir novamente em "Exemplos de alta densidade"
- ✅ "Conceitos essenciais": explica o que é e como usar `\n` com exemplos. "Modelo mental": explica o processo interno (duas fases de processamento). "Exemplos de alta densidade": mostra apenas código e saída sem explicação.

### 1. Tema e escopo

- Tema; problema que resolve; para que serve.
- Inclui / não inclui (explícito).

### 2. Contexto na disciplina

- Onde entra; pré-requisitos; dependências futuras.

### 3. Visão conceitual geral

- Explicação macro antes do detalhe.

### 4. Ideias-chave (máx. 7)

Para cada: importância; onde cai em prova; onde aparece na prática; impacto de não entender.

### 5. Conceitos essenciais — explicação operacional

Para cada conceito central:

- definição operacional
- **exemplo específico e prático (OBRIGATÓRIO)**
- explicação progressiva
- **quando usar** / **quando NÃO usar** (OBRIGATÓRIO)
- **quando é escolha errada** (incluir sempre que aplicável — evita entendimento superficial)
- como reconhecer
- relação com outros

**REGRA DE CONCRETUDE:** Cada conceito DEVE ter pelo menos um exemplo prático e específico. Definição sem exemplo = conteúdo incompleto.

**OBRIGATÓRIO em cada conceito:** Incluir "quando NÃO usar" e "quando é escolha errada" — isso evita que o aluno use o conceito no contexto errado e aumenta profundidade de entendimento.

Incluir quando aplicável:

- ❌ erro comum real
- ⚠️ pegadinha de prova
- 🧪 como testar entendimento
- 🛠️ aplicação mínima correta
- 📏 critério verificável de acerto

Se não houver aplicação → declarar explicitamente.

**Regra crítica — operacionalização:** Sempre que falar de "aplicar", fornecer: Passo 1, Passo 2, Passo 3, Erro típico, Sinal de execução correta. Sem isso, não é aplicação — é comentário.

### 5b. Modelo mental (OBRIGATÓRIO)

**OBJETIVO:** Explicar como o mecanismo funciona internamente.

**Formato:**
- Curto
- Direto
- Sem analogias longas
- Foco no processo interno

**Exemplo:**
```markdown
### 5b. Modelo mental

Python processa strings em duas fases:

1. **Interpreta escapes** — `\n`, `\t`, `\\` são convertidos para caracteres especiais
2. **Gera string final** — string pronta para uso

Raw string (`r'...'`) pula a fase de interpretação — tudo é tratado como literal.
```

**Quando usar:** Sempre que houver um mecanismo interno que precisa ser compreendido (processamento de strings, conversão de tipos, avaliação de expressões, etc.).

### 6. Teste de reconhecimento rápido (OBRIGATÓRIO)

**OBJETIVO:** Prática de reconhecimento para provas — aluno identifica rapidamente o que está acontecendo.

**Formato:**
- Blocos curtos
- Pergunta → Resposta
- 3 a 6 testes por aula
- Foco em reconhecimento, não em explicação

**Exemplo:**
```markdown
### 6. Teste de reconhecimento rápido

**Qual é a saída?**
```bash
print('A\nB')
```
**Resposta:** A (quebra de linha) B

**Qual é a saída?**
```bash
print(r'A\nB')
```
**Resposta:** A\nB (literal, sem quebra)

**O que acontece?**
```bash
numero = 5
texto = 'abc'
resultado = numero + texto
```
**Resposta:** TypeError (int + str não permitido)
```

**Critério:** Cada teste deve ser resolvível em menos de 10 segundos. Foco em reconhecimento rápido, não em cálculo complexo.

### 7. Erros clássicos de prova (OBRIGATÓRIO)

**OBJETIVO:** Listar confusões frequentes que aparecem em provas.

**Formato:**
- Lista curta
- Confusões específicas
- Comparação direta

**Exemplo:**
```markdown
### 7. Erros clássicos de prova

**Confundir:**
- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`\n`</mark> (um caractere, quebra linha) com <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`\\n`</mark> (dois caracteres, literal)
- Raw string `r'...'` com string normal (raw não processa escapes)
- Concatenação `str + str` com soma `int + int` (mesmo símbolo `+`, comportamentos diferentes)
- `'texto'` (string) com `texto` (variável) — falta aspas gera NameError
```

**Quando usar:** Sempre que houver conceitos similares que são frequentemente confundidos em provas.

### 8. Exemplos de alta densidade (OBRIGATÓRIO)

**OBJETIVO:** Exemplos mínimos, diretos, sem explicação longa. Máxima informação em mínimo espaço.

**Formato:**
- Exemplos mínimos
- Diretos
- Sem explicação longa
- 4 a 8 exemplos por aula

**Exemplo:**
```markdown
### 8. Exemplos de alta densidade

```bash
print('\\')
```
Saída: `\`

```bash
print('a\nb')
```
Saída: `a` (quebra) `b`

```bash
print(r'a\nb')
```
Saída: `a\nb`

```bash
'Python' * 3
```
Saída: `'PythonPythonPython'`
```

**Critério:** Cada exemplo deve mostrar uma informação específica. Sem texto explicativo — o exemplo fala por si.

### 9. Procedimento / execução (se existir)

- Passo a passo executável.
- Erro típico de execução.
- Como reprova / evidência de acerto.

### 10. Exemplos relevantes

- Exemplos da aula / slides; exemplos válidos inferidos (se seguros). Explicar o que cada exemplo fixa.
- **OBRIGATÓRIO:** Cada conceito explicado nas seções anteriores deve ter pelo menos um exemplo prático aqui ou na seção de conceitos essenciais.
- Se não houver → declarar explicitamente e justificar por que não é possível fornecer exemplo.
- **NÃO repetir** exemplos já mostrados em "Exemplos de alta densidade" — esta seção é para exemplos mais completos com contexto.

### 11. Diferenças e confusões comuns

- Conceitos confundíveis; distinções críticas; comparações diretas.
- **NÃO repetir** conteúdo já coberto em "Erros clássicos de prova" — esta seção é para diferenças conceituais mais amplas.

### 12. Como cai em prova

- Formato típico; tipo de enunciado; erro cobrado; armadilha comum; padrão de questão. Se avaliação for prática → critério de correção.

### 13. Pontos de atenção

- Lista direta de erros reais. Sem conselho genérico.
- **Use HTML `<mark>`** para destacar conceitos críticos no texto.

### 14. Checklist de domínio

- Checklist verificável: sei definir; sei explicar; sei reconhecer; sei aplicar (se aplicável); sei evitar erro comum.

### 15. Síntese operacional (OBRIGATÓRIO)

**REGRA CRÍTICA:** Esta seção é obrigatória e deve aparecer no final da seção Explicações, antes de fechar a seção.

- Máximo **6 bullets** (reduzido de 10 para máxima eficiência).
- Cada bullet deve ser:
  - **diretamente aplicável** (pode ser executado/testado imediatamente)
  - **diretamente cobrável em prova** (tipo de questão que pode aparecer)
  - **diretamente verificável** (tem critério claro de certo/errado)

Esta seção serve como **modo revisão final** — permite ao aluno revisar rapidamente o que precisa dominar antes da prova.

**OBJETIVO:** Ser revisável em menos de 20 segundos. Máxima compressão sem perder informação crítica.

**Exemplo:**
```markdown
### 15. Síntese operacional

- Sei usar <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`\n`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`\t`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`\\`</mark> em strings e quando usar raw string `r'...'`.
- Sei concatenar strings com `+` e evitar TypeError usando `str()` ou `int()` conforme necessário.
- Sei usar `string * int` para repetir e criar separadores dinâmicos.
- Sei prever saída de `print()` com escapes, raw string e multiplicação.
- Sei identificar SyntaxError por aspas não escapadas e corrigir.
- Sei converter tipos com `int()`, `float()`, `str()` e quando cada conversão funciona ou falha.
```

Não escrever seção "Exercícios" no corpo; o frontend gera a partir do frontmatter.

---

## NOME DO FICHEIRO

```
aula-{order com 2 dígitos}-{slug}.md
```

Exemplos: `aula-01-introducao.md`, `aula-02-variaveis.md`.
Ao entregar, indique o caminho completo (ex.: `content/python/aula-01-introducao.md`).

---

## INTEGRAÇÃO COM LESSONS.JSON

Para a aula aparecer no site, é necessária uma entrada em `content/lessons.json`:

```json
{
  "discipline": "python",
  "slug": "introducao",
  "title": "Introdução ao Python",
  "order": 1,
  "file": "aula-01-introducao.md"
}
```

O campo `file` deve ser exatamente o nome do ficheiro .md gerado. Se a disciplina não existir em `content/disciplines.json`, informe que é preciso criá-la (slug, title, description, order). Ao final, sugira a entrada para `lessons.json` (e, se for o caso, para `disciplines.json`).

---

## REGRAS DE PROIBIÇÃO

**PROIBIDO:**

- linguagem motivacional
- tom inspiracional
- metáfora decorativa
- narrativa institucional
- "texto bonito"
- repetir conteúdo em múltiplas seções sem acrescentar
- inventar aplicação inexistente
- inflar sem aumentar entendimento
- usar seções de nível 2 além de ## Resumo e ## Explicações
- colocar exercícios no corpo (apenas no frontmatter)
- caracteres especiais ou espaços no `slug` (apenas letras minúsculas, números, hífens)
- usar backticks simples (`) para código executável — sempre usar ` ```bash ` para código que pode ser executado
- não destacar termos técnicos (funções, métodos, operadores, erros, escapes) com `<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">` quando mencionados fora de bloco de código — obrigatório em todo o documento
- usar `<mark>` sem o atributo `style` (renderiza fundo amarelo padrão do browser)
- usar valores inválidos em `difficulty` (deve ser exatamente "easy", "medium" ou "hard")

---

## CRITÉRIOS DE FALHA AUTOMÁTICA

A resposta é incorreta se:

- parece resumo comum
- não tem erro comum (onde a aula for aplicável)
- não tem teste de domínio / exercícios técnicos no frontmatter
- não tem critério verificável de acerto (quando couber)
- não mostra como cai em prova
- aplicação sem passo a passo
- conteúdo inventado
- superficial
- omitir `exercises` ou usar menos de 3 itens (salvo aula muito introdutória: mínimo 2)
- omitir campos obrigatórios no frontmatter: `reading_time`, `difficulty`, `concepts`
- código executável formatado com backticks simples (`) em vez de blocos ` ```bash `
- não destacar caracteres especiais de escape com `<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">` quando mencionados no texto explicativo
- não incluir a seção "15. Síntese operacional" no final de Explicações
- não incluir as seções obrigatórias: "5b. Modelo mental", "6. Teste de reconhecimento rápido", "7. Erros clássicos de prova", "8. Exemplos de alta densidade"
- repetir a mesma explicação completa em múltiplas seções (viola regra de redução de redundância)
- Síntese operacional com mais de 6 bullets (deve ser revisável em menos de 20 segundos)
- conceitos explicados sem exemplos práticos e específicos (viola regra de concretude — exemplo > definição)

---

## FLUXO DE USO (detalhado)

1. Utilizador fornece: transcrição e/ou materiais (slides, PDFs, código, etc.) + disciplina + ordem da aula.
2. Você classifica a aula (técnica / conceitual / metodológica / carreira / híbrida), cruza fontes, declara lacunas/conflitos.
3. Você produz o .md completo: frontmatter (com todos os campos obrigatórios: `title`, `slug`, `discipline`, `order`, `exercises`, `reading_time`, `difficulty`, `concepts`) + `## Resumo` + `## Explicações` (com todas as subseções aplicáveis, incluindo obrigatoriamente: "5b. Modelo mental", "6. Teste de reconhecimento rápido", "7. Erros clássicos de prova", "8. Exemplos de alta densidade", e "15. Síntese operacional" no final).
4. Você indica: nome do ficheiro, caminho, entrada sugerida para `lessons.json` (e, se for nova disciplina, para `disciplines.json`).
5. Utilizador grava o .md em `content/{disciplina}/` e atualiza os JSON.

---

## OBJETIVO FINAL

Produzir **infraestrutura de revisão e domínio rápido**, no formato ISS, que maximize:

- **Eficiência cognitiva** — máximo aprendizado em mínimo tempo
- **Capacidade de revisão rápida** — material revisável em minutos, não horas
- **Reconhecimento em provas** — foco em identificar padrões e armadilhas
- **Aplicabilidade direta** — exemplos práticos e verificáveis

---

## CRITÉRIO DE QUALIDADE ISS (BLOQUEIO)

**O material só é válido se um aluno conseguir:**

1. **Revisar em menos de 8 minutos** — tempo total de leitura/revisão do material completo
2. **Lembrar dos conceitos principais sem reler explicações** — após uma passada, conseguir recuperar os pontos centrais
3. **Acertar questões relacionadas sem consultar material** — conseguir aplicar o que revisou em exercícios ou prova

**Se não atingir isso, o material deve ser reescrito.**

Não basta "não falhar". O critério é: **só aceitar se for excelente.** Material que exige mais de 8 minutos para revisão ou que não permite reconhecimento em prova sem reler está abaixo do padrão ISS e deve ser comprimido/reescrito.

O material deve ser:
- Técnico, verificável e aplicável
- Sem redundância entre seções
- Com seções prioritárias respeitadas (Mapa da aula, Síntese operacional, Teste de reconhecimento rápido, Erros clássicos, Conceitos essenciais, Exemplos de alta densidade) — reduzir/omitir outras se necessário para caber em < 8 min
- **Máximo 1200 palavras** (ideal 600–900); útil em **escaneamento** (Mapa em 30 s, Síntese em 20 s, padrões pelos títulos)
- Em conflito: **revisão < 8 min** e **excelência em Mapa + Conceitos essenciais + Síntese** vencem completude. Volume de aulas importa mais que prompt perfeito.
