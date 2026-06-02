import { test, expect } from '../fixtures/test';

test.use({ baseURL: 'https://www.dev.nextjs.paularosakitchens.co.uk/' });
test('user can login', async ({ page }) => {
  await page.goto('/sign-in');
  await page.getByRole('textbox', { name: 'Email' }).fill('aamir.yaseen@axelerant.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('Aanir@1234');
  await page.getByRole('button', { name: 'Sign in' }).click();
});

test('forgot password', async ({ page }) => {
  await page.goto('/forgot-password');
  await page.getByRole('textbox', { name: 'Email' }).fill('aamir.yaseen@axelerant.com');
  await page.getByRole('button', { name: 'Send password reset link' }).click();
});