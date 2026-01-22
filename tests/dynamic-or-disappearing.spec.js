import { expect, test } from '@playwright/test';
test.use({ baseURL: 'http://the-internet.herokuapp.com' });
test('Dynamic or disappearing elements', async ({ page }) => {
    await page.goto('/disappearing_elements');
    const galleryElement = page.getByRole('link', { name: 'Gallery' });
    const portfolioElement = page.getByRole('link', { name: 'Portfolio' });
    const homeElement = page.getByRole('link', { name: 'Home' });

    if (await galleryElement.isVisible()) {
        await galleryElement.click();
        await expect(page).toHaveURL('/gallery/');
        await expect(page.getByText('Not Found')).toBeVisible();

    } else if (await portfolioElement.isVisible()) {
        await portfolioElement.click();
        await expect(page).toHaveURL('/portfolio/');
        await expect(page.getByText('Not Found')).toBeVisible();
    } else {
        await homeElement.click();
        await expect(page).toHaveURL('/home/');
        await expect(page.getByText('Not Found')).toBeVisible();
    }
});              