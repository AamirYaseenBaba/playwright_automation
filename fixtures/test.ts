// fixtures/test.ts
import { test as authBase, expect } from './auth';
import { LoginPage } from '../pages/login.page';

export const test = authBase.extend<{
  authenticatedPage: import('@playwright/test').Page;
  loginPage: LoginPage;
}>({
  authenticatedPage: async ({ browser, authStatePath }, use) => {
    const context = await browser.newContext({ storageState: authStatePath });
    const page = await context.newPage();
    await use(page);
    await context.close();
  },

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
});

export { expect };