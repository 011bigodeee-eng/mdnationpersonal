import { test, expect } from "@playwright/test";

for (const width of [320, 390, 430, 768, 1440]) {
  test(`consultoria online em destaque e contato correto em ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.context().route("https://wa.me/**", route => route.fulfill({ status: 200, body: "Test only" }));
    await page.goto("/");
    const section = page.locator("#acompanhamento");
    await expect(section.getByRole("heading", { level: 2 })).toHaveText("Consultoria Online");
    await expect(section).toContainText("Sua evolução não depende de onde você está.");
    await expect(section).not.toContainText(/Personal presencial/i);
    await expect(section.locator('img[src*="service-strength"]')).toHaveCount(0);
    await expect(section.locator(".service-number")).toHaveCount(0);
    const button = section.getByRole("button", { name: "QUERO MINHA CONSULTORIA ONLINE" });
    await button.scrollIntoViewIfNeeded();
    const popupPromise = page.waitForEvent("popup");
    await button.click();
    const popup = await popupPromise;
    await popup.waitForLoadState();
    const url = new URL(popup.url());
    expect(url.pathname).toBe("/5516996455766");
    expect(url.searchParams.get("text")).toBe("Olá, Matheus! Gostaria de saber mais sobre a Consultoria Online da MD Nation.");
    await popup.close();
    for (const image of await section.locator("img").all()) {
      await image.scrollIntoViewIfNeeded();
      await image.evaluate(el => (el as HTMLImageElement).decode());
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    if (width <= 900) {
      const photo = (await section.locator(".online-service-image img").boundingBox())!;
      expect(photo.height).toBeLessThanOrEqual(280);
      const title = await section.locator("h2").evaluate(el => parseFloat(getComputedStyle(el).fontSize));
      expect(title).toBeLessThanOrEqual(64);
    }
    const bounds = (await button.boundingBox())!;
    expect(bounds.x).toBeGreaterThanOrEqual(0);
    expect(bounds.x + bounds.width).toBeLessThanOrEqual(width);
  });
}
