const { test, expect } = require("@playwright/test");

test("rota inexistente deve retornar erro JSON", async ({ page }) => {
  const res = await page.goto("/rota-inexistente");
  expect(res.status()).toBe(404);

  const bodyText = await page.textContent("body");
  expect(bodyText).toContain("Rota não encontrada");
});

test("posts.html não deve conter elemento inexistente #botaoInutil", async ({
  page,
}) => {
  await page.goto("/posts.html");
  const elem = page.locator("#botaoInutil");
  await expect(elem).toHaveCount(0);
});
