---
title: "Dashboards 2.0 e 3.0: comparação temporal, campos calculados e filtros interativos"
slug: "dashboards-comparacao-campos-calculados-filtros"
discipline: "visualizacao-sql"
order: 7
description: "Etapa 4: Dashboard 2.0 (comparação 2018 vs 2017, export PDF) e Dashboard 3.0 (campos calculados CASE WHEN / ABS, gráficos interativos, Lista Suspensa)."
reading_time: 7
difficulty: "medium"
concepts:
  - comparação temporal
  - período de comparação
  - variação absoluta
  - relatório estático
  - campos calculados
  - CASE WHEN
  - ABS
  - filtros interativos
  - lista suspensa
  - cores de dimensão
  - exportar PDF
prerequisites:
  - relatorio-account-data-pratica
exercises:
  - question: "Como ativar a comparação com o ano anterior em um scorecard?"
    answer: "Configuração do scorecard: 1) Filtro de período → Personalizado → 01/01/2018–31/12/2018 → Aplicar. 2) Período de comparação → Ativar → clicar 'Nenhuma' duas vezes → selecionar 'Ano anterior' → Aplicar. O Looker calcula jan–dez de 2017 automaticamente."
    hint: "Ativar → Nenhuma (2x) → Ano anterior."
  - question: "Qual a diferença entre variação absoluta e variação percentual no scorecard?"
    answer: "Variação percentual exibe quanto mudou em %. Variação absoluta exibe a diferença em valor real (ex.: R$ -136.633 em vez de -41%). Ativa-se via 'Exibir variação absoluta' no Estilo; ajustar precisão decimal para 0."
    hint: "Absoluta = valor real (R$); percentual = %."
  - question: "Qual a fórmula do campo calculado 'Transaction Type' no Dashboard 3.0?"
    answer: "CASE WHEN Transaction Amount > 0 THEN 'Deposit' ELSE 'Withdrawal' END — classifica cada transação: valor positivo = depósito, negativo ou zero = retirada. Pré-requisito: mudar agregação de Transaction Amount para 'Nenhum' antes de criar o campo."
    hint: "CASE WHEN > 0 → Deposit; ELSE → Withdrawal."
  - question: "Por que usar ABS Amount em vez de Transaction Amount nos gráficos do 3.0?"
    answer: "Transaction Amount tem valores negativos (saques). ABS(Transaction Amount) retorna o valor absoluto, sempre positivo, permitindo comparar depósitos e retiradas na mesma escala sem cancelamento de valores."
    hint: "ABS elimina o sinal negativo dos saques."
  - question: "Como exportar o relatório como PDF com senha no Looker Studio?"
    answer: "Ao lado do botão Compartilhar, clicar na seta para baixo → 'Baixar o relatório' → Marcar 'Proteger o relatório com senha' → Definir senha → Fazer download. Não é pelo botão Compartilhar diretamente."
    hint: "Seta ao lado de Compartilhar → Baixar → Proteger com senha."
  - question: "O que diferencia um relatório estático de um interativo no Looker Studio?"
    answer: "Estático (2.0): filtros de data fixos por configuração de página; o usuário não altera o período. Interativo (3.0): inclui controle de período e filtros Lista Suspensa; o usuário explora os dados livremente e os filtros afetam todos os gráficos da página."
    hint: "Estático = datas fixas; interativo = controles do usuário."
---

## Resumo

### Mapa da aula

- Etapa 4: dois dashboards criados a partir do 1.0 (cópia)
- Dashboard 2.0: comparação temporal 2018 vs 2017, export PDF com senha
- Dashboard 3.0: campos calculados CASE WHEN e ABS, filtros interativos
- Erro clássico: usar Transaction Amount (valores negativos) em vez de ABS Amount
- Filtros interativos no 3.0 afetam todos os gráficos da página simultaneamente

- **2.0 (estático):** Copiar 1.0 → configurar página para 2018 → scorecards com "Ano anterior" + variação absoluta → série temporal comparada → tabela com mapa de calor e barras → export PDF.
- **3.0 (interativo):** Copiar 1.0 → Transaction Amount com agregação Nenhum → criar Transaction Type (CASE WHEN) e ABS Amount (ABS) → pizza, barras, linhas como filtros → Lista Suspensa.
- **Período de comparação:** Ativar + clicar "Nenhuma" 2x + "Ano anterior" → Looker calcula ano anterior automaticamente.
- **Campos calculados:** Transaction Type cria dimensão a partir de métrica. ABS Amount elimina sinal negativo para uso correto nos gráficos.

**Resumo em 5 linhas:** Etapa 4 parte do 1.0 e cria dois relatórios. O 2.0 é estático: período 2018 fixo, scorecards com comparação ao ano anterior e variação absoluta, tabela com estilos visuais (mapa de calor + barras), export PDF com senha. O 3.0 é interativo: Transaction Amount muda para agregação Nenhum; Transaction Type (CASE WHEN) e ABS Amount (ABS) são criados como campos calculados; pizza e barras funcionam como filtros; Lista Suspensa filtra a página inteira. Dashboard 3.0 iniciado em aula; concluído na Aula 08.

**Palavras-chave:** Dashboard 2.0, Dashboard 3.0, comparação temporal, período de comparação, ano anterior, variação absoluta, estático, interativo, CASE WHEN, Transaction Type, ABS Amount, ABS, Lista Suspensa, mapa de calor, barras, export PDF, cores de dimensão.

---

## Explicações

### 1. Tema e escopo

- **Tema:** Etapa 4 — evoluir o Dashboard 1.0 em dois relatórios: 2.0 (comparação temporal, design estático) e 3.0 (exploração interativa com campos calculados e controles de filtro).
- **Inclui:** comparação "Ano anterior", variação absoluta, export PDF; campos calculados CASE WHEN e ABS; gráficos interativos; Lista Suspensa; cores de dimensão.
- **Não inclui:** SQL (próximas aulas); BigQuery; relatório de pesquisa online (outro capítulo).

### 2. Contexto na disciplina

- Aula 07 = Etapa 4. Pré-requisito: [[aula-06-relatorio-account-data-pratica]] (Looker Studio 1.0 com AccountData).
- Dashboard 3.0 não foi finalizado em 19/02/2026 — controles Lista Suspensa e tabela concluem na Aula 08.
- Após finalizar o 3.0: encerra Looker Studio → disciplina entra em banco de dados e SQL.

### 4. Ideias-chave (máx. 7)

1. **Copiar relatório:** Ponto de partida para 2.0 e 3.0 = copiar o 1.0 (⋮ → Fazer uma cópia). Evita recriar do zero.
2. **Período de comparação:** Ativar opção → clicar "Nenhuma" 2x → "Ano anterior" → Aplicar. Looker calcula o período anterior automaticamente.
3. **Variação absoluta:** Mostra diferença em valor real (ex.: -R$136.633) em vez de percentual (-41%). Estilo → "Exibir variação absoluta" + precisão decimal 0.
4. **Agregação Nenhum:** No 3.0, mudar Transaction Amount para Nenhum antes de criar campos calculados — sem isso o CASE WHEN não acessa valores linha a linha.
5. **CASE WHEN:** Cria dimensão (Transaction Type) a partir de métrica (Transaction Amount). Classifica positivo como Deposit, negativo como Withdrawal.
6. **ABS:** Elimina sinal negativo dos saques. Gráficos com valores negativos misturados com positivos distorcem a visualização.
7. **Lista Suspensa:** Controle de filtro que afeta todos os gráficos da página. Com busca (Memo) ou sem busca (Transaction Type, Category com tamanho fixo).

### 5. Conceitos essenciais — explicação operacional

#### 5.1 Período de comparação e variação absoluta

- **Definição:** Compara a mesma métrica entre dois períodos (2018 vs 2017) no mesmo gráfico ou scorecard.
- **Configuração (por gráfico):**
  1. Configuração → Filtro de período → Personalizado → 01/01/2018 a 31/12/2018 → Aplicar
  2. Período de comparação → **Ativar** → clicar "Nenhuma" **uma vez** → clicar "Nenhuma" **segunda vez** → selecionar **"Ano anterior"** → Aplicar
  3. Estilo → Métrica principal: Precisão decimal **0** → Campos de comparação: Precisão decimal **0**
  4. Marcar **"Exibir variação absoluta"**
- **Quando usar:** Análise de desempenho ano a ano com valor de referência claro.
- **Quando NÃO usar:** Quando não há dados do período anterior (resultado em branco); análise sem contexto temporal comparativo.
- ❌ **Erro:** Clicar "Nenhuma" apenas uma vez — a opção "Ano anterior" não aparece sem o segundo clique.

#### 5.2 Campos calculados: Transaction Type e ABS Amount

> **Pré-requisito:** Alterar agregação de <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`Transaction Amount`</mark> para **Nenhum** antes de criar os campos.

Campo **Transaction Type** — classifica cada transação:

```bash
CASE
  WHEN Transaction Amount > 0 THEN "Deposit"
  ELSE "Withdrawal"
END
```

Campo **ABS Amount** — valor absoluto (sem sinal negativo):

```bash
ABS(Transaction Amount)
```

- **Transaction Type:** Use como **dimensão** nos gráficos (pizza, barras) para separar tipos de transação.
- **ABS Amount:** Use como **métrica** nos gráficos — sem ABS, saques (negativos) cancelam depósitos ou geram barras invertidas.
- ❌ **Erro:** Usar <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`Transaction Amount`</mark> diretamente nos gráficos do 3.0 → visualização incorreta por valores negativos.
- ⚠️ **Pegadinha:** Valor <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`-500`</mark>: Transaction Type = <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`"Withdrawal"`</mark> (não é > 0); ABS Amount = <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`500`</mark>.

#### 5.3 Gráficos como filtros interativos

- **Pizza** (Transaction Type / ABS Amount): clicar em fatia isola aquele tipo em todos os gráficos.
- **Barras** (Category / Transaction Type detalhe / ABS Amount): clicar em barra isola a categoria.
- **Linhas** (Date Ano e Mês / Category detalhe / ABS Amount): clicar e arrastar filtra intervalo de tempo.
- **Quando NÃO usar como filtro:** No 2.0 (estático) este comportamento não está disponível por design.

#### 5.4 Controles Lista Suspensa

| Controle | Campo | Com busca | Config extra |
|---|---|---|---|
| Lista Suspensa 1 | Memo | Sim | Padrão — expande e permite pesquisar |
| Lista Suspensa 2 | Transaction Type | Não | Tamanho fixo; desativar caixa de pesquisa |
| Lista Suspensa 3 | Category | Não | Tamanho fixo; métrica ABS Amount; ordenar ABS Amount desc |

- **Sem busca:** Estilo → Controle → marcar "Tamanho fixo" + desmarcar "Ativar caixa de pesquisa".
- **Dimensão do período:** nos controles 2 e 3, campo "Dimensão do período" deve ficar **vazio**.

### 5b. Modelo mental

O Looker Studio funciona como um **painel centralizado de filtros**:

1. Qualquer controle de filtro (Lista Suspensa, clique em gráfico, controle de período) envia um filtro à página
2. Todos os gráficos recebem e aplicam esse filtro automaticamente
3. Desfazer: clicar novamente na seleção ou usar a seta "limpar filtro" que aparece no gráfico

No **2.0**: filtros fixos por configuração → comportamento estático (datas não mudam).  
No **3.0**: controles do usuário → comportamento dinâmico (qualquer elemento pode ser filtro).

### 6. Teste de reconhecimento rápido

**Qual o resultado para Transaction Amount = -500?**

```bash
CASE
  WHEN Transaction Amount > 0 THEN "Deposit"
  ELSE "Withdrawal"
END
```

**Resposta:** <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`"Withdrawal"`</mark> (-500 não é > 0)

---

**Qual o resultado de ABS(-1200)?**

```bash
ABS(Transaction Amount)  -- Transaction Amount = -1200
```

**Resposta:** <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`1200`</mark> (valor absoluto, sem sinal)

---

**O que acontece ao marcar "Exibir variação absoluta" no scorecard?**  
**Resposta:** Substitui o percentual de variação (ex.: -41%) pelo valor real da diferença (ex.: -R$136.633).

---

**Qual o passo obrigatório ANTES de criar Transaction Type no 3.0?**  
**Resposta:** Mudar agregação de <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`Transaction Amount`</mark> para **Nenhum** — sem isso o CASE WHEN não funciona corretamente linha a linha.

### 7. Erros clássicos de prova

- **Transaction Amount nos gráficos do 3.0:** Valores negativos distorcem. Usar sempre **ABS Amount** como métrica.
- **Esquecer agregação Nenhum:** Antes dos campos calculados, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`Transaction Amount`</mark> deve ter agregação **Nenhum**.
- **"Nenhuma" só uma vez:** Para "Ano anterior" é necessário clicar em "Nenhuma" **duas vezes** antes de selecionar o período.
- **Confundir variação absoluta com percentual:** Absoluta = diferença em R$; percentual = diferença em %. São exibições diferentes da mesma comparação.
- **Export PDF pelo botão errado:** Não é pelo botão "Compartilhar" diretamente — é pela **seta** ao lado → "Baixar o relatório".

### 8. Exemplos de alta densidade

```bash
-- Transaction Type: valor +850
CASE WHEN Transaction Amount > 0 THEN "Deposit" ELSE "Withdrawal" END
-- Resultado: "Deposit"

-- Transaction Type: valor -320
CASE WHEN Transaction Amount > 0 THEN "Deposit" ELSE "Withdrawal" END
-- Resultado: "Withdrawal"
```

```bash
-- ABS Amount: valores -1200 e +850
ABS(Transaction Amount)
-- Resultados: 1200 e 850
```

**Scorecards 2.0 — sequência de configuração:**
- Filtro período → 01/01/2018–31/12/2018 (personalizado)
- Período comparação → Ativar → Nenhuma → Nenhuma → Ano anterior → Aplicar
- Estilo: Precisão 0 (métrica + comparação) + Exibir variação absoluta

**Tabela 2.0 — estilos visuais por métrica:**
- Total transações mensais: Número → <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`Mapa de calor`</mark> (cor verde)
- Saldo médio mensal: Número → <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`Barra`</mark> (cor vermelha) + Mostrar número + Compactar números

### 9. Procedimento / execução

**Dashboard 2.0 (completo):**
1. Copiar 1.0 → nomear "Conta corrente – Exemplo prático do Looker Studio 2.0"
2. Apagar controle de período do cabeçalho
3. Página → Configurações → fonte: Chapter2-AccountData; data: 01/01/2018–31/12/2018; Estilo → Altura 900px
4. Cabeçalho: copiar caixa de texto → editar cópia para "Visão Geral de 2018"
5. Scorecards (repetir nos 3): Período personalizado 2018 + Comparação "Ano anterior" + Precisão 0 + Variação absoluta
6. Série temporal: mesmo período + comparação "Ano anterior"
7. Tabela: remover Description e Memo; Date → Tipo Mês; renomear colunas; classificar por Mês crescente; estilos (mapa de calor verde + barra vermelha)
8. Export: seta ao lado de Compartilhar → Baixar relatório → senha → download

**Dashboard 3.0 (início — continua na Aula 08):**
1. Copiar 1.0 → nomear "Conta corrente – Exemplo prático do Looker Studio 3.0"
2. Página → Tamanho: 1100 × 800px
3. Transaction Amount: Agregação → **Nenhum**
4. Criar campo calculado **Transaction Type** (CASE WHEN) e **ABS Amount** (ABS)
5. Apagar elementos abaixo do cabeçalho; editar texto do cabeçalho; controle de período → 01/01/2017 a 31/03/2019
6. Pizza (Transaction Type / ABS Amount) + Barras (Category / Transaction Type detalhe / ABS Amount; empilhado)
7. Cores: Recurso → Gerenciar cores de valor de dimensão → Withdrawal = vermelho, Deposit = verde
8. *(Aula 08: linhas, tabela, 3 controles Lista Suspensa)*

**Erro típico:** Criar campo calculado antes de mudar agregação para Nenhum. **Sinal de acerto:** Pizza exibe duas fatias (Deposit / Withdrawal) com valores positivos; barras mostram categorias com cores distintas.

### 15. Síntese operacional

- Para comparação temporal: Filtro período personalizado + Período de comparação → Ativar → Nenhuma (2x) → Ano anterior.
- "Exibir variação absoluta" mostra diferença em R$; precisão decimal = 0 em métrica e campos de comparação.
- Antes de campos calculados no 3.0: Transaction Amount → Agregação **Nenhum**.
- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`CASE WHEN Transaction Amount > 0 THEN "Deposit" ELSE "Withdrawal" END`</mark> → classifica tipo de transação.
- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`ABS(Transaction Amount)`</mark> → elimina sinal negativo; usar como métrica nos gráficos do 3.0.
- Export PDF: seta ao lado de Compartilhar → Baixar relatório → marcar "Proteger com senha".
