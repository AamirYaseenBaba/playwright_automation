import { test, expect } from '../fixtures/test';
test.use({ baseURL: 'http://the-internet.herokuapp.com' });
test('secure page loads', async ({ authenticatedPage }) => {
    await authenticatedPage.goto('/secure');
    await expect(authenticatedPage).toHaveURL(/secure/);
});
test('authenticated user can access protected content', async ({ authenticatedPage }) => {
    await authenticatedPage.goto('/secure');
    await expect(authenticatedPage.getByText('Welcome to the Secure Area. When you are done click logout below.')).toBeVisible();
    await expect(authenticatedPage.getByRole('link', { name: 'Logout' })).toBeVisible();
});