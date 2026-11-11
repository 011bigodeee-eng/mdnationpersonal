import { test, expect } from "@playwright/test";

for (const width of [320, 390, 768, 1440]) {
  test(`galeria editorial preserva as quatro fotos em ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const section = page.locator("#treinamento-na-pratica");
    expect(await section.evaluate(el => el.previousElementSibling?.id)).toBe("sobre");
    await expect(section.getByRole("heading", { level: 2 })).toHaveText("Treinamento na Prática");
    await expect(section.locator("img")).toHaveCount(4);
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
    if (width >= 1000) {
      const main = (await section.locator(".practice-photo--acao img").boundingBox())!;
      const secondary = (await section.locator(".practice-photo--foco img").boundingBox())!;
      expect(main.width).toBeGreaterThan(secondary.width * 1.5);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
  });
}
