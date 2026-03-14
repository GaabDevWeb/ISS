---
title: "Variáveis em Python dentro de Projetos de Dados"
slug: "variaveis-python-projeto-dados"
discipline: "projeto-bloco"
order: 5
description: "Como pensar e usar variáveis em Python em conjunto com tipos de dados de bancos relacionais dentro de um projeto de dados."
reading_time: 24
difficulty: "easy"
concepts:
  - variaveis
  - tipos de dados
  - atribuicao
  - entrada-e-saida
  - conversao-de-tipos
prerequisites:
  - introducao-projeto-bloco-formacao
  - metodologias-projeto-de-dados
  - pipeline-ferramentas-bancos-dados
  - laboratorio-dados-python-sql
learning_objectives:
  - "Explicar o que é uma variável em Python e como ela se relaciona com tipos de dados."
  - "Usar atribuição, entrada e conversão de tipos para construir pequenos fluxos de cálculo em Python."
  - "Conectar variáveis em Python com tipos de campos em bancos relacionais em um cenário de projeto de dados."
exercises:
  - question: "O que significa dizer que uma variável em Python é 'apenas um nome para um valor em memória'?"
    answer: "Significa que a variável não é o valor em si, mas uma etiqueta que aponta para um espaço de memória onde o valor está armazenado; você pode mudar essa etiqueta para apontar para outro valor ao longo do programa."
    hint: "Pense em etiquetas coladas em caixas diferentes ao longo do tempo."
  - question: "Por que Python dispensa declaração explícita de tipo de variável, enquanto muitas outras linguagens exigem isso?"
    answer: "Porque Python faz inferência de tipo em tempo de execução; ele analisa o valor atribuído e decide internamente qual tipo usar, enquanto linguagens mais formais precisam da informação de tipo antecipadamente para compilar ou validar o código."
    hint: "Compare 'diga antes o tipo' com 'eu descubro a partir do valor'."
  - question: "Qual a importância de entender que `input()` sempre retorna `str` quando se está lidando com números?"
    answer: "Porque, se você não converter o retorno de `input()` para um tipo numérico (`int`, `float`), operações matemáticas vão falhar ou produzir resultados incorretos; é necessário converter explicitamente a string para o tipo numérico adequado."
    hint: "Repare no que acontece se você tentar somar dois `input()` sem conversão."
---

## Visão Geral do Conceito

Variáveis são um dos blocos fundamentais de qualquer código de dados.  
Em Python — linguagem central do seu projeto de bloco — variáveis são **nomes** que apontam para valores em memória e podem mudar ao longo da execução do programa.

Nesta lição, vamos organizar o que o professor trabalha em aula sobre **variáveis, tipos de dados, atribuição, entrada/saída e conversão** em Python, sempre conectando com a realidade de **projetos de dados** e com os tipos de campos em bancos relacionais.

## Modelo Mental

Um modelo mental simples é pensar em variáveis como **etiquetas em caixas de dados**:

- Cada etiqueta (nome da variável) aponta para uma caixa (valor e tipo em memória).
- Você pode colar a mesma etiqueta em outra caixa (reatribuição), mudando o valor que ela representa.
- Em Python, você não precisa dizer de antemão que tipo de coisa vai dentro da caixa; o interpretador descobre isso a partir do valor colocado.

Já em bancos relacionais, os **campos** das tabelas são mais rígidos: cada coluna tem um tipo fixo (inteiro, texto, data, etc.) que não muda linha a linha.

Entender essas duas visões — flexibilidade de Python e rigidez do banco — é crucial para integrar código e dados com segurança.

## Mecânica Central

### 1. O que é uma variável

Em termos práticos:

- Uma variável é um **identificador** (nome) associado a um valor armazenado em memória.
- Em Python, você cria variáveis por **atribuição**:

```python
contador = 0
nome_cliente = "Ana"
taxa_juros = 0.035
ativo = True
```

- Não há declaração de tipo explícita; o tipo é inferido a partir do valor.

Em outras linguagens (e até em scripts SQL), muitas vezes é obrigatório declarar tipo antes de usar — por exemplo, `DECLARE @contador INT;`.

### 2. Tipos básicos em Python

Os tipos mais comuns discutidos na aula:

- Numéricos:
  - <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`int`</mark> — números inteiros.
  - <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`float`</mark> — números com casas decimais.
- Textuais:
  - <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`str`</mark> — cadeias de caracteres.
- Lógicos:
  - <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`bool`</mark> — `True` ou `False`.

Você pode usar a função <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`type()`</mark> para inspecionar o tipo:

```python
valor = 10.5
print(type(valor))  # <class 'float'>
```

### 3. Atribuição e `case sensitive`

Python usa o símbolo <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`=`</mark> para atribuição:

```python
contador = 0
contador = contador + 1
```

E é **case sensitive**:

- `contador`, `Contador` e `CONTADOR` são **variáveis diferentes**.
- Usar nomes coerentes e consistentes evita bugs difíceis de encontrar.

### 4. Entrada e saída de dados

Na aula, o professor destaca duas funções básicas:

- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`print()`</mark> — saída (mostra algo na tela).
- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`input()`</mark> — entrada (lê do teclado).

Ponto crítico:

- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`input()`</mark> **sempre retorna uma string**, mesmo que você digite apenas números.
- Para fazer cálculos, é preciso **converter**:

```python
texto = input("Digite um número: ")
numero = float(texto)  # ou int(texto)
resultado = numero * 2
print(resultado)
```

### 5. Conversão de tipos

As funções de conversão são usadas para transformar o valor de um tipo em outro:

- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`int()`</mark> — converte para inteiro (quando possível).
- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`float()`</mark> — converte para número com casas decimais.
- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`str()`</mark> — converte para texto.
- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`bool()`</mark> — converte para verdadeiro/falso de acordo com regras específicas.

Exemplo alinhado ao que aparece na aula:

```python
valor_digitado = input("Digite o valor de uma compra: ")
valor = float(valor_digitado)  # converte str -> float
desconto = 0.1
valor_final = valor * (1 - desconto)
print(f"Valor final com desconto: {valor_final}")
```

### 6. Variáveis em Python vs campos em bancos relacionais

No contexto de projeto de dados:

- Em Python, variáveis podem mudar de tipo ao longo da execução (não é uma boa prática, mas é possível).
- No banco relacional, **cada coluna tem um tipo fixo**, escolhido no momento em que a tabela é criada (por exemplo, `INTEGER`, `DECIMAL(10,2)`, `VARCHAR(100)`, `DATE`).

Para evitar problemas:

- Garanta que os valores que você insere com Python **respeitam o tipo da coluna**.
- Use conversão explícita antes de enviar dados ao banco.

Isso conecta a aula de variáveis à realidade dos pipelines de dados que você irá montar.

### 7. Estruturas de controle e variáveis

Variáveis não existem no vácuo; elas aparecem dentro de:

- **Estruturas de decisão** (`if`, `elif`, `else`).
- **Laços de repetição** (`while`, `for`).

O professor mostra menus, loops e comparações usando variáveis como:

```python
opcao = 0

while opcao != 4:
    print("1 - Cadastrar cliente")
    print("2 - Listar clientes")
    print("3 - Gerar relatório")
    print("4 - Sair")
    opcao = int(input("Escolha uma opção: "))
```

Esses mesmos padrões são comuns em scripts de automação de dados e ferramentas internas.

## Uso Prático

### No projeto de bloco

Você pode aplicar os conceitos de variáveis em Python para:

- Ler parâmetros de filtros (por exemplo, período de datas) digitados pelo usuário e gerar consultas ou arquivos a partir disso.
- Controlar laços que percorrem linhas lidas de um CSV e preparam registros para inserção no banco.
- Modelar pequenos menus de linha de comando que disparam partes diferentes do pipeline de dados (carregar, limpar, gerar relatório).

### Exemplo: script simples de cálculo de imposto

Inspirando-se no exemplo real de reforma fiscal citado na aula, um script mínimo poderia:

```python
aliquota = float(input("Digite a alíquota (%): "))
base_calculo = float(input("Digite a base de cálculo: "))

imposto = base_calculo * (aliquota / 100)

print(f"Imposto devido: {imposto}")
```

Aqui você usa:

- entrada com `input()`;
- conversão com `float()`;
- variáveis nomeadas de forma clara;
- uma expressão simples que pode depois ser levada para um contexto mais amplo de projeto.

## Erros Comuns

- **Esquecer que `input()` retorna string**  
  Tentar fazer `resultado = input() * 2` e se surpreender com concatenação de texto ou erro.

- **Misturar maiúsculas e minúsculas nos nomes**  
  Escrever `totalVendas` em um lugar e `totalvendas` em outro e achar que é a mesma variável, gerando erros de nome não definido.

- **Reaproveitar a mesma variável para tipos muito diferentes**  
  Guardar uma string em `valor`, depois um número, depois um dicionário pode tornar o código confuso e difícil de depurar.

- **Confiar demais na flexibilidade de Python**  
  Flexibilidade é útil, mas em projetos reais é importante manter disciplina de nomes, tipos esperados e conversões explícitas.

## Visão Geral de Debugging

Ao depurar problemas envolvendo variáveis:

1. **Inspecione valores intermediários com `print()`**  
   - Verifique o que está sendo lido por `input()`.  
   - Confira o resultado de cada conversão.
2. **Verifique o tipo com `type()`**  
   - Se a operação falhar, pergunte-se “qual é o tipo desse valor agora?”.
3. **Reveja nomes de variáveis**  
   - Erros como `NameError` geralmente indicam digitação incorreta ou uso fora de escopo.
4. **Separe responsabilidades**  
   - Use variáveis diferentes para texto bruto, valores convertidos e resultados de cálculo.

Esse estilo de debugging é o mesmo que você usará mais tarde ao lidar com dados reais de APIs, arquivos e bancos.

## Principais Pontos

- Variáveis em Python são **nomes para valores em memória**, com tipos inferidos a partir dos valores atribuídos.
- `input()` sempre retorna string; para cálculos, use conversão explícita (`int`, `float`, etc.).
- Em bancos relacionais, tipos de campos são fixos por coluna, exigindo que Python envie dados coerentes com esses tipos.
- Boas práticas com variáveis (nomes claros, atenção a maiúsculas/minúsculas, conversões visíveis) simplificam muito o debugging e a integração com bancos.

## Preparação para Prática

Depois desta lição, você deve ser capaz de:

- Implementar pequenos scripts em Python que usem variáveis, tipos básicos, entrada/saída e conversão.
- Ler e entender exemplos de código com menus, laços e condições que usam variáveis de forma organizada.
- Planejar como essas variáveis vão alimentar consultas SQL e campos de tabelas em um projeto de dados.

No Laboratório de Prática a seguir, você vai consolidar esse conhecimento em exercícios focados em **variáveis, tipos e conversões** simulando partes de um projeto de dados real.

## Laboratório de Prática

### Exercício Easy — Declarando e inspecionando variáveis

Crie um pequeno script que declara variáveis representando partes de um registro de vendas e imprime seus tipos.

```python
def describe_sale() -> None:
    # TODO: definir variáveis como cliente, data_venda, valor_bruto, pago
    # e imprimir o tipo de cada uma usando type().
    pass


if __name__ == "__main__":
    describe_sale()
```

### Exercício Medium — Menu simples com entrada e conversão

Implemente um menu de linha de comando que permita ao usuário escolher operações básicas sobre um valor numérico.

```python
def show_menu() -> None:
    print("1 - Dobrar valor")
    print("2 - Calcular 10% de imposto")
    print("3 - Converter para string formatada")
    print("4 - Sair")


def main() -> None:
    opcao = 0
    while opcao != 4:
        show_menu()
        # TODO: ler a opção com input(), converter para int
        # TODO: se a opção for 1, 2 ou 3, pedir um valor numérico (input -> float)
        #       e aplicar a operação correspondente, usando variáveis claras.
        # TODO: tratar opções inválidas com uma mensagem amigável.
        break  # remover depois de implementar o loop corretamente


if __name__ == "__main__":
    main()
```

### Exercício Hard — Mapeando variáveis Python para campos de banco

Desenhe, em código, o mapeamento entre variáveis Python e tipos de campos em uma tabela de banco de dados para um cenário simples (por exemplo, tabela `transacoes`).

```python
from dataclasses import dataclass
from typing import List


@dataclass
class FieldMapping:
    python_var: str
    python_type: str
    db_column: str
    db_type: str


def build_mappings() -> List[FieldMapping]:
    mappings: List[FieldMapping] = []

    # TODO: adicionar pelo menos 4 mapeamentos coerentes,
    # por exemplo: valor_transacao (float) -> VALOR DECIMAL(10,2)

    return mappings


if __name__ == "__main__":
    for m in build_mappings():
        print(f"{m.python_var} ({m.python_type}) -> {m.db_column} ({m.db_type})")
```

Esse exercício fortalece a ponte entre código Python e modelagem de dados relacional.

<!-- CONCEPT_EXTRACTION
concepts:
  - variaveis em python
  - tipos basicos em python
  - atribuicao e case sensitive
  - entrada e saida com input e print
  - conversao de tipos
  - mapeamento entre variaveis python e campos de banco
skills:
  - Declarar, atribuir e inspecionar variaveis em Python
  - Usar input, print e conversoes de tipo em scripts simples
  - Relacionar variaveis Python com tipos de campos em bancos relacionais
examples:
  - menu-variaveis-python
  - conversao-input-float
  - mapeamento-variaveis-campos-banco
-->

<!-- EXERCISES_JSON
[
  {
    "id": "menu-variaveis-python",
    "slug": "menu-variaveis-python",
    "difficulty": "medium",
    "title": "Criar um menu com variáveis e conversões em Python",
    "discipline": "projeto-bloco",
    "editorLanguage": "python",
    "tags": ["projeto-bloco", "python", "variaveis"],
    "summary": "Implementar um menu simples que leia valores com input(), converta para tipos numéricos e aplique operações básicas."
  },
  {
    "id": "conversao-input-float",
    "slug": "conversao-input-float",
    "difficulty": "easy",
    "title": "Converter entrada de texto em número para cálculos",
    "discipline": "projeto-bloco",
    "editorLanguage": "python",
    "tags": ["projeto-bloco", "python", "conversao-de-tipos"],
    "summary": "Ler valores com input(), converter para float e calcular resultados simples."
  },
  {
    "id": "mapeamento-variaveis-campos-banco",
    "slug": "mapeamento-variaveis-campos-banco",
    "difficulty": "hard",
    "title": "Mapear variáveis de Python para campos de banco de dados",
    "discipline": "projeto-bloco",
    "editorLanguage": "python",
    "tags": ["projeto-bloco", "tipos", "banco-de-dados"],
    "summary": "Definir em código a correspondência entre variáveis em Python e tipos de colunas em tabelas relacionais para um cenário de transações."
  }
]
-->

