export default {
  CitiesResponse: {
    type: "object",
    cities: {
      data: {
        type: "object",
        properties: {
          result: {
            type: "integer",
            min: 0,
            max: 1,
          },
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
  CityWatherResponse: {
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
};
