import * as Joi from "joi";

export const cities = {
  query: Joi.object().keys({
    lat: Joi.number().min(-80).max(80).required(),
    lng: Joi.number().min(-180).max(180).required(),
    dist: Joi.number().min(1).optional().default(10),
  }),
};

export const cityDetails = {
  params: Joi.object().keys({
    cityId: Joi.number().min(1).optional().default(10),
  }),
};

export const cityWeather = {
  params: Joi.object().keys({
    cityId: Joi.number().min(1).optional().default(10),
  }),
};
