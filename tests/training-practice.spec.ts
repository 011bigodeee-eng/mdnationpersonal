import { test, expect } from "@playwright/test";

for (const width of [320, 390, 768, 1440]) {
  test(`registros preservam Jackson e removem as fotos confirmadas em ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const section = page.locator("#registros-da-jornada");
    expect(await section.evaluate(el => el.previousElementSibling?.id)).toBe("sobre");
    await expect(section.getByRole("heading", { level: 2 })).toHaveText("Registros da Jornada");
    await expect(section.locator("img")).toHaveCount(2);
    for (const image of await section.locator("img").all()) {
      await image.scrollIntoViewIfNeeded();
      await image.evaluate(el => (el as HTMLImageElement).decode());
      const geometry = await image.evaluate(el => {
        const img = el as HTMLImageElement, box = img.getBoundingClientRect();
        return { left: box.left, right: box.right, ratio: box.width / box.height, original: img.naturalWidth / img.naturalHeight, loading: img.loading };
      });
      expect(geometry.left).toBeGreaterThanOrEqual(0);
      expect(geometry.right).toBeLessThanOrEqual(width);
      expect(Math.abs(geometry.ratio - geometry.original)).toBeLessThan(.01);
      expect(geometry.loading).toBe("lazy");
    }
    await expect(section.locator('img[src*="acao.webp"], img[src*="foco.webp"]')).toHaveCount(0);
    await expect(section.getByRole("heading", { level: 3 })).toHaveText("Um dos nossos resultados");
    await expect(section.locator(".jackson-name")).toHaveText("Jackson");
    await expect(section).not.toContainText(/antes|depois|%/i);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
  });
}
