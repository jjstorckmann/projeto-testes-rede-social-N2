// src/services/pics.js
// Service de fotos (photos) com base parametrizável (factory) + default JSONPlaceholder

const http = require("../http/client");

// Base padrão: JSONPlaceholder
const DEFAULT_BASE = "https://jsonplaceholder.typicode.com";

/**
 * Cria um service de fotos apontando para a base informada.
 * @param {string} baseUrl
 * @returns {{ getPics:Function, getPicById:Function, getPicsByAlbum:Function }}
 */
function makePics(baseUrl = DEFAULT_BASE) {
  async function getPics() {
    const res = await http.get(`${baseUrl}/photos`);
    return res.data;
  }

  async function getPicById(id) {
    const res = await http.get(`${baseUrl}/photos/${id}`);
    return res.data;
  }

  async function getPicsByAlbum(albumId) {
    const res = await http.get(`${baseUrl}/photos`, { params: { albumId } });
    return res.data;
  }

  return { getPics, getPicById, getPicsByAlbum };
}

// Export default (JSONPlaceholder) para manter compatibilidade com imports atuais
const defaultPics = makePics();

module.exports = {
  ...defaultPics, // getPics, getPicById, getPicsByAlbum
  makePics, // factory para usar outra base (ex.: My JSON Server)
  DEFAULT_BASE, // constante útil em testes
};
