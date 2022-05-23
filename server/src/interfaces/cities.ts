import { IPointType } from "./common";

export interface ICityFileRow {
  id: number;
  name: string;
  state: string;
  country: string;
  coord: {
    lon: number;
    lat: number;
  };
}

export interface ICityCreateRow {
  id: number;
  name: string;
  state: string;
  country: string;
  point: IPointType;
}

export interface ICitiesAttributes {
  id: number;
  name: string;
  state: string;
  country: string;
  point: IPointType;
  createdAt: Date;
  updatedAt: Date;
}
