import { test, expect } from '../fixtures/test-fixtures';

test.use({ baseURL: 'http://the-internet.herokuapp.com' });
test('user can login', async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.login('tomsmith', 'SuperSecretPassword!');
  await expect(loginPage.page).toHaveURL('/secure');
  await expect(loginPage.page.getByText('You logged into a secure area!')).toBeVisible();
});