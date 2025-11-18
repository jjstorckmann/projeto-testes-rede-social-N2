// public/js/comments.js

async function carregarComentarios() {
  const loader = document.getElementById("loader");
  const tabela = document.getElementById("commentsTable");
  const tbody = tabela.querySelector("tbody");

  try {
    const resposta = await fetch("http://localhost:3000/comments");

    if (!resposta.ok) {
      throw new Error("Erro ao buscar dados da API");
    }

    const comentarios = await resposta.json();

    comentarios.forEach((c) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
                <td>${c.id}</td>
                <td>${c.postId}</td>
                <td>${c.name}</td>
                <td>${c.email}</td>
                <td>${c.body}</td>
            `;
      tbody.appendChild(tr);
    });

    loader.style.display = "none";
    tabela.style.display = "table";
  } catch (erro) {
    loader.innerText = "Erro ao carregar os comments.";
    console.error("Falha ao carregar comentarios:", erro);
  }
}

carregarComentarios();
