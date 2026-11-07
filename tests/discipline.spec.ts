import { test, expect } from "@playwright/test";

for (const width of [320, 390, 768, 1440]) {
  test(`DISCIPLINA preenche conforme o scroll, sem cortes em ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await page.getByRole("button", { name: "Pular introdução" }).click();
    await page.evaluate(() => document.fonts.ready);
    const section = page.locator(".discipline-transition");
    await expect(page.locator(".brand-strip")).toHaveCount(0);
    await expect(
      page.getByRole("button", { name: /pausar faixa/i }),
    ).toHaveCount(0);
    await expect(section.getByRole("button")).toHaveCount(0);
    expect(await section.evaluate((el) => el.previousElementSibling?.id)).toBe(
      "inicio",
    );
    expect(await section.evaluate((el) => el.nextElementSibling?.id)).toBe(
      "sobre",
    );
    await expect(
      section.getByRole("heading", { name: "DISCIPLINA", exact: true }),
    ).toHaveCount(1);
    await expect(section).toContainText(
      "A EVOLUÇÃO É CONSTRUÍDA TODOS OS DIAS.",
    );
    await expect
      .poll(() =>
        section.evaluate((el) =>
          Number(
            (el as HTMLElement).style.getPropertyValue("--discipline-progress"),
          ),
        ),
      )
      .toBe(0);
    const initialClip = await section
      .locator(".discipline-fill")
      .evaluate((el) => getComputedStyle(el).clipPath);
    expect(initialClip).toContain("100%");
    const y = await section.evaluate(
      (el) => el.getBoundingClientRect().top + scrollY,
    );
    const range = 900 * (width <= 680 ? 0.27 : 0.5);
    await page.evaluate(
      (top) => scrollTo({ top, behavior: "instant" }),
      y - 900 * 0.76 + range * 0.5,
    );
    await expect
      .poll(() =>
        section.evaluate((el) =>
          Number(
            (el as HTMLElement).style.getPropertyValue("--discipline-progress"),
          ),
        ),
      )
      .toBeGreaterThan(0.45);
    expect(
      await section.evaluate((el) =>
        Number(
          (el as HTMLElement).style.getPropertyValue("--discipline-progress"),
        ),
      ),
    ).toBeLessThan(0.55);
    const midClip = await section
      .locator(".discipline-fill")
      .evaluate((el) => getComputedStyle(el).clipPath);
    expect(midClip).not.toBe(initialClip);
    await section.screenshot({
      path: `/workspace/scratch/md-discipline-half-${width}.png`,
      style:
        ".header,.skip-link,.floating-contact{visibility:hidden!important}",
    });
    await page.evaluate(
      (top) => scrollTo({ top, behavior: "instant" }),
      y - 900 * 0.76 + range + 2,
    );
    await expect
      .poll(() =>
        section.evaluate((el) =>
          Number(
            (el as HTMLElement).style.getPropertyValue("--discipline-progress"),
          ),
        ),
      )
      .toBe(1);
    const bounds = await section.locator(".discipline-title").evaluate((el) => {
      const range = document.createRange();
      range.selectNodeContents(el.querySelector(".discipline-outline")!);
      const text = range.getBoundingClientRect(),
        box = el.getBoundingClientRect();
      return {
        left: text.left,
        right: text.right,
        boxLeft: box.left,
        boxRight: box.right,
      };
    });
    expect(bounds.left).toBeGreaterThanOrEqual(bounds.boxLeft - 1);
    expect(bounds.right).toBeLessThanOrEqual(bounds.boxRight + 1);
    if (width <= 390)
      expect((await section.boundingBox())!.height).toBeLessThan(240);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(width);
    await section.screenshot({
      path: `/workspace/scratch/md-discipline-full-${width}.png`,
      style:
        ".header,.skip-link,.floating-contact{visibility:hidden!important}",
    });
  });
}

test("transição estática com movimento reduzido e legível sem JavaScript", async ({
  page,
  browser,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const section = page.locator(".discipline-transition");
  await expect(section.locator(".discipline-fill")).toHaveCSS(
    "clip-path",
    "none",
  );
  await expect(section.locator(".discipline-line>span")).toHaveCSS(
    "transform",
    "matrix(1, 0, 0, 1, 0, 0)",
  );
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 320, height: 844 },
  });
  try {
    const fallback = await context.newPage();
    await fallback.goto("http://127.0.0.1:3000");
    await expect(
      fallback
        .locator(".discipline-transition")
        .getByRole("heading", { name: "DISCIPLINA", exact: true }),
    ).toBeVisible();
    await expect(fallback.locator(".discipline-outline")).toHaveCSS(
      "-webkit-text-stroke-width",
      "0.8px",
    );
    expect(
      await fallback.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(320);
  } finally {
    await context.close();
  }
});
