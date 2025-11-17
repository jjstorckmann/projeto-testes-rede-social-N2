// ui-tests/posts.spec.js
const { test, expect } = require("@playwright/test");

// ATENÇÃO: antes de rodar esses testes, execute `npm start`
// para subir o servidor em http://localhost:3000

test("posts.html deve exibir o título correto", async ({ page }) => {
  await page.goto("/posts.html");
  await expect(page.locator("h1")).toHaveText("Lista de Posts");
});

test("posts.html deve exibir o loader inicialmente", async ({ page }) => {
  await page.goto("/posts.html");

  const loader = page.locator("#loader");

  // o loader EXISTE e tem o texto correto
  await expect(loader).toHaveText(/Carregando/i);
});

test("posts.html deve carregar a tabela de posts e esconder o loader", async ({
  page,
}) => {
  await page.goto("/posts.html");

  // espera a tabela aparecer
  const tabela = page.locator("#postsTable");
  await expect(tabela).toBeVisible();

  // loader deve sumir
  await expect(page.locator("#loader")).toBeHidden();
});

test("posts.html deve exibir pelo menos uma linha de post na tabela", async ({
  page,
}) => {
  await page.goto("/posts.html");

  const linhas = page.locator("#postsTable tbody tr");
  const count = await linhas.count();

  // espera pelo menos 1 registro vindo do /posts
  expect(count).toBeGreaterThan(0);
});
