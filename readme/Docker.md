## Docker

## Setup

Make sure you have Docker & Docker-Compose installed on the device. [Documentation Docker](https://docs.docker.com/engine/install/).

#### Terminal Commands

**_ .env file inside the server folder is responsible to set auth for redis commandar for security, please make sure that this file is properly updated as per the server environment so that the docker image is made as per the requirements _**

- [Server Setup](https://github.com/rd67/weather/tree/master/readme/Server.md)

Makes builds from scratch for Development (This will rebuild all client and server images)

```sh
docker-compose --env-file ./server/.env build --no-cache
```

Starts up Development environment

```sh
docker-compose --env-file ./server/.env -f ./docker-compose.yml up -d --force-recreate
```

Makes builds from scratch for Production (This will rebuild all client and server images)

```sh
docker-compose --env-file ./server/.env -f ./docker-compose.production.yml build --no-cache
```

Starts up Production environment

```sh
docker-compose --env-file ./server/.env -f ./docker-compose.production.yml up -d --force-recreate
```

Removes each services

```sh
docker-compose down
```
