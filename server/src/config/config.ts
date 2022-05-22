import dotenv from "dotenv";
import Joi from "joi";

import * as interfaces from "./interfaces";

dotenv.config();

export const validateConfigEnv = () => {
  const envVarsSchema = Joi.object()
    .keys({
      //  Server
      NODE_ENV: Joi.string()
        .valid(...Object.values(interfaces.IEnvironment))
        .required(),
      SECRET_KEY: Joi.string()
        .required()
        .length(32)
        .description("My api secret for encryption"),
      SERVER_NAME: Joi.string().required(),
      SERVER_URL: Joi.string().required(),

      //  MySQL
      MYSQL_ROOT_PASSWORD: Joi.string().required(),
      MYSQL_DATABASE: Joi.string().required(),
      MYSQL_USER: Joi.string().required(),
      MYSQL_PASSWORD: Joi.string().required(),

      //  Redis
      REDIS_URL: Joi.string().required(),
      REDIS_COMMANDER_USER: Joi.string().required(),
      REDIS_COMMANDER_PASSWORD: Joi.string().required(),
    })
    .unknown();

  const { error } = envVarsSchema
    .prefs({ errors: { label: "key" } })
    .validate(process.env);

  if (error) {
    throw new Error(`Config validation error: ${error.message}`);
  }
};

//  Server
const Env = process.env.NODE_ENV as interfaces.IEnvironment;
const SecretKey = process.env.SECRET_KEY as string;
const ServerName = process.env.SERVER_NAME as string;
const ServerURL = process.env.SERVER_URL as string;

//  MySQL
const MySQLConfig: interfaces.IMySQLConfig = {
  rootPassword: process.env.MYSQL_ROOT_PASSWORD as string,
  host: process.env.MYSQL_HOST as string,
  port: 3306,
  database: process.env.MYSQL_DATABASE as string,
  user: process.env.MYSQL_USER as string,
  password: process.env.MYSQL_PASSWORD as string,
};

//  Redis
const RedisConfig: interfaces.IRedisConfig = {
  url: process.env.REDIS_URL as string,
  commandarUser: process.env.REDIS_COMMANDER_USER as string,
  commandarPassword: process.env.REDIS_COMMANDER_PASSWORD as string,
};

const development: interfaces.IConfig = {
  server: {
    isProduction: false,
    environment: interfaces.IEnvironment.development,
    name: ServerName,
    port: 3333,
    secretKey: SecretKey,
    url: ServerURL,
  },

  mySQL: MySQLConfig,

  redis: RedisConfig,

  other: {
    swagger: true,
  },
};

const production: interfaces.IConfig = {
  server: {
    isProduction: true,
    environment: interfaces.IEnvironment.production,
    name: ServerName,
    port: 3335,
    secretKey: SecretKey,
    url: ServerURL,
  },

  mySQL: MySQLConfig,

  redis: RedisConfig,

  other: {
    swagger: true,
  },
};

const test: interfaces.IConfig = {
  server: {
    isProduction: true,
    environment: interfaces.IEnvironment.test,
    name: ServerName,
    port: 3337,
    secretKey: SecretKey,
    url: ServerURL,
  },

  mySQL: MySQLConfig,

  redis: RedisConfig,

  other: {
    swagger: false,
  },
};

const config: Record<interfaces.IEnvironment, interfaces.IConfig> = {
  development,
  test,
  production,
};

export default config[Env];
