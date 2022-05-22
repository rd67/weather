import express from "express";

import { ValidationHandler } from "@middlewares/index";

import * as validators from "./validators";
import * as controllers from "./controllers";

const router = express.Router();

router.route("/").get(ValidationHandler(validators.cities), controllers.cities);

export default router;
