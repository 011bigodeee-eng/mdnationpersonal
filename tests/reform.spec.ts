import { test, expect } from "@playwright/test";

test("menu mobile contém o foco, bloqueia o fundo e restaura ao fechar", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const opener = page.getByRole("button", { name: "Abrir menu" });
  await opener.click();
  const menu = page.getByRole("dialog", { name: "Menu de navegação" });
  await expect(menu).toBeVisible();
  expect(await page.evaluate(() => document.body.style.overflow)).toBe(
    "hidden",
  );
  for (let i = 0; i < 12; i++) {
    await page.keyboard.press("Tab");
    expect(await menu.evaluate((d) => d.contains(document.activeElement))).toBe(
      true,
    );
  }
  const scroll = await page.evaluate(() => scrollY);
  await page.mouse.move(200, 500);
  await page.mouse.wheel(0, 500);
  expect(await page.evaluate(() => scrollY)).toBe(scroll);
  await page.screenshot({ path: "/workspace/scratch/md-menu-390.png" });
  await page.keyboard.press("Escape");
  await expect(menu).not.toBeVisible();
  await expect(opener).toBeFocused();
  expect(await page.evaluate(() => document.body.style.overflow)).toBe("");
  await opener.click();
  await page.setViewportSize({ width: 1024, height: 900 });
  await expect(menu).not.toBeVisible();
});

test("questionário mantém respostas ao voltar e permite seleção pelo teclado", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const quiz = page.locator("#objetivos");
  const radio = quiz.getByRole("radio", { name: "Hipertrofia", exact: true });
  await radio.focus();
  await page.keyboard.press("Space");
  await expect(radio).toBeChecked();
  const panel = quiz.locator(".quiz-panel");
  const height = (await panel.boundingBox())!.height;
  await quiz.getByRole("button", { name: "CONTINUAR" }).click();
  await quiz
    .getByRole("radio", { name: "Já treino há algum tempo", exact: true })
    .check();
  await quiz.getByRole("button", { name: "Voltar", exact: true }).click();
  await expect(radio).toBeChecked();
  await quiz.getByRole("button", { name: "CONTINUAR" }).click();
  await expect(
    quiz.getByRole("radio", { name: "Já treino há algum tempo", exact: true }),
  ).toBeChecked();
  expect(Math.abs((await panel.boundingBox())!.height - height)).toBeLessThan(
    2,
  );
  await quiz.getByRole("button", { name: "CONTINUAR" }).click();
  await quiz.getByRole("radio", { name: "Online", exact: true }).check();
  await quiz.getByRole("button", { name: "CONTINUAR" }).click();
  await quiz.getByRole("radio", { name: "3 dias", exact: true }).check();
  await quiz.getByRole("button", { name: "CONTINUAR" }).click();
  await quiz.getByLabel("SEU NOME", { exact: true }).fill("A");
  await expect(
    quiz.getByText("Informe pelo menos dois caracteres para continuar."),
  ).toBeVisible();
  await expect(
    quiz.getByRole("button", { name: "VER MEU RESUMO" }),
  ).toBeDisabled();
  await quiz.getByLabel("SEU NOME", { exact: true }).fill("Ana");
  await quiz.getByRole("button", { name: "Voltar", exact: true }).click();
  await expect(
    quiz.getByRole("radio", { name: "3 dias", exact: true }),
  ).toBeChecked();
  await quiz.getByRole("button", { name: "CONTINUAR" }).click();
  await expect(quiz.getByLabel("SEU NOME", { exact: true })).toHaveValue("Ana");
});

test("movimento real progride sem bloquear a rolagem; modo reduzido continua legível", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await page.getByRole("button", { name: "Pular introdução" }).click();
  const method = page.locator("#metodo");
  await method.scrollIntoViewIfNeeded();
  await expect
    .poll(() =>
      method.evaluate((el) =>
        Number((el as HTMLElement).style.getPropertyValue("--scene-progress")),
      ),
    )
    .toBeGreaterThan(0);
  await expect(method.locator(".step-active").first()).toBeVisible();
  const card = page.locator(".service-card").first();
  await card.scrollIntoViewIfNeeded();
  const box = (await card.boundingBox())!;
  await page.mouse.move(box.x + box.width * 0.7, box.y + box.height * 0.4);
  await expect
    .poll(() =>
      card.evaluate((el) =>
        (el as HTMLElement).style.getPropertyValue("--tilt-y"),
      ),
    )
    .not.toBe("");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator(".cinematic-film").scrollIntoViewIfNeeded();
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(390);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".film-frame")).toHaveCSS("width", "390px");
  await expect(page.locator("h1")).toHaveCSS("opacity", "1");
});

test("editorial sem placeholders vazios e com repetição limitada às fotos reais", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".placeholder-grid")).toHaveCount(0);
  await expect(page.locator(".discipline-note")).toContainText("CONSTÂNCIA");
  const sources = await page
    .locator("main img")
    .evaluateAll((images) =>
      images
        .map((img) =>
          new URL((img as HTMLImageElement).src).searchParams.get("url"),
        )
        .filter(Boolean),
    );
  const counts = new Map<string, number>();
  for (const source of sources)
    counts.set(source!, (counts.get(source!) ?? 0) + 1);
  for (const [source, count] of counts)
    expect(count).toBe(source.startsWith("/images/matheus/") ? 2 : 1);
  await expect(page.locator(".gallery-item--real")).toHaveCount(2);
  await expect(page.locator(".cinematic-film h2")).toContainText(
    "NÃO ACONTECE",
  );
  await expect(page.locator(".cinematic-film video")).toHaveCount(0);
});

test("abertura fecha automaticamente e o conteúdo continua disponível sem JavaScript", async ({
  page,
  browser,
}) => {
  await page.goto("/");
  const intro = page.getByRole("dialog", { name: "Abertura MD Nation" });
  await expect(intro).toBeVisible();
  expect(
    await intro.evaluate(
      (el) =>
        el ===
        document
          .elementFromPoint(innerWidth / 2, innerHeight / 2)
          ?.closest("dialog"),
    ),
  ).toBe(true);
  await expect(intro).not.toBeVisible({ timeout: 3500 });
  await expect(page.locator("h1")).toBeVisible();
  await expect(page.locator("audio")).toHaveCount(0);
  const context = await browser.newContext({
    javaScriptEnabled: false,
    reducedMotion: "reduce",
    viewport: { width: 390, height: 844 },
  });
  try {
    const fallback = await context.newPage();
    await fallback.goto("http://127.0.0.1:3000");
    await expect(fallback.locator("h1")).toContainText("UMA DECISÃO.");
    await expect(fallback.locator("#sobre h2")).toBeVisible();
    await expect(fallback.locator("#metodo")).toContainText("Avaliação");
    await expect(fallback.locator(".intro")).not.toBeVisible();
    expect(
      await fallback.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(390);
  } finally {
    await context.close();
  }
});
