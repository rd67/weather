## NodeJS Server

An application built with Express, TypeScript, MySQL, Redis

## Setup

- **Required to Setup .env file :**

After cloning this repo, make sure you have `duplicated` the `.env.example` file to `.env`, don't let the .env.example file be deleted or renamed.

When running this application, by default set the development mode. you can set the configuration in `.env`, as follows:

- **Development :**

```sh
#  Server
NODE_ENV=development
SECRET_KEY=bcr123r7y6QGe47123abcdeauqBXF786
SERVER_NAME=weather-server
SERVER_URL="http://localhost:8080"

#  Redis -> Authentication at SG Level
REDIS_URL="redis://127.0.0.1:6379"
REDIS_COMMANDER_USER=root
REDIS_COMMANDER_PASSWORD=password

#  MySQL
MYSQL_ROOT_PASSWORD="core2duo"
MYSQL_DATABASE="weather"
MYSQL_USER="weatherUser"
MYSQL_PASSWORD="waetherPassword"

#   Open Weather
OPEN_WEATHER_API_KEY=""
```

- **Production :**

```sh
#  Server
NODE_ENV=production
SECRET_KEY=bcr123r7y6QGe47123abcdeauqBXF786
SERVER_NAME=weather-server
SERVER_URL="http://localhost:8081"

#  Redis -> Authentication at SG Level
REDIS_URL="redis://127.0.0.1:6379"
REDIS_COMMANDER_USER=root
REDIS_COMMANDER_PASSWORD=password

#  MySQL
MYSQL_ROOT_PASSWORD="core2duo"
MYSQL_DATABASE="weather"
MYSQL_USER="weatherUser"
MYSQL_PASSWORD="waetherPassword"

#   Open Weather
OPEN_WEATHER_API_KEY=""
```

- **Test :**

```sh
#  Server
NODE_ENV=test
SECRET_KEY=bcr123r7y6QGe47123abcdeauqBXF786
SERVER_NAME=weather-server
SERVER_URL="http://localhost:8082"

#  Redis -> Authentication at SG Level
REDIS_URL="redis://127.0.0.1:6379"
REDIS_COMMANDER_USER=root
REDIS_COMMANDER_PASSWORD=password

#  MySQL
MYSQL_ROOT_PASSWORD="core2duo"
MYSQL_DATABASE="weather"
MYSQL_USER="weatherUser"
MYSQL_PASSWORD="waetherPassword"

#   Open Weather
OPEN_WEATHER_API_KEY=""
```

- **Description of .env file parameters :**

# Server

- `SERVER_URL` is the Server URL, Development: http://localhost:8080, Production: http://localhost:8081, Test: http://localhost:8082
- `SECRET_KEY` should be randomly generated string of length 32

# Redis

- `REDIS_URL` is the Redis DB URL
- `REDIS_COMMANDER_USER` is the auth user for redis-commandar GUI tool as per your liking
- `REDIS_COMMANDER_PASSWORD` is the auth password for redis-commandar GUI tool as per your liking

# MySQL

- `MYSQL_ROOT_PASSWORD` is the Root password for mySQL
- `MYSQL_DATABASE` is the database for the project
- `MYSQL_USER` is the user for the project database
- `MYSQL_PASSWORD` is the password for the project database

# Open Weather

- `OPEN_WEATHER_API_KEY` is the Api Key for Open Weather Apis

#### Terminal Commands

## Development: Command starts the server with nodemon (automated server restart on files change)

```sh
npm run dev
```

## Production: Command starts the server from the build

```sh
npm run start
```

## Production Build : Make build using following command

```sh
npm run build
```

## Clean: Removes the build folder

```sh
npm run clean
```

## Test: Runs the Unit Test

```sh
npm run test
```

## Format: Formats the code

```sh
npm run format
```

## Api Documentation

SERVER_URL value will be different for each environment for example

### Api Swagger OpenApi JSON (Not Available in Test environment)

    Link = ${SERVER_URL}/v1/api-docs.json

### Api Swagger UI

    Link = ${SERVER_URL}/v1/api-docs

### Api Postman

    Link = https://documenter.getpostman.com/view/154248/UyxojQ8G

    Make Sure WEATHER_SERVER Is set in postman is set to ${SERVER_URL} value from .env file .
