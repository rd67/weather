export interface ICityDetailsRes {
  id: number;
  name: string;
  lat: number;
  lng: number;
}

export interface ICitiesParams {
  lat: number;
  lng: number;
  dist: number;
}

export interface ICityDetailsParams {
  cityId: number;
}

export interface ICityWeatherParams {
  cityId: number;
}
