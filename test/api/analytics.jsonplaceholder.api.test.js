// test/api/analytics.jsonplaceholder.api.test.js
const chai = require("chai");
const expect = chai.expect;

const deps = require("../../src/dependecies/jsonplaceholder");
const { getUserStats } = require("../../src/analytics/analytics");

describe("analytics com JSONPlaceholder (API real)", () => {
  it("getUserStats(deps, 1) retorna métricas plausíveis", async () => {
    const s = await getUserStats(deps, 1);

    expect(s).to.be.an("object");
    expect(s).to.have.all.keys(
      "userId",
      "totalPosts",
      "totalCommentsOnUserPosts",
      "totalTodos",
      "doneTodos",
      "totalAlbums",
      "totalPics"
    );

    expect(s.userId).to.equal(1);
    // checks não frágeis (apenas tipos/limites)
    expect(s.totalPosts)
      .to.be.a("number")
      .and.satisfy((n) => n >= 0);
    expect(s.totalCommentsOnUserPosts)
      .to.be.a("number")
      .and.satisfy((n) => n >= 0);
    expect(s.totalTodos)
      .to.be.a("number")
      .and.satisfy((n) => n >= 0);
    expect(s.doneTodos)
      .to.be.a("number")
      .and.satisfy((n) => n >= 0);
    expect(s.totalAlbums)
      .to.be.a("number")
      .and.satisfy((n) => n >= 0);
    expect(s.totalPics)
      .to.be.a("number")
      .and.satisfy((n) => n >= 0);
  });
});
