// spec: specs/mcc-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Homepage and Navigation', () => {
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
    
    // Verify Payment Issues tab is selected
    await expect(paymentIssuesTab).toHaveAttribute('aria-selected', 'true');
    
    // Verify table content with issue category links
    const feeSchedulesLink = page.getByRole('link', { name: 'Fee Schedules' }).first();
    const liabilityLink = page.getByRole('link', { name: /Liability-insurer shifting to physician/ }).first();
    const overpaymentLink = page.getByRole('link', { name: 'Overpayments / Recoupments' }).first();

    await expect(feeSchedulesLink).toBeVisible();
    await expect(liabilityLink).toBeVisible();
    await expect(overpaymentLink).toBeVisible();

    // Verify links are functional
    await expect(feeSchedulesLink).toHaveAttribute('href', /payment_issues/);
    await expect(liabilityLink).toHaveAttribute('href', /payment_issues/);
    await expect(overpaymentLink).toHaveAttribute('href', /payment_issues/);
  });
});
