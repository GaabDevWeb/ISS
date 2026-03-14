---
title: "Algoritmos, pensamento computacional e seu primeiro notebook Python"
slug: "algoritmos-e-notebooks"
discipline: "python"
order: 2
description: "Do que é programar à escrita do primeiro algoritmo em Python dentro de um notebook no Deepnote."
reading_time: 30
difficulty: "easy"
concepts:
  - algoritmos
  - pensamento computacional
  - linguagem de programação
  - notebooks
  - IDE
  - Deepnote
prerequisites:
  - "por-que-programar-python"
learning_objectives:
  - "Explicar o que é um algoritmo e por que ele é a base da programação."
  - "Construir algoritmos simples em linguagem natural para problemas do dia a dia."
  - " Entender o papel de uma IDE e de notebooks no desenvolvimento em Python."
  - "Criar e executar o primeiro programa Python em um notebook no Deepnote."
exercises:
  - question: "Quais são as três características essenciais de um algoritmo bem definido?"
    answer: "Clareza (cada passo compreensível), finitude (termina em algum momento) e determinismo na maioria dos casos (para a mesma entrada, produz o mesmo resultado)."
    hint: "Pense na parte da aula sobre 'O que são algoritmos?' e nas propriedades listadas logo depois."
review_after_days: [1, 3, 7, 30]
---

## Visão Geral do Conceito

Nesta lição, você vai entender **o que é programar na prática**: escrever **algoritmos** que resolvem problemas reais e transformá‑los em código Python, usando um ambiente de notebooks (Deepnote) como **IDE** principal da disciplina.

Vamos sair de exemplos do dia a dia (receita de bolo, montar móveis, rota no GPS) para:

- definir formalmente o que é um algoritmo;
- construir algoritmos em linguagem natural;
- conhecer o Deepnote como ambiente de notebooks;
- escrever e executar o seu **primeiro programa em Python** (`print("Hello, world!")`).

## Modelo Mental

### Programar = resolver problemas com passos claros

Em vez de pensar em programação como “escrever código”, pense como:

- **Definir um objetivo claro** (ex.: “lavar a louça e levar o lixo para fora”).
- **Quebrar o objetivo em passos bem definidos**, em ordem.
- **Garantir que esses passos terminem** e levem ao resultado desejado.

Esse conjunto de passos forma um **algoritmo**. O código Python é “apenas” a forma rígida, precisa e executável de registrar esse algoritmo para que o computador possa segui‑lo sem ambiguidade.

### Pensamento computacional

O professor destaca que programar envolve desenvolver um **conjunto de habilidades cognitivas**:

- Decompor problemas complexos em partes menores.
- Identificar padrões e estruturas de repetição (laços).
- Definir regras de decisão (condicionais).
- Raciocinar sobre entradas, processamento e saídas.

> **Modelo mental:** antes de abrir o Deepnote, imagine que você está ensinando uma pessoa extremamente literal a fazer uma tarefa — cada passo precisa ser explícito, na ordem certa e com um objetivo claro no final.

### Notebooks como “cadernos executáveis”

Um **notebook** (como o do Deepnote) é um “caderno” digital que mistura:

- blocos de **texto explicativo** (Markdown);
- blocos de **código executável** (Python, SQL, etc.);
- blocos de **saída** (texto, tabelas, gráficos).

Ele permite praticar programação de forma **iterativa e exploratória**:

- escreve‑se um pequeno trecho de código;
- executa‑se;
- observa‑se a saída;
- ajusta‑se o algoritmo.

Essa abordagem é ideal para quem está começando: você vê o efeito de cada mudança logo abaixo do código, sem perder o contexto.

## Mecânica Central

### O que é um algoritmo?

Da definição apresentada em aula:

> Um algoritmo é uma **sequência explícita, literal, limitada e sistemática de instruções e operações**, direcionadas à consecução de um objetivo pré‑definido.

Em termos práticos, um bom algoritmo:

- **Começa de um estado inicial bem definido**.
- **Descreve passos claros**, sem ambiguidade.
- **Termina** (não fica em loop infinito) e produz um **resultado esperado**.

Exemplos cotidianos:

- **Receita de bolo**: lista de ingredientes + passos numerados da preparação ao forno.
- **Manual de montagem de móveis**: sequência de instruções com número de peças, ordem de encaixe etc.
- **Direções de GPS**: siga em frente 500 m → vire à esquerda → mantenha à direita… até o destino.

### Propriedades essenciais de algoritmos

Um algoritmo bem formado deve ter:

- **Clareza**: cada passo é compreensível e não deixa dúvida sobre o que fazer.
- **Finitude**: o processo termina em algum momento (computabilidade).
- **Determinismo (na maioria dos casos)**: mesmas entradas levam ao mesmo resultado.  
  (Há algoritmos probabilísticos, mas a disciplina começa com os determinísticos.)

Essas características se aplicam **antes** da escolha da linguagem; são propriedades conceituais, independentes de Python, Java, SQL etc.

### De algoritmo informal a código Python

Exemplo da aula: **algoritmo para fazer café**.

- Passos em linguagem natural:
  1. Ferva a água.
  2. Coloque o pó no filtro.
  3. Despeje a água.
  4. Sirva o café.

- Representação em “pseudocódigo”:

```text
Início
  Ferver água
  Colocar pó no filtro
  Despejar água quente
  Servir café
Fim
```

- Primeira versão em código Python:

```python
def fazer_cafe():
    print("Ferva a água")
    print("Coloque o pó no filtro")
    print("Despeje a água")
    print("Sirva o café")


fazer_cafe()
```

O código acima é propositalmente simples: ele mostra como um conjunto de instruções lineares pode ser “traduzido” para Python, mantendo os mesmos passos.

### IDE e notebooks: onde esse código vive

Para transformar algoritmos em programas executáveis, usamos ferramentas de desenvolvimento:

- **IDE (Integrated Development Environment)**: ambiente de desenvolvimento integrado, com editor, execução, visualização de erros, etc.
- **Deepnote** é a IDE escolhida na disciplina, em formato de notebooks:
  - **Workspace**: espaço de trabalho (pessoal ou de time), com projetos, permissões e integrações.
  - **Projetos**: unidades de trabalho que agrupam notebooks, arquivos e variáveis de ambiente.
  - **Blocos**:
    - `Code blocks`: código Python (e outras linguagens, conforme ambiente).
    - `SQL blocks`: consultas SQL para dados tabulares.
    - `Text blocks`: documentação em Markdown.
    - `Chart` e `Input blocks`: gráficos e interações (mais usados em dados).

Na prática da disciplina, você vai:

1. Acessar o Deepnote com seu e‑mail institucional.
2. Criar um **novo projeto** (por exemplo, `aula-02-algoritmos`).
3. Usar o notebook padrão criado para escrever e executar seus primeiros códigos Python.

## Uso Prático

### Exercício mental: algoritmos do seu dia a dia

Alguns exemplos discutidos ou sugeridos em aula:

- Planejar férias:
  - decidir destino, orçamento, datas, hospedagem;
  - reservar voos e hotéis na ordem correta;
  - preparar lista de itens para viagem.
- Lavar louça e levar o lixo:
  - verificar se há pratos sujos;
  - lavar, enxaguar, colocar no escorredor até não restar mais nenhum;
  - juntar o lixo, amarrar o saco, levar até o local de descarte.

Você pode (e deve) desenhar esses algoritmos como:

- passos numerados em texto;
- fluxogramas com losangos (decisão) e retângulos (ações);
- pseudocódigo parecido com o exemplo do café.

### Deepnote na prática: seu primeiro notebook

Passo a passo descrito pelo professor (adaptado):

1. Acesse o site do Deepnote (`deepnote.com`) no navegador.
2. Clique em **Sign in** e entre com seu **e‑mail institucional**.
3. Verifique o e‑mail recebido (“Sign in now”) e clique no link.
4. Ao entrar, crie um **novo projeto** (por exemplo, `aula-02-algoritmos`).
5. No notebook criado automaticamente:
   - certifique‑se de ter um bloco de código;
   - escreva:

```python
print("Hello, world!")
```

   - execute o bloco (botão **Run** ou `Ctrl+Enter`) e observe a saída logo abaixo.

Este é o seu **primeiro programa em Python** na disciplina, rodando em uma infraestrutura provisionada automaticamente pelo Deepnote (máquina virtual, ambiente Python, etc.), sem necessidade de instalar nada localmente.

## Erros Comuns

- **Confundir “usar LLM” com “saber programar”**  
  Pedir para um modelo de linguagem gerar todo o código impede a construção do seu próprio raciocínio algorítmico. Use IA como apoio para explicações e debugging, não como substituto para pensar o algoritmo.

- **Pular a etapa do algoritmo e ir direto para código**  
  Começar a escrever Python sem ter clareza do problema e dos passos causa loops inesperados, condições incompletas e código confuso.

- **Escrever algoritmos ambíguos ou infinitos**  
  Instruções vagas (“prepare o ambiente”, “arrume a cozinha”) não especificam ações concretas; esquecer uma condição de parada gera algoritmos que nunca terminam.

- **Ignorar o papel do ambiente (IDE/notebook)**  
  Tentar aprender Python lutando com instalação e configuração de ambiente pode desmotivar quem está começando. A disciplina usa o Deepnote justamente para remover essa fricção inicial.

## Visão Geral de Debugging

Mesmo em nivel introdutório, vale adotar algumas práticas de debugging:

- **Quando o notebook não executa**:
  - verifique se há **mensagem de erro** logo abaixo do bloco (símbolos em vermelho, stack trace);
  - leia a mensagem com calma, destacando termos como <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`SyntaxError`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`NameError`</mark>, etc.;
  - confira se as aspas estão fechadas, parênteses balanceados e se os nomes estão escritos corretamente.

- **Quando o algoritmo não produz o resultado esperado**:
  - reescreva os passos em linguagem natural e verifique se estão claros e finitos;
  - faça um “debug manual”: percorra mentalmente as instruções com um exemplo concreto de entrada.

- **Quando o Deepnote se comporta de forma estranha**:
  - confirme se está logado com o e‑mail institucional;
  - recarregue o notebook ou crie um bloco de código novo;
  - se necessário, desconecte e reconecte a máquina (kernel) nas opções do notebook.

## Principais Pontos

- Programar é, essencialmente, **resolver problemas** por meio de **algoritmos claros, finitos e (em geral) determinísticos**.
- Você já usa algoritmos no dia a dia (receitas, rotinas, planos) — a disciplina formaliza isso e o traduz para Python.
- Notebooks como os do **Deepnote** permitem combinar documentação, código e resultados em um único ambiente, ideal para aprendizado progressivo.
- O primeiro passo concreto é escrever e executar `print("Hello, world!")` em um bloco de código do notebook, garantindo que o ambiente esteja funcionando.

## Preparação para Prática

Após esta lição, você deve ser capaz de:

- Escrever, em linguagem natural, algoritmos simples para tarefas comuns (cozinha, estudo, rotina diária).
- Converter um desses algoritmos em uma sequência de instruções em pseudocódigo ou fluxograma.
- Acessar o Deepnote com seu e‑mail institucional, criar um projeto e um notebook.
- Escrever e executar pequenos trechos de código Python (como `print(...)`) de forma confiável.

Os exercícios do Laboratório de Prática a seguir vão ajud á-lo a fixar esses passos, ligando algoritmo → pseudocódigo → notebook Python.

## Laboratório de Prática

> Todos os códigos abaixo são boilerplates executáveis. Complete as partes marcadas com `TODO` no Editor Integrado.

### Exercício Easy — Algoritmo do café em Python

Transforme o algoritmo “fazer café” da aula em um programa Python que permita reutilizar os passos e imprimir o processo de forma clara.

Requisitos:

- Criar uma função `fazer_cafe()` que imprima cada passo do algoritmo.
- Permitir personalizar o tipo de café (por exemplo, “coado” ou “espresso”) apenas na mensagem final.

```python
def fazer_cafe(tipo: str) -> None:
    """
    Imprime os passos básicos para fazer café.

    Parâmetros:
        tipo: descrição do tipo de café (ex.: "coado", "espresso").
    """
    # TODO: completar o corpo da função com prints para cada passo:
    # - ferver a água
    # - colocar o pó no filtro
    # - despejar a água
    # - servir o café, incluindo o tipo na mensagem final
    pass


def main() -> None:
    print("=== Algoritmo do café em Python ===")
    tipo = input("Qual tipo de café você quer preparar? ")
    fazer_cafe(tipo)


if __name__ == "__main__":
    main()
```

### Exercício Medium — Algoritmo para lavar louça em pseudocódigo e código

Baseado no exemplo discutido em aula (fluxograma de “lavar louça e levar o lixo”), escreva:

1. O algoritmo em **pseudocódigo** (comentários estruturados).
2. Uma função Python que simule o processo, imprimindo o que está acontecendo.

```python
# Pseudocódigo (em português):
# TODO: escreva aqui os passos de alto nível para:
# - verificar se há pratos sujos
# - enquanto houver pratos sujos, lavar e colocar no escorredor
# - ao final, indicar que a pia está limpa


def lavar_louca(quantidade_pratos: int) -> None:
    """
    Simula o algoritmo de lavar louça, imprimindo os passos.

    Parâmetro:
        quantidade_pratos: número inicial de pratos sujos.
    """
    # TODO: implementar a lógica:
    # enquanto ainda houver pratos (> 0), "lave" um por vez, decrementando o contador
    # e imprimindo mensagens como "Lavando prato X..."
    # No final, imprimir algo como "Pia limpa!"
    pass


def main() -> None:
    print("=== Algoritmo para lavar louça ===")
    try:
        pratos = int(input("Quantos pratos sujos há na pia? "))
    except ValueError:
        print("Valor inválido. Use um número inteiro.")
        return

    lavar_louca(pratos)


if __name__ == "__main__":
    main()
```

### Exercício Hard — Registrar seu primeiro notebook no Deepnote

Crie um **notebook no Deepnote** que combine:

- uma seção de texto (Markdown) explicando, com suas palavras:
  - o que é um algoritmo;
  - um exemplo do seu dia a dia;
  - por que notebooks ajudam no aprendizado;
- um bloco de código com pelo menos **dois exemplos**:
  - o `Hello, world!` da aula;
  - a chamada de uma das funções dos exercícios anteriores (por exemplo, `fazer_cafe`).

Use o script abaixo como modelo de conteúdo mínimo de código. O texto em Markdown deve ser criado diretamente no notebook (não é avaliado via arquivo separado).

```python
def hello() -> None:
    print("Hello, world! Bem-vindo ao meu primeiro notebook Python no Deepnote.")


def main() -> None:
    hello()
    # TODO: aqui você deve chamar pelo menos UMA das funções
    # que implementou em exercícios anteriores (por exemplo, fazer_cafe ou lavar_louca),
    # com valores de exemplo.


if __name__ == "__main__":
    main()
```

<!-- CONCEPT_EXTRACTION
concepts:
  - algoritmos
  - pensamento computacional
  - linguagem de programação Python
  - notebooks e IDE
  - Deepnote
skills:
  - Decompor problemas simples em algoritmos claros e finitos
  - Traduzir algoritmos em pseudocódigo e em código Python
  - Utilizar notebooks no Deepnote como ambiente de desenvolvimento
  - Executar e testar pequenos programas Python em blocos de código
examples:
  - algoritmo-fazer-cafe
  - algoritmo-lavar-louca
  - hello-world-notebook-deepnote
-->

<!-- EXERCISES_JSON
[
  {
    "id": "python-algoritmo-cafe",
    "slug": "python-algoritmo-cafe",
    "difficulty": "easy",
    "title": "Implementar o algoritmo do café em Python",
    "discipline": "python",
    "editorLanguage": "python",
    "tags": ["python", "algoritmos", "funcoes"],
    "summary": "Completar uma função que imprime os passos do algoritmo de fazer café, parametrizando o tipo de café."
  },
  {
    "id": "python-algoritmo-lavar-louca",
    "slug": "python-algoritmo-lavar-louca",
    "difficulty": "medium",
    "title": "Simular o algoritmo de lavar louça",
    "discipline": "python",
    "editorLanguage": "python",
    "tags": ["python", "algoritmos", "loops"],
    "summary": "Escrever pseudocódigo e implementar uma função que simula lavar pratos usando um laço de repetição."
  },
  {
    "id": "python-primeiro-notebook-deepnote",
    "slug": "python-primeiro-notebook-deepnote",
    "difficulty": "hard",
    "title": "Criar seu primeiro notebook Python no Deepnote",
    "discipline": "python",
    "editorLanguage": "python",
    "tags": ["python", "notebooks", "deepnote"],
    "summary": "Montar um notebook com texto em Markdown explicando algoritmos e blocos de código executando exemplos em Python."
  }
]
-->

