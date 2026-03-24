---
title: "Implementar — formatador de relatório a partir de CSV"
slug: "aula-15-32-implementar-formatador-relatorio-csv"
difficulty: "hard"
concepts: ["composição de funções", "múltiplos retornos", "parâmetros com valor padrão", "loops for", "strings"]
discipline: "python"
learning_goal: "Implementar função que parseia CSV e gera relatório formatado usando composição."
exercise_type: "implement_function"
stage: 5
context: "parsing de CSV/arquivos"
test_cases:
  - input: ""
    output: "Relatório\n  Ana: 15000/12000 ✅\n  Bruno: 9800/10000 ❌\n  Carla: 21000/20000 ✅\n\nQ1 2024\n  Ana: 15000/12000 ✅\n  Bruno: 9800/10000 ❌\n  Carla: 21000/20000 ✅"
---

## Enunciado

Implemente `gerar_relatorio_csv(linhas, separador=",", titulo="Relatório")` que gera string multi-linha. CSV tem colunas `nome,vendas,meta`. Inclui `✅` ou `❌` por vendedor:

```python
csv_dados = ["nome,vendas,meta", "Ana,15000,12000", "Bruno,9800,10000", "Carla,21000,20000"]

print(gerar_relatorio_csv(csv_dados))
print(gerar_relatorio_csv(csv_dados, titulo="Q1 2024"))
```

## Solução

```python
def gerar_relatorio_csv(linhas: list, separador: str = ",", titulo: str = "Relatório") -> str:
    linhas_saida = [titulo]
    for linha in linhas[1:]:
        campos = linha.split(separador)
        nome, vendas, meta = campos[0], int(campos[1]), int(campos[2])
        icone = "✅" if vendas >= meta else "❌"
        linhas_saida.append(f"  {nome}: {vendas}/{meta} {icone}")
    return "\n".join(linhas_saida)
```
