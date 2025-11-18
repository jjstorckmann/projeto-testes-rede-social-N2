const { test, expect } = require("@playwright/test");
// 1. teste o título da página
test("todos.html deve exibir o título correto", async ({ page }) => {
  await page.goto("/todos.html");
  await expect(page.locator("h1")).toHaveText("Lista de Tarefas");
});

// 2. teste a tabela com pelo menos uma tarefa
test("todos.html deve carregar tasks e mostrar valores sim ou nao", async ({
  page,
}) => {
  await page.goto("/todos.html");
  const tabela = page.locator("#todosTable");
  await expect(tabela).toBeVisible();

  const colCompleted = tabela.locator("tbody tr td:nth-child(4)");
  const texts = await colCompleted.allTextContents();

  expect(texts.length).toBeGreaterThan(0);
});
