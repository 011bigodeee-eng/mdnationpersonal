import { test, expect } from "@playwright/test";

for (const width of [320, 360, 375, 390, 430, 768]) {
  test(`Hero estável com a imagem atrasada em ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    let release!: () => void;
    const gate = new Promise<void>((resolve) => {
      release = resolve;
    });
    await page.route(
      (url) =>
        url.pathname === "/_next/image" &&
        Boolean(url.searchParams.get("url")?.includes("matheus-hero")),
      async (route) => {
        await gate;
        await route.continue();
      },
    );
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.evaluate(() => document.fonts.ready);
    const before = await page.locator(".hero-visual").boundingBox();
    const content = await page.locator(".hero-content").boundingBox();
    expect(content!.y + content!.height).toBeLessThanOrEqual(before!.y + 6);
    expect(
      await page
        .locator(".hero-content")
        .evaluate((el) =>
          Boolean(
            el.compareDocumentPosition(
              el.parentElement!.querySelector(".hero-visual")!,
            ) & Node.DOCUMENT_POSITION_FOLLOWING,
          ),
        ),
    ).toBe(true);
    release();
    await page
      .locator(".hero-image")
      .evaluate((img) => (img as HTMLImageElement).decode());
    const after = await page.locator(".hero-visual").boundingBox();
    for (const axis of ["x", "y", "width", "height"] as const)
      expect(Math.abs(before![axis] - after![axis])).toBeLessThan(1);
    const cta = await page.locator(".hero-actions>.button").boundingBox();
    expect(cta!.y + cta!.height).toBeLessThan(600);
    if (width <= 430)
      expect((await page.locator(".hero").boundingBox())!.height).toBeLessThan(
        width + 520,
      );
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(width);
  });
}

test("animações mantêm a ordem e não deslocam o layout após a abertura", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.addInitScript(() => {
    const state = window as typeof window & { heroCLS: number };
    state.heroCLS = 0;
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const shift = entry as PerformanceEntry & {
          value: number;
          hadRecentInput: boolean;
        };
        if (!shift.hadRecentInput) state.heroCLS += shift.value;
      }
    }).observe({ type: "layout-shift", buffered: true });
  });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  const initial = await page.locator(".hero-visual").boundingBox();
  await expect(
    page.getByRole("dialog", { name: "Abertura MD Nation" }),
  ).not.toBeVisible({ timeout: 3500 });
  await page
    .locator(".hero-image")
    .evaluate((img) => (img as HTMLImageElement).decode());
  await page.evaluate(
    () =>
      new Promise<void>((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
      ),
  );
  const final = await page.locator(".hero-visual").boundingBox();
  expect(Math.abs(initial!.y - final!.y)).toBeLessThan(1);
  expect(Math.abs(initial!.height - final!.height)).toBeLessThan(1);
  const text = await page.locator(".hero-content").boundingBox();
  expect(text!.y + text!.height).toBeLessThanOrEqual(final!.y + 6);
  expect(
    await page.evaluate(
      () => (window as typeof window & { heroCLS: number }).heroCLS,
    ),
  ).toBeLessThan(0.01);
  await page.evaluate(
    () =>
      document.activeElement instanceof HTMLElement &&
      document.activeElement.blur(),
  );
  await page.screenshot({
    path: "/workspace/scratch/md-hero-fixed-390-animated.png",
    fullPage: true,
    animations: "disabled",
  });
});

test("faixa contínua pode ser pausada e respeita movimento reduzido", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Pular introdução" }).click();
  const region = page.getByRole("region", { name: "Identidade MD Nation" }),
    track = region.locator(".brand-strip-track");
  await expect(region.locator(".brand-strip-set")).toHaveCount(2);
  await expect(region.locator(".brand-strip-set").nth(1)).toHaveAttribute(
    "aria-hidden",
    "true",
  );
  await expect(track).toHaveCSS("animation-play-state", "running");
  await region.getByRole("button", { name: "Pausar faixa" }).click();
  await expect(track).toHaveCSS("animation-play-state", "paused");
  const paused = await track.evaluate(
    (el) => el.getAnimations()[0].currentTime,
  );
  await page.evaluate(
    () =>
      new Promise<void>((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
      ),
  );
  expect(await track.evaluate((el) => el.getAnimations()[0].currentTime)).toBe(
    paused,
  );
  await region.getByRole("button", { name: "Retomar faixa" }).click();
  await expect(track).toHaveCSS("animation-play-state", "running");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(track).toHaveCSS("animation-name", "none");
  await expect(region.getByRole("button")).toHaveCount(0);
  await expect(region.locator(".brand-strip-set").first()).toBeVisible();
});
