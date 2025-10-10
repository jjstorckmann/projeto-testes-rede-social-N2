// src/services/posts.js
// Service de posts com base parametrizável (factory) + export default para JSONPlaceholder

const http = require("../http/client");

// Base padrão: JSONPlaceholder
const DEFAULT_BASE = "https://jsonplaceholder.typicode.com";

/**
 * Cria um service de posts apontando para a base informada.
 * @param {string} baseUrl
 * @returns {{ getPosts:Function, getPostById:Function, getPostsByUser:Function, createFakePost:Function }}
 */
function makePosts(baseUrl = DEFAULT_BASE) {
  async function getPosts() {
    const res = await http.get(`${baseUrl}/posts`);
    return res.data;
  }

  async function getPostById(id) {
    const res = await http.get(`${baseUrl}/posts/${id}`);
    return res.data;
  }

  async function getPostsByUser(userId) {
    const res = await http.get(`${baseUrl}/posts`, { params: { userId } });
    return res.data;
  }

  /**
   * Cria um "post fake" em memória (sem rede), útil para unit tests.
   */
  function createFakePost(input) {
    const { userId, title, body } = input || {};
    return {
      id: 0, // marcador local
      userId,
      title: String(title || "").trim(),
      body: String(body || "").trim(),
      createdAt: new Date().toISOString(),
      _fake: true,
    };
  }

  return { getPosts, getPostById, getPostsByUser, createFakePost };
}

// Export default (JSONPlaceholder) para manter compatibilidade com imports atuais
const defaultPosts = makePosts();

module.exports = {
  ...defaultPosts, // getPosts, getPostById, getPostsByUser, createFakePost
  makePosts, // factory para usar outra base (ex.: My JSON Server)
  DEFAULT_BASE, // constante útil em testes
};
