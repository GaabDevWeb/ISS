---
title: "Range avançado, acumuladores, enumerate e loops aninhados em Python"
slug: "range-acumuladores-enumerate-loops-aninhados"
discipline: "python"
order: 12
description: "Como combinar range() com for para repetir ações, acumular valores, numerar elementos com enumerate e criar loops aninhados em estruturas 2D."
reading_time: 65
difficulty: "easy"
concepts:
  - range
  - laços de repetição
  - acumuladores
  - operadores de atribuição composta
  - tabuada
  - enumerate
  - loops aninhados
  - matriz 2D (linha e coluna)
prerequisites:
  - "por-que-programar-python"
  - "algoritmos-e-notebooks"
  - "variaveis-tipos-estilo-python"
  - "conversao-tipos-operadores-aritmeticos"
  - "strings-literais-multilinhas"
  - "strings-escape-concatenacao"
  - "strings-indices-slice-metodos"
  - "strings-interpolacao-input"
  - "desvios-condicionais-if-elif-else"
  - "operadores-logicos-match-case"
  - "loops-for-range-listas"
learning_objectives:
  - "Aprofonfar o uso da função range() com diferentes assinaturas (stop, start/stop, start/stop/step) para controlar laços for."
  - "Usar variáveis acumuladoras e operadores de atribuição composta (+=) para somar valores em laços."
  - "Construir taboadas e relatórios numéricos com for e range()."
  - "Aplicar enumerate e loops aninhados para percorrer coleções com índices e estruturas 2D."
exercises:
  - question: "Por que é mais legível escrever `soma += numero` dentro de um laço do que `soma = soma + numero`, e o que essa sintaxe comunica para quem lê o código?"
    answer: "`soma += numero` é uma forma abreviada e idiomática de expressar 'pegue o valor atual de soma e acrescente numero a ele', evitando repetição do nome da variável e focando na ideia de acumular. Para quem lê, essa sintaxe sinaliza rapidamente que se trata de um acumulador sendo atualizado em cada iteração, o que é um padrão muito comum em loops."
    hint: "Compare quantas vezes o nome da variável aparece nas duas formas e pense em como isso ajuda a reconhecer padrões como 'soma', 'contador', 'total'."
review_after_days: [1, 3, 7, 30]
---

### Visão Geral

Esta aula aprofunda o uso de **laços `for` com `range()`**, apresentando padrões clássicos de programação: **acumuladores** (como somas e médias), **tabuada**, numeração de elementos com **`enumerate()`** e **loops aninhados** para representar estruturas 2D como matrizes. Tudo isso reforça a ideia de que a maior parte da lógica em programas de dados combina **condições** e **repetição controlada**.

### Modelo Mental

Pense em três metáforas:

- **Acumulador**: um “cofrinho” que começa em zero e, a cada iteração, recebe mais moedas (`soma += numero`).
- **Enumerate**: uma fila em que cada pessoa recebe um crachá com número; você enxerga ao mesmo tempo o **índice** e o **valor**.
- **Loops aninhados**: uma grade de assentos (linhas e colunas); o laço externo percorre as linhas, o interno percorre as colunas de cada linha.

O `range()` é o “ritmo” que define quantas vezes o laço toca a mesma partitura; o acumulador registra o resultado ao final.

### Mecânica Central

- **`range()` recap (3 formas principais)**:

```python
for i in range(5):       # 0, 1, 2, 3, 4
    print(i)

for i in range(2, 6):    # 2, 3, 4, 5
    print(i)

for i in range(1, 10, 2):  # 1, 3, 5, 7, 9
    print(i)
```

- **Acumulador simples (soma e média)**:

```python
soma = 0
for i in range(5):
    numero = int(input(f"Digite o {i + 1}º número: "))
    soma += numero  # acumulador

media = soma / 5
print(f"Soma = {soma}")
print(f"Média = {media:.3f}")
```

- **Operador de atribuição composta**:

```python
soma = 0
soma = soma + 3   # forma longa
soma += 3         # forma abreviada equivalente
```

- **Tabuada com `for` e `range()`**:

```python
numero = int(input("Digite um número: "))
print(f"\nTabuada do número: {numero}\n")

for i in range(11):  # 0 a 10
    print(f"{numero} x {i} = {numero * i}")
```

- **`enumerate()` para índice + valor**:

```python
frutas = ["maca", "uva", "laranja", "ata"]

for i, fruta in enumerate(frutas):
    print(f"Fruta {i}: {fruta}")
```

- **Loops aninhados para coordenadas (matriz 3x3)**:

```python
for i in range(3):          # linhas
    for j in range(3):      # colunas
        print(f"({i},{j})", end=" ")
    print()                 # quebra de linha ao final de cada linha
```

### Uso Prático

Algumas aplicações diretas:

- **Calculadoras simples**: somar vários valores digitados (notas, vendas diárias, medições).
- **Relatórios de tabuada** para debug de fórmulas e treinos de multiplicação.
- **Relatórios indexados** usando `enumerate()` (por exemplo, lista de produtos numerados ou logs com linha).
- **Estruturas 2D** (linhas x colunas) em matrizes, tabelas ou grids de pixels/dashboards.

Exemplo: somar n leituras de sensor e calcular a média:

```python
qtd = int(input("Quantas leituras? "))
soma = 0.0

for i in range(qtd):
    leitura = float(input(f"Leitura {i + 1}: "))
    soma += leitura

media = soma / qtd if qtd > 0 else 0.0
print(f"Média das leituras: {media:.2f}")
```

### Visual: acumulador, enumerate e loops aninhados

```mermaid
flowchart TD
    A[Início] --> B[Definir range()/coleção]
    B --> C{for ... in range/coleção}
    C --> D[Acumulador<br/>total += valor]
    C --> E[Enumerate<br/>(indice, valor)]
    C --> F[Loop interno<br/>for j in range(...)]
    D --> G[Atualizar total]
    E --> H[Usar indice e valor<br/>em impressões/relatórios]
    F --> I[Processar par (i,j)<br/>em matriz 2D]
    G --> C
    H --> C
    I --> C
    C --> J[Fim do laço]
    J --> K[Fim do programa]
```

Esse diagrama destaca que a estrutura do laço é a mesma; o que muda é o que você faz **dentro** dele (acumular, numerar, aninhar).

### Erros Comuns

- **Esquecer de inicializar o acumulador** (usar `soma` sem ter definido `soma = 0` antes do laço).
- **Dividir pela quantidade errada** ao calcular a média (usar o último índice em vez do total de elementos).
- **Confundir `range(10)` com 1 a 10**: lembrar que a parada é **não inclusiva**.
- **Tentar usar `enumerate()` mas ignorar um dos valores**:

```python
for par in enumerate(frutas):
    print(par)  # imprime tuplas (indice, valor), não só o valor; se quiser separado, desempacote em duas variáveis
```

- **Loops aninhados mal identados**, gerando saídas em formato inesperado.

### Visão Geral de Debugging

Para depurar esses padrões:

- Faça **testes de mesa** (como na aula): anote manualmente os valores de `soma`, `numero`, `i` a cada iteração.
- Coloque `print()` temporários dentro do laço para ver: `print(i, numero, soma)`.
- Ao usar `enumerate()`, teste primeiro com `print(list(enumerate(frutas)))` para ver a estrutura (lista de tuplas).
- Em loops aninhados, teste com tamanhos pequenos (`range(2)`) até entender a ordem de visita dos pares `(i, j)`.

### Principais Pontos

- `range()` controla **quantas vezes** um laço é executado e quais valores de índice são usados.
- Variáveis **acumuladoras** e operadores `+=` são padrão para somas e contagens dentro de laços.
- `enumerate()` entrega **índice e valor** ao mesmo tempo, deixando o código mais limpo do que `range(len(lista))`.
- **Loops aninhados** permitem percorrer estruturas 2D (linhas x colunas), bastando ter um `for` dentro de outro.

### Preparação para Prática

Antes do laboratório:

- Reescreva um trecho com `soma = soma + numero` usando `+=` e note a diferença visual.
- Pegue uma lista qualquer (`frutas`, `cidades`) e imprima tanto o índice quanto o valor usando `enumerate()`.
- Esboce em papel uma matriz 3x3 e, ao lado, liste na ordem em que `(i, j)` aparece no loop aninhado.

### Laboratório de Prática

#### 1. Somar e calcular média de n números (Easy)

Implemente uma função que recebe um número `n` e, em seguida, lê `n` números do usuário, retornando a soma e a média.

```python
from typing import Tuple


def somar_e_calcular_media(qtd: int) -> Tuple[float, float]:
    """
    Lê 'qtd' números do usuário, acumulando a soma
    e retornando (soma, media).
    """
    soma = 0.0

    # TODO: usar range(qtd) e um acumulador soma += numero
    # para ler 'qtd' valores do usuário.

    media = soma / qtd if qtd > 0 else 0.0
    return soma, media


if __name__ == "__main__":
    n = int(input("Quantos números deseja digitar? "))
    soma, media = somar_e_calcular_media(n)
    print(f"Soma = {soma}")
    print(f"Média = {media:.3f}")
```

#### 2. Tabuada formatada com múltiplas colunas (Medium)

Implemente uma função que recebe um número inteiro `numero` e imprime a tabuada de 1 a 10, **duas colunas por linha**:

Exemplo (para 5):

`5 x 1 = 5    5 x 2 = 10`  
`5 x 3 = 15   5 x 4 = 20`  
...

```python
def imprimir_tabuada_dupla(numero: int) -> None:
    """
    Imprime a tabuada de 'numero' de 1 a 10, em duas colunas por linha:
      5 x 1 = 5    5 x 2 = 10
      5 x 3 = 15   5 x 4 = 20
      ...
    """
    # TODO:
    # - Use range() e um laço for.
    # - Em cada linha, imprima dois pares (i, i+1) se houver espaço (até 10).
    # - Use f-strings e '\t' para alinhar as colunas.
    pass


if __name__ == "__main__":
    n = int(input("Digite um número para ver a tabuada dupla: "))
    imprimir_tabuada_dupla(n)
```

#### 3. Imprimir coordenadas de uma matriz N x M (Hard)

Implemente uma função que, dados `linhas` e `colunas`, imprime todas as coordenadas `(i, j)` de uma matriz `linhas x colunas`, usando **loops aninhados**. Cada linha da matriz deve ser impressa em uma linha do console.

```python
def imprimir_coordenadas_matriz(linhas: int, colunas: int) -> None:
    """
    Imprime as coordenadas (i,j) de uma matriz de tamanho
    linhas x colunas, linha por linha.
    """
    # TODO:
    # - Use um for externo para as linhas: for i in range(linhas)
    # - Use um for interno para as colunas: for j in range(colunas)
    # - Em cada iteração interna, imprima f"({i},{j}) " com end="".
    # - Após o laço interno, faça um print() vazio para quebrar a linha.
    pass


if __name__ == "__main__":
    imprimir_coordenadas_matriz(3, 3)
    print("---")
    imprimir_coordenadas_matriz(2, 4)
```

<!-- CONCEPT_EXTRACTION
concepts:
  - id: range-avancado
    label: "Uso avançado de range()"
    description: "Configuração de inícios, paradas não inclusivas e passos para controlar laços numéricos."
  - id: acumuladores
    label: "Variáveis acumuladoras em laços"
    description: "Padrão de usar variáveis como soma ou contador para agregar resultados em loops."
  - id: enumerate-funcoes
    label: "Enumerate para índice e valor"
    description: "Uso da função enumerate() para obter, em cada iteração, o índice e o valor de uma coleção."
  - id: loops-aninhados
    label: "Loops aninhados em matrizes"
    description: "Uso de laços for dentro de for para percorrer estruturas bidimensionais."
skills:
  - id: implementar-acumuladores
    label: "Implementar acumuladores com atribuição composta"
    verbs: ["implementar", "refatorar", "otimizar"]
  - id: construir-tabuadas-e-relatorios
    label: "Construir taboadas e relatórios numéricos com loops"
    verbs: ["construir", "formatar", "apresentar"]
  - id: usar-enumerate-e-loops-aninhados
    label: "Usar enumerate e loops aninhados para percursos complexos"
    verbs: ["iterar", "estruturar", "visualizar"]
examples:
  - id: exemplo-soma-media
    title: "Soma e média de cinco números"
    code: |
      soma = 0
      for i in range(5):
          numero = int(input(f"Digite o {i + 1}º número: "))
          soma += numero
      media = soma / 5
      print("Soma:", soma, "Média:", media)
  - id: exemplo-enumerate-frutas
    title: "Enumerando frutas com índice"
    code: |
      frutas = ["maca", "uva", "laranja", "ata"]
      for i, fruta in enumerate(frutas):
          print(f"Fruta {i}: {fruta}")
-->

<!-- EXERCISES_JSON
[
  {
    "id": "somar_e_calcular_media_n_numeros",
    "title": "Somar e calcular média de N números com acumulador",
    "difficulty": "easy",
    "function_name": "somar_e_calcular_media",
    "topics": ["range", "acumuladores", "for"]
  },
  {
    "id": "tabuada_dupla_range",
    "title": "Imprimir tabuada em duas colunas com range",
    "difficulty": "medium",
    "function_name": "imprimir_tabuada_dupla",
    "topics": ["range", "for", "formatação de strings"]
  },
  {
    "id": "coordenadas_matriz_loops_aninhados",
    "title": "Gerar coordenadas de matriz com loops aninhados",
    "difficulty": "hard",
    "function_name": "imprimir_coordenadas_matriz",
    "topics": ["loops aninhados", "range", "matriz 2D"]
  }
]
-->

