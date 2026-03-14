---
title: "Refinando o relatório de conta bancária no Looker Studio"
slug: "refinando-relatorio-conta-bancaria-looker"
discipline: "visualizacao-sql"
order: 6
description: "Limpar e formatar dados bancários no Google Planilhas, configurar campos no Looker Studio e ajustar o relatório de conta corrente para análise eficiente."
reading_time: 40
difficulty: "medium"
concepts:
  - limpeza e formatação de dados em planilhas
  - conversão de formatos de moeda e data
  - configuração de tipos e agregações no Looker Studio
  - campos calculados para relatórios bancários
  - boas práticas de refinamento de dashboards
prerequisites:
  - "conta-bancaria-google-sheets-looker"
learning_objectives:
  - "Aplicar formatações corretas de data e moeda ao dataset de conta corrente no Google Planilhas."
  - "Configurar tipos de dados e agregações adequadas para campos bancários no Looker Studio."
  - "Criar e ajustar campos calculados relevantes (saldo médio, total de transações, etc.)."
  - "Refinar o relatório de conta corrente para torná-lo mais legível e útil para análise."
exercises:
  - question: "Por que é necessário remover separadores de milhar e ajustar pontos/vírgulas ao formatar valores monetários no Google Planilhas?"
    answer: "Porque separadores de milhar e uso inconsistente de pontos/vírgulas impedem que o Planilhas e o Looker Studio reconheçam os valores como números, o que quebra somas, médias e outros cálculos."
    hint: "Relembre os passos de localizar/substituir vírgula e ponto nas colunas Transaction Amount e Balance."
  - question: "Qual a diferença entre tratar `Balance` como média e `Transaction Amount` como soma no relatório de conta corrente?"
    answer: "`Balance` representa o saldo ao longo do tempo e faz mais sentido ser analisado via média (ou valores pontuais), enquanto `Transaction Amount` representa fluxos de dinheiro que devem ser somados para calcular o total movimentado."
    hint: "Veja a configuração de agregação padrão no Looker Studio."
  - question: "Por que `Transaction Number` deve ser configurado como texto no Looker Studio?"
    answer: "Porque é apenas um identificador de transação, não faz sentido somar ou tirar média desse campo; tratá-lo como número pode gerar agregações sem significado."
    hint: "Observe como os campos são configurados na tela de dados do Looker Studio."
review_after_days: [3, 10]
---

## Visão Geral do Conceito

Esta lição aprofunda o exemplo de **conta bancária** iniciado nas aulas anteriores. Em vez de apenas conectar os dados, o foco agora é **refinar o relatório**: limpar e formatar corretamente datas e valores no Google Planilhas, configurar tipos e agregações no Looker Studio e criar ajustes que tornem o dashboard mais confiável e legível.

Usaremos o arquivo `Chapter2-AccountData.csv` convertido para planilha Google e conectado ao Looker Studio. O objetivo é garantir que campos como `Date`, `Transaction Amount` e `Balance` estejam configurados de forma correta, para que scorecards, séries temporais e tabelas reflitam a realidade da conta corrente de forma robusta.

## Modelo Mental

Pense na preparação dos dados bancários como uma **receita em duas camadas**:

- **Camada 1 — Planilha (cozinha de dados)**
  - Garantir que datas sejam datas, moedas sejam moedas e identificadores sejam texto.
  - Ajustar símbolos, separadores e formatos para o padrão local (Brasil).

- **Camada 2 — Looker Studio (montagem do prato)**
  - Escolher tipos e agregações adequadas para cada campo.
  - Criar campos calculados (quando necessário) e usá-los em gráficos/tabelas.

Se a camada 1 não estiver bem resolvida, a camada 2 será sempre frágil. Refinar o relatório é, essencialmente, **garantir que as duas camadas conversem bem**.

## Mecânica Central

### 1. Limpeza e formatação de datas no Google Planilhas

Usando a planilha `Chapter2-AccountData`:

- Selecione a coluna `Date` (a partir de `B2` até o fim).
- Aplique:
  - **Formatar → Número → Texto simples**, se estiver convertendo de um formato estranho.
  - Em seguida, ajuste o alinhamento em **Formatar → Alinhamento → Esquerda**.
- Se necessário, converta para um formato de data reconhecido pelo Brasil, revisando:
  - Ordem dia/mês/ano.
  - Zeros à esquerda.

Essa padronização facilita o reconhecimento correto da dimensão de tempo tanto na planilha quanto no Looker Studio.

### 2. Tratando valores monetários (Transaction Amount e Balance)

Nas colunas `Transaction Amount` e `Balance`:

1. Selecione todos os valores de cada coluna (por exemplo, `D2:D…` e `E2:E…`).
2. Aplique o formato de moeda:
   - **Formatar → Número → Moeda** (verificando que está em Real Brasileiro).
3. Use **Editar → Localizar e substituir** com a seguinte sequência:
   - **Passo 1:** localizar vírgula `,` e substituir por **nada** (campo vazio), para remover separadores de milhar do formato americano.
   - **Passo 2:** localizar ponto `.` e substituir por vírgula `,`, para alinhar ao padrão brasileiro.

Essa ordem é importante: primeiro remove-se os separadores de milhar, depois ajusta-se o separador decimal. No final, verifique visualmente se:

- Os valores aparecem como moeda em R$.
- Não há valores “quebrados” (por exemplo, número grudado com símbolo estranho).

### 3. Configurando campos no Looker Studio

Com a planilha limpa, ao conectar ou editar a fonte de dados no Looker Studio:

- Para `Balance`:
  - Tipo: **Moeda → BRL - Real brasileiro (R$)**.
  - Agregação padrão: **Médio**.

- Para `Transaction Amount`:
  - Tipo: **Moeda → BRL - Real brasileiro (R$)**.
  - Agregação padrão: **Soma**.

- Para `Transaction Number`:
  - Tipo: **Texto**.
  - Agregação padrão: nenhuma (como dimensão).

Essas configurações garantem que:

- Scorecards de saldo médio e gráficos de série temporal usem `Balance` de forma coerente.
- Totais de movimentação financeira sejam calculados via `SUM(Transaction Amount)`.
- `Transaction Number` sirva apenas para identificação, sem induzir cálculos sem sentido.

### 4. Ajustando campos calculados e layout

Com os tipos configurados, você pode revisar:

- **Scorecards**:
  - `Saldo Médio`: usa `AVG(Balance)`.
  - `Saldo Máximo`: `MAX(Balance)`.
  - `Saldo Mínimo`: `MIN(Balance)`.

- **Série temporal**:
  - Dimensão: `Date` (ou ano/mês derivado).
  - Métrica: `AVG(Balance)` com nome de exibição “Saldo Médio”.

- **Tabela de transações**:
  - Dimensões: `Date`, `Description`, `Memo`.
  - Métricas: `Transaction Amount`, `Balance`.
  - Ordenações: por `Date` (decrescente) e/ou `Balance`.

Reveja também:

- Títulos de gráficos.
- Precisão decimal para valores monetários (por exemplo, 2 casas decimais).
- Alinhamento de colunas e uso de formatações condicionais, se necessário.

## Uso Prático

### Exemplo 1 — Verificando o efeito de formatação incorreta

Antes de limpar:

- `Transaction Amount` pode ser importado como texto (`$10,056.87`).
- No Looker Studio, tentar somar esse campo gera resultados incorretos ou falhas.

Depois da limpeza e formatação:

- O mesmo campo é reconhecido como número em R$.
- Scorecards e séries temporais mostram valores coerentes de movimentação.

### Exemplo 2 — Ajustando agregações erradas

Se `Balance` estiver com agregação padrão `Soma`:

- Scorecards e gráficos verão “saldo total” como soma de todos os saldos, o que não faz sentido.

Ao mudar para `Médio`:

- Scorecards passam a mostrar valores de saldo médio.
- A interpretação fica alinhada com a ideia de **nível de saldo** ao longo do tempo.

### Exemplo 3 — Tabela com ordenação útil

Uma tabela desordenada com muitas colunas é difícil de ler. Ao:

- Remover colunas irrelevantes para a análise.
- Manter apenas `Date`, `Description`, `Transaction Amount`, `Balance`.
- Ordenar por `Date` (decrescente).

A tabela passa a funcionar como um **extrato visual**: as transações mais recentes aparecem no topo, com seus impactos no saldo.

## Erros Comuns

- **Pular a etapa de limpeza na planilha**  
  Confiar que o Looker Studio “vai arrumar tudo sozinho” normalmente resulta em campos numéricos tratados como texto.

- **Configurar todas as métricas como soma**  
  Usar `SUM` indiscriminadamente para `Balance` e outros campos pode produzir gráficos enganadores.

- **Deixar identificadores como números agregáveis**  
  Tratar `Transaction Number` como número permite somas e médias sem sentido, poluindo o relatório.

- **Ignorar o padrão local de formatação**  
  Não ajustar pontos/vírgulas ao padrão brasileiro provoca relações erradas entre o que se vê na planilha e o que é calculado no Looker Studio.

## Visão Geral de Debugging

Quando o relatório de conta corrente apresentar valores estranhos:

1. **Volte à planilha**
   - Veja se datas e valores estão no formato esperado.
2. **Confirme tipos na fonte de dados**
   - Garanta que cada campo está com tipo e agregação esperados.
3. **Teste gráficos simples**
   - Monte uma tabela mínima para verificar se os números batem com a planilha.
4. **Reveja localizar/substituir**
   - Verifique se os passos de remoção de vírgulas e troca de pontos por vírgulas foram aplicados na ordem correta.

## Principais Pontos

- Refinar o relatório de conta bancária exige **limpeza cuidadosa** de datas e moedas na planilha.
- A configuração de **tipos e agregações** no Looker Studio é crucial para que scorecards e gráficos façam sentido.
- Alguns campos (como identificadores) devem ser tratados como **texto**, não como números.
- Pequenos detalhes de formatação podem ter impactos grandes na **confiabilidade do dashboard**.

## Preparação para Prática

Depois desta lição, você deve ser capaz de:

- Revisar e corrigir formatações problemáticas em datasets similares.
- Conferir se a fonte de dados do Looker Studio está coerente com a planilha.
- Ajustar/agregar métricas de acordo com o significado de cada campo.
- Tornar o relatório de conta corrente mais amigável para leitura e análise.

Se ainda restarem dúvidas, volte às seções de **Mecânica Central** e repita os passos na sua própria planilha.

## Laboratório de Prática

### Desafio Easy — Garantir formatação correta de datas e moedas

Objetivo: revisar e corrigir datas e valores monetários no dataset de conta corrente.

Enunciado:

- Na planilha `Chapter2-AccountData`, certifique-se de que:
  - `Date` está formatado como texto simples/alinhado à esquerda e depois convertido apropriadamente para data.
  - `Transaction Amount` e `Balance` estão formatados como moeda em R$, com separadores corretos.

Registre o que foi ajustado:

```markdown
<!-- TODO: resumo das correções de formatação
- Ajustes em Date:
- Ajustes em Transaction Amount:
- Ajustes em Balance:
-->
```

### Desafio Medium — Revisar configurações de campos no Looker Studio

Objetivo: garantir que a fonte de dados está correta para o relatório de conta corrente.

Enunciado:

- Abra a fonte de dados usada no relatório de conta corrente.
- Revise os campos `Date`, `Transaction Amount`, `Balance`, `Transaction Number`.
- Ajuste tipos e agregações conforme descrito na lição.
- Teste scorecards e a série temporal após os ajustes.

Use o bloco abaixo para anotar as configurações:

```markdown
<!-- TODO: configurações finais de campos
- Date: tipo, agregação
- Transaction Amount: tipo, agregação
- Balance: tipo, agregação
- Transaction Number: tipo, agregação
-->
```

### Desafio Hard — Melhorar a legibilidade do relatório de conta corrente

Objetivo: refinar o layout e as configurações do relatório para facilitar a leitura.

Enunciado:

- Ajuste:
  - Precisão decimal em scorecards e gráficos.
  - Ordenações em tabelas (por data ou saldo).
  - Títulos e rótulos de eixos.
- Opcional: adicione uma formatação condicional simples na tabela (por exemplo, destacar linhas com `Balance` muito baixo).

Descreva as melhorias aplicadas:

```markdown
<!-- TODO: melhorias de legibilidade aplicadas
- Ajustes de precisão:
- Ajustes de ordenação:
- Ajustes de títulos/legendas:
- Formatações condicionais:
-->
```

<!-- CONCEPT_EXTRACTION
concepts:
  - limpeza e formatação de dados bancários
  - configuração de tipos e agregações no Looker Studio
  - distinção entre campos métricos e identificadores
skills:
  - Corrigir formatação de datas e moedas em planilhas
  - Ajustar tipos e agregações de campos em fontes de dados do Looker Studio
  - Revisar e melhorar a legibilidade de dashboards existentes
examples:
  - bank-report-data-cleaning
  - bank-report-field-config
  - bank-report-layout-refinement
-->

<!-- EXERCISES_JSON
[
  {
    "id": "refinando-relatorio-conta-bancaria-easy",
    "slug": "refinando-relatorio-conta-bancaria-easy",
    "difficulty": "easy",
    "title": "Padronizar datas e moedas no dataset de conta corrente",
    "discipline": "visualizacao-sql",
    "editorLanguage": "sql",
    "tags": ["planilhas", "moeda", "data"],
    "summary": "Revisar e corrigir a formatação de datas e valores monetários no dataset de conta corrente."
  },
  {
    "id": "refinando-relatorio-conta-bancaria-medium",
    "slug": "refinando-relatorio-conta-bancaria-medium",
    "difficulty": "medium",
    "title": "Configurar corretamente campos bancários no Looker Studio",
    "discipline": "visualizacao-sql",
    "editorLanguage": "sql",
    "tags": ["looker-studio", "configuracao-campos"],
    "summary": "Ajustar tipos e agregações dos principais campos bancários na fonte de dados do Looker Studio."
  },
  {
    "id": "refinando-relatorio-conta-bancaria-hard",
    "slug": "refinando-relatorio-conta-bancaria-hard",
    "difficulty": "hard",
    "title": "Melhorar a legibilidade do relatório de conta corrente",
    "discipline": "visualizacao-sql",
    "editorLanguage": "sql",
    "tags": ["dashboards", "layout", "visualizacao-dados"],
    "summary": "Refinar ordenações, precisões e formatações para tornar o relatório de conta corrente mais fácil de ler e interpretar."
  }
]
-->

