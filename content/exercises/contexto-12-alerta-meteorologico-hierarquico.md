---
title: "Nível de alerta meteorológico (ordem hierárquica)"
slug: "contexto-12-alerta-meteorologico-hierarquico"
difficulty: "hard"
concepts: ["if/elif/else", "ordem de prioridade", "múltiplas condições"]
discipline: "python"
learning_goal: "Avaliar alertas em ordem de gravidade e exibir o de maior prioridade."
exercise_type: "full_program"
stage: 18
context: "validação de dados"
test_cases:
  - input: "90\n5\n50\nNenhum"
    output: "ALERTA VERMELHO (Perigo Iminente)"
  - input: "45\n-5\n70\nNeve"
    output: "ALERTA LARANJA (Cuidado)"
  - input: "15\n15\n85\nChuva"
    output: "ALERTA AMARELO (Atenção)"
---

## Enunciado

O Centro de Monitoramento Climático classifica o alerta por prioridade (do mais grave ao menos grave). Regras: VERMELHO se vento > 80 ou (precipitação == Granizo e vento > 60). LARANJA (se não vermelho) se temp < -10 ou (Neve e vento > 40) ou (Neve e temp < 0) ou vento > 50. AMARELO (se não anterior) se (Chuva e vento > 40 e umidade > 90) ou vento > 20 ou umidade > 80. AZUL (se não anterior) se (Nenhum e temp < 5 e vento > 30) ou temp < 10 ou umidade > 75 ou Chuva. Senão SEM ALERTA. Entrada: vento (int km/h), temperatura (int °C), umidade (int %), precipitação (Chuva, Neve, Granizo ou Nenhum). Saída: exatamente a mensagem do nível (ex.: "ALERTA VERMELHO (Perigo Iminente)").

**Tarefa**  
Implemente a avaliação na ordem hierárquica e exiba uma única linha com a mensagem do alerta.

**Entrada**  
Quatro linhas: velocidade do vento (int), temperatura (int), umidade (int), tipo de precipitação (string).

**Saída**  
Uma das linhas: ALERTA VERMELHO (Perigo Iminente) | ALERTA LARANJA (Cuidado) | ALERTA AMARELO (Atenção) | ALERTA AZUL (Observação) | SEM ALERTA

## Solução

```python
vento = int(input())
temp = int(input())
umidade = int(input())
precip = input().strip()
if vento > 80 or (precip == "Granizo" and vento > 60):
    print("ALERTA VERMELHO (Perigo Iminente)")
elif temp < -10 or (precip == "Neve" and vento > 40) or (precip == "Neve" and temp < 0) or vento > 50:
    print("ALERTA LARANJA (Cuidado)")
elif (precip == "Chuva" and vento > 40 and umidade > 90) or vento > 20 or umidade > 80:
    print("ALERTA AMARELO (Atenção)")
elif (precip == "Nenhum" and temp < 5 and vento > 30) or temp < 10 or umidade > 75 or precip == "Chuva":
    print("ALERTA AZUL (Observação)")
else:
    print("SEM ALERTA")
```
