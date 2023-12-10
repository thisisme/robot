import { test, expect } from '@playwright/test';
import { translateToEnglish } from "../src/lib";

test('lib', async ({ }) => {
  const translated = translateToEnglish("h")
  expect(translated).toBe("r")
});
