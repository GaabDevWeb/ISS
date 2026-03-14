---
title: "Requisitos de atributos para habilidade (jogo RPG)"
slug: "contexto-06-requisitos-habilidade-jogo-and"
difficulty: "easy"
concepts: ["if/else", "operadores lógicos and", "operadores relacionais"]
discipline: "python"
learning_goal: "Verificar duas condições simultaneamente para desbloquear habilidade."
exercise_type: "full_program"
stage: 16
context: "validação de dados"
test_cases:
  - input: "80\n85"
    output: "QUALIFICADO"
  - input: "70\n90"
    output: "NAO QUALIFICADO"
---

## Enunciado

Em um jogo de RPG, uma habilidade especial só pode ser aprendida se o personagem tiver Força maior que 75 e Agilidade maior que 80. O sistema recebe os dois atributos como entrada. Desenvolva um programa em Python (Deepnote) que verifique essas duas condições e indique se o personagem está QUALIFICADO ou NAO QUALIFICADO para aprender a habilidade.

**Tarefa**  
Implemente um programa que avalie Força e Agilidade e exiba o resultado da verificação.

**Entrada**  
Duas linhas: primeira com inteiro (Força); segunda com inteiro (Agilidade). Valores positivos.

**Saída**  
- Se Força > 75 e Agilidade > 80: exiba `QUALIFICADO`
- Caso contrário: exiba `NAO QUALIFICADO`

## Solução

```python
forca = int(input())
agilidade = int(input())
if forca > 75 and agilidade > 80:
    print("QUALIFICADO")
else:
    print("NAO QUALIFICADO")
```
