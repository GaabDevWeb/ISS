---
title: "Dashboard de pizza e barras para tipos e categorias de transações no Looker Studio"
slug: "dashboard-pizza-barras-transacoes-looker"
discipline: "visualizacao-sql"
order: 8
description: "Usando gráficos de pizza e barras no Looker Studio para analisar tipos e categorias de transações em um extrato bancário."
reading_time: 30
difficulty: "medium"
concepts:
  - graficos-de-pizza
  - graficos-de-barras
  - dimensoes-e-metricas
  - agregacao-por-categoria
  - uso-de-campos-calculados-no-looker-studio
prerequisites:
  - dashboard-comparacao-anos-conta-bancaria-looker
learning_objectives:
  - "Construir um gráfico de pizza que mostra a proporção de valores entre tipos de transação (depósitos vs saques)."
  - "Construir um gráfico de barras que cruza categorias de gasto com tipos de transação, usando a mesma base de dados."
  - "Escolher dimensões e métricas adequadas para responder perguntas sobre o comportamento da conta bancária."
exercises:
  - question: "Por que é importante usar o valor absoluto (`Abs Amount`) em vez do valor original da transação quando se quer comparar o volume de movimentação em gráficos de pizza ou barras?"
    answer: "Porque o valor original inclui sinais positivos e negativos (depósitos e saques), e a soma direta pode se anular; o valor absoluto representa o volume movimentado independentemente do sentido, permitindo comparar o peso de cada tipo ou categoria de forma honesta."
    hint: "Pense em um mês com muitos saques e muitos depósitos de valores parecidos."
  - question: "Qual a diferença entre usar `Transaction Type` como dimensão principal e usá-lo como dimensão detalhada em um gráfico de barras?"
    answer: "Como dimensão principal, o gráfico mostra uma barra por tipo de transação; como dimensão detalhada, `Transaction Type` divide cada barra de outra dimensão (como `Category`) em segmentos, permitindo comparar a distribuição dentro de cada categoria."
    hint: "Observe quantas barras aparecem e como elas são segmentadas."
  - question: "Por que gráficos de pizza não são ideais para comparar muitos rótulos diferentes, como dezenas de categorias de gasto?"
    answer: "Porque muitos rótulos geram fatias muito finas, difíceis de ler e comparar visualmente; gráficos de barras lidam melhor com muitas categorias, pois cada barra tem o próprio eixo de comprimento."
    hint: "Compare a leitura de 2–3 fatias grandes com 15 fatias pequenas."
review_after_days:
  - 3
  - 10
---

## Visão Geral do Conceito

Esta lição continua o trabalho com o extrato bancário usado nas aulas anteriores, mas agora o foco é **entender a composição das transações** com a ajuda de **gráficos de pizza e barras** no Looker Studio.  
Em vez de apenas olhar para o saldo ao longo do tempo, queremos responder perguntas como: **“Quanto do volume movimentado é saque vs depósito?”** e **“Quais categorias consomem mais dinheiro?”**.

Usaremos o mesmo dataset de conta bancária (`Chapter2-AccountData.csv`), já limpo e configurado nas lições anteriores, para montar um dashboard com:

- Um **gráfico de pizza** comparando o volume de saques e depósitos.  
- Um **gráfico de barras** cruzando categorias de gasto com tipos de transação.

## Modelo Mental

O modelo mental aqui é enxergar o dashboard como uma **radiografia da composição do extrato**:

- O **gráfico de pizza** responde: “de tudo que movimentamos, qual parte é **saque** e qual parte é **depósito**?”.  
- O **gráfico de barras** responde: “dentro de cada **categoria de gasto**, quanto foi movimentado e como se divide entre saques e depósitos?”.

Você não está mais focado em “quando” aconteceu (tempo), mas em **“como” e “onde” o dinheiro foi movimentado**:

- **Dimensões**: `Transaction Type` (saque vs depósito), `Category` (Housing, Food & Dining, Insurance etc.).  
- **Métricas**: volume movimentado em valor absoluto (campo calculado como `Abs Amount`).

## Mecânica Central

### Campos chave para os gráficos

No Looker Studio (a partir da fonte de dados da conta bancária), você precisa dos seguintes campos:

- Dimensões:
  - <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`Transaction Type`</mark> — tipo da transação (por exemplo, `Withdrawal` e `Deposit`).  
  - <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`Category`</mark> — categoria da transação (Housing, Food & Dining, Insurance etc.).

- Métrica principal:
  - <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`Abs Amount`</mark> — valor absoluto do campo de valor da transação (normalmente derivado de `Transaction Amount`).

> **Regra:** para comparar “peso” de tipos e categorias, use sempre **valores absolutos**; caso contrário, depósitos e saques podem se anular.

### Gráfico de pizza — proporção de saques e depósitos

O gráfico de pizza tem:

- **Dimensão:** `Transaction Type`.  
- **Métrica:** `Abs Amount` (soma dos valores absolutos).

Ele responde:

- “Qual porcentagem do volume total movimentado é de saques?”  
- “Qual porcentagem é de depósitos?”

### Gráfico de barras — categorias x tipos de transação

O gráfico de barras empilhadas (ou agrupadas) tem:

- **Dimensão (eixo Y ou X)**: `Category`.  
- **Dimensão detalhada**: `Transaction Type` (para empilhar ou agrupar por tipo dentro de cada categoria).  
- **Métrica (eixo de valor)**: `Abs Amount`.

Ele responde:

- “Quais categorias concentram maior volume movimentado?”  
- “Dentro de cada categoria, o peso maior é de saques ou de depósitos?”

### Fluxo lógico do dashboard

O fluxo de construção desses gráficos pode ser visto assim:

```mermaid
flowchart TD
    A[Extrato bancário<br/>AccountData.csv] --> B[Conexão Looker Studio]
    B --> C[Gráfico de Pizza<br/>Dimensão: Transaction Type<br/>Métrica: SUM(Abs Amount)]
    B --> D[Gráfico de Barras empilhadas<br/>Dimensão: Category<br/>Detalhe: Transaction Type<br/>Métrica: SUM(Abs Amount)]
    C --> E[Insight 1:<br/>peso de saques vs depósitos]
    D --> F[Insight 2:<br/>categorias que mais consomem dinheiro]
```

O dashboard mostrado na aula segue exatamente essa lógica: primeiro uma visão geral simples (pizza) e, em seguida, um detalhamento por categoria (barras).

## Uso Prático

### 1. Construindo o gráfico de pizza

Partindo do relatório de conta corrente (por exemplo, “Conta corrente — exploração de dados 3.0”):

1. Entre no modo de **edição** (botão **Editar** no canto superior direito).  
2. Clique em **Adicionar um gráfico** e selecione **Pizza → Gráfico de pizza**.  
3. Posicione o gráfico **abaixo do cabeçalho**, do lado esquerdo, como visto na aula.  
4. Na guia de **Configuração**:
   - Em **Dimensão**, substitua `Transaction Number` por <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`Transaction Type`</mark>.  
   - Em **Métrica**, substitua `Record Count` por <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`Abs Amount`</mark> (arrastando o campo para o slot de métrica).

Com isso, cada fatia representará o **volume total** movimentado por tipo de transação, e não apenas a quantidade de linhas.

### 2. Ajustando a métrica para valor absoluto

Na aula, aparece o ajuste crucial:

- Inicialmente, o gráfico de pizza poderia estar usando:
  - `Record Count` — contando o número de transações.  
  - Ou o próprio `Transaction Amount` com sinal, o que pode distorcer a leitura.

Ao trocar para <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`Abs Amount`</mark>:

- Saques de −R$ 500,00 e depósitos de +R$ 500,00 deixam de se anular.  
- O gráfico passa a refletir que houve **R$ 1.000,00 de volume movimentado**, metade de cada tipo.

### 3. Construindo o gráfico de barras por categoria

Em seguida, você adiciona o gráfico de barras:

1. Ainda no modo de edição, clique em **Adicionar um gráfico** e escolha **Barras → Gráfico de barras**.  
2. Posicione-o **ao lado do gráfico de pizza**, ligeiramente abaixo.  
3. Na aba de **Configuração**:
   - Em **Dimensão (eixo Y ou X, dependendo da orientação)**, escolha <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`Category`</mark>.  
   - Em **Dimensão detalhada**, use <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`Transaction Type`</mark>.  
   - Em **Métrica (eixo de valor)**, use <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`Abs Amount`</mark>.

4. Ajuste:
   - A orientação (vertical/horizontal).  
   - O tamanho do gráfico.  
   - A largura da área de rótulos, arrastando até que os nomes de categoria fiquem **legíveis** (passo mostrado na aula).

O resultado é um gráfico que:

- Tem **uma barra por categoria** (Housing, Food & Dining, etc.).  
- Divide cada barra em segmentos (ou grupos) de `Withdrawal` e `Deposit`.  
- Mostra visualmente quais categorias concentram mais volume movimentado.

### 4. Ajustando rótulos e legibilidade

Para garantir que o dashboard fique utilizável:

- Passe o mouse sobre a borda onde aparecem os rótulos das categorias até o cursor virar uma **seta dupla** (esquerda/direita).  
- Arraste essa borda para a direita até que os nomes das categorias fiquem completos.  
- Revise:
  - Títulos dos gráficos (por exemplo, “Volume movido por tipo de transação” e “Volume movido por categoria e tipo”).  
  - Cores associadas a `Withdrawal` e `Deposit` (mantenha consistência entre pizza e barras).  
  - Eventuais limites de dados, se quiser focar apenas em um ano específico.

## Erros Comuns

- **Usar `Record Count` em vez de valor monetário**  
  - Problema: o gráfico mostra apenas quantas transações existem, não o quanto de dinheiro foi movimentado.  
  - Sintoma: uma categoria com muitas transações pequenas parece mais “pesada” que outra com poucas transações muito grandes.  
  - Correção: trocar a métrica para soma de `Abs Amount`.

- **Não usar valor absoluto**  
  - Problema: depósitos e saques se anulam na soma.  
  - Sintoma: gráficos que sugerem “pouco volume total” quando, na prática, houve muito dinheiro entrando e saindo.  
  - Correção: criar e usar um campo de valor absoluto (ex.: `Abs Amount`) como métrica.

- **Rótulos ilegíveis no gráfico de barras**  
  - Problema: categorias aparecem cortadas ou sobrepostas.  
  - Sintoma: é difícil entender qual barra corresponde a qual categoria.  
  - Correção: aumentar a área dos rótulos, reduzir o número de categorias mostradas ou filtrar para as principais.

- **Cores inconsistentes entre os gráficos**  
  - Problema: `Withdrawal` é azul claro no gráfico de pizza e azul escuro no de barras (ou vice-versa).  
  - Sintoma: confusão ao comparar rapidamente os gráficos.  
  - Correção: padronizar a paleta e salvar como tema, se possível.

## Visão Geral de Debugging

Quando os gráficos não parecem fazer sentido:

- **1. Verifique a métrica**  
  - Confirme se o gráfico está usando `Abs Amount` e não `Record Count` ou o valor original com sinal.  
  - Teste rapidamente trocando a métrica e observando o efeito.

- **2. Revise as dimensões**  
  - Garanta que `Transaction Type` e `Category` estão nos lugares certos (dimensão principal vs detalhada).  
  - Verifique se não há filtros inesperados escondendo tipos ou categorias.

- **3. Compare com uma tabela simples**  
  - Monte uma tabela com `Transaction Type`, `Category` e `Abs Amount`.  
  - Veja se os totais por tipo e por categoria batem com o que aparece na pizza e nas barras.

- **4. Cheque filtragem por período**  
  - Se o dashboard estiver filtrado para um ano ou intervalo de datas, confirme se isso está claro nos títulos e cabeçalhos.

## Principais Pontos

- Gráficos de pizza e barras ajudam a entender **a composição** do extrato, não só a sua evolução no tempo.  
- Usar **valor absoluto** (`Abs Amount`) é fundamental para representar corretamente o volume movimentado.  
- A escolha de **dimensão principal** e **dimensão detalhada** muda completamente a leitura de um gráfico de barras.  
- Legibilidade (rótulos, cores, tamanhos) é parte essencial de um dashboard útil.

## Preparação para Prática

Depois desta lição, você deve ser capaz de:

- Configurar gráficos de pizza e barras no Looker Studio usando dimensões e métricas adequadas.  
- Justificar quando faz sentido usar valor absoluto para métricas financeiras.  
- Ajustar rótulos e layout para que gráficos com muitas categorias continuem legíveis.  
- Validar os números dos gráficos comparando com tabelas de apoio.

No Laboratório de Prática, você irá:

- Traduzir os gráficos em consultas SQL que calculam os mesmos totais.  
- Explorar variações por categoria, tipo de transação e período.  
- Pensar em outras visualizações que poderiam complementar esse painel (por exemplo, um gráfico de barras por mês e categoria).

## Laboratório de Prática

### Easy — Volume total por tipo de transação

Suponha que você tenha uma tabela SQL chamada <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`account_transactions`</mark> com colunas:

- `transaction_type` (texto, por exemplo, 'Withdrawal' ou 'Deposit').  
- `transaction_amount` (valor numérico, com sinal).  

Escreva uma query que calcule o **volume total movimentado por tipo de transação**, usando o valor absoluto.

```sql
-- TODO: agrupar por tipo de transação
-- TODO: somar o valor absoluto do montante
SELECT
  transaction_type,
  SUM(ABS(transaction_amount)) AS total_volume
FROM account_transactions
GROUP BY
  transaction_type
ORDER BY
  total_volume DESC;
```

Use o resultado para alimentar um gráfico de pizza em qualquer ferramenta de visualização.

### Medium — Volume por categoria e tipo de transação

Agora, considere que a tabela também contém:

- `category` (texto, categoria da transação).  

Escreva uma query que calcule, para cada categoria, o volume total movimentado separado por tipo de transação.

```sql
-- TODO: agrupar por categoria e tipo
-- TODO: usar valor absoluto do montante
SELECT
  category,
  transaction_type,
  SUM(ABS(transaction_amount)) AS total_volume
FROM account_transactions
GROUP BY
  category,
  transaction_type
ORDER BY
  total_volume DESC;
```

Esse resultado pode ser usado para montar um gráfico de barras empilhadas: uma barra por categoria, com segmentos por tipo de transação.

### Hard — Top categorias por volume movimentado

Por fim, você quer criar uma visão focada apenas nas **categorias com maior volume movimentado**, independentemente de tipo.

Escreva uma query que:

1. Calcule o volume total (usando valor absoluto) por categoria.  
2. Retorne apenas as **5 categorias com maior volume**.

```sql
-- TODO: calcular volume por categoria usando ABS
-- TODO: limitar para as 5 maiores categorias
SELECT
  category,
  SUM(ABS(transaction_amount)) AS total_volume
FROM account_transactions
GROUP BY
  category
ORDER BY
  total_volume DESC
LIMIT 5;
```

Pense em como esse resultado poderia ser exibido:

- Em um gráfico de barras horizontal com as 5 categorias.  
- Em uma tabela-resumo destacando essas categorias e seus valores.

<!-- CONCEPT_EXTRACTION
concepts:
  - graficos de pizza para tipos de transacao
  - graficos de barras por categoria
  - uso de valor absoluto em metricas financeiras
  - dimensoes principal e detalhada em graficos
skills:
  - Configurar graficos de pizza e barras no Looker Studio para dados financeiros
  - Escolher entre contagem de registros e soma de valores conforme o objetivo
  - Criar consultas SQL que reproduzem totais usados em dashboards
  - Ajustar layout e rotulos para melhorar a legibilidade de graficos
examples:
  - pizza-withdrawal-deposit-abs-amount
  - barras-categoria-tipo-transacao-abs-amount
  - top-categorias-por-volume-movimentado
-->

<!-- EXERCISES_JSON
[
  {
    "id": "pizza-barras-transacoes-easy",
    "slug": "pizza-barras-transacoes-easy",
    "difficulty": "easy",
    "title": "Volume total por tipo de transação",
    "discipline": "visualizacao-sql",
    "editorLanguage": "sql",
    "tags": ["sql", "agregacao", "financeiro"],
    "summary": "Calcular o volume total movimentado por tipo de transação usando valor absoluto."
  },
  {
    "id": "pizza-barras-transacoes-medium",
    "slug": "pizza-barras-transacoes-medium",
    "difficulty": "medium",
    "title": "Volume por categoria e tipo de transação",
    "discipline": "visualizacao-sql",
    "editorLanguage": "sql",
    "tags": ["sql", "agregacao", "categorias", "dashboard"],
    "summary": "Escrever uma consulta SQL que calcula o volume por categoria e tipo de transação para alimentar um gráfico de barras empilhadas."
  },
  {
    "id": "pizza-barras-transacoes-hard",
    "slug": "pizza-barras-transacoes-hard",
    "difficulty": "hard",
    "title": "Top categorias por volume movimentado",
    "discipline": "visualizacao-sql",
    "editorLanguage": "sql",
    "tags": ["sql", "rankings", "financeiro"],
    "summary": "Produzir uma consulta SQL que retorna apenas as categorias com maior volume absoluto movimentado."
  }
]
-->

