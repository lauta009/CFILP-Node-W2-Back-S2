// docs/swagger.js
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Biblioteca API - Squad 2',
      version: '1.0.0',
      description: 'Documentación de la API REST para gestión de biblioteca',
    },
  },
  apis: ['./src/routes/*.js'], // Comentarios con Swagger van ahí
};

const swaggerSpec = swaggerJSDoc(options);

const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;
