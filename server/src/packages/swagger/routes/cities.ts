export default {
  "/cities": {
    get: {
      tags: ["Cities"],
      summary:
        "List the available cities around the specified latitude/longitude within a radius of few kilometers",
      produces: ["application/json"],
      security: [
        // {
        //   auth_token: [],
        // },
      ],
      parameters: [
        {
          name: "lat",
          in: "query",
          description: "Latitude",
          required: true,
          type: "integer",
          min: -80,
          max: 80,
          default: 35.56,
        },
        {
          name: "lng",
          in: "query",
          description: "Longitude",
          required: true,
          type: "integer",
          min: -180,
          max: 180,
          default: 26.56,
        },
        {
          name: "dist",
          in: "query",
          description: "Distance in KMs",
          required: false,
          type: "integer",
          min: 1,
          default: 100,
        },
      ],
      responses: {
        200: {
          description: "Success.",
          // schema: {
          //   $ref: "#/components/schemas/CitiesResponse",
          // },
        },
        400: {
          description: "Validation Error.",
          // schema: {
          //   $ref: "#/components/schemas/ValidationErrorResponse",
          // },
        },
        404: {
          description: "Not Found",
          // schema: {
          //   $ref: "#/components/schemas/NotFoundErrorResponse",
          // },
        },
      },
    },
  },
  "/cities/{cityId}": {
    get: {
      tags: ["Cities"],
      summary: "Retrieve the details for a city (by city_id)",
      produces: ["application/json"],
      security: [],
      parameters: [
        {
          name: "cityId",
          in: "path",
          description: "City Id",
          required: true,
          type: "integer",
          min: 1,
        },
      ],
      responses: {
        200: {
          description: "Success.",
          // schema: {
          //   $ref: "#/components/schemas/CityDetailsResponse",
          // },
        },
        404: {
          description: "Not Found",
          // schema: {
          //   $ref: "#/components/schemas/NotFoundErrorResponse",
          // },
        },
      },
    },
  },
  "/cities/{cityId}/weather": {
    get: {
      tags: ["Cities"],
      summary: "Retrieve the weather data for a city (by city_id)",
      produces: ["application/json"],
      security: [],
      parameters: [
        {
          name: "cityId",
          in: "path",
          description: "City Id",
          required: true,
          type: "integer",
          min: 1,
        },
      ],
      responses: {
        200: {
          description: "Success.",
          // type: "object",
          // schema: {
          //   $ref: "#/components/schemas/CityWeatherResponse",
          // },
        },
        404: {
          description: "Not Found",
          // schema: {
          //   $ref: "#/components/schemas/NotFoundErrorResponse",
          // },
        },
      },
    },
  },
};
