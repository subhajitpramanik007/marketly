import swaggerAutoGen from 'swagger-autogen';

const PORT = 6002;

const swaggerOptions = {
  info: {
    title: 'Marketly Vendors API',
    description: 'Marketly Vendors API',
    version: '1.0.0',
  },
  host: `localhost:${PORT}`,
  basePath: '/api/vendors',
};

const outputFile = "../../docs/services/vendors-swagger.json";
const routes = ['./src/routes/index.ts'];

swaggerAutoGen(outputFile, routes, swaggerOptions);