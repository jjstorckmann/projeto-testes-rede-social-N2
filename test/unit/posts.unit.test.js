const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");
const http = require("../../src/http/client");
const posts = require("../../src/services/posts");

describe("posts service (unit + stubs)", () => {
  afterEach(() => sinon.restore());

  it("getPosts() chama GET .../posts", async () => {
    const fake = [{ id: 1 }];
    const stub = sinon.stub(http, "get").resolves({ data: fake });
    const res = await posts.getPosts();
    expect(res).to.deep.equal(fake);
    expect(stub.calledWith(`${posts.DEFAULT_BASE}/posts`)).to.equal(true);
  });

  it("getPostsByUser(1) chama GET .../posts?userId=1", async () => {
    const fake = [{ id: 1, userId: 1 }];
    const stub = sinon.stub(http, "get").resolves({ data: fake });
    const res = await posts.getPostsByUser(1);
    expect(res).to.deep.equal(fake);
    expect(
      stub.calledWithMatch(`${posts.DEFAULT_BASE}/posts`, {
        params: { userId: 1 },
      })
    ).to.equal(true);
  });
});
