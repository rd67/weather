import { Application } from "express";
import morgan from "morgan";
import morganJSON from "morgan-json";

import { STATUS_CODES } from "@constants/constants";
import { IExpressRequest } from "@interfaces/common";

import { logger, logInfo } from "./logger";

type HTTPLoggerParams = Record<string, string>;

class HTTPLoggerStream {
  write(message: string) {
    const data: HTTPLoggerParams = JSON.parse(message);

    if (Number(data.status) > STATUS_CODES.CREATED) {
      logger.error({
        // timestamp: new Date().toString(),
        ...data,
      });
    } else {
      logInfo({
        // timestamp: new Date().toString(),
        ...data,
      });
    }
  }
}

export default (app: Application) => {
  morgan.token("reqId", (request: IExpressRequest) => {
    return request.reqId;
  });

  const httpLoggerParams: HTTPLoggerParams = {
    kind: "httpLogger",
    reqId: ":reqId",
    method: ":method",
    url: ":url",
    status: ":status",
    contentLength: ":res[content-length]",
    responseTime: ":response-time",
  };

  const format = morganJSON(httpLoggerParams);

  app.use(
    morgan(format, {
      stream: new HTTPLoggerStream(),
    })
  );
};
