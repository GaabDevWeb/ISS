# Como gerar novos exercícios (fluxo atual)

Este guia descreve como **extrair conceitos** e como **gerar exercícios** com o novo prompt definido em `exercicios-prompt-especificacao.md`.

---

## Visão geral do fluxo

1. **Extrair conceitos da aula** com o Concept Extraction Agent (ou usar bloco já existente).
2. **(Opcional)** Obter conceitos de aulas anteriores para o mix (ex.: a partir de `concepts.md`).
3. **Montar o bloco de entrada** e usar o **prompt da seção 11** em uma sessão de IA (ex.: Cursor).
4. **Salvar os exercícios** em `content/exercises/` e atualizar `content/exercises/exercises.json`.

---

## Como extrair os conceitos

O **Concept Extraction Agent** (`agents/Concept Extraction Agent.md`) está configurado para suprir o que o Gerador de Exercícios precisa: **concepts**, **skills** e **examples** em formato YAML, com exemplos em forma de snippets quando a aula tiver código.

### Passo a passo para extrair

1. Abra o arquivo da aula (ex.: `content/python/aula-09-desvio-condicional.md`).
2. Abra o prompt do **Concept Extraction Agent** (`agents/Concept Extraction Agent.md`) e copie a seção "Prompt" (a partir de "Você é um agente responsável..." até o fim das regras).
3. Numa sessão de IA (Cursor, etc.), envie:
   - como instrução: o prompt do Concept Extraction Agent;
   - como conteúdo: o texto da aula (ou indique o ficheiro).
4. Peça: "Extraia concepts, skills e examples no formato YAML descrito no prompt. A saída deve ser um bloco pronto para ser usado pelo Gerador de Exercícios."
5. Copie o bloco YAML gerado. Esse é o seu bloco de entrada para o **Passo 1** abaixo (Conceitos da aula).

### Conceitos de aulas anteriores (concepts_previous_lessons)

O Concept Extraction Agent **não** gera `concepts_previous_lessons` — ele só extrai a aula que você passar. Para que o Gerador de Exercícios possa combinar conceitos (≥50% dos exercícios com conceitos de aulas anteriores), faça uma das opções:

- **Opção A — Ficheiro consolidado:** Se existir um `concepts.md` (ou similar) com conceitos por aula, copie os **concepts** das aulas **anteriores** à atual e monte uma lista. Ex.: para gerar exercícios da aula 9, use os concepts das aulas 1–8.
- **Opção B — Extrair aula a aula:** Rode o Concept Extraction Agent para cada aula anterior, guarde os `concepts` de cada uma e concatene numa lista única para `concepts_previous_lessons`.
- **Opção C — Omitir:** Se não fornecer `concepts_previous_lessons`, o gerador ainda funciona; apenas não aplica a regra de mix com aulas anteriores.

Exemplo de bloco com conceitos anteriores (para aula 9):

```yaml
concepts_previous_lessons:
  - variáveis, tipos (int, float, str)
  - comentário e docstring
  - conversão int(), float(), str()
  - operadores aritméticos e precedência
  - strings: escape, concatenação, slice, métodos
  - interpolação e f-string
  - input() e conversão
```

---

## Passo 1 — Conceitos da aula (bloco de entrada)

Os exercícios são gerados a partir de **concepts**, **skills** e **examples** da aula.

- Se a aula já tiver um bloco **CONCEPT_EXTRACTION** ou frontmatter com `concepts`/`skills`/`examples`, use esse conteúdo.
- Caso contrário, rode primeiro o **Concept Extraction Agent** (`agents/Concept Extraction Agent.md`): abra o arquivo da aula, use o prompt desse agente e peça a extração. Guarde o bloco gerado.

Exemplo de bloco de entrada (para o gerador de exercícios):

```yaml
concepts:
  - if / elif / else (desvio condicional)
  - operadores relacionais (<, >, ==, >=, <=)
  - input() e conversão com float()
  - notação de intervalo (ex.: 18.5 <= imc <= 24.9)

skills:
  - escrever if/elif/else com indentação correta
  - usar notação de intervalo em condições
  - capturar entrada numérica e converter com float()

examples:
  - if media >= 7: ... elif media >= 5: ... else: ...
  - if 18.5 <= imc <= 24.9: mensagem = 'Peso ideal'

# Opcional: conceitos de aulas anteriores (para mix ≥50%)
concepts_previous_lessons:
  - variáveis, tipos (int, float, str)
  - formatação com f-string
  - operadores aritméticos
```

---

## Passo 2 — Onde está o prompt

O **prompt completo** do gerador de exercícios está em:

**`agents/exercicios-prompt-especificacao.md`** → **Seção 11** (“Prompt final (pronto para uso)”).

Copie todo o conteúdo da seção 11 (o bloco em Markdown que começa com “# Papel” e termina antes de “Fim da especificação”).

---

## Passo 3 — Como rodar a geração

1. Abra o Cursor (ou outro ambiente que use o prompt como instrução do agente).
2. Cole o **prompt da seção 11** como instrução de sistema ou como primeira mensagem (ex.: “Use o seguinte como suas instruções: [colar prompt]”).
3. Envie uma segunda mensagem com:
   - O **bloco de entrada** (concepts, skills, examples e, se tiver, concepts_previous_lessons).
   - A **disciplina** (ex.: `python`, `visualizacao-sql`).
   - A **quantidade desejada** de exercícios (ex.: “Gere 15 exercícios para esta aula”).
4. Peça que a saída seja em **arquivos .md**, um por exercício, no formato do projeto (frontmatter + ## Enunciado + ## Solução).

Exemplo de mensagem para o agente:

```
Segue o bloco de entrada para a aula de desvio condicional (Python).

concepts:
- if / elif / else
- operadores relacionais
- input() e float()
- notação de intervalo

skills:
- escrever if/elif/else com indentação correta
- usar notação de intervalo
- capturar entrada e converter com float()

examples:
- if media >= 7: ... elif media >= 5: ... else: ...
- if 18.5 <= imc <= 24.9: ...

concepts_previous_lessons:
- variáveis, tipos, f-string, operadores aritméticos

discipline: python

Gere 15 exercícios em arquivos .md separados, com progressão por estágios, variedade de tipos (complete_the_code, fix_bug, predict_output, etc.) e contextos realistas. Inclua em cada arquivo: title, slug, difficulty, concepts, discipline, learning_goal, exercise_type, test_cases ou expected_output, e seções Enunciado e Solução.
```

---

## Passo 4 — Onde salvar e como registrar

- **Arquivos .md**: um arquivo por exercício em  
  **`content/exercises/<slug>.md`**  
  com frontmatter (title, slug, difficulty, concepts, discipline, learning_goal, exercise_type, test_cases ou expected_output) e corpo com ## Enunciado e ## Solução (conforme `content/exercises/example.md` e a seção 8 da especificação).

- **Índice**: registrar cada exercício em **`content/exercises/exercises.json`**, por exemplo:

```json
{
  "slug": "aprovado-recuperacao",
  "title": "Aprovado, recuperação ou reprovado",
  "difficulty": "medium",
  "concepts": ["if/elif/else", "input()", "float()", "comparação"],
  "discipline": "python",
  "file": "aprovado-recuperacao.md",
  "order": 1
}
```

Ajuste o campo **order** conforme a progressão (1, 2, 3, …) para que a lista no site siga a ordem pedagógica.

---

## Resumo rápido

| Etapa | Ação |
|-------|------|
| 1 | Obter concepts, skills, examples da aula (Concept Extraction Agent ou frontmatter). |
| 2 | Copiar o prompt da **seção 11** de `exercicios-prompt-especificacao.md`. |
| 3 | Enviar ao agente: prompt + bloco de entrada + disciplina + quantidade de exercícios. |
| 4 | Salvar cada exercício em `content/exercises/<slug>.md` e atualizar `exercises.json`. |

Com isso, você usa o novo prompt industrial para gerar exercícios com progressão, diversidade de tipos, contextos realistas e compatibilidade com auto-grading.
