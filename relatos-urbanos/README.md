# Relatos Urbanos

Frontend estático para registo e visualização de ocorrências urbanas.

## Como funciona

- O HTML é estático.
- O JavaScript comunica com uma Google Sheets exposta via Google Apps Script Web App.
- Todas as chamadas são feitas com `fetch()`.

## Endpoints esperados

- `GET  /exec?action=getMeta`
- `GET  /exec?action=getReports`
- `POST /exec?action=report`

## Configuração

1. Abra `js/api.js`.
2. Substitua `COLOCAR_AQUI_URL_DO_WEB_APP` pela URL do seu Web App do Apps Script.

## Estrutura

```
/relatos-urbanos
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── api.js
│   ├── report.js
│   ├── dashboard.js
│   └── main.js
└── README.md
```
