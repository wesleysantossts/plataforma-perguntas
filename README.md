# Guia Perguntas

Sistema de perguntas com banco de dados desenvolvido em NodeJS + MySQL e estilo feito com Bootstrap.

<div align="center">
  <img src="./public/assets/img/Guiaperguntas.gif" width="300px" border="1px solid black"/><br/>
  <sub>Vídeo 1: aplicação Guia Perguntas <br/>em funcionamento.</sub>
</div>

## Página inicial

A página inicial mostra as perguntas já feitas organizadas em ordem decrescente, da publicação mais recente para a mais antiga. Além disso, consiste também em:

- Botão "Perguntar": redireciona para a página de nova pergunta.
- Lista de perguntas: organizadas por ordem de publicação (mais recente para mais antiga).
- Botão "Responder": redireciona para a pagina de respostas das perguntas.

<div align="center">
  <img src="./public/assets/img/Pginicial.jpg" width="200px"/><br/>
  <sub>Figura 1: Página inicial</sub>
</div>

## Página de Perguntas

A página de perguntas é composta dos seguintes campos:
- Título: para inserir um título curto sobre a dúvida em questão.
- Pergunta: para inserir detalhes da dúvida em questão.
- Botão "Perguntar": encaminha para o banco de dados a pergunta, que será mostrada na página inicial para ser respondida por outros usuários. 

<div align="center">
  <img src="./public/assets/img/Pgpergunta.jpg" width="200px"/><br/>
  <sub>Figura 2: Página de perguntas</sub>
</div>

## Página de Resposta

