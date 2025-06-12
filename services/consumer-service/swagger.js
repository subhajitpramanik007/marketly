import swaggerAutoGen from 'swagger-autogen';

const swaggerOptions = {
  info: {
    title: 'Marketly Consumers API',
    description: 'Marketly Consumers API',
    version: '1.0.0',
  },
  host: 'localhost:6001',
  basePath: '/api/consumers',
};

const outputFile = '../../docs/services/consumers-swagger.json';
const routes = ['./src/routes/index.ts'];

swaggerAutoGen(outputFile, routes, swaggerOptions);