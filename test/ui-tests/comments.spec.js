const { test, expect } = require("@playwright/test");

// 1. teste o título da página
test("comments.html deve exibir o título correto", async ({ page }) => {
  await page.goto("/comments.html");
  await expect(page.locator("h1")).toHaveText("Lista de Comentários");
});

// 2. teste a tabela com pelo menos um comentário
test("comments.html deve carregar a tabela com pelo menos um comentário", async ({
  page,
}) => {
  await page.goto("/comments.html");
  const tabela = page.locator("#commentsTable");
  await expect(tabela).toBeVisible();

  const linhas = tabela.locator("tbody tr");
  const count = await linhas.count();
  expect(count).toBeGreaterThan(0);
});
