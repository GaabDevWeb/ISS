---
title: "Laboratório, IDEs Python e Introdução a Variáveis"
slug: "laboratorio-ide-variaveis"
discipline: "projeto-bloco"
order: 4
description: "Linux vs Windows, máquinas virtuais, IDEs Python (VS Code, PyCharm, Jupyter, Colab, Mu) e variáveis Python vs SQL."
reading_time: 7
difficulty: "easy"
concepts:
  - Linux
  - máquina virtual
  - laboratório
  - VS Code
  - PyCharm
  - Jupyter Notebook
  - Google Colab
  - IDE
  - variável Python
  - variável SQL
  - tipagem dinâmica
prerequisites:
  - aula-03-pipeline-dados-bancos
exercises:
  - question: "Por que Linux é fundamental na carreira de dados (exceto especialistas em SQL Server)?"
    answer: "A maioria dos servidores de banco de dados (PostgreSQL, MySQL, Oracle, MongoDB etc.) roda em Linux. SQL Server/Windows é exceção. Conhecer Linux permite trabalhar com praticamente qualquer banco e ambiente de servidor. Aprende-se no dia a dia em ~2 semanas."
  - question: "O que precisa ser instalado antes de uma IDE Python funcionar? Por quê?"
    answer: "O motor Python (interpretador). A IDE é apenas a interface (front end); sem o motor instalado, ela não tem como executar código. Analogia: banco de dados = motor; SSMS/DBeaver = ferramenta de acesso. VS Code e PyCharm só executam Python se o interpretador estiver instalado."
  - question: "Por que VS Code precisa de extensão para Python, mas PyCharm não?"
    answer: "VS Code é editor universal, neutro por padrão — não sabe qual linguagem será usada; extensões ensinam a IDE a trabalhar com uma linguagem específica. PyCharm é IDE especializada em Python; já vem configurada para Python sem extensão adicional."
  - question: "Compare a sintaxe de declaração de variável em Python e SQL Server."
    answer: "Python: a = 8 (tipagem dinâmica; interpretador infere o tipo; zero formalidade). SQL Server: DECLARE @a INT; SET @a = 8; SELECT @a (prefixo @ obrigatório; tipo obrigatório; DECLARE obrigatório; SELECT para exibir). Python é informal; SQL Server exige declaração explícita com tipo."
  - question: "O que é uma máquina virtual e quais ferramentas gratuitas existem para criá-la?"
    answer: "VM é um SO isolado executando dentro da máquina física; usa CPU, RAM e disco do host; comunica com o host pela rede virtual. Ferramentas gratuitas: VirtualBox, Hyper-V (embutido no Windows Pro/Enterprise), VMware Workstation Community."
  - question: "Para que serve o Jupyter Notebook e quando usá-lo em vez do VS Code puro?"
    answer: "Jupyter Notebook executa código Python em blocos independentes e mostra resultado de cada bloco separadamente. Ideal para testar trechos, analisar dados passo a passo e desenvolver modelos de machine learning — permite controlar a execução parte a parte sem rodar o arquivo inteiro."
---
## Resumo

### Mapa da aula

- Linux: SO padrão em servidores de dados (não-Microsoft)
- Máquina virtual: SO isolado dentro da máquina física
- Laboratório = motor instalado + IDE; sem motor, IDE não funciona
- IDEs Python: VS Code (extensão), PyCharm, Jupyter, Colab, Mu
- Variável: Python sem tipo; SQL Server com DECLARE, @, tipo obrigatórios

- **Linux vs Windows**: servidores não-Microsoft (Postgres, MySQL, Oracle) → Linux; SQL Server → Windows; Red Hat em produção; aprende em ~2 semanas; Linux consome menos recurso que VM Windows.
- **Máquinas virtuais**: SO isolado dentro da máquina física; usa CPU/RAM/disco do host; conecta ao host pela rede virtual; VirtualBox e Hyper-V gratuitos; VMware Workstation Community gratuito.
- **Laboratório pessoal**: motor (banco ou Python instalado) + IDE/ferramenta de acesso; sem motor, a ferramenta não executa código.
- **IDEs Python**: VS Code (universal, extensão Python obrigatória); PyCharm Community (open source) / Pro (grátis 1 ano com e-mail da faculdade); Jupyter Notebook (execução por blocos, usado em ciência de dados); Google Colab (Jupyter na nuvem Google); Mu (leve, ideal para aprender).
- **Variáveis Python vs SQL Server**: Python <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`a = 8`</mark> (tipagem dinâmica, sem formalidade); SQL Server <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`DECLARE @a INT; SET @a = 8; SELECT @a`</mark> (prefixo <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`@`</mark>, tipo e <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`DECLARE`</mark> obrigatórios; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`SELECT`</mark> = exibir).

**Resumo em 5 linhas**: Linux é padrão em servidores de dados; aprende-se rapidamente. VMs isolam SOs dentro da máquina física sem formatá-la. Laboratório = motor + IDE. IDEs Python variam de leve (Mu) a completa (PyCharm, VS Code). Variável Python: tipagem dinâmica; SQL Server: DECLARE + tipo + <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`@`</mark> obrigatórios.

**Palavras-chave**: Linux, Red Hat, máquina virtual, VirtualBox, Hyper-V, VMware, laboratório, motor, IDE, VS Code, extensão, PyCharm, Jupyter Notebook, Google Colab, Mu, variável, tipagem dinâmica, DECLARE, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`@`</mark>, INT, SELECT.

---

## Explicações

### 1. Tema e escopo

- **Tema**: sistema operacional para carreira de dados; virtualização como ferramenta de laboratório; ambiente Python; variável como primeiro conceito de código.
- **Inclui**: Linux vs Windows em servidores; VMs (VirtualBox, Hyper-V, VMware); IDEs Python (VS Code, PyCharm, Jupyter, Colab, Mu); declaração de variável em Python e SQL Server.
- **Não inclui**: comandos Linux detalhados (disciplina futura); sintaxe completa de SQL; instalação passo a passo de cada ferramenta.

### 2. Contexto na disciplina

- Quarta aula de Projeto de Bloco; continua montagem do laboratório da aula 3 (ver [[aula-03-pipeline-dados-bancos]]).
- Introduz o primeiro trecho de código da disciplina: variável em Python e em SQL Server lado a lado.
- Próxima aula: aprofundar variáveis, tipos de dados e desenvolvimento.

### 3. Visão conceitual geral

O laboratório tem dois lados: **banco de dados** (motor + ferramenta, aula 3) e **Python** (motor = interpretador + IDE). Antes de escolher ferramentas, é preciso entender o **SO**: servidores de produção usam Linux; VMs permitem criar ambientes sem alterar o sistema principal. Variáveis são o primeiro bloco de qualquer código — Python e SQL as tratam de formas opostas: dinâmica vs estática.

### 4. Ideias-chave

1. **Linux = SO padrão de servidores de dados** — exceção é SQL Server; não saber Linux limita carreira.
2. **VM = SO isolado dentro da máquina física** — usa hardware do host; não precisa formatar; VM Linux é leve.
3. **Motor antes da IDE** — sem Python instalado, nenhuma IDE Python executa código.
4. **VS Code é neutro por padrão** — extensão Python é obrigatória para desenvolver em Python.
5. **Jupyter Notebook = execução por blocos** — controla cada parte do código; padrão em ciência de dados.
6. **Python: tipagem dinâmica** — <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`a = 8`</mark> infere <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`int`</mark> automaticamente; sem DECLARE, sem tipo explícito.
7. **SQL Server: tipagem estática** — DECLARE + <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`@`</mark> + tipo são obrigatórios; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`SELECT`</mark> exibe valor.

### 5. Conceitos essenciais

#### 5.1 Linux vs Windows em servidores

- **Regra**: banco Microsoft (SQL Server) → Windows; demais (Postgres, MySQL, Oracle, MongoDB) → Linux.
- **Por que Linux**: open source; menor consumo de recurso; Red Hat = versão corporativa paga (suporte); Ubuntu/CentOS em laboratório.
- **Curva de aprendizado**: interface desktop disponível; ~2 semanas de uso já dá fluência básica em comandos.
- ❌ **Erro comum**: achar que exige outro computador. Linux coexiste via VM (recomendado) ou WSL2 (pesado em RAM).

#### 5.2 Máquinas Virtuais

- **O que é**: software cria hardware virtual (CPU, RAM, rede, disco) isolado dentro da máquina física.
- **Ferramentas gratuitas**: VirtualBox; Hyper-V (embutido no Windows Pro/Enterprise); VMware Workstation Community.
- **Como conectar**: VM e host ficam na mesma rede virtual; comunicação por IP de rede local.
- ⚠️ **Limite**: VM usa recursos do host; VM Windows dentro de Windows consome muito — preferir VM Linux.
- **Escala empresarial**: VMware Enterprise + 700+ VMs rodando em servidores físicos (data center com hardware dedicado).

#### 5.3 IDEs Python

| IDE | Tipo | Detalhe prático |
|---|---|---|
| VS Code | Universal | Extensão Python obrigatória; também suporta Jupyter, JS, .NET |
| PyCharm Community | Python | Open source; gratuita; sem configuração extra para Python |
| PyCharm Pro | Python | Grátis 1 ano com e-mail da faculdade; recursos extras |
| Jupyter Notebook | Por blocos | Executa células individualmente; roda no browser (localhost) |
| Google Colab | Nuvem | Jupyter na conta Google; sem instalação local |
| Mu | Simples | Leve; interface limpa; ideal para aprender e testar trechos |

#### 5.4 Variável: Python vs SQL Server

**Conceito**: rótulo que aponta para um espaço de memória reservado com um valor.

**Python — tipagem dinâmica:**

```bash
a = 8
print(a)
```

Saída: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`8`</mark>. Python infere automaticamente que <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`a`</mark> é <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`int`</mark>. Sem DECLARE, sem tipo explícito, sem prefixo.

**SQL Server — tipagem estática:**

```bash
DECLARE @a INT
SET @a = 8
SELECT @a
```

- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`DECLARE`</mark>: reserva espaço na memória e nomeia a variável.
- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`@`</mark>: prefixo obrigatório para toda variável local em T-SQL.
- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`INT`</mark>: tipo obrigatório na declaração.
- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`SELECT`</mark>: equivalente ao <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`print()`</mark> para variáveis locais.

> **Regra crítica:** Em SQL Server, variável sem <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`@`</mark> não é reconhecida. <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`DECLARE a INT`</mark> gera erro de sintaxe.

### 5b. Modelo mental

**Python** — resolve em uma etapa: recebe <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`a = 8`</mark> → reserva memória → infere tipo <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`int`</mark> → associa nome <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`a`</mark> ao valor <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`8`</mark>.

**SQL Server** — três etapas explícitas e obrigatórias:

1. <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`DECLARE @a INT`</mark> → reserva memória e define tipo
2. <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`SET @a = 8`</mark> → atribui valor
3. <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`SELECT @a`</mark> → lê e exibe

Se qualquer etapa faltar: SQL Server retorna erro ou simplesmente não exibe nada.

### 6. Teste de reconhecimento rápido

**O que acontece?**

```bash
a = 8
print(a)
```

**Resposta:** imprime <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`8`</mark>; Python infere tipo <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`int`</mark> sem declaração.

---

**O que está errado?**

```bash
DECLARE a INT
SET a = 8
```

**Resposta:** falta <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`@`</mark> em ambas as linhas; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`a`</mark> não é reconhecido como variável em T-SQL.

---

**Verdadeiro ou falso:** "VS Code já funciona com Python sem configuração adicional."

**Resposta:** Falso — requer extensão Python instalada.

---

**Qual ferramenta executa código Python em blocos, sem rodar o arquivo inteiro?**

**Resposta:** Jupyter Notebook (ou Google Colab).

### 7. Erros clássicos de prova

- **IDE sem motor** — VS Code ou PyCharm sem Python instalado não executam código; IDE é interface, não motor.
- **VS Code pronto para Python** — falso; é universal; sem extensão Python não reconhece a linguagem.
- **<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`DECLARE a INT`</mark> em SQL Server** — erro: falta <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`@`</mark>; toda variável local em T-SQL precisa do prefixo.
- **VM não substitui máquina física** — VM usa CPU/RAM/disco do host; hardware fraco = VM lenta ou travando.
- **<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`SELECT`</mark> = <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`print()`</mark> em todos os contextos** — semelhante para variáveis locais, mas <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`SELECT`</mark> é comando de consulta; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`print()`</mark> é função de saída.

### 8. Exemplos de alta densidade

```bash
a = 8
```
Python: variável <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`a`</mark> com valor <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`8`</mark>; tipo inferido: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`int`</mark>.

```bash
DECLARE @nome VARCHAR(50)
SET @nome = 'Ricardo'
SELECT @nome
```
SQL Server: variável string; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`VARCHAR(50)`</mark> é o tipo obrigatório.

```bash
a = 8
b = 12
print(a + b)
```
Saída: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`20`</mark>

```bash
DECLARE @x INT
SET @x = 8 * 2
SELECT @x
```
Saída: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`16`</mark>

### 9. Procedimento — montar laboratório Python

1. Baixar Python em python.org → instalar (marcar "Add to PATH").
2. Testar: abrir terminal → digitar <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`python`</mark> → prompt <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`>>>`</mark> deve aparecer.
3. Escolher IDE: VS Code (instalar extensão Python) ou PyCharm Community.
4. Para Jupyter Notebook: instalar via <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`pip install notebook`</mark> ou usar extensão Jupyter no VS Code.
5. Para Google Colab: acessar colab.research.google.com com conta Google; sem instalação local.

### 11. Diferenças e confusões comuns

- **VM vs WSL2**: VM cria hardware virtual completo e isolado; WSL2 compartilha kernel Windows — mais rápido de instalar, mas mais pesado em RAM e menos isolado.
- **PyCharm Community vs Pro**: Community é suficiente para Python puro; Pro adiciona suporte a banco de dados, frameworks web e outras linguagens — gratuita 1 ano com e-mail da faculdade.
- **Jupyter Notebook vs Google Colab**: mesma ideia (execução por blocos); Notebook é local; Colab é na nuvem Google (máquina Google, sem instalação, mas depende de internet).

### 12. Como cai em prova

- "Qual SO é padrão em servidores com PostgreSQL ou MySQL?" → Linux.
- "O que instalar antes de qualquer IDE Python?" → motor Python (interpretador).
- "Como declarar variável em SQL Server?" → <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`DECLARE @nome TIPO`</mark>.
- "Por que Python não precisa de DECLARE?" → tipagem dinâmica; interpretador infere o tipo.
- "Qual ferramenta executa código por blocos?" → Jupyter Notebook.

### 14. Checklist de domínio

- [ ] Sei explicar por que Linux é padrão em servidores de dados.
- [ ] Sei o que é VM e cito ferramentas gratuitas (VirtualBox, Hyper-V, VMware).
- [ ] Sei que toda IDE Python requer motor Python instalado.
- [ ] Sei que VS Code precisa de extensão Python para funcionar com Python.
- [ ] Sei declarar variável em Python (<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`a = 8`</mark>) e em SQL Server (<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`DECLARE @a INT; SET @a = 8; SELECT @a`</mark>).
- [ ] Sei o que é Jupyter Notebook e quando usá-lo (execução por blocos, ciência de dados).

### 15. Síntese operacional

- Linux = SO padrão em servidores não-Microsoft; VM Linux é leve e não compromete o host.
- VM: SO isolado dentro da máquina física; ferramentas gratuitas: VirtualBox, Hyper-V, VMware Community.
- Laboratório = motor instalado (Python/banco) + IDE; sem motor, IDE não executa nada.
- VS Code: neutro por padrão → instalar extensão Python obrigatoriamente; PyCharm: já preparado.
- Python: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`a = 8`</mark> (dinâmico, tipo inferido); SQL Server: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`DECLARE @a INT; SET @a = 8; SELECT @a`</mark> (estático, tipo obrigatório, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`@`</mark> obrigatório).
- Jupyter Notebook: execução por blocos; ideal para testar trechos de código e análise de dados.
