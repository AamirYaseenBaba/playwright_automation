import { test, expect } from '@playwright/test';
test.use({baseURL: 'https://the-internet.herokuapp.com'})
test('Check broken and non broken images in the page', async ({ page, request }) => {
  await page.goto('/broken_images');

  const images = await page.locator('.example > img').all();

  for (const img of images) {
    const imgSrc = await img.getAttribute('src');

    if (!imgSrc) continue;

    if (imgSrc.includes('asdf') || imgSrc.includes('hjkl')) {
      console.log(`Logic to validate broken image whose 'src' is: /${imgSrc}`);

      const naturalSize = await img.evaluate((el) => ({
        width: el.naturalWidth,
        height: el.naturalHeight,
      }));

      expect(naturalSize.width).toBe(0);
      expect(naturalSize.height).toBe(0);

      const response = await request.fetch(imgSrc);
      expect(response.status()).toBe(404);
    } else {
      console.log(`Logic to validate non broken image whose 'src' is: /${imgSrc}`);

      const naturalSize = await img.evaluate((el) => ({
        width: el.naturalWidth,
        height: el.naturalHeight,
      }));

      expect(naturalSize.width).toBeGreaterThan(0);
      expect(naturalSize.height).toBeGreaterThan(0);

      const response = await request.fetch(imgSrc);
      expect(response.status()).toBe(200);
    }
  }
});