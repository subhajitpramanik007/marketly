import swaggerAutoGen from 'swagger-autogen';

const PORT = 6000;

const swaggerOptions = {
  info: {
    title: 'Marketly Auth API',
    description: 'Marketly Auth API',
    version: '1.0.0',
  },
  host: `localhost:${PORT}`,
  basePath: '/api/auth',
};

const outputFile = "../../docs/services/auth-swagger.json";
const routes = ['./src/routes/index.ts'];

swaggerAutoGen(outputFile, routes, swaggerOptions);