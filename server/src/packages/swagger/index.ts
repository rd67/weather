import { Application, Request, Response } from "express";
import { cyan } from "chalk";
import fs from "fs";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

import config from "@config/config";

import { capitalizeFirstLetter } from "@helpers/common";

const getDocs = (basePath: string | Buffer): {} => {
  return fs.readdirSync(basePath).reduce((acc, file) => {
    //  Skipping .js.map files in build
    const fileExtensionArray = file.split(".");
    const fileExtension = fileExtensionArray[fileExtensionArray.length - 1];

    if (fileExtension == "ts" || fileExtension == "js") {
      const data = require(`${basePath}/${file}`);
      acc = {
        ...acc,
        ...data.default,
      };
      return acc;
    } else {
      return acc;
    }
  }, {});
};

const routesSchemas = getDocs(`${__dirname}/routes`);
const modelSchemas = getDocs(`${__dirname}/schemas`);

const baseURLServer = [
  {
    url: `/v1`,
    description: `${capitalizeFirstLetter(config.server.name)} V1`,
  },
];
const swaggerOptURL = [
  {
    url: `/v1/api-docs.json`,
    name: `${capitalizeFirstLetter(config.server.environment)} V1`,
  },
];

const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    servers: baseURLServer,
    // Set GLOBAL
    // security: [
    //   {
    //     auth_token: []
    //   }
    // ],
    components: {
      securitySchemes: {
        // auth_token: {
        //   type: "apiKey",
        //   in: "header",
        //   name: "Authorization",
        //   description:
        //     "JWT Authorization header using the JWT scheme. Example: “Authorization: JWT {token}”",
        // },
      },
      schemas: modelSchemas,
      parameters: {},
    },
    info: {
      title: `Api ${config.server.name} Documentation`,
      version: "1.0.0",
    },
    paths: routesSchemas,
  },
  apis: [],
};
const swaggerSpec = swaggerJSDoc(swaggerOptions);
const optionsSwaggerUI = {
  explorer: true,
  swaggerOptions: { urls: swaggerOptURL },
};

export default (app: Application) => {
  app.get("/v1/api-docs.json", (req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  app.use("/v1/api-docs", swaggerUI.serve);
  app.get("/v1/api-docs", swaggerUI.setup(swaggerSpec, optionsSwaggerUI));

  const name = cyan("🌿 Swagger");
  console.log(`${name} is loaded.`);
};
