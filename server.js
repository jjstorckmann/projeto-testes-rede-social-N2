// server.js
const express = require("express");
const cors = require("cors");
const path = require("path");

// Carrega dados mockados do db.json
// Certifique-se de que db.json está na raiz do projeto.
// Exemplo de estrutura esperada:
// {
//   "users": [...],
//   "posts": [...],
//   "comments": [...],
//   "todos": [...],
//   "albums": [...],
//   "photos": [...]
// }
const db = require("./db.json");

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares básicos
app.use(cors());
app.use(express.json());

// Endpoints REST mockados

app.get("/users", (req, res) => {
  res.json(db.users || []);
});

app.get("/posts", (req, res) => {
  res.json(db.posts || []);
});

app.get("/comments", (req, res) => {
  res.json(db.comments || []);
});

app.get("/todos", (req, res) => {
  res.json(db.todos || []);
});

app.get("/albums", (req, res) => {
  res.json(db.albums || []);
});

// Extra: fotos, caso queira usar no frontend
app.get("/photos", (req, res) => {
  res.json(db.photos || []);
});

// Servir os arquivos estáticos do frontend em /public
// Exemplo: http://localhost:3000/posts.html
const publicDir = path.join(__dirname, "public");
app.use(express.static(publicDir));

// Rota padrão para checagem rápida
app.get("/", (req, res) => {
  res.send(
    "Servidor mock N3 está rodando. Use /users, /posts, /comments, /todos, /albums."
  );
});

// 404 para qualquer rota não encontrada (importante para testes de erro de UI)
app.use((req, res) => {
  res.status(404).json({ error: "Rota não encontrada" });
});

// Sobe o servidor
app.listen(PORT, () => {
  console.log(`Servidor mock rodando em http://localhost:${PORT}`);
});
