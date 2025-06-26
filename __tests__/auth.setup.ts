import { test as setup, expect } from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.
  await page.goto('http://127.0.0.1:3000/');
  await page.getByRole('button', { name: 'Log In', exact: true  }).click();
  await page.getByRole('textbox', { name: 'Enter your username or email' }).click();
  await page.getByRole('textbox', { name: 'Enter your username or email' }).fill('josue');
  await page.getByRole('textbox', { name: 'Enter password...' }).fill('Pidwin2025');
  await page.locator('form').getByRole('button', { name: 'Log In' }).click();
  // Wait until the page receives the cookies.
  //
  // Alternatively, you can wait until the page reaches a state where all cookies are set.
  await expect(page.getByRole('button', { name: 'Wallet' })).toBeVisible();
  // End of authentication steps.

  await page.context().storageState({ path: authFile });
});