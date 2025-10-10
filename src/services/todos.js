// src/services/todos.js
// Service de tarefas (todos) com base parametrizável (factory) + default JSONPlaceholder

const http = require("../http/client");

// Base padrão: JSONPlaceholder
const DEFAULT_BASE = "https://jsonplaceholder.typicode.com";

/**
 * Cria um service de todos apontando para a base informada.
 * @param {string} baseUrl
 * @returns {{ getTodos:Function, getTodoById:Function, getTodosByUser:Function, markTodoDone:Function, toggleTodo:Function }}
 */
function makeTodos(baseUrl = DEFAULT_BASE) {
  async function getTodos() {
    const res = await http.get(`${baseUrl}/todos`);
    return res.data;
  }

  async function getTodoById(id) {
    const res = await http.get(`${baseUrl}/todos/${id}`);
    return res.data;
  }

  async function getTodosByUser(userId) {
    const res = await http.get(`${baseUrl}/todos`, { params: { userId } });
    return res.data;
  }

  // Helpers puros (sem rede), úteis para unit tests
  function markTodoDone(todo) {
    const t = todo || {};
    return { ...t, completed: true };
  }

  function toggleTodo(todo) {
    const t = todo || {};
    return { ...t, completed: !Boolean(t.completed) };
  }

  return { getTodos, getTodoById, getTodosByUser, markTodoDone, toggleTodo };
}

// Export default (JSONPlaceholder) para manter compatibilidade com imports atuais
const defaultTodos = makeTodos();

module.exports = {
  ...defaultTodos, // getTodos, getTodoById, getTodosByUser, markTodoDone, toggleTodo
  makeTodos, // factory para usar outra base (ex.: My JSON Server)
  DEFAULT_BASE, // constante útil em testes
};
