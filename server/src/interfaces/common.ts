import { Request } from "express";

export type IExpressRequest = Request & {
  reqId: string;
};

// https://sequelize.org/master/class/lib/data-types.js~GEOMETRY.html
export type IPointType = {
  type: "Point";
  coordinates: [number, number];
  crs: { type: "name"; properties: { name: "EPSG:4326" } };
};
