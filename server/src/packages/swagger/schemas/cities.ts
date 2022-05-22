export default {
  CitiesResponse: {
    type: "array",
    items: {
      type: "object",
      properties: {
        id: {
          type: "integer",
        },
        name: {
          type: "string",
        },
      },
    },
  },
  CityDetailsResponse: {
    type: "object",
    cities: {
      data: {
        type: "object",
        properties: {
          id: {
            type: "integer",
          },
          name: {
            type: "string",
          },
          lat: {
            type: "integer",
          },
          lng: {
            type: "integer",
          },
        },
      },
    },
  },
  CityWeatherResponse: {
    type: "object",
    cities: {
      data: {
        type: "object",
        properties: {
          type: {
            type: "string",
          },
          type_description: {
            type: "string",
          },
          sunrise: {
            type: "string",
          },
          sunset: {
            type: "string",
          },
          temp: {
            type: "integer",
          },
          temp_min: {
            type: "integer",
          },
          temp_max: {
            type: "integer",
          },
          pressure: {
            type: "integer",
          },
          humidity: {
            type: "integer",
          },
          clouds_percent: {
            type: "integer",
          },
          wind_speed: {
            type: "integer",
          },
        },
      },
    },
  },
};
