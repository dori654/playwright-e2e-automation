import { expect } from '@playwright/test';

/**
 * Page Object for the Netlify test homepage.
 * Encapsulates the contact/callback request form and post-submission flow.
 */
export class HomePage {
  /**
   * @param {import('@playwright/test').Page} page - Playwright page instance
   */
  constructor(page) {
    this.page = page;
    this.url = 'https://test.netlify.app/';

    // Form field locators - case-insensitive for resilience against label styling changes
    this.nameInput = page.getByLabel(/name/i);
    this.emailInput = page.getByLabel(/email/i);
    this.phoneInput = page.getByLabel(/phone/i);
    this.companyInput = page.getByLabel(/company/i);
    this.websiteInput = page.getByLabel(/website/i);
    this.employeesDropdown = page.getByRole('combobox', { name: /number of employees/i });

    // Action locators
    this.submitButton = page.getByRole('button', { name: /request a call back/i });

    // Thank you page indicators
    this.thankYouHeading = page.getByRole('heading', { name: /thank you!/i });
  }

  /**
   * Navigate to the homepage.
   */
  async goto() {
    await this.page.goto(this.url);
  }

  /**
   * Fill all contact form fields with the provided user data.
   * @param {Object} userData
   * @param {string} userData.name
   * @param {string} userData.email
   * @param {string} userData.phone
   * @param {string} userData.company
   * @param {string} userData.website
   */
  async fillContactForm({ name, email, phone, company, website }) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.phoneInput.fill(phone);
    await this.companyInput.fill(company);
    await this.websiteInput.fill(website);
  }

  /**
   * Select an employee range from the dropdown.
   * @param {string} range - e.g., '1-10', '11-50', '51-500'
   */
  async selectEmployeeRange(range) {
    await this.employeesDropdown.selectOption(range);
  }

  /**
   * Capture a full-page screenshot with a descriptive name and timestamp.
   * @param {string} name - Screenshot identifier
   */
  async takeScreenshot(name) {
    await this.page.screenshot({
      path: `screenshots/${name}-${Date.now()}.png`,
      fullPage: true
    });
  }

  /**
   * Submit the callback request form.
   */
  async submitCallbackRequest() {
    await this.submitButton.click();
  }

  /**
   * Assert that we successfully reached the thank you confirmation page.
   * Also logs to console as required by the exercise spec.
   */
  async expectThankYouPage() {
    await expect(this.thankYouHeading).toBeVisible();
    console.log('✓ Successfully reached the Thank You page');
  }
}