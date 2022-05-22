# 🌿 Docker

- **Prerequisites :**

  - Internet Connection
  - [docker](https://www.docker.com/) installed on Host Machine
  - [docker-compose](https://docs.docker.com/compose/) installed on Host Machine

#### Terminal Commands

**_ .env file inside the server folder is used as env file to set all credentials for the app to run, please make sure that this file is properly updated as per the server environment so that the docker image is made properly _**

- **Project Make Commands available :**

Run the project(Development)

```sh
make compose_run_dev
```

Stops the project(Development)

```sh
make compose_stop_dev
```

Run the project(Production)

```sh
make compose_run_prod
```

Stops the project(Production)

```sh
make compose_stop_prod
```

- **Backend Make Commands available(Needs to be inside server folder in terminal) :**
  [Server Details](https://github.com/rd67/weather/tree/master/readme/Server.md)

Makes builds from scratch for the Backend(Development)

```sh
make build_back_dev
```

Starts up Backend(Development) image

```sh
make runback_dev
```

Makes builds from scratch for the Backend(Production)

```sh
make build_back_prod
```

Starts up Backend(Production)

```sh
make runback_prod
```
