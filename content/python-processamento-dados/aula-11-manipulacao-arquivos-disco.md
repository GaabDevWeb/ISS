---
title: "Manipulação de arquivos em disco com Python"
slug: "manipulacao-arquivos-disco"
discipline: "python"
order: 11
description: "Abrir/fechar arquivos, modos texto e binário, leitura em blocos, `seek`/`tell`, operações utilitárias com `os` e contexto de JSON em interoperabilidade."
reading_time: 28
difficulty: "medium"
concepts:
  - arquivos em disco
  - modo de abertura
  - texto versus binário
  - fluxo de I/O em Python
  - context manager (`with`)
  - cursor de arquivo (`seek`/`tell`)
  - interoperabilidade com JSON
prerequisites:
  - "[[variaveis-tipos]]"
learning_objectives:
  - "Abrir arquivos com segurança em Python usando <mark style=\"background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;\">`open()`</mark> ou <mark style=\"background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;\">`with open()`</mark>, escolhendo o modo compatível com a operação."
  - "Diferenciar leituras por bloco, por linha e por arquivo completo (<mark style=\"background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;\">`read()`</mark>, <mark style=\"background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;\">`readline()`</mark>, <mark style=\"background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;\">`readlines()`</mark>), considerando uso de memória."
  - "Explicar por que texto e binário exigem rotinas diferentes e como navegar um arquivo binário com <mark style=\"background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;\">`seek()`</mark>/<mark style=\"background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;\">`tell()`</mark>."
exercises:
  - question: "Por que `<mark style=\"background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;\">`open(..., \"w\")`</mark>` em um arquivo já existente normalmente não é recuperável apenas “desfazendo” no próprio programa Python?"
    answer: "O modo sobrescreve o conteúdo no disco assim que você escrever; recuperação típica exige cópias do sistema operacional (<mark style=\"background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;\">`backup</mark>/<mark style=\"background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;\">`versionamento`</mark>) ou ferramentas avançadas, não rollback automático pelo interpretador."
    hint: "Pense como o arquivo é persistido e em que momento o disco reflete sua escrita."
  - question: "Qual objetivo típico de ler um arquivo grande em chunks com `<mark style=\"background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;\">`read(chunk_size)`</mark>` em vez de `<mark style=\"background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;\">`read()`</mark>` sem argumentos?"
    answer: "Controlar uso de RAM e trabalhar sob demanda, processando incrementalmente até o arquivo acabar (<mark style=\"background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;\">`until empty string/`bytes vazios)</mark>), o que escal melhor para logs grandes, CSV grandes e streams."
    hint: "Relacione tamanho do arquivo com tamanho da variável em memória."
  - question: "Quando você escolheria `<mark style=\"background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;\">`readline()`</mark>`/`readlines()`` em cenários de dados tabulados em linhas (ex.: logs)?"
    answer: "Para alinhar a leitura a delimitadores de linha (<mark style=\"background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;\">`\"\\n\"`</mark>), tratando cada evento registralmente sem gerenciar `chunk` por tamanho de bytes/caracteres em linhas heterogêneas."
    hint: "Pergunte: cada linha representa uma unidade útil?"
---

## Visão Geral do Conceito

Dados persistentes aparecem, na prática, como **arquivos em disco**. Em pipelines de dados, você precisa importar relatórios, exportar auditorias e integrar sistemas onde o transporte intermediário pode ser arquivo (CSV, parquet, texto, dumps) até chegar ao consumo estruturado (<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`JSON`</mark>, bancos, APIs).

O Python torna esse fluxo acessível com um núcleo pequeno: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`open()`</mark> devolve um **objeto arquivo** ligado ao caminho físico (<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`path`</mark>) e aos **modos** (ler, escrever, acrescentar, criar apenas se novo, texto ou binário). A partir daí, você trabalha sobre **streaming**: dados entram ou saem do disco em fluxo, e ferramentas como <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`read()`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`write()`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`seek()`</mark> e <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`tell()`</mark> controlam onde você está dentro desse fluxo.

> **Regra:** I/O bem feito sempre combina **modo correto**, **fechação previsível** (<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`close()`</mark> ou <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`with`</mark>) e **consciência de memória**.

No contexto discutido em aula, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`JSON`</mark> aparece como **representação interoperável**: formatos herdados mais verbosos (<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`XML`</mark>) consumiam mais rede e texto; serviços <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`REST`</mark> disseminaram payloads JSON. Para o Python, esse é o gancho arquitetural: **persistência em arquivo** (<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`open`</mark>) e **persistência/consultas como documentos** em ecossistemas modernos coexistem (<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`MongoDB`</mark>/<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`Elasticsearch`</mark> são exemplos mencionados enquanto cenário de adoção ampla).

**Não coberto no trecho disponível nesta sessão:** prática profunda do módulo <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`json`</mark> (<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`loads`</mark>/<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`dumps`</mark>, validação de esquema). A discussão de <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`JSON`</mark> aqui é marco motivacional e comparativo (XML vs JSON), não implementação completa.

## Modelo Mental

Pense no arquivo como uma **fita** com um **cursor de leitura/escrita**. Cada operação avança (ou reposiciona) esse cursor. Em **texto**, você enxerga caracteres legíveis; em **binário**, você enxerga **bytes** opacos ao olho humano, mas perfeitamente significativos para formatos de mídia, compactação e protocolos.

O programa tem **duas realidades**: (1) conteúdo **em RAM** (variáveis, buffers) e (2) conteúdo **no disco** (bytes persistidos). Sem chamar <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`write()`</mark>/<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`flush()`</mark> (em casos específicos de buffer) e sem fechar adequadamente, você pode manter **descritores** abertos e pressionar recursos; e sem o modo adequado (<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`r`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`w`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`a`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`x`</mark>, combinações com <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`b`</mark>), você tropeça em erro de permissão ou destrói dados.

```mermaid
flowchart TD
    A[Caminho + modo em open()] --> B{Arquivo texto ou binário?}
    B -->|texto| C[Manipulações com str e quebras \\n implícitas do print]
    B -->|binário| D[Manipulações com bytes e slices]
    C --> E{Ler ou escrever?}
    D --> E
    E -->|ler| F[read / readline / readlines ou chunks iterativos]
    E -->|escrever| G[write + posicionamento com seek opcional]
    F --> H[Fechar recurso ou sair do bloco with]
    G --> H
```

## Mecânica Central

### `open()`, modos e o objeto arquivo

Chamada essencial:

```python
f = open("relatorio.txt", "r", encoding="utf-8")
```

Para portabilidade robusta entre editores/OS, recomenda-se fixar `<mark>`encoding`</mark>` em texto sempre que ler/escrever com caracteres fora ASCII simples. O material em aula enfatiza o papel do **segundo argumento textual** combinando:

- **Operação:** <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`r`</mark> (<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`read`</mark>), <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`w`</mark> (<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`truncate`</mark> e sobrescreve se existir), <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`a`</mark> (**append**, escrever ao fim preservando pré-existente quando aplicável ao fluxo gravado após posicionamento), <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`x`</mark> (criação exclusiva — falha se já existir).

- **Camada texto vs binário:** `<mark>`+`b`**</mark>** seleciona **bytes**.

Exemplos de combinações comuns:

```python
open("log.txt", "r", encoding="utf-8")    # texto, leitura
open("dados.bin", "wb")                  # binário, escrita truncada
open("log.txt", "a", encoding="utf-8")   # texto, acrescentar
```

### Escrita com `print` vs `write`

- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`print(..., file=f)`</mark> imprime texto **voltado para apresentação humana**, com quebra de linha padrão.
- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`f.write(...)`</mark> envia dados **literais**. Em modo texto aceita `<mark>str`</mark>; em modo binário exige `<mark>bytes-like`</mark>. **Evite tentar gravar valores numéricos sem converter** antes (use `<mark>str()`</mark> em texto ou serialização própria em binário).

### Leituras

- `<mark>`f.read()`</mark>` sem tamanho: lê até o EOF de uma tacada só (mais simples, mais memória proporcional ao tamanho).
- `<mark>`f.read(n)`</mark>`: lê próximo chunk de até `n` **caracteres** em arquivo texto típico, ou até `n` **bytes** em binário conforme modo.
- Ciclo até acabar quando `<mark>`read`</mark>` devolve sentinel vazio: **string vazia** em modo texto (<mark>`""`</mark>) ou **`b""`** em modo binário.
- `<mark>`readline()`</mark>` devolve até a próxima quebra; adequado quando cada linha modela um registro/evento (**logs**, exports simples linha-a-linha).
- `<mark>`readlines()`</mark>` constrói **lista de strings**, carregando todas as linhas em memória.

### Binário, `offset` e fatias

Em binário, manipular **bytes** com **slices** (`buf[i:j]`) combina com laços controlando um **ponteiro de posição** externo (variável `offset`) somado a um `chunk`, como na aula. Internamente, o objeto arquivo mantém **posição de cursor**; funções <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`tell()`</mark> e <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`seek()`</mark> expõem isso diretamente.

### `seek`/`tell` semânticas

`<mark>`f.tell()`</mark>` informa offset atual desde o começo (<mark>`SEEK_SET`</mark>/<mark>`0`</mark> quando referência é início).

`<mark>`f.seek(offset, whence)`</mark>` segundo parâmetro (nome legado típico: **whence**) controla âncora:

- `0`: início (<mark>`os.SEEK_SET`</mark>)
- `1`: posição corrente (<mark>`SEEK_CUR`</mark>)
- `2`: fim do arquivo (<mark>`SEEK_END`</mark>)

**Trade-off cognitivo:** offsets em binário são previsíveis em bytes absolutos quando você conhece tamanhos; navegar relativamente ao fim é útil para últimos registros/fixtures compactas.

### `with open(...) as …`

Gerencia **fechação garantida**, inclusive em exceções. Reduz erro clássico de manter descritores vivos dentro de **funções longas** apenas por ter aberto perto do início mas sem mais necessidade até o retorno tardio.

### Utilitários de sistema (<mark>`os`</mark> e afins mencionados)

Usos recorrentes: existência (<mark>`os.path.exists`</mark>), classificar caminho arquivo vs pasta (<mark>`os.path.isfile`</mark>/<mark>`isdir`</mark>), copiar/mover/renomear (<mark>`shutil.copy`</mark>, <mark>`shutil.move`</mark>/<mark>`os.rename`</mark>), apagar arquivo (<mark>`os.remove`</mark>), permissões POSIX (<mark>`os.chmod`</mark>). **Impacto**: operações são **determinísticas** no SO; erro humano pode ser **destrutivo** — mitigue com modo `x`/backups antes de `w`.

## Uso Prático

### Criar e fechar um arquivo vazio (texto)

```python
f = open("ops.txt", "wt", encoding="utf-8")
f.close()
```

### Escrever linhas com `print` e texto bruto com `write`

```python
poema = "Curious was a young lady bright\n"

with open("relativity.txt", "w", encoding="utf-8") as f:
    print("Cabeçalho do dataset", file=f)  # adiciona newline padrão
    f.write(poema)                          # sem newline extra (controle seu \n)

```

### Ler por chunks até esgotar (controle memória escalável)

```python
chunks = []
with open("big.log", "r", encoding="utf-8", errors="replace") as f:
    chunk_size = 10_000
    while True:
        frag = f.read(chunk_size)
        if not frag:
            break
        chunks.append(frag)

texto_concatenado = "".join(chunks)
```

<details>
<summary>Nota operacional rápida</summary>

Para logs **muito grandes**, prefira processar/analisar dentro do laço ao invés de concatenar à memória inteira.

</details>

### Ler arquivo de log linha por linha (streaming idiomático)

```python
def filtrar_eventos_erro(caminho: str) -> None:
    with open(caminho, "r", encoding="utf-8", errors="replace") as f:
        for linha in f:                      # objeto arquivo é iterável por linhas
            if "[ERRO]" in linha:
                print(linha.rstrip("\n"))

```

### Binário chunkado + repositionamento

```python
from os import SEEK_SET

dados = bytes(range(256))

with open("bfile.bin", "wb") as out:
    offset = 0
    chunk = 100
    while offset < len(dados):
        out.write(dados[offset:offset + chunk])
        offset += chunk

with open("bfile.bin", "rb") as inp:
    assert inp.tell() == 0
    inp.seek(255, SEEK_SET)     # penúltimo índice em vetor 0..255
    ultimo = inp.read(1)
    assert len(ultimo) == 1

```

## Erros Comuns

- **Usar `<mark>`"w"`</mark> acidentalmente em produto com dados críticos:** trunca e destrói conteúdo anterior. **Sintoma:** arquivo “sumiu” após execução. **Correção:** `<mark>`"a"`</mark> para acrescentar, `<mark>`"x"`</mark> para criar sem colidir, ou backup/versionamento.

- **Abrir em `<mark>`"r"`</mark> e chamar `<mark>`write()`</mark>:** levanta `<mark>`io.UnsupportedOperation`</mark> (proteção). **Correção:** reabrir com modo de escrita adequado.

- **Confundir streaming de console com persistência:** variáveis em RAM não escrevem disco automaticamente. **Correção:** caminho explícito de `<mark>`write()`</mark>/<mark>`print(..., file=)`</mark>.

- **Ler tudo de uma vez em arquivos gigantes:** risco de estouro de memória. **Correção:** laço com `<mark>`read(n)`</mark>` ou iterar linhas.

- **Esquecer encoding em texto internacional:** **mojibake** ou `<mark>`UnicodeDecodeError`</mark>`. **Correção:** padronizar `<mark>`utf-8`</mark>` e política (`errors=`).

- **Posicionar `<mark>`seek`</mark>` em modo texto (Windows/CRLF) com suposições rígidas:** offsets podem surpreender dependendo de normalização. **Correção:** para manipulação fina de bytes, prefira `<mark>`"rb"`</mark>`.

## Visão Geral de Debugging

1. **Verifique o modo**: o primeiro caractere do modo (`r/w/a/x`) determina se escrita é permitida e se trunca.
2. **Confirme o caminho efetivo**: caminho relativo resolve ao **diretório de trabalho atual** do processo (no notebook/IDE, costuma ser raiz do projeto).
3. **Inspecione o cursor**: imprima `<mark>`tell()`</mark>` antes/depois de leituras longas se o conteúdo “some” aparentemente.
4. **Trate sentinelas vazias** em laços de `<mark>`read()`</mark>` (string vazia ou `b""`).
5. **Valide tipo enviado a `<mark>`write()`</mark>`** (str vs bytes).

## Principais Pontos

- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`open()`</mark> conecta caminho, modo textual/binário e operação.
- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`print(..., file=)`</mark> formata; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`write()`</mark> grava literalmente.
- Leitura por <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`read(n)`</mark> controla memória; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`readline()`</mark> alinha a eventos por linha.
- Binário exige <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`bytes`</mark>, slices e contagem de offset consciente.
- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`with`</mark> previne vazamento de descritores.
- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`seek`</mark>/<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`tell`</mark> governam navegação fina.
- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`JSON`</mark> contextualiza interoperabilidade leve frente a formatos mais verbosos.

## Preparação para Prática

Você deve conseguir: (a) abrir com modo seguro para o caso; (b) transformar leitura streaming em acumulador controlado; (c) explicar diferença entre append e truncagem; (d) posicionar leitura binária no último byte; (e) identificar quando iterar linhas é superior a fatiar por tamanho fixo.

## Laboratório de Prática

### Easy — validar existência antes de abrir para leitura

**Contexto ADS:** rotina de ingestão diária tenta ler `<mark>`vendas_YYYYMMDD.csv`</mark>`; falha silenciosa é pior que erro claro.

```python
import os

def caminho_existe(caminho: str) -> bool:
    # TODO: retornar True se o caminho existir no sistema de arquivos
    return False

if __name__ == "__main__":
    assert caminho_existe(__file__) is True
    print("ok")

```

### Medium — contar linhas de log sem carregar arquivo inteiro

**Contexto ADS:** arquivo `<mark>`app.log`</mark>` gigante; precisamos apenas total de linhas **sem** `<mark>`read()`</mark>` completo.

```python
def contar_linhas(caminho: str) -> int:
    # TODO: abrir em modo texto UTF-8 e contar linhas iterando o arquivo
    return 0

if __name__ == "__main__":
    import tempfile, os
    fd, path = tempfile.mkstemp(suffix=".log", text=True)
    os.close(fd)
    with open(path, "w", encoding="utf-8") as f:
        f.write("a\nb\nc\n")
    assert contar_linhas(path) == 3
    os.remove(path)
    print("ok")

```

### Hard — append seguro + leitura posicional binária

**Contexto ADS:** pipeline grava **assinatura** de 4 bytes no fim de blob binário para verificação incremental.

```python
import os
import struct

ASSINATURA = struct.pack(">I", 0xA11CE)  # 4 bytes big-endian

def anexar_assinatura(caminho: str) -> None:
    # TODO: abrir em modo append binário ('ab') e escrever ASSINATURA no final
    return None

def ler_ultimos_4_bytes(caminho: str) -> bytes:
    # TODO: abrir em leitura binária; posicionar no offset len-4 usando seek com whence=SOW (importe SEEK_END)
    # e ler exatamente 4 bytes.
    return b""

if __name__ == "__main__":
    import tempfile
    fd, path = tempfile.mkstemp()
    os.close(fd)
    with open(path, "wb") as f:
        f.write(b"0123456789")
    anexar_assinatura(path)
    tail = ler_ultimos_4_bytes(path)
    assert tail == ASSINATURA
    os.remove(path)
    print("ok")

```

<details>
<summary>Correções de nomes esperados pelo enunciário</summary>

Substitua o placeholder `SOW` mentalmente pelo símbolo padrão de fim‑de‑arquivo: `SEEK_END` (<mark>`os.SEEK_END`</mark>).

</details>

<!-- CONCEPT_EXTRACTION
concepts:
  - objeto arquivo e modos open
  - texto versus binário
  - streaming de leitura (chunks e sentinelas)
  - readline e processamento linha-a-linha
  - escrita literal com write
  - print voltado para arquivos
  - seek e tell para cursor
  - context manager with
  - utilitários de filesystem (existência, mover, renomear)
  - JSON como formato interoperável
skills:
  - Escolher modos adequados antes de ler ou gravar dados críticos
  - Ler arquivos grandes com controle incremental de memória
  - Iterar logs linha por linha para tratamento registral
  - Posicionar leituras binárias com seek relativo ao fim
  - Diagnosticar falhas típicas de modo (UnsupportedOperation / truncagem)
examples:
  - chunk-read-until-empty
  - log-line-iteration-vs-chunk
  - binary-append-signature-tail
-->

<!-- EXERCISES_JSON
[
  {
    "id": "validar-arquivo-existe-es",
    "slug": "validar-arquivo-existe-es",
    "difficulty": "easy",
    "title": "Validar existência de arquivo antes da ingestão",
    "discipline": "python",
    "editorLanguage": "python",
    "tags": ["python", "io", "os.path", "ingestão"],
    "summary": "Implementar checagem de existência de caminho usando os utilitários de filesystem."
  },
  {
    "id": "contar-linhas-log-streaming-es",
    "slug": "contar-linhas-log-streaming-es",
    "difficulty": "medium",
    "title": "Contar linhas grandes sem read completo",
    "discipline": "python",
    "editorLanguage": "python",
    "tags": ["python", "io", "logs", "memória"],
    "summary": "Iterar arquivo texto de log contando linhas sem carregar tudo para RAM."
  },
  {
    "id": "append-binario-tail-signature-es",
    "slug": "append-binario-tail-signature-es",
    "difficulty": "hard",
    "title": "Append binário seguido de leitura posicional ao fim",
    "discipline": "python",
    "editorLanguage": "python",
    "tags": ["python", "binário", "seek", "struct"],
    "summary": "Anexar bytes de verificação e relê-los posicionando o cursor próximo ao EOF."
  }
]
-->

LESSONS_JSON_HINT
{"discipline":"python","slug":"manipulacao-arquivos-disco","title":"Manipulação de arquivos em disco com Python","order":11,"file":"python/manipulacao-arquivos-disco.md"}
