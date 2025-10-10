const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");
const http = require("../../src/http/client");
const albums = require("../../src/services/albums");

describe("albums service (unit + stubs)", () => {
  afterEach(() => sinon.restore());

  it("getAlbumsByUser(1) chama GET .../albums?userId=1", async () => {
    const fake = [{ id: 1, userId: 1 }];
    const stub = sinon.stub(http, "get").resolves({ data: fake });
    const res = await albums.getAlbumsByUser(1);
    expect(res).to.deep.equal(fake);
    expect(
      stub.calledWithMatch(`${albums.DEFAULT_BASE}/albums`, {
        params: { userId: 1 },
      })
    ).to.equal(true);
  });
});
