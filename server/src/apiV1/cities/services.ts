import { literal } from "sequelize";

import { NotFoundError } from "@helpers/errors";

import redis from "@packages/redis";
import models from "@models/index";

import * as interfaces from "./interfaces";
import * as constants from "./constants";

const getCityDetails = async (
  cityId: number
): Promise<interfaces.ICityDetailsRes> => {
  const cacheKey = `CITY_${cityId}`;

  let cacheDetails = await redis.get(cacheKey);
  if (cacheDetails) {
    return JSON.parse(cacheDetails);
  }

  const details = await models.City.findOne({
    where: {
      id: cityId,
    },
    attributes: ["id", "name", "point"],
  });
  if (!details) {
    throw new NotFoundError(constants.MESSAGES.notFound);
  }

  const city: interfaces.ICityDetailsRes = {
    id: details.id,
    name: details.name,
    lat: details.point.coordinates[1],
    lng: details.point.coordinates[0],
  };

  await redis.set(cacheKey, JSON.stringify(city));

  return city;
};

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

export const cityDetails = async (data: interfaces.ICityDetails) => {
  return getCityDetails(data.cityId);
};

export const cityWeather = async (data: interfaces.ICityWeather) => {
  const city = await getCityDetails(data.cityId);
};
