# Travel Brochure API

## Overview

- Repository for Travel Brochure API
- Using Node.js and Express
- Using docker-compose to start up Express, MySQL and Redis server

## Requirements

- [Docker](https://www.docker.com/)

## Commands

```bash
# Build docker image
docker-compose build

# Start servers
$ docker-compose up

# Migration
$ docker-compose exec travel-brochure-api knex migrate:latest

# Seed
$ docker-compose exec travel-brochure-api knex seed:run

# Rollback
$ docker-compose exec travel-brochure-api knex migrate:rollback
```

## Directory Structure

```bash
$ tree -L 2
.
├── Dockerfile
├── README.md
├── app
│   ├── controllers
│   ├── index.js
│   ├── middleware
│   ├── models
│   ├── repositories
│   ├── services
│   └── utils
├── docker-compose.yaml
├── knexfile.js
├── mysql
│   ├── Dockerfile
│   ├── knex.js
│   ├── migrations
│   ├── my.cnf
│   └── seeds
├── package.json
└── test
```

## Libraries

- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [express](https://expressjs.com/ja/)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [Knex.js](https://knexjs.org/)
- [mysql](https://www.npmjs.com/package/mysql)
- [redis](https://www.npmjs.com/package/redis)
- [@google-cloud/storage](https://www.npmjs.com/package/@google-cloud/storage)

## Memo

- [Knex does not support returning method is MySQL](https://github.com/tgriesser/knex/issues/2616)
- [SendGrid for mailer](https://cloud.google.com/compute/docs/tutorials/sending-mail/using-sendgrid?hl=ja)
- [Passport for SNS login](http://www.passportjs.org/)
