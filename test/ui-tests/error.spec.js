const { test, expect } = require("@playwright/test");

// 1. teste rota inexistente retorna erro JSON
test("rota inexistente deve retornar erro JSON", async ({ page }) => {
  const res = await page.goto("/rota-inexistente");
  expect(res.status()).toBe(404);

  const bodyText = await page.textContent("body");
  expect(bodyText).toContain("Rota não encontrada");
});

// 2. teste que um elemento inexistente não está presente na página
test("posts.html não deve conter elemento inexistente #botaoInutil", async ({
  page,
}) => {
  await page.goto("/posts.html");
  const elem = page.locator("#botaoInutil");
  await expect(elem).toHaveCount(0);
});

// 3. teste que verifica se todas as páginas HTML carregam sem erro 404
test("Todas as páginas HTML devem carregar sem erro 404", async ({ page }) => {
  const pages = [
    "users.html",
    "posts.html",
    "comments.html",
    "todos.html",
    "albums.html",
  ];

  for (const p of pages) {
    const response = await page.goto(`/${p}`);
    // Verifica se o status é 200 OK
    expect(response.status()).toBe(200);

    // Verifica se não caiu no JSON de erro 404
    // (Opcional, mas garante que não é um JSON com { error: ... })
    const text = await response.text();
    expect(text).not.toContain('{"error":"Rota não encontrada"}');
  }
});
