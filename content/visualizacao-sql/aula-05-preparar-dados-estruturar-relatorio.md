---
title: "Preparar dados e estruturar relatório no Looker Studio"
slug: "preparar-dados-estruturar-relatorio"
discipline: "visualizacao-sql"
order: 5
description: "Etapa 3: pesquisa online, preparação de dados, BigQuery e design do relatório (cabeçalho, rodapé, cores, tipos de gráficos)."
exercises:
  - question: "O que é o BigQuery e qual característica principal?"
    answer: "BigQuery é um data warehouse na nuvem (Google Cloud), serverless: não é preciso gerenciar servidor. Suporta consultas em ANSI SQL e análise em escala (petabytes). Integra com Looker Studio e outras ferramentas de BI."
    hint: "Nuvem, sem servidor, SQL."
  - question: "Cite três decisões de design ao projetar um relatório no Looker (aparência e estrutura)."
    answer: "Cabeçalho (título, logo); tema de cores (consistente); rodapé (fonte dos dados, data); estrutura: visão geral no topo (scorecards/KPIs) e detalhe abaixo (tabelas, gráficos)."
    hint: "Topo, cores, rodapé, ordem dos blocos."
  - question: "Que tipos de gráficos são mencionados na Etapa 3 para o relatório de viagens?"
    answer: "Gráfico de rosca (donut), barras empilhadas, tabela dinâmica (pivot), mapa de calor. A escolha depende do tipo de dado e da pergunta que o relatório responde."
    hint: "Rosca, barras empilhadas, tabela dinâmica, calor."
  - question: "Onde ficam os arquivos Chapter2-AccountData.csv e ChrisCooperLogo.png para a Etapa 3?"
    answer: "Disponibilizados no Infnet (Documentos ou material da disciplina). Chapter2-AccountData.csv será usado na prática (conta corrente); ChrisCooperLogo.png para cabeçalho/identidade visual do relatório."
    hint: "Material da disciplina; conta corrente e logo."
  - question: "Por que é importante preparar/limpar os dados antes de conectar ao Looker?"
    answer: "Dados mal preparados (células mescladas, cabeçalhos duplicados, formatos inconsistentes) geram erros ou visualizações incorretas. Ferramentas como SurveyMonkey e planilhas exigem limpeza (um valor por célula, tipos corretos) para o Looker interpretar bem."
    hint: "Qualidade; um valor por célula; formato."
  - question: "O que a Etapa 3 pede em termos de 'pesquisa online' para empresa de viagens?"
    answer: "Pesquisar na internet uma empresa de viagens (ex.: operadora, agência) para contextualizar o relatório: de onde vêm os dados, que métricas fazem sentido (vendas, destinos, clientes) e como estruturar o relatório para esse contexto."
    hint: "Contexto; fonte dos dados; métricas."
---
## Resumo

- **Etapa 3:** Preparar dados, escolher/estruturar a fonte e **projetar o relatório** (aparência e ordem dos elementos). Inclui pesquisa online (empresa de viagens), uso de dados preparados (ex.: SurveyMonkey, planilhas) e noção de **BigQuery** (data warehouse serverless, ANSI SQL).
- **Preparação de dados:** Limpar dados antes de conectar ao Looker: um valor por célula, cabeçalhos únicos, formatos consistentes. Ferramentas como SurveyMonkey geram dados que precisam de limpeza.
- **Design do relatório:** Definir **cabeçalho** (título, logo — ex.: ChrisCooperLogo.png), **tema de cores** (paleta consistente), **rodapé** (fonte dos dados, data). Estrutura: **visão geral no topo** (scorecards, KPIs) e **detalhe abaixo** (tabelas, gráficos por dimensão).
- **Tipos de gráficos:** Rosca (donut), barras empilhadas, tabela dinâmica (pivot), mapa de calor. Escolha conforme o tipo de dado e a pergunta que o relatório responde.
- **Arquivos Etapa 3:** Chapter2-AccountData.csv (dados de conta corrente para prática posterior); ChrisCooperLogo.png (identidade/cabeçalho). Material disponível no Infnet (Documentos ou pasta da disciplina).
- **BigQuery:** Serviço Google Cloud, data warehouse serverless (sem gerenciar servidor); consultas em ANSI SQL; escala em petabytes; integra com Looker Studio. Não é obrigatório usar SQL na Etapa 3; foco em preparar dados e estruturar relatório.

**Resumo em 5 linhas:** Etapa 3 = preparar dados + projetar relatório. Pesquisa online (empresa de viagens) para contexto. Limpar dados (um valor por célula, cabeçalhos). Design: cabeçalho, tema de cores, rodapé; visão geral no topo, detalhe abaixo. Gráficos: rosca, barras empilhadas, tabela dinâmica, mapa de calor. BigQuery = warehouse serverless, SQL. Arquivos: Chapter2-AccountData.csv, ChrisCooperLogo.png.

**Palavras-chave:** Etapa 3, preparar dados, limpeza, BigQuery, serverless, ANSI SQL, design do relatório, cabeçalho, rodapé, tema de cores, visão geral, scorecard, rosca, barras empilhadas, tabela dinâmica, mapa de calor, Chapter2-AccountData, ChrisCooperLogo.

---

## Explicações

### 1. Tema e escopo

- **Tema:** Etapa 3 — **Preparar dados** (limpeza, formato) e **estruturar/desenhar o relatório** no Looker: cabeçalho, tema de cores, rodapé; visão geral no topo e detalhe abaixo; tipos de gráficos (rosca, barras empilhadas, tabela dinâmica, mapa de calor). Contexto: pesquisa online (empresa de viagens); noção de **BigQuery** (serverless, SQL).
- **Problema que resolve:** Evitar relatórios com dados mal formatados e layout confuso; dar critérios para escolher gráficos e ordem dos blocos.
- **Inclui:** Preparação/limpeza de dados; design do relatório (cabeçalho, cores, rodapé, ordem); tipos de gráficos da Etapa 3; BigQuery (o que é, serverless, ANSI SQL); arquivos Chapter2-AccountData.csv e ChrisCooperLogo.png.
- **Não inclui:** Passo a passo de conexão do AccountData ao Looker (aula 6); SQL avançado; criação detalhada de cada gráfico na prática.

### 2. Contexto na disciplina

- Aula 5 corresponde à **Etapa 3** (terceira semana): preparar dados e projetar a estrutura e aparência do relatório.
- Pré-requisitos: Aulas 1–4 (roteiro, contextualização, CSV no Looker, Google Planilhas, métricas e dimensões).
- Dependências: Aula 6 aplica a Etapa 3 com Chapter2-AccountData (Google Planilhas, campos, layout, tabela, scorecards).

### 3. Visão conceitual geral

Na Etapa 3 o foco é **antes** de montar o relatório: **dados** (onde vêm, como limpar — um valor por célula, cabeçalhos claros) e **design** (como o relatório vai parecer e em que ordem: cabeçalho com título/logo, tema de cores, rodapé; no topo visão geral com scorecards/KPIs, abaixo tabelas e gráficos de detalhe). A escolha do **tipo de gráfico** (rosca, barras empilhadas, tabela dinâmica, mapa de calor) depende do dado e da pergunta. O **BigQuery** é apresentado como opção de fonte (warehouse na nuvem, serverless, SQL); os arquivos Chapter2-AccountData e ChrisCooperLogo são os materiais da Etapa 3 para a prática seguinte.

### 4. Ideias-chave (máx. 7)

1. **Preparar dados:** Limpar e padronizar antes de conectar ao Looker: um valor por célula, sem células mescladas para dados; cabeçalhos únicos; formatos consistentes (datas, números, moeda). Dados de SurveyMonkey ou exportações precisam dessa etapa.
2. **Design do relatório:** Cabeçalho (título do relatório, logo — ex.: ChrisCooperLogo.png); tema de cores (paleta consistente); rodapé (fonte dos dados, data de atualização). Deixar claro de onde vêm os dados e quando foram gerados.
3. **Estrutura: visão geral → detalhe:** No topo do relatório, scorecards ou KPIs (visão geral); ao descer, tabelas e gráficos com mais detalhe (por dimensão, período, categoria).
4. **Tipos de gráficos (Etapa 3):** Rosca (donut), barras empilhadas, tabela dinâmica (pivot), mapa de calor. Escolher conforme a pergunta e o tipo de dado (proporção, comparação, tendência, distribuição).
5. **BigQuery:** Data warehouse na nuvem (Google Cloud), **serverless** (não gerencia servidor); consultas em **ANSI SQL**; escala em petabytes; integra com Looker Studio. Útil para grandes volumes; não é obrigatório na Etapa 3.
6. **Pesquisa online (empresa de viagens):** Contextualizar o relatório: pesquisar empresa de viagens (operadora, agência), entender de onde vêm os dados e que métricas/dimensões fazem sentido (vendas, destinos, clientes).
7. **Arquivos Etapa 3:** Chapter2-AccountData.csv (dados de conta corrente; usado na prática com Google Planilhas); ChrisCooperLogo.png (logo para cabeçalho). Disponíveis no material da disciplina (Infnet).

### 5. Conceitos essenciais — explicação operacional

#### 5.1 Preparação e limpeza de dados

- **Definição:** Garantir que os dados estejam em formato que o Looker (e a fonte) entendam: um valor por célula, cabeçalhos sem duplicata, tipos consistentes (data, número, moeda, texto). Remover ou padronizar células mescladas e valores inconsistentes.
- **Quando usar:** Antes de conectar qualquer planilha ou CSV ao Looker; após exportar de SurveyMonkey, formulários ou outros sistemas.
- **Erro comum:** Conectar dados com células mescladas ou cabeçalhos em várias linhas; misturar formatos (ex.: datas em texto e em número).
- **Sinal de acerto:** Cabeçalho na primeira linha; cada coluna com tipo claro; Looker reconhece dimensões e métricas corretamente.

#### 5.2 Cabeçalho, tema de cores e rodapé

- **Cabeçalho:** Área no topo do relatório com título e, se aplicável, logo (ex.: ChrisCooperLogo.png). Dá identidade e contexto.
- **Tema de cores:** Paleta definida (Arquivo → Tema e layout) para manter consistência em todos os gráficos e textos.
- **Rodapé:** Informações no final da página: fonte dos dados, data de geração/atualização. Importante para credibilidade.
- **Quando usar:** Em todo relatório entregue ou compartilhado; obrigatório na Etapa 3.
- **Erro comum:** Relatório sem título ou sem indicação da fonte dos dados.

#### 5.3 Visão geral no topo, detalhe abaixo

- **Definição:** Organizar o relatório em blocos: primeiro, indicadores de visão geral (scorecards, totais, KPIs); depois, tabelas e gráficos que detalham por dimensão (produto, região, data, etc.).
- **Quando usar:** Relatórios com mais de um bloco; quando o leitor precisa do “resumo” antes do “detalhe”.
- **Erro comum:** Colocar tabela grande no topo e scorecards perdidos no final.

#### 5.4 Tipos de gráficos (rosca, barras empilhadas, tabela dinâmica, mapa de calor)

- **Rosca (donut):** Proporções de um todo; similar à pizza, com centro vazio.
- **Barras empilhadas:** Comparar totais e composição (ex.: vendas por região, empilhadas por produto).
- **Tabela dinâmica (pivot):** Dimensões em linhas e colunas; métricas nas células; boa para cruzamentos.
- **Mapa de calor:** Intensidade por célula (ex.: valor por região e período). Escolha conforme a pergunta (proporção, comparação, tendência, distribuição).
- **Quando usar:** Definir na etapa de design qual gráfico responde cada pergunta; evitar excesso de gráficos repetindo a mesma informação.

#### 5.5 BigQuery

- **Definição:** Serviço de data warehouse na nuvem (Google Cloud); **serverless** (não é preciso provisionar ou gerenciar servidor); consultas em **ANSI SQL**; escala em petabytes; integração com Looker Studio.
- **Quando usar:** Quando a fonte for BigQuery (conector no Looker); quando os dados estão em tabelas grandes ou em banco. Etapa 3 não exige uso de BigQuery; é contexto para fontes avançadas.
- **Erro comum:** Confundir BigQuery com “só planilha”; achar que é obrigatório usar SQL na Etapa 3.

### 6. Procedimento / execução (resumo Etapa 3 – design)

1. **Pesquisa:** Pesquisar empresa de viagens (online) para contextualizar fonte de dados e métricas.
2. **Dados:** Obter/exportar dados (ex.: SurveyMonkey, planilha); limpar (um valor por célula, cabeçalhos, formatos).
3. **Design:** Definir cabeçalho (título, logo ChrisCooperLogo.png), tema de cores, rodapé (fonte, data).
4. **Estrutura:** Esboçar ordem: visão geral (scorecards) no topo; tabelas e gráficos de detalhe abaixo.
5. **Gráficos:** Escolher tipo por pergunta: rosca (proporção), barras empilhadas (composição), tabela dinâmica (cruzamento), mapa de calor (intensidade).
6. **Material:** Ter à mão Chapter2-AccountData.csv e ChrisCooperLogo.png para a prática (aula 6).

**Sinal de acerto:** Roteiro de design claro (cabeçalho, cores, rodapé, ordem dos blocos e tipos de gráficos) antes de montar o relatório no Looker.

### 7. Exemplos relevantes

- **Cabeçalho:** Título “Relatório de Viagens – Empresa X”; imagem ChrisCooperLogo.png.
- **Visão geral:** Scorecards: total de vendas, número de clientes, destinos.
- **Detalhe:** Tabela por destino e valor; gráfico de rosca por tipo de pacote; barras empilhadas por mês e região.
- **BigQuery:** Fonte alternativa para dados em tabelas SQL; conector “BigQuery” no Looker.

### 8. Diferenças e confusões comuns

- **Preparar dados vs conectar dados:** Preparar = limpar e formatar na planilha/CSV antes; conectar = adicionar fonte no Looker (aula 6 faz a conexão do AccountData).
- **BigQuery vs Google Planilhas:** BigQuery = warehouse, SQL, grandes volumes; Planilhas = planilha na nuvem, limite menor, mais simples para Etapa 3.
- **Design vs implementação:** Etapa 3 (aula 5) = planejar estrutura e aparência; aula 6 = implementar com AccountData no Looker.

### 9. Como cai em prova

- O que é BigQuery (serverless, ANSI SQL, warehouse).
- Por que preparar/limpar dados antes de conectar ao Looker.
- Elementos de design: cabeçalho, tema de cores, rodapé.
- Estrutura recomendada: visão geral no topo, detalhe abaixo.
- Tipos de gráficos da Etapa 3: rosca, barras empilhadas, tabela dinâmica, mapa de calor.
- Uso dos arquivos Chapter2-AccountData e ChrisCooperLogo.

### 10. Pontos de atenção

- Limpeza é pré-requisito: um valor por célula, cabeçalhos únicos.
- Rodapé com fonte e data aumenta credibilidade do relatório.
- BigQuery não é obrigatório na Etapa 3; foco em preparação e design.
- Material Etapa 3 (AccountData, logo) será usado na aula 6.

### 11. Checklist de domínio

- [ ] Sei explicar por que preparar/limpar dados antes de conectar ao Looker.
- [ ] Sei listar elementos de design: cabeçalho, tema de cores, rodapé.
- [ ] Sei descrever a estrutura visão geral (topo) → detalhe (abaixo).
- [ ] Sei citar tipos de gráficos da Etapa 3 (rosca, barras empilhadas, tabela dinâmica, mapa de calor).
- [ ] Sei o que é BigQuery (serverless, SQL, warehouse) e que não é obrigatório na Etapa 3.
- [ ] Sei para que servem Chapter2-AccountData.csv e ChrisCooperLogo.png.
