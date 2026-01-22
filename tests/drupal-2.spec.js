import { test, expect } from '@playwright/test';
// import { test, expect } from '../playwright/fixtures';
test('test 2', {tag: '@backend'}, async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Content',exact:true}).first().click();
  await page.getByRole('link', { name: '+Add content' }).click();
  await page.getByRole('link', { name: 'AMA Policy' }).click();
  await expect(page.locator('h1')).toContainText('Create AMA Policy');
  const [response] = await Promise.all([
  page.waitForResponse('**/media-library**'),
  page.getByRole('button', { name: 'Insert Media' }).click(),
]);
console.log(await response.json());
expect(response.ok()).toBe(true);

});