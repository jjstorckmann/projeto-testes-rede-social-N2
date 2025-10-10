// src/dependecies/jsonplaceholder.js
// Deps pré-configuradas para JSONPlaceholder

const { buildDeps } = require("./builddeps");

const BASE = "https://jsonplaceholder.typicode.com";

module.exports = buildDeps(BASE);
