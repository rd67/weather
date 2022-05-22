import { Request, Response } from "express";

import config from "@config/config";
import { STATUS_CODES, MESSAGES } from "@constants/constants";

import {
  ActionFailedError,
  NotFoundError,
  ValidationError,
} from "@helpers/errors";

import { logger, logInfo } from "@packages/logger";

export const successResponse = (
  req: Request,
  res: Response,
  data: any = {},
  message = MESSAGES.success,
  statusCode = STATUS_CODES.SUCCESS
) => {
  const result = {
    statusCode,
    message: res.__(message), //Added Localization to response
    data,
  };

  //@ts-ignore
  const { originalUrl, method, ip, reqId } = req;

  logInfo({
    reqId,
    req: {
      originalUrl,
      method,
      ip,
      statusCode,
    },
    // result,
  });

  return res.status(statusCode).json(result);
};

export const errorResponse = (error: any, req: Request, res: Response) => {
  const statusCode =
    error.statusCode ?? error.response?.status ?? STATUS_CODES.ERROR;

  const logError = error.logError ?? true;

  //@ts-ignore
  const reqId = req["reqId"];

  if (statusCode === STATUS_CODES.ERROR) {
    // This clips the constructor invocation from the stack trace.
    // It's not absolutely essential, but it does make the stack trace a little nicer.
    Error.captureStackTrace(error, error.constructor);
  }

  if (logError) {
    logger.error(
      `statusCode=>${statusCode}, originalUrl=>${req.originalUrl}, method=>${req.method}, ip=>${req.ip}, reqId=>${reqId}, Stack=>${error.stack}`
    );
  }

  if (config.server.isProduction && statusCode === STATUS_CODES.ERROR) {
    //TODO: ******  Production Error need to add notifications
    return res.status(statusCode).json({
      statusCode,
      message: res.__(MESSAGES.serverError),
      data: {},
    });
  }

  const message =
    error instanceof NotFoundError ||
    error instanceof ActionFailedError ||
    error instanceof ValidationError
      ? res.__(error.message)
      : error.toString();

  return res.status(statusCode).json({
    statusCode,
    message,
    data: error.data,
  });
};
