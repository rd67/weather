import Sequelize from "sequelize";
import { red, cyan } from "chalk";

import config from "@config/config";

import { logger } from "@packages/logger";

import getCityModel from "./cities";

const sequelize = new Sequelize.Sequelize(
  config.mySQL.database,
  config.mySQL.user,
  config.mySQL.password,
  {
    host: config.mySQL.host,
    dialect: "mysql",
    // timezone: '+09:00',
    define: {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
      underscored: false,
      freezeTableName: true,
    },
    logQueryParameters: !config.server.isProduction,
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

const models = {
  City: getCityModel(sequelize),
};

export { sequelize };

export default models;
