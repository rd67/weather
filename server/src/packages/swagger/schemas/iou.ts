export default {
  success: {
    type: "object",
    properties: {
      statusCode: {
        type: "integer",
        default: 200,
      },
      message: {
        type: "string",
        default: "Success.",
      },
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
  validation: {
    type: "object",
    properties: {
      statusCode: {
        type: "integer",
        default: 400,
      },
      message: {
        type: "string",
        default: "Validation Failed, Kindly check your parameters",
      },
      data: {
        type: "object",
        properties: {},
      },
    },
  },
};
