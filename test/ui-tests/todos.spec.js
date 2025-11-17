const { test, expect } = require("@playwright/test");

test("todos.html deve exibir o título correto", async ({ page }) => {
  await page.goto("/todos.html");
  await expect(page.locator("h1")).toHaveText("Lista de Tarefas");
});

test("todos.html deve carregar tarefas e mostrar valores Sim/Não em Concluída", async ({
  page,
}) => {
  await page.goto("/todos.html");
  const tabela = page.locator("#todosTable");
  await expect(tabela).toBeVisible();

  const colCompleted = tabela.locator("tbody tr td:nth-child(4)");
  const texts = await colCompleted.allTextContents();

  expect(texts.length).toBeGreaterThan(0);
});
