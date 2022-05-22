export interface ICityDetailsRes {
  id: number;
  name: string;
  lat: number;
  lng: number;
}

export interface ICities {
  lat: number;
  lng: number;
  dist: number;
}

export interface ICityDetails {
  cityId: number;
}

export interface ICityWeather {
  cityId: number;
}
