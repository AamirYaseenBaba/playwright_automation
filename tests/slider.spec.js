import { test, expect } from '@playwright/test';
test.use({baseURL: 'https://the-internet.herokuapp.com'})
test('Slider test - drag and drop by offset', async ({ page }) => {
  await page.goto('/horizontal_slider');

  const slider = page.locator('input[type="range"]');

  // Drag and drop by offset to set the slider to 4.0
  const box = await slider.boundingBox();
  if (box) {
    const startX = box.x + box.width / 2;
    const startY = box.y + box.height / 2;
    const targetX = startX + (box.width * (4.0 - 2.5)) / (5.0 - 0); // Assuming min=0, max=5

    await page.mouse.move(startX, startY);
    await page.mouse.down();
    await page.mouse.move(targetX, startY, { steps: 10 });
    await page.mouse.up();
  }

  const sliderValue = await page.locator('#range').textContent();
  expect(sliderValue).toBe('4');
}); 