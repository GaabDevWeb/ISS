---
title: "Introdução à Programação com Python"
slug: "introducao"
discipline: "python"
order: 1
description: "Apresentação da disciplina, processo de aprendizagem e visão geral da linguagem Python"
exercises:
  - question: "Segundo a pirâmide de William Glasser, qual o índice de retenção ao apenas assistir uma palestra? O que aumenta a retenção?"
    answer: "Apenas 5%. A retenção aumenta com leitura (10%), áudio-visual (20%), demonstração (30%), discussão em grupo (50%), prática (75%) e ensinar outros (90%). Por isso é essencial praticar e revisar."
  - question: "Qual a diferença entre curva do aprendizado e curva do esquecimento? Como atrasar o esquecimento?"
    answer: "Curva do aprendizado: proficiência cresce com tentativas (início lento → aceleração → platô). Curva do esquecimento (Ebbinghaus): retenção cai com o tempo (ex.: ~70% em 10 min, ~20% em 24 h sem revisão). Atrasamos com revisões espaçadas (horas depois, 24 h, 1 semana, 1 mês) e prática."
  - question: "Os TPs são obrigatórios? Eles influenciam a nota final?"
    answer: "Os TPs não são obrigatórios e não geram nota. Porém são pré-requisitos para fazer o AT: sem entregar os TPs, o aluno não pode fazer o AT. Servem como preparação e treino (TP1 = etapas 1–2, TP2 = 3–4, TP3 = 5–6; AT abrange tudo)."
  - question: "O que acontece se entregar o AT ou um TP atrasado?"
    answer: "Entrega atrasada impede o conceito máximo (equivalente a 10), mesmo que o trabalho esteja perfeito. O sistema acadêmico do Infnet aplica essa regra automaticamente. Entregar no prazo só garante a possibilidade de nota máxima."
  - question: "Python tem tipagem dinâmica e forte. O que isso significa na prática?"
    answer: "Dinâmica: não é preciso declarar o tipo da variável; o interpretador identifica em tempo de execução. Forte: só permite operações entre tipos compatíveis — não dá para somar número com string; a linguagem protege contra isso."
  - question: "Quem criou o Python, em que ano e de onde vem o nome?"
    answer: "Criada por Guido van Rossum em 1991. O nome vem do seriado britânico Monty Python (não da serpente). Foi pensada para matemática simbólica e problemas de matemática aplicada."
  - question: "Quais conceitos definem aprovação na disciplina? O que é DNL?"
    answer: "Avaliação é por competência (conceitos). DNL = demonstrou com louvor máximo (equivalente a 10). Há ainda DM (equivalente a 8) e ND = não demonstrou (reprovação). O AT é a atividade que define o conceito."
---

## Resumo

- **Disciplina:** Introdução à Programação com Python (bloco Fundamentos de Processamento de Dados, Instituto Infnet). Objetivo: apresentar o universo da ciência da computação e dar os primeiros passos com Python (programas simples, strings, decisões, laços, modularização).
- **Processo de aprendizagem:** Na EaD o aluno é o ator principal; só se aprende programando (prática, erro, revisão). Pirâmide de Glasser: só assistir retém ~5%; prática e ensinar elevam a retenção (até ~90%). Curva do aprendizado: início lento → aceleração → platô. Curva do esquecimento (Ebbinghaus): retenção cai com o tempo; revisões espaçadas atrasam a queda.
- **Avaliação:** Por competência. Cronograma trimestral: 11 semanas; semanas 1–9 = conteúdo; semana 10 = entrega do AT; semana 11 = reentrega do AT. Três TPs (não obrigatórios, sem nota, mas pré-requisitos para o AT): TP1 até 16/02, TP2 até 02/03, TP3 até 16/03. AT obrigatório até 31/03. Entrega atrasada = sem conceito máximo. Atividades individuais.
- **Python:** Linguagem de alto nível (1991, Guido van Rossum), nome inspirado em Monty Python. Multiplataforma, multiparadigma, tipagem dinâmica e forte, interpretada ou compilável, open source. Fácil aprendizado, sintaxe limpa, comunidade e documentação fortes, biblioteca padrão grande. TIOBE: líder de popularidade. Usada em desktop, dados, IA/ML, web, APIs, scripts, etc. Não é “bala de prata”.
- **Resumo em 5 linhas:** (1) A disciplina introduz à programação com Python no Infnet. (2) Aprendizado exige prática, revisão e participação ativa; só assistir retém pouco. (3) Avaliação por competência: TPs são pré-requisitos do AT; AT define o conceito; atraso corta nota máxima. (4) Python é linguagem de alto nível, multiplataforma, tipagem dinâmica e forte, muito usada em dados e desenvolvimento. (5) Primeira versão do Google foi escrita em Python; hoje é topo do TIOBE.
- **Palavras-chave:** Python, introdução à programação, pirâmide de Glasser, curva do aprendizado, curva do esquecimento, avaliação por competência, AT, TP, cronograma trimestral, tipagem dinâmica e forte, TIOBE, pensamento computacional.

## Explicações

### 1. Tema e escopo

**Tema:** Primeira aula da disciplina Introdução à Programação com Python: apresentação do curso, do processo de aprendizagem em EaD, do sistema de avaliação (cronograma, TPs, AT) e visão geral da linguagem Python (origem, características, aplicações).

**Problema que resolve:** Dar ao aluno critérios claros de como estudar (prática, revisão), quando entregar cada atividade e o que esperar da linguagem, para organizar a rotina e evitar erro de interpretação das regras.

**Inclui:** Objetivos da disciplina, bibliografia, pirâmide de aprendizagem (Glasser), curva do aprendizado, curva do esquecimento (Ebbinghaus), cronograma de 11 semanas, avaliação por competência (TPs e AT), datas de entrega, conceitos (DNL, DM, ND), por que programar, o que é Python, por que Python, aplicações, índice TIOBE, exemplo de relógio com tkinter, quem usa Python (Google, USP, etc.).  
**Não inclui:** Instalação de Python/IDE (próxima aula), desenvolvimento passo a passo dos TPs/AT, sintaxe de código.

### 2. Contexto na disciplina

- Primeira disciplina do bloco de Fundamentos de Processamento de Dados no Instituto Infnet.
- Pré-requisito assumido: nenhum (parte do zero).
- Dependências futuras: toda a disciplina de Python e o uso de Python em outras disciplinas (ex.: projeto de bloco, dados).

### 3. Visão conceitual geral

A aula é introdutória e híbrida (conceitual + metodológica): estabelece *como* estudar (papel ativo do aluno, prática, revisão), *como* a disciplina é avaliada (competência, TPs, AT, prazos) e *o que* é Python (origem, características, onde se usa). Não há execução de código em sala; o exemplo do relógio serve apenas para ilustrar que com pouco código se pode gerar uma aplicação.

### 4. Ideias-chave (máx. 7)

1. **Aluno como ator principal na EaD** — Quem busca conteúdo, define rotina e pratica é o aluno; o professor orienta. Flexibilizar horário não significa “estudar a qualquer hora” sem planejamento; sem rotina, o conteúdo acumula e a curva do esquecimento domina.
2. **Pirâmide de Glasser** — Só assistir retém ~5%; leitura, áudio-visual e demonstração aumentam um pouco; discussão, prática e ensinar elevam muito (até ~90%). Revisão e “colocar a mão na massa” são necessários para reter.
3. **Curva do aprendizado** — Proficiência sobe com tentativas: início lento, depois aceleração, depois platô. Em programação isso só vem com prática e repetição; não se aprende só vendo ou copiando código.
4. **Curva do esquecimento (Ebbinghaus)** — Sem revisão, a retenção cai (ex.: ~70% em 10 min, ~20% em 24 h). Revisões em intervalos (horas, 24 h, 1 semana, 1 mês) fazem a curva “subir” de novo e retardam o esquecimento.
5. **TPs não são obrigatórios nem dão nota, mas são pré-requisitos do AT** — Quem não entrega os TPs não pode fazer o AT. TPs preparam por etapas (1–2, 3–4, 5–6); o AT abrange todo o conteúdo. Entregar atrasado (TP ou AT) impede conceito máximo.
6. **Python: tipagem dinâmica e forte** — Não se declara tipo; o interpretador define em tempo de execução (dinâmica). Operações só entre tipos compatíveis (forte); ex.: não se soma número com string.
7. **Python não é bala de prata** — Linguagem muito usada (TIOBE, Google, ensino), com biblioteca padrão grande e aplicações em dados, web, IA, scripts; ainda assim não resolve todos os problemas da forma mais eficiente possível. Boa linguagem de partida.

### 5. Conceitos essenciais — explicação operacional

#### Avaliação por competência

- **Definição operacional:** O Infnet usa conceitos (ex.: DNL, DM, ND) em vez de nota numérica; o AT é a atividade que define se o aluno demonstrou ou não a competência.
- **Quando importa:** Na decisão de fazer TPs no prazo e de entregar o AT no prazo para não perder o conceito máximo.
- **Conceitos citados na aula (manual do aluno):** DNL = demonstrou com louvor máximo (equivalente a 10); DM = equivalente a 8; ND = não demonstrou (reprovação). Detalhes completos estão no manual do aluno.
- ❌ **Erro comum:** Achar que “TP não é obrigatório” significa que pode pular e ainda fazer o AT. Sem TPs entregues, não há acesso ao AT.
- ⚠️ **Pegadinha:** Entregar antes do prazo não “dá nota extra”; só garante a *possibilidade* de conceito máximo. Entregar atrasado, mesmo com trabalho perfeito, remove essa possibilidade.

#### Cronograma trimestral (11 semanas)

- **Estrutura:** Semanas 1–9 = conteúdo (etapas 1 a 7/9, conforme slide); semana 10 = entrega do AT; semana 11 = reentrega do AT e dúvidas.
- **Como usar:** Marcar datas de TPs (16/02, 02/03, 16/03) e AT (31/03); planejar estudo para não acumular e para conseguir fazer os TPs como treino antes do AT.

#### Pirâmide de aprendizagem (William Glasser)

- **Formas de transmissão × retenção (slide):** Assistir palestra 5%, leitura 10%, áudio-visual 20%, demonstração 30%, discussão em grupo 50%, praticar 75%, ensinar outros 90%.
- **Aplicação:** Complementar a aula com leitura, prática (digitar código, fazer exercícios) e, quando possível, discussão ou explicar para outros; evita ficar só nos 5% da palestra.

#### Curva do aprendizado

- **Ideia:** Gráfico (eixo horizontal = tentativas/tempo; vertical = proficiência): início lento, depois aceleração, depois platô.
- **Aplicação:** Não desanimar no início lento; a proficiência em programação vem com repetição e prática.

#### Curva do esquecimento (Ebbinghaus)

- **Ideia:** Retenção cai com o tempo se não houver revisão. Revisões em intervalos (horas, 24 h, 1 semana, 1 mês) reerguem a retenção.
- **Aplicação:** Revisar conteúdo e refazer exercícios em intervalos; não deixar tudo para a véspera do AT.

#### Python — o que é (origem e características)

- **Origem:** Criada por Guido van Rossum em 1991; nome do seriado Monty Python (não da serpente).
- **Características (slide/transcrição):** Linguagem de alto nível (VHLL); multiplataforma (Unix, Windows, etc.); multiparadigma (orientada a objetos, funcional, procedural, etc.); tipagem dinâmica e forte; interpretada ou compilável; open source (GLP).
- **Tipagem dinâmica e forte:** Dinâmica = tipo definido em tempo de execução, sem declaração explícita. Forte = não permite operar tipos incompatíveis (ex.: número + string).
- **Por que Python (slide/transcrição):** Fácil aprendizado, sintaxe limpa, comunidade e documentação fortes, biblioteca padrão enorme, divertida, “mais com menos código”, liberdade. TIOBE (jan/2026): Python no topo há anos.
- **Aplicações citadas:** Desktop, análise de dados, automação, visualização, IA, prototipação, machine learning, desenvolvimento web, matemática, pipelines de dados, scripts de sistema, criação de APIs. Empresas/instituições: Google (primeira versão do buscador em Python), Apple, Microsoft, NASA, Disney, Dropbox, USP, MIT, etc.
- **Citação Peter Norvig (slide):** Python tem sido parte importante do Google desde o início; procuram pessoas com habilidade na linguagem.

#### Exemplo do relógio (tkinter)

- **Função na aula:** Ilustrar que com um programa curto em Python (tkinter + `strftime`) se pode ter uma janela de relógio digital. Código não foi detalhado na aula; fica como motivação. Execução: `python clock.py` (ou nome do arquivo usado).
- **Não coberto no material:** Passo a passo da escrita do código; instalação do Python/IDE (próxima aula).

### 6. Procedimento / execução

- **Cronograma e datas:** Anotar 11 semanas; conteúdo até semana 9; TP1 16/02, TP2 02/03, TP3 16/03, AT 31/03; reentrega AT na semana 11.
- **TPs:** Não são liberados todos no início; prazos de entrega são os indicados. Entregar no prazo para não perder conceito máximo; TPs são pré-requisitos para o AT.
- **AT:** Obrigatório; individual; define o conceito; entrega atrasada elimina conceito máximo. Reentrega na semana 11 tem regras no manual (prazo específico).
- **Evidência de acerto:** Saber explicar o cronograma, o papel dos TPs e do AT, e as consequências de atraso; ter as datas salvas.

Não coberto nesta aula: procedimento detalhado de como desenvolver e enviar cada TP e o AT (próxima aula).

### 7. Exemplos relevantes

- **Pirâmide de Glasser:** Slide com percentuais (5% a 90%) — fixa a necessidade de prática e revisão.
- **Curva do esquecimento:** Slide com curva vermelha caindo e revisões em “horas depois”, “24 h”, “1 semana”, “1 mês” — fixa a ideia de revisão espaçada.
- **Tirinha “autótrofo” vs “autodidata”:** Reforça que aprender sozinho (autodidata) é diferente de “produzir a própria comida” (autótrofo); tom leve sobre confusão de termos e sobre ainda não saber tudo (ex.: “ainda não aprendi banco de dados”).
- **Relógio em Python (tkinter):** Slide com código e janela “Relógio Digital” — mostra aplicação concreta com pouco código; execução via `python clock.py`.
- **TIOBE (slide):** Tabela Jan/2026 com Python em 1º; reforça popularidade da linguagem.
- **Primeira página do Google (archive):** Referência histórica de que o primeiro software do buscador foi usado em Linux com Python (1998).

### 8. Diferenças e confusões comuns

- **Autodidata × autótrofo:** Autodidata = quem aprende por conta própria; autótrofo = organismo que produz o próprio alimento (biologia). Na aula, troca proposital na tirinha para efeito cômico.
- **TP “não obrigatório” × “pré-requisito do AT”:** Não obrigatório = não gera nota e não é cobrado como nota. Pré-requisito = sem entregar os TPs, o aluno não pode fazer o AT. Fazer os TPs é necessário para ter direito ao AT.
- **Entrega antes do prazo × nota máxima:** Entregar antes não soma pontos; apenas manter o prazo permite obter conceito máximo se o conteúdo estiver aprovado.
- **Tipagem dinâmica × fraca:** Python é dinâmica (tipo em tempo de execução) e *forte* (não permite misturar tipos em operações incompatíveis). “Fraca” seria permitir coerções implícitas amplas (ex.: somar número e string convertendo automaticamente).

### 9. Como cai em prova

- **Prova teórica / questões conceituais:** Perguntas sobre retenção na pirâmide de Glasser; curva do aprendizado vs curva do esquecimento; papel dos TPs e do AT; obrigatoriedade e pré-requisitos; consequência de atraso; conceitos DNL/DM/ND; características de Python (tipagem dinâmica e forte, multiplataforma, multiparadigma); origem (Guido van Rossum, 1991, Monty Python).
- **Pegadinha:** “TP não é obrigatório, então não preciso fazer” → errado: sem TPs não pode fazer o AT.
- **Avaliação prática (AT):** Critério de correção e rubricas são detalhados no enunciado do AT e no manual; esta aula não cobre o formato do AT, apenas o calendário e as regras gerais.

### 10. Pontos de atenção

- Entregar TP ou AT atrasado impede conceito máximo (sistema aplica isso automaticamente).
- **Correção na aula 2:** Os TPs são obrigatórios (não opcionais). Quem não entrega qualquer TP até a 2ª feira da semana 10 reprova; TP atrasado limita conceito (DL ou D) e tira direito a feedback. Ver aula 2 para regras completas.
- TPs não dão nota, mas são pré-requisitos do AT; não fazer TPs = não poder fazer o AT.
- Só assistir à aula retém muito pouco (pirâmide); é preciso praticar, revisar e, se possível, discutir ou ensinar.
- Usar só LLMs para “programar” sem escrever código atrapalha o desenvolvimento do pensamento computacional; o professor recomenda digitar e praticar.
- Confundir “autodidata” com “autótrofo” é só piada; o importante é não confundir “tipagem dinâmica” com “tipagem fraca” (Python é dinâmica e forte).
- Datas: TP1 16/02, TP2 02/03, TP3 16/03, AT 31/03; semana 11 = reentrega do AT.

### 11. Checklist de domínio

- [ ] Sei explicar o objetivo da disciplina e o papel do aluno na EaD (ator principal, prática, rotina).
- [ ] Sei descrever a pirâmide de Glasser e o que aumenta a retenção (prática, ensinar, revisão).
- [ ] Sei diferenciar curva do aprendizado (proficiência × tentativas) e curva do esquecimento (retenção × tempo sem revisão).
- [ ] Sei explicar o cronograma (11 semanas, conteúdo 1–9, AT semana 10, reentrega 11) e as datas dos TPs e do AT.
- [ ] Sei dizer que TPs não são obrigatórios nem dão nota, mas são pré-requisitos do AT, e que atraso impede conceito máximo.
- [ ] Sei citar origem do Python (Guido van Rossum, 1991, Monty Python) e características (alto nível, multiplataforma, multiparadigma, tipagem dinâmica e forte, open source).
- [ ] Sei explicar “tipagem dinâmica e forte” e dar exemplo (não somar número com string).
- [ ] Sei listar aplicações e que Python lidera índices como o TIOBE; sei que não é “bala de prata”.
