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

  test('Homepage displays three main content cards', async ({ page }) => {
    // 1. Navigate to the homepage
    await page.goto('https://mcc-test-cf.test-ama-assn.org/');

    // 2. Verify 'State Laws' card is visible with description and 'Explore' link
    const stateLawsHeading = page.locator('h2:has-text("State Laws")').first();
    await expect(stateLawsHeading).toBeVisible();
    
    const stateLawsDescription = page.locator('text=Search the Database to identify statutes and/or regulations in all 50 states');
    await expect(stateLawsDescription).toBeVisible();

    const stateLawsExplore = page.locator('main').locator('a:has-text("Explore")').first();
    await expect(stateLawsExplore).toBeVisible();
    await expect(stateLawsExplore).toHaveAttribute('href', '/state-laws-map');

    // 3. Verify 'Federal Laws' card is visible with description and 'Explore' link
    const federalLawsHeading = page.locator('h2:has-text("Federal Laws")').first();
    await expect(federalLawsHeading).toBeVisible();

    const federalLawsDescription = page.locator('text=Find relevant federal laws like the Employee Retirement Income Security Act');
    await expect(federalLawsDescription).toBeVisible();

    const allExploreLinks = page.locator('main').locator('a:has-text("Explore")');
    const federalLawsExplore = allExploreLinks.nth(1);
    await expect(federalLawsExplore).toBeVisible();
    await expect(federalLawsExplore).toHaveAttribute('href', '/federal-law');

    // 4. Verify 'AMA Policies' card is visible with description and 'Explore' link
    const amaPoliciesHeading = page.locator('h2:has-text("AMA Policies")').first();
    await expect(amaPoliciesHeading).toBeVisible();

    const amaPoliciesDescription = page.locator('text=Access American Medical Association Policies');
    await expect(amaPoliciesDescription).toBeVisible();

    const amaPoliciesExplore = allExploreLinks.nth(2);
    await expect(amaPoliciesExplore).toBeVisible();
    await expect(amaPoliciesExplore).toHaveAttribute('href', '/ama-policy');
  });

  test('Homepage displays Payment Issues table with tabs', async ({ page }) => {
    // 1. Navigate to the homepage
    await page.goto('https://mcc-test-cf.test-ama-assn.org/');

    // 2. Verify all five tabs are visible
    const paymentIssuesTab = page.getByRole('tab', { name: 'Payment Issues' });
    const networkIssuesTab = page.getByRole('tab', { name: 'Network Issues' });
    const contractChangesTab = page.getByRole('tab', { name: 'Contract Changes / Disputes' });
    const coverageUtilizationTab = page.getByRole('tab', { name: 'Coverage / Utilization Review' });
    const claimsProcessingTab = page.getByRole('tab', { name: 'Claims Processing' });

    await expect(paymentIssuesTab).toBeVisible();
    await expect(networkIssuesTab).toBeVisible();
    await expect(contractChangesTab).toBeVisible();
    await expect(coverageUtilizationTab).toBeVisible();
    await expect(claimsProcessingTab).toBeVisible();

    // 3. Verify the Payment Issues tab is selected by default
    await expect(paymentIssuesTab).toHaveAttribute('aria-selected', 'true');

    // 4. Click on each tab and verify content changes
    // Click Network Issues tab
    await networkIssuesTab.click();
    await expect(networkIssuesTab).toHaveAttribute('aria-selected', 'true');
    await expect(paymentIssuesTab).toHaveAttribute('aria-selected', 'false');

    // Click Contract Changes tab
    await contractChangesTab.click();
    await expect(contractChangesTab).toHaveAttribute('aria-selected', 'true');

    // Click Coverage/Utilization Review tab
    await coverageUtilizationTab.click();
    await expect(coverageUtilizationTab).toHaveAttribute('aria-selected', 'true');

    // Click Claims Processing tab
    await claimsProcessingTab.click();
    await expect(claimsProcessingTab).toHaveAttribute('aria-selected', 'true');

    // 5. Verify table content is displayed (go back to Payment Issues to verify links)
    await paymentIssuesTab.click();
    const tableLinks = page.getByRole('link', { name: 'Fee Schedules' }).first();
    await expect(tableLinks).toBeVisible();
  });

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

  test('Home logo and branding elements are present', async ({ page }) => {
    // 1. Navigate to homepage
    await page.goto('https://mcc-test-cf.test-ama-assn.org/');

    // 2. Verify the Home logo is visible in the header
    const homeLogoHomepage = page.locator('a[href="/"] img[alt="Home"]').first();
    await expect(homeLogoHomepage).toBeVisible();

    // 3. Click the Home logo and verify it navigates to the homepage
    await homeLogoHomepage.click();
    await expect(page).toHaveURL('https://mcc-test-cf.test-ama-assn.org/');

    // 4. Navigate to a different page to verify logo works from other pages
    await page.goto('https://mcc-test-cf.test-ama-assn.org/state-laws-map');
    const homeLogoStateLaws = page.locator('a[href="/"] img[alt="Home"]').first();
    await expect(homeLogoStateLaws).toBeVisible();
    await homeLogoStateLaws.click();
    await expect(page).toHaveURL('https://mcc-test-cf.test-ama-assn.org/');

    // 5. Verify the AMA logo is visible in the footer
    const amaLogoFooter = page.locator('footer a[href="https://www.ama-assn.org"] img');
    await expect(amaLogoFooter).toBeVisible();

    // 6. Verify the footer copyright text is present
    const copyrightText = page.locator('text=Copyright 1995-2026 American Medical Association. All rights reserved.');
    await expect(copyrightText).toBeVisible();
  });
});
