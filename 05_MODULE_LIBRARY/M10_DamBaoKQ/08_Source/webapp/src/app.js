// M10_DamBaoKQ — Giao diện & điều phối (vanilla ES modules)
import { RECORD_TYPES, STATUS, RESULT, PUB_STATUS, ROLES, USERS, fmtTime } from './model.js';
import * as store from './store.js';
import { validateForSubmit, canReview, canApprove, requiresCapa, derivePubStatus } from './rules.js';

const $ = (s, r = document) => r.querySelector(s);
const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
let route = { screen: 'list', id: null };

// ---------- tiện ích render ----------
function resultBadge(r) {
  if (r === RESULT.PASS) return `<span class="badge b-good"><span class="g"></span>${r}</span>`;
  if (r === RESULT.WARNING) return `<span class="badge b-warn"><span class="g"></span>${r}</span>`;
  if (r === RESULT.FAIL) return `<span class="badge b-crit"><span class="g"></span>${r}</span>`;
  return `<span class="muted num">—</span>`;
}
function statusBadge(s) {
  const tone = { [STATUS.PUBLISHED]: 'b-good', [STATUS.PENDING_REVIEW]: 'b-accent', [STATUS.PENDING_APPROVAL]: 'b-accent',
    [STATUS.RETURNED]: 'b-warn', [STATUS.REJECTED]: 'b-crit', [STATUS.APPROVED]: 'b-neutral', [STATUS.DRAFT]: 'b-neutral',
    [STATUS.EXPIRED]: 'b-neutral', [STATUS.REVOKED]: 'b-crit' }[s] || 'b-neutral';
  return `<span class="badge ${tone}"><span class="g"></span>${s}</span>`;
}
function toast(msg, isErr) {
  const t = $('#toast');
  const ico = isErr ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 8v5M12 16h.01M12 3a9 9 0 100 18 9 9 0 000-18z"/></svg>'
                    : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M20 6L9 17l-5-5"/></svg>';
  t.className = 'toast' + (isErr ? ' err' : '');
  t.innerHTML = ico + '<span>' + esc(msg) + '</span>';
  t.classList.remove('hidden');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => t.classList.add('hidden'), 3600);
}
function go(screen, id = null) { route = { screen, id }; render(); window.scrollTo(0, 0); }
window._go = go;

// ---------- màn Danh sách ----------
function screenList() {
  const s = store.getState();
  const rows = s.list.map((a) => {
    const ind = Object.entries(a.indicators)[0];
    const indTxt = ind ? `${ind[0]} = ${String(ind[1]).replace('.', ',')}` : '—';
    return `<tr data-open onclick="_go('record','${a.id}')">
      <td class="rid">${a.id}</td>
      <td><span class="type-tag">${a.recordType}</span></td>
      <td>${esc(a.object)}</td>
      <td class="num">${indTxt}</td>
      <td>${resultBadge(a.result)}</td>
      <td>${statusBadge(a.status)}</td>
      <td class="muted num">${fmtTime(a.audit[a.audit.length - 1].ts)}</td></tr>`;
  }).join('');
  const total = s.list.length;
  const pass = s.list.filter((a) => a.result === RESULT.PASS).length;
  const warn = s.list.filter((a) => a.result === RESULT.WARNING).length;
  const fail = s.list.filter((a) => a.result === RESULT.FAIL).length;
  const capaOpen = s.list.filter((a) => a.result === RESULT.FAIL && !a.capaId).length;
  const pct = (n) => total ? (n / total * 100).toFixed(1).replace('.', ',') : '0';
  return `
    <div class="pagehead">
      <div><div class="eyebrow">ISO/IEC 17025 · §7.7</div><h1>Đảm bảo hiệu lực của kết quả</h1>
        <p>Vòng đời hồ sơ bảo đảm hiệu lực — dữ liệu lưu cục bộ, thực thi quy tắc R1–R8.</p></div>
      <button class="btn primary" onclick="_go('new')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 5v14M5 12h14"/></svg>Tạo hồ sơ</button>
    </div>
    <div class="kpis">
      <div class="kpi"><div class="lab"><span class="dot" style="background:var(--good)"></span>Tỉ lệ đạt</div><div class="val">${pct(pass)}%</div><div class="sub">${pass}/${total} hồ sơ</div></div>
      <div class="kpi"><div class="lab"><span class="dot" style="background:var(--warn)"></span>Cảnh báo</div><div class="val">${pct(warn)}%</div><div class="sub">${warn} hồ sơ</div></div>
      <div class="kpi"><div class="lab"><span class="dot" style="background:var(--crit)"></span>Không đạt</div><div class="val">${pct(fail)}%</div><div class="sub">${fail} hồ sơ</div></div>
      <div class="kpi"><div class="lab"><span class="dot" style="background:var(--accent)"></span>KPH cần mở</div><div class="val">${capaOpen}</div><div class="sub">KHÔNG ĐẠT chưa có CAPA</div></div>
    </div>
    <div class="toolbar">
      <div class="search"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
        <input id="q" placeholder="Tìm mã hồ sơ, đối tượng…" oninput="_filter()"/></div>
    </div>
    <div class="card"><div class="tablewrap"><table>
      <thead><tr><th>Mã hồ sơ</th><th>Loại</th><th>Đối tượng</th><th>Chỉ số</th><th>Kết quả</th><th>Trạng thái</th><th>Cập nhật</th></tr></thead>
      <tbody id="rows">${rows}</tbody></table></div></div>`;
}
window._filter = () => {
  const q = $('#q').value.toLowerCase();
  [...$('#rows').children].forEach((tr) => {
    tr.style.display = tr.textContent.toLowerCase().includes(q) ? '' : 'none';
  });
};

// ---------- màn Tạo mới ----------
function screenNew() {
  const opts = Object.entries(RECORD_TYPES).filter(([k]) => k !== 'PUBLICATION')
    .map(([k, v]) => `<option value="${k}">${esc(v.label)}</option>`).join('');
  return `
    <div class="pagehead"><div><div class="eyebrow" style="color:var(--ink-3)">Hồ sơ mới</div><h1>Tạo hồ sơ P10</h1>
      <p>Điền thông tin, hệ thống tạo bản Nháp với audit trail độc lập.</p></div>
      <button class="btn ghost" onclick="_go('list')">← Danh sách</button></div>
    <div class="card"><div class="cb">
      <div class="grid2">
        <div class="field"><label>Loại hồ sơ <span class="req">*</span></label><select class="inp" id="f-rtype">${opts}</select></div>
        <div class="field"><label>Đối tượng / mẫu <span class="req">*</span></label><input class="inp" id="f-object" placeholder="VD: Mẫu C · Cadimi trong đất"/></div>
        <div class="field"><label>Kế hoạch (F10.01)</label><input class="inp" id="f-plan" value="F10.01-2026-007"/></div>
        <div class="field"><label>Quy trình (← M08)</label><input class="inp" id="f-proc" value="M08·PP-014"/></div>
        <div class="field"><label>Nhân sự (← M03)</label><input class="inp" id="f-pers" value="Nguyễn Thị H."/></div>
        <div class="field"><label>Tiêu chí</label><input class="inp" id="f-crit" value="TC-ISO17043 v2"/></div>
      </div>
      <div class="actionbar" style="position:static;margin-top:16px">
        <div class="spacer"></div>
        <button class="btn ghost" onclick="_go('list')">Hủy</button>
        <button class="btn primary" onclick="_create()">Tạo bản Nháp</button>
      </div></div></div>`;
}
window._create = async () => {
  const object = $('#f-object').value.trim();
  if (!object) return toast('Thiếu: đối tượng / mẫu', true);
  const body = {
    recordType: $('#f-rtype').value, object,
    planId: $('#f-plan').value, procedureId: $('#f-proc').value, personnelId: $('#f-pers').value,
    criteriaId: $('#f-crit').value,
  };
  try { const a = await store.create(body); toast('Đã tạo ' + a.id); go('record', a.id); }
  catch (e) { toast(e.message, true); }
};

// ---------- màn Chi tiết + workflow ----------
function screenRecord() {
  const a = store.byId(route.id);
  if (!a) return '<p class="muted">Không tìm thấy hồ sơ.</p>';
  const user = store.currentUser();
  const rt = RECORD_TYPES[a.recordType];
  const editable = (a.status === STATUS.DRAFT || a.status === STATUS.RETURNED || a.status === STATUS.REJECTED) && user.id === a.createdBy;
  const inds = rt.indicators.length
    ? `<div class="indbox"><div class="indhead">Chỉ số — ${a.recordType}</div><div class="indgrid">` +
      rt.indicators.map((k) => {
        const v = a.indicators[k];
        const flag = k === 'z-score' && Math.abs(v) >= 2;
        return `<div class="ind"><span>${k}</span>${editable
          ? `<input class="inp" style="font-family:var(--mono)" data-ind="${k}" value="${v ?? ''}"/>`
          : `<div class="box ${flag ? 'flag' : ''}">${v != null ? String(v).replace('.', ',') : '—'}</div>`}</div>`;
      }).join('') + '</div></div>'
    : '';

  // các nút hành động theo trạng thái & vai trò
  const actions = [];
  if (editable) actions.push(`<button class="btn primary" onclick="_submit('${a.id}')">Gửi soát xét →</button>`);
  if (a.status === STATUS.PENDING_REVIEW)
    actions.push(canReview(a, user)
      ? `<button class="btn danger" onclick="_review('${a.id}','return')">Trả lại…</button><button class="btn primary" onclick="_review('${a.id}','approve')">Đạt → chuyển phê duyệt</button>`
      : `<span class="muted" style="font-size:12.5px">Chờ LĐP (khác người tạo) soát xét</span>`);
  if (a.status === STATUS.PENDING_APPROVAL)
    actions.push(canApprove(a, user)
      ? `<button class="btn danger" onclick="_approve('${a.id}','reject')">Từ chối…</button><button class="btn primary" onclick="_approve('${a.id}','approve')">Phê duyệt</button>`
      : `<span class="muted" style="font-size:12.5px">Chờ LĐV (khác người tạo/soát xét) phê duyệt</span>`);
  if (a.status === STATUS.APPROVED && user.role === 'LDV')
    actions.push(`<button class="btn primary" onclick="_openPublish('${a.id}')">Công bố (F10.09) →</button>`);
  if (a.status === STATUS.APPROVED && user.role !== 'LDV')
    actions.push(`<span class="muted" style="font-size:12.5px">Chờ LĐV công bố</span>`);

  const capaBanner = requiresCapa(a) ? `<div class="capa">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 9v4M12 17h.01M10.3 3.9L2 18a2 2 0 001.7 3h16.6a2 2 0 001.7-3L14 3.9a2 2 0 00-3.4 0z"/></svg>
    <div class="t"><b>Khóa phát hành.</b> Kết quả KHÔNG ĐẠT bắt buộc mở/liên kết KPH-CAPA trước khi phê duyệt/công bố.</div>
    <button class="btn danger" onclick="_capa('${a.id}')">Mở KPH → M13</button></div>` : '';

  const aiFlag = a.result === RESULT.WARNING || (a.indicators['z-score'] && Math.abs(a.indicators['z-score']) >= 2)
    ? `<div class="ai"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7-6.3-4.6L5.7 21 8 14 2 9.4h7.6z"/></svg>
       <div><b>Trợ lý AI (M29):</b> chỉ số vượt ngưỡng cảnh báo — đề xuất rà soát. AI không tự kết luận sự phù hợp; cần người đủ năng lực kiểm chứng.</div></div>` : '';

  const flow = renderFlow(a);
  const audit = a.audit.slice().reverse().map((e) => `<li>
    <time>${fmtTime(e.ts)}</time><div><span class="who">${esc(USERS[e.actor]?.name || e.actor)}</span> · ${esc(e.action)}${e.reason ? `<div class="muted" style="margin-top:2px">Lý do: ${esc(e.reason)}</div>` : ''}</div></li>`).join('');

  const resultRow = editable
    ? `<div class="radiorow">
        ${[['good', RESULT.PASS], ['warn', RESULT.WARNING], ['crit', RESULT.FAIL]].map(([c, r]) =>
          `<div class="radio ${c}" data-on="${a.result === r}" onclick="_setResult('${a.id}','${r}')"><span class="ring"></span>${r}</div>`).join('')}
      </div>`
    : `<div>${resultBadge(a.result)}</div>`;

  const pubPanel = a.status === STATUS.APPROVED && $('#pubOpen')?.dataset.for === a.id ? '' : '';

  return `
    <div class="pagehead"><div>
      <div class="eyebrow" style="color:var(--ink-3)">Biểu mẫu ${rt.form} · ${a.recordType}</div>
      <h1>${a.id} ${statusBadge(a.status)}</h1>
      <p>${esc(a.object)} · phiên bản ${a.version}</p></div>
      <button class="btn ghost" onclick="_go('list')">← Danh sách</button></div>

    <div class="card"><div class="ch"><span class="n">1</span><h3>Định danh & liên kết</h3></div><div class="cb">
      <div class="grid2">
        <div class="field"><label>Mã hồ sơ</label><div class="inp ro">${a.id}</div></div>
        <div class="field"><label>Nhân sự (← M03)</label><div class="inp ro">${esc(a.personnelId || '—')}</div></div>
        <div class="field"><label>Kế hoạch (F10.01)</label><div class="inp ro">${esc(a.planId || '—')}</div></div>
        <div class="field"><label>Quy trình (← M08)</label><div class="inp ro">${esc(a.procedureId || '—')}</div></div>
      </div></div></div>

    <div class="card"><div class="ch"><span class="n">2</span><h3>Kỹ thuật & chỉ số</h3><span class="type-tag" style="margin-left:auto">${a.criteriaId || '—'}</span></div><div class="cb">
      ${editable ? `<div class="grid2" style="margin-bottom:8px">
        <div class="field"><label>Dữ liệu thô (số tệp) <span class="req">*</span></label><input class="inp" id="ed-raw" type="number" min="0" value="${a.rawData}"/></div>
        <div class="field"><label>Bằng chứng (số tệp) <span class="req">*</span></label><input class="inp" id="ed-ev" type="number" min="0" value="${a.evidence}"/></div>
      </div>` : `<div class="grid2" style="margin-bottom:8px">
        <div class="field"><label>Dữ liệu thô</label><div class="inp ro">${a.rawData} tệp</div></div>
        <div class="field"><label>Bằng chứng</label><div class="inp ro">${a.evidence} tệp</div></div></div>`}
      ${inds}
      ${editable ? `<div style="margin-top:12px;text-align:right"><button class="btn" onclick="_saveDraft('${a.id}')">Lưu nháp</button></div>` : ''}
    </div></div>

    <div class="card"><div class="ch"><span class="n">3</span><h3>Kết quả</h3></div><div class="cb">
      ${resultRow}${aiFlag}${capaBanner}
      ${a.status === STATUS.PUBLISHED ? renderPublished(a) : ''}
    </div></div>

    <div class="grid2">
      <div class="card"><div class="ch"><h3>Luồng phê duyệt</h3></div><div class="cb">${flow}</div></div>
      <div class="card"><div class="ch"><h3>Nhật ký (append-only)</h3></div><div class="cb"><ul class="audit">${audit}</ul>
        ${a.status === STATUS.APPROVED || a.status === STATUS.PUBLISHED ? `<div style="margin-top:10px"><button class="btn" onclick="_newVer('${a.id}')">Sửa → tạo phiên bản mới</button></div>` : ''}
      </div></div>
    </div>

    <div class="actionbar">
      <div class="status-inline"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
        Bước <b style="color:var(--ink)">${a.status}</b> · bạn là <b style="color:var(--ink)">${ROLES[user.role].split('—')[0].trim()}</b></div>
      <div class="spacer"></div>${actions.join('')}
    </div>`;
}

function renderFlow(a) {
  const order = [STATUS.DRAFT, STATUS.PENDING_REVIEW, STATUS.PENDING_APPROVAL, STATUS.APPROVED, STATUS.PUBLISHED];
  const idx = Math.max(0, order.indexOf(a.status));
  const names = { [STATUS.DRAFT]: 'Tạo/Nháp', [STATUS.PENDING_REVIEW]: 'Soát xét (LĐP)', [STATUS.PENDING_APPROVAL]: 'Phê duyệt (LĐV)', [STATUS.APPROVED]: 'Đã phê duyệt', [STATUS.PUBLISHED]: 'Công bố' };
  const by = { [STATUS.PENDING_APPROVAL]: a.reviewedBy, [STATUS.APPROVED]: a.approvedBy };
  return `<div class="flow">` + order.map((s, i) => {
    const cls = i < idx ? 'done' : i === idx ? 'cur' : '';
    const who = by[s] ? USERS[by[s]]?.name : '';
    return `<div class="step ${cls}"><div class="rail"><div class="node"></div><div class="line"></div></div>
      <div class="body"><div class="t">${names[s]}</div><div class="m">${who || '—'}</div></div></div>`;
  }).join('') + '</div>';
}

function renderPublished(a) {
  const ps = PUB_STATUS[a.pubStatus] || {};
  return `<div class="ai" style="background:var(--accent-soft);border-color:var(--accent-line);margin-top:14px">
    <svg viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2"><path d="M9 12l2 2 4-4M12 3l7 4v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V7z"/></svg>
    <div style="color:var(--ink)">Đã công bố F10.09 · trạng thái <b style="color:var(--accent)">${a.pubStatus}</b> ·
      phát hành: <b>${a.releaseAllowed ? 'cho phép' : 'khóa'}</b>${a.expiresAt ? ` · hết hạn ${a.expiresAt}` : ''}. Trạng thái truyền sang F11.03/M11.</div></div>`;
}

// ---------- màn Công bố (F10.09) ----------
function screenPublish() {
  const a = store.byId(route.id);
  if (!a) return '<p class="muted">Không tìm thấy hồ sơ.</p>';
  const suggested = derivePubStatus(a);
  const opts = Object.keys(PUB_STATUS).map((k) => `<option value="${k}" ${k === suggested ? 'selected' : ''}>${k}${PUB_STATUS[k].release ? '' : ' — khóa phát hành'}</option>`).join('');
  return `
    <div class="pagehead"><div><div class="eyebrow">Biểu mẫu F10.09 · Điểm chốt nội bộ</div>
      <h1>Công bố trạng thái P10 — ${a.id}</h1><p>Chốt trạng thái và khống chế phát hành ở M11 — không thay thế F11.03.</p></div>
      <button class="btn ghost" onclick="_go('record','${a.id}')">← Hồ sơ</button></div>
    <div class="card"><div class="ch"><h3>Nguồn chứng chỉ (← F11.03 / M11)</h3></div><div class="cb">
      <div class="grid2">
        <div class="field"><label>Chứng chỉ nguồn</label><input class="inp" id="p-src" value="${a.sourceCertId || 'F11.03-2026-0210'}"/></div>
        <div class="field"><label>Thời điểm chốt (snapshot)</label><div class="inp ro">${a.sourceSnapshotAt ? fmtTime(a.sourceSnapshotAt) : '(khi công bố)'}</div></div>
      </div>
      <div class="ai" style="background:var(--accent-soft);border-color:var(--accent-line);margin-top:14px">
        <svg viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2"><path d="M12 8v4M12 16h.01M12 3a9 9 0 100 18 9 9 0 000-18z"/></svg>
        <div style="color:var(--ink)">Dữ liệu nguồn <b style="color:var(--accent)">được khóa</b> khi công bố; cảnh báo nếu F11.03 đổi sau snapshot (R1).</div></div>
    </div></div>
    <div class="card"><div class="ch"><h3>Quyết định công bố</h3></div><div class="cb">
      <div class="grid2">
        <div class="field"><label>Trạng thái công bố</label><select class="inp" id="p-status">${opts}</select>
          <span class="hint">Gợi ý từ kết quả: <b>${suggested}</b></span></div>
        <div class="field"><label>Hết hiệu lực (expires_at)</label><input class="inp" id="p-exp" type="date" value="2027-07-16"/></div>
      </div>
      <div class="actionbar" style="position:static;margin-top:16px">
        <div class="spacer"></div>
        <button class="btn ghost" onclick="_go('record','${a.id}')">Hủy</button>
        <button class="btn primary" onclick="_publish('${a.id}')">Công bố → F11.03</button>
      </div></div></div>`;
}

// ---------- màn Dashboard ----------
function screenDash() {
  const s = store.getState();
  const total = s.list.length;
  const c = { pass: 0, warn: 0, fail: 0 };
  s.list.forEach((a) => { if (a.result === RESULT.PASS) c.pass++; else if (a.result === RESULT.WARNING) c.warn++; else if (a.result === RESULT.FAIL) c.fail++; });
  const attn = s.list.filter((a) => (a.result === RESULT.FAIL && !a.capaId) || a.status === STATUS.EXPIRED);
  const attnRows = attn.length ? attn.map((a) => `<li style="display:flex;align-items:center;gap:10px;padding:11px 0;border-bottom:1px solid var(--border)">
      <span class="rid">${a.id}</span>${resultBadge(a.result)}<span class="muted" style="flex:1">Chưa liên kết KPH-CAPA · khóa phát hành</span>
      <button class="btn danger" style="padding:6px 11px" onclick="_go('record','${a.id}')">Xử lý</button></li>`).join('')
    : '<li class="muted" style="padding:11px 0">Không có hồ sơ cần chú ý.</li>';
  const h = (n) => Math.max(4, n / Math.max(1, total) * 100);
  return `
    <div class="pagehead"><div><div class="eyebrow">Tổng hợp KPI · đầu vào Xem xét lãnh đạo (M17)</div>
      <h1>Dashboard đảm bảo hiệu lực</h1><p>Số liệu tính trực tiếp từ ${total} hồ sơ hiện có.</p></div></div>
    <div class="kpis">
      <div class="kpi"><div class="lab"><span class="dot" style="background:var(--good)"></span>Đạt</div><div class="val">${c.pass}</div></div>
      <div class="kpi"><div class="lab"><span class="dot" style="background:var(--warn)"></span>Cảnh báo</div><div class="val">${c.warn}</div></div>
      <div class="kpi"><div class="lab"><span class="dot" style="background:var(--crit)"></span>Không đạt</div><div class="val">${c.fail}</div></div>
      <div class="kpi"><div class="lab"><span class="dot" style="background:var(--accent)"></span>KPH cần mở</div><div class="val">${attn.length}</div></div>
    </div>
    <div class="grid2">
      <div class="card"><div class="ch"><h3>Phân bố kết quả</h3></div><div class="cb">
        <div class="bars">
          <div class="bar"><div class="stack" style="height:${h(c.pass)}%"><div class="seg g" style="height:100%"></div></div><div class="lbl">Đạt ${c.pass}</div></div>
          <div class="bar"><div class="stack" style="height:${h(c.warn)}%"><div class="seg w" style="height:100%"></div></div><div class="lbl">CB ${c.warn}</div></div>
          <div class="bar"><div class="stack" style="height:${h(c.fail)}%"><div class="seg c" style="height:100%"></div></div><div class="lbl">KĐ ${c.fail}</div></div>
        </div>
        <div class="legend"><span><i style="background:var(--good)"></i>Đạt</span><span><i style="background:var(--warn)"></i>Cảnh báo</span><span><i style="background:var(--crit)"></i>Không đạt</span></div>
      </div></div>
      <div class="card"><div class="ch"><h3>Hồ sơ cần chú ý</h3><span class="badge b-crit" style="margin-left:auto"><span class="g"></span>${attn.length} mục</span></div>
        <div class="cb"><ul style="list-style:none;margin:0;padding:0">${attnRows}</ul></div></div>
    </div>`;
}

// ---------- hành động (gọi API; server thực thi rules; hiển thị lỗi/thành công) ----------
function collectDraft() {
  const patch = {};
  if ($('#ed-raw')) patch.rawData = +$('#ed-raw').value || 0;
  if ($('#ed-ev')) patch.evidence = +$('#ed-ev').value || 0;
  const inds = {}; let has = false;
  document.querySelectorAll('[data-ind]').forEach((i) => { has = true; if (i.value !== '') inds[i.dataset.ind] = parseFloat(i.value.replace(',', '.')); });
  if (has) patch.indicators = inds;
  return patch;
}
window._setResult = async (id, r) => { try { await store.edit(id, { ...collectDraft(), result: r }); render(); } catch (e) { toast(e.message, true); } };
window._saveDraft = async (id) => { try { await store.edit(id, collectDraft()); toast('Đã lưu nháp'); render(); } catch (e) { toast(e.message, true); } };
window._submit = async (id) => {
  try { await store.edit(id, collectDraft()); await store.submit(id); toast('Đã gửi soát xét'); render(); }
  catch (e) { toast(e.message, true); render(); }
};
window._review = async (id, decision) => {
  let reason = null;
  if (decision === 'return') { reason = prompt('Lý do trả lại (bắt buộc):'); if (!reason) return toast('Trả lại bắt buộc nhập lý do (R3).', true); }
  try { await store.review(id, decision, reason); toast(decision === 'return' ? 'Đã trả lại' : 'Soát xét đạt'); render(); }
  catch (e) { toast(e.message, true); }
};
window._approve = async (id, decision) => {
  let reason = null;
  if (decision === 'reject') { reason = prompt('Lý do từ chối (bắt buộc):'); if (!reason) return toast('Từ chối bắt buộc nhập lý do (R3).', true); }
  try { await store.approve(id, decision, reason); toast(decision === 'reject' ? 'Đã từ chối' : 'Đã phê duyệt'); render(); }
  catch (e) { toast(e.message, true); }
};
window._capa = async (id) => { try { const a = await store.linkCapa(id); toast('Đã liên kết ' + a.capaId); render(); } catch (e) { toast(e.message, true); } };
window._newVer = async (id) => { try { await store.newVersion(id); toast('Đã tạo phiên bản mới (Nháp)'); render(); } catch (e) { toast(e.message, true); } };
window._openPublish = (id) => go('publish', id);
window._publish = async (id) => {
  try { await store.publish(id, $('#p-status').value, $('#p-exp').value, $('#p-src').value); toast('Đã công bố'); go('record', id); }
  catch (e) { toast(e.message, true); }
};

// ---------- khung ----------
function render() {
  const s = store.getState();
  const titles = { list: 'Danh sách hồ sơ', new: 'Tạo hồ sơ', record: 'Chi tiết hồ sơ', publish: 'Công bố F10.09', dashboard: 'Dashboard KPI' };
  $('#crumb').textContent = titles[route.screen];
  document.querySelectorAll('#nav button[data-screen]').forEach((b) => b.setAttribute('aria-current', b.dataset.screen === route.screen ? 'true' : 'false'));
  $('#roleName').textContent = store.currentUser().name;
  $('#roleDesc').textContent = ROLES[s.role];
  const view = { list: screenList, new: screenNew, record: screenRecord, publish: screenPublish, dashboard: screenDash }[route.screen] || screenList;
  $('#view').innerHTML = view();
}

async function mount() {
  try { await store.init(); }
  catch (e) { $('#view').innerHTML = `<div class="card"><div class="cb">Không kết nối được API. Chạy server: <code>node api/server.js</code>.<br>${esc(e.message)}</div></div>`; return; }
  document.querySelectorAll('#nav button[data-screen]').forEach((b) => b.addEventListener('click', () => go(b.dataset.screen)));
  $('#role').value = store.getState().role;
  $('#role').addEventListener('change', (e) => { store.setRole(e.target.value); render(); });
  $('#theme').addEventListener('click', () => {
    const root = document.documentElement;
    const dark = (root.getAttribute('data-theme') || (matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light')) === 'dark';
    root.setAttribute('data-theme', dark ? 'light' : 'dark');
  });
  $('#reset').addEventListener('click', async () => { if (confirm('Đặt lại dữ liệu mẫu?')) { await store.reset(); go('list'); } });
  render();
}
document.addEventListener('DOMContentLoaded', mount);
