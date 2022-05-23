import { literal } from "sequelize";
import axios from "axios";
import dayjs from "dayjs";

import config from "@config/config";

import { NotFoundError } from "@helpers/errors";

import { logInfo } from "@packages/logger";

import redis from "@packages/redis";
import models from "@models/index";

import * as interfaces from "./interfaces";
import * as constants from "./constants";

const getCityDetails = async (
  cityId: number
): Promise<interfaces.ICityDetailsRes> => {
  const cacheKey = `CITY_${cityId}_${config.server.environment}`;

  //  Getting details from cache first
  let cacheDetails = await redis.get(cacheKey);
  if (cacheDetails) {
    return JSON.parse(cacheDetails);
  }

  //  Make DB Request for City Details
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

  //  Saving the DB result in Cache
  await redis.set(cacheKey, JSON.stringify(city));

  return city;
};

const getCityWeather = async (
  city: interfaces.ICityDetailsRes
): Promise<interfaces.ICityWeatherDetailsRes> => {
  const cacheKey = `CITY_${city.id}_WEATHER_${config.server.environment}`;

  //  Getting details from cache first
  let cacheDetails = await redis.get(cacheKey);
  if (cacheDetails) {
    return JSON.parse(cacheDetails);
  }

  //  Make Axios Call to Open Weather Server if no cache
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lng}&appid=${config.openWeather.apiKey}`;

  logInfo({
    msg: `OpenWeather Request Call for City: ${city.id}`,
    url,
  });

  const response = await axios({
    method: "get",
    url,
  });

  const data: interfaces.IOpenWeatherApiResponse = response.data;

  const details: interfaces.ICityWeatherDetailsRes = {
    type: data.weather[0].main,
    type_description: data.weather[0].description,
    sunrise: dayjs(data.sys.sunrise).format("YYYY-MM-DDTHH:mm:ssZ[Z]"),
    sunset: dayjs(data.sys.sunset).format("YYYY-MM-DDTHH:mm:ssZ[Z]"),
    temp: data.main.temp,
    temp_min: data.main.temp_min,
    temp_max: data.main.temp_max,
    pressure: data.main.pressure,
    humidity: data.main.humidity,
    clouds_percent: data.clouds.all,
    wind_speed: data.wind.speed,
  };

  const futureDt = dayjs().add(45, "minutes").unix();
  const endOfDay = dayjs().endOf("day").unix();
  //  Caching the result till 45 Minutes or end of day which ever is minimum,
  const exp = futureDt < endOfDay ? futureDt : endOfDay;

  await redis.set(cacheKey, JSON.stringify(details), {
    EXAT: exp,
  });

  return details;
};

export const cities = async (data: interfaces.ICitiesParams) => {
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

export const cityDetails = async (data: interfaces.ICityDetailsParams) => {
  return getCityDetails(data.cityId);
};

export const cityWeather = async (data: interfaces.ICityWeatherParams) => {
  const city = await getCityDetails(data.cityId);

  const result = await getCityWeather(city);

  return result;
};
