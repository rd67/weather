import express, { Application } from "express";
import path from "path";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import hpp from "hpp";
import { cyan } from "chalk";

import config, { validateConfigEnv } from "@config/config";

validateConfigEnv();

import {
  RequestHandler,
  RouteNotFoundHandler,
  ErrorHandler,
} from "@middlewares/index";
import { i18n, httpLogger, redis, swagger, sequelize } from "@packages/index";

import apiV1Routes from "@apiV1/index";

import { bootstrapApp } from "./bootstrap";

const {
  server: { port, environment },
} = config;

class App {
  public app: Application;
  public port: number;
  public env: string;

  constructor() {
    this.app = express();
    this.port = port;
    this.env = environment;

    this.connectToDB();
    this.initializeMiddlewares();
    this.initializeRoutes();
  }

  public listen() {
    const onError = (error: { syscall: string; code: string }): void => {
      if (error.syscall !== "listen") {
        throw error;
      }

      const bind =
        typeof this.port === "string"
          ? `Pipe ${this.port}`
          : `Port ${this.port}`;

      // handle specific listen errors with friendly messages
      switch (error.code) {
        case "EACCES":
          console.error(`${bind} requires elevated privileges`);
          process.exit(1);
        case "EADDRINUSE":
          console.error(`${bind} is already in use`);
          process.exit(1);
        default:
          throw error;
      }
    };

    const onListening = (): void => {
      console.info(`=================================`);
      console.info(`======= ENV: ${cyan(this.env)} =======`);
      console.info(`🚀 App listening on the port ${cyan(this.port)}`);
      console.info(`=================================`);
    };

    // Run listener
    const server = this.app
      .listen(this.port)
      .on("error", onError)
      .on("listening", onListening);

    return server;
  }

  private connectToDB = async () => {
    await Promise.all([
      sequelize.default.sequelize.sync({ force: false }),
      redis.default.connect(),
    ]);

    await bootstrapApp();
  };

  private initializeMiddlewares() {
    i18n.default(this.app);

    httpLogger.default(this.app); //  Console log info regarding requests

    this.app.use(
      cors({
        origin: "*",
      })
    );

    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());

    this.app.use(express.static(path.resolve(`${__dirname}/../public`)));

    if (config.other.swagger) {
      //  Added Swagger Docs
      swagger.default(this.app);
    }

    this.app.use(RequestHandler);
  }

  private initializeRoutes() {
    apiV1Routes(this.app);

    // Catch error 404 endpoint not found
    this.app.use("*", RouteNotFoundHandler);

    // Catch errors
    this.app.use(ErrorHandler);
  }
}

export default App;
