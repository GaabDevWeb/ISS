---
title: "JSON em Python: serialização, leitura/escrita em arquivo e uso em dados"
slug: "json-python-serializacao-arquivos"
discipline: "python-para-processamento-de-dados"
order: 12
description: "Transformar objetos Python em texto JSON e vice‑versa, gravar/consultar arquivos e conectar esse fluxo a APIs e logs estruturados."
reading_time: 28
difficulty: "medium"
concepts:
  - formato JSON e interoperabilidade
  - serialização e desserialização
  - json.dumps / json.loads
  - json.dump / json.load
  - parâmetros de formatação (indent, sort_keys, ensure_ascii)
  - leitura e escrita UTF-8
  - padrões JSON Lines (NDJSON) para logs
  - erros típicos (JSON malformado, arquivo ausente)
prerequisites:
  - abertura de arquivos com with open()
learning_objectives:
  - "Explicar JSON como formato de texto para troca/persistência de dados e relacionar esse papel com payloads de HTTP/APIs REST."
  - "Escolher corretamente entre funções de string (dumps/loads) e de arquivo (dump/load)."
  - "Gerar JSON legível ou compacto usando indent, ordenar chaves quando útil e controlar escapes com ensure_ascii."
  - "Implementar fluxo ler → atualizar estruturas de dict/list em Python → regravar JSON com encoding explícito."
  - "Reconhecer JSON Lines como formato comum para eventos/logs e relacionar parsing linha‑a‑linha com json.loads."
exercises:
  - question: "Em qual situação você usa <mark style=\"background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;\">`json.dumps`</mark> em vez de <mark style=\"background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;\">`json.dump`</mark>?"
    answer: "Quando o destino já é uma string Python (payload pronto para enviar, logar ou guardar em outro campo), não um objeto de arquivo. O <mark style=\"background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;\">`dump`</mark> serializa diretamente para arquivo (objeto arquivo aberto)."
    hint: "Pense onde o resultado final mora: memória textual vs stream em disco."

  - question: "Por que <mark style=\"background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;\">`json.loads`</mark> costuma converter um objeto JSON em <mark style=\"background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;\">`dict`</mark>?"
    answer: "Em JSON \"objeto\" é um mapa nome→valor via chaves. O modelo nativo próximo em Python é o dicionário; listas viram list, valores escalares viram tipos compatíveis (str/int/float/bool/None)."
    hint: "Compare a sintaxe {\"chave\": valor} entre JSON e dict."

  - question: "O que muda tipicamente na aparência quando <mark style=\"background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;\">`ensure_ascii=False`</mark> durante <mark style=\"background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;\">`dump(s)`</mark>?"
    answer: "Caracteres fora ASCII (acentos, símbolos) tendem a sair literalmente Unicode no arquivo/string, em vez de sequências escape do tipo \\\\uXXXX, que aumentam verbosidade e reduzem legibilidade humana local."
    hint: "Gere dois dumps do mesmo texto com acento e compare a saída."

---

## Visão Geral do Conceito

<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`JSON`</mark> (<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`JavaScript Object Notation`</mark>) é um formato de texto para representar dados de forma relativamente estruturada. Ele aparece continuamente quando sistemas conversam pela web (respostas e corpos em APIs), quando serviços emitem logs estruturados em linhas e quando bancos orientados a documentos armazenam registros próximos do mesmo modelo mental.

Historicamente aparece nos materiais uma transição contextual de ecossistemas com XML maior e mais pesado em camadas de serviço antigas para padrões comuns como <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`HTTP`</mark> + <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`JSON`</mark> REST. Comparar o mesmo payload em XML e JSON costuma evidenciar repetição de tags e aumento do tamanho em XML: isso não “prova matemática final” universal, mas torna intuitivo porque JSON tende a ser mais enxuto em muitos casos reais ao representar coleções numerosas com muitos campos.

Em Python você não opera “dentro” de JSON quando manipula coleções vivas como <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`dict`</mark>/<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`list`</mark>: primeiro você trabalha nos tipos Python e, quando precisa trocar com outro programa ou gravar arquivo, faz a conversão com o módulo <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`json`</mark>.

---

## Modelo Mental

Pense JSON como um **contrato de texto** sobre um valor JSON válido seguindo a gramática oficial. Do lado Python esse valor já materializado pode ser pensado como **árvore de dados** feita de estruturas pequenas (mapas, vetores e escalares).

- **Serialização (<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`dumps`</mark>/<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`dump`</mark>)**: objeto Python vivo → texto JSON obedecendo sintaxe para ser armazenado/transmitido.  
- **Desserialização (<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`loads`</mark>/<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`load`</mark>)**: texto JSON bem formado → estruturas Python que você navega por chaves/<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">índices`</mark>.

A letra <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`s`</mark> no nome da função lembra *string*: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`dumps`</mark>/<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`loads`</mark> trabalham com strings Python já carregadas em memória, enquanto <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`dump`</mark>/<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`load`</mark> usam arquivo aberto (<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`open()`</mark> dentro de um <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`with`</mark>) como destino/origem direta dos bytes caracteres tratados pelo modo texto.

```mermaid
flowchart LR
    A[Python: dict/list/... vivo] -->|json.dumps ou json.dump| B[Texto JSON válido\n(string ou arquivo)]
    B -->|json.loads ou json.load| C[Python: estruturas aninhadas]

    subgraph api [Uso típico em ADS]
      D[Navegador/Cliente ou microserviço] --> E[Payload JSON texto]
      E --> F[Servidor Python faz loads]
      F --> G[Lógica de negócio com dict/list]
      G --> H[Resposta com dumps antes de responder]
    end
```

---

## Mecânica Central

### Tipos aceitos pela biblioteca padrão (<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`import json`</mark>)

Em geral há mapeamento entre tipos frequentes Python e valores JSON ao serializar (<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`dict`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`list`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`str`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`int`</mark>/<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`float`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`True`</mark>/<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`False`</mark>, <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`None`</mark → `null`). Tuplas costumam ser tratadas como listas durante serialização quando aceitas.

Ao desserializar, um array JSON típico vira <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`list`</mark> Python; objeto JSON → <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`dict`</mark>.

Tipos específicos de domínio (exemplo citado superficialmente nos materiais: <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`datetime`</mark>) **não** possuem tipo JSON nativo. Estratégias usuais: converter primeiro para string ISO controlada pelo seu programa, estudar mais tarde hooks como <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`default`</mark>/<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`JSONEncoder`</mark> quando houver revisão sobre exceções e design de serializers.

### Parâmetros de formatação e portabilidade

- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`indent`</mark> em <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`json.dumps(..., indent=4)`</mark>: insere espaços/iníveis visuais aninhadas sem mudar dados lógicos.  
- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`sort_keys=True`</mark>: ordenação de chaves alfabética na saída — útil para diffs repetíveis.  
- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`ensure_ascii`</mark>: quando <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`False`</mark>, permite saídas mais humanas com acentos; quando <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`True`</mark> você verá escapes <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`\\uXXXX`</mark>. Isso aparece quando comparam acentuação “escapada” vs “literais” durante demonstrações.

### Arquivos: encodings e modos da aula de I/O (<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`open`</mark>)

Padronizar <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`encoding=\"utf-8\"`</mark> evita inconsistências quando nomes/strings contêm grafemas brasileiros. Exemplo mencionando `conferencia.json`: escreva com `<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">with open(\"conferencia.json\", \"w\", encoding=\"utf-8\") as f:`</mark> + `<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">json.dump(dados, f, indent=4, ensure_ascii=False)</mark>`; leia com `<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">\"r\", encoding=\"utf-8\"`</mark> + `<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">json.load(f)</mark>`.

> **Regra:** Sempre feche ciclo conscientemente usando <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`with open`</mark> para garantir flush/<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`close`</mark> automático mesmo após erro.

### Atualizar JSON existente (padrão clássico)

Fluxo repetido durante demonstrações de conferência/participantes:

1. Ler tudo (<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`load`</mark>) dentro de objeto na memória (<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`dict`</mark>).  
2. Mutar valores aninhados (ex.: atualizar ano, `<mark style=\"background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;\">append</mark>`/`+=`/`extend`/`append`/`append` equivocado corrigindo para método list).  
3. Regravar com <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`dump`</mark> sempre que quiser estado persistido.

### JSON Lines / NDJSON (logs)

Quando há **vários registros**, um padrão comum são arquivos em que cada linha é um JSON completo (evento). Isso difere da ideia errônea accidental de “coleção JSON sem vírgulas” que não fecha um array raiz válido ao interpretar arquivo inteiro: em logs reais você lê cada linha e aplica `<mark style=\"background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;\">json.loads(line)</mark>`.

### Bibliotecas alternativas apenas citadas nos materiais

> **Escopo declarado pela fonte oral:** apenas menção rápida. Não tratamos API completa nem quando instalar/compilar cada uma.

Para alto volume podem aparecer projetos externos como `<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">ujson</mark>`/`orjson`; em pipeline corporativo sempre verifique garantias internas antes de divergir do módulo padrão.

---

## Uso Prático

### Desserialização de uma string já carregada

```python
import json

payload = "{\"nome\":\"Marcelo\",\"idade\":40}"
usuario = json.loads(payload)
assert isinstance(usuario, dict)
nome = usuario["nome"]
fallback = usuario.get("email", "sem-email")
```

Após `<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">loads`</mark> você já está inteiramente no ecossistema de tipos Python: indexação direta pode lançar `<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">KeyError</mark>`; `<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">dict.get(k, default)`</mark> evita erro quando campo opcional.

### Serialização com legibilidade e ordenação artificial

```python
import json

dados = {
    "conferencia": "SurgeTech",
    "ano": 2025,
    "palestrantes": [
        {"nome": "Ana Lima", "empresa": "StackSolutions"},
        {"nome": "Bruno Costa", "empresa": "Datalabs"},
    ],
}

texto_compacto = json.dumps(dados)  # str
texto_bonito = json.dumps(dados, indent=4, ensure_ascii=False, sort_keys=True)
```

### Persistência em arquivo bem formado

```python
import json
from pathlib import Path

arquivo = Path("conferencia.json")
estrutura = {
    "conferencia": "SurgeTech",
    "online": False,
    "participantes": ["Ana", "Bruno"],
}

with arquivo.open("w", encoding="utf-8") as f:
    json.dump(estrutura, f, indent=2, ensure_ascii=False)

with arquivo.open("r", encoding="utf-8") as f:
    lido = json.load(f)

primeiro_palestrante = lido["participantes"][0]
```

### Iteração para relatório rápido (estruturas aninhadas)

```python
import json

dados_evento = json.loads("""
{"palestrantes":[{"nome":"Ana Lima"},{"nome":"Bruno Costa"}]}
""")

for palestrante in dados_evento["palestrantes"]:
    print(palestrante["nome"])
```

### Leitura de arquivo de uma linha = um JSON (event sourcing simplificado sintético)

```python
from pathlib import Path
import json

log = Path("eventos.ndjson")

linhas_corretas = [
    '{"evento":"login","usuario":"ana"}',
    '{"evento":"logout","usuario":"bruno"}',
]

with log.open("w", encoding="utf-8") as f:
    for linha_payload in linhas_corretas:
        f.write(linha_payload + "\n")

with log.open("r", encoding="utf-8") as f:
    for idx, linha in enumerate(f, start=1):
        objeto = json.loads(linha.strip())
        # ... processar relatório ...

```

<details>
<summary>Nota rápida (correção de ambiguidade possível durante aulas ao vivo)</summary>

Em linguagens com runtime JavaScript há tipos diferentes de “objeto”; em Python `<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">json.loads</mark>` retorna apenas estruturas built‑in padrão. Não existe um segundo “tipo JSON paralelo” dentro do resultado — só coleções Python.
</details>

Referência inicial útil quando quiser segurar detalhes oficiais: [documentação Python do módulo json](https://docs.python.org/3/library/json.html).

---

## Erros Comuns

- **Confundir <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`loads`</mark> com arquivo**: passar objeto arquivo para `<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">loads`</mark> quebra porque ele espera <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`str`</mark>; use `<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">load`</mark>.  
- **JSON mal formado textualmente** (<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`\"idade\": ,`</mark>): chaves sem valores ou vírgulas sobrando disparam `<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">json.JSONDecodeError</mark>` com informação linha/coluna.  
- **Arquivo inconsistente quando acha que já existe**: abrir modo leitura em caminho inventado causa `<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">FileNotFoundError</mark>` (tratamentos mais profundos aparecem em aula própria sobre exceções).  
- **Encoding implícito perigoso** em dados com acento: sempre preferir declarar UTF‑8 tanto leitura quanto escrita nos pipelines de dados institucionais.  
- **Tratar coleção inteira onde na verdade veio arquivo NDJSON**: tentar `<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">json.load()</mark>` de arquivo com múltiplos objetivos sem formato raiz válido falha ou interpreta apenas parte inadvertidamente conforme formato.

---

## Visão Geral de Debugging

Fluxo rápido:

1. Você quer **onde** falhou durante parse textual? Mensagem `<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">JSONDecodeError`</mark> indica índices aproximados — copiar trecho até o ponto e validar minimamente cortando elementos.  
2. Imprima primeira versão já normalizada usando `<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">repr(texto_pequeno)`</mark> para ver escapes e aspas fantasmas vindas ETL externos.  
3. Se problema é arquivo, cheque `<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">Path.exists()</mark>` e caminho relativo (notebooks diferentes vs VSCode raiz projeto).  
4. Normalize mentalmente o pipeline: primeiro confirme que string é válida `<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">json.loads`, depois lógico de domínio; misturar as duas fases causa debug confuso (`KeyError` após texto OK).

<details>
<summary>Pré-visualização tratamento de erro (sem aprofundar padrões avançados ainda)</summary>

```python
import json

def tentar_converter(texto: str):
    try:
        return json.loads(texto), None
    except json.JSONDecodeError as erro:
        return None, f"Linha {erro.lineno} coluna {erro.colno}"

```

</details>

---

## Principais Pontos

- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`JSON`</mark> comunica dados entre tecnologias e é compacto relativamente quando comparado cenários repetitivos típicos de XML em logs massivos conceituais.  
- <mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">`dumps/load s`</mark>= memória texto; `<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">dump/load`</mark> sem s = arquivo.  
- Tipos vivos fundamentais são mapeados; tipos especializados exigem conversão explícita ou futura especialização técnica.  
- Persistência segura sempre passa pela tríade ler → estruturas mutáveis → regravar.  
- Logs reais favorecem muitas vezes formato linha‑a‑linha com JSON completo cada vez.

---

## Preparação para Prática

Você deve conseguir, sem slide:

1. Ler um `.json` com `<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">utf-8`, extrair valores aninhados e iterar coleções relevantes ao negócio.  
2. Construir dicionários representando relatórios intermediários antes de gravar relatório consolidado também JSON.  
3. Identificar rápido se pipeline é string (`dumps/load s`) versus arquivo (`dump/load`).  
4. Reconstruir cenário erro sintático sintético observando `<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">JSONDecodeError.lineno/colno`.

---

## Laboratório de Prática

### Easy — Formatar payload corporativo estável para auditoria

Um serviço legado espera arquivo JSON monolítico diário ordenado alfabeticamente em chaves topo‑nível. Gere texto final **string** apenas.

```python
import json


def montar_snapshot_auditoria(nucleo_financeiro: dict, *, ordenar_chaves: bool = True, indentacao: int = 4) -> str:
    # TODO: use json.dumps com ensure_ascii adequado aos acentos BR e parametros pedidos no enunciado
    return "{}"

if __name__ == "__main__":
    registro_bruto = {"moeda": "BRL", "valor": 980.5, "responsável": "Júlia"}
    resultado = montar_snapshot_auditoria(registro_bruto)
    print(resultado)
```

**Critérios:** saída legível ASCII humano brasileira (acentos devem aparecer literais onde possível usando parâmetro apropriado), indentação igual argumento informado pelo chamador quando >0.

---

### Medium — Consolidação de arquivo `conferencia.json` já existente (simulação sintética em memória)

**Cenário ADS:** time de eventos atualiza arquivo local com novos dados de palestrantes. Complete função que faz `<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">load` manipula append em lista já existente antes de novo `<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">dump`</mark> (representado aqui retornando string final apenas para simplificar avaliação automatizada eventual).

```python
import io
import json


def atualizar_agenda(arquivo_antigo_txt: str, novo_palestrante: dict) -> str:
    # arquivo_antigo_txt contém um JSON válido raiz objeto com chave obrigatória "palestrantes": []
    buffer = io.StringIO(arquivo_antigo_txt)
    # TODO: json.load(buffer) -> dados
    dados = {}  # substitua
    lista = dados.setdefault("palestrantes", [])
    # TODO: acrescentar novo_palestrante à lista quando ainda não houver mesmo nome igual
    saida = io.StringIO()
    # TODO: dump com indentação 2, ensure_ascii False
    return saida.getvalue()


print(
    atualizar_agenda(
        '{"conferencia":"X","palestrantes":[{"nome":"Ana"}]}',
        {"nome": "Carla", "empresa": "CloudNexus"},
    )
)
```

Ao rodar antes de suas mudanças, mantenha ausência total de traceback (placeholders válidos até implementar verdadeiros passos conforme `# TODO:`).

---

### Hard — Interpretar arquivo NDJSON de microserviço e produzir resumo único arquivo JSON

Um microserviço grava auditoria assim (cada linha JSON independente):

```text
{"acao":"login","usuario":"ana","ts":171000001}
{"acao":"mensagem","usuario":"ana","ts":171000045}
{"acao":"login","usuario":"bruno","ts":171000078}
```

Você recebe todas linhas já carregadas em memória lista strings: completar montagem objeto final sintético com totais mensagens bem como conjunto ordenado unicamente usuários aparecendo (simule retorno JSON string final).

```python
import json
from typing import List


def resumir_trafego_linhas(ndjson_linhas: List[str]) -> str:
    # TODO: iterar cada linha -> json.loads
    usuarios_distintos = []  # manter ordenado ascendente unicidade
    contagem_msgs_por_usuario = {}  # só contar eventos tipo "mensagem"
    exemplos_erro_linha_mal_formada = 0

    resultado = {
        "total_linhas_entrada": len(ndjson_linhas),
        "usuarios_ordenados_distintos": usuarios_distintos,
        "mensagens_enviadas_por_usuario": contagem_msgs_por_usuario,
        "json_lines_descartadas_por_erro_decode": exemplos_erro_linha_mal_formada,
    }

    # TODO: preencher campos usando lógica explicada; ignore linhas ruins sem estourar
    # ... implementação ...

    # TODO dumps indent 4 ensure_ascii False
    return "{}"

if __name__ == "__main__":
    entrada = ['{"acao":"mensagem","usuario":"ana"}', '{"acao":"login","usuario":"bruno"}']
    print(resumir_trafego_linhas(entrada))
```

**Restrições adicionais:** qualquer `<mark style="background-color: #242424; padding: 2px 4px; border-radius: 3px; color: inherit;">JSONDecodeError`</mark> por linha isolada apenas incremente contador, não finalize programa.

---

<!-- CONCEPT_EXTRACTION
concepts:
  - JSON interoperabilidade
  - Serialização textual (dumps) vs arquivo (dump)
  - Desserialização (loads/load)
  - Estruturas aninhadas dict/list em Python após parsing
  - Parâmetros indent/sort_keys/ensure_ascii
  - UTF-8 em arquivos de dados brasileiros
  - Fluxo ler-modificar-regravar
  - NDJSON/logs linha a linha
  - JSONDecodeError sintática
skills:
  - Escolher função adequada json.* conforme entrada saída (str vs arquivo)
  - Persistir relatórios em JSON usando encoding explícito
  - Extrair valores aninhados com segurança (get / checagens)
  - Produzir diffs repetíveis com sort_keys onde necessário
  - Ler micro-batches NDJSON aplicando loads por linha
  - Planejar atualização estruturas mutáveis antes de novo dump
examples:
  - serializacao_indentacao_unicode
  - persistencia_utf8_dump_load
  - atualizacao_palestrantes_append_dict
  - ndjson_auditoria_resumo
-->

<!-- EXERCISES_JSON
[
  {
    "id": "json-python-easy-formatar-auditoria",
    "slug": "json-python-easy-formatar-auditoria",
    "difficulty": "easy",
    "title": "Formatar snapshot JSON ordenado para auditoria",
    "discipline": "python-para-processamento-de-dados",
    "editorLanguage": "python",
    "tags": ["python", "json", "dumps", "encoding", "legibilidade"],
    "summary": "Implementar dumps com ordenação opcional de chaves e acentuação UTF-8 visível usando ensure_ascii configurado."
  },
  {
    "id": "json-python-medium-atualizar-palestrantes",
    "slug": "json-python-medium-atualizar-palestrantes",
    "difficulty": "medium",
    "title": "Atualizar lista de palestrantes em objeto JSON sintético",
    "discipline": "python-para-processamento-de-dados",
    "editorLanguage": "python",
    "tags": ["python", "json", "mutacao-estrutura", "dump", "collections"],
    "summary": "Carregar JSON string, garantir estruturas com setdefault, evitar duplicatas lógicas e re-serializar com indentação declarada."
  },
  {
    "id": "json-python-hard-ndjson-resumo-trafego",
    "slug": "json-python-hard-ndjson-resumo-trafego",
    "difficulty": "hard",
    "title": "Resumir tráfego a partir de JSON Lines com tolerância a linhas ruins",
    "discipline": "python-para-processamento-de-dados",
    "editorLanguage": "python",
    "tags": ["python", "json-lines", "etl-simplificado", "error-handling-basico"],
    "summary": "Iterar registros NDJSON aplicando loads por linha, agregar contagens por usuário apenas para tipo mensagem e reportar falhas sintáticas."
  }
]
-->

```json LESSONS_JSON_HINT
{
  "discipline": "python-para-processamento-de-dados",
  "slug": "json-python-serializacao-arquivos",
  "title": "JSON em Python: serialização, leitura/escrita em arquivo e uso em dados",
  "order": 12,
  "file": "python-para-processamento-de-dados/json-python-serializacao-arquivos.md"
}
```
