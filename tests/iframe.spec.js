 import { test, expect } from '@playwright/test';
test.use({ baseURL: 'http://the-internet.herokuapp.com' });

test('Iframe handling', async ({ page }) => {
  await page.goto('/iframe');

  const frame = page.frameLocator('#mce_0_ifr');
  await frame.locator('#tinymce').fill('Hello, this is a test message inside the iframe!');
  const content = await frame.locator('#tinymce').innerText();
  expect(content).toBe('Hello, this is a test message inside the iframe!');
});