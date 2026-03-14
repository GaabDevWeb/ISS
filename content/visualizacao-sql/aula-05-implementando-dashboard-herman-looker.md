---
title: "Implementando o dashboard da cafeteria Herman no Looker Studio"
slug: "implementando-dashboard-herman-looker"
discipline: "visualizacao-sql"
order: 5
description: "Passo a passo para importar o dataset DS-Coffee-Shop, conectar com o Looker Studio e montar o painel principal da cafeteria Herman."
reading_time: 45
difficulty: "medium"
concepts:
  - importação de dados no Google Planilhas
  - conexão Google Planilhas → Looker Studio
  - construção de scorecards, séries temporais e gráficos de barras
  - filtros e controles em dashboards
  - iteração prática sobre um dashboard já planejado
prerequisites:
  - "dashboard-cafeteria-herman"
  - "conta-bancaria-google-sheets-looker"
learning_objectives:
  - "Importar o dataset DS-Coffee-Shop para o Google Drive/Planilhas."
  - "Conectar a planilha ao Looker Studio usando o conector Google Planilhas."
  - "Configurar campos, tipos e agregações para o dataset da cafeteria Herman."
  - "Construir o painel principal planejado na aula anterior com scorecards, série temporal e gráficos de detalhes."
exercises:
  - question: "Por que é recomendado usar o Google Planilhas como intermediário entre o arquivo DS-Coffee-Shop e o Looker Studio?"
    answer: "Porque o Google Planilhas facilita organização, limpeza e ajustes finos de tipos/formatos, e se integra nativamente ao Looker Studio com o conector Google Planilhas."
    hint: "Compare com o fluxo em que o arquivo é lido direto do sistema operacional."
  - question: "Quais componentes principais compõem o painel principal da cafeteria Herman?"
    answer: "Scorecards de visão geral (receita, quantidade vendida), uma série temporal de receita e gráficos/tabelas detalhando vendas por produto e por categoria."
    hint: "Revise o layout planejado na aula anterior."
  - question: "O que acontece se um campo numérico for importado como texto no Looker Studio?"
    answer: "Ele não poderá ser somado ou agregado corretamente, prejudicando métricas e gráficos que dependem desse valor."
    hint: "Lembre do cuidado com tipos e agregações na conexão de dados."
review_after_days: [3, 7]
---

## Visão Geral do Conceito

Na aula anterior, você planejou o **dashboard da cafeteria Herman**: objetivo de negócio, perguntas, métricas, dimensões e layout. Nesta lição, você vai **tirar o plano do papel**: importar o dataset `DS-Coffee-Shop` para o Google Planilhas, conectá-lo ao Looker Studio e montar o painel principal passo a passo.

O foco aqui é a **execução técnica** usando as ferramentas do ecossistema Google: Google Drive, Google Planilhas e Looker Studio. Ao final, você terá um relatório funcional que o Herman poderia usar no dia a dia para acompanhar vendas e tomar decisões de estoque.

## Modelo Mental

Veja o fluxo desta implementação como um pipeline bem definido:

```mermaid
flowchart TD
    A[Arquivo DS-Coffee-Shop<br/>(.xlsx ou .csv)] --> B[Google Drive]
    B --> C[Google Planilhas<br/>planilha DS-Coffee-Shop]
    C --> D[Looker Studio<br/>fonte de dados Google Planilhas]
    D --> E[Dashboard Herman<br/>painel principal]
```

Em cada etapa você faz algo específico:

- **A → B**: enviar o arquivo para a nuvem.
- **B → C**: abrir/convertê-lo em planilha e organizar as colunas.
- **C → D**: configurar os campos corretamente (tipos e agregações) ao criar a fonte de dados.
- **D → E**: colocar os gráficos no lugar certo, seguindo o layout pensado na aula anterior.

Com esse modelo na cabeça, fica mais fácil depurar erros (se algo der errado, você sabe em qual etapa olhar).

## Mecânica Central

### 1. Importando o dataset DS-Coffee-Shop para o Google Planilhas

1. Acesse `https://drive.google.com` com sua conta acadêmica.
2. Crie (se ainda não existir) uma pasta para a disciplina, por exemplo:  
   `Visualizacao-SQL` → `Herman-Coffee-Shop`.
3. Envie o arquivo `DS-Coffee-Shop.xlsx` ou `DS-Coffee-Shop.csv` para essa pasta.
4. Clique duas vezes no arquivo:
   - Se for `.xlsx`, o Google já oferece abrir em **Planilhas Google**.
   - Se for `.csv`, use **Abrir com → Planilhas Google**.

Verifique na planilha:

- Cabeçalhos na primeira linha (`date`, `product_name`, `category`, `quantity`, `unit_price`, `total_revenue`, etc.).
- Colunas de datas reconhecidas como data.
- Colunas numéricas (`quantity`, `unit_price`, `total_revenue`) reconhecidas como número/moeda (ajuste via **Formatar → Número** se necessário).

### 2. Criando a planilha de trabalho da cafeteria

Para manter tudo organizado:

1. Se desejar, renomeie a planilha para algo como:  
   `DS-Coffee-Shop (Herman)`.
2. Crie uma nova aba chamada `dashboard_support` (opcional) para:
   - Criar colunas auxiliares, se precisar (por exemplo, mês/ano a partir de `date`).
   - Documentar brevemente o significado de cada coluna.

Exemplo de fórmula para extrair mês/ano:

```plaintext
=TEXT(A2; "yyyy-MM")
```

Onde `A2` é a célula de data; ajuste para o formato correto do seu idioma/local.

### 3. Conectando a planilha ao Looker Studio

No Looker Studio:

1. Vá para `https://lookerstudio.google.com`.
2. Clique em **Relatório em branco**.
3. Na janela **Adicionar dados ao relatório**:
   - Escolha o conector **Google Planilhas**.
   - Em seguida, em **Todos os itens**, selecione a planilha `DS-Coffee-Shop (Herman)`.
   - Escolha a aba apropriada (por exemplo, a aba original ou `dashboard_support`).
4. Confirme em **Adicionar ao relatório**.

Na tela de configuração de campos (fonte de dados):

- Ajuste **tipos e agregações**, por exemplo:
  - `date`:
    - Tipo: Data ou Data e hora.
    - Agregação padrão: nenhuma (é dimensão).
  - `product_name` e `category`:
    - Tipo: Texto.
  - `quantity`:
    - Tipo: Número.
    - Agregação padrão: Soma.
  - `unit_price`:
    - Tipo: Número ou Moeda.
    - Agregação padrão: Média (ou nenhuma, conforme necessidade).
  - `total_revenue`:
    - Tipo: Moeda (idealmente BRL).
    - Agregação padrão: Soma.

Esses detalhes garantem que as métricas funcionem corretamente em gráficos e scorecards.

### 4. Construindo o painel principal de Herman

Com a fonte de dados configurada:

1. **Cabeçalho**
   - Insira uma forma retangular no topo.
   - Adicione um texto como “Herman Cake & Coffee Shop — Visão Geral de Vendas”.
   - Opcional: insira uma imagem de logo.
   - Adicione um **controle de período** vinculado ao campo `date` com um intervalo padrão (por exemplo, último mês).

2. **Scorecards de visão geral**
   - Scorecard 1: `Receita total`
     - Métrica: `SUM(total_revenue)`.
   - Scorecard 2: `Quantidade total vendida`
     - Métrica: `SUM(quantity)`.
   - Scorecard 3 (opcional): `Número de produtos distintos`
     - Métrica: `COUNT_DISTINCT(product_name)`.

3. **Série temporal de receita**
   - Adicione um **gráfico de série temporal**:
     - Dimensão: `date` ou um campo derivado `month_year`.
     - Métrica: `SUM(total_revenue)`.
     - Ordene pela dimensão de data.

4. **Gráfico de barras por produto/categoria**
   - Gráfico de barras 1: `Top produtos por receita`
     - Dimensão: `product_name`.
     - Métrica: `SUM(total_revenue)`.
     - Limite para Top N (por exemplo, 10).
   - Gráfico de barras 2: `Receita por categoria`
     - Dimensão: `category`.
     - Métrica: `SUM(total_revenue)`.

5. **Tabela detalhada**
   - Campos sugeridos:
     - Dimensões: `product_name`, `category`, possivelmente `date`.
     - Métricas: `quantity`, `total_revenue`.
   - Ordene por `total_revenue` (decrescente) ou por `date` dependendo do foco.

### 5. Adicionando filtros e controles

Para tornar o painel explorável:

- Adicione um **controle de lista suspensa** para `category`.
- Adicione um controle de pesquisa/lista para `product_name`.
- Configure para que todos os gráficos da página respondam a esses controles (comportamento padrão, a menos que você o altere).

Esses filtros permitem que o Herman:

- Foque em uma categoria específica (por exemplo, apenas bebidas).
- Investigue produtos individuais.

## Uso Prático

### Exemplo 1 — Verificando se a fonte de dados está correta

Depois de conectar a planilha:

- Abra a aba de **Dados** no Looker Studio.
- Clique em alguns campos e verifique:
  - Se `total_revenue` está com ícone de moeda.
  - Se `quantity` está como número.
  - Se `date` é reconhecido como data.

Crie rapidamente uma tabela simples (`date`, `product_name`, `total_revenue`) para checar se os valores parecem coerentes com o que você vê na planilha.

### Exemplo 2 — Testando o controle de período

Com o controle de período no cabeçalho:

- Ajuste o intervalo de datas para:
  - Apenas um mês.
  - Vários meses.
- Observe se:
  - A série temporal se adapta.
  - Scorecards mudam.
  - Tabelas e barras se ajustam automaticamente.

Se algum gráfico não responder, verifique se ele está configurado para usar a mesma dimensão de data da fonte.

### Exemplo 3 — Explorando produtos top e cauda longa

Use o gráfico de barras de produtos:

- Ordene por `SUM(total_revenue)` (decrescente).
- Observe os 5–10 produtos mais fortes.
- Use a tabela detalhada para olhar produtos na “cauda longa” (baixa receita).

Isso prepara o Herman para decisões como:

- Investir em promoções dos produtos mais rentáveis.
- Reavaliar produtos de baixa performance.

## Erros Comuns

- **Não conferir tipos de dados na planilha antes de conectar**  
  Isso leva a campos importados como texto e métricas quebradas.

- **Esquecer de definir agregações padrão**  
  `SUM` e `AVG` incorretos (ou ausentes) tornam scorecards e gráficos enganadores.

- **Lotar o painel com muitos gráficos sem testar filtros**  
  Sem testar a interação entre controles e gráficos, o painel pode ficar confuso e difícil de usar.

- **Ignorar o desempenho**  
  Embora o dataset da cafeteria seja pequeno, em cenários maiores, múltiplos gráficos pesados na mesma página podem prejudicar o tempo de carregamento.

## Visão Geral de Debugging

Quando algo não funciona no dashboard da cafeteria:

1. **Planilha primeiro**
   - Abra o `DS-Coffee-Shop (Herman)` e verifique se os dados estão corretos e completos.
2. **Fonte de dados no Looker Studio**
   - Revise tipos e agregações.
3. **Gráfico específico**
   - Verifique se a dimensão e a métrica estão corretas.
   - Teste com um filtro de período amplo (por exemplo, “todos os dados”) para descartar filtros muito restritivos.
4. **Controles/filtros**
   - Veja se o gráfico está incluído no escopo dos controles de filtro.

## Principais Pontos

- A implementação do dashboard de Herman segue um pipeline claro: arquivo → Drive → Planilhas → Looker Studio → painel.
- Configurar corretamente tipos e agregações na fonte de dados é tão importante quanto desenhar o layout.
- O painel principal combina **scorecards, série temporal, barras e tabelas** para responder às perguntas centrais do negócio.
- Filtros bem escolhidos (período, categoria, produto) transformam o painel em uma ferramenta de exploração, não apenas um relatório estático.

## Preparação para Prática

Depois desta lição, você deve ser capaz de:

- Configurar uma fonte de dados no Looker Studio a partir de uma planilha Google.
- Reproduzir, do zero, o painel principal da cafeteria Herman.
- Ajustar e depurar campos problemáticos (tipos e agregações).
- Validar se o dashboard responde corretamente a filtros e períodos.

Se ainda estiver inseguro, repita o processo com um novo relatório, até que os passos se tornem naturais.

## Laboratório de Prática

### Desafio Easy — Conectar o DS-Coffee-Shop ao Looker Studio

Objetivo: garantir que a conexão de dados está correta.

Enunciado:

- Importe o arquivo `DS-Coffee-Shop` para o Google Planilhas.
- Crie um relatório em branco no Looker Studio e conecte a planilha via conector Google Planilhas.
- Monte uma tabela simples com `date`, `product_name`, `category`, `quantity`, `total_revenue` e confira se os valores batem com a planilha.

Use o bloco abaixo apenas como checklist:

```markdown
<!-- TODO: checklist de conexão DS-Coffee-Shop
- Arquivo importado para o Drive:
- Planilha criada/aberta:
- Fonte de dados criada no Looker Studio:
- Tabela de validação criada:
-->
```

### Desafio Medium — Montar o painel principal de Herman

Objetivo: implementar o layout planejado na aula anterior.

Enunciado:

- No mesmo relatório, construa:
  - Cabeçalho com título e controle de período.
  - Três scorecards principais (receita total, quantidade total, produtos distintos).
  - Série temporal de receita.
  - Gráfico de barras para top produtos por receita.
  - Gráfico de barras ou pizza por categoria.
  - Tabela detalhada de vendas.

No editor do ISS, você pode documentar o que foi implementado:

```markdown
<!-- TODO: descrição dos componentes do painel principal
- Scorecards:
- Série temporal:
- Gráficos de barras:
- Tabela:
-->
```

### Desafio Hard — Refinar filtros e interação do dashboard

Objetivo: melhorar a usabilidade do painel para o Herman.

Enunciado:

- Adicione e configure:
  - Controle de período com intervalo padrão relevante (por exemplo, último mês).
  - Filtro de `category`.
  - Filtro de `product_name` com pesquisa habilitada.
- Teste combinações de filtros (por exemplo, uma categoria específica em um determinado período) e ajuste gráficos/tabelas para manter a legibilidade (limite de linhas, ordenação, etc.).

Registre suas decisões de design:

```markdown
<!-- TODO: decisões de filtros e interação
- Filtros adicionados:
- Comportamento esperado ao combiná-los:
- Ajustes feitos em gráficos para manter legibilidade:
-->
```

<!-- CONCEPT_EXTRACTION
concepts:
  - pipeline de dados Drive → Planilhas → Looker Studio
  - configuração de fontes de dados e campos
  - implementação prática de um layout de dashboard
skills:
  - Importar datasets para Google Planilhas e conectá-los ao Looker Studio
  - Construir scorecards, séries temporais, barras e tabelas a partir de um dataset real
  - Configurar filtros e controles de período em dashboards
examples:
  - herman-dashboard-main-implementation
  - herman-dashboard-filters-implementation
-->

<!-- EXERCISES_JSON
[
  {
    "id": "implementando-dashboard-herman-easy",
    "slug": "implementando-dashboard-herman-easy",
    "difficulty": "easy",
    "title": "Conectar o dataset DS-Coffee-Shop ao Looker Studio",
    "discipline": "visualizacao-sql",
    "editorLanguage": "sql",
    "tags": ["looker-studio", "google-planilhas", "conexao-dados"],
    "summary": "Importar o dataset DS-Coffee-Shop para o Google Planilhas e conectá-lo a um relatório em branco no Looker Studio."
  },
  {
    "id": "implementando-dashboard-herman-medium",
    "slug": "implementando-dashboard-herman-medium",
    "difficulty": "medium",
    "title": "Construir o painel principal da cafeteria Herman",
    "discipline": "visualizacao-sql",
    "editorLanguage": "sql",
    "tags": ["looker-studio", "dashboards", "visualizacao-dados"],
    "summary": "Implementar o painel principal da cafeteria Herman com scorecards, série temporal, barras e tabela de detalhes."
  },
  {
    "id": "implementando-dashboard-herman-hard",
    "slug": "implementando-dashboard-herman-hard",
    "difficulty": "hard",
    "title": "Refinar filtros e interação do dashboard da cafeteria",
    "discipline": "visualizacao-sql",
    "editorLanguage": "sql",
    "tags": ["looker-studio", "filtros", "ux-dashboard"],
    "summary": "Configurar e testar filtros de período, categoria e produto, melhorando a usabilidade do dashboard para exploração."
  }
]
-->

