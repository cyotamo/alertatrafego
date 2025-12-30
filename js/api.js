const API_URL = "https://script.google.com/macros/s/AKfycbxz8YIIEbYVflpApwZhBfhVrlc85sC1CyqxMGuK3qwLykH6VNkcwStNxiKVQ7PcXr6h/exec";

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
