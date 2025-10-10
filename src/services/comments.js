// src/services/comments.js
// Service de comentários com base parametrizável (factory) + default JSONPlaceholder

const http = require("../http/client");

// Base padrão: JSONPlaceholder
const DEFAULT_BASE = "https://jsonplaceholder.typicode.com";

/**
 * Cria um service de comentários apontando para a base informada.
 * @param {string} baseUrl
 * @returns {{ getComments:Function, getCommentsByPost:Function, getCommentsByPosts:Function }}
 */
function makeComments(baseUrl = DEFAULT_BASE) {
  async function getComments() {
    const res = await http.get(`${baseUrl}/comments`);
    return res.data;
  }

  async function getCommentsByPost(postId) {
    const res = await http.get(`${baseUrl}/comments`, { params: { postId } });
    return res.data;
  }

  /**
   * Para cada postId, busca seus comentários e retorna um array de arrays
   * preservando a ordem dos postIds fornecidos.
   * @param {Array<number|string>} postIds
   * @returns {Promise<Array<Array>>}
   */
  async function getCommentsByPosts(postIds = []) {
    if (!Array.isArray(postIds) || postIds.length === 0) return [];
    return Promise.all(postIds.map((id) => getCommentsByPost(id)));
  }

  return { getComments, getCommentsByPost, getCommentsByPosts };
}

// Export default (JSONPlaceholder) para manter compatibilidade com imports atuais
const defaultComments = makeComments();

module.exports = {
  ...defaultComments, // getComments, getCommentsByPost, getCommentsByPosts
  makeComments, // factory para usar outra base (ex.: My JSON Server)
  DEFAULT_BASE, // constante útil em testes
};
