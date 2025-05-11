import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  input: '/Users/yegor/GolandProjects/modern-full-stack/api/openapi.yaml',
  output: 'src/client',
  plugins: ['@hey-api/client-fetch'],
});