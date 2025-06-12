import swaggerAutoGen from 'swagger-autogen';

const PORT = 6004;

const swaggerOptions = {
  info: {
    title: 'Marketly Products API',
    description: 'Marketly Products API',
    version: '1.0.0',
  },
  host: `localhost:${PORT}`,
  basePath: '/api/products',
};

const outputFile = '../../../docs/services/products-swagger.json';
const routes = ['./src/routes/index.ts'];

swaggerAutoGen(outputFile, routes, swaggerOptions);
