# Playwright E2E Automation

End-to-end UI automation for a contact form flow, built with Playwright and the Page Object Model.

The test fills in the contact form, captures a screenshot of the completed form, submits the request, and verifies that the user lands on the Thank You confirmation page.

## Prerequisites

- **Node.js** 18 or later ([download](https://nodejs.org/en/download/))
- **npm** (bundled with Node.js)

## Installation

```bash
# 1. Clone the repository
git clone https://github.com/dori654/playwright-e2e-automation.git

# 2. Install dependencies
npm install

# 3. Install Playwright browsers
npx playwright install
```

## Running the tests

```bash
# Run all tests (headless)
npm test

# Run with a visible browser window
npm run test:headed

# Run in interactive UI mode (recommended for debugging)
npm run test:ui

# View the HTML report after a run
npm run report
```

Screenshots captured during the run are saved to the `screenshots/` directory.

## Project structure

```
playwright-e2e-automation/
├── tests/
│   └── request-callback.spec.js    # Test scenario
├── pages/
│   └── HomePage.js                 # Page Object Model
├── test-data/
│   └── users.js                    # Test data fixtures
├── screenshots/                    # Generated screenshots
├── playwright.config.js            # Playwright configuration
├── package.json
└── README.md
```

## Design decisions

- **`@playwright/test` over the raw Playwright library** — the test runner provides auto-waiting assertions, parallel execution, retries, and HTML reports out of the box. This is the standard for production test suites.
- **Page Object Model** — even for a single test, separating page interactions into a dedicated class keeps the test readable, centralizes locators so they can be updated in one place, and demonstrates how the suite would scale.
- **Semantic locators (`getByLabel`, `getByRole`)** — preferred over CSS or XPath selectors because they reflect how a real user perceives the page and remain stable across visual refactors.
- **Case-insensitive regex matching** — labels are matched with `/pattern/i` to stay resilient against minor copy or styling changes (e.g. `NAME` → `Name`).
