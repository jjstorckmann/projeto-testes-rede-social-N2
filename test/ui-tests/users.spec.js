// ui-tests/users.spec.js
const { test, expect } = require("@playwright/test");

test("users.html deve exibir o título correto", async ({ page }) => {
  await page.goto("/users.html");
  await expect(page.locator("h1")).toHaveText("Lista de Usuários");
});

test("users.html deve carregar a tabela de usuários com pelo menos uma linha", async ({
  page,
}) => {
  await page.goto("/users.html");

  const tabela = page.locator("#usersTable");
  await expect(tabela).toBeVisible();

  const linhas = tabela.locator("tbody tr");
  const count = await linhas.count();

  expect(count).toBeGreaterThan(0);
});
