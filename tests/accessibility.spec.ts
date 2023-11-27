import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
const site = 'http://localhost:3000';

test.describe('homepage', () => {
  test('should not have any automatically detectable accessibility issues', async ({ page }) => {
    await page.goto(site);

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze(); // 4

    expect(accessibilityScanResults.violations).toEqual([]); // 5
  });
});