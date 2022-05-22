export default {
  "/iou": {
    post: {
      tags: ["Calculate IOU"],
      summary: "Calculate IOU between two boxes [x, y, width, height]",
      produces: ["application/json"],
      security: [
        // {
        //   auth_token: [],
        // },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                groundTruth: {
                  type: "array",
                  items: {
                    type: "integer",
                  },
                  minItems: 4,
                  maxItems: 4,
                  default: [3, 4, 10, 10],
                },
                predicted: {
                  type: "array",
                  items: {
                    type: "integer",
                  },
                  minItems: 4,
                  maxItems: 4,
                  default: [3, 4, 10, 10],
                },
              },
              required: ["groundTruth", "predicted"],
            },
          },
        },
      },
      responses: {
        200: {
          description: "Success.",
        },
        400: {
          description: "Validation Failed.",
        },
      },
    },
  },
};
