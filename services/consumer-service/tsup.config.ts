import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/server.ts'],
  outDir: 'dist',
  target: 'node16',
  format: ['cjs'],
  dts: false, // Enable declaration file generation
  clean: true,
  sourcemap: true,
});
