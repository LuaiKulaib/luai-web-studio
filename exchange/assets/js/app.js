/* =========================================================
   app.js — الريان للصرافة والتحويلات المالية
   ========================================================= */
'use strict';

const SVG = {
  send:      `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`,
  globe:     `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
  briefcase: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`,
  shield:    `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
};

function calcExchange() {
  const amount = Math.max(0, Number(document.getElementById('ex-amount')?.value) || 0);
  const code = document.getElementById('ex-curr')?.value || 'SAR';
  const mode = document.getElementById('ex-mode')?.value || 'buy';
  const c = EX_DATA.currencies.find(x => x.code === code) || EX_DATA.currencies[0];
  const rate = mode === 'sell' ? c.sellYer : c.buyYer;
  const total = Math.round(amount * rate);
  const out = document.getElementById('ex-output');
  if (out) out.textContent = `${total.toLocaleString('en-US')} ر.ي`;
  return { amount, c, mode, total };
}

function renderTables() {
  const sel = document.getElementById('ex-curr');
  if (sel) {
    sel.innerHTML = EX_DATA.currencies.map(c => `<option value="${c.code}">${c.name} (${c.code})</option>`).join('');
  }

  const tbody = document.getElementById('ex-rates-body');
  if (tbody) {
    tbody.innerHTML = EX_DATA.currencies.map(c => `
      <tr>
        <td><span class="code-pill">${c.code}</span> ${c.name}</td>
        <td style="color:var(--bank);">${c.buyYer}</td>
        <td>${c.sellYer}</td>
      </tr>
    `).join('');
  }

  const svcEl = document.getElementById('ex-services');
  if (svcEl) {
    svcEl.innerHTML = EX_DATA.services.map(s => `
      <div class="svc-card">
        <div class="svc-icon">${SVG[s.icon] || ''}</div>
        <h3>${s.title}</h3>
        <p>${s.desc}</p>
      </div>
    `).join('');
  }

  const brEl = document.getElementById('ex-branches');
  if (brEl) {
    brEl.innerHTML = EX_DATA.branches.map(b => `
      <div class="br-card">
        <h3>${b.city}</h3>
        <p>${b.loc}</p>
        <small>${b.hours}</small>
      </div>
    `).join('');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderTables();
  calcExchange();

  ['ex-amount', 'ex-curr', 'ex-mode'].forEach(id => {
    document.getElementById(id)?.addEventListener('input', calcExchange);
    document.getElementById(id)?.addEventListener('change', calcExchange);
  });

  document.getElementById('btn-ex-wa')?.addEventListener('click', () => {
    const r = calcExchange();
    const modeLabel = r.mode === 'sell' ? 'شراء عملة أجنبية' : 'صرف / حوالة إلى ريال يمني';
    const msg = `*استفسار صرف / حوالة — ${EX_CONFIG.companyName}*\nالعملية: ${modeLabel}\nالمبلغ: ${r.amount} ${r.c.code}\nالقيمة التقديرية: ${r.total.toLocaleString('en-US')} ر.ي`;
    window.open(`https://wa.me/${EX_CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
  });
});
