import { Response } from "express";

import { IExpressRequest } from "@interfaces/common";

import { AsyncHandler } from "@middlewares/common";

import { successResponse } from "@helpers/response";

import * as services from "./services";

export const cities = AsyncHandler(
  async (req: IExpressRequest, res: Response) => {
    const result = await services.cities({
      ...(req.query as any),
    });

    return successResponse(req, res, result);
  }
);

export const cityDetails = AsyncHandler(
  async (req: IExpressRequest, res: Response) => {
    const result = await services.cityDetails({
      ...(req.params as any),
    });

    return successResponse(req, res, result);
  }
);

export const cityWeather = AsyncHandler(
  async (req: IExpressRequest, res: Response) => {
    const result = await services.cityWeather({
      ...(req.params as any),
      reqId: req.reqId,
    });

    return successResponse(req, res, result);
  }
);
