import { test, expect } from '@playwright/test';
// import { test, expect } from '../playwright/fixtures';

test('test one ', {tag: '@backend'}, async ({ page }) => {
  await page.goto('/');
  await page.getByLabel('Toolbar items').getByRole('link', { name: 'Content' }).hover();
  await page.getByLabel('Toolbar items').getByRole('link', { name: 'Add content', exact: true }).hover();
  await page.getByLabel('Toolbar items').getByRole('link', { name: 'AMA Policy', exact: true }).click();
  await expect(page.getByRole('textbox', { name: 'Rich Text Editor. Editing' })).toBeVisible();
  await page.getByRole('textbox', { name: 'Rich Text Editor. Editing' }).click();
  await page.getByRole('textbox', { name: 'Rich Text Editor. Editing' }).fill('This is just for testing purpose');
  await page.getByRole('textbox', { name: 'Date *' }).fill('2026-01-05');
  await page.locator('#edit_field_payment_issues_chosen').click();
  await page.getByRole('option', { name: 'Payment Edits' }).click();
  await expect(page.getByRole('paragraph')).toContainText('This is just for testing purpose');
  await page.locator('#edit_field_network_issues_chosen').click();
  await page.getByRole('option', { name: 'Credentialing-Due Process-' }).click();
  await page.locator('#edit_field_contract_changes_disputes_chosen').click();
  await page.getByRole('option', { name: 'Anti-gag clause', exact: true }).click();
});
