// test/unit/users.unit.test.js
const chai = require("chai");
const expect = chai.expect;
const assert = chai.assert;

const sinon = require("sinon");

const http = require("../../src/http/client"); // para stubar .get
const users = require("../../src/services/users"); // módulo alvo (factory + default)

describe("users service (unit + sinon stubs)", () => {
  afterEach(() => sinon.restore());

  it("getUserById(1) chama GET .../users/1", async () => {
    const fake = { id: 1, name: "Mock User" };
    const stub = sinon.stub(http, "get").resolves({ data: fake });

    const res = await users.getUserById(1);

    expect(res).to.deep.equal(fake);
    expect(stub.calledOnce).to.equal(true);

    // Usando DEFAULT_BASE após a refatoração
    expect(stub.calledWith(`${users.DEFAULT_BASE}/users/1`)).to.equal(true);

    // Alternativa robusta (se preferir): confere apenas o sufixo
    // expect(stub.calledWithMatch(sinon.match((url) => url.endsWith('/users/1')))).to.equal(true);
  });

  it("getUsers() chama GET .../users", async () => {
    const fake = [{ id: 1 }, { id: 2 }];
    const stub = sinon.stub(http, "get").resolves({ data: fake });

    const res = await users.getUsers();

    assert.isArray(res);
    assert.lengthOf(res, 2);
    expect(stub.calledOnce).to.equal(true);
    expect(stub.calledWith(`${users.DEFAULT_BASE}/users`)).to.equal(true);

    // Alternativa robusta:
    // expect(stub.calledWithMatch(sinon.match((url) => url.endsWith('/users')))).to.equal(true);
  });

  it("searchUsersByName() filtra corretamente sem bater na rede (stubando getUsers)", async () => {
    // Stub do próprio users.getUsers para evitar rede
    const stubGetUsers = sinon.stub(users, "getUsers").resolves([
      { id: 1, name: "Caio Zafalon" },
      { id: 2, name: "Jairo Storckmann Jr" },
      { id: 3, name: "Nicolas de Bona" },
      { id: 4, name: "Franciele" },
      { id: 5, name: "Vitor" },
    ]);

    const results = await users.searchUsersByName("Ca");

    expect(results).to.be.an("array").with.lengthOf(1);
    expect(results[0]).to.have.property("name", "Caio Zafalon");

    // garante que usamos o stub de users.getUsers e não o http direto
    expect(stubGetUsers.calledOnce).to.equal(true);
  });
});
