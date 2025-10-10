// test/api/jsonplaceholder.api.test.js
// Testes de API reais contra JSONPlaceholder
// Requer: chai, chai-http (já instalados)

const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");

chai.use(chaiHttp);

const BASE = "https://jsonplaceholder.typicode.com";

describe("JSONPlaceholder (API real)", () => {
  it("GET /users retorna lista", async () => {
    const res = await chai.request(BASE).get("/users");
    expect(res).to.have.status(200);
    expect(res.body).to.be.an("array").that.is.not.empty;
  });

  it("GET /posts retorna lista", async () => {
    const res = await chai.request(BASE).get("/posts");
    expect(res).to.have.status(200);
    expect(res.body).to.be.an("array").that.is.not.empty;
  });

  it("GET /comments retorna lista", async () => {
    const res = await chai.request(BASE).get("/comments");
    expect(res).to.have.status(200);
    expect(res.body).to.be.an("array").that.is.not.empty;
  });

  it("GET /todos retorna lista", async () => {
    const res = await chai.request(BASE).get("/todos");
    expect(res).to.have.status(200);
    expect(res.body).to.be.an("array").that.is.not.empty;
  });

  it("GET /albums retorna lista", async () => {
    const res = await chai.request(BASE).get("/albums");
    expect(res).to.have.status(200);
    expect(res.body).to.be.an("array").that.is.not.empty;
  });

  it("GET /photos retorna lista", async () => {
    const res = await chai.request(BASE).get("/photos");
    expect(res).to.have.status(200);
    expect(res.body).to.be.an("array").that.is.not.empty;
  });

  // Exemplos com querystring (userId / postId / albumId)
  it("GET /posts?userId=1 filtra por usuário", async () => {
    const res = await chai.request(BASE).get("/posts").query({ userId: 1 });
    expect(res).to.have.status(200);
    expect(res.body).to.be.an("array");
    if (res.body.length) {
      expect(res.body[0]).to.have.property("userId", 1);
    }
  });

  it("GET /comments?postId=1 filtra por post", async () => {
    const res = await chai.request(BASE).get("/comments").query({ postId: 1 });
    expect(res).to.have.status(200);
    expect(res.body).to.be.an("array");
    if (res.body.length) {
      expect(res.body[0]).to.have.property("postId", 1);
    }
  });

  it("GET /todos?userId=1 filtra todos por usuário", async () => {
    const res = await chai.request(BASE).get("/todos").query({ userId: 1 });
    expect(res).to.have.status(200);
    expect(res.body).to.be.an("array");
    if (res.body.length) {
      expect(res.body[0]).to.have.property("userId", 1);
    }
  });

  it("GET /albums?userId=1 filtra álbuns por usuário", async () => {
    const res = await chai.request(BASE).get("/albums").query({ userId: 1 });
    expect(res).to.have.status(200);
    expect(res.body).to.be.an("array");
    if (res.body.length) {
      expect(res.body[0]).to.have.property("userId", 1);
    }
  });

  it("GET /photos?albumId=1 filtra fotos por álbum", async () => {
    const res = await chai.request(BASE).get("/photos").query({ albumId: 1 });
    expect(res).to.have.status(200);
    expect(res.body).to.be.an("array");
    if (res.body.length) {
      expect(res.body[0]).to.have.property("albumId", 1);
    }
  });
});
