import * as Joi from "joi";

const latitude = Joi.number().min(-80).max(80);
const longitude = Joi.number().min(-180).max(180);

export const cities = {
  query: Joi.object().keys({
    lat: latitude.required(),
    lng: longitude.required(),
    dist: Joi.number().min(1).optional().default(10),
  }),
};

export const cityDetails = {
  params: Joi.object().keys({
    cityId: Joi.number().min(1).optional().default(10),
  }),
};
