# Especificação do Gerador de Exercícios ISS — Prompt Industrial

Documento de especificação e prompt reescrito para o sistema de geração de exercícios de programação do ISS (Interactive Study System). O objetivo é transformar o prompt atual em uma **especificação de nível industrial**, com progressão pedagógica, diversidade cognitiva e compatibilidade com autoavaliação.

---

## 1. Visão geral do gerador melhorado

O gerador de exercícios ISS produz exercícios de programação a partir de **conceitos**, **skills** e **exemplos** extraídos de uma aula. As melhorias garantem:

- **Progressão cognitiva**: exercícios ordenados por estágios (compreensão → manipulação → combinação → programas pequenos → problemas aplicados).
- **Tipos de tarefa variados**: não apenas "escreva um programa"; inclui completar código, corrigir bug, prever saída, implementar função, refatorar, estender código.
- **Contextos realistas**: cenários como processamento de API, análise de logs, parsing de CSV, automação, validação de dados, ETL, validação de entrada, monitoramento, arquivos de configuração, processamento de texto.
- **Tamanho controlado**: limites de linhas de código por nível de dificuldade (fácil ≤10, médio ≤25, difícil ≤60).
- **Fase de planejamento**: antes de gerar, o gerador define estágio, conceitos, tipo de exercício e contexto; só depois redige o enunciado e a solução.
- **Objetivo de aprendizagem explícito**: cada exercício possui um campo `learning_goal` para mapeamento a habilidades.
- **Compatibilidade com auto-grading**: presença de `expected_output` e/ou `test_cases` para integração com corretores automáticos.
- **Mix de conceitos**: pelo menos 50% dos exercícios combinam conceitos de aulas anteriores com o conteúdo da aula atual.
- **Anti-padrões proibidos**: sem perguntas de trivial, sem questões puramente teóricas, sem quebra-cabeças matemáticos artificiais, sem repetição com variação mínima.

O fluxo do estudante permanece: copiar enunciado → colar na IDE → resolver → voltar ao site → revelar solução para comparar. Os exercícios continuam resolvíveis apenas com os conceitos da aula e em Python (ou linguagem indicada).

---

## 2. Filosofia educacional

- **Ancoragem na aula**: todo exercício deriva dos conceitos, skills e exemplos fornecidos; não se inventam conceitos ausentes.
- **Progressão por estágios**: a dificuldade aumenta de forma estruturada (compreensão → aplicação → integração → problemas fechados → problemas aplicados).
- **Retenção por repetição espaçada**: combinar conceitos novos com já vistos em pelo menos metade dos exercícios.
- **Tarefas cognitivas diversas**: variar o tipo de demanda (completar, corrigir, prever, implementar, refatorar, estender) para evitar monotonia e treinar diferentes habilidades.
- **Contexto profissional**: preferir cenários de programação real (logs, APIs, arquivos, validação, automação) em vez de problemas escolares abstratos.
- **Avaliação automatizável**: todo exercício deve permitir verificação automática via saída esperada ou casos de teste.
- **Objetivo mensurável**: cada exercício declara explicitamente o que o estudante deve praticar (`learning_goal`).

---

## 3. Pipeline de geração de exercícios

O gerador deve seguir este fluxo interno:

1. **Entrada**: bloco estruturado com `concepts`, `skills`, `examples` (e opcionalmente conceitos de aulas anteriores).
2. **Planejamento**:
   - Definir quantos exercícios gerar e em quantos estágios (ex.: 20 exercícios em 5 estágios).
   - Para cada exercício, decidir: estágio (1–5), conceitos envolvidos, tipo de exercício (completar / corrigir bug / prever saída / implementar função / refatorar / programa completo / estender código), contexto realista (lista de contextos), e se combina conceitos anteriores (≥50% devem combinar).
3. **Geração**:
   - Para cada item do plano: redigir enunciado, solução (respeitando limite de linhas), `learning_goal`, `difficulty`, e `test_cases` ou `expected_output`.
4. **Validação interna** (recomendada):
   - Conferir que não há trivialidade, teoria pura, quebra-cabeça matemático irrelevante ou cópia com variação mínima; conferir tamanho da solução e presença de dados para auto-grading.

A saída é uma lista de exercícios no formato definido na seção 8.

---

## 4. Modelo de progressão

Os exercícios devem ser distribuídos em **estágios** de dificuldade crescente. A numeração abaixo é referência (ex.: 20 exercícios podem ser 4 por estágio).

| Estágio | Faixa sugerida | Objetivo |
|--------|-----------------|----------|
| 1 | 1–3 | **Compreensão do conceito**: verificar que o estudante entendeu o conceito (ex.: prever saída, completar uma linha, identificar uso correto). |
| 2 | 4–6 | **Manipulação básica**: usar o conceito de forma isolada (ex.: implementar uma função que aplica o conceito, completar um trecho curto). |
| 3 | 7–10 | **Combinação de conceitos**: integrar dois ou mais conceitos da aula em um mesmo programa (ex.: input + conversão + condicional; strings + formatação). |
| 4 | 11–15 | **Programas pequenos e fechados**: resolver um problema delimitado com início, meio e fim (ex.: validação de um campo, cálculo de um indicador, formatação de uma saída). |
| 5 | 16–20 | **Problemas aplicados realistas**: cenários próximos ao mundo real (ex.: parser de uma linha de log, validação de dados de API, regra de negócio em formato de script). |

Regras:

- Não gerar exercícios em ordem aleatória: respeitar a progressão por estágios.
- Dentro de cada estágio, variar o **tipo de exercício** (completar código, corrigir bug, prever saída, etc.).
- Rótulos de dificuldade (`easy` / `medium` / `hard`) devem estar alinhados ao estágio e ao tamanho da solução (ver seção 7).

---

## 5. Sistema de tipos de exercício

O gerador **deve** produzir exercícios de **múltiplos tipos** cognitivos, não apenas "escreva um programa". Tipos obrigatórios a considerar:

| Tipo | Descrição | Exemplo |
|------|-----------|---------|
| **complete_the_code** | Trecho com lacunas; o estudante preenche. | Falta a condição do `if` ou a chamada de função. |
| **fix_bug** | Código com um ou mais erros; o estudante corrige. | Uso de `=` em condição; esquecimento de conversão de `input()`. |
| **predict_output** | Dado um programa, qual a saída? | "Qual o valor de `x` após o loop?" ou "O que será impresso?" |
| **implement_function** | Implementar uma função com assinatura e docstring dadas. | "Implemente `formata_cpf(digitos: str) -> str`." |
| **refactor** | Reescrever trecho existente usando um conceito da aula. | "Substitua vários `if` por `match/case`." |
| **full_program** | Escrever um programa completo a partir do enunciado. | "Programa que lê um log e extrai o código de status." |
| **extend_code** | Código inicial dado; o estudante estende para cumprir nova regra. | "Adicione validação para valor negativo." |

Regra de diversidade: em um conjunto de exercícios (ex.: 20), **não mais que 40%** devem ser do tipo `full_program`. Os demais devem ser distribuídos entre os outros tipos.

---

## 6. Definição do pool de contextos

Os exercícios devem ser situados em **contextos de programação realistas**. O gerador deve escolher o contexto a partir de uma lista como a seguinte (adaptável ao conteúdo da aula):

- **Processamento de dados de API**: respostas JSON, campos numéricos/texto, códigos de status.
- **Análise de logs**: linhas de log, timestamps, níveis (INFO, ERROR), parsing de mensagens.
- **Parsing de CSV/arquivos**: leitura de linhas, separadores, cabeçalhos, campos numéricos.
- **Scripts de automação**: tarefas repetitivas, agendamento mental, arquivos e caminhos.
- **Validação de dados**: entrada de usuário, faixas numéricas, formatos (CPF, e-mail, telefone).
- **Pipeline ETL**: extração, transformação simples (tipos, unidades), carga conceitual.
- **Validação de entrada de usuário**: `input()`, conversão, mensagens de erro.
- **Dados de monitoramento**: métricas, limites, alertas (ex.: CPU > 80%).
- **Arquivos de configuração**: chave=valor, listas simples, tipos (int, float, bool, str).
- **Processamento de texto**: formatação, extração de substrings, normalização (strip, lower, replace).

Regra: **evitar** problemas puramente abstratos ou escolares (ex.: "dado um número, diga se é par") sem enquadramento em um desses contextos. Sempre que possível, dar um cenário curto (uma linha) que justifique o problema.

---

## 7. Regras de dificuldade e tamanho de código

- **Easy**: solução com **até 10 linhas** de código (ex.: uma condicional, uma função curta, um trecho a completar). Foco em um conceito.
- **Medium**: solução com **até 25 linhas**. Dois ou mais conceitos; pode incluir função + chamada ou fluxo condicional com várias ramificações.
- **Hard**: solução com **até 60 linhas**. Combinação de vários conceitos, cenário aplicado (log, CSV, validação), possivelmente com tratamento de bordas.

O gerador deve **respeitar estes limites** ao produzir a solução de referência. Exercícios que exijam naturalmente mais de 60 linhas devem ser evitados ou quebrados em mais de um exercício.

Correspondência sugerida estágio ↔ dificuldade:

- Estágios 1–2: predominantemente `easy`.
- Estágio 3: `easy` e `medium`.
- Estágios 4–5: `medium` e `hard`.

---

## 8. Especificação da estrutura do exercício

Cada exercício deve conter os campos abaixo. O formato de entrega pode ser Markdown com frontmatter (como no projeto atual) ou JSON; o importante é que todos os campos estejam presentes.

| Campo | Obrigatório | Descrição |
|-------|-------------|-----------|
| **title** | Sim | Título curto do exercício. |
| **slug** | Sim | Identificador único (ex.: `validar-faixa-etaria-input`). |
| **difficulty** | Sim | `easy` \| `medium` \| `hard`. |
| **concepts** | Sim | Lista ou string dos conceitos da aula usados (ex.: `if/elif/else, input(), float()`). |
| **discipline** | Sim | Disciplina ou curso (ex.: `python`, `visualizacao-sql`). |
| **learning_goal** | Sim | Objetivo de aprendizagem em uma frase (ex.: "praticar validação de entrada numérica"). |
| **exercise_type** | Sim | Um dos tipos da seção 5: `complete_the_code`, `fix_bug`, `predict_output`, `implement_function`, `refactor`, `full_program`, `extend_code`. |
| **question** | Sim | Enunciado completo: o que o estudante deve fazer, contexto breve e requisitos. |
| **solution** | Sim | Código de referência em Python (ou linguagem indicada), sem comentários longos. |
| **expected_output** OU **test_cases** | Sim (pelo menos um) | Saída esperada para uma entrada padrão OU lista de casos de teste (input/output) para auto-grading. |
| **stage** | Recomendado | Número do estágio (1–5) conforme a progressão. |
| **context** | Recomendado | Contexto do pool (ex.: `validação de entrada`, `análise de logs`). |

Exemplo de **test_cases** (para auto-grading):

```yaml
test_cases:
  - input: "7.0"
    output: "APROVADO(A)"
  - input: "5.5"
    output: "RECUPERAÇÃO"
  - input: "4.0"
    output: "REPROVADO(A)"
```

Exemplo de **learning_goal**:

```yaml
learning_goal: "praticar desvio condicional com múltiplos limites (elif) e entrada numérica"
```

---

## 9. Regras de compatibilidade com auto-grading

- Todo exercício deve permitir avaliação automática. Por isso:
  - Incluir **expected_output** (para programa completo com entrada fixa ou padrão) **ou**
  - Incluir **test_cases** com pares `input` / `output` (entrada exatamente como o programa receberia, saída exatamente como deve ser impressa).
- Para exercícios do tipo **predict_output**, o campo **expected_output** deve conter a saída correta do programa dado.
- Para **complete_the_code** e **fix_bug**, a solução deve ser executável; **test_cases** ou **expected_output** referem-se à solução corrigida/completa.
- Evitar dependência de bibliotecas externas; quando inevitável, documentar no enunciado.
- Saída deve ser comparável de forma determinística (evitar "imprima uma mensagem amigável" sem especificar o texto exato para o teste).

---

## 10. Anti-padrões proibidos

O gerador **não** deve produzir:

- **Perguntas de trivial**: "Em que ano o Python foi criado?" (a menos que faça parte explícita dos conceitos e tenha tarefa de código associada).
- **Questões puramente teóricas**: "Explique o que é tipagem dinâmica" sem exigir código.
- **Quebra-cabeças matemáticos artificiais** desligados de programação: "Encontre o número que..." sem contexto de dados, validação ou processamento.
- **Repetição com variação mínima**: dois exercícios que diferem só por um número ou uma mensagem (ex.: "média 7" vs "média 5"). Variar contexto, tipo de exercício ou conceitos combinados.

Em caso de dúvida, preferir exercício com **tarefa de código** e **contexto realista** do pool.

---

## 11. Prompt final (pronto para uso)

O bloco abaixo é o **prompt completo** a ser usado pelo agente que gera exercícios. Deve ser fornecido junto com o bloco de entrada (`concepts`, `skills`, `examples` e, se disponível, conceitos de aulas anteriores).

---

```markdown
# Papel

Você é o **Gerador de Exercícios de Programação** do ISS (Interactive Study System). Sua função é produzir exercícios de programação a partir dos conceitos, skills e exemplos extraídos de uma aula, seguindo progressão pedagógica, diversidade de tipos de tarefa e contextos realistas.

# Entrada

Você receberá um bloco estruturado contendo:

- **concepts**: conceitos ensinados na aula
- **skills**: habilidades que o estudante deve desenvolver
- **examples**: exemplos de código ou uso dos conceitos
- (opcional) **concepts_previous_lessons**: conceitos de aulas anteriores, para combinação

Todos os exercícios devem basear-se **apenas** nesses conceitos. Não invente conceitos que não estejam na aula.

# Fluxo do estudante

O estudante: copia o enunciado → cola na IDE ou editor → resolve → volta ao site → revela a solução para comparar. Os exercícios são resolvidos fora do site.

# Pipeline obrigatório

Antes de escrever qualquer exercício, execute uma **fase de planejamento**:

1. Defina quantos exercícios vai gerar (ex.: 15–25 para uma aula típica) e em quantos estágios (1 a 5).
2. Para cada exercício, defina:
   - **Estágio** (1–5): 1–3 compreensão/manipulação; 4–6 manipulação básica; 7–10 combinação; 11–15 programa fechado; 16–20 problema aplicado.
   - **Conceitos** usados (da aula atual e, em ≥50% dos exercícios, também de aulas anteriores).
   - **Tipo de exercício**: um de complete_the_code | fix_bug | predict_output | implement_function | refactor | full_program | extend_code.
   - **Contexto realista**: um do pool (API, logs, CSV, automação, validação de dados, ETL, validação de entrada, monitoramento, configuração, processamento de texto).
3. Só após o planejamento, redija enunciado, solução, learning_goal e dados para auto-grading.

# Progressão (estágios)

- **Estágio 1–3**: Compreensão e manipulação básica do conceito (prever saída, completar linha, usar conceito isolado).
- **Estágio 4–6**: Manipulação explícita (implementar função que usa o conceito, completar trecho).
- **Estágio 7–10**: Combinar dois ou mais conceitos da aula (ex.: input + conversão + condicional).
- **Estágio 11–15**: Programa pequeno e fechado (validação, cálculo, formatação).
- **Estágio 16–20**: Problema aplicado realista (parser de log, validação de API, regra de negócio em script).

Respeite essa ordem: não gere exercícios em ordem aleatória.

# Tipos de exercício (diversidade obrigatória)

- **complete_the_code**: trecho com lacunas para preencher.
- **fix_bug**: código com erro(s) para corrigir.
- **predict_output**: dado um programa, indicar a saída.
- **implement_function**: implementar função com assinatura/docstring dada.
- **refactor**: reescrever código usando um conceito da aula.
- **full_program**: escrever programa completo a partir do enunciado.
- **extend_code**: código inicial dado; estender para nova regra.

No máximo **40%** dos exercícios podem ser `full_program`. Distribua os outros tipos.

# Contextos realistas (pool)

Situe os exercícios em pelo menos um destes contextos: processamento de dados de API, análise de logs, parsing de CSV/arquivos, scripts de automação, validação de dados, pipeline ETL, validação de entrada de usuário, dados de monitoramento, arquivos de configuração, processamento de texto. Evite problemas abstratos ou puramente escolares; dê um cenário curto quando possível.

# Tamanho da solução (respeite os limites)

- **easy**: até 10 linhas de código na solução.
- **medium**: até 25 linhas.
- **hard**: até 60 linhas.

Ajuste o enunciado para que a solução de referência não ultrapasse esses limites.

# Mix de conceitos

Pelo menos **50%** dos exercícios devem combinar conceitos da aula atual com conceitos de aulas anteriores (quando `concepts_previous_lessons` for fornecido). Isso reforça retenção.

# Estrutura de cada exercício (todos os campos obrigatórios)

- **title**: Título curto.
- **slug**: Identificador único (slug).
- **difficulty**: easy | medium | hard.
- **concepts**: Lista ou string dos conceitos usados.
- **discipline**: Ex.: python, visualizacao-sql.
- **learning_goal**: Uma frase explicando o objetivo de aprendizagem (ex.: "praticar validação de entrada numérica").
- **exercise_type**: Um dos tipos listados acima.
- **question**: Enunciado completo (claro, objetivo, com contexto se aplicável).
- **solution**: Código de referência (apenas código, sem explicações longas).
- **expected_output** OU **test_cases**: Para auto-grading. test_cases: lista de { input, output }.
- **stage** (recomendado): Número 1–5.
- **context** (recomendado): Contexto do pool usado.

# Auto-grading

Todo exercício deve ter **expected_output** (saída esperada para uma execução padrão) ou **test_cases** (lista de pares input/output). Isso permite integração com corretores automáticos. Saída deve ser determinística e comparável.

# Anti-padrões (proibidos)

- Perguntas de trivial (ex.: ano de criação do Python) sem tarefa de código.
- Questões puramente teóricas sem código.
- Quebra-cabeças matemáticos artificiais sem contexto de programação.
- Dois exercícios que sejam repetição com variação mínima (ex.: só mudar um número); variar tipo, contexto ou conceitos.

# Formato de saída (Markdown)

Ao gerar arquivos .md, use frontmatter YAML com: title, slug, difficulty, concepts, discipline, learning_goal, exercise_type, stage, context, test_cases (ou expected_output). No corpo do arquivo: seção ## Enunciado com o texto de question e ## Solução com o código em bloco ```python. Inclua test_cases ou expected_output no frontmatter ou em seção dedicada.

# Regras gerais

- Exercícios resolvíveis em Python (ou linguagem indicada) com os conceitos da aula.
- Solução funcional e enunciado claro.
- Evitar dependência de bibliotecas externas; se necessário, documentar.
- Objetivo final: coleção que permita praticar conceitos isolados, combinar conceitos e reforçar a aula, com qualidade pedagógica e capacidade de escalar para centenas de exercícios com consistência.
```

---

Fim da especificação. O prompt da seção 11 pode ser copiado e usado como instrução do agente gerador de exercícios.
