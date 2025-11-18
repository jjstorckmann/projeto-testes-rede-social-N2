// public/js/albums.js

async function carregarAlbuns() {
  const loader = document.getElementById("loader");
  const tabela = document.getElementById("albumsTable");
  const tbody = tabela.querySelector("tbody");

  try {
    const resposta = await fetch("http://localhost:3000/albums");

    if (!resposta.ok) {
      throw new Error("Erro a API");
    }

    const albuns = await resposta.json();

    albuns.forEach((album) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
                <td>${album.id}</td>
                <td>${album.userId}</td>
                <td>${album.title}</td>
            `;
      tbody.appendChild(tr);
    });

    loader.style.display = "none";
    tabela.style.display = "table";
  } catch (erro) {
    loader.innerText = "Erro ao carregar.";
    console.error("Falha ao carregar os albuns:", erro);
  }
}

carregarAlbuns();
