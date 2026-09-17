import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/mobile',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: { baseURL: 'http://127.0.0.1:3000', trace: 'retain-on-failure', screenshot: 'only-on-failure' },
  projects: [
    { name: 'Android-Chromium', use: { ...devices['Pixel 7'], browserName: 'chromium' } },
    { name: 'iPhone-WebKit', use: { ...devices['iPhone 13'], browserName: 'webkit' } },
    { name: 'Narrow-320', use: { ...devices['iPhone SE'], browserName: 'webkit', viewport: { width: 320, height: 568 } } },
    { name: 'Landscape', use: { ...devices['Pixel 7 landscape'], browserName: 'chromium' } },
  ],
  webServer: { command: 'npm start -- --hostname 127.0.0.1', url: 'http://127.0.0.1:3000', reuseExistingServer: !process.env.CI, timeout: 60000 },
});
