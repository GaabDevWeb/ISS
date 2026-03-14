---
title: "Entendendo arquivos CSV e dados de produtos"
slug: "estrutura-csv-e-dados-produtos"
discipline: "visualizacao-sql"
order: 3
description: "Como estruturar dados em arquivos CSV, conferir colunas em planilhas e preparar uma base de produtos para usar em dashboards no Looker Studio."
reading_time: 35
difficulty: "easy"
concepts:
  - estrutura de arquivos CSV
  - cabeçalhos e colunas
  - importação de CSV em planilhas
  - validação de dados antes da visualização
  - relação entre linhas de detalhe e métricas agregadas
prerequisites:
  - "visualizar-dados-csv-looker-studio"
learning_objectives:
  - "Reconhecer a estrutura básica de um arquivo CSV com cabeçalhos e linhas de dados."
  - "Criar e editar um CSV simples a partir de um conteúdo de texto."
  - "Importar um CSV em Excel ou Google Planilhas para visualizar colunas e linhas corretamente."
  - "Identificar quais colunas podem virar dimensões e quais podem virar métricas em um dashboard."
exercises:
  - question: "Qual é a função da primeira linha em um arquivo CSV bem formado?"
    answer: "Ela contém os cabeçalhos (nomes das colunas), que serão usados por planilhas, bancos de dados e ferramentas de BI para identificar cada campo."
    hint: "Relembre o exemplo com `Product Name`, `Description`, `Flavor`, `Product Type` e `Number Sold`."
  - question: "Por que arquivos CSV são tão usados para integrar dados entre sistemas e ferramentas de visualização?"
    answer: "Porque são arquivos de texto leves, simples de gerar e ler, e praticamente todas as ferramentas de planilha, bancos de dados e BI conseguem importá-los."
    hint: "Pense na explicação sobre CSV como um dos formatos 'universais' de dados."
  - question: "Como você decide se uma coluna deve ser usada como métrica ou como dimensão em um dashboard?"
    answer: "Colunas numéricas que fazem sentido ser somadas, contadas ou agregadas viram métricas; colunas que categorizam ou descrevem os registros (nome do produto, tipo, sabor) viram dimensões."
    hint: "Olhe para `Number Sold` versus `Product Name` e `Product Type`."
review_after_days: [2, 7]
---

## Visão Geral do Conceito

Antes de montar dashboards no Looker Studio, você precisa de **dados bem estruturados**. Nesta lição, o foco é entender como arquivos <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`CSV`</mark> organizam informações em colunas e linhas, usando o exemplo de uma tabela de produtos (`Product Name`, `Description`, `Flavor`, `Product Type`, `Number Sold`).

Você vai ver como criar um CSV a partir de um conteúdo de texto, abrir esse arquivo em um editor simples (como o bloco de notas) e importá-lo para uma planilha (Excel ou Google Planilhas) para enxergar os dados em forma tabular. A partir daí, já é possível pensar em **dimensões** e **métricas** que serão usadas em relatórios futuros.

O objetivo é ganhar segurança em olhar para arquivos de dados e responder: **quais colunas existem?**, **o que cada uma significa?** e **como elas podem virar gráficos úteis depois?**

## Modelo Mental

Pense em um arquivo CSV como uma **tabela salva em texto**:

- Cada **linha** representa um registro (por exemplo, um produto).
- Cada **vírgula** (ou ponto e vírgula) separa **colunas**.
- A **primeira linha** contém os **cabeçalhos** — os nomes das colunas.

No exemplo da aula, temos algo como:

- `Product Name` — nome comercial do produto (ex.: "Vanilla Sponge Cake").
- `Description` — descrição mais longa.
- `Flavor` — sabor (ex.: "Vanilla", "Chocolate").
- `Product Type` — tipo de produto (bolo, biscoito, etc.).
- `Number Sold` — quantidade vendida.

O CSV é só um **meio de transporte**: para analisar de verdade, você vai quase sempre:

1. Conferir e ajustar o arquivo em um editor de texto simples.
2. Carregar o arquivo em uma planilha para enxergar as colunas e linhas.
3. Depois, conectar essa planilha ou o próprio CSV a uma ferramenta de BI, como o Looker Studio.

## Mecânica Central

### 1. Estrutura básica de um CSV

Um CSV típico de produtos poderia ter um trecho aproximado assim:

```text
Product Name,Description,Flavor,Product Type,Number Sold
Vanilla Sponge Cake,"Light vanilla sponge cake",Vanilla,Cake,120
Double Chocolate Brownie,"Rich chocolate brownie",Chocolate,Brownie,85
Lemon Tart,"Tart with fresh lemon filling",Lemon,Tart,64
```

Regras importantes:

- A **primeira linha** define os **cabeçalhos**.
- Cada coluna é separada por uma **vírgula** (ou, em alguns casos, ponto e vírgula).
- Valores de texto que contêm vírgulas internas podem aparecer entre aspas (`"..."`).

Se você abrir esse arquivo num editor de texto como o bloco de notas, tudo aparece em uma linha longa com vírgulas; ao importar na planilha, cada vírgula vira uma **coluna**.

### 2. Criando um CSV a partir de um conteúdo de texto

Na aula, o professor mostra um fluxo comum em ambientes de estudo:

1. Você recebe um **link** que aponta para o conteúdo bruto de um CSV (por exemplo, `C1_ExampleCSV.csv`).
2. Abre o link no navegador e seleciona todo o conteúdo.
3. Cria um novo arquivo no sistema operacional:
   - `Novo → Documento de texto`.
4. Renomeia o arquivo para o nome indicado (por exemplo, `C1_ExampleCSV.csv`), garantindo que a **extensão** seja realmente `.csv` — não `.txt`.
5. Abre o arquivo com um editor simples (bloco de notas) e cola o conteúdo copiado do navegador.
6. Salva o arquivo.

Para garantir que você está vendo a extensão no Windows, é importante desativar a opção que **oculta extensões de arquivos conhecidos**, como foi demonstrado na aula.

### 3. Visualizando o CSV em planilhas

Ver o CSV em texto ajuda a entender a estrutura, mas é mais fácil enxergar colunas em uma planilha. Existem duas abordagens comuns:

- **Excel**:
  - Abrir o Excel.
  - Usar a aba <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`Dados`</mark> → **Obter dados de arquivo de texto/CSV**.
  - Selecionar o arquivo `C1_ExampleCSV.csv`.
  - Confirmar o carregamento para ver cada coluna em sua própria célula.

- **Google Planilhas**:
  - Criar uma planilha em branco.
  - Usar **Arquivo → Importar** ou **Dados → Importar** (dependendo da interface) para carregar o CSV.
  - Conferir se cada coluna está no lugar certo (`Product Name`, `Description`, `Flavor`, `Product Type`, `Number Sold`).

Depois disso, você passa a enxergar claramente:

- Cabeçalhos na primeira linha.
- Registros nas linhas seguintes.
- Tipos de valores (texto vs números).

### 4. Dimensões e métricas no contexto do CSV

Mesmo sem abrir o Looker Studio ainda, você já pode decidir como esse conjunto de dados será usado em um dashboard:

- **Dimensões** (descrevem, categorizam):
  - `Product Name`
  - `Flavor`
  - `Product Type`
- **Métricas** (agregam, somam, contam):
  - `Number Sold` — pode ser somado para obter o total de vendas por produto, sabor, tipo, etc.

Esse mapeamento é fundamental quando você começar a montar gráficos:

- Gráfico de barras por `Product Type` usando `SUM(Number Sold)`.
- Gráfico de pizza por `Flavor` usando `SUM(Number Sold)`.
- Tabela detalhada com `Product Name`, `Description`, `Number Sold`.

## Uso Prático

### Exemplo 1 — Criando e conferindo um CSV de produtos

Passo a passo baseado na aula:

1. Receba o link para o conteúdo de `C1_ExampleCSV.csv`.
2. Copie todo o conteúdo no navegador.
3. Crie um arquivo `C1_ExampleCSV.csv` no seu sistema (garantindo que a extensão é `.csv`).
4. Abra o arquivo no bloco de notas e cole o conteúdo.
5. Salve o arquivo.
6. Importe o arquivo em Excel ou Google Planilhas.

Perguntas para se fazer ao olhar a planilha:

- Os cabeçalhos estão na **linha 1**?
- Cada coluna contém apenas um tipo de informação?
- `Number Sold` está claramente numérico (sem símbolos estranhos)?

### Exemplo 2 — Identificando métricas e dimensões

Com a planilha aberta:

- Marque mentalmente (ou em um caderno):
  - Dimensões: nomes, sabores, tipos.
  - Métrica principal: `Number Sold`.

Isso já permite pensar em perguntas de negócio simples:

- Qual tipo de produto vende mais?
- Qual sabor é mais popular?
- Quais produtos têm vendas muito baixas e talvez precisem de revisão?

### Exemplo 3 — Conectando com o pensamento de BI

Mesmo sem entrar no Looker Studio ainda, esse CSV de produtos ilustra duas ideias centrais em BI:

- **Linhas de detalhe** — cada produto (ou cada combinação de atributos) em uma linha.
- **Agregações** — somar, contar ou calcular estatísticas sobre uma coluna numérica.

Ao construir dashboards mais complexos (com Looker, Power BI ou outra ferramenta), você sempre volta a esse modelo mental:

- TSV/CSV/planilha → tabelas de base.
- Dimensões (categorias) + métricas (números) → gráficos e indicadores.

## Erros Comuns

- **Esquecer cabeçalhos na primeira linha**  
  Colar dados sem uma linha de cabeçalho faz com que planilhas e ferramentas de BI tratem a primeira linha como dado, dificultando a configuração posterior.

- **Salvar como `.txt` achando que é `.csv`**  
  Manter a extensão errada pode atrapalhar importações automáticas; muitas ferramentas esperam explicitamente `.csv`.

- **Misturar formatos na mesma coluna**  
  Colocar texto em uma coluna que deveria ser numérica (como `Number Sold`) impede agregações e gráficos corretos.

- **Não verificar colunas após a importação**  
  Assumir que o Excel ou o Google Planilhas “entendeu tudo” pode esconder problemas, como colunas deslocadas ou quebras de linha internas incorretas.

## Visão Geral de Debugging

Quando um CSV não se comportar como esperado ao importar:

1. **Abra no editor de texto**  
   - Confira se a primeira linha tem todos os cabeçalhos.
   - Verifique se cada linha tem o mesmo número de vírgulas.
2. **Cheque separadores**  
   - Se o arquivo usa ponto e vírgula em vez de vírgula, ajuste a opção de importação na planilha ou converta o arquivo.
3. **Procure por caracteres estranhos**  
   - Valores com quebras de linha internas ou aspas não fechadas podem quebrar o parse.
4. **Valide tipos de colunas na planilha**  
   - Veja se colunas numéricas realmente foram reconhecidas como números.
5. **Faça um pequeno subconjunto**  
   - Se o arquivo é grande, teste com poucas linhas primeiro, garantindo que o formato está correto antes de aplicar à versão completa.

## Principais Pontos

- Um **CSV bem formado** começa com cabeçalhos e mantém um padrão de separação em todas as linhas.
- Importar o CSV para uma **planilha** é a maneira mais rápida de conferir a estrutura real dos dados.
- Entender desde cedo quem é **dimensão** e quem é **métrica** facilita a construção de dashboards depois.
- Pequenos erros de formato (extensão, separadores, tipos mistos) geram grandes dores de cabeça em ferramentas de BI.
- Revisar dados **antes** de criar visualizações é parte essencial do trabalho em visualização de dados e SQL.

## Preparação para Prática

Depois desta lição, você deve ser capaz de:

- Criar um CSV simples a partir de conteúdo de texto e salvá-lo com a extensão correta.
- Importar o arquivo em Excel ou Google Planilhas e verificar sua estrutura.
- Distinguir colunas que serão dimensões de colunas que serão métricas.
- Identificar problemas básicos de formato que atrapalhariam a construção de dashboards.

Se ainda houver dúvidas, revise a parte de importação e o exemplo de planilha de produtos antes de seguir para dashboards mais avançados.

## Laboratório de Prática

### Desafio Easy — Construir seu primeiro CSV de produtos

Objetivo: montar manualmente um arquivo CSV simples e conferi-lo em uma planilha.

Enunciado:

- Crie um arquivo `meus_produtos.csv` com as colunas:
  - `Product Name`, `Flavor`, `Product Type`, `Number Sold`.
- Inclua pelo menos 5 produtos reais ou fictícios.
- Salve o arquivo com a extensão `.csv`.
- Importe o arquivo em Excel ou Google Planilhas e verifique se cada coluna está correta.

Use este esqueleto como referência para o conteúdo do arquivo:

```text
Product Name,Flavor,Product Type,Number Sold
TODO_Preencher,TODO_Preencher,TODO_Preencher,TODO_Preencher
```

Atualize as linhas `TODO_Preencher` com dados reais antes de importar.

### Desafio Medium — Marcar dimensões e métricas na planilha

Objetivo: identificar explicitamente dimensões e métricas no conjunto de produtos.

Enunciado:

- Na planilha onde o CSV foi importado:
  - Crie uma nova aba chamada `metadata`.
  - Nessa aba, crie uma mini tabela listando cada coluna (`Product Name`, `Flavor`, `Product Type`, `Number Sold`) e marque se ela é **Dimensão** ou **Métrica**.
- Use essa tabela para planejar pelo menos dois gráficos que você faria em um futuro dashboard (por exemplo, vendas por tipo de produto, vendas por sabor).

No editor do ISS, você pode registrar esse planejamento assim:

```markdown
<!-- TODO: registrar decisões de métricas e dimensões
- Dimensões: Product Name, Flavor, Product Type
- Métrica: Number Sold
- Gráficos planejados:
  - Barras: SUM(Number Sold) por Product Type
  - Pizza: SUM(Number Sold) por Flavor
-->
```

### Desafio Hard — Criar um CSV a partir de outro formato

Objetivo: praticar a transformação de dados de um formato qualquer para CSV.

Enunciado:

- Imagine que você recebeu uma lista de produtos em formato diferente (por exemplo, colada de um documento de texto, de um PDF simples ou de um e-mail).
- Transforme essa lista em um CSV bem formado com:
  - Cabeçalhos na primeira linha.
  - Colunas coerentes (nome, tipo, categoria, vendas estimadas).
- Valide o resultado importando o arquivo na planilha e construindo uma tabela ordenada por `Number Sold`.

Use o bloco abaixo como espaço para documentar quais decisões você tomou ao transformar o formato original em CSV:

```markdown
<!-- TODO: documentar transformação para CSV
- Fonte original dos dados:
- Passos para separar colunas:
- Regras usadas para limpar valores:
- Problemas encontrados e como foram resolvidos:
-->
```

<!-- CONCEPT_EXTRACTION
concepts:
  - estrutura e semântica de arquivos CSV
  - relação entre cabeçalhos, colunas e registros
  - identificação de métricas e dimensões em dados tabulares
skills:
  - Criar e salvar arquivos CSV a partir de conteúdo de texto
  - Importar CSVs em planilhas para inspecionar colunas e linhas
  - Classificar colunas como dimensões ou métricas para uso futuro em dashboards
examples:
  - produtos-csv-criacao-manual
  - produtos-csv-importacao-planilha
  - produtos-csv-metricas-dimensoes
-->

<!-- EXERCISES_JSON
[
  {
    "id": "estrutura-csv-dados-produtos-easy",
    "slug": "estrutura-csv-dados-produtos-easy",
    "difficulty": "easy",
    "title": "Criar um CSV simples de produtos",
    "discipline": "visualizacao-sql",
    "editorLanguage": "sql",
    "tags": ["csv", "planilhas", "preparacao-dados"],
    "summary": "Construir manualmente um arquivo CSV de produtos e importá-lo em uma planilha para verificar sua estrutura."
  },
  {
    "id": "estrutura-csv-dados-produtos-medium",
    "slug": "estrutura-csv-dados-produtos-medium",
    "difficulty": "medium",
    "title": "Definir dimensões e métricas em um dataset de produtos",
    "discipline": "visualizacao-sql",
    "editorLanguage": "sql",
    "tags": ["csv", "metricas", "dimensoes"],
    "summary": "Analisar um CSV de produtos para classificar colunas como dimensões ou métricas e planejar gráficos de dashboard."
  },
  {
    "id": "estrutura-csv-dados-produtos-hard",
    "slug": "estrutura-csv-dados-produtos-hard",
    "difficulty": "hard",
    "title": "Transformar dados brutos em CSV utilizável",
    "discipline": "visualizacao-sql",
    "editorLanguage": "sql",
    "tags": ["preparacao-dados", "csv", "limpeza-dados"],
    "summary": "Converter dados de um formato qualquer para um CSV bem formado, pronto para importação em planilhas e dashboards."
  }
]
-->

