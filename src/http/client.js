// src/http/client.js

const axios = require("axios");

const client = axios.create({
  timeout: 8000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Interceptor de resposta: retorna só `data` por padrão quando fizer sentido
client.interceptors.response.use(
  (res) => res, // mantenha o objeto completo; serviços decidem usar res.data
  (err) => {
    // Normaliza a mensagem de erro para facilitar asserções em testes
    const status = err.response?.status;
    const url = err.config?.url;
    const method = err.config?.method?.toUpperCase();
    const msg = `[HTTP ${method || "REQ"}] ${url || ""} -> ${
      status || "ERR"
    }: ${err.message}`;
    // Repassa um erro mantendo o original para depuração
    const wrapped = new Error(msg);
    wrapped.cause = err;
    throw wrapped;
  }
);

module.exports = client;
