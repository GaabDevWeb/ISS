---
title: "Conversão de tipos e operadores aritméticos em Python"
slug: "conversao-tipos-operadores-aritmeticos"
discipline: "python"
order: 4
description: "Como o Python converte valores entre tipos básicos e realiza operações aritméticas com segurança de tipos."
reading_time: 40
difficulty: "easy"
concepts:
  - conversão de tipos
  - tipagem dinâmica
  - tipagem forte
  - int
  - float
  - bool
  - string
  - funções built-in
  - operadores aritméticos
  - precedência de operadores
  - ValueError
prerequisites:
  - "por-que-programar-python"
  - "algoritmos-e-notebooks"
  - "variaveis-tipos-estilo-python"
learning_objectives:
  - "Entender o que significa o Python ter tipagem dinâmica e forte e como isso afeta conversões entre tipos."
  - "Usar corretamente as funções de conversão <mark style=\"background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;\">`int()`</mark>, <mark style=\"background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;\">`float()`</mark>, <mark style=\"background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;\">`bool()`</mark> e <mark style=\"background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;\">`str()`</mark> em cenários reais."
  - "Aplicar operadores aritméticos (+, -, *, /, //, %, **) respeitando a precedência padrão da linguagem."
  - "Reconhecer e tratar erros comuns de conversão de tipos, como <mark style=\"background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;\">`ValueError`</mark> ao tentar converter textos não numéricos."
exercises:
  - question: "Por que dizemos que o Python tem tipagem dinâmica, mas forte, e qual é o impacto prático disso na conversão de tipos?"
    answer: "Tipagem dinâmica significa que o tipo de uma variável é inferido em tempo de execução a partir do valor atribuído (você não precisa declarar `int x` antes); tipagem forte significa que o Python não permite misturar tipos incompatíveis sem conversão explícita (por exemplo, não soma diretamente string com número nem converte um texto qualquer em `float`). Na prática, isso facilita a escrita do código (menos burocracia), mas exige cuidado ao converter e combinar valores de tipos diferentes."
    hint: "Lembre dos exemplos em que `27` e `'python'` ocupam espaços de memória diferentes, das conversões bem-sucedidas de `'12.5'` para `float` e do erro ao tentar converter `'se aqui tiver um texto, o que acontece?'` para `float`."
review_after_days: [1, 3, 7, 30]
---

## Visão Geral do Conceito

Nesta lição vamos aprofundar o que começamos em [[variaveis-tipos-estilo-python]]: além de declarar variáveis, precisamos **converter valores entre tipos** e **fazer contas** com eles.
Você vai ver como o Python usa tipagem dinâmica (ele descobre o tipo a partir do valor) e, ao mesmo tempo, tipagem forte (só combina tipos compatíveis), usando funções como <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`int()`</mark> e <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;;">`float()`</mark> junto com operadores aritméticos.

> **Ideia central:** entender **quando e como** converter valores entre tipos básicos e usar operadores aritméticos com segurança é o que torna seus notebooks capazes de lidar com entradas reais (texto, números de sensores, valores vindo de planilhas ou APIs) sem quebrar.

## Modelo Mental

Pense na memória do computador como uma **prateleira de caixas**.
Cada tipo básico do Python ocupa um número diferente de “caixas” nessa prateleira: um <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`int`</mark> precisa de menos espaço do que uma <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`str`</mark> longa, por exemplo.

Quando você escreve:

```python
valor_1 = 27          # int
valor_2 = "python"    # str
```

o interpretador:

- cria duas variáveis (nomes/literais) `valor_1` e `valor_2`;
- **infere** que `27` é um número inteiro e `"python"` é texto;
- reserva na memória blocos adequados para cada tipo;
- guarda o valor em cada bloco e associa o nome da variável a esse endereço.

A **conversão de tipos** é como pedir ao Python: “pegue o que está nessa caixa e me entregue numa caixa de outro formato”.
Às vezes é fácil (converter `"12.5"` para número), às vezes é impossível (converter `"se aqui tiver um texto, o que acontece?"` para número).

## Mecânica Central

### Tipagem dinâmica e forte

- **Tipagem dinâmica:** você não declara o tipo antes; o Python descobre observando o valor:

```python
idade = 27          # inferido como int
preco = 13.9        # inferido como float
aprovado = True     # inferido como bool
curso = "python"    # inferido como str
```

- **Tipagem forte:** o Python **não mistura** automaticamente tipos incompatíveis.
  - Exemplo: `27 + "3"` gera <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`TypeError`</mark>.
  - Exemplo: `float("se aqui tiver um texto, o que acontece?")` gera <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`ValueError`</mark>.

### Funções built-in de conversão

As principais funções de conversão entre tipos básicos são:

- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`int(x)`</mark>: tenta converter `x` para inteiro;
- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`float(x)`</mark>: tenta converter `x` para número de ponto flutuante;
- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`bool(x)`</mark>: converte `x` para valor lógico (`True`/`False`);
- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`str(x)`</mark>: converte `x` para string.

Exemplo de conversão bem-sucedida e mal-sucedida:

```python
primeira_variavel = "12.987645812330881"
variavel_convertida = float(primeira_variavel)  # OK

print(type(primeira_variavel), primeira_variavel)
print(type(variavel_convertida), variavel_convertida)

primeira_variavel = "se aqui tiver um texto, o que acontece?"
variavel_convertida = float(primeira_variavel)  # ValueError!
```

Nesse segundo caso, o Python não sabe transformar aquela frase em um número, então lança um <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`ValueError`</mark>.

### Operadores aritméticos básicos

Os operadores que usamos no dia a dia com números em Python são:

- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`+`</mark> — soma  
- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`-`</mark> — subtração  
- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`*`</mark> — multiplicação  
- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`/`</mark> — divisão com resultado `float`  
- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`//`</mark> — divisão inteira (piso)  
- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`%`</mark> — módulo (resto da divisão)  
- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`**`</mark> — exponenciação

#### Precedência de operações

A ordem padrão de avaliação, da maior prioridade para a menor, é:

1. Parênteses `()`.
2. Exponenciação <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`**`</mark>.
3. Multiplicação, divisão, divisão inteira, módulo (`*`, `/`, `//`, `%`).
4. Adição e subtração (`+`, `-`).

```python
nota_matematica = 6.8
nota_programacao = 8.1

soma_notas = nota_matematica + nota_programacao
media = soma_notas / 2

print("Nota de Matemática:", nota_matematica)
print("Nota de Programação:", nota_programacao)
print("Soma das notas:", soma_notas)
print("Média:", media)
```

### Fluxo de conversão segura

Um fluxo típico ao trabalhar com dados que chegam como texto (de inputs, CSVs ou APIs) é:

```mermaid
flowchart TD
    A[Texto de entrada<br/>ex: '12.5'] --> B{Texto parece numérico?}
    B -- não --> C[Registrar erro<br/>ou pedir nova entrada]
    B -- sim --> D[Escolher tipo alvo<br/>int, float, bool]
    D --> E[Chamar função de conversão<br/>int(), float(), bool()]
    E --> F{Conversão funcionou?}
    F -- não (ValueError) --> C
    F -- sim --> G[Usar valor convertido<br/>em cálculos]
```

Esse diagrama resume o que você viu na aula: usar conversão **apenas quando faz sentido**, e tratar o caso em que o texto não é numérico.

## Uso Prático

### Exemplo 1: convertendo leituras de temperatura

Imagine um arquivo CSV com a temperatura de um sensor em graus Celsius, mas tudo como texto:

```python
leituras_celsius_brutas = ["22.5", "23.0", "21.8", "erro", "24.1"]

temperaturas_validas = []

for leitura in leituras_celsius_brutas:
    try:
        temperatura = float(leitura)
        temperaturas_validas.append(temperatura)
    except ValueError:
        print("Leitura inválida ignorada:", leitura)

print("Temperaturas válidas:", temperaturas_validas)
```

Aqui combinamos:

- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`float()`</mark> para conversão,
- tratamento de <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`ValueError`</mark>,
- operadores aritméticos (que você pode usar depois para média, máximo, etc.).

### Exemplo 2: dashboard simples de notas

```python
nota_matematica = 6.8
nota_programacao = 8.1

soma = nota_matematica + nota_programacao
media = soma / 2

print("Nota de Matemática:", nota_matematica)
print("Nota de Programação:", nota_programacao)
print("Soma das Notas:", soma)
print("Média:", media)
```

Você pode imaginar esse cálculo sendo feito antes de alimentar um dashboard de desempenho de alunos no seu projeto de dados.

### Exemplo 3: divisão inteira, resto e exponenciação

```python
valor1 = 17
valor2 = 4

piso = valor1 // valor2       # divisão inteira
resto = valor1 % valor2       # resto da divisão
potencia = valor1 ** valor2   # exponenciação

print("Piso:", piso)
print("Resto:", resto)
print("Potência:", potencia)
```

Esses operadores aparecem em diversas situações: particionar registros em lotes, calcular índices de páginas, gerar IDs, trabalhar com criptografia e mais.

## Erros Comuns

- **Tentar converter qualquer texto em número**
  - Exemplo: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`float("se aqui tiver um texto, o que acontece?")`</mark>.
  - Resultado: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`ValueError: could not convert string to float`</mark>.

- **Esquecer que `.` é o separador decimal**
  - Exemplo: escrever `13,9` em vez de `13.9` no código.
  - O Python entende `13,9` como duas expressões separadas por vírgula (um *tuple*), não como número decimal.

- **Confundir divisão normal e divisão inteira**
  - `17 / 4` → `4.25` (resultado `float`);
  - `17 // 4` → `4` (parte inteira).

- **Misturar string com número em operações aritméticas**
  - Exemplo: `"Total: " + 100` → <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`TypeError`</mark>.
  - Correto: `"Total: " + str(100)` ou `f"Total: {100}"`.

## Visão Geral de Debugging

Quando surgir um erro relacionado a tipos (`TypeError`, `ValueError`), siga este roteiro:

1. **Inspecione o valor e o tipo** com <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`print()`</mark> e <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`type()`</mark>:

   ```python
   print(repr(valor), type(valor))
   ```

2. **Pergunte-se**: “Esse valor pode, de forma lógica, ser convertido para o tipo que estou pedindo?”  
   - `"27"` → pode virar número;  
   - `"vinte e sete"` → não pode virar `int` sem tratamento extra.

3. **Localize a linha exata do erro** olhando o *stack trace* (a mensagem mostra o número da linha e o arquivo).

4. **Simplifique a expressão**: quebre em etapas menores (primeiro converta, depois some, depois formate para texto).

5. **Use `try`/`except` com parcimônia**: trate explicitamente o caso de conversão inválida, em vez de simplesmente “engolir” qualquer exceção.

## Principais Pontos

- O Python **infere** o tipo de uma variável a partir do valor atribuído (tipagem dinâmica), mas **não mistura tipos incompatíveis** (tipagem forte).
- As funções <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`int()`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`float()`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`bool()`</mark> e <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`str()`</mark> fazem conversão explícita entre tipos básicos e geram erros quando a conversão não faz sentido.
- Operadores aritméticos (`+`, `-`, `*`, `/`, `//`, `%`, `**`) seguem uma ordem de precedência que impacta o resultado das expressões.
- Tratar corretamente conversões e operadores é essencial para ler dados externos (inputs, CSVs, APIs) e alimentar pipelines e dashboards sem que o notebook quebre.

## Preparação para Prática

Depois desta lição, você deve ser capaz de:

- Ler valores de entrada como texto e convertê-los explicitamente para o tipo certo antes de calcular.
- Escolher entre divisão normal (`/`), inteira (`//`) e módulo (`%`) dependendo do que o problema pede.
- Identificar rapidamente quando um erro foi causado por uma conversão impossível (como tentar transformar um texto qualquer em número) e corrigi-lo.

No **Laboratório de Prática**, você vai aplicar essas ideias em mini-projetos de dados: conversão de temperaturas, cálculo de área/perímetro e um pequeno “analisador” numérico de três valores.

## Laboratório de Prática

### Desafio Easy — Converter leituras de temperatura

Você está recebendo leituras de temperatura de sensores em um arquivo CSV, mas todas chegam como **texto**.
Implemente uma função que receba uma lista de strings com temperaturas em graus Celsius, **converta para `float`** e retorne uma lista com os valores em Fahrenheit.

Regra de conversão: \( F = C \times \frac{9}{5} + 32 \).

```python
from typing import Iterable, List

def converter_celsius_para_fahrenheit(leituras_celsius: Iterable[str]) -> List[float]:
    """
    Recebe uma coleção de strings representando temperaturas em graus Celsius
    (por exemplo, ["22.5", "23.0", "erro"]) e retorna uma lista com as
    temperaturas válidas convertidas para Fahrenheit.

    Leituras que não puderem ser convertidas para float devem ser ignoradas,
    mas o programa não deve quebrar.
    """
    resultados: List[float] = []

    # TODO: para cada leitura:
    #   1. Tentar converter a string para float usando float().
    #   2. Se a conversão funcionar, aplicar a fórmula de conversão para Fahrenheit.
    #   3. Adicionar o resultado na lista `resultados`.
    #   4. Se der ValueError, simplesmente ignore aquela leitura.

    return resultados


def main() -> None:
    leituras = ["22.5", "23.0", "21.8", "erro", "24.1"]
    temperaturas_f = converter_celsius_para_fahrenheit(leituras)
    print("Leituras originais:", leituras)
    print("Temperaturas em Fahrenheit:", temperaturas_f)


if __name__ == "__main__":
    main()
```

### Desafio Medium — Área e perímetro de um retângulo a partir de strings

Você está implementando uma pequena calculadora de layout de dashboards, em que a largura e altura dos “cards” chegam como texto (por exemplo, a partir de um formulário em uma aplicação web).
Implemente uma função que receba `largura` e `altura` como strings, converta para `float` e retorne área e perímetro.

Se qualquer conversão falhar, a função deve retornar `None`.

```python
from typing import Optional, Tuple

def calcular_area_e_perimetro_retangulo(largura_str: str, altura_str: str) -> Optional[Tuple[float, float]]:
    """
    Recebe largura e altura de um retângulo como strings (por exemplo "10.5" e "3")
    e tenta converter para float. Se der certo, retorna (area, perimetro).
    Se qualquer conversão falhar, retorna None.
    """
    # TODO:
    #   1. Tentar converter largura_str e altura_str para float.
    #   2. Calcular área (largura * altura).
    #   3. Calcular perímetro (2 * (largura + altura)).
    #   4. Retornar (area, perimetro).
    #   5. Se alguma conversão der ValueError, retornar None.

    return None


def main() -> None:
    exemplos = [("10", "5"), ("7.5", "3.2"), ("largura", "4")]
    for largura, altura in exemplos:
        resultado = calcular_area_e_perimetro_retangulo(largura, altura)
        print(f"Entrada: largura={largura!r}, altura={altura!r} => resultado: {resultado}")


if __name__ == "__main__":
    main()
```

### Desafio Hard — Mini-analisador numérico de três valores

Em um caderno de experimentos, você costuma registrar **três medições** (por exemplo, tempo de resposta de uma API, temperatura média de um servidor, número de acessos).
Implemente uma função que receba três valores como **strings**, converta para `float` e calcule:

- média aritmética;
- média geométrica;
- desvio padrão (populacional) dos três valores;
- dobro da soma;
- triplo do produto;
- raiz quadrada da soma dos quadrados.

Use apenas operadores aritméticos básicos e funções de conversão.

```python
from math import sqrt
from typing import Dict, Optional


def analisar_tres_valores(a_str: str, b_str: str, c_str: str) -> Optional[Dict[str, float]]:
    """
    Recebe três valores numéricos como strings, converte para float e retorna
    um dicionário com várias estatísticas:

    - media_aritmetica
    - media_geometrica
    - desvio_padrao
    - dobro_da_soma
    - triplo_do_produto
    - raiz_soma_quadrados

    Se qualquer conversão falhar, retorna None.
    """
    # TODO:
    #   1. Converter a_str, b_str e c_str para float.
    #   2. Calcular todas as estatísticas descritas acima usando apenas
    #      operadores aritméticos (+, -, *, /, **, //, %) e sqrt().
    #   3. Montar e retornar um dicionário com esses resultados.
    #   4. Se alguma conversão der ValueError, retornar None.

    return None


def main() -> None:
    exemplos = [
        ("10", "20", "30"),
        ("1.5", "3.0", "4.5"),
        ("dez", "20", "30"),  # deve falhar na conversão
    ]

    for a, b, c in exemplos:
        resultado = analisar_tres_valores(a, b, c)
        print(f"Entradas: {a!r}, {b!r}, {c!r}")
        print("Resultado:", resultado)
        print("-" * 40)


if __name__ == "__main__":
    main()
```

<!-- CONCEPT_EXTRACTION
concepts:
  - conversão de tipos
  - tipagem dinâmica
  - tipagem forte
  - int
  - float
  - bool
  - string
  - operadores aritméticos
  - precedência de operadores
skills:
  - Converter textos numéricos para tipos numéricos com int() e float()
  - Usar str() para formatar resultados numéricos em mensagens legíveis
  - Aplicar operadores aritméticos respeitando precedência e tipos envolvidos
  - Tratar ValueError ao validar entradas numéricas vindas de usuários, CSVs ou APIs
  - Escolher entre divisão normal, divisão inteira, módulo e exponenciação conforme o problema
examples:
  - converter-celsius-para-fahrenheit-lista
  - area-perimetro-retangulo-strings
  - analisador-tres-valores-estatisticas
-->

<!-- EXERCISES_JSON
[
  {
    "id": "python-converter-celsius-para-fahrenheit",
    "slug": "python-converter-celsius-para-fahrenheit",
    "difficulty": "easy",
    "title": "Converter leituras de temperatura de texto para Fahrenheit",
    "discipline": "python",
    "editorLanguage": "python",
    "tags": ["python", "conversao-tipos", "float", "listas"],
    "summary": "Converta uma lista de strings com temperaturas em Celsius para uma lista de floats em Fahrenheit, ignorando leituras inválidas."
  },
  {
    "id": "python-area-perimetro-retangulo-strings",
    "slug": "python-area-perimetro-retangulo-strings",
    "difficulty": "medium",
    "title": "Calcular área e perímetro de um retângulo a partir de strings",
    "discipline": "python",
    "editorLanguage": "python",
    "tags": ["python", "conversao-tipos", "float", "operadores-aritmeticos"],
    "summary": "Receba largura e altura como strings, converta para float e calcule área e perímetro de um retângulo, retornando None em caso de erro."
  },
  {
    "id": "python-analisar-tres-valores-estatisticas",
    "slug": "python-analisar-tres-valores-estatisticas",
    "difficulty": "hard",
    "title": "Mini-analisador numérico de três valores",
    "discipline": "python",
    "editorLanguage": "python",
    "tags": ["python", "conversao-tipos", "operadores-aritmeticos", "estatistica"],
    "summary": "Converta três valores numéricos recebidos como texto, calcule estatísticas básicas com operadores aritméticos e trate conversões inválidas."
  }
]
-->

