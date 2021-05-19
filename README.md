# discord-page-3
## _A clone of the Discord homepage (https://discord.com)_

Este site está sendo desenvolvido individualmente como projeto da discíplina de programação web.

Projeto hospedado (utilizando APIs JSON abertas): https://gabriel-css-discord.netlify.app/

## Descrição

Este repositório contém a terceira parte do projeto da disciplina, implementando o lado servidor de uma aplicação, substituindo o uso das APIs usadas nas etapas anteriores.

As partes 1 e 2 do projeto implementam o lado cliente de uma aplicação, consumindo APIs JSON abertas para login e busca de dados, e estão publicadas em um repositório separado. Link: https://github.com/Gabriel-CSS/discord-page

##### PROJETO 3 - Express.js:

    Implementação de funcionalidade do lado servidor de uma aplicação web, utilizando a plataforma Node.js.
    Deve também ser implementado o lado cliente de uma aplicação e essa aplicação deve ser integrada ao servidor.


## Instruções

Para execução do projeto é necessário possuir instalado o [Node.js](https://nodejs.org/).
Também é necessário possuir o [MongoDB](https://www.mongodb.com/try/download/community).

##### Criando o banco de dados Mongo e inserindo o primeiro usuário

Abra o terminal e use:

```sh
mongo
use discordDB
db.users.insert({ nome: "test", email: "test@test.com", senha: "test"})
```

##### Para executar o projeto, abra o terminal na pasta *src* e execute o comando: 
```sh
npm start
```

Seguido os passados e executado o projeto, basta acessar no navegador o link localhost:

```
https:localhost:3000/
```