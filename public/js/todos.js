// public/js/todos.js

async function carregarTodos() {
  const loader = document.getElementById("loader");
  const tabela = document.getElementById("todosTable");
  const tbody = tabela.querySelector("tbody");

  try {
    const resposta = await fetch("http://localhost:3000/todos");

    if (!resposta.ok) {
      throw new Error("Erro ao buscar tarefas na API");
    }

    const todos = await resposta.json();

    todos.forEach((t) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
                <td>${t.id}</td>
                <td>${t.userId}</td>
                <td>${t.title}</td>
                <td>${t.completed ? "Sim" : "Não"}</td>
            `;
      tbody.appendChild(tr);
    });

    loader.style.display = "none";
    tabela.style.display = "table";
  } catch (erro) {
    loader.innerText = "Erro ao carregar tarefas.";
    console.error("Falha ao carregar tarefas:", erro);
  }
}

carregarTodos();
