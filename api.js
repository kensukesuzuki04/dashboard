// Shared API helper. Loaded by all pages.

async function apiCall(payload) {
  const pw = sessionStorage.getItem('prof_pw');
  const token = new URLSearchParams(window.location.search).get('token');
  const body = { ...payload };
  if (pw)    body.password = pw;
  if (token) body.token    = token;

  const res = await fetch(CONFIG.API_URL, {
    method: 'POST',
    redirect: 'follow',
    headers: { 'Content-Type': 'text/plain' }, // avoids CORS preflight with GAS
    body: JSON.stringify(body)
  });
  return res.json();
}

function escHtml(s) {
  return String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function today() {
  return new Date().toISOString().split('T')[0];
}
