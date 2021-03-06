import express from "express";

import { ValidationHandler } from "@middlewares/index";

import * as validators from "./validators";
import * as controllers from "./controllers";

const router = express.Router();

router.route("/").get(ValidationHandler(validators.cities), controllers.cities);

router
  .route("/:cityId(\\d+)")
  .get(ValidationHandler(validators.cityDetails), controllers.cityDetails);

router
  .route("/:cityId(\\d+)/weather")
  .get(ValidationHandler(validators.cityWeather), controllers.cityWeather);

export default router;
