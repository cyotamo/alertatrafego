document.addEventListener("DOMContentLoaded", () => {
  const reportSection = document.getElementById("reportSection");
  const dashboardSection = document.getElementById("dashboardSection");
  const btnReportar = document.getElementById("btnReportar");
  const btnRelatorios = document.getElementById("btnRelatorios");
  const btnEnviar = document.getElementById("btnEnviar");

  btnReportar.addEventListener("click", () => {
    reportSection.classList.remove("hidden");
    dashboardSection.classList.add("hidden");
  });

  btnRelatorios.addEventListener("click", async () => {
    dashboardSection.classList.remove("hidden");
    reportSection.classList.add("hidden");
    await loadDashboard();
  });

  btnEnviar.addEventListener("click", submitReport);

  init();
});

async function init() {
  try {
    const meta = await apiGet("getMeta");
    initReport(meta);
  } catch (error) {
    const statusEl = document.getElementById("reportStatus");
    statusEl.textContent = "Não foi possível carregar os dados iniciais.";
  }
}
