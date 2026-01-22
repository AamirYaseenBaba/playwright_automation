import { expect, test } from '@playwright/test';
test.use({ baseURL: 'http://the-internet.herokuapp.com' });
test('Drag and Drop functionality', async ({ page }) => {
await page.goto('/drag_and_drop');
await page.locator('#column-a').dragTo(page.locator('#column-b'));
await expect(page.locator('#column-a')).toContainText('B');
});