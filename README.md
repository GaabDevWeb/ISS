<p align="center">
  <img src="css/images/banner.png" alt="Banner do Projeto" width="100%" />
</p>

# <img src="css/images/icon.svg" width="32" style="vertical-align: middle;"> ISS - Plataforma Interativa de Estudos

**Acesse a versão web do projeto online: [https://gaabdevweb.github.io/ISS/](https://gaabdevweb.github.io/ISS/)**

Bem-vindo ao repositório do projeto ISS. Este sistema nasceu da vontade de ajudar estudantes (incluindo a mim mesmo!) a organizarem e consolidarem seus conhecimentos. É um ambiente acadêmico pensado para facilitar a leitura de anotações e aulas em formato Markdown, a revisão de conceitos e a resolução prática de exercícios diretamente no navegador.

A intenção aqui é ser um espaço direto ao ponto e focado inteiramente em **estudar, testar e aprender juntos**, sem distrações.

---

## Como o projeto ajuda nos estudos

A ideia principal é facilitar o acesso aos materiais. A página inicial organiza tudo em disciplinas e trilhas de aprendizado, e conta com uma busca simples para encontrarmos rapidamente o termo ou conceito que precisamos revisar.

<details>
  <summary><b>Visualizar: Tela Inicial e Busca</b></summary>
  <br>
  <p align="center">
    <img src="css/images/home.png" alt="Tela Inicial" width="80%" />
  </p>
  <p align="center">
    <img src="css/images/search.png" alt="Sistema de Busca" width="80%" />
  </p>
</details>

Dentro das aulas, o foco total é bater o olho e entender a matéria. Por isso, as páginas suportam formatação para blocos de código e diagramas visuais, o que deixa a leitura da teoria bem mais clara e amigável.

<details>
  <summary><b>Visualizar: Renderização de Conceitos</b></summary>
  <br>
  <p align="center">
    <img src="css/images/concepts.png" alt="Conceitos" width="80%" />
  </p>
</details>

---

## Praticando com Exercícios

Ler a teoria é importante, mas sem praticar ninguém memoriza nada. O design da interface foi feito para ser limpo e isolar a leitura de telas muito poluídas.

<details>
  <summary><b>Visualizar: Ambiente de Aula</b></summary>
  <br>
  <p align="center">
    <img src="css/images/Aula.png" alt="Visualização da Aula" width="80%" />
  </p>
</details>

Para fixar o conteúdo de verdade, a página lista blocos de exercícios interativos na parte inferior dos materiais. Neles você pode pensar sobre o problema e, caso não consiga ou queira conferir, basta expandir a caixa para checar a dica ou a resposta sugerida.

<details>
  <summary><b>Visualizar: Interação com Exercícios</b></summary>
  <br>
  <p align="center">
    <img src="css/images/exercicios.png" alt="Lista de Exercícios" width="80%" />
  </p>
  <p align="center">
    <img src="css/images/exercicio.png" alt="Resolução do Exercício" width="80%" />
  </p>
</details>

---

## Acompanhando o Progresso

Para dar aquele incentivo na hora de estudar, a plataforma salva o nosso progresso de leitura localmente. É possível marcar as lições concluídas e os exercícios que já foram revisados, visualizando essas métricas em uma página de acompanhamento que ajuda a rastrear onde devemos melhorar.

<details>
  <summary><b>Visualizar: Gráficos de Progresso</b></summary>
  <br>
  <p align="center">
    <img src="css/images/grafico.png" alt="Gráficos de Progresso" width="80%" />
  </p>
</details>

---

## Guia Técnico

A seguir, informações detalhadas para desenvolvedores e mantenedores do projeto sobre sua arquitetura e modo de funcionamento.

### Pipeline Automático de Criação de Conteúdo (Agentes de IA)

O conteúdo da plataforma não brota do nada. Ele é curado e estruturado através de uma esteira de produção refinada, movida por Engenharia de Prompt industrial. Agentes especialistas de Inteligência Artificial processam tudo para garantir alta densidade técnica, fugindo completamente de "resumos básicos" e gerando materiais interativos de verdade.

```mermaid
flowchart TD
    A[Aulas ao Vivo / Transcrições] --> B
    C[Slides / Código Bruto] --> B

    subgraph "Agente: Ensino Técnico Principal"
        B(Extrai Conceituais e Skills)
        D(Reconstrói o Modelo Mental)
        E(Gera Lesson .md c/ Diagramas)
        F(Emite Metadados CONCEPT_EXTRACTION)
        B --> D --> E --> F
    end

    subgraph "Agente: Gerador de Exercícios"
        G{Planejamento Multi-Estágio}
        H(Injeta Contextos: API, Logs, etc)
        I(Monta Exercícios e Test Cases)
        G --> H --> I
    end

    F -->|Input Estruturado| G
    E -->|Salvo em| J[content/disciplinas/nova-aula.md]
    I -->|Salvo em| K[exercises.json / files .md]
```

Para chegar neste nível de profundidade pedagógica, o projeto estabelece as regras nos arquivos da pasta `agents/`:

1. **O Instrutor Principal** ([`content-summary-agent.md`](agents/content-summary-agent.md) & [`content-summary-style-guide.md`](agents/content-summary-style-guide.md)):  
   Esse agente recebe a aula bruta ou transcrição e atua como professor e designer de currículo. Ele é estritamente proibido de dar respostas incompletas ou fazer a lição usando *bullets* vazios. Ao invés disso, o agente absorve a matéria, cria *Modelos Mentais*, desenha diagramas via Mermaid.js ilustrando códigos e fluxos de sistemas, e finalmente insere comentários HTML ocultos na lição contendo a extração técnica.

2. **O Criador da Prática** ([`exercicios-prompt-especificacao.md`](agents/exercicios-prompt-especificacao.md)):  
   Puxando os conceitos extraídos pelo agente anterior, cria-se a bateria interativa. Ao contrário de uma geração desordenada de código, este agente divide os exercícios em 5 estágios progressivos de dificuldade e os força a rodar em cenários realistas da profissão (*parsing* de JSON, validação customizada, busca em logs, ETL). As tarefas saem da monotonia e ganham estilos criativos, onde os alunos precisarão descobrir *bugs* no código, refatorar a lógica, prever saídas complexas, ou escrever blocos lógicos do zero para passarem nos casos de testes embarcados (`test_cases`).

```mermaid
graph TD
    A[Navegador / HTML] -->|Router HTTP| B(js/markdown.js)
    B -->|Fetch do arquivo| C[Conteúdo .md estático]
    B -->|Parse customizado| D[Extrai YAML Frontmatter]
    B -->|Parse markdown| E[Marked.js]
    D --> F[Metadados e Lista de Exercícios]
    E --> G[Conteúdo HTML]
    G --> H[Renderiza na tela]
    F -->|Injeta blocos| H
    H -->|Syntax| I[Highlight.js]
    H -->|Diagramas| J[Mermaid.js]
```

### Como Rodar o Projeto Localmente

Por se tratar de um projeto composto majoritariamente de arquivos estáticos (HTML, CSS e JavaScript client-side), não é necessária a instalação de um backend complexo ou banco de dados. Qualquer servidor HTTP estático servirá de ambiente.

1. Clone este repositório para sua máquina.
2. Navegue até o diretório raiz do projeto.
3. Inicie um servidor local. Algumas opções comuns incluem:
   - **Python:** Rode `python -m http.server 8000` (ou `python3 -m http.server 8000`).
   - **Node.js (serve):** Rode `npx serve .`
   - **VS Code:** Utilize a extensão *Live Server* e clique em *Go Live*.
4. Acesse pelo navegador a porta disponibilizada pelo servidor (geralmente `http://localhost:8000` ou `http://localhost:3000`).

### Como Adicionar Novas Aulas

As aulas são gerenciadas através de arquivos Markdown e registradas em um arquivo JSON.

```mermaid
sequenceDiagram
    participant Dev as Professor / Dev
    participant MD as content/.../nova-aula.md
    participant JSON as content/lessons.json
    participant App as Plataforma ISS

    Dev->>MD: 1. Criação do arquivo Markdown
    Dev->>MD: 2. Adiciona o YAML Frontmatter
    Dev->>JSON: 3. Adiciona o registro no lessons.json
    App->>JSON: 4. Atualiza o menu de disciplinas
    App->>MD: 5. Renderiza o conteúdo da nova aula
```

1. Crie seu arquivo Markdown com a aula em `content/<nome-da-disciplina>/nova-aula.md`.
2. Adicione o cabeçalho (Frontmatter) em YAML no topo do arquivo `.md`. Por exemplo:
   ```yaml
   ---
   title: "Título da sua Aula"
   readingMinutes: 10
   ---
   Conteúdo em markdown...
   ```
3. Registre a aula editando o arquivo `content/lessons.json`:
   ```json
   {
     "discipline": "nome-da-disciplina",
     "slug": "nova-aula",
     "title": "Título da sua Aula",
     "order": 99,
     "file": "nome-da-disciplina/nova-aula.md"
   }
   ```

### Como Adicionar Novos Exercícios

Existem duas formas principais para adicionar exercícios, garantindo forte acoplamento com a teoria.

**1. Embutidos na Própria Aula:**
Você pode adicionar uma lista de exercícios no Frontmatter YAML do próprio arquivo `.md` da aula:
```yaml
---
title: "Minha Aula"
exercises:
  - question: "Qual é o objetivo principal?"
    answer: "O objetivo é..."
    hint: "Lembre da introdução..."
---
Conteúdo do markdown.
```
O script `markdown.js` fará a injeção em bloco no final da página automaticamente.

**2. Arquivos de Treinamento e Testes Isolados:**
Se desejar que o exercício seja listado de maneira independente em um banco de questões, você pode criar um arquivo `.md` diretamente dentro de `content/exercises/` e configurar metadados específicos que a plataforma compila no banco local.

### Estrutura de Pastas

A organização prioriza a separação das responsabilidades entre estáticos, lógicas e definições de conteúdo.

- `/css/`: Todos os estilos globais e imagens da plataforma (incluindo as capturas de tela desta documentação).
- `/js/`: Toda a lógica em vanilla JavaScript. Abriga regras de renderização (`markdown.js`), controle de estado, avaliador de código (`code-runner.js`) e lógicas de visualização.
- `/content/`: Contém os diretórios das disciplinas com as aulas em `.md` e os arquivos JSON base, como o `lessons.json`, `disciplines.json` e o sumário `search-index.json`.
- `/Aulas/`: Estrudo histórico ou diretório extra contendo recursos legados ou secundários de estudos adicionais.
- Arquivos `.html` na raiz: Constituem os pontos de entrada do sistema (`index.html`, `aula.html`, `exercise.html`, `stats.html`, etc).

### Como é Renderizado o Markdown no Browser

O projeto opta por não ter rotas estáticas pré-compiladas (SSG). Em vez disso, a renderização ocorre em tempo de execução no lado do cliente:

1. Quando a página `aula.html?d=disciplina&a=aula-slug` é aberta, a aplicação identifica os parâmetros da URL.
2. Uma requisição `fetch()` assíncrona é disparada para capturar o conteúdo do arquivo `.md` correto contido na pasta `/content/`.
3. O script interno `js/markdown.js` processa o conteúdo cru:
   - Extrai o cabeçalho `YAML` (Frontmatter) manualmente para processar os metadados (título, tempo de leitura) e lista de exercícios.
   - Todo o corpo de texto subsequente é passado pela biblioteca **Marked.js**, que converte as diretrizes Markdown reais em `HTML`.
4. Após injetado no DOM, outras bibliotecas entram em ação:
   - **Highlight.js** é executado para os blocos syntax highlighting do código-fonte.
   - **Mermaid.js** é avaliado caso existam blocos definidos como linguagem `mermaid`, renderizando diagramas estruturais SVG no momento.
   - Os exercícios extraídos são compilados como marcação `<details>/<summary>` do HTML puro e anexados ao rodapé.

---

## Como Contribuir

Todo material de estudo ganha muito quando construído junto. Qualquer pessoa pode enviar melhorias na interface, correções de ortografia, novos diagramas, lições extras e exercícios criativos via *Pull Requests*. Siga o passo a passo:

1. Faça o Fork deste repositório para a sua conta do GitHub.
2. Crie a sua *branch* para a modificação (`git checkout -b feature/minha-melhoria-na-aula-x`).
3. Comite suas alterações com descrições semânticas (`git commit -m 'Novo exercício de fixação no bloco de SQL'`).
4. Dê o Push para sua conta localmente (`git push origin feature/minha-melhoria-na-aula-x`).
5. Abra um *Pull Request* detalhando o que foi adicionado.

Este projeto é constantemente evoluído. Sinta-se à vontade para navegar pelos códigos e pelos subdiretórios para maiores esclarecimentos.

---

**Gostou da iniciativa?** Se esse projeto tiver agregado na sua base técnica, ajudado nos estudos do dia a dia ou servido de ferramenta útil para você aprender algo novo, não esqueça de deixar uma estrela (Star) brilhante aqui no canto superior direito do repositório do GitHub! Isso ajuda incrivelmente a espalhar a plataforma para mais estudantes e desenvolvedores interessados em evoluir. Muito obrigado!
