import { test, expect } from '@playwright/test';
const site = 'http://localhost:3000';

test('has title', async ({ page }) => {
  await page.goto(site);

  await expect(page).toHaveTitle(/Robot Programming/);
});
