---
title: "Decomposição de Jornada para Fechamento de Folha"
slug: "jornada-minutos-horas-pagamento"
difficulty: "medium"
concepts: ["//", "%", "variáveis", "cálculo"]
discipline: "python"
---

## Enunciado

Um técnico de som trabalhou em um set de filmagem por um total de 1527 minutos. Para o fechamento do contrato, o RH precisa que o tempo seja discriminado separando as horas completas dos minutos excedentes, pois as horas e os minutos possuem valores de pagamento distintos. Para este contrato cada hora completa trabalhada é paga a R$ 60,00 e cada minuto excedente é pago a R$ 1,20.

**Tarefa:** A partir do total de 1527 minutos, calcule a quantidade de horas inteiras trabalhadas e a quantidade de minutos restantes. Em seguida calcule o valor total referente às horas e o valor total referente aos minutos excedentes. Exiba no terminal devidamente sinalizadas: horas trabalhadas, minutos excedentes, valor pago pelas horas, valor pago pelos minutos e valor total a receber.

## Solução

```python
total_minutos = 1527
valor_hora = 60.0
valor_minuto = 1.20
horas_trabalhadas = total_minutos // 60
minutos_excedentes = total_minutos % 60
valor_horas = horas_trabalhadas * valor_hora
valor_minutos = minutos_excedentes * valor_minuto
valor_total = valor_horas + valor_minutos
print("Horas trabalhadas:", horas_trabalhadas)
print("Minutos excedentes:", minutos_excedentes)
print("Valor pago pelas horas:", valor_horas)
print("Valor pago pelos minutos:", valor_minutos)
print("Valor total a receber:", valor_total)
```
