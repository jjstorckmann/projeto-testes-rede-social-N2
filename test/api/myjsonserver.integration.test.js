// test/integration/myjsonserver.integration.test.js
// Testes de integração contra My JSON Server (seu db.json)
// PASSO OBRIGATÓRIO: troque <user>/<repo> pelo seu repositório público
//
// Este arquivo contém dois blocos de testes:
// 1) Camada HTTP: testa endpoints expostos pelo My JSON Server via chai-http
// 2) Camada Service: usa as factories via src/dependecies/myjsonserver.js

const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");

chai.use(chaiHttp);

// >>> TROQUE AQUI PELO SEU REPO <<<
const BASE = "https://my-json-server.typicode.com/<user>/<repo>";

// Guard: pula os testes enquanto o BASE não for configurado
function isConfigured() {
  return !BASE.includes("<user>") && !BASE.includes("<repo>");
}

describe("My JSON Server (integração) – HTTP layer", function () {
  before(function () {
    if (!isConfigured()) {
      this.skip(); // pula todo o bloco até você configurar o BASE
    }
  });

  it("GET /users (se existir no seu db.json) retorna lista", async () => {
    const res = await chai.request(BASE).get("/users");
    // Se o seu db.json não tiver "users", troque pelo recurso correto.
    expect([200, 304]).to.include(res.status); // My JSON Server pode responder 304
    expect(res.body).to.be.an("array"); // pode estar vazio; depende do seu db.json
  });

  it("GET /posts (se existir) retorna lista", async () => {
    const res = await chai.request(BASE).get("/posts");
    expect([200, 304]).to.include(res.status);
    expect(res.body).to.be.an("array");
  });

  it("GET /comments (se existir) retorna lista", async () => {
    const res = await chai.request(BASE).get("/comments");
    expect([200, 304]).to.include(res.status);
    expect(res.body).to.be.an("array");
  });

  it("GET /todos (se existir) retorna lista", async () => {
    const res = await chai.request(BASE).get("/todos");
    expect([200, 304]).to.include(res.status);
    expect(res.body).to.be.an("array");
  });

  it("GET /albums (se existir) retorna lista", async () => {
    const res = await chai.request(BASE).get("/albums");
    expect([200, 304]).to.include(res.status);
    expect(res.body).to.be.an("array");
  });

  it("GET /photos (se existir) retorna lista", async () => {
    const res = await chai.request(BASE).get("/photos");
    expect([200, 304]).to.include(res.status);
    expect(res.body).to.be.an("array");
  });

  // EXEMPLO adicional (opcional): se você criar um recurso "metrics" no db.json
  it("GET /metrics (opcional) retorna métricas simuladas", async () => {
    const res = await chai.request(BASE).get("/metrics");
    // se não existir, troque pelo seu recurso específico
    expect([200, 304, 404]).to.include(res.status);
  });
});

describe("My JSON Server (integração) – Service layer", function () {
  // Aqui testamos via nossas factories já apontadas para o My JSON Server
  // Ajuste o BASE em src/dependecies/myjsonserver.js também.

  let deps;
  before(function () {
    if (!isConfigured()) {
      this.skip();
    }
    // IMPORTANTE: este require usa o BASE do arquivo src/dependecies/myjsonserver.js
    deps = require("../../src/dependecies/myjsonserver");
  });

  it('users.getUsers() funciona com a base do My JSON Server (se houver "users")', async () => {
    if (!deps.users?.getUsers) return this.skip();
    const list = await deps.users.getUsers(); // depende do seu db.json
    expect(list).to.be.an("array");
  });

  it('posts.getPosts() funciona (se houver "posts")', async () => {
    if (!deps.posts?.getPosts) return this.skip();
    const list = await deps.posts.getPosts();
    expect(list).to.be.an("array");
  });

  it('comments.getComments() funciona (se houver "comments")', async () => {
    if (!deps.comments?.getComments) return this.skip();
    const list = await deps.comments.getComments();
    expect(list).to.be.an("array");
  });

  it('todos.getTodos() funciona (se houver "todos")', async () => {
    if (!deps.todos?.getTodos) return this.skip();
    const list = await deps.todos.getTodos();
    expect(list).to.be.an("array");
  });

  it('albums.getAlbums() funciona (se houver "albums")', async () => {
    if (!deps.albums?.getAlbums) return this.skip();
    const list = await deps.albums.getAlbums();
    expect(list).to.be.an("array");
  });

  it('pics.getPics() funciona (se houver "photos")', async () => {
    if (!deps.pics?.getPics) return this.skip();
    const list = await deps.pics.getPics();
    expect(list).to.be.an("array");
  });
});
