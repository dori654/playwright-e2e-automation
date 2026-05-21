/**
 * E2E Test Suite - Contact Form Submission
 * Tests the full user journey of submitting the callback request form.
 */
import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { validUser } from '../test-data/users';
import { employeeRanges } from '../test-data/users';

test.describe('Contact form submission', () => {
  test('User can submit a callback request and reach the Thank You page', async ({ page }) => {
    const homePage = new HomePage(page);

    // Arrange: navigate to the homepage
    await homePage.goto();

    // Act: fill the form with valid data and select employee range
    await homePage.fillContactForm(validUser);
    await homePage.selectEmployeeRange(employeeRanges.large);

    // Capture form state before submission as required by spec
    await homePage.takeScreenshot('before-submit');

    // Submit and verify confirmation
    await homePage.submitCallbackRequest();
    await homePage.expectThankYouPage();
  });
});