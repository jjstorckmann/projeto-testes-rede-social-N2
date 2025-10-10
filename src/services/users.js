// src/services/users.js
// Service de usuários com base parametrizável (factory) + export default para JSONPlaceholder

const http = require("../http/client");

// Base padrão: JSONPlaceholder (mantém compatível com o que já existia)
const DEFAULT_BASE = "https://jsonplaceholder.typicode.com";

/**
 * Cria um service de usuários apontando para a base informada.
 * @param {string} baseUrl
 * @returns {{ getUsers:Function, getUserById:Function, searchUsersByName:Function }}
 */
function makeUsers(baseUrl = DEFAULT_BASE) {
  async function getUsers() {
    const res = await http.get(`${baseUrl}/users`);
    return res.data;
  }

  async function getUserById(id) {
    const res = await http.get(`${baseUrl}/users/${id}`);
    return res.data;
  }

  /**
   * Busca por parte do nome (case-insensitive) em memória.
   * Útil para testes unitários sem rede.
   */
  async function searchUsersByName(term) {
    if (!term || typeof term !== "string") return [];
    const all = await getUsers();
    const q = term.trim().toLowerCase();
    return all.filter((u) =>
      String(u.name || "")
        .toLowerCase()
        .includes(q)
    );
  }

  return { getUsers, getUserById, searchUsersByName };
}

// Export default (apontando para JSONPlaceholder) para não quebrar imports atuais
const defaultUsers = makeUsers();

module.exports = {
  ...defaultUsers, // getUsers, getUserById, searchUsersByName
  makeUsers, // factory para usar outra base (ex.: My JSON Server)
  DEFAULT_BASE, // constante para testes que verificam URL
};
