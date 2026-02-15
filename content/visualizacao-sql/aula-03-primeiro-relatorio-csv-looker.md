---
title: "Primeiro relatório com CSV no Looker Studio"
slug: "primeiro-relatorio-csv-looker"
discipline: "visualizacao-sql"
order: 3
description: "Criar relatório em branco, obter CSV Ch1_ExampleCSV, upload e adicionar ao relatório."
exercises:
  - question: "Quais são os passos para obter o arquivo Ch1_ExampleCSV.csv a partir do link do GitHub (sem usar download direto)?"
    answer: "Criar um arquivo de texto no Windows e renomear para Ch1_ExampleCSV.csv (mostrar extensões no Explorer se necessário). Abrir o link no navegador, selecionar todo o conteúdo da página, copiar. Abrir o .csv com Bloco de Notas, colar o conteúdo, salvar e fechar."
    hint: "Renomear para .csv; copiar do navegador; colar no Bloco de Notas."
  - question: "No Windows Explorer, o arquivo aparece sem extensão (.csv). O que fazer para ver e editar a extensão?"
    answer: "Abrir Opções do Explorer (menu ⋮ ou Ferramentas > Opções). Guia 'Modo de exibição'. Rolar e desmarcar 'Ocultar as extensões dos tipos de arquivos conhecidos' (em inglês: 'Hide extensions for known file types'). Aplicar e OK."
    hint: "Opções > Modo de exibição > desmarcar ocultar extensões."
  - question: "Ao criar um relatório em branco no Looker Studio, qual opção de conector usar para carregar um arquivo CSV local (Etapa 1)?"
    answer: "Usar a opção 'Upload de arquivo CSV'. Não usar Google Planilhas (isso é da Etapa 2). Depois: Adicionar arquivo, selecionar o .csv no computador, e em seguida 'Adicionar ao relatório' (ou Adicionar)."
    hint: "Upload de arquivo CSV; depois Adicionar ao relatório."
  - question: "O que é a coluna 'Record Count' que aparece na tabela do Looker após carregar o CSV?"
    answer: "É uma coluna automática do Looker Studio, não existe no arquivo CSV. Indica o número de registros (contagem) para cada valor da dimensão exibida (ex.: uma linha por Product Name com o total de registros daquele produto)."
    hint: "Coluna criada pelo Looker, não pelo usuário."
  - question: "No CSV do exemplo (Ch1_ExampleCSV), quais são as colunas (cabeçalho) e o que separa uma coluna da outra?"
    answer: "Colunas: Product Name, Description, Flavor, Product Type, Number Sold. O separador é vírgula (ou ponto e vírgula). A primeira linha é o cabeçalho; as linhas seguintes são os dados."
    hint: "Primeira linha = cabeçalho; separador vírgula."
  - question: "Se ao clicar em 'Adicionar arquivo' aparecer o campo 'Criar um conjunto de dados para adicionar arquivos', o que fazer?"
    answer: "Informar um nome para o conjunto de dados (ex.: o nome do arquivo, como Ch1_ExampleCSV). Em seguida selecionar o arquivo e usar o botão para adicionar/abrir. O Looker pode mudar a interface; o objetivo é carregar o CSV e depois clicar em 'Adicionar ao relatório'."
    hint: "Dar um nome ao conjunto de dados; depois adicionar o arquivo e ao relatório."
  - question: "Por que ao abrir um .csv clicando direto no arquivo no Excel às vezes tudo aparece em uma única coluna?"
    answer: "Porque o Excel pode não reconhecer o separador (vírgula ou ponto e vírgula) ao abrir diretamente. Para separar corretamente nas colunas, use no Excel: Dados > Obter dados de arquivo de texto/CSV (ou similar) e importar, ou edite o CSV no Bloco de Notas."
    hint: "Reconhecimento do separador; importação guiada."
---
## Resumo

- **Objetivo da aula:** Concluir a Etapa 1: criar o primeiro relatório no Looker Studio usando um arquivo CSV (Ch1_ExampleCSV.csv). Acesso com conta Gmail do aluno Infnet; arquivos da disciplina em Infnet Online > Documentos > pasta da disciplina.
- **Tela inicial Looker Studio:** https://lookerstudio.google.com/navigation/reporting. Galeria de modelos (templates); organizador de relatórios (nome, proprietário, última abertura); menu à esquerda (recentes, compartilhados, minha propriedade, lixeira, modelos); barra de pesquisa. Dar nome significativo ao relatório.
- **Criar relatório:** "Relatório em branco" → Looker pede fonte de dados. Para CSV local: conector **Upload de arquivo CSV**. Depois: Adicionar arquivo → selecionar o .csv → Adicionar (ou Adicionar ao relatório) → escolher "Layout de formato livre". A tabela padrão usa dimensão (ex.: Product Name) e **Record Count** (coluna automática do Looker).
- **Obter o CSV Ch1_ExampleCSV:** Link: https://raw.githubusercontent.com/Apress/google-data-studio-for-beginners/main/Ch1_ExampleCSV.csv. Passos: (1) No Windows: novo documento de texto, renomear para `Ch1_ExampleCSV.csv` (se não vir extensão: Opções do Explorer > Modo de exibição > desmarcar "Ocultar extensões dos tipos de arquivos conhecidos"). (2) Abrir o link no navegador, selecionar todo o conteúdo, copiar. (3) Abrir o .csv com Bloco de Notas, colar, salvar, fechar.
- **Estrutura do CSV:** Primeira linha = cabeçalho (Product Name, Description, Flavor, Product Type, Number Sold). Separador: vírgula ou ponto e vírgula. Exemplo: 11 linhas de dados.
- **Pegadinhas:** Se surgir "Criar um conjunto de dados para adicionar arquivos", informar um nome (ex.: Ch1_ExampleCSV). Looker é ferramenta na nuvem (Google); a interface pode mudar entre versões. Abrir .csv direto no Excel pode colocar tudo em uma coluna — usar "Obter dados" ou Bloco de Notas.

**Resumo em 5 linhas:** Acessar Looker com conta Infnet; relatório em branco; Upload de arquivo CSV; ter o Ch1_ExampleCSV no PC (criar .csv, copiar conteúdo do link, colar no Bloco de Notas). Adicionar arquivo no Looker, depois Adicionar ao relatório, Layout de formato livre; tabela padrão com dimensão + Record Count. Mostrar extensões no Windows se o arquivo não tiver .csv; nome significativo no relatório.

**Palavras-chave:** Looker Studio, relatório em branco, Upload de arquivo CSV, Ch1_ExampleCSV, extensão .csv, cabeçalho, separador vírgula, Record Count, Layout de formato livre, Infnet Online, Documentos, organizador de relatórios.

---

## Explicações

### 1. Tema e escopo

- **Tema:** Procedimento para criar o primeiro relatório no Looker Studio usando um arquivo CSV: obter o CSV (Ch1_ExampleCSV), acessar o Looker, criar relatório em branco, fazer upload do CSV e adicionar ao relatório. Interface inicial do Looker (organizador, modelos, menu).
- **Problema que resolve:** Permitir ao aluno executar o TP1 (visualizar dados de um CSV em um dashboard) sem erro de conta, de extensão do arquivo ou de conector; reconhecer a coluna Record Count e a estrutura do CSV.
- **Inclui:** Acesso Looker (conta Infnet, URL); tela inicial (galeria, organizador, menu, barra de pesquisa); nome significativo; obter Ch1_ExampleCSV (link, criar .csv no Windows, mostrar extensão, copiar/colar no Bloco de Notas); estrutura do CSV (cabeçalho, separador); Upload de arquivo CSV; "Criar conjunto de dados" (nome); Adicionar ao relatório; Layout de formato livre; tabela padrão e Record Count; observação sobre mudanças de interface (ferramenta na nuvem).
- **Não inclui:** Gráficos além da tabela padrão; Google Planilhas (Etapa 2); métricas e dimensões em profundidade (Etapa 2).

### 2. Contexto na disciplina

- Terceira aula; conclusão prática da Etapa 1 (semana 1). Na aula anterior (aula 2) ficou só conceito; o professor havia prometido começar pelo Looker nesta aula. Na quinta-feira seguinte: mais prática no Looker e início da Etapa 2.
- Pré-requisitos: Aula 1 (conta Infnet, onde fica material); Aula 2 (contexto de dados e dashboard). Ter o arquivo Ch1_ExampleCSV.csv no computador (ou saber obtê-lo).
- Dependências futuras: TP1 exige esse relatório com CSV; Etapa 2 usa Google Planilhas e métricas/dimensões.

### 3. Visão conceitual geral

A aula é **técnica**: passo a passo para (1) obter um CSV a partir de um link (criar arquivo .csv no Windows, copiar conteúdo do link, colar no Bloco de Notas) e (2) criar um relatório no Looker Studio em branco, escolher "Upload de arquivo CSV", carregar o arquivo e adicioná-lo ao relatório. O Looker exibe por padrão uma tabela com uma dimensão do CSV e a métrica automática Record Count. A interface do Looker (Google, nuvem) pode mudar; aparecer "Criar conjunto de dados" ou fluxo ligeiramente diferente é esperado.

### 4. Ideias-chave (máx. 7)

1. **Acesso e material:** Looker com conta Gmail do aluno Infnet; arquivos da disciplina em Infnet Online > Documentos > pasta da disciplina (inclui roteiro e link do CSV).
2. **Relatório em branco e fonte de dados:** Ao criar "Relatório em branco", o Looker pede uma fonte. Para arquivo CSV no computador: conector **Upload de arquivo CSV** (não Google Planilhas na Etapa 1).
3. **Obter Ch1_ExampleCSV:** Link no roteiro (GitHub raw). Criar arquivo .csv no Windows (renomear .txt para .csv; mostrar extensões no Explorer se necessário); abrir link no navegador, copiar todo o conteúdo; colar no Bloco de Notas no .csv e salvar.
4. **Estrutura do CSV:** Primeira linha = cabeçalho (nomes das colunas). Colunas separadas por vírgula ou ponto e vírgula. Exemplo: Product Name, Description, Flavor, Product Type, Number Sold.
5. **Upload e “Adicionar ao relatório”:** Em Upload de arquivo CSV: Adicionar arquivo → selecionar o .csv → Abrir. Se pedir nome do conjunto de dados, informar (ex.: Ch1_ExampleCSV). Depois: selecionar o arquivo carregado e clicar em **Adicionar** / **Adicionar ao relatório**. Escolher "Layout de formato livre".
6. **Record Count:** Coluna automática do Looker, não existe no CSV. Mostra a contagem de registros para cada valor da dimensão na tabela.
7. **Interface na nuvem:** Looker é ferramenta Google; botões e textos podem mudar entre versões (ex.: "Criar conjunto de dados para adicionar arquivos"). Seguir a lógica: carregar CSV → adicionar ao relatório → layout livre.

### 5. Conceitos essenciais — explicação operacional

#### 5.1 Onde acessar o Looker e o material

- **Definição:** Looker Studio: https://lookerstudio.google.com/navigation/reporting. Entrar com conta Gmail do aluno Infnet. Arquivos da disciplina: Infnet Online > guia Documentos > pasta da disciplina (Introdução à Visualização de Dados e SQL, professor Cadu).
- **Quando usar:** Sempre que for fazer relatório ou baixar roteiro/link do CSV.
- **Erro comum:** Usar Gmail pessoal; não achar os arquivos (procurar em Documentos, não só em Aulas).
- **Sinal de acerto:** Tela do Looker com seu usuário @...infnet; arquivos .txt e referência ao CSV visíveis na pasta da disciplina.

#### 5.2 Tela inicial do Looker Studio

- **Definição:** Após login: galeria de modelos (templates por nicho); área do organizador de relatórios (lista com nome, proprietário, última abertura, local); menu à esquerda (recentes, compartilhados, minha propriedade, lixeira, modelos); barra de pesquisa para filtrar relatórios. Dar **nome significativo** ao relatório (ex.: "Dashboard Vendas 03-02-2026").
- **Quando usar:** Para criar relatório novo ("Relatório em branco") ou abrir existente; para localizar relatórios por nome.
- **Erro comum:** Deixar relatório com nome genérico ("Relatório sem título") e depois não identificar.

#### 5.3 Obter o arquivo Ch1_ExampleCSV.csv

- **Definição:** O CSV está em https://raw.githubusercontent.com/Apress/google-data-studio-for-beginners/main/Ch1_ExampleCSV.csv. Como obter no PC: criar um arquivo com extensão .csv, abrir o link no navegador, copiar todo o conteúdo da página, colar no arquivo .csv (ex.: pelo Bloco de Notas), salvar.
- **Passo a passo (Windows):**
  1. No Explorer: Novo > Documento de texto. Renomear para `Ch1_ExampleCSV.csv`. Se a extensão não aparecer: menu ⋮ (ou Ferramentas) > Opções > guia Modo de exibição > desmarcar "Ocultar as extensões dos tipos de arquivos conhecidos" (inglês: "Hide extensions for known file types") > Aplicar > OK.
  2. Abrir o link no Chrome (ou outro navegador). Ctrl+A (selecionar tudo), Ctrl+C (copiar).
  3. Botão direito no arquivo Ch1_ExampleCSV.csv > Abrir com > Bloco de Notas. Ctrl+V (colar). Arquivo > Salvar. Fechar.
- **Erro comum:** Renomear para Ch1_ExampleCSV mas o Windows manter .txt (arquivo fica Ch1_ExampleCSV.csv.txt); abrir o .csv direto no Excel e tudo ir para uma coluna.
- **Sinal de acerto:** Arquivo .csv na pasta; ao abrir com Bloco de Notas, primeira linha com nomes separados por vírgula (Product Name, Description, ...).

#### 5.4 Estrutura do CSV (cabeçalho e separador)

- **Definição:** CSV = texto com linhas; primeira linha = cabeçalho (nomes das colunas); colunas separadas por vírgula ou ponto e vírgula. No Ch1_ExampleCSV: Product Name, Description, Flavor, Product Type, Number Sold. Linhas seguintes = dados (ex.: 11 linhas de dados).
- **Quando usar:** Para interpretar o que o Looker vai mostrar (cada cabeçalho vira campo disponível); para montar o próprio CSV no futuro.
- **Erro comum:** Confundir vírgula dentro de um valor (ex.: "Bolo, recheio") com separador de colunas; ter cabeçalhos duplicados.
- **Pegadinha de prova:** Perguntar "quantas colunas tem o Ch1_ExampleCSV?" — cinco colunas no cabeçalho; Record Count não é coluna do arquivo.

#### 5.5 Upload de arquivo CSV e Adicionar ao relatório

- **Definição:** No Looker, após "Relatório em branco", escolher **Upload de arquivo CSV**. Clicar em Adicionar arquivo (ou Arquivos > Adicionar arquivo), selecionar o .csv no PC, Abrir. Se aparecer "Criar um conjunto de dados para adicionar arquivos", informar um nome (ex.: Ch1_ExampleCSV). Depois: identificar o arquivo carregado e clicar em **Adicionar** (ou "Adicionar ao relatório"). Na janela que abrir, escolher **Layout de formato livre**. O Looker insere uma tabela padrão.
- **Quando usar:** Sempre que a fonte do relatório for um CSV local (Etapa 1).
- **Erro comum:** Clicar em Google Planilhas em vez de Upload de arquivo CSV; não clicar em "Adicionar ao relatório" após o upload; não encontrar o botão se a interface tiver mudado (procurar botão azul "Adicionar" / "Adicionar ao relatório").
- **Sinal de acerto:** Tabela aparece no canvas com uma coluna do CSV (ex.: Product Name) e coluna Record Count; painel de dados à direita mostra os campos do CSV.

#### 5.6 Record Count e tabela padrão

- **Definição:** **Record Count** é uma métrica automática do Looker Studio: conta quantos registros existem para cada valor da dimensão na tabela. Não é coluna do CSV. A tabela padrão usa uma dimensão (ex.: Product Name) e Record Count.
- **Quando usar:** Para interpretar a primeira visualização e para não confundir com coluna do arquivo.
- **Erro comum:** Achar que Record Count veio do CSV ou que "Number Sold" é o mesmo que Record Count (no exemplo, Number Sold existe no CSV e é diferente).
- **Critério verificável:** No painel de dados do Looker, Record Count aparece como campo do tipo métrica; os campos do CSV (Product Name, Number Sold, etc.) vêm da fonte "Upload de arquivo CSV".

#### 5.7 Extensão do arquivo no Windows

- **Definição:** A **extensão** (ex.: .csv, .txt) indica o tipo do arquivo. Por padrão o Windows pode ocultar extensões. Para renomear corretamente para .csv, é preciso que a extensão esteja visível ou que o nome completo seja `Ch1_ExampleCSV.csv`.
- **Onde configurar:** Explorer > menu ⋮ (ou Ferramentas) > Opções > Modo de exibição > desmarcar "Ocultar as extensões dos tipos de arquivos conhecidos".
- **Erro comum:** Arquivo fica como "Ch1_ExampleCSV.csv" na interface mas na verdade é .txt (nome completo Ch1_ExampleCSV.csv.txt); o Looker pode não listar ou não reconhecer.
- **Em inglês:** "Hide extensions for known file types" — deve estar **desmarcado** para mostrar .csv.

### 6. Procedimento / execução

**Passo 1 – Obter Ch1_ExampleCSV.csv**
1. No Windows Explorer: Novo > Documento de texto. Renomear para `Ch1_ExampleCSV.csv` (se não vir .csv, ativar exibição de extensões em Opções > Modo de exibição).
2. Abrir no navegador: https://raw.githubusercontent.com/Apress/google-data-studio-for-beginners/main/Ch1_ExampleCSV.csv . Selecionar todo o conteúdo (Ctrl+A), copiar (Ctrl+C).
3. Botão direito no Ch1_ExampleCSV.csv > Abrir com > Bloco de Notas. Colar (Ctrl+V). Arquivo > Salvar. Fechar.

**Passo 2 – Criar relatório no Looker Studio**
1. Acessar https://lookerstudio.google.com/navigation/reporting com conta Gmail do aluno Infnet.
2. Clicar em "Relatório em branco" (ou "Criar" > Relatório em branco).
3. Na tela "Adicionar dados ao relatório": escolher **Upload de arquivo CSV**.
4. Adicionar arquivo: clicar em "Adicionar arquivo" (ou Arquivos > Adicionar arquivo). Se pedir nome do conjunto de dados, informar (ex.: Ch1_ExampleCSV). Selecionar o arquivo Ch1_ExampleCSV.csv no PC, Abrir.
5. Após o carregamento: selecionar o arquivo listado e clicar em **Adicionar** (ou "Adicionar ao relatório"). Escolher **Layout de formato livre**.
6. Dar um nome ao relatório (ex.: "Meu primeiro relatório" ou nome significativo).

**Erro típico:** Interface diferente (Google atualiza o Looker); procurar o botão que confirma a adição da fonte ao relatório (ex.: "Adicionar ao relatório") e o layout livre. **Sinal de acerto:** Tabela no canvas com coluna do CSV (ex.: Product Name) e coluna Record Count; campos do CSV visíveis no painel de dados.

### 7. Exemplos relevantes

- **Link do CSV:** https://raw.githubusercontent.com/Apress/google-data-studio-for-beginners/main/Ch1_ExampleCSV.csv
- **Cabeçalho Ch1_ExampleCSV:** Product Name, Description, Flavor, Product Type, Number Sold.
- **Nome do relatório (TP1):** Conforme enunciado (ex.: "Meu primeiro relatório").
- **Conjunto de dados:** Se o Looker pedir nome ao adicionar arquivo, usar por exemplo "Ch1_ExampleCSV" ou o nome do arquivo.

### 8. Diferenças e confusões comuns

- **Upload de arquivo CSV vs Google Planilhas:** Etapa 1 = CSV local (Upload de arquivo CSV). Etapa 2 = Google Planilhas. Não usar Planilhas para o TP1 com CSV.
- **Record Count vs Number Sold:** Record Count é métrica automática do Looker (contagem de linhas). Number Sold é coluna do CSV (quantidade vendida). Podem coincidir ou não conforme os dados.
- **Abrir .csv no Excel direto vs Bloco de Notas / Obter dados:** Abrir com duplo clique pode colocar tudo em uma coluna. Para editar o conteúdo: Bloco de Notas. Para ver em colunas no Excel: Dados > Obter dados de arquivo de texto/CSV (ou equivalente).

### 9. Como cai em prova

- Passos para obter Ch1_ExampleCSV a partir do link (criar .csv, copiar do navegador, colar no Bloco de Notas).
- Onde configurar no Windows para mostrar extensão dos arquivos (Opções do Explorer, Modo de exibição, desmarcar ocultar extensões).
- Qual conector usar no Looker para CSV local (Upload de arquivo CSV).
- O que é Record Count (coluna automática do Looker, contagem de registros).
- Nome das colunas do Ch1_ExampleCSV (Product Name, Description, Flavor, Product Type, Number Sold).
- O que fazer se aparecer "Criar conjunto de dados" (informar um nome).
- Por que abrir .csv direto no Excel pode dar errado (separador não reconhecido, tudo em uma coluna).

### 10. Pontos de atenção

- Usar sempre conta Gmail do aluno Infnet no Looker.
- Garantir que o arquivo termine em .csv (ver extensão no Explorer).
- Não confundir Upload de arquivo CSV com Google Planilhas.
- Após o upload, clicar em Adicionar/Adicionar ao relatório; a interface pode variar (botão azul, texto "Adicionar ao relatório").
- Looker é ferramenta na nuvem; botões e textos podem mudar — seguir a lógica (carregar CSV → adicionar ao relatório → layout).
- Dar nome significativo ao relatório (exigido no TP1).

### 11. Checklist de domínio

- [ ] Sei acessar o Looker Studio com a conta Infnet e onde ficam os arquivos da disciplina (Documentos).
- [ ] Sei listar os passos para obter Ch1_ExampleCSV.csv (criar .csv, copiar do link, colar no Bloco de Notas).
- [ ] Sei configurar o Windows para mostrar extensões (Opções do Explorer > Modo de exibição > desmarcar ocultar extensões).
- [ ] Sei qual conector usar para CSV local (Upload de arquivo CSV) e o fluxo Adicionar arquivo → Adicionar ao relatório → Layout de formato livre.
- [ ] Sei explicar o que é Record Count (métrica automática do Looker) e citar as colunas do Ch1_ExampleCSV.
- [ ] Sei o que fazer se aparecer "Criar conjunto de dados" (informar nome).
- [ ] Sei por que abrir .csv direto no Excel pode colocar tudo em uma coluna (separador).
