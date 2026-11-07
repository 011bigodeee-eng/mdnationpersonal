import { test, expect } from "@playwright/test";

for (const width of [320, 360, 375, 390, 430, 768, 1440, 1920]) {
  test(`fotos autênticas com cabeça íntegra e sem texto sobre o rosto em ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    const hero = page.locator(".hero-image"),
      about = page.locator(".about-art img");
    await expect(hero).toHaveAttribute("src", /matheus-hero/);
    await expect(about).toHaveAttribute("src", /matheus-sobre/);
    for (const image of [hero, about]) {
      await image.scrollIntoViewIfNeeded();
      await image.evaluate((img) => (img as HTMLImageElement).decode());
    }
    await page.evaluate(() => scrollTo(0, 0));
    const geometry = await hero.evaluate((img) => {
      const image = img as HTMLImageElement,
        rect = image.getBoundingClientRect(),
        frame = image.parentElement!.getBoundingClientRect(),
        style = getComputedStyle(image);
      const [px, py] = style.objectPosition.split(" ").map(parseFloat);
      const scale =
        style.objectFit === "contain"
          ? Math.min(rect.width / 869, rect.height / 867)
          : Math.max(rect.width / 869, rect.height / 867);
      // Coordinates of the head in the supplied photograph; this checks framing, not identity.
      const face = {
        left: rect.left + ((rect.width - 869 * scale) * px) / 100 + 330 * scale,
        top: rect.top + ((rect.height - 867 * scale) * py) / 100 + 88 * scale,
        right:
          rect.left + ((rect.width - 869 * scale) * px) / 100 + 550 * scale,
        bottom:
          rect.top + ((rect.height - 867 * scale) * py) / 100 + 373 * scale,
      };
      return {
        face,
        frame: {
          left: frame.left,
          top: frame.top,
          right: frame.right,
          bottom: frame.bottom,
        },
        imageRatio: 869 / 867,
      };
    });
    expect(geometry.face.left).toBeGreaterThanOrEqual(geometry.frame.left);
    expect(geometry.face.right).toBeLessThanOrEqual(geometry.frame.right);
    expect(geometry.face.top).toBeGreaterThanOrEqual(geometry.frame.top);
    expect(geometry.face.bottom).toBeLessThanOrEqual(geometry.frame.bottom);
    const textRects = await page.locator("h1").evaluate((h) =>
      Array.from(h.querySelectorAll("span,em")).map((el) => {
        const range = document.createRange();
        range.selectNodeContents(el);
        const r = range.getBoundingClientRect();
        return { x: r.x, y: r.y, width: r.width, height: r.height };
      }),
    );
    const buttonRect = (await page
      .locator(".hero-actions .button")
      .boundingBox())!;
    for (const rect of [...textRects, buttonRect]) {
      const overlap =
        rect.x < geometry.face.right &&
        rect.x + rect.width > geometry.face.left &&
        rect.y < geometry.face.bottom &&
        rect.y + rect.height > geometry.face.top;
      expect(overlap).toBe(false);
    }
    if (width <= 680) {
      const frame = await page.locator(".hero-visual").boundingBox();
      expect(Math.abs(frame!.width / frame!.height - 869 / 867)).toBeLessThan(
        0.02,
      );
      const cta = await page.locator(".hero-actions .button").boundingBox();
      expect(cta!.y + cta!.height).toBeLessThan(900);
    }
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(width);
  });
}

test("galeria identifica as fotografias reais e amplia o arquivo correto", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.getByTitle("Ampliar fotografia: PRESENÇA. FOCO. DIREÇÃO.").click();
  const modal = page.getByRole("dialog", {
    name: "Matheus Dias — fotografias",
  });
  await expect(modal).toBeVisible();
  await expect(modal.locator("img")).toHaveAttribute("src", /matheus-hero/);
  await expect(modal).toContainText("camiseta original");
  await page.keyboard.press("Escape");
  await page.getByTitle("Ampliar fotografia: DISCIPLINA EM MOVIMENTO.").click();
  await expect(modal.locator("img")).toHaveAttribute("src", /matheus-sobre/);
  await expect(modal).toContainText("jiu-jítsu");
  await page.keyboard.press("Escape");
  await expect(page.locator(".gallery-item--real")).toHaveCount(2);
  await expect(page.locator(".gallery-item--concept")).toHaveCount(1);
});
