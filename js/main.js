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
    setLoadingBotao(btnRelatorios, true);
    dashboardSection.classList.remove("hidden");
    reportSection.classList.add("hidden");

    try {
      await loadDashboard();
    } finally {
      setLoadingBotao(btnRelatorios, false);
    }
  });

  btnEnviar.addEventListener("click", submitReport);

  init();
});

function setLoadingBotao(botao, loading) {
  const text = botao.querySelector(".btn-text");
  const spinner = botao.querySelector(".btn-spinner");

  if (loading) {
    text.classList.add("hidden");
    spinner.classList.remove("hidden");
    botao.disabled = true;
  } else {
    text.classList.remove("hidden");
    spinner.classList.add("hidden");
    botao.disabled = false;
  }
}

async function init() {
  try {
    const meta = await apiGet("getMeta");
    initReport(meta);
  } catch (error) {
    const statusEl = document.getElementById("reportStatus");
    statusEl.textContent = "Não foi possível carregar os dados iniciais.";
  }
}
