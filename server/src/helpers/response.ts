import { Request, Response } from "express";

import config from "@config/config";

import { STATUS_CODES, MESSAGES } from "@constants/constants";

import {
  ActionFailedError,
  NotFoundError,
  ValidationError,
} from "@helpers/errors";

import { logger } from "@packages/logger";

export const successResponse = (
  req: Request,
  res: Response,
  data: any = {},
  statusCode = STATUS_CODES.SUCCESS
) => {
  return res.status(statusCode).json(data);
};

export const errorResponse = (error: any, req: Request, res: Response) => {
  const code = error.code;
  const statusCode =
    error.statusCode ?? error.response?.status ?? STATUS_CODES.ERROR;

  const log = error.log ?? true;

  //@ts-ignore
  const { reqId } = req;

  if (statusCode === STATUS_CODES.ERROR) {
    // This clips the constructor invocation from the stack trace.
    // It's not absolutely essential, but it does make the stack trace a little nicer.
    Error.captureStackTrace(error, error.constructor);
  }

  if (log) {
    logger.error(
      `statusCode=>${statusCode}, code=>${code}, originalUrl=>${req.originalUrl}, method=>${req.method}, ip=>${req.ip}, reqId=>${reqId}, Stack=>${error.stack}, error=${error}`
    );
  }

  if (config.server.isProduction && statusCode === STATUS_CODES.ERROR) {
    //TODO: ******  Production Error need to add notifications
    return res.status(statusCode).json({
      code,
      // statusCode,
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
    code,
    // statusCode,
    message,
    data: error.data,
  });
};
