// src/dependecies/myjsonserver.js
// Deps pré-configuradas para My JSON Server

const { buildDeps } = require("./builddeps");

// Ex.: https://my-json-server.typicode.com/<user>/<repo>
const BASE = "https://my-json-server.typicode.com/<user>/<repo>";

module.exports = buildDeps(BASE);
