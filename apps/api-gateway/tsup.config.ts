import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/app.ts'],
  outDir: 'dist',
  target: 'node16',
  format: ['cjs'],
  dts: true,
  clean: true,
  sourcemap: true,
});
