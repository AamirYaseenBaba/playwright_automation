// fixtures/auth.ts
import { test as base, expect, type Browser } from '@playwright/test';
import fs from 'fs/promises';
import path from 'path';
import { LoginPage } from '../pages/login.page';

type WorkerFixtures = {
    authStatePath: string;
};

async function fileExists(p: string) {
    try {
        await fs.access(p);
        return true;
    } catch {
        return false;
    }
}

async function isStillLoggedIn(page: any) {
    await page.goto('/secure', { waitUntil: 'domcontentloaded' });
    return !page.url().includes('/login');
}

async function ensureAuthenticated(browser: Browser, authPath: string) {
    // If file exists, validate it
    if (await fileExists(authPath)) {
        console.log('Reusing existing auth state:', authPath);
        const reuseContext = await browser.newContext({ storageState: authPath});
        const reusePage = await reuseContext.newPage();
        const ok = await isStillLoggedIn(reusePage);
        await reuseContext.close();
        if (ok) return;

    }

    // Else login fresh and save state
    console.log('Creating new auth state:', authPath);
    const ctx = await browser.newContext();
    const page = await ctx.newPage();
    const lp = new LoginPage(page);

    await lp.goto();
    await lp.login('tomsmith', 'SuperSecretPassword!');

    await ctx.storageState({ path: authPath });
    await ctx.close();
}

// 👇 NOTE: worker fixtures go in the SECOND generic argument
export const test = base.extend<{}, WorkerFixtures>({
   authStatePath: [
  async ({ browser }, use, testInfo) => {
    const authPath = path.resolve(
      process.cwd(),
      'storageState',
      `auth.worker-${testInfo.workerIndex}.json`
    );

    await fs.mkdir(path.dirname(authPath), { recursive: true });

    await ensureAuthenticated(browser, authPath);
    await use(authPath);
  },
  { scope: 'worker' },
],
});

export { expect };