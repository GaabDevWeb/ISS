---
title: "Google Planilhas, métricas e dimensões no Looker Studio"
slug: "google-planilhas-metricas-dimensoes"
discipline: "visualizacao-sql"
order: 4
description: "Conectar Google Planilhas ao Looker, definir dimensão e métrica, gráfico de pizza e Scorecard (Etapa 2)."
exercises:
  - question: "Qual a diferença entre dimensão e métrica no Looker Studio?"
    answer: "Dimensão: categorias ou itens pelos quais você segmenta os dados (ex.: Product Name, Product Type, região). Métrica: números que você avalia, normalmente agregados (contagem, soma, média) sobre ou através das dimensões; não se agrupa pela métrica."
    hint: "Dimensão = por quê? Métrica = o quê (número)?"
  - question: "Para o relatório da Hermann's (DS - Coffee Shop), qual conector usar no Looker e qual métrica substituir no lugar de Record Count?"
    answer: "Conector: Google Planilhas. Selecionar a planilha 'DS - Coffee Shop' (importada do arquivo DS-Coffee Shop.xlsx). Na tabela, trocar a métrica Record Count por Number Sold (número de vendas)."
    hint: "Etapa 2 = Planilhas; métrica de vendas."
  - question: "Cite duas agregações comuns de métricas no Looker (e no Excel/BI)."
    answer: "Count (contagem de ocorrências), Sum (soma), Avg ou Average (média). Outras: Max, Min. A agregação define como o Looker calcula a métrica (ex.: soma de vendas por região)."
    hint: "Contar, somar, média."
  - question: "No gráfico de pizza do Coffee Shop: dimensão Product Name e métrica Number Sold. O que cada um representa?"
    answer: "Dimensão Product Name: cada fatia é um nome de produto (ex.: Vanilla Sponge Cake). Métrica Number Sold: o valor numérico de cada fatia é a quantidade vendida (Number Sold) daquele produto."
    hint: "Fatia = produto; tamanho = número vendido."
  - question: "O que é um Scorecard (Visão Geral) no Looker e quando não precisa de dimensão?"
    answer: "Scorecard é um indicador único (um número em destaque). Quando o objetivo é visão geral (ex.: total de vendas, saldo médio), pode-se usar só a métrica, sem dimensão; o Looker mostra o total ou a agregação sobre todos os dados."
    hint: "Um número só; total geral."
  - question: "Onde fica o arquivo DS - Coffee Shop.xlsx para a Etapa 2?"
    answer: "No Infnet Online > Documentos > pasta da disciplina (Introdução à Visualização de Dados e SQL). Também disponível no GitHub do livro (Apress/google-data-studio-for-beginners); deve ser baixado e importado no Google Planilhas como 'DS - Coffee Shop'."
    hint: "Documentos; depois Planilhas Google."
---
## Resumo

- **Etapa 2:** Visualizar dados de uma planilha Google Sheets no Looker e definir **métrica**, **agregação** e **dimensões**. Fonte: Google Planilhas (não Upload CSV).
- **Conector:** Adicionar dados ao relatório → **Google Planilhas** → autorizar se necessário → TODOS OS ITENS → selecionar a planilha (ex.: DS - Coffee Shop) → Adicionar → ADICIONAR AO RELATÓRIO → Layout de formato livre.
- **Dimensão vs métrica:** **Dimensão** = categorias/itens que segmentam os dados (Product Name, Product Type, UF, data). **Métrica** = números avaliados, com agregação (Count, Sum, Avg); analisados “em cima” das dimensões; não se agrupa pela métrica.
- **Exemplo Hermann's (DS - Coffee Shop):** Planilha importada do DS-Coffee Shop.xlsx no Google Planilhas. No Looker: tabela com dimensão Product Name; trocar métrica **Record Count** por **Number Sold**. Gráfico de pizza: dimensão Product Name, métrica Number Sold; segundo gráfico de pizza: dimensão Product Type, métrica Number Sold. Scorecard (Visão Geral) para total de vendas (só métrica Number Sold).
- **Agregações:** Count (contagem), Sum (soma), Avg (média), Max, Min. Servem para dizer ao Looker como calcular a métrica.
- **Looker Studio:** Lançado como Google Data Studio (jun/2016); out/2022 passou a se chamar Looker Studio. Ferramentas análogas: Tableau, Power BI. Dados em grande volume podem exigir mais processamento/tempo.

**Resumo em 5 linhas:** Etapa 2 usa Google Planilhas no Looker (não CSV). Dimensão = categoria de segmentação; métrica = número agregado (Count, Sum, Avg). No relatório Coffee Shop: Planilhas “DS - Coffee Shop”, tabela com Product Name e Number Sold; dois gráficos de pizza (Product Name e Product Type com Number Sold); Scorecard com total. Arquivo DS-Coffee Shop.xlsx em Documentos no Infnet; importar na Planilha Google antes de conectar.

**Palavras-chave:** Google Planilhas, dimensão, métrica, agregação, Record Count, Number Sold, Product Name, Product Type, gráfico de pizza, Scorecard, Visão Geral, DS - Coffee Shop, Hermann's, Etapa 2.

---

## Explicações

### 1. Tema e escopo

- **Tema:** Conectar o Looker Studio a uma fonte **Google Planilhas** (Etapa 2); definir **dimensões** e **métricas**; construir tabela, gráficos de pizza e Scorecard usando o exemplo da Hermann's Cake and Coffee Shop (planilha DS - Coffee Shop).
- **Problema que resolve:** Passar da fonte CSV (Etapa 1) para planilha na nuvem; interpretar e configurar dimensão vs métrica nos gráficos; trocar Record Count por métrica de negócio (Number Sold); criar visão geral (Scorecard).
- **Inclui:** Conector Google Planilhas; obtenção/importação do DS-Coffee Shop.xlsx no Google Planilhas; dimensão e métrica (definição e exemplos); agregação (Count, Sum, Avg); tabela com Product Name e Number Sold; gráfico de pizza (Product Name e Product Type); Scorecard sem dimensão; breve histórico Looker (Data Studio 2016 → Looker Studio 2022).
- **Não inclui:** Controles e compartilhamento (Etapa 4); preparação detalhada de dados na planilha (limpeza avançada); campos calculados na fonte.

### 2. Contexto na disciplina

- Aula 4 corresponde à **Etapa 2** (segunda semana): visualizar dados de planilha Google Sheets e definir métrica, agregação e dimensões.
- Pré-requisitos: Aula 3 (primeiro relatório com CSV no Looker); ter conta Google/Infnet; saber acessar Infnet Online > Documentos.
- Dependências futuras: Etapa 3 (preparar dados, estrutura e aparência do relatório); Etapa 4 (controles e compartilhar); TP2 pode usar este tipo de relatório.

### 3. Visão conceitual geral

Na Etapa 2 a **fonte** deixa de ser “Upload de arquivo CSV” e passa a ser **Google Planilhas**: a planilha fica na nuvem e o Looker conecta a ela. Todo gráfico no Looker usa **campos** da fonte: **dimensões** (categorias que segmentam, ex.: nome do produto, tipo, região) e **métricas** (números agregados, ex.: contagem, soma de vendas). A **agregação** (Count, Sum, Avg, etc.) define como o Looker calcula a métrica. No exemplo da cafeteria (Hermann's), usa-se a planilha “DS - Coffee Shop”: tabela com Product Name e métrica Number Sold (em vez de Record Count); dois gráficos de pizza (um por Product Name, outro por Product Type, ambos com Number Sold); e um Scorecard com o total de vendas (apenas métrica, visão geral).

### 4. Ideias-chave (máx. 7)

1. **Conector Google Planilhas:** Em “Adicionar dados ao relatório”, escolher **Google Planilhas** (não Upload CSV). Autorizar se for a primeira vez; em TODOS OS ITENS, selecionar a planilha (ex.: DS - Coffee Shop); Adicionar → ADICIONAR AO RELATÓRIO → Layout de formato livre.
2. **Dimensão:** Item que categoriza ou segmenta os dados (nomes, descrições, categorias, datas usadas como eixo ou fatia). Ex.: Product Name, Product Type, UF, tipo de erro. Os valores da dimensão aparecem como linhas, fatias ou eixos.
3. **Métrica:** Número que se avalia, em geral agregado (contagem, soma, média). Não se agrupa pela métrica; analisa-se a métrica “em cima” das dimensões. Ex.: Number Sold, receita, temperatura, número de erros.
4. **Agregação:** Define como o Looker calcula a métrica: Count (contagem), Sum (soma), Avg (média), Max, Min. Ex.: “soma de vendas por UF” → dimensão UF, métrica vendas com agregação Soma.
5. **Tabela Coffee Shop:** Dimensão Product Name; métrica **Number Sold** (substituir Record Count nas propriedades da tabela). Product Type para segundo gráfico de pizza.
6. **Gráfico de pizza (pie):** Dimensão = o que divide as fatias (ex.: Product Name ou Product Type); métrica = o valor de cada fatia (ex.: Number Sold). Dois gráficos: um com Product Name, outro com Product Type; mesma métrica Number Sold.
7. **Scorecard (Visão Geral):** Mostra um único número (total ou agregado). Pode usar só a métrica, sem dimensão, para visão geral (ex.: total de vendas).

### 5. Conceitos essenciais — explicação operacional

#### 5.1 Conectar Google Planilhas ao Looker

- **Definição:** No relatório em branco, em “Adicionar dados ao relatório”, selecionar **Google Planilhas**. Autorizar acesso se pedido; em TODOS OS ITENS, escolher a planilha (ex.: DS - Coffee Shop); clicar em Adicionar; na janela de confirmação, ADICIONAR AO RELATÓRIO; escolher Layout de formato livre.
- **Quando usar:** Sempre que a fonte for uma planilha criada/importada no Google Planilhas (Etapa 2 e exemplos com Sheets).
- **Erro comum:** Procurar “Upload de arquivo CSV” em vez de Google Planilhas; não autorizar o acesso; planilha não importada ainda no Google Planilhas.
- **Sinal de acerto:** Fonte “Google Planilhas” listada no relatório; campos da planilha (Product Name, Number Sold, etc.) visíveis no painel de dados.

#### 5.2 Dimensão e métrica

- **Dimensão:** Categorias, nomes ou atributos que segmentam os dados (o “por quê” da divisão). Ex.: Product Name, Product Type, UF, data, tipo de erro. Não é um número a ser somado; é o eixo de análise.
- **Métrica:** Número que se mede e se agrega (Count, Sum, Avg, etc.). Ex.: Number Sold, receita, temperatura, número de erros. Analisada “em cima” da dimensão (ex.: vendas por produto).
- **Quando usar:** Em toda tabela ou gráfico: escolher qual dimensão(s) e qual(is) métrica(s); na tabela, trocar Record Count por métrica de negócio (ex.: Number Sold) quando fizer sentido.
- **Erro comum:** Colocar número que não deve ser somado (ex.: ID) como métrica com Sum; confundir dimensão com métrica (ex.: “idade” como dimensão de faixa vs “número de pessoas” como métrica).
- **Pegadinha de prova:** “Métrica não tem grupamento pela métrica” — agrupamos pela dimensão; a métrica é o que calculamos em cada grupo.

#### 5.3 Agregação (Count, Sum, Avg)

- **Definição:** Count = contagem de registros; Sum = soma dos valores; Avg = média. Max e Min também existem. A agregação diz ao Looker como calcular a métrica (ex.: soma de vendas por região).
- **Quando usar:** Ao definir ou editar um campo métrica na fonte ou ao escolher como exibir a métrica no gráfico (por padrão a fonte pode ter “agregação padrão”).
- **Erro comum:** Usar Sum em coluna que é identificador (ex.: Transaction Number); usar Avg quando o negócio precisa de total (Sum).

#### 5.4 Tabela: trocar Record Count por Number Sold

- **Definição:** Na propriedade da tabela, em “Métrica”, remover Record Count e adicionar **Number Sold** (número de vendas). Dimensão típica: Product Name. Assim a tabela mostra por produto a quantidade vendida.
- **Quando usar:** Quando a planilha tem coluna Number Sold e o relatório é de vendas por produto (ex.: DS - Coffee Shop).
- **Erro comum:** Deixar Record Count quando o enunciado pede “número de vendas”; Record Count conta linhas, Number Sold é o valor da coluna de vendas.

#### 5.5 Gráfico de pizza (pie)

- **Definição:** Gráfico de pizza usa uma **dimensão** (cada fatia = um valor da dimensão) e uma **métrica** (tamanho/valor da fatia). Ex.: dimensão Product Name, métrica Number Sold → cada fatia é um produto, tamanho = vendas.
- **Quando usar:** Para mostrar proporção ou comparação por categoria (ex.: vendas por tipo de produto). Segundo gráfico: dimensão Product Type, mesma métrica Number Sold.
- **Erro comum:** Inverter dimensão e métrica; usar duas dimensões sem definir qual é a métrica.

#### 5.6 Scorecard (Visão Geral)

- **Definição:** Componente que exibe um único número (total ou agregado). Pode usar **apenas a métrica**, sem dimensão, para visão geral (ex.: total de vendas do período).
- **Quando usar:** No topo do relatório para KPIs (total de vendas, saldo médio, etc.).
- **Erro comum:** Inserir dimensão quando o objetivo é só o total geral.

### 6. Procedimento / execução (resumo Etapa 2 – Coffee Shop)

1. **Obter a planilha:** Baixar DS-Coffee Shop.xlsx (Infnet Online > Documentos ou GitHub do livro). No Google Planilhas: Planilha em branco → Arquivo → Importar → Fazer upload → selecionar o arquivo → Importar dados → nomear “DS - Coffee Shop”.
2. **Looker:** Relatório em branco → Adicionar dados → **Google Planilhas** → autorizar → TODOS OS ITENS → selecionar “DS - Coffee Shop” → Adicionar → ADICIONAR AO RELATÓRIO → Layout de formato livre.
3. **Tabela:** Selecionar a tabela padrão → Configuração → Dimensão: Product Name → Métrica: **Number Sold** (trocar Record Count).
4. **Gráfico de pizza 1:** Adicionar gráfico → Pizza → Dimensão: Product Name, Métrica: Number Sold.
5. **Gráfico de pizza 2:** Duplicar ou novo gráfico de pizza → Dimensão: Product Type, Métrica: Number Sold.
6. **Scorecard:** Adicionar gráfico → Visão Geral (Scorecard) → Métrica: Number Sold (sem dimensão para total).

**Erro típico:** Planilha não importada no Google Planilhas antes de conectar no Looker. **Sinal de acerto:** Tabela e pizzas mostrando produtos/tipos com números de venda; Scorecard com total.

### 7. Exemplos relevantes

- **Dimensões:** Product Name, Product Type, UF, Date, Description, tipo de erro.
- **Métricas:** Number Sold, Record Count, receita, temperatura, número de pessoas, número de erros. Agregações: Count, Sum, Avg.
- **Coffee Shop:** Product Name / Product Type (dimensões); Number Sold (métrica); dois gráficos de pizza + Scorecard com total.

### 8. Diferenças e confusões comuns

- **Record Count vs Number Sold:** Record Count = contagem de linhas (métrica automática do Looker). Number Sold = coluna da planilha (quantidade vendida). No relatório de vendas por produto, usar Number Sold.
- **Dimensão vs métrica:** Dimensão = categoria (texto, data, lista); métrica = número agregado. “Vendas por região” → região = dimensão, vendas = métrica.
- **Google Planilhas vs Upload CSV:** Etapa 1 = CSV local (Upload). Etapa 2 = planilha na nuvem (Google Planilhas); arquivo .xlsx deve ser importado primeiro no Google Planilhas.

### 9. Como cai em prova

- Diferença entre dimensão e métrica; exemplos de cada.
- Qual conector usar para planilha Google (Google Planilhas).
- O que é agregação (Count, Sum, Avg) e para que serve.
- No relatório Coffee Shop: qual métrica usar na tabela (Number Sold); dimensões dos dois gráficos de pizza (Product Name e Product Type).
- Scorecard: pode ter só métrica (visão geral).
- Onde obter DS-Coffee Shop (Documentos Infnet; importar no Google Planilhas).

### 10. Pontos de atenção

- Importar o .xlsx no Google Planilhas e dar o nome correto (ex.: DS - Coffee Shop) antes de conectar no Looker.
- Trocar Record Count por Number Sold na tabela quando o relatório for de vendas.
- Dimensão = segmentação; métrica = número agregado; não agrupar pela métrica.
- Limpeza de dados na planilha: um dado por célula; cabeçalhos sem duplicata (material da disciplina).

### 11. Checklist de domínio

- [ ] Sei conectar Google Planilhas ao Looker (Adicionar dados → Google Planilhas → selecionar planilha → Adicionar ao relatório).
- [ ] Sei definir dimensão (categoria de segmentação) e métrica (número agregado) e dar exemplos.
- [ ] Sei citar agregações comuns (Count, Sum, Avg) e quando usar.
- [ ] Sei configurar tabela com Product Name e Number Sold (trocar Record Count).
- [ ] Sei criar gráfico de pizza com dimensão (Product Name ou Product Type) e métrica (Number Sold).
- [ ] Sei explicar Scorecard (visão geral) e que pode usar só métrica.
- [ ] Sei onde obter DS-Coffee Shop e que deve importar no Google Planilhas antes.
