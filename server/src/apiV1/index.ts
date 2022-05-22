import { Application } from "express";

const API_V1_PERFIX = "/v1";

import { default as common } from "./common/routes";

export default (app: Application) => {
  app.use(`${API_V1_PERFIX}`, common);
};
