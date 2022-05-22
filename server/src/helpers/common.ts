import { IPointType } from "@interfaces/common";
import { v4 as uuidv4 } from "uuid";

export const uuidGenerate = () => {
  return uuidv4();
};

export const pick = (object: Object, keys: string[]): object => {
  return keys.reduce((obj, key) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      //@ts-ignore
      obj[key] = object[key];
    }
    return obj;
  }, {});
};

export const capitalizeFirstLetter = (value: string): string => {
  return value[0].toUpperCase() + value.slice(1);
};

export const convertToPoint = (
  latitude: number,
  longitude: number
): IPointType => {
  return {
    type: "Point",
    coordinates: [longitude, latitude], // GeoJson format: [lng, lat]
    crs: { type: "name", properties: { name: "EPSG:4326" } },
  };
};

export const formatString = (str: string) => {
  //  Removing trailing, leading `
  if (str.startsWith("`")) {
    str = str.slice(1);
  }
  if (str.endsWith("`")) {
    str = str.slice(0, -1);
  }

  //  Removing trailing, leading "
  if (str.startsWith('"')) {
    str = str.slice(1);
  }
  if (str.endsWith('"')) {
    str = str.slice(0, -1);
  }

  //  Removing trailing, leading "
  if (str.startsWith("'")) {
    str = str.slice(1);
  }
  if (str.endsWith("'")) {
    str = str.slice(0, -1);
  }

  return str.trim();
};
