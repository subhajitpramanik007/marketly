import swaggerAutoGen from 'swagger-autogen';

const PORT = 8080;

const swaggerOptions = {
  info: {
    title: 'Marketly API Gateway',
    description: 'Marketly API Gateway',
    version: '1.0.0',
  },
  host: `localhost:${PORT}`,
  basePath: '/',
};

const outputFile = '../../../docs/services/api-gateway-swagger.json';
const routes = ['./src/routes.ts'];

swaggerAutoGen(outputFile, routes, swaggerOptions);
