const { makeUsers } = require("../services/users");
const { makePosts } = require("../services/posts");
const { makeComments } = require("../services/comments");
const { makeTodos } = require("../services/todos");
const { makeAlbums } = require("../services/albums");
const { makePics } = require("../services/pics");

function buildDeps(baseUrl) {
  return {
    users: makeUsers(baseUrl),
    posts: makePosts(baseUrl),
    comments: makeComments(baseUrl),
    todos: makeTodos(baseUrl),
    albums: makeAlbums(baseUrl),
    pics: makePics(baseUrl),
  };
}
module.exports = { buildDeps };
