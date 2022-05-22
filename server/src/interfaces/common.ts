import { Request } from "express";

export type IExpressRequest = Request & {
  reqId: string;
};
