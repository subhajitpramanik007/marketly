import swaggerAutoGen from 'swagger-autogen';

const PORT = 6003;

const swaggerOptions = {
  info: {
    title: 'Marketly Admin API',
    description: 'Marketly Admin API',
    version: '1.0.0',
    tags: [
      {
        name: 'Admin - Healthcheck',
        description: 'Admin service healthcheck',
      },
    ],
  },
  host: `localhost:${PORT}`,
  basePath: '/api/admin',
};

const outputFile = '../../../docs/services/admin-swagger.json';
const routes = ['./src/routes/index.ts'];

swaggerAutoGen(outputFile, routes, swaggerOptions);
