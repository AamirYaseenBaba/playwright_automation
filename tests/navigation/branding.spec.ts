// spec: specs/mcc-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Homepage and Navigation', () => {
  test('Home logo and branding elements are present', async ({ page }) => {
    // 1. Navigate to homepage
    await page.goto('https://mcc-test-cf.test-ama-assn.org/');

    // 2. Verify the Home logo is visible in the header
    const homeLogoHomepage = page.locator('a[href="/"] img[alt="Home"]').first();
    await expect(homeLogoHomepage).toBeVisible();

    // 3. Click the Home logo and verify it navigates to the homepage
    await homeLogoHomepage.click();
    await expect(page).toHaveURL('https://mcc-test-cf.test-ama-assn.org/');
    await expect(page).toHaveTitle('Home | Managed Care Contracting');

    // Navigate to State Laws page to verify logo works from other pages
    await page.goto('https://mcc-test-cf.test-ama-assn.org/state-laws-map');
    const homeLogoStateLaws = page.locator('a[href="/"] img[alt="Home"]').first();
    await expect(homeLogoStateLaws).toBeVisible();
    await homeLogoStateLaws.click();
    await expect(page).toHaveURL('https://mcc-test-cf.test-ama-assn.org/');
    await expect(page).toHaveTitle('Home | Managed Care Contracting');

    // Navigate to Federal Law page to verify logo works from multiple pages
    await page.goto('https://mcc-test-cf.test-ama-assn.org/federal-law');
    const homeLogoFederalLaw = page.locator('a[href="/"] img[alt="Home"]').first();
    await expect(homeLogoFederalLaw).toBeVisible();
    await homeLogoFederalLaw.click();
    await expect(page).toHaveURL('https://mcc-test-cf.test-ama-assn.org/');

    // 4. Verify the AMA logo is visible in the footer
    const amaLogoFooter = page.locator('footer a[href="https://www.ama-assn.org"] img[alt="AMA logo"]');
    await expect(amaLogoFooter).toBeVisible();

    // 5. Verify the footer copyright text is present
    const copyrightText = page.locator('text=Copyright 1995-2026 American Medical Association. All rights reserved.');
    await expect(copyrightText).toBeVisible();
  });
});
