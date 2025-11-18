const { test, expect } = require("@playwright/test");

// 1. teste o título da página
test("albums.html exibe o título correto", async ({ page }) => {
  await page.goto("/albums.html");
  await expect(page.locator("h1")).toHaveText("Lista de Álbuns");
});

// 2. teste a tabela com pelo menos um álbum
test("albums.html deve carregar albuns com pelo menos um", async ({ page }) => {
  await page.goto("/albums.html");
  const tabela = page.locator("#albumsTable");
  await expect(tabela).toBeVisible();

  const linhas = tabela.locator("tbody tr");
  const count = await linhas.count();
  expect(count).toBeGreaterThan(0);
});
