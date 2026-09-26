import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './browser', timeout: 150000, workers: 1,
  outputDir: '../.gggame-test-results',
  use: { baseURL: process.env.GGGAME_WEB_URL || 'http://127.0.0.1:4321', headless: true, trace: 'retain-on-failure',
    launchOptions: { args: ['--no-sandbox'] } },
});
