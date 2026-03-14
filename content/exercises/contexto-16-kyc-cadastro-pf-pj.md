---
title: "Triagem cadastral KYC (PF e PJ com entradas condicionais)"
slug: "contexto-16-kyc-cadastro-pf-pj"
difficulty: "hard"
concepts: ["if/elif aninhados", "input condicional", "len", "strings"]
discipline: "python"
learning_goal: "Solicitar dados conforme tipo de cliente e exibir status do cadastro."
exercise_type: "full_program"
stage: 18
context: "validação de dados"
test_cases:
  - input: "PF\n12345678901\n25"
    output: "Cadastro Aprovado"
  - input: "PJ\n12345678000199"
    output: "Cadastro Aprovado"
---

## Enunciado

Um sistema de triagem cadastral (KYC) decide se um cliente é aprovado, fica em revisão ou é recusado. Se tipo for PF: lê CPF (só dígitos) e idade. CPF com 11 caracteres e idade >= 18 → "Cadastro Aprovado". Se CPF não tem 11 caracteres, lê se há documentação complementar (S ou N); se S e idade >= 18 → "Cadastro em Revisao"; senão "Cadastro Recusado". Se tipo for PJ: lê CNPJ (só dígitos). 14 caracteres → "Cadastro Aprovado". Senão lê se tem registro provisório (S ou N); S → "Cadastro em Revisao"; N → "Cadastro Recusado". Se a primeira linha não for PF nem PJ, exiba "Tipo de cliente invalido." Implemente em Python (Deepnote).

**Tarefa**  
Solicitar entradas conforme o tipo (PF/PJ) e as validações, e exibir o status final.

**Entrada**  
Conforme fluxo: tipo (PF ou PJ); depois CPF e idade (PF) ou CNPJ (PJ); quando aplicável, documentação complementar ou registro provisório.

**Saída**  
Uma linha: Cadastro Aprovado | Cadastro em Revisao | Cadastro Recusado | Tipo de cliente invalido.

## Solução

```python
tipo = input().strip()
if tipo == "PF":
    cpf = input().strip()
    idade = int(input())
    if len(cpf) == 11 and idade >= 18:
        print("Cadastro Aprovado")
    elif len(cpf) != 11:
        doc = input().strip().upper()
        if doc == "S" and idade >= 18:
            print("Cadastro em Revisao")
        else:
            print("Cadastro Recusado")
    else:
        print("Cadastro Recusado")
elif tipo == "PJ":
    cnpj = input().strip()
    if len(cnpj) == 14:
        print("Cadastro Aprovado")
    else:
        reg = input().strip().upper()
        if reg == "S":
            print("Cadastro em Revisao")
        else:
            print("Cadastro Recusado")
else:
    print("Tipo de cliente invalido.")
```
