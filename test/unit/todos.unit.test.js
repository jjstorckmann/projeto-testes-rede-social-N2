const chai = require("chai");
const expect = chai.expect;
const assert = chai.assert;
const sinon = require("sinon");
const http = require("../../src/http/client");
const todos = require("../../src/services/todos");

describe("todos service (unit + stubs)", () => {
  afterEach(() => sinon.restore());

  it("getTodosByUser(1) chama GET .../todos?userId=1", async () => {
    const fake = [{ id: 1, userId: 1 }];
    const stub = sinon.stub(http, "get").resolves({ data: fake });
    const res = await todos.getTodosByUser(1);
    expect(res).to.deep.equal(fake);
    expect(
      stub.calledWithMatch(`${todos.DEFAULT_BASE}/todos`, {
        params: { userId: 1 },
      })
    ).to.equal(true);
  });

  it("toggleTodo alterna completed (puro)", () => {
    const t1 = { id: 1, completed: false };
    const t2 = todos.toggleTodo(t1);
    assert.isTrue(t2.completed);
    expect(t1.completed).to.equal(false); // imutável
  });
});
