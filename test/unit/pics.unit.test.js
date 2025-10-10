const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");
const http = require("../../src/http/client");
const pics = require("../../src/services/pics");

describe("pics service (unit + stubs)", () => {
  afterEach(() => sinon.restore());

  it("getPicsByAlbum(1) chama GET .../photos?albumId=1", async () => {
    const fake = [{ id: 1, albumId: 1 }];
    const stub = sinon.stub(http, "get").resolves({ data: fake });
    const res = await pics.getPicsByAlbum(1);
    expect(res).to.deep.equal(fake);
    expect(
      stub.calledWithMatch(`${pics.DEFAULT_BASE}/photos`, {
        params: { albumId: 1 },
      })
    ).to.equal(true);
  });
});
