// src/analytics/analytics.js

/**
 * Calcula métricas de um usuário juntando vários serviços:
 * - totalPosts
 * - totalCommentsOnUserPosts
 * - totalTodos
 * - doneTodos
 * - totalAlbums
 * - totalPics
 *
 * @param {Object} deps - objeto com serviços injetados (users, posts, comments, todos, albums, pics)
 * @param {number|string} userId
 * @returns {Promise<Object>}
 */
async function getUserStats(deps, userId) {
  const { users, posts, comments, todos, albums, pics } = deps;

  // busca paralela de dados principais
  const [user, userPosts, userTodos, userAlbums] = await Promise.all([
    users.getUserById(userId),
    posts.getPostsByUser(userId),
    todos.getTodosByUser(userId),
    albums.getAlbumsByUser(userId),
  ]);

  // ids dos posts desse usuário
  const postIds = userPosts.map((p) => p.id);

  // busca comentários de cada post
  const commentsByPosts = await comments.getCommentsByPosts(postIds);
  const totalCommentsOnUserPosts = commentsByPosts.reduce(
    (acc, arr) => acc + arr.length,
    0
  );

  // busca fotos de cada álbum
  const picsByAlbums = await Promise.all(
    userAlbums.map((a) => pics.getPicsByAlbum(a.id))
  );
  const totalPics = picsByAlbums.reduce((acc, arr) => acc + arr.length, 0);

  return {
    userId: user.id,
    totalPosts: userPosts.length,
    totalCommentsOnUserPosts,
    totalTodos: userTodos.length,
    doneTodos: userTodos.filter((t) => t.completed).length,
    totalAlbums: userAlbums.length,
    totalPics,
  };
}

/**
 * Ordena usuários por engajamento (comentários por post).
 * @param {Array<Object>} userStatsArray
 * @returns {Array<Object>}
 */
function rankUsersByEngagement(userStatsArray) {
  return [...userStatsArray]
    .map((s) => ({
      ...s,
      commentsPerPost: s.totalPosts
        ? s.totalCommentsOnUserPosts / s.totalPosts
        : 0,
    }))
    .sort((a, b) => b.commentsPerPost - a.commentsPerPost);
}

module.exports = {
  getUserStats,
  rankUsersByEngagement,
};
