export interface ICitiesParams {
  lat: number;
  lng: number;
  dist: number;
}

export interface ICityDetailsRes {
  id: number;
  name: string;
  lat: number;
  lng: number;
}

export interface ICityDetailsParams {
  cityId: number;
}

export interface ICityWeatherDetailsRes {
  type: string;

  type_description: string;
  sunrise: string;
  sunset: string;
  temp: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  clouds_percent: number;
  wind_speed: number;
}

export interface ICityWeatherParams {
  cityId: number;
}

export interface IOpenWeatherApiResponse {
  coord: {
    lon: number;
    lat: number;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}
