const path = require("path");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
path;
module.exports = class Swagger {
  constructor() {}
  swaggerSpec = swaggerJSDoc({
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Your API Documentation",
        version: "1.0.0",
        description: "API documentation for your Express.js application",
      },
    },
    apis: [path.join(__dirname, "..", "..", "modules/**/*.routes.js")], // Specify the path to your route files
  });

  swaggerServe = swaggerUI.serve;
  swaggerUiSetup = swaggerUI.setup(this.swaggerSpec);
};
