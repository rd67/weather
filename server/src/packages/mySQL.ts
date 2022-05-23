const mysql = require("mysql2/promise");
import { Sequelize } from "sequelize";

import config from "@config/config";

import { logger } from ".";

export default async () => {
  await mysql
    .createConnection({
      host: config.mySQL.host,
      user: config.mySQL.user,
      password: config.mySQL.password,
    })
    .then((connection: Sequelize) => {
      connection
        .query(`CREATE DATABASE IF NOT EXISTS ${config.mySQL.database};`)
        .then(() => {
          logger.logInfo({ msg: `MySQL DB: ${config.mySQL.database} Created` });
        })
        .catch((error) => {
          logger.logError(`MySQL Error: ${error}`);
        });
    });

  // Open the connection to MySQL server
  // const connection = await mysql.createConnection({
  //   host: config.mySQL.host,
  //   user: config.mySQL.user,
  //   password: config.mySQL.password,
  // })
  // .then();

  // // Run create database statement
  // connection.query(
  //   `CREATE DATABASE IF NOT EXISTS ${config.mySQL.database}`,
  //   function (error: Error, results: any) {
  //     if (error) {
  //       logger.logError(`MySQL Error: ${error}`);
  //     } else {
  //       logger.logInfo({ msg: `MySQL DB: ${config.mySQL.database} Created` });
  //     }

  //     // Close the connection
  //     connection.end();

  //     return;
  //   }
  // );
};
