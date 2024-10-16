## TEST TAGME API

REST API using NestJS and Mongoose.

<!-- TOC depthFrom:1 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->

- Conteúdo:
    - [Stack](#stack)
    - [Installation](#installation)
    - [Running](#running)
    - [Tests](#tests)

<!-- /TOC -->

<!-- TOC depthFrom:1 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->
## Stack <a name="stack"></a>
- Stack utilizada na aplicação:
  - [Node.js](https://nodejs.org/)
  - [NestJS](https://github.com/nestjs/nest)
  - [TypeScript](https://www.typescriptlang.org/)
  - [MongoDB](https://www.mongodb.com/)
  - [Mongoose](https://mongoosejs.com/)
  - [Jest](https://jestjs.io/)

<!-- /TOC -->

## Installation <a name="installation"></a>

Clone o repositório GIT.

```bash
# Using SSL method.
$ git clone git@github.com:tcsoares1914/test-tagme-api.git
```

Acesse o diretório do repositório clonado:

```bash
$ cd test-tagme-api/
```

Faça uma cópia do arquivo .env.example ou renomeie para .env.

```bash
$ cp .env.example .env
```

## Running <a name="running"></a>

Instale o [Docker](https://docs.docker.com/engine/install/) e [Docker Compose](https://docs.docker.com/compose/install/) para criar e rodar os containers.

Instale as dependências do projeto com [npm](https://www.npmjs.com/):

```bash
$ npm install
```

Para criar os containers rode o comando abaixo.

```bash
# Up and start all application containers.
$ docker compose up -d
```

Faça uma requisição GET para o /:

```bash
GET: http://localhost:3000/
```

Se tudo estiver OK:

```bash
{"healthy":true,"name":"API","version":"0.0.1"}
```

## Test <a name="tests"></a>

Para rodar os testes unitários do projeto:

```bash
# Running unit tests.
$ npm run test
```

Para criar o coverage dos testes unitários:

```bash
# Create code coverage for unit tests.
$ npm run test:cov
```