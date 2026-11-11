import { test, expect } from "@playwright/test";

for (const width of [320, 390, 768, 1440]) {
  test(`apresentação e fotografias completas em ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const section = page.locator("#sobre");
    await expect(section.getByRole("heading", { level: 2 })).toHaveText("Muito além do treinamento. Uma estratégia para cada objetivo.");
    await expect(section).toContainText("atletas de alto rendimento");
    await expect(section.getByRole("heading", { level: 3 })).toHaveCount(3);
    for (const image of await section.locator("img").all()) {
      await image.scrollIntoViewIfNeeded();
      await image.evaluate((el) => (el as HTMLImageElement).decode());
      const ratio = await image.evaluate((el) => {
        const img = el as HTMLImageElement;
        return Math.abs(img.width / img.height - img.naturalWidth / img.naturalHeight);
      });
      expect(ratio).toBeLessThan(.01);
      const box = (await image.boundingBox())!;
      expect(box.x).toBeGreaterThanOrEqual(0);
      expect(box.x + box.width).toBeLessThanOrEqual(width);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    await expect(section.locator("blockquote")).toContainText("Do seu ponto de partida ao seu próximo nível.");
  });
}
