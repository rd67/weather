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
