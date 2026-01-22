import { expect, test } from '@playwright/test';

test('Test A/B by setting cookie', async ({ context }) => {
    const page = await context.newPage();
    await page.goto('https://the-internet.herokuapp.com/abtest')
     await expect(page.locator('h3')).toContainText('A/B Test');
    await context.addCookies([
        {
            name: 'optimizelyOptOut',
            value: 'true',
            domain: 'the-internet.herokuapp.com',
            path: '/',

        },
    ]);
    await page.reload();
    await expect(page.locator('h3')).toContainText('No A/B Test');
});

test('Test A/B by optout url', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/abtest?optimizely_opt_out=true')
    // await page.on('dialog', dialog => dialog.dismiss()); this is automatically handled by playwright
    await expect(page.locator('h3')).toContainText('No A/B Test');
});