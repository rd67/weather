## NodeJS Server

An application built with ReactJS, TypeScript, Socket

## Setup

#### -> Required to Setup .env file

After cloning this repo, make sure you have `duplicated` the `.env.example` file to `.env`, don't let the .env.example file be deleted or renamed.

#### Ports for Different Environments

`development`, `production`, `test` -> 3000

When running this application, by default set the development mode. you can set the configuration in `.env`, as following:

#### .env file for development

```sh
REACT_APP_URL=http://127.0.0.1:3000/

REACT_APP_SERVER_URL=http://127.0.0.1:3333/
```

#### .env file for production

```sh
REACT_APP_URL=http://127.0.0.1:3000/

REACT_APP_SERVER_URL=http://127.0.0.1:3335/
```

#### .env file for test

```sh
REACT_APP_URL=http://127.0.0.1:3000/

REACT_APP_SERVER_URL=http://127.0.0.1:3337/
```

## Description of .env file parameters

`REACT_APP_URL` is the base url for the react app
`REACT_APP_SERVER_URL` is the Server URL

#### Terminal Commands

## Development: Command starts the client app in development mode

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

## Test: Runs the Test

```sh
npm run test
```
