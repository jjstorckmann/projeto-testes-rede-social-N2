// public/js/posts.js

async function carregarPosts() {
  const loader = document.getElementById("loader");
  const tabela = document.getElementById("postsTable");
  const tbody = tabela.querySelector("tbody");

  try {
    const resposta = await fetch("http://localhost:3000/posts");

    if (!resposta.ok) {
      throw new Error("Erro ao buscar posts na API");
    }

    const posts = await resposta.json();

    posts.forEach((p) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
                <td>${p.id}</td>
                <td>${p.userId}</td>
                <td>${p.title}</td>
                <td>${p.body}</td>
            `;
      tbody.appendChild(tr);
    });

    loader.style.display = "none";
    tabela.style.display = "table";
  } catch (erro) {
    loader.innerText = "Erro ao carregar posts.";
    console.error("Falha ao carregar posts:", erro);
  }
}

carregarPosts();
