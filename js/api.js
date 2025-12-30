const API_URL = "COLOCAR_AQUI_URL_DO_WEB_APP";

async function apiGet(action) {
  const res = await fetch(`${API_URL}?action=${action}`);
  return res.json();
}

async function apiPost(action, data) {
  const res = await fetch(`${API_URL}?action=${action}`, {
    method: "POST",
    body: JSON.stringify(data)
  });
  return res.json();
}
