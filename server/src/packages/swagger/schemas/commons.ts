export default {
  ValidationErrorResponse: {
    type: "object",
    properties: {
      code: {
        type: "string",
        default: "BadRequestError",
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
  NotFoundErrorResponse: {
    type: "object",
    properties: {
      code: {
        type: "string",
        default: "NotFoundError",
      },
      message: {
        type: "string",
        default: "Validation Failed, Kindly check your parameters",
      },
    },
  },
};
