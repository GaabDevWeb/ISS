---
title: "Roteiro da disciplina e introdução"
slug: "roteiro-introducao"
discipline: "visualizacao-sql"
order: 1
description: "Cronograma, avaliação (TP/AT), metodologia e visão geral das 9 etapas."
exercises:
  - question: "Qual a diferença entre TP e AT na avaliação por competências?"
    answer: "TP (Teste de Performance) é obrigatório e não vale pontos; é pré-requisito para fazer o AT. AT (Assessment) é obrigatório e vale pontos; é a prova da disciplina."
    hint: "Pense em pré-requisito vs. nota."
  - question: "Por que é obrigatório usar a conta de aluno do Infnet para acessar o Looker Studio nesta disciplina?"
    answer: "O ambiente acadêmico e os acessos (material, validações) estão vinculados aos usuários de aluno e professor do Infnet. Um e-mail externo (ex.: Gmail pessoal) não terá acesso ao que a instituição disponibiliza."
    hint: "Validação de acesso institucional."
  - question: "Quantas semanas têm o trimestre e em qual semana ocorre a entrega do AT?"
    answer: "O trimestre tem 11 semanas. O conteúdo é dado da semana 1 à 9. Na semana 10 é a entrega do AT. Na semana 11 são dúvidas finais e reentrega do AT, se necessário."
  - question: "O que deve conter a entrega do TP1 (formato e evidências)?"
    answer: "Um arquivo PDF contendo: nome do relatório conforme enunciado; link(s) do(s) trabalho(s) no Looker Studio; print da tela do dashboard/visualização final. A rubrica (demonstrou/não demonstrou) é preenchida pelo avaliador, não pelo aluno."
    hint: "Link + print + PDF; rubrica é do professor."
  - question: "Quais são os quatro componentes da metodologia das aulas?"
    answer: "Parte conceitual; parte prática; comentários; estudos de caso. O material de apoio é um arquivo .txt com passo a passo, não slide."
  - question: "O que é um arquivo CSV e qual a Etapa 1 no Looker Studio?"
    answer: "CSV é arquivo de texto em que os dados são separados por vírgula ou ponto e vírgula. Na Etapa 1 aprende-se a visualizar dados de um CSV em um dashboard no Looker Studio."
  - question: "Da Etapa 5 em diante, o que passa a ser abordado na disciplina?"
    answer: "A partir da Etapa 5 (semana 5) começa a parte de banco de dados e SQL: uso de BD, conceitos básicos de SQL, ambiente (ex.: Replit) e consultas SQL; depois operadores, ORDER BY, GROUP BY, HAVING e DISTINCT."
---

## Resumo

- **Roteiro da disciplina:** Introdução à Visualização de Dados e SQL (Looker Studio + SQL). Trimestre de 11 semanas: conteúdo nas semanas 1–9, entrega do AT na semana 10, dúvidas/reentrega na semana 11.
- **Avaliação:** 3 TPs (obrigatórios, não valem pontos, pré-requisito para o AT); 1 AT (obrigatório, vale pontos). Entregar os três TPs é condição para poder fazer o AT.
- **Acesso:** Usar obrigatoriamente a conta de aluno do Infnet (Infnet Online). Looker Studio acessado via https://lookerstudio.google.com/ com esse usuário.
- **Metodologia:** Parte conceitual; parte prática (Looker Studio); comentários; estudos de caso. Material em arquivo .txt (passo a passo), não em slide.
- **Etapas 1–4:** Looker Studio — CSV (etapa 1), Google Sheets e métricas/dimensões (2), preparar dados e estrutura do relatório (3), controles e compartilhar (4). Etapas 5–9: SQL (conceitos, ambiente, consultas, operadores, ORDER BY, GROUP BY, HAVING, DISTINCT).
- **TP1:** Criar relatório no Looker Studio a partir de CSV; entrega em PDF com link(s) e print do dashboard; rubrica preenchida pelo professor (demonstrou/não demonstrou).

**Resumo em 5 linhas:** Trimestre 11 semanas; 3 TPs obrigatórios (sem nota) + 1 AT (com nota). Acesso Looker Studio e material pelo usuário Infnet. Metodologia: conceito, prática, comentários, estudos de caso; apoio em .txt. Etapas 1–4 Looker (CSV, Sheets, relatório, compartilhar); 5–9 SQL. TP1: relatório com CSV, entrega PDF (link + print).

**Palavras-chave:** TP, AT, Assessment, Teste de Performance, cronograma trimestral, Infnet Online, Looker Studio, CSV, Google Sheets, relatório, dashboard, rubrica, etapas 1–9.

---

## Explicações

### 1. Tema e escopo

- **Tema:** Apresentação da disciplina (roteiro, cronograma, avaliação, metodologia) e primeiros conceitos para a Etapa 1 (visualização de dados com CSV no Looker Studio).
- **Problema que resolve:** Alinhar expectativas (datas, regras de TP/AT, onde acessar material e ferramentas) e evitar erro de entrega (formato do TP1, uso da conta correta).
- **Inclui:** Cronograma de 11 semanas, avaliação por competências (TP e AT), acesso Infnet/Looker, metodologia, roteiro das 9 etapas, formato da entrega do TP1, noção de CSV e de relatório no Looker.
- **Não inclui:** Passo a passo técnico do Looker Studio (virá nas aulas seguintes); conteúdo de SQL (a partir da Etapa 5).

### 2. Contexto na disciplina

- Primeira aula do bloco “Fundamentos do Processamento de Dados”. A disciplina é dada em dois trimestres: primeiro com Visualização de Dados + SQL (esta), segundo com modelagem de banco de dados e continuação de SQL.
- Pré-requisitos: acesso ao Infnet Online e conta de aluno criada pela instituição.
- Dependências futuras: TP1 habilita para o AT; dominar Etapas 1–4 (Looker) é base para os TPs de visualização; Etapas 5–9 (SQL) serão usadas no segundo trimestre e no projeto.

### 3. Visão conceitual geral

A aula é introdutória e metodológica: define *como* a disciplina funciona (cronograma, avaliação, onde acessar, como entregar) e *o que* será visto nas 9 etapas (Looker nas 4 primeiras, SQL nas 5 seguintes). O único conceito técnico operacional abordado é o de CSV e a ideia de “relatório” no Looker como lugar onde se constrói o dashboard. O restante é regra e roteiro para evitar falhas de processo (conta errada, entrega incompleta, confusão entre TP e AT).

### 4. Ideias-chave (máx. 7)

1. **TP não vale pontos; AT vale.** Entregar os 3 TPs é obrigatório e é pré-requisito para fazer o AT. Quem não entrega os TPs não pode fazer a prova (AT).
2. **Conta Infnet obrigatória.** Looker Studio e material devem ser acessados com o usuário de aluno do Infnet; e-mail externo (ex.: Gmail pessoal) não tem acesso ao ambiente acadêmico.
3. **Cronograma fixo.** 11 semanas: 1–9 conteúdo, 10 entrega do AT, 11 dúvidas e reentrega do AT. Cada etapa = uma semana de aula.
4. **Metodologia em quatro partes.** Conceitual, prática (Looker), comentários e estudos de caso. Material de apoio em arquivo .txt (passo a passo), não em slide.
5. **Roteiro Looker (1–4) e SQL (5–9).** Etapas 1–4: CSV, Google Sheets, métricas/dimensões, preparar dados, estrutura do relatório, controles e compartilhar. Etapas 5–9: uso de BD, SQL básico, ambiente, consultas, operadores, ORDER BY, GROUP BY, HAVING, DISTINCT.
6. **Formato do TP1.** PDF com nome do relatório, link(s) do trabalho no Looker e print da tela do dashboard. Rubrica (demonstrou/não demonstrou) é preenchida pelo professor.
7. **CSV e relatório.** CSV = arquivo de texto com dados separados por vírgula ou ponto e vírgula. No Looker Studio, o “relatório” é o arquivo onde se cria o dashboard (visualização).

### 5. Conceitos essenciais — explicação operacional

#### 5.1 TP (Teste de Performance) e AT (Assessment)

- **Definição:** TP é atividade obrigatória de prática que não gera nota; AT é a avaliação que vale pontos (prova da disciplina).
- **Quando usar:** Sempre entregar os 3 TPs no prazo; só após isso o aluno está habilitado a fazer o AT.
- **Erro comum:** Achar que TP “não importa” e não entregar; assim o aluno fica impedido de fazer o AT.
- **Critério verificável:** Ter os três TPs entregues dentro do prazo para poder submeter o AT.

#### 5.2 Acesso Infnet e Looker Studio

- **Definição:** Infnet Online é o portal onde ficam disciplinas, entregas e materiais. O Looker Studio (https://lookerstudio.google.com/) deve ser acessado com o mesmo usuário de aluno do Infnet (conta institucional).
- **Quando usar:** Para acessar a disciplina, entregar TPs, abrir Looker e conectar a fontes (ex.: Google Planilhas) com permissões corretas.
- **Erro comum:** Usar Gmail pessoal; o sistema não associa esse usuário ao curso e o acesso falha ou o trabalho não fica vinculado ao aluno.
- **Sinal de acerto:** Conseguir ver a disciplina no Infnet Online e criar/editar relatórios no Looker com o usuário de aluno.

#### 5.3 Cronograma trimestral (11 semanas)

- **Definição:** O trimestre tem 11 semanas. Semanas 1–9 = conteúdo; semana 10 = entrega do AT; semana 11 = dúvidas finais e reentrega do AT, se necessário.
- **Quando usar:** Para planejar estudo e entregas (TPs no prazo, AT na semana 10).
- **Erro comum:** Deixar TPs para o fim e perder prazo; não reservar tempo para a semana 10 (AT).
- **Critério verificável:** Saber em qual semana estamos e qual a data limite de cada TP e do AT (ex.: TP1 até 16/02/2026).

#### 5.4 Entrega do TP1 (evidências e rubrica)

- **Definição:** O aluno gera um PDF com: nome do relatório conforme enunciado; link(s) do(s) relatório(s) no Looker Studio; print da tela do dashboard final. A rubrica é preenchida pelo professor (demonstrou / não demonstrou cada item).
- **Passos típicos:** (1) Fazer o relatório no Looker conforme enunciado. (2) Copiar o link do relatório. (3) Tirar print da tela do dashboard. (4) Montar um PDF com nome, link(s) e print. (5) Enviar o PDF na tarefa do TP1 no Infnet.
- **Erro comum:** Enviar só o link sem print, ou só o print sem link; não dar nome ao relatório como pedido (ex.: “Meu primeiro relatório”).
- **Sinal de acerto:** PDF contém todos os itens pedidos e o link abre o relatório correto; o avaliador consegue marcar “demonstrou” nos itens da rubrica.

#### 5.5 CSV e “relatório” no Looker Studio

- **CSV:** Arquivo de texto em que cada linha é um registro e os campos são separados por vírgula ou ponto e vírgula (ex.: `nome,data,valor`). Usado na Etapa 1 como fonte de dados no Looker.
- **Relatório no Looker:** O arquivo que você cria no Looker Studio (aba “Relatório”) é o container onde se colocam gráficos, tabelas e controles; esse conjunto é o dashboard/visualização de dados.
- **Quando usar:** Etapa 1 = criar um novo relatório, adicionar fonte “Upload de arquivo CSV”, escolher o CSV (ex.: Ch1_ExampleCSV.csv) e montar visualizações.
- **Erro comum:** Confundir “fonte de dados” (CSV ou Planilhas) com “relatório” (o arquivo do Looker onde se desenha o dashboard).

### 6. Procedimento / execução

Não há procedimento técnico detalhado nesta aula (só visão geral). O procedimento de entrega do TP1 está descrito no item 5.4. O passo a passo concreto do Looker Studio (criar relatório, adicionar CSV, etc.) é dado nas aulas seguintes e nos arquivos .txt da disciplina.

### 7. Exemplos relevantes

- **Cronograma:** Semana 1 = Etapa 1 (Looker + CSV); semana 5 = Etapa 5 (início SQL); semana 10 = entrega do AT; semana 11 = dúvidas e reentrega.
- **TP vs AT:** Fazer TP1, TP2 e TP3 e entregar no prazo → habilitado a fazer o AT. Não entregar um TP → não pode fazer o AT.
- **Entrega TP1:** PDF com título “Meu primeiro relatório” (ou conforme enunciado), link do relatório no Looker e print da tela do dashboard.
- **CSV:** Exemplo de linha: `Transaction Number,Date,Description,Memo,Category,Transaction Amount,Balance` (cabeçalho); linhas seguintes com valores separados por vírgula.

### 8. Diferenças e confusões comuns

- **TP vs AT:** TP = exercício obrigatório, sem nota, pré-requisito. AT = prova, com nota. Ambos obrigatórios; o TP não “vale ponto”, o AT vale.
- **Relatório vs dashboard vs fonte de dados:** No Looker, “relatório” é o arquivo (a “página” do relatório); “dashboard” é a visualização que você monta dentro do relatório (tabelas, gráficos); “fonte de dados” é de onde vêm os dados (CSV, Google Planilhas, etc.).
- **Conta Infnet vs Gmail pessoal:** Para esta disciplina e para o Looker em contexto acadêmico, usar sempre a conta de aluno do Infnet; Gmail pessoal não substitui.

### 9. Como cai em prova

- Perguntas sobre regras: quantos TPs, se valem pontos, o que é AT, pré-requisito para fazer o AT.
- Perguntas sobre cronograma: quantas semanas, em qual semana se entrega o AT, o que ocorre na semana 11.
- Perguntas sobre acesso: por que usar conta Infnet, onde acessar o Looker Studio.
- Perguntas sobre entrega: o que colocar no PDF do TP1 (link, print, nome do relatório); quem preenche a rubrica.
- Perguntas sobre roteiro: o que se vê nas etapas 1–4 vs 5–9; o que é CSV; o que é “relatório” no Looker.

### 10. Pontos de atenção

- Não usar e-mail externo para acessar Looker ou material da disciplina.
- Não deixar de entregar nenhum dos 3 TPs; senão não poderá fazer o AT.
- Não entregar o TP1 sem link e sem print no PDF; não dar outro nome ao relatório que não o pedido no enunciado.
- Não confundir “não valem pontos” (TP) com “não é obrigatório”; os TPs são obrigatórios.
- Verificar no enunciado do TP1 o nome exato do relatório e o prazo (ex.: 16/02/2026).

### 11. Checklist de domínio

- [ ] Sei explicar a diferença entre TP e AT e que os TPs são pré-requisito para o AT.
- [ ] Sei por que a conta Infnet é obrigatória para acessar Looker e material.
- [ ] Sei descrever o cronograma (11 semanas, conteúdo 1–9, AT na 10, dúvidas/reentrega na 11).
- [ ] Sei listar os quatro componentes da metodologia (conceitual, prática, comentários, estudos de caso).
- [ ] Sei dizer o que colocar no PDF do TP1 (nome do relatório, link(s), print do dashboard) e que a rubrica é do professor.
- [ ] Sei definir CSV (texto, separador vírgula ou ponto e vírgula) e “relatório” no Looker (arquivo onde se monta o dashboard).
- [ ] Sei resumir o roteiro: etapas 1–4 Looker (CSV, Sheets, relatório, compartilhar); etapas 5–9 SQL.
