// generateReport.js
const fs = require("fs");

const path = require("path");
const data = JSON.parse(
  fs.readFileSync(path.join(__dirname, "report.json"), "utf-8")
);

// Função para exibir JSON legível
function prettyPrintJson(obj) {
  return `<pre style="white-space: pre-wrap; font-family: monospace; font-size: 0.9em;">${JSON.stringify(
    obj,
    null,
    2
  )}</pre>`;
}

// Função para extrair dados resumidos para gráficos
function extractSummary(data) {
  const errorCounts = {};
  const vusByName = {};
  let totalRequests = 0;

  if (data.aggregate && data.aggregate.counters) {
    const counters = data.aggregate.counters;

    for (const key in counters) {
      if (key.startsWith("errors.")) {
        errorCounts[key.replace("errors.", "")] = counters[key];
      }
      if (key.startsWith("vusers.created_by_name.")) {
        vusByName[key.replace("vusers.created_by_name.", "")] = counters[key];
      }
    }

    if (counters["http.requests"]) totalRequests = counters["http.requests"];
  }

  return { errorCounts, vusByName, totalRequests };
}

// Função para gerar tabela HTML de objetos ou arrays
function renderTableFromObject(obj) {
  if (!obj || typeof obj !== "object")
    return "<p>Dados inválidos para tabela</p>";

  // Caso seja um array (intermediate)
  if (Array.isArray(obj)) {
    if (obj.length === 0) return "<p>Sem dados disponíveis</p>";

    const allKeys = new Set();
    obj.forEach((item) => {
      if (item.counters)
        Object.keys(item.counters).forEach((k) => allKeys.add(k));
    });
    const columns = Array.from(allKeys).sort();

    let tableHtml = `
      <table>
        <thead>
          <tr>
            <th>Passo</th>
            ${columns.map((col) => `<th>${col}</th>`).join("")}
          </tr>
        </thead>
        <tbody>
    `;
    obj.forEach((item, index) => {
      tableHtml += `<tr><td>${index + 1}</td>`;
      columns.forEach((col) => {
        const val =
          item.counters && item.counters[col] !== undefined
            ? item.counters[col]
            : "-";
        tableHtml += `<td>${val}</td>`;
      });
      tableHtml += "</tr>";
    });
    tableHtml += "</tbody></table>";
    return tableHtml;
  }

  // Caso seja um objeto com counters (aggregate)
  if (obj.counters && typeof obj.counters === "object") {
    const keys = Object.keys(obj.counters).sort();
    let tableHtml = `
      <table>
        <thead>
          <tr><th>Chave</th><th>Valor</th></tr>
        </thead>
        <tbody>
    `;
    keys.forEach((key) => {
      tableHtml += `<tr><td>${key}</td><td>${obj.counters[key]}</td></tr>`;
    });
    tableHtml += "</tbody></table>";
    return tableHtml;
  }

  // Caso geral para outros objetos
  const keys = Object.keys(obj).sort();
  let tableHtml = `
    <table>
      <thead>
        <tr><th>Chave</th><th>Valor</th></tr>
      </thead>
      <tbody>
  `;
  keys.forEach((key) => {
    let val = obj[key];
    if (typeof val === "object") val = JSON.stringify(val);
    tableHtml += `<tr><td>${key}</td><td>${val}</td></tr>`;
  });
  tableHtml += "</tbody></table>";
  return tableHtml;
}

// Extrai dados resumidos
const summary = extractSummary(data);

// Monta HTML
let html = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <title>Relatório Artillery</title>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; background: #f7f9fc; }
    h1, h2 { color: #333; }
    table { border-collapse: collapse; width: 90%; margin-top: 15px; background: white; box-shadow: 0 2px 8px rgba(0,0,0,0.1);}
    th, td { border: 1px solid #ddd; padding: 10px; vertical-align: top; }
    th { background-color: #f0f0f0; text-align: left; }
    td pre { margin: 0; }
    tr:nth-child(even) { background-color: #f9f9f9; }
    .collapsible {
      cursor: pointer;
      user-select: none;
      padding: 6px;
      background-color: #eee;
      border: none;
      text-align: left;
      outline: none;
      font-size: 14px;
      width: 100%;
      border-radius: 4px;
    }
    .content {
      display: none;
      padding: 10px;
      background-color: #fafafa;
      border: 1px solid #ddd;
      border-top: none;
      white-space: pre-wrap;
      font-family: monospace;
      font-size: 0.9em;
      margin-top: -10px;
      margin-bottom: 15px;
      border-radius: 0 0 4px 4px;
      max-height: 400px;
      overflow-y: auto;
    }
    .charts-row {
      display: flex;
      gap: 30px;
      flex-wrap: wrap;
      margin-bottom: 40px;
    }
    .chart-container {
      flex: 1 1 300px;
      max-width: 45%;
      background: white;
      padding: 10px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      border-radius: 6px;
    }
    canvas { width: 100% !important; height: 250px !important; }
  </style>
</head>
<body>
  <h1>Relatório Artillery</h1>

  <h2>Resumo da Análise</h2>
  <p><strong>Total de requisições feitas:</strong> ${summary.totalRequests}</p>
  <p><strong>Tipos de erros detectados:</strong> ${
    Object.keys(summary.errorCounts).length > 0
      ? Object.keys(summary.errorCounts).join(", ")
      : "Nenhum erro detectado"
  }</p>
  <p><strong>Total de usuários virtuais criados (VUs):</strong> ${Object.values(
    summary.vusByName
  ).reduce((a, b) => a + b, 0)}</p>

  <div class="charts-row">
    <div class="chart-container">
      <h3>Erros por tipo</h3>
      <canvas id="errorChart"></canvas>
    </div>
    <div class="chart-container">
      <h3>Usuários virtuais criados por tipo</h3>
      <canvas id="vusChart"></canvas>
    </div>
  </div>

  <table>
    <thead>
      <tr><th>Métrica</th><th>Valor</th></tr>
    </thead>
    <tbody>
`;

for (const key in data) {
  if (key === "intermediate" || key === "aggregate") {
    html += `
      <tr>
        <td>${key}</td>
        <td>
          ${renderTableFromObject(data[key])}
          <button class="collapsible">Mostrar/Esconder JSON completo</button>
          <div class="content">${prettyPrintJson(data[key])}</div>
        </td>
      </tr>
    `;
  } else if (typeof data[key] === "object" && data[key] !== null) {
    html += `
      <tr>
        <td>${key}</td>
        <td>
          <button class="collapsible">Mostrar/Esconder JSON</button>
          <div class="content">${prettyPrintJson(data[key])}</div>
        </td>
      </tr>
    `;
  } else {
    html += `<tr><td>${key}</td><td>${data[key]}</td></tr>`;
  }
}

html += `
    </tbody>
  </table>

  <script>
    // Toggle collapsible JSON
    document.querySelectorAll('.collapsible').forEach(btn => {
      btn.addEventListener('click', () => {
        const content = btn.nextElementSibling;
        content.style.display = content.style.display === "block" ? "none" : "block";
      });
    });

    // Gráfico de erros
    const errorLabels = ${JSON.stringify(Object.keys(summary.errorCounts))};
    const errorData = ${JSON.stringify(Object.values(summary.errorCounts))};
    new Chart(document.getElementById('errorChart').getContext('2d'), {
      type: 'bar',
      data: { labels: errorLabels, datasets: [{ label: 'Quantidade de erros', data: errorData, backgroundColor: 'rgba(255, 99, 132, 0.6)', borderColor: 'rgba(255, 99, 132, 1)', borderWidth: 1 }] },
      options: { responsive: true, scales: { y: { beginAtZero: true } }, plugins: { legend: { display: false } } }
    });

    // Gráfico de VUs
    const vusLabels = ${JSON.stringify(Object.keys(summary.vusByName))};
    const vusData = ${JSON.stringify(Object.values(summary.vusByName))};
    new Chart(document.getElementById('vusChart').getContext('2d'), {
      type: 'bar',
      data: { labels: vusLabels, datasets: [{ label: 'VUs Criados', data: vusData, backgroundColor: 'rgba(54, 162, 235, 0.6)', borderColor: 'rgba(54, 162, 235, 1)', borderWidth: 1 }] },
      options: { responsive: true, scales: { y: { beginAtZero: true } }, plugins: { legend: { display: false } } }
    });
  </script>
</body>
</html>
`;

fs.writeFileSync(path.join(__dirname, "report.html"), html);

console.log(
  "report.html gerado com gráficos e tabelas detalhadas para aggregate e intermediate!"
);
