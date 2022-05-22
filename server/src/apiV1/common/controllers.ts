import { Response } from "express";

import { IExpressRequest } from "@interfaces/common";

import { AsyncHandler } from "@middlewares/common";

import { successResponse } from "@helpers/response";

export const home = AsyncHandler(
  async (req: IExpressRequest, res: Response) => {
    return successResponse(req, res);
  }
);
