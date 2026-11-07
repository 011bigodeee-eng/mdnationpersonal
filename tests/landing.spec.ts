import { test, expect } from "@playwright/test";

for (const width of [320, 375, 390, 430, 768, 1024, 1440]) {
  test(`layout funcional sem overflow em ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto("/");
    await expect(page.locator("h1")).toContainText("UMA DECISÃO.");
    await page.evaluate(() => document.fonts.ready);
    for (const image of await page.locator("img").all()) {
      await image.scrollIntoViewIfNeeded();
      await expect
        .poll(() =>
          image.evaluate(
            (img) =>
              (img as HTMLImageElement).complete &&
              (img as HTMLImageElement).naturalWidth > 0,
          ),
        )
        .toBe(true);
    }
    await page.locator("footer").scrollIntoViewIfNeeded();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    expect(
      await page
        .locator("img")
        .evaluateAll((images) =>
          images.every(
            (img) =>
              (img as HTMLImageElement).complete &&
              (img as HTMLImageElement).naturalWidth > 0,
          ),
        ),
    ).toBe(true);
    if (width < 681) {
      await page.getByRole("button", { name: "Abrir menu" }).click();
      await expect(
        page.getByRole("button", { name: "Fechar menu" }),
      ).toHaveAttribute("aria-expanded", "true");
      await page
        .locator("#main-nav")
        .getByRole("link", { name: "Método", exact: true })
        .click();
      await expect(
        page.getByRole("button", { name: "Abrir menu" }),
      ).toHaveAttribute("aria-expanded", "false");
    }
    await page
      .locator("#duvidas")
      .getByText("Como funciona o acompanhamento?", { exact: true })
      .click();
    await expect(page.locator("#duvidas details").first()).toHaveAttribute(
      "open",
      "",
    );
    await page.screenshot({
      path: `/workspace/scratch/md-${width}.png`,
      fullPage: true,
    });
    expect(errors).toEqual([]);
  });
}

test("questionário, consentimento, resumo e mensagem de contato", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const quiz = page.locator("#objetivos");
  await expect(quiz.getByRole("button", { name: "CONTINUAR" })).toBeDisabled();
  for (const option of ["Hipertrofia", "Estou começando", "Online", "3 dias"]) {
    await quiz.getByRole("radio", { name: option, exact: true }).check();
    await quiz.getByRole("button", { name: "CONTINUAR" }).click();
  }
  await quiz.getByLabel("SEU NOME", { exact: true }).fill("Ana");
  await expect(
    quiz.getByRole("button", { name: "VER MEU RESUMO" }),
  ).toBeDisabled();
  await quiz.getByRole("checkbox").check();
  await quiz.getByRole("button", { name: "VER MEU RESUMO" }).click();
  await expect(
    quiz.getByRole("heading", { name: "Vamos conversar, Ana." }),
  ).toBeVisible();
  await expect(quiz.locator("dl")).toContainText("Hipertrofia");
  await quiz.getByRole("button", { name: "CONVERSAR COM MATHEUS" }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("textbox")).toHaveValue(/Meu nome é Ana/);
  await expect(dialog.getByRole("textbox")).toHaveValue(
    /Frequência pretendida: 3 dias/,
  );
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await page.getByRole("button", { name: "Privacidade", exact: true }).click();
  await expect(page.getByRole("dialog")).toContainText("não possui cadastro");
  await page.keyboard.press("Escape");
});

test("abertura pode ser pulada, galeria e mockup respondem", async ({
  page,
}) => {
  await page.goto("/");
  const intro = page.getByRole("dialog", { name: "Abertura MD Nation" });
  await expect(intro).toBeVisible();
  await page.getByRole("button", { name: "Pular introdução" }).click();
  await expect(intro).not.toBeVisible();
  await page
    .getByTitle("Ver dia 3 da semana demonstrativa")
    .click();
  await expect(page.locator(".phone-workout h4")).toHaveText("Foco & técnica");
  await page
    .getByRole("button", { name: /O AMBIENTE/ })
    .click();
  await expect(
    page.getByRole("dialog", { name: "Galeria ilustrativa" }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await page.reload();
  await expect(intro).not.toBeVisible();
});

test("link WhatsApp valida o contato e codifica as respostas", async () => {
  const { client, whatsappUrl } = await import("../lib/content");
  const original = client.whatsapp;
  try {
    client.whatsapp = "";
    expect(whatsappUrl()).toBeNull();
    client.whatsapp = "123";
    expect(whatsappUrl()).toBeNull();
    client.whatsapp = "55 (11) 99999-9999";
    const message = "Nome: Ana & João\nObjetivo: Qualidade de vida";
    const url = new URL(whatsappUrl(message)!);
    expect(url.origin).toBe("https://wa.me");
    expect(url.pathname).toBe("/5511999999999");
    expect(url.searchParams.get("text")).toBe(message);
  } finally {
    client.whatsapp = original;
  }
});

test("acessibilidade automatizada na página e no questionário", async ({
  page,
}) => {
  const AxeBuilder = (await import("@axe-core/playwright")).default;
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const report = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();
  expect(report.violations).toEqual([]);
});
