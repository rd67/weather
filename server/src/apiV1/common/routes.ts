import express from "express";

import * as controllers from "./controllers";

const router = express.Router();

router.route("/").get(controllers.home);

export default router;
