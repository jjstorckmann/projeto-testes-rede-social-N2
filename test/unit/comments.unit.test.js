// test/unit/comments.unit.test.js
const chai = require("chai");
const expect = chai.expect;

const sinon = require("sinon");

const http = require("../../src/http/client"); // para stubar .get
const comments = require("../../src/services/comments"); // módulo alvo

describe("comments service (unit + sinon stubs)", () => {
  afterEach(() => sinon.restore());

  it("getCommentsByPost(1) chama GET .../comments?postId=1", async () => {
    const fake = [
      { id: 10, postId: 1 },
      { id: 11, postId: 1 },
    ];

    const stub = sinon.stub(http, "get").resolves({ data: fake });

    const res = await comments.getCommentsByPost(1);

    expect(res).to.deep.equal(fake);
    expect(stub.calledOnce).to.equal(true);
    // confere URL e querystring via { params: { postId: 1 } }
    expect(
      stub.calledWithMatch(`${comments.BASE}/comments`, {
        params: { postId: 1 },
      })
    ).to.equal(true);
  });

  it("getCommentsByPosts([1,2]) chama duas vezes e preserva a ordem dos resultados", async () => {
    // stubamos a função do próprio módulo para controlar o retorno por postId
    const stub = sinon.stub(comments, "getCommentsByPost");
    stub.withArgs(1).resolves([{ id: 100, postId: 1 }]);
    stub.withArgs(2).resolves([
      { id: 200, postId: 2 },
      { id: 201, postId: 2 },
    ]);

    const results = await comments.getCommentsByPosts([1, 2]);

    // duas chamadas (uma por postId)
    expect(stub.callCount).to.equal(2);

    // preserva a ordem: índice 0 -> postId 1; índice 1 -> postId 2
    expect(results).to.be.an("array").with.lengthOf(2);
    expect(results[0]).to.deep.equal([{ id: 100, postId: 1 }]);
    expect(results[1]).to.deep.equal([
      { id: 200, postId: 2 },
      { id: 201, postId: 2 },
    ]);
  });
});
