import { cyan } from "chalk";
import { createReadStream } from "fs";
import { join } from "path";
//@ts-ignore
import { parse as jsonParse } from "JSONStream";

import { ICityFileRow, ICityCreateRow } from "@interfaces/cities";

import { convertToPoint, formatString } from "@helpers/common";

import { logger, logInfo } from "@packages/logger";

import models from "@models/index";

/**
 *
 * @param filePath path of the cities file
 * @returns {
 * totalRows,
 * processedRows
 * }
 */
const bootstrapCities = async (filePath: string) => {
  return new Promise((resolve, reject) => {
    const MAX_BATCH_SIZE = 25000;

    let totalRows = 0;
    let processedRows = 0;

    const stream = createReadStream(filePath, { encoding: "utf8" });
    const parser = jsonParse("*");

    stream.pipe(parser);

    const flush = async (rows: ICityCreateRow[]) => {
      parser.pause();

      await models.City.bulkCreate(rows, {
        logging: false,
      });

      processedRows += rows.length;

      parser.resume();
    };

    // Current batch
    let batch: ICityCreateRow[] = [];

    logInfo({
      msg: "Bootstraping Cities",
      filePath,
    });

    parser
      .on("data", (row: ICityFileRow) => {
        batch.push({
          id: parseInt(`${row.id}`),
          name: formatString(row.name),
          state: row.state,
          country: row.country.toUpperCase(),
          point: convertToPoint(row.coord.lat, row.coord.lon),
        });

        totalRows += 1;

        if (batch.length >= MAX_BATCH_SIZE) {
          flush(batch).catch(reject);
          batch = [];
        }
      })
      .on("end", () => {
        flush(batch)
          .catch(reject)
          .then(() => {
            resolve({
              totalRows,
              processedRows,
            });
          });
      })
      .on("error", reject);
  }).catch((error) => {
    logger.error(`Cities Bootstrap Error ${error}`);
    throw error;
  });
};

export const bootstrapApp = async () => {
  //  Cities
  const totalRows = await models.City.count();
  if (!totalRows) {
    console.time("bootstrapCities");

    const result = await bootstrapCities(join(__dirname, "city.list.json"));

    console.timeEnd("bootstrapCities");

    logInfo({
      msg: "Cities Bootstraped",
      result,
    });
  }

  console.log(`${cyan("🌿 App Bootstrapped")} successfully.`);
};
