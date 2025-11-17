const { test, expect } = require("@playwright/test");

test("albums.html deve exibir o título correto", async ({ page }) => {
  await page.goto("/albums.html");
  await expect(page.locator("h1")).toHaveText("Lista de Álbuns");
});

test("albums.html deve carregar álbuns com pelo menos uma linha", async ({
  page,
}) => {
  await page.goto("/albums.html");
  const tabela = page.locator("#albumsTable");
  await expect(tabela).toBeVisible();

  const linhas = tabela.locator("tbody tr");
  const count = await linhas.count();
  expect(count).toBeGreaterThan(0);
});
