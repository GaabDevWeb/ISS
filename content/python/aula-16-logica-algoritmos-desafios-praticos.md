---
title: "Lógica de Programação, Algoritmos de Ordenação e Desafios Práticos em Python"
slug: "python-logica-algoritmos-desafios-praticos"
discipline: "python"
order: 16
description: "Integração de conceitos de loops, funções, mutabilidade e algoritmos clássicos como Bubble Sort."
reading_time: 15
difficulty: "medium"
concepts:
  - ordenação (bubble sort)
  - mutabilidade de listas
  - referência vs cópia
  - laços de repetição (while vs for)
  - randomização (módulo random)
  - lógica de negócio
prerequisites:
  - "funcoes-parametros-docstrings-builtins"
  - "retorno-composicao-funcoes"
learning_objectives:
  - "Implementar e entender o funcionamento de um algoritmo de ordenação básico."
  - "Compreender a diferença entre passagem de referência e cópia de objetos em Python."
  - "Utilizar o módulo random para gerar dados e jogos simples."
  - "Estruturar a lógica de uma aplicação de automação (Caixa Registradora) usando loops e funções."
exercises:
  - question: "Por que ao passar uma lista para uma função e alterá-la, a lista original fora da função também muda?"
    answer: "Porque listas são objetos mutáveis e, em Python, quando passamos uma lista como argumento, estamos passando uma referência ao endereço de memória original, não uma cópia."
    hint: "Pense em endereços de memória e mutabilidade."
  - question: "Qual a principal diferença entre o uso de for e while demonstrada na aula?"
    answer: "O for é preferível quando se conhece o intervalo ou a coleção (ex: percorrer índices), enquanto o while é ideal para loops baseados em condições externas que não sabemos quando serão satisfeitas (ex: aguardar um input específico do usuário)."
    hint: "Controle por índice vs Controle por condição."
---

## Visão Geral do Conceito

Nesta etapa final da introdução à programação com Python, o foco deixa de ser apenas a sintaxe isolada e passa a ser a **integração de ferramentas** para resolver problemas reais. Diferente de apenas decorar comandos, um desenvolvedor de <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`ADS`</mark> (Análise e Desenvolvimento de Sistemas) deve ser capaz de estruturar algoritmos de ordenação, lidar com a persistência de estado em memória e criar fluxos de automação de tarefas.

A aula aborda três pilares:
1.  **Ordenação de Dados**: Como organizar informações de forma lógica.
2.  **Gestão de Memória**: O impacto da mutabilidade ao manipular coleções.
3.  **Fluxos de Controle Dinâmicos**: O uso do <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`while True`</mark> para sistemas interativos.

## Modelo Mental

Pense em uma lista em Python como um conjunto de blocos de **Lego**. Se você der o seu conjunto para alguém "ordenar", essa pessoa vai desmontar e remontar os seus blocos. Se no final você quiser ver como os blocos estavam antes, você não conseguirá, a menos que tenha feito uma xerox (ou foto) exata do conjunto original antes de entregá-lo.

Em programação, essa "xerox" é a **Cópia**, enquanto entregar os blocos originais é a **Passagem por Referência**. Se você altera a referência, você altera o dado original em qualquer lugar do sistema que aponte para aquele "endereço".

## Mecânica Central

### 1. Ordenação Clássica (Bubble Sort Simplificado)
O algoritmo compara pares de elementos adjacentes. Se o da esquerda for maior que o da direita, eles trocam de lugar. Esse processo se repete até que o maior elemento "flutue" como uma bolha para o final da lista.

```mermaid
flowchart TD
    Start([Início]) --> LoopI[Loop I: percorre cada elemento]
    LoopI --> LoopJ[Loop J: compara com o sucessor]
    LoopJ --> Comp{Lista[i] > Lista[j]?}
    Comp -- Sim --> Swap[Troca posições usando AUX]
    Comp -- Não --> Next[Próximo par]
    Swap --> Next
    Next --> EndLoopJ{Fim do Loop J?}
    EndLoopJ -- Não --> LoopJ
    EndLoopJ -- Sim --> EndLoopI{Fim do Loop I?}
    EndLoopI -- Não --> LoopI
    EndLoopI -- Sim --> Result([Lista Ordenada])
```

### 2. O Problema da Referência
Ao atribuir <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`lista_B = lista_A`</mark>, o Python não cria uma nova lista, mas sim um novo apelido para o mesmo lugar na memória. Para criar uma cópia independente, usamos o método <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`.copy()`</mark>.

```python
original = [4, 1, 2]
# ERRADO: ordenada = original (apontam para o mesmo lugar)
ordenada = original.copy() 
# Agora 'ordenada' pode ser alterada sem afetar 'original'
```

### 3. Geração de Aleatoriedade
O módulo <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`random`</mark> permite simular incertezas, essencial para testes e jogos.
- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`random.randrange(inicio, fim)`</mark>: Gera um número no intervalo (fim não incluso).

## Uso Prático

### Implementação de um Caixa Registrador
O sistema deve aceitar múltiplos valores, calcular descontos progressivos e emitir um relatório final. O uso do <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`while True`</mark> com <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`break`</mark> é a mecânica central aqui.

```python
def calcular_desconto(total):
    if total < 100:
        return 0
    elif total < 300:
        return total * 0.05
    elif total < 500:
        return total * 0.10
    else:
        return total * 0.15

total_compra = 0
while True:
    preco = float(input("Valor do produto (0 para sair): "))
    if preco == 0:
        break
    if preco < 0:
        print("Valor inválido!")
        continue
    total_compra += preco

desconto = calcular_desconto(total_compra)
print(f"Total: R$ {total_compra:.2f} | Desconto: R$ {desconto:.2f} | Final: R$ {total_compra - desconto:.2f}")
```

## Erros Comuns

1.  **Esquecer de converter o <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`input()`</mark>**: Tentar somar uma string a um float causa <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`TypeError`</mark>.
2.  **Modificar a lista original inesperadamente**: Ocorre por não usar <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`.copy()`</mark> dentro de funções que ordenam ou filtram.
3.  **Loop Infinito sem saída**: Não prever a condição de <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`break`</mark> faz o programa travar consumindo CPU.

## Visão Geral de Debugging

Ao lidar com laços complexos ou algoritmos de ordenação, a melhor técnica é o **Print Debugging**:
- Imprima o estado da lista a cada iteração do loop interno.
- Imprima os valores que estão sendo comparados (<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`i`</mark> e <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`j`</mark>) para garantir que os índices estão corretos.

## Principais Pontos

- **Ordenação**: Requer loops aninhados e comparação de pares.
- **Memória**: Python otimiza recursos usando referências; use <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`.copy()`</mark> para independência.
- **While vs For**: Use <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`while`</mark> para fluxos baseados em eventos/decisões do usuário.
- **Modularização**: Dividir lógica de cálculo e exibição em funções diferentes facilita a manutenção.

## Preparação para Prática

O estudante deve ser capaz de:
- Criar funções que recebem listas e retornam novas listas processadas sem alterar a original.
- Implementar menus interativos que só encerram sob comando específico.
- Aplicar regras de negócio (como faixas de desconto) de forma isolada em funções.

## Laboratório de Prática

### Desaio 1: Calculadora de Média de Vendas (Easy)
Crie um programa que receba o valor de vendas diárias até que o usuário digite `-1`. Ao final, exiba o total vendido e a média das vendas, ignorando valores negativos (exceto o `-1` de saída).

### Desafio 2: Validador de Senha com Bloqueio (Medium)
Simule um sistema de login. O programa deve permitir até 3 tentativas de acertar uma senha gerada aleatoriamente entre 10 e 99. Se errar as 3, exiba "Acesso Bloqueado". Se acertar, exiba "Acesso Concedido" e o número de tentativas restantes.

### Desafio 3: Gerenciamento de Estoque Simplificado (Hard)
Implemente uma função que receba uma lista de dicionários representando produtos (ex: `[{"nome": "Teclado", "preco": 150}, {"nome": "Mouse", "preco": 80}]`). A função deve retornar uma **nova lista** contendo apenas os produtos que custam mais de 100 reais, ordenados do mais caro para o mais barato. **Importante**: Não altere a lista original.

<!-- CONCEPT_EXTRACTION
concepts:
  - ordenação (bubble sort)
  - mutabilidade de listas
  - referência vs cópia
  - laços de repetição (while vs for)
  - randomização (módulo random)
  - lógica de negócio
skills:
  - Implementar algoritmos de ordenação básicos
  - Gerenciar referências e cópias de objetos mutáveis
  - Criar fluxos interativos com while e break
  - Aplicar validação de dados de entrada
examples:
  - bubble-sort-implementacao
  - caixa-registradora-loop-infinito
  - gerador-numeros-aleatorios
-->

<!-- EXERCISES_JSON
[
  {
    "id": "calculadora-media-vendas-while",
    "slug": "calculadora-media-vendas-while",
    "difficulty": "easy",
    "title": "Calculadora de Média de Vendas",
    "discipline": "python",
    "editorLanguage": "python",
    "tags": ["python", "loops", "while", "acumuladores"],
    "summary": "Implementar um loop de vendas que calcula média e total até receber um sinal de parada."
  },
  {
    "id": "validador-senha-aleatoria",
    "slug": "validador-senha-aleatoria",
    "difficulty": "medium",
    "title": "Validador de Senha Aleatória",
    "discipline": "python",
    "editorLanguage": "python",
    "tags": ["python", "random", "loops", "condicionais"],
    "summary": "Criar um sistema de tentativas limitadas para acertar um número aleatório."
  },
  {
    "id": "gestao-estoque-filtragem-ordenacao",
    "slug": "gestao-estoque-filtragem-ordenacao",
    "difficulty": "hard",
    "title": "Gestão de Estoque: Filtros e Ordenação",
    "discipline": "python",
    "editorLanguage": "python",
    "tags": ["python", "listas", "dicionarios", "ordenacao", "referencia"],
    "summary": "Filtrar e ordenar produtos em uma nova lista sem afetar o estado original."
  }
]
-->
