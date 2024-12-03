const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger configuration options
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Reward API with Swagger',
      version: '1.0.0',
      description: 'A simple CRUD API application made with Express and documented with Swagger',
    },
    servers: [
      {
        url: 'http://localhost:3000/api/v1',
      },
    ],
    components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        }
      },
      security: [{
        bearerAuth: []
      }]
  },
  apis: ['./src/routes/*.js'], // Files containing annotations for the Swagger docs
};

const swaggerSpec = swaggerJsdoc(options);

const setupSwaggerDocs = (app) => {
  app.use('/reward-api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwaggerDocs;
