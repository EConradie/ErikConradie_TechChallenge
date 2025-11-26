import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { Express } from "express";

export const setupSwagger = (app: Express) => {
  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Todo API",
        version: "1.0.0",
        description: "Tech Challenge Todo API",
      },
      servers: [
        {
          url: "http://localhost:5000/api/v1",
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
      security: [
      {
        bearerAuth: [],
      },
    ],
    },
    apis: ["./src/docs/*.ts", "./src/entities/*.ts"], // JSDoc location
  };

  const swaggerSpec = swaggerJsdoc(options);
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  console.log("Swagger docs available at http://localhost:5000/docs");
};
