// spec: specs/mcc-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Homepage and Navigation', () => {
  test('Main navigation menu is accessible and functional', async ({ page }) => {
    // 1. Navigate to the homepage
    await page.goto('https://mcc-test-cf.test-ama-assn.org/');

    // 2. Verify main navigation contains required links
    const stateLawsNav = page.getByLabel('Main navigation').getByRole('link', { name: 'State Laws' });
    const federalLawNav = page.getByLabel('Main navigation').getByRole('link', { name: 'Federal Law' });
    const amaPoliciesNav = page.getByLabel('Main navigation').getByRole('link', { name: 'AMA Policies' });
    const feedbackNav = page.getByLabel('Main navigation').getByRole('link', { name: 'Feedback' });

    await expect(stateLawsNav).toBeVisible();
    await expect(federalLawNav).toBeVisible();
    await expect(amaPoliciesNav).toBeVisible();
    await expect(feedbackNav).toBeVisible();

    // 3. Click 'State Laws' link and verify navigation to /state-laws-map
    await stateLawsNav.click();
    await expect(page).toHaveURL('/state-laws-map');
    await expect(page).toHaveTitle('State Laws Map | Managed Care Contracting');

    // 4. Click 'Federal Law' link and verify navigation to /federal-law
    await page.goto('https://mcc-test-cf.test-ama-assn.org/');
    const federalLawNavClick = page.getByLabel('Main navigation').getByRole('link', { name: 'Federal Law' });
    await federalLawNavClick.click();
    await expect(page).toHaveURL('/federal-law');
    await expect(page).toHaveTitle('Federal Laws | Managed Care Contracting');

    // 5. Click 'AMA Policies' link and verify navigation to /ama-policy
    await page.goto('https://mcc-test-cf.test-ama-assn.org/');
    const amaPoliciesNavClick = page.getByLabel('Main navigation').getByRole('link', { name: 'AMA Policies' });
    await amaPoliciesNavClick.click();
    await expect(page).toHaveURL('/ama-policy');
    await expect(page).toHaveTitle('AMA Policies | Managed Care Contracting');

    // 6. Click 'Feedback' link and verify navigation to /feedback
    await page.goto('https://mcc-test-cf.test-ama-assn.org/');
    const feedbackNavClick = page.getByLabel('Main navigation').getByRole('link', { name: 'Feedback' });
    await feedbackNavClick.click();
    await expect(page).toHaveURL('/feedback');
    await expect(page).toHaveTitle('Feedback | Managed Care Contracting');
  });
});
