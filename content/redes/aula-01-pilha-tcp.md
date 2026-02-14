---
title: "Pilha TCP/IP"
slug: "pilha-tcp"
discipline: "redes"
order: 1
description: "Camadas e conceitos básicos"
exercises:
  - question: "Quantas camadas tem o modelo TCP/IP?"
    answer: "O modelo TCP/IP tem quatro camadas: Aplicação, Transporte, Internet e Acesso à rede."
  - question: "Qual a função da camada de Transporte?"
    answer: "Garantir a entrega de dados entre aplicações (ex.: TCP e UDP)."
    hint: "Pense em portas e em conexão orientada à conexão vs datagramas."
---
## Resumo

- O modelo TCP/IP organiza a comunicação em rede em quatro camadas.
- Aplicação: protocolos como HTTP, FTP, DNS.
- Transporte: TCP (confiável) e UDP (sem garantias).
- Internet: IP, roteamento.
- Acesso à rede: Ethernet, Wi-Fi.

## Explicações

A pilha TCP/IP é um modelo de referência usado na Internet. Cada camada usa os serviços da camada inferior e oferece serviços à camada superior.
