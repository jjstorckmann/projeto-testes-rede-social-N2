async function carregarUsuarios() {
  try {
    const res = await fetch("http://localhost:3000/users");
    const users = await res.json();

    const tbody = document.querySelector("#usersTable tbody");

    users.forEach((u) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
                <td>${u.id}</td>
                <td>${u.name}</td>
                <td>${u.username}</td>
                <td>${u.email}</td>
            `;
      tbody.appendChild(tr);
    });

    document.getElementById("loader").style.display = "none";
    document.getElementById("usersTable").style.display = "table";
  } catch (err) {
    document.getElementById("loader").innerText = "Erro ao carregar usuários.";
  }
}

carregarUsuarios();
