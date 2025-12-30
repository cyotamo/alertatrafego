function formatarHora(isoString) {
  const d = new Date(isoString);
  return d.toLocaleTimeString("pt-PT", {
    hour: "2-digit",
    minute: "2-digit"
  });
}

function agruparHierarquico(reports) {
  const tree = {};

  reports.forEach((r) => {
    if (!tree[r.avenida]) {
      tree[r.avenida] = {};
    }

    if (!tree[r.avenida][r.local]) {
      tree[r.avenida][r.local] = [];
    }

    tree[r.avenida][r.local].push({
      evento: r.evento,
      total: r.total,
      ultimoReporte: r.ultimoReporte
    });
  });

  return tree;
}

function renderDashboard(reports) {
  const container = document.getElementById("dashboardList");
  container.innerHTML = "";

  if (!reports || Object.keys(reports).length === 0) {
    container.innerHTML = "<p>Sem ocorrências activas no momento.</p>";
    return;
  }

  Object.entries(reports).forEach(([avenida, locais]) => {
    const avenidaSection = document.createElement("div");
    avenidaSection.className = "dashboard-avenida";

    const avenidaTitle = document.createElement("strong");
    avenidaTitle.textContent = avenida;
    avenidaSection.appendChild(avenidaTitle);

    Object.entries(locais).forEach(([local, eventos]) => {
      const localSection = document.createElement("div");
      localSection.className = "dashboard-local";

      const localTitle = document.createElement("div");
      localTitle.className = "local-titulo";   // 👈 ESTA LINHA
      localTitle.textContent = local;
      localSection.appendChild(localTitle);


      eventos.forEach((evento) => {
        const item = document.createElement("div");
        item.className = "dashboard-item";

        const details = document.createElement("div");
        details.textContent = `${evento.evento} · ${evento.total} reportes · Último: ${formatarHora(evento.ultimoReporte)}`;

        item.appendChild(details);
        localSection.appendChild(item);
      });

      avenidaSection.appendChild(localSection);
    });

    container.appendChild(avenidaSection);
  });
}

async function loadDashboard() {
  const response = await apiGet("getOcorrencias");
  const reports = response.dados || response;
  const dadosAgrupados = agruparHierarquico(reports);
  renderDashboard(dadosAgrupados);
}
