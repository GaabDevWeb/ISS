---
title: "Relatório com Google Planilhas: conta corrente (AccountData)"
slug: "relatorio-account-data-pratica"
discipline: "visualizacao-sql"
order: 6
description: "Etapa 3 prática: conectar Chapter2-AccountData ao Looker via Google Planilhas, campos calculados, layout e tabela com scorecards."
exercises:
  - question: "Quais tipos e agregações configurar para Balance, Transaction Amount e Transaction Number no Looker (AccountData)?"
    answer: "Balance: Tipo Moeda (BRL), Agregação padrão Médio. Transaction Amount: Tipo Moeda (BRL), Agregação Soma. Transaction Number: Tipo Texto (não é número para somar; é identificador)."
    hint: "Balance = média; Transaction Amount = soma; Transaction Number = texto."
  - question: "Como alterar largura e altura do relatório no Looker?"
    answer: "Arquivo → Tema e layout → aba LAYOUT. Ajustar Largura (ex.: 900) e Altura (ex.: 700). Valores em pixels; afetam a página do relatório."
    hint: "Tema e layout; LAYOUT."
  - question: "Para a tabela do relatório de conta corrente: quais dimensões e quais métricas usar?"
    answer: "Dimensões: Date, Description, Memo (categorias/descrições das linhas). Métricas: Transaction Amount (soma dos valores) e Balance (ex.: médio por linha ou conforme configurado)."
    hint: "Data, descrição, memo = dimensões; valor e saldo = métricas."
  - question: "O que são Scorecards de Saldo Médio, Saldo Máximo e Saldo Mínimo?"
    answer: "São indicadores de visão geral (um número cada): Saldo Médio = agregação Médio do campo Balance; Saldo Máximo = Max(Balance); Saldo Mínimo = Min(Balance). Usam só a métrica Balance com agregação correspondente, sem dimensão."
    hint: "Um número por card; Balance com Avg, Max, Min."
  - question: "Onde colocar a planilha Chapter2-AccountData para conectar no Looker?"
    answer: "Importar o CSV Chapter2-AccountData no Google Planilhas (Arquivo → Importar) e dar um nome à planilha/aba. No Looker: Adicionar dados → Google Planilhas → selecionar essa planilha → Adicionar ao relatório."
    hint: "Google Planilhas primeiro; depois conector no Looker."
  - question: "Qual o nome sugerido do relatório na Etapa 3 prática?"
    answer: "Nome sugerido no material: 'Conta corrente – Exemplo prático do Looker Studio 1.0' (ou similar). Identifica o relatório como exemplo de conta corrente com AccountData."
    hint: "Conta corrente; Looker Studio; 1.0."
---
## Resumo

- **Etapa 3 prática:** Montar um relatório no Looker usando **Google Planilhas** com os dados **Chapter2-AccountData** (conta corrente). Configurar **campos** (tipo e agregação), **layout** (largura/altura), **tabela** (dimensões + métricas) e **scorecards** (Saldo Médio, Máximo, Mínimo).
- **Fonte:** Planilha no Google Planilhas criada a partir do **Chapter2-AccountData.csv**. No Looker: Adicionar dados → **Google Planilhas** → selecionar a planilha → Adicionar ao relatório.
- **Campos (Dados):** Em Recursos → Gerenciar dados → fonte → editar campo ou adicionar: **Balance** → Tipo **Moeda** (BRL), Agregação padrão **Médio**; **Transaction Amount** → Tipo **Moeda** (BRL), Agregação **Soma**; **Transaction Number** → Tipo **Texto** (identificador, não somar).
- **Layout:** Arquivo → **Tema e layout** → aba **LAYOUT** → Largura (ex.: 900), Altura (ex.: 700). Nome do relatório: ex. “Conta corrente – Exemplo prático do Looker Studio 1.0”.
- **Tabela:** Dimensões: **Date**, **Description**, **Memo**. Métricas: **Transaction Amount**, **Balance**. Mostra transações com valor e saldo por linha.
- **Scorecards:** Três indicadores de visão geral: **Saldo Médio** (Balance, agregação Médio); **Saldo Máximo** (Balance, Max); **Saldo Mínimo** (Balance, Min). Sem dimensão; apenas a métrica Balance com a agregação correspondente.

**Resumo em 5 linhas:** Etapa 3 prática = AccountData no Google Planilhas conectado ao Looker. Configurar Balance (Moeda BRL, Médio), Transaction Amount (Moeda BRL, Soma), Transaction Number (Texto). Layout 900x700; tabela com Date, Description, Memo e métricas Transaction Amount, Balance; scorecards Saldo Médio, Máximo, Mínimo. Nome do relatório: “Conta corrente – Exemplo prático do Looker Studio 1.0”.

**Palavras-chave:** Chapter2-AccountData, Google Planilhas, Balance, Transaction Amount, Transaction Number, Moeda BRL, Médio, Soma, Texto, Tema e layout, LAYOUT, tabela, scorecard, Saldo Médio, Saldo Máximo, Saldo Mínimo, conta corrente, Etapa 3 prática.

---

## Explicações

### 1. Tema e escopo

- **Tema:** Implementar o relatório da Etapa 3 com dados de **conta corrente** (Chapter2-AccountData): conectar Google Planilhas ao Looker, configurar **tipos e agregações** dos campos (Balance, Transaction Amount, Transaction Number), definir **layout** (largura/altura), criar **tabela** (dimensões + métricas) e **scorecards** (Saldo Médio, Máximo, Mínimo).
- **Problema que resolve:** Aplicar na prática a preparação e o design da Etapa 3; garantir que moeda e agregação estejam corretos para evitar interpretação errada (ex.: somar Transaction Number).
- **Inclui:** Conexão Google Planilhas (AccountData); configuração de campos em “Dados” (tipo e agregação); Tema e layout (LAYOUT); tabela com Date, Description, Memo e Transaction Amount, Balance; três scorecards com Balance (Médio, Max, Min); nome do relatório.
- **Não inclui:** Controles de filtro (Etapa 4); campos calculados avançados (fórmulas); gráficos adicionais (rosca, barras) além da tabela e scorecards.

### 2. Contexto na disciplina

- Aula 6 é a **segunda parte da Etapa 3** (prática): usar o que foi planejado na aula 5 (design, preparação) e montar o relatório com AccountData.
- Pré-requisitos: Aula 5 (preparar dados, design); Aula 4 (Google Planilhas, dimensão, métrica, scorecard). Ter Chapter2-AccountData no Google Planilhas.
- Dependências: Etapa 4 (controles, compartilhar); TP2 pode usar estrutura semelhante.

### 3. Visão conceitual geral

O relatório de **conta corrente** usa a planilha **Chapter2-AccountData** (importada no Google Planilhas). No Looker é essencial definir **tipo e agregação** dos campos: **Balance** como moeda com agregação **Médio** (saldo médio); **Transaction Amount** como moeda com **Soma** (total de transações); **Transaction Number** como **Texto** (não é métrica numérica). O **layout** (Arquivo → Tema e layout → LAYOUT) define largura e altura (ex.: 900 x 700). A **tabela** mostra cada transação (Date, Description, Memo) com valor e saldo (Transaction Amount, Balance). Os **scorecards** dão visão geral: Saldo Médio, Saldo Máximo, Saldo Mínimo (Balance com agregações Médio, Max, Min), sem dimensão.

### 4. Ideias-chave (máx. 7)

1. **Fonte:** Planilha Google Planilhas com dados do **Chapter2-AccountData.csv** (importar no Sheets primeiro). No Looker: Adicionar dados → Google Planilhas → selecionar a planilha → Adicionar ao relatório.
2. **Balance:** Tipo **Moeda** (BRL), Agregação padrão **Médio**. Representa saldo; média faz sentido para visão geral (Saldo Médio).
3. **Transaction Amount:** Tipo **Moeda** (BRL), Agregação **Soma**. Valor da transação; soma para total de movimentação.
4. **Transaction Number:** Tipo **Texto**. É identificador da transação; não deve ser somado nem usado como métrica numérica.
5. **Layout:** Arquivo → Tema e layout → aba **LAYOUT** → Largura (ex.: 900), Altura (ex.: 700). Nome do relatório: ex. “Conta corrente – Exemplo prático do Looker Studio 1.0”.
6. **Tabela:** Dimensões: **Date**, **Description**, **Memo**. Métricas: **Transaction Amount**, **Balance**. Mostra cada transação com valor e saldo.
7. **Scorecards:** Três visões gerais: **Saldo Médio** (Balance, Médio), **Saldo Máximo** (Balance, Max), **Saldo Mínimo** (Balance, Min). Sem dimensão; só métrica Balance com a agregação escolhida.

### 5. Conceitos essenciais — explicação operacional

#### 5.1 Conectar Chapter2-AccountData (Google Planilhas)

- **Definição:** Importar o CSV Chapter2-AccountData no Google Planilhas (Arquivo → Importar → Fazer upload). No Looker: Adicionar dados → Google Planilhas → autorizar → selecionar a planilha/aba com AccountData → Adicionar → ADICIONAR AO RELATÓRIO.
- **Quando usar:** Sempre que a fonte for a planilha AccountData na Etapa 3 prática.
- **Erro comum:** Tentar “Upload de arquivo CSV” em vez de usar a planilha já importada no Google Planilhas; planilha não importada antes.
- **Sinal de acerto:** Fonte “Google Planilhas” listada; campos Date, Description, Memo, Balance, Transaction Amount, Transaction Number visíveis.

#### 5.2 Configurar Balance, Transaction Amount e Transaction Number

- **Balance:** Em Gerenciar dados (ou editar campo na fonte): Tipo **Moeda**, unidade **BRL**; Agregação padrão **Médio**. Assim o Looker trata como saldo e usa média quando agregado.
- **Transaction Amount:** Tipo **Moeda**, **BRL**; Agregação **Soma**. Valor da transação; soma para totais.
- **Transaction Number:** Tipo **Texto**. Não é número para operação matemática; é identificador; não definir agregação Soma.
- **Quando usar:** Logo após adicionar a fonte, antes de montar tabela e scorecards.
- **Erro comum:** Deixar Transaction Number como número e somar; usar Balance com Soma quando o relatório pede “saldo médio”.
- **Pegadinha de prova:** “Transaction Number deve ser Texto” — não somar número de transação como métrica.

#### 5.3 Tema e layout (largura e altura)

- **Definição:** Arquivo → Tema e layout → aba **LAYOUT**. Campos **Largura** e **Altura** (em pixels). Ex.: 900 x 700. Define o tamanho da página do relatório.
- **Quando usar:** No início ou ao ajustar a aparência do relatório (Etapa 3).
- **Erro comum:** Não encontrar LAYOUT (está na mesma janela “Tema e layout”, em aba).

#### 5.4 Tabela: dimensões e métricas

- **Definição:** Tabela com **dimensões** Date, Description, Memo (o que identifica cada linha) e **métricas** Transaction Amount, Balance (números por linha ou agregados).
- **Quando usar:** Para listar transações da conta com valor e saldo; alinhado ao design “detalhe abaixo” da Etapa 3.
- **Erro comum:** Usar Transaction Number como métrica; inverter dimensão e métrica (ex.: Balance como dimensão).

#### 5.5 Scorecards Saldo Médio, Máximo, Mínimo

- **Definição:** Três componentes “Visão geral” (scorecard): um com Balance e agregação **Médio** (Saldo Médio); um com **Max** (Saldo Máximo); um com **Min** (Saldo Mínimo). Sem dimensão; apenas a métrica Balance com a agregação correspondente.
- **Quando usar:** Visão geral no topo do relatório (design Etapa 3).
- **Erro comum:** Colocar dimensão no scorecard quando o objetivo é um único número (total ou agregado geral).

### 6. Procedimento / execução (resumo Etapa 3 prática)

1. **Planilha:** Importar Chapter2-AccountData.csv no Google Planilhas (Arquivo → Importar). Nomear a planilha/aba se necessário.
2. **Looker:** Novo relatório → Adicionar dados → Google Planilhas → selecionar planilha AccountData → Adicionar → ADICIONAR AO RELATÓRIO → Layout de formato livre.
3. **Campos:** Recursos → Gerenciar dados (ou editar fonte) → Balance: Moeda BRL, Médio; Transaction Amount: Moeda BRL, Soma; Transaction Number: Texto.
4. **Nome e layout:** Dar nome ao relatório (ex.: “Conta corrente – Exemplo prático do Looker Studio 1.0”). Arquivo → Tema e layout → LAYOUT → Largura 900, Altura 700.
5. **Tabela:** Inserir/ajustar tabela → Dimensões: Date, Description, Memo → Métricas: Transaction Amount, Balance.
6. **Scorecards:** Três gráficos “Visão geral”: Saldo Médio (Balance, Médio), Saldo Máximo (Balance, Max), Saldo Mínimo (Balance, Min).

**Erro típico:** Transaction Number como número com Soma. **Sinal de acerto:** Tabela com transações e valores; scorecards com três números (médio, máximo, mínimo do saldo).

### 7. Exemplos relevantes

- **Balance:** Moeda BRL, Médio → scorecard “Saldo Médio”; Max → “Saldo Máximo”; Min → “Saldo Mínimo”.
- **Transaction Amount:** Moeda BRL, Soma → total movimentado na tabela ou em scorecard.
- **Transaction Number:** Texto → não aparece como métrica somável; pode ser dimensão se precisar listar por número de transação.

### 8. Diferenças e confusões comuns

- **Balance Médio vs Transaction Amount Soma:** Balance = saldo (média, max, min); Transaction Amount = valor da transação (soma para total).
- **Transaction Number:** Não é “quantidade de transações” para somar; é identificador (texto).
- **Layout vs Tema:** Tema = cores e estilo; LAYOUT = largura e altura da página (ambos em “Tema e layout”).

### 9. Como cai em prova

- Tipos e agregações: Balance (Moeda, Médio), Transaction Amount (Moeda, Soma), Transaction Number (Texto).
- Onde alterar largura/altura (Tema e layout → LAYOUT).
- Dimensões e métricas da tabela (Date, Description, Memo; Transaction Amount, Balance).
- Scorecards: Saldo Médio, Saldo Máximo, Saldo Mínimo = Balance com Médio, Max, Min.
- Fonte do AccountData: Google Planilhas (planilha importada do CSV).

### 10. Pontos de atenção

- Transaction Number sempre como Texto; não somar.
- Balance com agregação Médio para “Saldo Médio”; Max e Min para os outros scorecards.
- Layout em pixels (900 x 700 é exemplo); ajustar conforme necessidade.

### 11. Checklist de domínio

- [ ] Sei conectar a planilha Chapter2-AccountData (Google Planilhas) ao Looker.
- [ ] Sei configurar Balance (Moeda BRL, Médio), Transaction Amount (Moeda BRL, Soma), Transaction Number (Texto).
- [ ] Sei alterar largura e altura em Tema e layout → LAYOUT.
- [ ] Sei montar a tabela com Date, Description, Memo e Transaction Amount, Balance.
- [ ] Sei criar os três scorecards (Saldo Médio, Saldo Máximo, Saldo Mínimo) com Balance.
- [ ] Sei o nome sugerido do relatório (Conta corrente – Exemplo prático do Looker Studio 1.0).
