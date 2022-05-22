import Sequelize from "sequelize";
import { red, cyan } from "chalk";

import config from "@config/config";

import { logger } from "@packages/logger";
// import models from "@models/";

const { server, mySQL } = config;

const sequelize = new Sequelize.Sequelize(
  mySQL.database,
  mySQL.user,
  mySQL.password,
  {
    host: mySQL.host,
    dialect: "mysql",
    // timezone: '+09:00',
    define: {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
      underscored: false,
      freezeTableName: true,
    },
    logQueryParameters: !server.isProduction,
    logging: (query, time) => {
      logger.info(time + "ms" + " " + query);
    },
    benchmark: true,
  }
);

sequelize
  .authenticate()
  .then(() => {
    const name = cyan("🌿 MySQL");
    logger.info(`${name}: Connected`);
  })
  .catch((error) => {
    const name = red("❌ MySQL");
    logger.error(`${name} Something went wrong ${error}`);
  });

const DB = {
  sequelize, // connection instance (RAW queries)
  Sequelize, // library itself
};

export default DB;
