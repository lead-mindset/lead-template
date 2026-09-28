import { expect, test } from "@playwright/test";
import en from "../messages/en.json";
import es from "../messages/es.json";

const cases = [
  { locale: "es", messages: es },
  { locale: "en", messages: en },
] as const;

for (const { locale, messages } of cases) {
  test(`home page renders the header in ${locale}`, async ({ page }) => {
    const response = await page.goto(locale);
    expect(response?.ok()).toBe(true);

    await expect(page.locator("html")).toHaveAttribute("lang", locale);

    const header = page.getByRole("banner");
    await expect(header).toBeVisible();
    await expect(
      header.getByText(messages.Brand.name, { exact: true }),
    ).toBeVisible();
    await expect(
      header.getByRole("navigation", { name: messages.Header.nav }),
    ).toBeVisible();

    await expect(
      page.getByRole("heading", { level: 1, name: messages.HomePage.title }),
    ).toBeVisible();
  });
}
