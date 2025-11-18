// ui-tests/users.spec.js
const { test, expect } = require("@playwright/test");

//1 titulo correto
test("users.html deve exibir o título correto", async ({ page }) => {
  await page.goto("/users.html");
  await expect(page.locator("h1")).toHaveText("Lista de Usuários");
});

//2 tabela com pelo menos um usuário
test("users.html deve carregar a tabela de usuários com pelo menos um usuario", async ({
  page,
}) => {
  await page.goto("/users.html");

  const tabela = page.locator("#usersTable");
  await expect(tabela).toBeVisible();

  const linhas = tabela.locator("tbody tr");
  const count = await linhas.count();

  expect(count).toBeGreaterThan(0);
});
