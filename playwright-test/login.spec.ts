import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 90000, // 90 seconds per test (to account for manual CAPTCHA)
  expect: {
    timeout: 10000 // 10 seconds for assertions
  },
  fullyParallel: false, // Run tests sequentially for manual interaction
  retries: 0, // No retries for manual tests
  workers: 1, // Single worker for manual interaction
  reporter: 'html',
  
  use: {
    baseURL: 'http://127.0.0.1:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    
    // Slower actions for better visibility during manual steps
    actionTimeout: 30000,
    navigationTimeout: 30000,
  },

  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        // Launch in headed mode by default for manual CAPTCHA
        headless: false,
        // Slow down actions for manual observation
        // To use slowMo, add it to launchOptions in your test setup if needed
      },
    },
  ],

  // Run local dev server if needed
  // webServer: {
  //   command: 'npm run dev',
  //   port: 3000,
  //   reuseExistingServer: true,
  // },
});