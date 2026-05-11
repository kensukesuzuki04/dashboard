async function apiCall(payload) {
  const pw     = sessionStorage.getItem('prof_pw');
  const profEm = sessionStorage.getItem('prof_email');
  const em     = sessionStorage.getItem('student_email');
  const spw    = sessionStorage.getItem('student_pw');
  const body = { ...payload };
  if (pw)           body.password         = pw;
  if (profEm || em) body.email            = profEm || em;
  if (spw)          body.student_password = spw;
  const res = await fetch(CONFIG.API_URL, {
    method: 'POST', redirect: 'follow',
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify(body)
  });
  return res.json();
}

function escHtml(s) {
  return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function today() { return new Date().toISOString().slice(0,10); }

function gcalLink(title, date) {
  const d  = date.replace(/-/g,'');
  const dt = new Date(date + 'T00:00:00');
  dt.setDate(dt.getDate()+1);
  const d2 = dt.toISOString().slice(0,10).replace(/-/g,'');
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${d}/${d2}`;
}
