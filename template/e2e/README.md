# E2E Testing

This project uses [Playwright](https://playwright.dev/) for end-to-end testing.

## Setup

Install Playwright and dependencies:

```bash
npx playwright install
```

Add these scripts to your `package.json`:

```json
"scripts": {
  "test:e2e": "playwright test",
  "test:e2e:ui": "playwright test --ui",
  "test:e2e:report": "allure generate ./allure-results --clean && allure open"
}
```

## Running Tests

**Run all tests (headless):**

```bash
npm run test:e2e
```

**Run with UI mode (interactive):**

```bash
npm run test:e2e:ui
```

**Run in headed mode (see browser):**

```bash
npm run test:e2e -- --headed
```

**Run specific test file:**

```bash
npm run test:e2e -- example.spec.ts
```

**Debug mode:**

```bash
npm run test:e2e -- --debug
```

## View Reports

**HTML report (generated after test run):**

```bash
npx playwright show-report
```

**Allure report:**

```bash
npm run test:e2e:report
```

## Writing Tests

Tests are located in the `e2e/` directory. See `example.spec.ts` for a basic example.

```typescript
import { test, expect } from "@playwright/test";

test("my test", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading")).toBeVisible();
});
```

## Configuration

The test configuration is in `playwright.config.ts`:

- Dev server automatically starts before tests
- Tests run on `http://localhost:5173`
- Chromium browser is used by default

To add more browsers, edit `playwright.config.ts` and install them:

```bash
npx playwright install firefox webkit
```
