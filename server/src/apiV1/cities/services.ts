import { literal } from "sequelize";

import models from "@models/index";

import * as interfaces from "./interfaces";

export const cities = async (data: interfaces.ICities) => {
  return models.City.findAll({
    attributes: [
      "id",
      "name",
      // "point",
      // [
      //   sequelize.fn(
      //     "ST_Distance_Sphere",
      //     sequelize.literal("point"),
      //     sequelize.literal(`ST_GeomFromText('POINT(${data.lng} ${data.lat})')`)
      //   ),
      //   "distance",
      // ],
    ],
    where: literal(
      `(ST_Distance_Sphere(point, ST_GeomFromText( 'POINT(${data.lng} ${
        data.lat
      })' )) <= ${data.dist * 1000})`
    ),
    limit: 100,
    offset: 1,
  });
};
