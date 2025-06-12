const fs = require('fs');
const path = require('path');
const swaggerMerge = require('swagger-merge');

const servicesDir = path.resolve(__dirname, '../../../docs/services');
const outputPath = path.resolve(__dirname, '../../../docs/base-swagger.json');
const outputDir = path.dirname(outputPath);

const swaggerFiles = fs
  .readdirSync(servicesDir)
  .filter(file => file.endsWith('.json'))
  .map(file => require(path.join(servicesDir, file)));

const info = {
  title: 'Marketly API Gateway',
  description: 'Marketly API Gateway',
  version: '1.0.0',
};
const schemes = ['http'];

swaggerMerge.on('warn', function (msg) {
  console.warn(msg);
});

// Merge Swagger
const mergedSwagger = swaggerMerge.merge(
  [...swaggerFiles],
  info,
  '/',
  'localhost:8080',
  schemes,
);

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Write the merged Swagger file
fs.writeFileSync(outputPath, JSON.stringify(mergedSwagger, null, 2));

console.log('Swagger docs merged successfully');
