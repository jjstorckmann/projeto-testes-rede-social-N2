// test/integration/analytics.myjsonserver.integration.test.js
const chai = require("chai");
const expect = chai.expect;

// Vamos usar as deps do arquivo src/dependecies/myjsonserver.js.
// Ele precisa estar configurado com o seu repo: https://my-json-server.typicode.com/<user>/<repo>
function depsConfiguradas() {
  try {
    const deps = require("../../src/dependecies/myjsonserver");
    // sanity check mínimo
    return Boolean(deps && deps.users && deps.posts && deps.comments);
  } catch (_) {
    return false;
  }
}

describe("analytics com My JSON Server (integração)", function () {
  let deps, getUserStats;

  before(function () {
    if (!depsConfiguradas()) this.skip(); // pula até você configurar o BASE no myjsonserver.js
    deps = require("../../src/dependecies/myjsonserver");
    getUserStats = require("../../src/analytics/analytics").getUserStats;
  });

  it("getUserStats(deps, 1) funciona com o seu db.json (ajuste o ID conforme seus dados)", async function () {
    const s = await getUserStats(deps, 1); // troque 1 por um userId válido do seu db.json, se preciso
    expect(s).to.be.an("object");
    expect(s).to.have.property("userId");
    // Como o conteúdo do db.json é seu, mantemos validações genéricas:
    expect(s.totalPosts).to.satisfy((n) => typeof n === "number");
    expect(s.totalTodos).to.satisfy((n) => typeof n === "number");
    expect(s.totalAlbums).to.satisfy((n) => typeof n === "number");
    expect(s.totalPics).to.satisfy((n) => typeof n === "number");
  });
});
