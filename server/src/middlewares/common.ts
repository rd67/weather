import { Request, Response, NextFunction } from "express";

import { MESSAGES } from "@constants/constants";

import { uuidGenerate } from "@helpers/common";
import { NotFoundError } from "@helpers/errors";
import { errorResponse } from "@helpers/response";

export const RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //@ts-ignore
  req["reqId"] = uuidGenerate();

  //  Setting Language incase a header come
  res.setLocale(req.get("language") || "en");

  next();
};

export const RouteNotFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return errorResponse(new NotFoundError(MESSAGES.routeNotFound), req, res);
};

// Wrap an async fn and propogate the exceptions it produces to next
export const AsyncHandler =
  (fn: any) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);

export const ErrorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return errorResponse(error, req, res);
};
