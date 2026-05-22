---
title: "Manipulação de arquivos em disco com Python (texto, binário e fluxos)"
slug: "manipulacao-arquivos-em-disco"
discipline: "python"
order: 11
description: "Abrir, ler e gravar arquivos com segurança: modos de <mark style=\"background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;\">`open()`</mark>, texto vs binário, leitura em blocos, cursor com <mark style=\"background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;\">`tell()`</mark>/<mark style=\"background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;\">`seek()`</mark> e o padrão <mark style=\"background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;\">`with`</mark>."
reading_time: 32
difficulty: "medium"
concepts:
  - open e modos de arquivo
  - texto versus binário
  - leitura incremental (chunks)
  - print versus write
  - readline versus readlines
  - tell e seek
  - context managers (with)
  - operações de filesystem com os
prerequisites: []
learning_objectives:
  - "Escolher o modo correto de abertura (<mark style=\"background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;\">`r`</mark>, <mark style=\"background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;\">`w`</mark>, <mark style=\"background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;\">`a`</mark>, <mark style=\"background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;\">`x`</mark>) e o sufixo de tipo (<mark style=\"background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;\">`t`</mark>/<mark style=\"background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;\">`b`</mark>) sem apagar dados por engano."
  - "Ler arquivos grandes em partes e interpretar o fim do arquivo pela string vazia retornada por <mark style=\"background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;\">`read()`</mark>."
  - "Diferenciar saída ‘humana’ (<mark style=\"background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;\">`print()`</mark>) de bytes/strings brutas (<mark style=\"background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;\">`write()`</mark>)."
  - "Posicionar o cursor com <mark style=\"background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;\">`seek()`</mark> e inspecionar com <mark style=\"background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;\">`tell()`</mark> em arquivos binários."
exercises:
  - question: "Por que abrir com <mark style=\"background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;\">`w`</mark> pode destruir dados existentes, mesmo antes da primeira chamada a <mark style=\"background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;\">`write()`</mark>?"
    answer: "No modo <mark style=\"background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;\">`w`</mark>, o arquivo é truncado ao abrir (o conteúdo anterior é descartado na abertura bem-sucedida), então qualquer dado antigo some imediatamente."
    hint: "Pense no que acontece no momento do <mark style=\"background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;\">`open()`</mark>, não só durante a escrita."
  - question: "Em um laço que lê com <mark style=\"background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;\">`read(chunk)`</mark>, qual condição normalmente encerra o laço?"
    answer: "Quando <mark style=\"background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;\">`read`</mark> retorna <mark style=\"background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;\">`b''`</mark> (binário) ou <mark style=\"background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;\">`''`</mark> (texto), indicando fim de arquivo."
    hint: "Compare com string/bytes vazios, não com <mark style=\"background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;\">`None`</mark>."
  - question: "Por que <mark style=\"background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;\">`print()`</mark> costuma ser uma escolha ruim para gravar binário?"
    answer: "<mark style=\"background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;\">`print()`</mark> é orientado a texto e formata para humanos (inclui separadores e quebra de linha por padrão); fluxos binários exigem <mark style=\"background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;\">`bytes`</mark> e normalmente <mark style=\"background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;\">`write()`</mark>."
    hint: "Compare o tipo aceito por <mark style=\"background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;\">`write()`</mark> em modo <mark style=\"background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;\">`b`</mark>."
---

## Visão Geral do Conceito

Em processamento de dados, a “porta de entrada” para muitos pipelines é um arquivo: exportações de sistemas, logs, CSV “cru”, dumps e artefatos gerados por ETL. Em Python, isso é tratado como **fluxo**: você abre um recurso, transfere bytes/caracteres entre disco e memória e fecha o recurso para liberar buffers e finalizar gravações.

Esta lição reconstrói o núcleo da aula: diferença entre **texto** e **binário**, como o interpretador modela **modos** de abertura, como ler **em blocos** para controlar memória, e como posicionar o **cursor** do arquivo com <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`tell()`</mark>/<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`seek()`</mark>.

Contexto histórico citado na aula: formatos como XML eram verbosos para contratos de web services; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`JSON`</mark> tornou-se padrão em APIs REST por ser mais compacto para transporte na internet. **Não coberto na transcrição desta aula:** uso prático de <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`json`</mark> (<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`loads`</mark>/<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`dumps`</mark>, serialização) — previsto para continuidade na próxima sessão.

> **Regra:** Separar três decisões independentes: (1) **caminho** do arquivo, (2) **operação** (ler/escrever/anexar/criar exclusivo) e (3) **representação** (texto ou bytes).

## Modelo Mental

Pense no arquivo como uma fita endereçada por bytes. Ao abrir, o Python devolve um **objeto arquivo** que mantém um **cursor** (posição atual). Leituras e escritas avançam esse cursor. Texto é uma camada: o Python decodifica bytes em <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`str`</mark> usando um encoding; em modo binário você vê <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`bytes`</mark> “como estão”.

A analogia prática da aula: abrir um <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`.txt`</mark> no editor mostra caracteres legíveis; abrir uma imagem como texto mostra ruído — não é que o disco “mude de ideia”: o **interpretador da camada** é diferente.

## Mecânica Central

### Abertura e modos essenciais

A função <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`open(file, mode='r', ...)`</mark> combina letras:

- Primeira letra: **operação** — <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`r`</mark> leitura; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`w`</mark> escrita truncando se existir; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`a`</mark> anexa no fim; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`x`</mark> cria exclusivo (erro se já existe).
- Segunda letra (opcional implícita): **tipo** — <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`t`</mark> texto (padrão quando faz sentido) ou <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`b`</mark> binário.

Exemplos comuns:

- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`rt`</mark> / <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`r`</mark>: ler texto.
- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`wt`</mark> / <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`w`</mark>: gravar texto **apagando** o conteúdo anterior ao abrir.
- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`at`</mark> / <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`a`</mark>: anexar texto preservando o que já existia.
- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`rb`</mark>/<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`wb`</mark>: ler/gravar bytes.

### Fechamento e o padrão `with`

Chamar <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`close()`</mark> libera recursos do SO e ajuda a garantir que buffers sejam descarregados. O interpretador pode finalizar arquivos sem referência, mas **não dependa disso** em código de produção ou em funções longas.

O statement <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`with open(...) as f:`</mark> transforma o arquivo em **context manager**: ao sair do bloco, o fechamento é disparado de forma previsível, inclusive com exceções.

### Fluxo mental (abrir → operar → fechar)

```mermaid
flowchart TD
  P[Caminho + modo open] --> O{Operação permitida?}
  O -->|não| E[UnsupportedOperation / IOError]
  O -->|sim| T[Manipular cursor: read/write/seek]
  T --> C{Precisa manter aberto?}
  C -->|não| S[close ou sair do with]
  C -->|sim (função longa)| R[Risco de buffer e memória: revisar escopo]
```

### Leitura: `read`, `readline`, `readlines`

- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`read(n)`</mark>: lê até <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`n`</mark> bytes/caracteres (dependendo do modo). Na prática da aula, laços usam um **chunk** (ex.: 100) até receber vazio no EOF.
- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`read()`</mark> **sem** tamanho: lê **todo** o conteúdo restante de uma vez (cuidado com memória em arquivos grandes).
- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`readline()`</mark>: lê até a próxima quebra de linha — útil para logs “um evento por linha”.
- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`readlines()`</mark>: retorna lista de linhas (carrega muito da vez em arquivos grandes).

### Escrita: `print` vs `write`

- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`print(..., file=f)`</mark>: conveniente para linhas de texto; adiciona quebra de linha por padrão.
- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`f.write(s)`</mark>: grava **string** em modo texto ou **bytes-like** em modo binário, sem “formatar para humano”. Para texto, lembre que **não há** quebra automática — inclua <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`\n`</mark> quando precisar.

### Cursor: `tell` e `seek`

- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`tell()`</mark>: posição atual em bytes (no fluxo).
- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`seek(offset, whence=0)`</mark>: reposiciona o cursor. <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`whence`</mark> 0 a partir do início, 1 a partir da posição atual, 2 a partir do fim (útil para “pontas” de arquivo em binário, com cuidado).

Demonstração da aula: posicionar em <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`tamanho-1`</mark> e ler 1 byte retorna exatamente um byte — exercício mental para fixar offsets **zero-based**.

### Utilitários de caminho e FS (<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`os`</mark> / <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`shutil`</mark>)

A transcrição menciona verificações e operações típicas:

- existência/atributos (<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`os.path.exists`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`os.path.isfile`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`os.path.isdir`</mark>),
- cópia/mover/renomear,
- permissões (<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`chmod`</mark>) e remoção.

Para código portável e legível em projetos de dados, muitas equipes preferem <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`pathlib.Path`</mark>, mas a disciplina da aula enfatiza o núcleo de <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`open()`</mark> e modos.

## Uso Prático

### 1) Anexar linhas de log sem truncar

```python
from __future__ import annotations

def append_event_log(path: str, message: str) -> None:
    line = f"{message}\n"
    with open(path, "a", encoding="utf-8") as f:
        f.write(line)


if __name__ == "__main__":
    append_event_log("ingest.log", "job=etl-42 status=started")
```

### 2) Ler arquivo grande em chunks (controle de memória)

```python
def count_chars_streaming(path: str, chunk: int = 1024 * 1024) -> int:
    total = 0
    with open(path, "r", encoding="utf-8", errors="replace") as f:
        while True:
            fragment = f.read(chunk)
            if fragment == "":
                break
            total += len(fragment)
    return total
```

### 3) Processar log linha a linha

```python
def count_error_lines(path: str) -> int:
    errors = 0
    with open(path, "r", encoding="utf-8", errors="replace") as f:
        for line in f:  # iterador eficiente linha a linha
            if " ERROR " in line:
                errors += 1
    return errors
```

### 4) Escrita binária em blocos (mesma ideia da aula)

```python
def write_binary_in_chunks(path: str, data: bytes, chunk: int = 64) -> None:
    with open(path, "wb") as f:
        offset = 0
        size = len(data)
        while offset < size:
            end = min(offset + chunk, size)
            f.write(data[offset:end])
            offset = end
```

## Erros Comuns

- **Truncamento involuntário com <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`w`</mark>:** sintoma — arquivo “some” ou volta pequeno; causa — modo trunca na **abertura**; correção — usar <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`a`</mark> para anexar ou <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`x`</mark> para criar com segurança.
- **`UnsupportedOperation` ao escrever com arquivo aberto só para leitura:** você cruzou modo e operação; reabra com <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`r+`</mark>/<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`w`</mark>/<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`a`</mark> conforme o caso.
- **Confundir EOF com <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`None`</mark>:** <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`read`</mark> retorna string/bytes **vazios**.
- **`UnicodeDecodeError` em texto “sujo”:** dados misturam encodings; em pipelines de dados, use política explícita (<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`errors=`</mark> como <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`strict`</mark>/<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`replace`) ou trate como binário.
- **Duplicar linhas com concatenamento durante <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`readline`</mark>:** sintoma — string cresce a cada iteração; causa — acumular sem querer; correção — imprimir/substituir a variável ou usar acumulador consciente.

## Visão Geral de Debugging

1. Confirme o **modo** observado na exceção ou inspecione com um comentário mínimo no ponto do <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`open()`</mark>.
2. Imprima <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`f.tell()`</mark> antes/depois de leituras suspeitas para detectar cursor “no lugar errado”.
3. Para arquivos grandes, troque <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`read()`</mark> integral por **chunk** ou **iteração por linha**.
4. Se o conteúdo “some”, procure **quem** abre com <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`w`</mark> antes do trecho que você analisa — pode ser outra célula/etapa do notebook.
5. Não há “rollback” mágico de disco após truncamento: use versionamento, backups ou escrita em arquivo temporário + substituição atômica (`os.replace`) em pipelines críticos.

<details>
<summary>Checklist rápido antes de rodar em produção</summary>

- Confirmar encoding (<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`utf-8`</mark> na maior parte dos casos).
- Separar caminhos relativos vs absolutos (CI/CD vs notebook local).
- Validar tamanho esperado e limites de memória antes de <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`read()`</mark> completo.

</details>

## Principais Pontos

- Separe **texto** e **binário**: a mesma sequência em disco pode ser legível ou opaca dependendo do modo.
- Trate **modo** como contrato de segurança: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`w`</mark> apaga ao abrir; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`a`</mark> preserva; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`x`</mark> evita sobrescrever acidentalmente.
- Para arquivos grandes, **chunk** ou **linha a linha** evita picos de RAM.
- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`print()`</mark> é para saída legível; <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`write()`</mark> grava conteúdo cru.
- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`with`</mark> reduz vazamento de descritores e deixa o fluxo legível.
- **Pendência curricular:** manipulação de <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`JSON`</mark> em Python na próxima aula (conforme plano do professor na transcrição).

## Preparação para Prática

Você deve conseguir:

- Abrir arquivos com o modo adequado e justificar a escolha em cenários de ingestão e exportação.
- Implementar leitura **streaming** com término correto no EOF.
- Escrever binário em blocos com índice/offset coerente.
- Explicar quando <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`tell()`</mark>/<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`seek()`</mark> resolvem problemas de parse parcial.

## Laboratório de Prática

### Easy — Rotacionar arquivo de evento (append seguro)

Implemente a função para **anexar** uma linha JSON-like simples (string já pronta) ao arquivo <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`events.ndjson`</mark> usando encoding UTF-8. O programa deve executar sem erro mesmo antes da sua implementação (placeholder).

```python
from __future__ import annotations


def append_ndjson_line(path: str, line: str) -> None:
    # TODO: garantir que 'line' termine com '\n' e gravar em modo de anexação
    pass


if __name__ == "__main__":
    append_ndjson_line("events.ndjson", '{"evt":"ping","ok":true}')
```

### Medium — Agregação por leitura em chunks

Conte quantos caracteres do arquivo são o dígito <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`'9'`</mark> usando <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`read(chunk)`</mark> até o EOF. Não carregue o arquivo inteiro de uma vez. Mantenha o esqueleto executável.

```python
from __future__ import annotations


def count_digit_nine_streaming(path: str, chunk: int = 4096) -> int:
    # TODO: abrir em texto UTF-8 e contar '9' em fragmentos até read retornar ''
    return 0


if __name__ == "__main__":
    print(count_digit_nine_streaming("dados_grandes.txt"))
```

### Hard — Último byte de um artefato binário

Dado um arquivo binário existente (≥ 1 byte), posicione o cursor no **último byte**, leia exatamente **1** byte e retorne esse byte. Use <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`seek`</mark> com <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`os.SEEK_END`</mark> ou cálculo por tamanho — escolha uma abordagem e documente em comentário curto.

```python
from __future__ import annotations

import os


def read_last_byte(path: str) -> bytes:
    # TODO: abrir em modo binário leitura; posicionar no último byte; read(1)
    return b""


if __name__ == "__main__":
    print(read_last_byte("artefato.bin"))
```

<!-- CONCEPT_EXTRACTION
concepts:
  - JSON como formato de transporte (contexto REST)
  - XML verboso vs JSON compacto
  - open e modos r/w/a/x + t/b
  - print(file=) vs write
  - read com chunk e EOF
  - readline e readlines
  - arquivos binários e bytes
  - tell e seek (cursor)
  - with como context manager
  - utilitários de filesystem (os/shutil)
skills:
  - Abrir arquivos escolhendo modo seguro para o caso (append vs truncate)
  - Ler grandes volumes em blocos sem estourar memória
  - Gravar logs linha a linha com encoding explícito
  - Posicionar cursor e validar leituras parciais em binário
  - Fechar recursos de forma previsível com with
examples:
  - append-log-utf8
  - streaming-chunk-count
  - ndjson-append-lab
  - last-byte-seek-binary
-->

<!-- EXERCISES_JSON
[
  {
    "id": "append-ndjson-line-utf8",
    "slug": "append-ndjson-line-utf8",
    "difficulty": "easy",
    "title": "Anexar linha NDJSON com UTF-8",
    "discipline": "python",
    "editorLanguage": "python",
    "tags": ["python", "io", "append", "utf-8", "logs"],
    "summary": "Completar append_ndjson_line para gravar uma linha ao final do ark sem truncar o arquivo."
  },
  {
    "id": "count-nine-streaming",
    "slug": "count-nine-streaming",
    "difficulty": "medium",
    "title": "Contar dígitos '9' com leitura em chunks",
    "discipline": "python",
    "editorLanguage": "python",
    "tags": ["python", "io", "streaming", "performance"],
    "summary": "Implementar contagem usando read(chunk) até EOF, sem read() integral."
  },
  {
    "id": "read-last-byte-binary",
    "slug": "read-last-byte-binary",
    "difficulty": "hard",
    "title": "Ler o último byte de um arquivo binário",
    "discipline": "python",
    "editorLanguage": "python",
    "tags": ["python", "io", "binary", "seek", "tell"],
    "summary": "Posicionar o cursor no último byte com seek e retornar read(1) em modo binário."
  }
]
-->

```LESSONS_JSON_HINT
{"discipline":"python","slug":"manipulacao-arquivos-em-disco","title":"Manipulação de arquivos em disco com Python (texto, binário e fluxos)","order":11,"file":"content/python/manipulacao-arquivos-em-disco.md"}
```
