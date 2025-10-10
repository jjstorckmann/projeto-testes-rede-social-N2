// src/services/albums.js
// Service de álbuns com base parametrizável (factory) + default JSONPlaceholder

const http = require("../http/client");

// Base padrão: JSONPlaceholder
const DEFAULT_BASE = "https://jsonplaceholder.typicode.com";

/**
 * Cria um service de álbuns apontando para a base informada.
 * @param {string} baseUrl
 * @returns {{ getAlbums:Function, getAlbumById:Function, getAlbumsByUser:Function }}
 */
function makeAlbums(baseUrl = DEFAULT_BASE) {
  async function getAlbums() {
    const res = await http.get(`${baseUrl}/albums`);
    return res.data;
  }

  async function getAlbumById(id) {
    const res = await http.get(`${baseUrl}/albums/${id}`);
    return res.data;
  }

  async function getAlbumsByUser(userId) {
    const res = await http.get(`${baseUrl}/albums`, { params: { userId } });
    return res.data;
  }

  return { getAlbums, getAlbumById, getAlbumsByUser };
}

// Export default (JSONPlaceholder) para manter compatibilidade com imports atuais
const defaultAlbums = makeAlbums();

module.exports = {
  ...defaultAlbums, // getAlbums, getAlbumById, getAlbumsByUser
  makeAlbums, // factory para usar outra base (ex.: My JSON Server)
  DEFAULT_BASE, // constante útil em testes
};
