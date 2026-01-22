import { expect, test } from '@playwright/test';
test.use({baseURL: 'https://the-internet.herokuapp.com'})
test('alert dialog handling', async ({ page }) => {
  await page.goto('/javascript_alerts');

  // Handling alert dialog
  page.on('dialog', async (dialog) => {
    expect(dialog.type()).toBe('alert');
    expect(dialog.message()).toBe('I am a JS Alert');
    await dialog.accept();
  });
  await page.getByRole('button', { name: 'Click for JS Alert' }).click();
  await expect(page.locator('#result')).toHaveText('You successfully clicked an alert');
});
test('confirm dialog handling', async ({ page }) => {
    await page.goto('/javascript_alerts');
  // Handling confirm dialog
  page.on('dialog', async (dialog) => {
    expect(dialog.type()).toBe('confirm');
    expect(dialog.message()).toBe('I am a JS Confirm');
    await dialog.dismiss();
  });
  await page.getByRole('button', { name: 'Click for JS Confirm' }).click();
  await expect(page.locator('#result')).toHaveText('You clicked: Cancel');
  });
test('prompt dialog handling', async ({ page }) => {
  await page.goto('/javascript_alerts');

  // Handling prompt dialog
  page.on('dialog', async (dialog) => {
    expect(dialog.type()).toBe('prompt');
    expect(dialog.message()).toBe('I am a JS prompt');
    await dialog.accept('Playwright Test');
  });
  await page.getByRole('button', { name: 'Click for JS Prompt' }).click();
  await expect(page.locator('#result')).toHaveText('You entered: Playwright Test');
});
