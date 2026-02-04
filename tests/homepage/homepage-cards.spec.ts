// spec: specs/mcc-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Homepage and Navigation', () => {
  test('Homepage displays three main content cards', async ({ page }) => {
    // 1. Navigate to the homepage
    await page.goto('https://mcc-test-cf.test-ama-assn.org/');

    // 2. Verify 'State Laws' card is visible with description
    const stateLawsHeading = page.locator('h2:has-text("State Laws")').first();
    await expect(stateLawsHeading).toBeVisible();

    const stateLawsDescription = page.locator('text=Search the Database to identify statutes and/or regulations in all 50 states');
    await expect(stateLawsDescription).toBeVisible();

    // Verify 'Explore' link for State Laws (find first Explore link in page, it's for State Laws)
    const stateLawsExplore = page.locator('main').locator('a:has-text("Explore")').first();
    await expect(stateLawsExplore).toBeVisible();
    await expect(stateLawsExplore).toHaveAttribute('href', '/state-laws-map');

    // 3. Verify 'Federal Laws' card is visible with description
    const federalLawsHeading = page.locator('h2:has-text("Federal Laws")').first();
    await expect(federalLawsHeading).toBeVisible();

    const federalLawsDescription = page.locator('text=Find relevant federal laws like the Employee Retirement Income Security Act');
    await expect(federalLawsDescription).toBeVisible();

    // Verify 'Explore' link for Federal Laws (find second Explore link in page)
    const allExploreLinks = page.locator('main').locator('a:has-text("Explore")');
    const federalLawsExplore = allExploreLinks.nth(1);
    await expect(federalLawsExplore).toBeVisible();
    await expect(federalLawsExplore).toHaveAttribute('href', '/federal-law');

    // 4. Verify 'AMA Policies' card is visible with description
    const amaPoliciesHeading = page.locator('h2:has-text("AMA Policies")').first();
    await expect(amaPoliciesHeading).toBeVisible();

    const amaPoliciesDescription = page.locator('text=Access American Medical Association Policies');
    await expect(amaPoliciesDescription).toBeVisible();

    // Verify 'Explore' link for AMA Policies (find third Explore link in page)
    const amaPoliciesExplore = allExploreLinks.nth(2);
    await expect(amaPoliciesExplore).toBeVisible();
    await expect(amaPoliciesExplore).toHaveAttribute('href', '/ama-policy');

    // 5. Click each 'Explore' link and verify navigation
    await stateLawsExplore.click();
    await expect(page).toHaveURL('/state-laws-map');
    
    await page.goto('https://mcc-test-cf.test-ama-assn.org/');
    const federalExploreClickAgain = page.locator('main').locator('a:has-text("Explore")').nth(1);
    await federalExploreClickAgain.click();
    await expect(page).toHaveURL('/federal-law');

    await page.goto('https://mcc-test-cf.test-ama-assn.org/');
    const amaExploreClickAgain = page.locator('main').locator('a:has-text("Explore")').nth(2);
    await amaExploreClickAgain.click();
    await expect(page).toHaveURL('/ama-policy');
  });
});
