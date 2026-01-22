import { expect, test } from '@playwright/test';

test('Scroll to bottom and take screenshot', async ({ context }) => {
    async function scrollToBottom(page) {
        let previousHeight = 0;
        while (true) {
            await page.waitForTimeout(500);
            const currentHeight = await page.evaluate(() => document.body.scrollHeight);
            if (currentHeight === previousHeight) break;
            previousHeight = currentHeight;
            await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
            await page.waitForTimeout(500);
        }
    }
    const page = await context.newPage();
    await page.goto('https://www.lovefoodhatewaste.com/')
    await context.addCookies([
        {
            name: 'CookieControl',
            value: '{"necessaryCookies":[],"optionalCookies":{"analytics":"accepted","marketing":"accepted"},"statement":{"shown":true,"updated":"17/01/2022"},"consentDate":1768561265669,"consentExpiry":90,"interactedWith":true,"user":"0566498E-50FD-42F4-8257-B754A0C03287"}',
            domain: '.lovefoodhatewaste.com',
            path: '/',

        },
    ]);
    await page.reload();
    // await scrollToBottom(page);
    await page.evaluate(async () => {
        for (let i = 0; i < 5; i++) {
            window.scrollBy(0, window.innerHeight);
            await new Promise(r => setTimeout(r, 1000));
        }
    });
    await page.screenshot({ path: 'scroll-screenshot.png', fullPage: true });
});  