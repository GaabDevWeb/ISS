# ISS (infetStudentsSummary) — Especificação da Landing / Home

## Objetivo

A “landing” da ISS é a **página inicial do produto**: primeiro contato do usuário e ponto de partida para acessar o conteúdo. Não é uma página de marketing separada; é a home da plataforma onde o estudante escolhe a disciplina e segue para as aulas.

Objetivos da página:

- Deixar claro o que é a ISS (revisão rápida, resumos + exercícios).
- Oferecer acesso direto às disciplinas disponíveis.
- Manter hierarquia visual simples e um único CTA principal: “escolher disciplina”.

---

## Seções da página (em ordem)

### 1. Cabeçalho (Header)

- **Objetivo:** Identidade da plataforma e navegação mínima.
- **Conteúdo estrutural:** Nome/logo da ISS; opcional: link para a própria home (se houver outras páginas no futuro).
- **Layout:** Barra fixa ou no topo; compacta; não competir com o conteúdo.
- **Elementos:** Logo ou nome “ISS”; sem menu complexo no MVP.

### 2. Hero / Introdução

- **Objetivo:** Explicar em uma frase o que é a ISS e para quem é (revisão rápida para estudantes).
- **Layout:** Bloco único, centralizado ou alinhado à esquerda; destaque para a frase principal; texto secundário breve opcional.
- **Elementos:** Título (H1); subtítulo ou descrição em 1–2 linhas; sem CTA adicional além da listagem abaixo (a lista de disciplinas é o CTA).

### 3. Listagem de disciplinas

- **Objetivo:** Principal ação da página: escolher a disciplina para revisar.
- **Layout:** Lista ou grid de cards/links; cada item = uma disciplina (título e, se fizer sentido, quantidade de aulas ou apenas o nome).
- **Comportamento:** Cada item é um link para a página de listagem de aulas daquela disciplina.
- **Hierarquia:** Esta seção é o foco visual da home após o hero; maior destaque que o hero em termos de área útil.
- **Responsivo:** Em mobile, lista vertical ou grid de 1 coluna; em desktop, grid de 2 ou 3 colunas conforme quantidade de disciplinas.

### 4. Rodapé (Footer)

- **Objetivo:** Informação mínima e credibilidade (origem do projeto, opcional).
- **Layout:** Uma linha ou bloco discreto no final da página.
- **Elementos sugeridos:** Texto curto (ex.: “Projeto de apoio à revisão — INFET” ou similar); sem links obrigatórios no MVP; sem redes sociais obrigatórias.

---

## Hierarquia de CTAs

- **CTA principal:** Escolher uma disciplina (clicar em um item da listagem).
- **CTA secundário:** Não há no MVP (ex.: “Sobre o projeto” pode ser futuro).
- Não há múltiplos CTAs competindo; o fluxo é: home → disciplina → aula.

---

## Diretrizes de layout gerais

- **Espaçamento:** Respiração entre hero e listagem; entre itens da listagem; rodapé separado do conteúdo.
- **Leitura:** Tipografia legível; contraste adequado; alinhamento consistente (ex.: texto à esquerda ou centralizado no hero).
- **Navegação:** Após clicar em uma disciplina, o usuário deve chegar à listagem de aulas dessa disciplina; breadcrumb opcional (ex.: Home > Nome da disciplina).

---

## O que NÃO incluir (escopo desta spec)

- Textos finais, headlines ou copy (apenas estrutura e objetivos).
- Seções de marketing (depoimentos, preços, etc.) — não aplicável ao MVP.
- Formulários, login ou captura de dados.

---

*Documento estrutural; implementação com HTML + Tailwind + JavaScript (stack em documentação/agents/frontEnd.md). Referências de estilo em DESIGN-GUIDELINES.md.*
