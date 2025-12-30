function renderDashboard(reports) {
  const container = document.getElementById("dashboardList");
  container.innerHTML = "";

  if (!Array.isArray(reports) || reports.length === 0) {
    container.innerHTML = "<p>Sem ocorrências activas no momento.</p>";
    return;
  }

  reports.forEach((report) => {
    const item = document.createElement("div");
    item.className = "dashboard-item";

    const title = document.createElement("strong");
    title.textContent = `${report.avenida} · ${report.local}`;

    const details = document.createElement("div");
    details.textContent = `${report.evento} · ${report.total} reportes · Último: ${report.ultimoReporte}`;

    item.appendChild(title);
    item.appendChild(details);
    container.appendChild(item);
  });
}

async function loadDashboard() {
  const response = await apiGet("getOcorrencias");
  const reports = response.dados || response;
  renderDashboard(reports);
}
