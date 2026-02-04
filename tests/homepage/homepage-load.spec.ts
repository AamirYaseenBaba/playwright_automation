// spec: specs/mcc-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Homepage and Navigation', () => {
  test('Homepage loads with all main sections visible', async ({ page }) => {
    // 1. Navigate to https://mcc-test-cf.test-ama-assn.org/
    await page.goto('https://mcc-test-cf.test-ama-assn.org/');

    // 2. Verify page title displays 'Home | Managed Care Contracting'
    await expect(page).toHaveTitle('Home | Managed Care Contracting');

    // 3. Verify the main heading 'An American Medical Association Managed Care Resource' is visible
    const mainHeading = page.locator('h1');
    await expect(mainHeading).toContainText('An American Medical Association Managed Care Resource');
    await expect(mainHeading).toBeVisible();

    // 4. Verify descriptive text about the database is present
    const description = page.locator('text=The AMA Managed Care Legal Database is a resource identifying how state and federal statutes and regulations address many issues');
    await expect(description).toBeVisible();

    // 5. Verify the 'How to Use' link is clickable
    const howToUseLink = page.getByRole('link', { name: 'How to Use' });
    await expect(howToUseLink).toBeVisible();
    await expect(howToUseLink).toHaveAttribute('href', '/test-cases');
  });
});
