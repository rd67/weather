import { IPointType } from "./common";

export interface ICitiesAttributes {
  id: number;
  name: string;
  state: string;
  country: string;
  point: IPointType;
  createdAt: Date;
  updatedAt: Date;
}
