import { expect, test } from "@playwright/test";

test("basic navigation works", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: /welcome/i })).toBeVisible();

  await page.getByRole("link", { name: /about/i }).click();
  await expect(page).toHaveURL("/about");
  await expect(page.getByRole("heading", { name: /about/i })).toBeVisible();

  await page.getByRole("link", { name: /home/i }).click();
  await expect(page).toHaveURL("/");
});
