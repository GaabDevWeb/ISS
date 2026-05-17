---
title: "Conjuntos (<mark style=\"background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;\">`set`</mark>) em Python para dados"
slug: "conjuntos-sets-python"
discipline: "python_para_processamento_de_dados"
order: 9
description: "Coleções não ordenadas, elementos únicos, operações de conjuntos e escolha correta de estrutura ao processar dados."
reading_time: 22
difficulty: "medium"
concepts:
  - set
  - unicidade de elementos
  - hashable
  - união interseção diferença
  - subconjunto superconjunto
  - conjuntos disjuntos
  - métodos add update remove discard pop clear
prerequisites: []
learning_objectives:
  - "Criar e manipular conjuntos com segurança, incluindo o caso do conjunto vazio."
  - "Aplicar operações de conjunto para resolver tarefas típicas de deduplicação e comparação de coleções."
  - "Escolher entre lista, tupla, dicionário e conjunto com base em unicidade, ordem e forma de acesso."
exercises:
  - question: "Por que `{{}}` não cria um <mark style=\"background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;\">`set`</mark> vazio e o que você deve usar em vez disso?"
    answer: "Em Python, `{}` cria um <mark style=\"background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;\">`dict`</mark> vazio. Para conjunto vazio, use <mark style=\"background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;\">`set()`</mark>."
    hint: "Pense na ambiguidade entre literal de dicionário e literal de conjunto quando não há elementos."
  - question: "Qual é a diferença prática entre <mark style=\"background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;\">`remove()`</mark> e <mark style=\"background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;\">`discard()`</mark>?"
    answer: "<mark style=\"background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;\">`remove()`</mark> lança <mark style=\"background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;\">`KeyError`</mark> se o elemento não existir; <mark style=\"background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;\">`discard()`</mark> não faz nada nesse caso."
    hint: "Compare o que acontece quando o elemento não está no conjunto."
  - question: "Por que não dá para colocar uma lista como elemento de um <mark style=\"background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;\">`set`</mark>?"
    answer: "Elementos de conjunto precisam ser <mark style=\"background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;\">`hashable`</mark> (imutáveis no sentido de poderem ser usados como chave em estruturas baseadas em hash). Listas são mutáveis e não são <mark style=\"background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;\">`hashable`</mark>."
    hint: "Relacione com a necessidade de calcular hash estável para localizar o elemento rapidamente."
review_after_days: [3, 7]
---

## Visão Geral do Conceito

O tipo <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`set`</mark> modela **conjuntos matemáticos** na forma de uma coleção que **não mantém ordem confiável**, é **mutável** nos elementos que contém, e **elimina duplicatas automaticamente**. Em processamento de dados, isso aparece o tempo todo: **deduplicar identificadores**, comparar **dois conjuntos de chaves** vindos de sistemas diferentes (por exemplo, SKUs, códigos de campanha, IDs de usuário), ou checar **cobertura** (tudo que aparece no lote A também aparece no lote B?).

A relação com <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`dict`</mark> é pedagógica: as **chaves** de um dicionário precisam ser únicas, como um “conjunto de chaves”; mas um <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`set`</mark> guarda **apenas valores**, sem mapeamento para outro objeto.

> **Regra:** Se você precisa **ordem**, **índice posicional** ou **repetição**, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`set`</mark> não é a ferramenta principal. Se você precisa **unicidade** e operações de **interseção/união/diferença** em tempo próximo a \(O(n)\) em cenários comuns, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`set`</mark> tende a ser excelente.

**Não coberto no material de origem (e fora do escopo desta lição):** detalhes de otimização interna do interpretador CPython relacionadas à “inicialização repetida” observada em ambientes interativos; isso não altera a semântica pública de conjuntos (“não ordenado” no sentido de **não assumir ordem de iteração**).

## Modelo Mental

Pense no <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`set`</mark> como uma **sacola de fichas únicas** com duas propriedades decisivas:

1. **Não existe “posição 3”**: você não acessa “o terceiro elemento” com <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`[i]`</mark>.
2. **A sacola impõe unicidade**: inserir a mesma ficha de novo **não aumenta** a quantidade de fichas distintas.

Para lembrar o vínculo com dicionários, imagine um <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`dict`</mark> “sem valores”: você só se importa com o conjunto de chaves.

```mermaid
flowchart TD
  A[Entrada: coleção com repetições / ruído] --> B["set(...) ou literais com chaves"]
  B --> C{Cada elemento é hashable?}
  C -->|não| D[TypeError: unhashable type]
  C -->|sim| E[Conjunto mantém apenas valores únicos]
  E --> F{Qual pergunta você quer responder?}
  F -->|"Quais únicos?"| G[Usar o próprio set como visão única]
  F -->|"O que mudou entre A e B?"| H[Operações - , & , |]
  F -->|"Há interseção?"| I[isdisjoint / interseção]
```

## Mecânica Central

### Criação e o “armadilha” do `{}`

- **Literal com elementos**: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`{1, 2, 3}`</mark> cria um <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`set`</mark>.
- **Vazio**: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`{}`</mark> cria um <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`dict`</mark> vazio. Para conjunto vazio: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`set()`</mark>.
- **A partir de iteráveis**: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`set("banana")`</mark> produz letras únicas; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`set([1, 1, 2])`</mark> produz <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`{1, 2}`</mark>.

### Mutabilidade versus elementos “hashable”

O **conjunto** em si é mutável (<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`add`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`update`</mark>, etc.). Mas **cada elemento** precisa ser <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`hashable`</mark> (na prática: não coloque <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`list`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`dict`</mark> ou outro <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`set`</mark> como item de um <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`set`</mark>).

> **Regra prática:** Se você precisa deduplicar “linhas” complexas, normalize para algo imutável (<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`tuple`</mark> de campos, string canônica, ID).

### Métodos de modificação e remoção

- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`add(x)`</mark>: adiciona um elemento.
- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`update(iterável)`</mark>: adiciona muitos de uma vez (união in-place).

Para remover:

- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`remove(x)`</mark>: remove; se não existir, lança <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`KeyError`</mark>.
- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`discard(x)`</mark>: remove se existir; senão, não faz nada.
- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`pop()`</mark>: remove e retorna **um** elemento arbitrário (não assuma qual).
- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`clear()`</mark>: esvazia o conjunto.

### Operações entre conjuntos (visão de dados)

Sendo <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`A`</mark> e <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`B`</mark> conjuntos:

- **União**: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`A | B`</mark> (tudo que aparece em qualquer um, sem duplicar)
- **Interseção**: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`A & B`</mark> (somente comuns)
- **Diferença**: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`A - B`</mark> (está em <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`A`</mark> **e não** está em <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`B`</mark>)

Essas operações produzem **novos conjuntos** (salvo quando você usa formas in-place equivalentes como <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`A.update(B)`</mark>, dependendo do que você precisa).

### Relações de inclusão, igualdade e disjunção

- Comparadores como <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`A >= B`</mark> / <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`A > B`</mark> testam **superconjunto** (estrito ou não), e <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`A <= B`</mark> / <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`A < B`</mark> testam **subconjunto**. Em paralelo, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`issubset`</mark> e <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`issuperset`</mark> expressam a mesma ideia de forma explícita.
- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`A == B`</mark> compara **igualdade de conjuntos** por membros (ordem irrelevante).
- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`A.isdisjoint(B)`</mark> verifica se **não há elementos comuns** (equivale a interseção vazia).

### Ordem de impressão e “não ordenado”

Iterar ou imprimir um <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`set`</mark> pode mostrar uma ordem “aparente”, mas **código correto não pode depender** dessa ordem entre execuções e versões. Se você precisa ordenar para relatório, converta para <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`sorted(...)`</mark>.

## Uso Prático

### Deduplicação rápida de uma coleção

```python
user_ids = ["u12", "u09", "u12", "u07", "u09", "u12"]
unicos = set(user_ids)

print(len(user_ids), len(unicos))
# 6 3
```

Se você precisa **preservar a primeira ocorrência na ordem original**, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`set`</mark> sozinho não resolve; aí entram receitas com dicionário (Python 3.7+ preserva ordem de inserção em <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`dict</mark>`) ou um laço explícito.

### “O que chegou na ingestão hoje que não existia ontem?”

```python
skus_ontem = {"A1", "B2", "C3"}
skus_hoje = {"B2", "C3", "D4"}

novos = skus_hoje - skus_ontem
descontinuados = skus_ontem - skus_hoje
ainda_ativos_em_ambos = skus_ontem & skus_hoje

print(novos, descontinuados, ainda_ativos_em_ambos)
# {'D4'} {'A1'} {'B2', 'C3'}
```

### Validação de cobertura: todos os eventos são de tipos permitidos?

```python
eventos = {"click", "purchase", "scroll", "spammy_evento"}
permitidos = {"click", "purchase", "scroll", "impression"}

invalidos = eventos - permitidos
print("Há eventos fora do catálogo?", bool(invalidos), invalidos)
```

Aqui, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`-`</mark> traduz diretamente a pergunta de negócio: **o que sobra é exatamente o que não é permitido**.

## Erros Comuns

1. **Criar “conjunto vazio” com <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`{}`</mark> e tratar como <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`set`</mark>**  
   **Sintoma:** métodos ou operadores de conjunto “somem” ou comportamento vira o de dicionário.  
   **Correção:** use <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`set()`</mark>.

2. **Usar <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`remove()`</mark> quando a falta do elemento é esperada**  
   **Sintoma:** <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`KeyError`</mark> interrompe o pipeline.  
   **Correção:** prefira <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`discard()`</mark> ou verifique com <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`in`</mark>.

3. **Assumir ordem estável em <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`set`</mark>**  
   **Sintoma:** testes flaky, relatórios “mudam” entre execuções.  
   **Correção:** ordene explicitamente quando a ordem é requisito.

4. **Indexação <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`s[0]`</mark>**  
   **Sintoma:** <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`TypeError`</mark> (“not subscriptable”).  
   **Correção:** converta para lista ordenada ou escolha outra coleção.

5. **Colocar estruturas mutáveis dentro do conjunto**  
   **Sintoma:** <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`TypeError: unhashable type`</mark>.  
   **Correção:** use tuplas de campos imutáveis, strings normalizadas, ou IDs.

## Visão Geral de Debugging

Quando um trecho com conjuntos falha, pense em quatro eixos:

1. **Tipo real do objeto**: imprima <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`type(x)`</mark>. Muitos bugs começam com <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`{}`</mark> sendo <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`dict`</mark>.
2. **Existência do elemento** antes de <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`remove`</mark>: use <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`x in s`</mark> ou prefira <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`discard`</mark>.
3. **Pergunta lógica errada**: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`A - B`</mark> não é simétrico. Se você quer “o que está em A ou B mas não em ambos”, isso é outra operação (<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`symmetric_difference`</mark>), não coberta como núcleo no PDF desta aula.
4. **Unhashable**: quando o erro aponta para um item que é lista/dict, volte uma casa: **normalize o registro** antes de deduplicar.

<details>
<summary>Ver um micro-checklist para logs de ETL</summary>

- Quantidade antes/depois da deduplicação bate com o esperado?
- Algum campo que deveria ser chave na verdade varia por espaços/caixa alta?
- Você precisa de unicidade global ou unicidade por partição (por exemplo, por dia)?

</details>

## Principais Pontos

- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`set`</mark> é para **unicidade** e **álgebra de conjuntos**, não para **ordem** nem **índice**.
- **Vazio correto:** <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`set()`</mark>, não <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`{}`</mark>.
- **Remoção segura:** <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`discard`</mark> versus **remoção estrita:** <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`remove`</mark>.
- **Comparar lotes:** <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`|`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`&`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`-`</mark> mapeiam perguntas de dados comuns.
- **Relações:** subconjunto/superconjunto e <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`isdisjoint`</mark> traduzem validações de schema/catálogo.

## Preparação para Prática

Você deve sair desta lição capaz de:

1. Criar conjuntos a partir de strings, listas e ranges, sem cair na armadilha do literal vazio.
2. Explicar quando <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`remove`</mark> versus <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`discard`</mark> evita quebrar um job em produção.
3. Modelar perguntas tipo “novos/descontinuados/em comum” usando diferença e interseção.
4. Reconhecer erros típicos (<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`KeyError`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`unhashable`</mark>) e corrigir pela normalização dos registros.

## Laboratório de Prática

### Easy — Deduplicar IDs de sessão (ordem não importa)

Você recebeu uma lista de <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`session_id`</mark> com repetições. Retorne **quantos IDs únicos** existem.

```python
def contar_sessoes_unicas(session_ids: list[str]) -> int:
    # TODO: converta a lista em conjunto e retorne o tamanho do conjunto
    return 0


print(contar_sessoes_unicas(["s1", "s2", "s1", "s3", "s2"]))
```

### Medium — Itens novos no lote de hoje

Dadas duas listas de SKUs (ontem e hoje), retorne um conjunto com SKUs que **aparecem hoje e não apareciam ontem**.

```python
def skus_novos(skus_ontem: list[str], skus_hoje: list[str]) -> set[str]:
    # TODO: use conversão para set e a operação de diferença correta
    return set()


print(sorted(skus_novos(["A", "B"], ["B", "C", "D"])))
```

### Hard — Validação de catálogo + política tolerante a remoção

Você mantém um conjunto de categorias permitidas. Uma requisição traz categorias observadas. Retorne:

- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`valido`</mark>: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`True`</mark> se **todas** as categorias observadas estão no conjunto permitido
- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`invalidas`</mark>: conjunto das categorias fora do catálogo

**Importante:** use operações de conjunto (não reimplemente com laços desnecessários, a menos que precise para otimização extrema).

```python
def validar_categorias(permitidas: set[str], observadas: list[str]) -> tuple[bool, set[str]]:
    # TODO: converta observadas para set e calcule o que está fora do catálogo
    # TODO: determine valido com base em invalidas vazio ou não
    invalidas = set()
    valido = True
    return valido, invalidas


print(validar_categorias({"eletrônicos", "livros"}, ["livros", "spam"]))
```

<!-- CONCEPT_EXTRACTION
concepts:
  - set (conjunto)
  - unicidade e semântica de "não ordenado"
  - hashable / unhashable
  - set() versus {}
  - add / update / remove / discard / pop / clear
  - união (|) interseção (&) diferença (-)
  - subconjunto / superconjunto / issubset / issuperset
  - isdisjoint
  - comparação com listas e dicionários na escolha de estrutura
skills:
  - Deduplicar coleções com set quando a ordem não é requisito
  - Calcular diferenças e interseções entre lotes de chaves (ETL leve)
  - Escolher remove versus discard conforme a expectativa de existência do elemento
  - Normalizar registros para torná-los hashable antes de formar conjuntos
  - Interpretar erros KeyError e TypeError unhashable no contexto de conjuntos
examples:
  - deduplicacao-session-ids
  - skus-ontem-hoje-diferenca
  - categorias-permitidas-validacao-subconjunto
-->

<!-- EXERCISES_JSON
[
  {
    "id": "conjuntos-contar-sessoes-unicas",
    "slug": "conjuntos-contar-sessoes-unicas",
    "difficulty": "easy",
    "title": "Contar sessões únicas com set",
    "discipline": "python_para_processamento_de_dados",
    "editorLanguage": "python",
    "tags": ["python", "set", "deduplicacao", "dados"],
    "summary": "Completar contagem de IDs únicos convertendo uma lista para conjunto."
  },
  {
    "id": "conjuntos-skus-novos-diferenca",
    "slug": "conjuntos-skus-novos-diferenca",
    "difficulty": "medium",
    "title": "SKUs novos entre lotes (diferença de conjuntos)",
    "discipline": "python_para_processamento_de_dados",
    "editorLanguage": "python",
    "tags": ["python", "set", "diferenca", "etl"],
    "summary": "Obter itens presentes no lote de hoje que não existiam ontem usando set e operador de diferença."
  },
  {
    "id": "conjuntos-validar-categorias",
    "slug": "conjuntos-validar-categorias",
    "difficulty": "hard",
    "title": "Validar categorias observadas contra catálogo (conjuntos)",
    "discipline": "python_para_processamento_de_dados",
    "editorLanguage": "python",
    "tags": ["python", "set", "validacao", "subconjunto"],
    "summary": "Detectar categorias fora do permitido e decidir validade com operações de conjunto."
  }
]
-->

```json
LESSONS_JSON_HINT
{
  "discipline": "python_para_processamento_de_dados",
  "slug": "conjuntos-sets-python",
  "title": "Conjuntos (`set`) em Python para dados",
  "order": 9,
  "file": "content/python_para_processamento_de_dados/conjuntos-sets-python.md"
}
```
