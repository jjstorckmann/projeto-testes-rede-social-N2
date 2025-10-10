// test/unit/analytics.unit.test.js
const chai = require("chai");
const assert = chai.assert;
const expect = chai.expect;
chai.should();

const {
  getUserStats,
  rankUsersByEngagement,
} = require("../../src/analytics/analytics");

describe("analytics (unit)", () => {
  it("getUserStats calcula métricas agregadas usando deps fakes (sem rede)", async () => {
    // deps fakes: cada função retorna dados controlados
    const deps = {
      users: { getUserById: async (id) => ({ id }) },
      posts: { getPostsByUser: async () => [{ id: 10 }, { id: 11 }] },
      comments: {
        getCommentsByPosts: async () => [[{ id: 1 }], [{ id: 2 }, { id: 3 }]],
      },
      todos: {
        getTodosByUser: async () => [{ completed: true }, { completed: false }],
      },
      albums: { getAlbumsByUser: async () => [{ id: 7 }] },
      pics: { getPicsByAlbum: async () => [{ id: 99 }] },
    };

    const s = await getUserStats(deps, 1);

    // assert
    assert.strictEqual(s.userId, 1);
    assert.strictEqual(s.totalPosts, 2);
    assert.strictEqual(s.totalCommentsOnUserPosts, 3);

    // expect
    expect(s.totalTodos).to.equal(2);
    expect(s.doneTodos).to.equal(1);
    expect(s.totalAlbums).to.equal(1);

    // should
    s.totalPics.should.equal(1);
  });

  it("rankUsersByEngagement ordena pelo maior comments/post", () => {
    const ranked = rankUsersByEngagement([
      { userId: 1, totalPosts: 2, totalCommentsOnUserPosts: 6 }, // 3.0
      { userId: 2, totalPosts: 3, totalCommentsOnUserPosts: 3 }, // 1.0
      { userId: 3, totalPosts: 0, totalCommentsOnUserPosts: 5 }, // 0 (divisão por zero protegida)
    ]);

    ranked.should.be.an("array").with.lengthOf(3);
    ranked[0].userId.should.equal(1);
    ranked[0].commentsPerPost.should.equal(3);
    ranked[2].userId.should.equal(3);
    ranked[2].commentsPerPost.should.equal(0);
  });
});
