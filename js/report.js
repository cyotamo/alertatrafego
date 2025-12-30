let reportMeta = null;

function initReport(meta) {
  reportMeta = meta;
  const avenidaSelect = document.getElementById("avenidaSelect");
  const localSelect = document.getElementById("localSelect");
  const eventoSelect = document.getElementById("eventoSelect");

  localSelect.disabled = true;
  eventoSelect.disabled = true;

  fillSelect(avenidaSelect, Object.keys(meta.avenidas || {}));
  fillSelect(localSelect, []);
  fillSelect(eventoSelect, meta.eventos || []);

  avenidaSelect.addEventListener("change", () => {
    const avenida = avenidaSelect.value;
    const locais = (reportMeta.avenidas && reportMeta.avenidas[avenida]) || [];
    fillSelect(localSelect, locais);
    localSelect.disabled = !avenidaSelect.value;
    eventoSelect.disabled = true;
    eventoSelect.value = "";
  });

  localSelect.addEventListener("change", () => {
    eventoSelect.disabled = !localSelect.value;
    if (!localSelect.value) {
      eventoSelect.value = "";
    }
  });

  if (avenidaSelect.value) {
    avenidaSelect.dispatchEvent(new Event("change"));
  }
}

function fillSelect(selectEl, items) {
  selectEl.innerHTML = "";
  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = "Seleccione";
  placeholder.disabled = true;
  placeholder.selected = true;
  selectEl.appendChild(placeholder);

  items.forEach((item) => {
    const option = document.createElement("option");
    option.value = item;
    option.textContent = item;
    selectEl.appendChild(option);
  });
}

async function submitReport() {
  const avenida = document.getElementById("avenidaSelect").value;
  const local = document.getElementById("localSelect").value;
  const evento = document.getElementById("eventoSelect").value;
  const statusEl = document.getElementById("reportStatus");

  if (!avenida || !local || !evento) {
    statusEl.textContent = "Preencha todos os campos antes de enviar.";
    return;
  }

  statusEl.textContent = "A enviar...";

  try {
    const response = await apiPost("report", { avenida, local, evento });
    statusEl.textContent = response && response.message
      ? response.message
      : "Reporte enviado com sucesso.";

    const avenidaSelect = document.getElementById("avenidaSelect");
    const localSelect = document.getElementById("localSelect");
    const eventoSelect = document.getElementById("eventoSelect");

    avenidaSelect.value = "";
    localSelect.value = "";
    eventoSelect.value = "";
    localSelect.disabled = true;
    eventoSelect.disabled = true;
  } catch (error) {
    statusEl.textContent = "Não foi possível enviar o reporte.";
  }
}
