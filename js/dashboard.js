function formatarHora(isoString) {
  const d = new Date(isoString);
  return d.toLocaleTimeString("pt-PT", {
    hour: "2-digit",
    minute: "2-digit"
  });
}

function agruparOcorrencias(reports) {
  const mapa = {};

  reports.forEach((r) => {
    const chave = `${r.avenida}|${r.local}|${r.evento}`;

    if (!mapa[chave]) {
      mapa[chave] = {
        avenida: r.avenida,
        local: r.local,
        evento: r.evento,
        total: 0,
        ultimoReporte: r.ultimoReporte
      };
    }

    mapa[chave].total += r.total;

    if (new Date(r.ultimoReporte) > new Date(mapa[chave].ultimoReporte)) {
      mapa[chave].ultimoReporte = r.ultimoReporte;
    }
  });

  return Object.values(mapa);
}

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
    details.textContent = `${report.evento} · ${report.total} reportes · Último: ${formatarHora(report.ultimoReporte)}`;

    item.appendChild(title);
    item.appendChild(details);
    container.appendChild(item);
  });
}

async function loadDashboard() {
  const response = await apiGet("getOcorrencias");
  const reports = response.dados || response;
  const agrupados = agruparOcorrencias(reports);
  renderDashboard(agrupados);
}
