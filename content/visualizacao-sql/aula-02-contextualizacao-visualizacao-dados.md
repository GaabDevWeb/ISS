---
title: "Contextualização e visualização de dados"
slug: "contextualizacao-visualizacao-dados"
discipline: "visualizacao-sql"
order: 2
description: "Onde os dados ficam, dashboard e BI, profissões de dados, qualidade e início da jornada."
exercises:
  - question: "Onde os dados da empresa podem estar para alimentar um dashboard?"
    answer: "Em arquivo (ex.: CSV), em banco de dados, ou em ambientes de big data (dados semiestruturados ou sem estrutura definida)."
    hint: "Três tipos de origem."
  - question: "O que é um filtro em um dashboard e dê dois exemplos."
    answer: "Filtro é critério que restringe o que é exibido no dashboard. Exemplos: filtro por região (estado), por faixa de valor da compra, por data, por modelo do produto."
    hint: "Restringir o que aparece na tela."
  - question: "Por que se diz que 60–70% dos problemas estão nos dados de entrada?"
    answer: "Porque o processo de pegar o dado na origem, transformar e disponibilizar no dashboard consome a maior parte do esforço e das falhas; dados errados ou mal preparados levam a decisões erradas."
    hint: "Onde está a maior parte do trabalho e dos erros."
  - question: "Qual a diferença entre engenheiro de dados, cientista de dados e analista de dados (visão da aula)?"
    answer: "Engenheiro de dados: monta ambiente, pipelines, extrai/transforma/carrega (ETL). Cientista de dados: usa os dados, analisa, pode usar IA e algoritmos. Analista de dados: analisa coerência do dado com o negócio e as visões geradas."
    hint: "Quem monta; quem modela/IA; quem valida e analisa."
  - question: "O que significa BI e por que a qualidade do dado importa no dashboard?"
    answer: "BI = Business Intelligence (inteligência de negócio). O dado deve ser de qualidade, preciso e adequado ao propósito; dado errado ou com viés leva a decisão errada do gestor."
    hint: "Sigla em inglês; consequência de dado errado."
  - question: "Pode usar dados da empresa em TCC ou dissertação sem autorização?"
    answer: "Não. Só pode usar dados da empresa com autorização da empresa; usar sem autorização pode gerar responsabilização do aluno e da instituição."
    hint: "Autorização prévia."
  - question: "Onde ficam os arquivos da disciplina (roteiro e Etapa 1) no Infnet Online?"
    answer: "Na guia 'Documentos', dentro da pasta da disciplina (Introdução à Visualização de Dados e SQL / professor). Na guia 'Trilhas' está o conteúdo de estudo e links para a biblioteca (ex.: O'Reilly)."
    hint: "Documentos vs Trilhas."
---
## Resumo

- **Onde os dados ficam:** Arquivo (ex.: CSV), banco de dados ou big data (semi/não estruturado). Dashboard consome dados dessas origens, muitas vezes após transformação (ETL).
- **Dashboard e decisão:** Mostra informações para tomada de decisão; usa filtros (região, valor, data, modelo, etc.); associa negócio aos dados; BI (Business Intelligence) apoia gestores.
- **Dado é o início da jornada:** 60–70% dos problemas estão nos dados de entrada; é preciso paciência para entender os dados e evitar achismo; documentação e exemplos podem ser confusos.
- **Profissões:** Engenheiro de dados (ambiente, ETL), cientista de dados (análise, algoritmos, IA), analista de dados (validar coerência com negócio). Subdivisões: arquiteto de dados, ETL, Data Analytics. Na prática, funções podem se sobrepor conforme a empresa.
- **Visualização de dados:** Contar história, levar o público em jornada, entender dados e obter insights; desenvolvedor de dados cria visualizações para tomada de decisão; dado deve ser de qualidade, preciso e adequado ao propósito.
- **Uso de dados vs instinto:** Ideal é juntar quem depende de dados e quem usa experiência/instinto; quando o instinto falha, recorre-se ao dado; prioridade do dado quando é necessário entender melhor o negócio.
- **Infnet Online:** Documentos = arquivos da disciplina (download); Trilhas = conteúdo de estudo e links para livros (ex.: O'Reilly); vídeo e transcrição da aula anterior disponíveis.
- **Aspecto legal:** Decisões e sistemas devem se basear na lei; uso de dados da empresa em trabalho acadêmico exige autorização.

**Resumo em 5 linhas:** Dados em arquivo, BD ou big data; dashboard com filtros para decisão; BI; 60–70% dos problemas nos dados de entrada. Profissões: engenheiro, cientista e analista de dados (funções podem sobrepor). Qualidade e adequação do dado são essenciais; dado errado gera decisão errada. Infnet: Documentos (arquivos), Trilhas (estudo). Uso de dado da empresa em TCC/dissertação só com autorização.

**Palavras-chave:** CSV, banco de dados, big data, dashboard, filtro, BI, Business Intelligence, dado de entrada, ETL, engenheiro de dados, cientista de dados, analista de dados, desenvolvedor de dados, qualidade do dado, Infnet Online, Documentos, Trilhas, O'Reilly.

---

## Explicações

### 1. Tema e escopo

- **Tema:** Contextualização da visualização de dados: onde os dados ficam, papel do dashboard na tomada de decisão, profissões da área, qualidade dos dados e “dado como início da jornada”. Acesso a material no Infnet Online (Documentos, Trilhas).
- **Problema que resolve:** Dar base conceitual antes da prática no Looker Studio; evitar confusão entre origens de dados, papéis (quem monta vs quem analisa) e risco de decisão errada por dado de má qualidade ou uso indevido de dados.
- **Inclui:** Origens de dados (arquivo, BD, big data); dashboard e filtros; BI; 60–70% problemas nos dados de entrada; profissões (engenheiro, cientista, analista de dados e subdivisões); visualização como história/jornada/insight; qualidade e adequação do dado; uso de dados vs instinto; Infnet Documentos e Trilhas; aspecto legal (lei, autorização para dados da empresa).
- **Não inclui:** Passo a passo no Looker Studio (ficou para a próxima aula); detalhe de ETL ou big data.

### 2. Contexto na disciplina

- Segunda aula da Etapa 1 (primeira semana de conteúdo). Complementa a Aula 1 (roteiro e introdução) com conceitos necessários para entender por que visualizar dados e onde eles vêm antes de criar o primeiro relatório com CSV no Looker.
- Pré-requisitos: Aula 1 (acesso Infnet, TP/AT, roteiro).
- Dependências futuras: Prática no Looker com CSV na aula seguinte; métricas e dimensões na Etapa 2; qualidade do dado reaparece na preparação de dados (Etapa 3).

### 3. Visão conceitual geral

A aula é conceitual: explica que os dados podem estar em arquivo (CSV), banco de dados ou big data; que o dashboard serve para decisão (com filtros) e que a BI apoia o negócio; que a maior parte dos problemas está nos dados de entrada; e que existem papéis diferentes (engenheiro, cientista, analista de dados), mas que na prática as empresas podem misturar funções. Reforça qualidade e adequação do dado e o cuidado legal (lei, autorização para uso de dados da empresa). Não há procedimento técnico de ferramenta nesta aula.

### 4. Ideias-chave (máx. 7)

1. **Três origens de dados para dashboard:** Arquivo (ex.: CSV), banco de dados e big data (semiestruturado ou não estruturado). O dashboard consome dados dessas origens, muitas vezes após transformação.
2. **Dashboard e filtros:** Dashboard mostra informações para tomada de decisão. Filtros restringem o que é exibido (ex.: região, faixa de valor, data, modelo). Gestor analisa e toma decisão; decisão errada pode vir de dado errado.
3. **60–70% dos problemas nos dados de entrada:** Do processo “pegar na origem → transformar → disponibilizar no dashboard”, a maior parte do esforço e das falhas está nos dados de entrada. É preciso analisar e entender os dados; evitar achismo.
4. **BI (Business Intelligence):** Inteligência de negócio; uso de dados para apoiar decisões. Não é só TI: marketing, administração e outras áreas usam. Dashboard e BI podem ter impacto vital no negócio (sucesso ou insucesso).
5. **Profissões de dados:** Engenheiro de dados (ambiente, ETL); cientista de dados (análise, algoritmos, IA); analista de dados (validar coerência com negócio). Subdivisões: arquiteto de dados, profissional de ETL, Data Analytics. Dependendo da empresa, uma pessoa pode acumular mais de um papel.
6. **Qualidade e adequação do dado:** O dado deve ser de qualidade, preciso e adequado ao propósito do dashboard. Dado com viés ou errado leva a decisão errada; quem monta a visualização é “desenvolvedor de dados” no sentido de desenvolver/analisar o dado como merece.
7. **Infnet Online e aspecto legal:** Documentos = arquivos da disciplina; Trilhas = conteúdo e links (ex.: O'Reilly). Uso de dados da empresa em TCC/dissertação só com autorização; decisões e sistemas devem se basear na lei.

### 5. Conceitos essenciais — explicação operacional

#### 5.1 Onde os dados podem estar

- **Definição:** Os dados que alimentam um dashboard podem vir de: (1) arquivo, ex.: CSV; (2) banco de dados; (3) big data (grandes volumes, semiestruturados ou sem estrutura definida).
- **Quando usar:** Para planejar de onde puxar os dados e que tipo de transformação/carga (ETL) será necessário antes de visualizar.
- **Erro comum:** Assumir que “o dado nasceu pronto”; na prática há análise e preparação na origem.
- **Critério verificável:** Saber citar as três origens e dar exemplo de cada uma.

#### 5.2 Dashboard e filtros

- **Definição:** Dashboard é a tela de visualização de dados para apoio à decisão. Filtro é o critério que restringe o que é mostrado (ex.: só uma região, um período, uma faixa de valor).
- **Quando usar:** Ao desenhar ou usar um relatório: definir quais filtros o negócio precisa (região, data, valor, modelo, etc.).
- **Exemplo (aula):** Vendas Toyota no Brasil; filtros: região (UF), valor da compra, data, modelo do veículo. Gerente analisa e toma decisão (o que vende mais/menos, por que em uma região vende mais que em outra).
- **Erro comum:** Montar dashboard sem falar com o negócio e sem filtros úteis; ou confundir “mostrar tudo” com “decisão informada”.

#### 5.3 Dado como início da jornada (60–70% nos dados de entrada)

- **Definição:** Estima-se que 60–70% dos problemas em projetos de dados estejam na etapa de dados de entrada (origem, qualidade, entendimento). Encontrar os dados é só o início; é preciso paciência para entender, documentação pode ser confusa.
- **Quando usar:** Ao planejar tempo e esforço em um projeto de visualização ou análise; ao explicar por que “olhar os dados” antes de confiar em números.
- **Erro comum:** Subestimar o tempo de preparação e validação dos dados; tomar decisão só por “achismo” sem comprovar com o dado.
- **Sinal de acerto:** Antes de montar o dashboard, analisar se os dados estão completos, coerentes e adequados ao propósito.

#### 5.4 Profissões: engenheiro, cientista e analista de dados

- **Definição (visão da aula):** Engenheiro de dados: monta ambiente, pipelines, ETL (extrair, transformar, carregar). Cientista de dados: usa os dados, modelos, algoritmos, IA. Analista de dados: analisa coerência do dado com o negócio e as visões geradas. Subdivisões em algumas empresas: arquiteto de dados, profissional de ETL, Data Analytics.
- **Quando usar:** Para se posicionar no mercado e para entender quem faz o quê em um projeto; em empresas menores, uma pessoa pode acumular funções.
- **Erro comum:** Achar que toda empresa tem todos os papéis separados; em muitas há sobreposição ou apenas um tipo de atuação.
- **Pegadinha de prova:** Diferenciar “quem monta o ambiente/ETL” (engenheiro) de “quem analisa e valida o resultado” (analista) e “quem aplica modelos/IA” (cientista).

#### 5.5 Qualidade do dado e desenvolvedor de dados

- **Definição:** O dado deve ser de qualidade, preciso e adequado ao propósito do dashboard. “Desenvolvedor de dados” (termo do material): quem desenvolve a visualização e analisa o dado como merece; impacto no negócio pode ser vital (sucesso ou insucesso).
- **Quando usar:** Ao validar fontes antes de publicar um relatório; ao explicar por que não se deve confiar em número sem checagem.
- **Erro comum:** Usar dado sem checar completude, viés ou erro; decisão do gestor baseada em dado errado.
- **Critério verificável:** Saber que “qualidade, preciso e adequado ao propósito” são os três requisitos citados na aula.

#### 5.6 Uso de dados vs instinto

- **Definição:** Há quem dependa mais dos dados (ex.: orçamento) e quem use mais experiência e instinto. A prioridade do dado aparece quando é necessário entender melhor o negócio; o ideal é juntar os dois mundos. Quando o instinto falha, recorre-se ao dado.
- **Quando usar:** Para explicar por que dashboards e BI existem (complementar experiência com evidência) e por que a linguagem do dashboard deve ser entendida pelo negócio.
- **Erro comum:** Decidir só por instinto quando dados existem e poderiam evitar erro; ou ignorar o conhecimento do negócio ao montar a visualização.

#### 5.7 Infnet Online: Documentos e Trilhas

- **Definição:** No Infnet Online, na disciplina: **Documentos** = pasta com arquivos da disciplina (ex.: roteiro .txt, Disciplina Etapa 1); pode baixar. **Trilhas** = conteúdo de estudo e links para material (ex.: biblioteca O'Reilly); vídeo e transcrição da aula anterior também disponíveis.
- **Quando usar:** Para localizar o arquivo da Etapa 1 e o passo a passo; para estudar pela trilha e acessar livros.
- **Erro comum:** Procurar arquivos em “Aulas” em vez de “Documentos”; confundir Trilhas (estudo) com entrega de TP (que é em “Entrega de trabalhos”).

#### 5.8 Aspecto legal

- **Definição:** Decisões e sistemas devem se basear na lei; o que for contra a lei não se faz. Para usar dados da empresa em TCC, dissertação ou tese, é necessária autorização da empresa; uso sem autorização pode gerar responsabilização do aluno e da instituição. Desenvolvedor pode ser coautor em problemas jurídicos se o sistema ferir a lei (ex.: fraude).
- **Quando usar:** Ao planejar uso de dados reais em trabalho acadêmico; ao avaliar pedidos do empregador que envolvam burlar regras.
- **Erro comum:** Usar dados da empresa em trabalho de conclusão sem autorização; aceitar desenvolver funcionalidade que viole a lei.

### 6. Procedimento / execução

Não há procedimento técnico nesta aula. O passo a passo de entrar no Looker Studio e criar relatório com CSV foi adiado para a próxima aula (terça-feira). Procedimentos de acesso ao Infnet (Documentos, Trilhas) estão descritos no item 5.7.

### 7. Exemplos relevantes

- **Origens:** CSV para Etapa 1; banco de dados para sistemas corporativos; big data para volumes grandes e/ou semiestruturados (vídeo, áudio).
- **Filtros:** Vendas por estado; compras entre R$ 300 e R$ 600; período jan/2025 a jan/2026; modelo do veículo.
- **Profissões:** Empresa que monta ambiente na AWS → engenheiro de dados; quem roda modelos de IA em cima dos dados → cientista; quem valida se os números batem com o negócio → analista.
- **60–70%:** Projeto em que a maior parte do tempo foi gasto limpando e validando a base de origem antes de conseguir montar o dashboard.

### 8. Diferenças e confusões comuns

- **Dashboard vs fonte de dados:** Dashboard é a tela de visualização; fonte é de onde vêm os dados (CSV, BD, big data). Não confundir “onde está o relatório” com “onde estão os dados brutos”.
- **Engenheiro vs cientista vs analista:** Engenheiro foca em ambiente e fluxo de dados (ETL); cientista em modelos e análise avançada/IA; analista em coerência com negócio e leitura das visões. Na prática há sobreposição.
- **Documentos vs Trilhas (Infnet):** Documentos = arquivos para download (roteiro, etapa); Trilhas = trilha de aprendizado e links para livros/vídeos.

### 9. Como cai em prova

- Perguntas sobre onde os dados podem estar (arquivo, BD, big data).
- O que é filtro e exemplos.
- Por que 60–70% dos problemas estão nos dados de entrada.
- Diferença entre engenheiro, cientista e analista de dados (e subdivisões como ETL, Data Analytics).
- O que é BI; por que qualidade do dado importa.
- Onde ficam os arquivos da disciplina no Infnet (Documentos) e o que são Trilhas.
- Uso de dados da empresa em TCC/dissertação (autorização); decisão baseada na lei.

### 10. Pontos de atenção

- Não subestimar a etapa de dados de entrada; analisar e entender os dados antes de confiar no dashboard.
- Não usar dados da empresa em trabalho acadêmico sem autorização.
- Não desenvolver ou aceitar desenvolver solução que viole a lei; responsabilidade pode ser compartilhada.
- Ao montar dashboard, usar linguagem que o negócio entenda e validar com o usuário (entrevistas, confirmação após montar).
- Documentação e exemplos podem ser confusos; ter paciência e cruzar fontes.

### 11. Checklist de domínio

- [ ] Sei citar as três origens de dados (arquivo, BD, big data) e dar exemplo.
- [ ] Sei explicar o que é filtro em dashboard e dar dois exemplos.
- [ ] Sei explicar por que 60–70% dos problemas estão nos dados de entrada.
- [ ] Sei diferenciar engenheiro de dados, cientista de dados e analista de dados (e subdivisões quando existem).
- [ ] Sei definir BI e a importância de qualidade, precisão e adequação do dado.
- [ ] Sei onde ficam os arquivos da disciplina (Documentos) e o que são Trilhas no Infnet Online.
- [ ] Sei explicar a regra de autorização para usar dados da empresa em TCC/dissertação e que decisões devem se basear na lei.
