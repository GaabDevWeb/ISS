# ISS (infetStudentsSummary) — Sistema de Conteúdo

Documento que define como o conteúdo da plataforma ISS é escrito, estruturado e consumido. Stack: site estático com HTML, Markdown renderizado no cliente (Marked.js). Fonte única de verdade para curadores e para quem implementa o frontend.

---

## 1. Formato oficial do conteúdo

### Escolha: **Markdown com frontmatter YAML**

| Critério | Markdown + YAML |
|----------|------------------|
| **Facilidade de escrita** | O curador escreve em Markdown (listas, títulos, parágrafos, código). Sintaxe familiar. |
| **Legibilidade** | Um arquivo por aula; frontmatter no topo; corpo em Markdown. |
| **Integração** | Marked.js renderiza o corpo no navegador; exercícios vêm do frontmatter e são renderizados como HTML + Alpine.js. |

**Regra:** Todo conteúdo de aula está em arquivos **.md** em `content/{disciplina}/`. Metadados de disciplinas e listagem de aulas estão em JSON em `content/` (ver abaixo). Não há MDX nem build de conteúdo no servidor.

---

## 2. Estrutura de pastas do conteúdo

```
content/
  disciplines.json   # Lista de disciplinas: slug, title, description (opcional), order
  lessons.json       # Lista de todas as aulas: discipline, slug, title, order, file
  python/
    aula-01-introducao.md
    aula-02-variaveis.md
  redes/
    aula-01-pilha-tcp.md
```

### Propósito de cada elemento

| Caminho | Propósito |
|---------|-----------|
| `disciplines.json` | Lista de disciplinas para a home; ordem de exibição; slug usado na URL. |
| `lessons.json` | Índice de todas as aulas (por disciplina, ordem, ficheiro). O frontend usa isso na página de disciplina e para saber qual `.md` carregar na página de aula. |
| `{disciplina}/*.md` | Uma aula por ficheiro; frontmatter (título, slug, ordem, exercícios) + corpo (Resumo, Explicações). A seção Exercícios é gerada no frontend a partir do frontmatter. |

**Regra:** Nenhum conteúdo de disciplina ou aula fora de `content/`. O frontend só lê ficheiros em `content/`.

---

## 3. Schema do conteúdo

### 3.1 Ficheiro `content/disciplines.json`

Array de objetos:

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `slug` | string | Sim | Identificador estável (ex.: `python`). Usado em URLs. |
| `title` | string | Sim | Nome de exibição (ex.: “Python”). |
| `description` | string | Não | Uma linha sobre a disciplina. |
| `order` | number | Sim | Ordem na home (inteiro ≥ 1). |

Exemplo:

```json
[
  { "slug": "python", "title": "Python", "description": "Introdução à linguagem", "order": 1 },
  { "slug": "redes", "title": "Redes de Computadores", "description": "Pilha TCP/IP", "order": 2 }
]
```

### 3.2 Ficheiro `content/lessons.json`

Array de objetos (todas as aulas de todas as disciplinas):

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `discipline` | string | Sim | Slug da disciplina. |
| `slug` | string | Sim | Slug da aula (único dentro da disciplina). |
| `title` | string | Sim | Título da aula. |
| `order` | number | Sim | Ordem na listagem (inteiro ≥ 1). |
| `file` | string | Sim | Nome do ficheiro .md (ex.: `aula-01-introducao.md`). |

Exemplo:

```json
[
  { "discipline": "python", "slug": "introducao", "title": "Introdução ao Python", "order": 1, "file": "aula-01-introducao.md" },
  { "discipline": "python", "slug": "variaveis", "title": "Variáveis", "order": 2, "file": "aula-02-variaveis.md" }
]
```

O frontend monta o caminho do ficheiro como `content/{discipline}/{file}`.

### 3.3 Aula (ficheiro .md)

Cada aula é um ficheiro Markdown com:

- **Frontmatter YAML** (obrigatório): `title`, `slug`, `discipline`, `order`, `description` (opcional), `exercises`.
- **Corpo:** apenas as seções `## Resumo` e `## Explicações`. A seção **Exercícios** não é escrita no .md; o frontend gera-a a partir do array `exercises` do frontmatter (pergunta + resposta/dica expandível com Alpine.js).

---

## 4. Frontmatter das aulas

Todo o ficheiro de aula em `content/{disciplina}/*.md` deve ter frontmatter YAML no topo.

### Campos

| Campo | Obrigatório | Formato | Exemplo | Uso |
|-------|-------------|---------|---------|-----|
| `title` | Sim | String | `"Introdução ao Python"` | Título da página e listagens. |
| `slug` | Sim | String, minúsculas, sem espaços | `"introducao"` | Parâmetro na URL da aula. |
| `discipline` | Sim | String, igual ao slug da disciplina | `"python"` | Coerência com `lessons.json` e pasta. |
| `order` | Sim | Inteiro positivo | `1` | Ordenação na listagem. |
| `description` | Não | String | `"Primeiros conceitos"` | Meta ou subtítulo. |
| `exercises` | Sim | Array de objetos (ver abaixo) | — | Perguntas e respostas/dicas expandíveis. |

### Exercícios no frontmatter

Cada item do array `exercises` é um objeto:

| Prop | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| `question` | string | Sim | Texto da pergunta (sempre visível). |
| `answer` | string | Sim | Resposta sugerida (bloco expandível). |
| `hint` | string | Não | Dica opcional (exibida junto à resposta no expandível). |

Exemplo de frontmatter completo:

```yaml
---
title: "Introdução ao Python"
slug: "introducao"
discipline: "python"
order: 1
description: "Primeiros conceitos da linguagem"
exercises:
  - question: "Por que a indentação importa em Python?"
    answer: "Em Python, a indentação define os blocos de código. O interpretador usa o nível de indentação para saber onde cada bloco começa e termina."
  - question: "O que significa 'tipagem dinâmica'?"
    answer: "Significa que uma mesma variável pode guardar valores de tipos diferentes em momentos diferentes."
    hint: "Pense em atribuir primeiro um número e depois uma string à mesma variável."
---
```

---

## 5. Corpo do ficheiro de aula (Markdown)

Apenas duas seções obrigatórias, nesta ordem:

1. **## Resumo**  
   Conteúdo em Markdown: listas, parágrafos, código inline. Pontos principais da aula.

2. **## Explicações**  
   Opcional em conteúdo (pode estar vazia ou com um parágrafo). Explicações complementares.

Não se escreve a seção **## Exercícios** no .md. O frontend, após renderizar o corpo com Marked.js, adiciona o título “Exercícios” e os blocos de exercício (pergunta + “Ver resposta sugerida” / “Ver dica” expandível) gerados a partir de `exercises` no frontmatter.

Exemplo de corpo:

```markdown
## Resumo

- Python é uma linguagem interpretada e de alto nível.
- A indentação define blocos de código; não há chaves como em C ou Java.
- Tipagem dinâmica: variáveis não são declaradas com tipo.

## Explicações

A indentação em Python não é apenas estilo: o interpretador usa ela para saber onde começam e terminam blocos. Por isso, misturar tabs e espaços pode causar erros.
```

---

## 6. Convenções de nome de ficheiro (aulas)

Padrão recomendado:

```
aula-{order}-{slug}.md
```

- `order`: número com dois dígitos (01, 02, …).
- `slug`: igual ao campo `slug` do frontmatter (ex.: `introducao`, `variaveis`).

Exemplos: `aula-01-introducao.md`, `aula-02-variaveis.md`. O nome em `lessons.json` (`file`) deve coincidir com o ficheiro real.

---

## 7. URLs e parâmetros

| Página | URL (exemplo) | Parâmetros |
|--------|----------------|------------|
| Home | `/` ou `/index.html` | — |
| Disciplina | `/disciplina.html?d=python` | `d` = slug da disciplina |
| Aula | `/aula.html?d=python&a=introducao` | `d` = disciplina, `a` = slug da aula |

Slugs: minúsculas, letras, números e hífens; únicos por disciplina para aulas; únicos globalmente para disciplinas.

---

## 8. Fluxo de criação de conteúdo

### Nova disciplina

1. Adicionar entrada em `content/disciplines.json`: `slug`, `title`, `description` (opcional), `order`.
2. Criar pasta `content/{slug}/` (vazia ou com aulas).

### Nova aula

1. Definir `slug`, `title`, `order` e nome do ficheiro (ex.: `aula-03-listas.md`).
2. Adicionar entrada em `content/lessons.json`: `discipline`, `slug`, `title`, `order`, `file`.
3. Criar `content/{disciplina}/{file}` com frontmatter (incluindo `exercises`) e corpo (## Resumo, ## Explicações).
4. Fazer commit; o site estático passa a exibir a nova aula assim que a listagem e o link forem usados pelo frontend.

### Editar aula

1. Editar o .md em `content/{disciplina}/`.
2. Se mudar `order` ou `slug`, atualizar `lessons.json` e, se quiser manter a convenção, renomear o ficheiro.

---

## 9. Validação (recomendações)

- Todo .md de aula tem frontmatter com `title`, `slug`, `discipline`, `order`, `exercises`.
- Todo exercício tem `question` e `answer`.
- `discipline` coincide com um slug em `disciplines.json`.
- Dentro da mesma disciplina, não há duas aulas com o mesmo `order` nem mesmo `slug`.
- O valor `file` em `lessons.json` corresponde a um ficheiro existente em `content/{discipline}/`.

---

## 10. Regras para agentes / implementação

1. Conteúdo editável apenas em `content/`. Não ler nem escrever conteúdo noutras pastas.
2. Usar apenas os campos definidos neste documento (disciplines.json, lessons.json, frontmatter e corpo do .md).
3. Aulas apenas em .md em `content/{disciplina}/`; exercícios definidos no frontmatter; corpo só Resumo e Explicações.
4. URLs: home, disciplina (parâmetro `d`), aula (parâmetros `d` e `a`), conforme architecture.md e este documento.

---

*Alinhado a documentação/agents/frontEnd.md e docs/architecture.md. Stack: HTML + Tailwind + JS + Alpine + Marked + Highlight; site 100% estático.*
