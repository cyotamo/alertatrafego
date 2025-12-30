function renderDashboard(reports) {
  const list = document.getElementById("dashboardList");
  list.innerHTML = "";

  if (!reports || reports.length === 0) {
    const empty = document.createElement("p");
    empty.textContent = "Sem ocorrências activas no momento.";
    list.appendChild(empty);
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
    list.appendChild(item);
  });
}

async function loadDashboard() {
  const reports = await apiGet("getReports");
  renderDashboard(reports);
}
