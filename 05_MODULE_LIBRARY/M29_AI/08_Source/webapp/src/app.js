// AIOS Control Plane webapp — Giao diện & điều phối (vanilla ES modules, đọc trực tiếp từ API)
import { api, setRole, getRole } from './apiClient.js';

// Mirror của ma trận RBAC trong api/rules.mjs — CHỈ để gating giao diện (ẩn nút chắc chắn bị
// 403) cho đỡ rối; server luôn là nguồn xác thực thật, không suy luận quyền từ đây.
const PERMS = {
  AI_VIEWER:         { platforms: 'r', registry: 'r', health: 'r' },
  AI_OPERATOR:       { platforms: 'r', registry: 'r', evaluations: 'rw', traces: 'r', usage: 'r', health: 'r' },
  AI_ADMIN:          { platforms: 'r', registry: 'rw', aia: 'rw', governance: 'r', evaluations: 'r', health: 'r' },
  AI_SECURITY_ADMIN: { platforms: 'r', registry: 'r', governance: 'rw', secrets: 'rw', health: 'r' },
  AI_AUDITOR:        { platforms: 'r', registry: 'r', governance: 'r', aia: 'r', audit: 'r', traces: 'r', health: 'r' },
  SUPER_ADMIN:       { platforms: 'rw', registry: 'rw', governance: 'rw', aia: 'rw', evaluations: 'rw', traces: 'r', usage: 'r', secrets: 'rw', audit: 'r', health: 'r' },
};
function canUI(category, action = 'read') {
  const p = (PERMS[getRole()] || {})[category] || '';
  return action === 'write' ? p.includes('w') : p.length > 0;
}

const $ = (s, r = document) => r.querySelector(s);
const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const fmtTime = (iso) => iso ? new Date(iso).toLocaleString('vi-VN') : '—';
let route = { screen: 'dashboard', id: null };
let platformFilter = 'ALL';
let platformsCache = [];

function go(screen, id = null) { route = { screen, id }; render(); window.scrollTo(0, 0); }
window._go = go;

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
async function act(fn, okMsg) { try { const r = await fn(); if (okMsg) toast(okMsg); render(); return r; } catch (e) { toast(e.message, true); render(); } }

// ---------- badges ----------
function approvalBadge(s) {
  const tone = { 'Đã phê duyệt': 'b-good', 'Chờ soát xét': 'b-accent', 'Chờ phê duyệt': 'b-accent', 'Không soát xét': 'b-warn', 'Không phê duyệt': 'b-crit', 'Nháp': 'b-neutral', 'Hết hiệu lực/Hủy': 'b-neutral' }[s] || 'b-neutral';
  return `<span class="badge ${tone}"><span class="g"></span>${esc(s)}</span>`;
}
function healthBadge(h) {
  const tone = { HEALTHY: 'b-good', DEGRADED: 'b-warn', DOWN: 'b-crit', UNKNOWN: 'b-neutral' }[h] || 'b-neutral';
  return `<span class="badge ${tone}"><span class="g"></span>${esc(h)}</span>`;
}
function opBadge(s) {
  const tone = { ACTIVE: 'b-good', DISABLED: 'b-crit', DEPRECATED: 'b-neutral' }[s] || 'b-neutral';
  return `<span class="badge ${tone}"><span class="g"></span>${esc(s)}</span>`;
}
function promptBadge(s) {
  const tone = { ACTIVE: 'b-good', APPROVED: 'b-accent', REVIEW: 'b-warn', DRAFT: 'b-neutral', ARCHIVED: 'b-neutral' }[s] || 'b-neutral';
  return `<span class="badge ${tone}"><span class="g"></span>${esc(s)}</span>`;
}
function platformName(id) { return platformsCache.find((p) => p.id === id)?.name || id || '—'; }
function byPlatform(list) { return platformFilter === 'ALL' ? list : list.filter((x) => x.platform_id === platformFilter); }
// 403 (không đủ quyền) và 404 (không tồn tại) là hai lý do khác nhau — không gộp chung thành
// "không tìm thấy", kẻo người dùng tưởng dữ liệu bị mất thay vì chỉ do vai trò hiện tại.
function loadError(e, label) {
  return e.status === 403
    ? `<div class="empty">Vai trò hiện tại không đủ quyền xem ${label}.</div>`
    : `<div class="empty">Không tìm thấy ${label}.</div>`;
}

// ---------- Dashboard ----------
// Mỗi vai trò chỉ thấy đúng phần dữ liệu được phép (RBAC) — một mục bị từ chối không được
// làm sập cả Dashboard, nên lấy dữ liệu độc lập bằng allSettled thay vì Promise.all.
async function screenDashboard() {
  const results = await Promise.allSettled([api.platforms(), api.agents(), api.tools(), api.traces(), api.health()]);
  const [platformsR, agentsR, toolsR, tracesR, healthR] = results;
  const platforms = platformsR.status === 'fulfilled' ? platformsR.value : [];
  const agents = agentsR.status === 'fulfilled' ? agentsR.value : [];
  const tools = toolsR.status === 'fulfilled' ? toolsR.value : [];
  const traces = tracesR.status === 'fulfilled' ? tracesR.value : null; // null = không đủ quyền xem
  const health = healthR.status === 'fulfilled' ? healthR.value : [];
  const ag = byPlatform(agents), tl = byPlatform(tools);
  const down = health.filter((h) => h.health === 'DOWN' || h.health === 'DEGRADED');
  const disabledTools = tl.filter((t) => t.status === 'DISABLED');
  const today = new Date().toISOString().slice(0, 10);
  const reqToday = traces ? traces.filter((r) => r.created_at.slice(0, 10) === today).length : null;
  return `
    <div class="pagehead"><div><div class="eyebrow">CAP-29_AIOffice · ISO/IEC 42001</div><h1>Dashboard AIOS</h1>
      <p>Tổng quan AI đang chạy trên ${platforms.length} nền tảng đã đăng ký.</p></div></div>
    <div class="kpis">
      <div class="kpi"><div class="lab"><span class="dot" style="background:var(--accent)"></span>Platform</div><div class="val">${platforms.length}</div><div class="sub">${down.length} cần chú ý</div></div>
      <div class="kpi"><div class="lab"><span class="dot" style="background:var(--good)"></span>Agent hoạt động</div><div class="val">${ag.filter((a) => a.status === 'ACTIVE').length}</div><div class="sub">${ag.length} tổng</div></div>
      <div class="kpi"><div class="lab"><span class="dot" style="background:var(--warn)"></span>Tool bị tắt</div><div class="val">${disabledTools.length}</div><div class="sub">${tl.length} tool đăng ký</div></div>
      <div class="kpi"><div class="lab"><span class="dot" style="background:var(--accent)"></span>Request hôm nay</div><div class="val">${reqToday ?? '—'}</div><div class="sub">${traces ? traces.length + ' tổng cộng' : 'Vai trò hiện tại không xem được Trace'}</div></div>
    </div>
    <div class="grid2">
      <div class="card"><div class="ch"><h3>Trạng thái nền tảng</h3></div><div class="cb">
        <div class="tablewrap"><table><thead><tr><th>Nền tảng</th><th>Môi trường</th><th>Health</th><th>Lỗi gần nhất</th></tr></thead><tbody>
        ${platforms.map((p) => `<tr data-open onclick="_go('platforms')"><td>${esc(p.name)}</td><td class="muted">${esc(p.environment)}</td><td>${healthBadge(p.health)}</td><td class="muted" style="font-size:12px">${esc(p.last_error || '—')}</td></tr>`).join('')}
        </tbody></table></div></div></div>
      <div class="card"><div class="ch"><h3>Cần chú ý</h3></div><div class="cb">
        ${down.length || disabledTools.length ? `<ul style="list-style:none;margin:0;padding:0">
          ${down.map((h) => `<li style="padding:9px 0;border-bottom:1px solid var(--border)">${healthBadge(h.health)} <b>${esc(h.name)}</b> <span class="muted">— ${esc(h.last_error || '')}</span></li>`).join('')}
          ${disabledTools.map((t) => `<li style="padding:9px 0;border-bottom:1px solid var(--border)"><span class="badge b-crit"><span class="g"></span>DISABLED</span> Tool <b>${esc(t.name)}</b></li>`).join('')}
        </ul>` : '<div class="empty">Không có cảnh báo.</div>'}
      </div></div>
    </div>`;
}

// ---------- Platforms ----------
async function screenPlatforms() {
  const platforms = await api.platforms();
  const rows = platforms.map((p) => `<tr>
    <td><b>${esc(p.name)}</b><div class="muted" style="font-size:11.5px">${esc(p.code)}</div></td>
    <td class="muted">${esc(p.environment)}</td><td>${healthBadge(p.health)}</td><td>${approvalBadge(p.approvalStatus)}</td>
    <td class="muted" style="font-size:12px">${esc(p.adapter_type)}</td><td class="muted" style="font-size:12px">${esc(p.owner)}</td>
    <td>${platformActions(p)}</td></tr>`).join('');
  const canWrite = canUI('platforms', 'write');
  return `
    <div class="pagehead"><div><div class="eyebrow">M35_NenTangSo</div><h1>Platform Registry</h1><p>Đăng ký nền tảng số có sử dụng AI — chọn selector ở sidebar để lọc toàn bộ menu bên dưới.</p></div></div>
    ${canWrite ? `<div class="card"><div class="ch"><h3>Đăng ký nền tảng mới</h3></div><div class="cb">
      <div class="grid3">
        <div class="field"><label>Code <span class="req">*</span></label><input class="inp" id="p-code" placeholder="VD: VNPT_AI"/></div>
        <div class="field"><label>Tên hiển thị <span class="req">*</span></label><input class="inp" id="p-name" placeholder="VD: VNPT AI Platform"/></div>
        <div class="field"><label>API base URL</label><input class="inp" id="p-api" placeholder="https://..."/></div>
      </div>
      <div style="margin-top:12px;text-align:right"><button class="btn primary" onclick="_createPlatform()">Đăng ký (Nháp)</button></div>
    </div></div>` : `<div class="card"><div class="cb"><div class="empty">Vai trò <b>${esc(getRole())}</b> chỉ được xem Platform Registry — cần SUPER_ADMIN để đăng ký/duyệt nền tảng mới.</div></div></div>`}
    <div class="card"><div class="tablewrap"><table>
      <thead><tr><th>Nền tảng</th><th>Môi trường</th><th>Health</th><th>Vòng đời</th><th>Adapter</th><th>Chủ sở hữu</th><th>Hành động</th></tr></thead>
      <tbody>${rows}</tbody></table></div></div>`;
}
function platformActions(p) {
  if (!canUI('platforms', 'write')) return '—';
  if (p.approvalStatus === 'Nháp') return `<button class="btn small primary" onclick="_platformTx('${p.id}','submit-review')">Gửi soát xét</button>`;
  if (p.approvalStatus === 'Chờ soát xét') return `<button class="btn small primary" onclick="_platformTx('${p.id}','review',{decision:'approve'})">Soát xét đạt</button>`;
  if (p.approvalStatus === 'Chờ phê duyệt') return `<button class="btn small primary" onclick="_platformTx('${p.id}','approve',{decision:'approve'})">Phê duyệt</button>`;
  return '—';
}
window._createPlatform = () => act(() => api.createPlatform({ code: $('#p-code').value.trim(), name: $('#p-name').value.trim(), api_base_url: $('#p-api').value.trim() || null, base_url: $('#p-api').value.trim() || null, environment: 'STAGING', owner: '(cập nhật)', adapter_type: 'PlaceholderPlatformAdapter' }), 'Đã đăng ký nền tảng (Nháp)');
window._platformTx = (id, action, body) => act(() => api.platformTx(id, action, body), 'Đã cập nhật vòng đời platform');

// ---------- Models & Providers ----------
async function screenModels() {
  const [providers, models] = await Promise.all([api.providers(), api.models()]);
  return `
    <div class="pagehead"><div><div class="eyebrow">M29_AI</div><h1>Models &amp; Providers</h1><p>Nhà cung cấp và model đang cấu hình dùng cho Agent.</p></div></div>
    <div class="grid2">
      <div class="card"><div class="ch"><h3>Providers</h3></div><div class="cb">
        <div class="tablewrap"><table><thead><tr><th>Code</th><th>Tên</th><th>Trạng thái</th></tr></thead><tbody>
        ${providers.map((p) => `<tr><td class="type-tag">${esc(p.code)}</td><td>${esc(p.name)}</td><td>${opBadge(p.status)}</td></tr>`).join('')}
        </tbody></table></div>
        ${canUI('registry', 'write') ? `<div class="grid2" style="margin-top:12px"><input class="inp" id="pr-code" placeholder="Code (VD: OPENAI)"/><input class="inp" id="pr-name" placeholder="Tên hiển thị"/></div>
        <div style="text-align:right;margin-top:8px"><button class="btn small primary" onclick="_createProvider()">Thêm Provider</button></div>` : ''}
      </div></div>
      <div class="card"><div class="ch"><h3>Models</h3></div><div class="cb">
        <div class="tablewrap"><table><thead><tr><th>Model</th><th>Provider</th><th>Mục đích</th><th>Trạng thái</th></tr></thead><tbody>
        ${models.map((m) => `<tr><td class="rid">${esc(m.model_id)}</td><td class="muted">${esc(providers.find((p) => p.id === m.provider_id)?.code || m.provider_id)}</td><td class="muted" style="font-size:12px">${esc(m.purpose || '—')}</td><td>${opBadge(m.status)}</td></tr>`).join('')}
        </tbody></table></div>
      </div></div>
    </div>`;
}
window._createProvider = () => act(() => api.createProvider({ code: $('#pr-code').value.trim(), name: $('#pr-name').value.trim() }), 'Đã thêm Provider');

// ---------- Agents ----------
async function screenAgents() {
  const agents = byPlatform(await api.agents());
  const rows = agents.map((a) => `<tr data-open onclick="_go('agentDetail','${a.id}')">
    <td class="rid">${esc(a.code)}</td><td>${esc(a.name)}</td><td class="muted">${esc(platformName(a.platform_id))}</td>
    <td>${opBadge(a.status)}</td><td class="muted">${esc(a.risk_level)}</td></tr>`).join('');
  return `
    <div class="pagehead"><div><div class="eyebrow">M29_AI</div><h1>Agents</h1><p>Tác nhân AI đang vận hành — bấm vào 1 dòng để xem chi tiết đầy đủ.</p></div></div>
    <div class="card"><div class="tablewrap"><table><thead><tr><th>Code</th><th>Tên</th><th>Nền tảng</th><th>Trạng thái</th><th>Rủi ro</th></tr></thead>
    <tbody>${rows || `<tr><td colspan="5" class="empty">Chưa có Agent nào trên nền tảng này.</td></tr>`}</tbody></table></div></div>`;
}

async function screenAgentDetail() {
  let d; try { d = await api.agent(route.id); } catch (e) { return loadError(e, 'Agent này'); }
  const guardrailRows = d.guardrails.map((g) => `<li>${esc(g.code)} — <span class="muted">${esc(g.action)}</span></li>`).join('') || '<li class="muted">Không có</li>';
  return `
    <div class="pagehead"><div><div class="eyebrow" style="color:var(--ink-3)">${esc(platformName(d.platform_id))}</div>
      <h1>${esc(d.name)} ${opBadge(d.status)}</h1><p>${esc(d.purpose)}</p></div>
      <button class="btn ghost" onclick="_go('agents')">← Danh sách</button></div>

    <div class="grid2">
      <div class="card"><div class="ch"><span class="n">1</span><h3>Model &amp; Prompt</h3></div><div class="cb">
        <div class="field"><label>Model</label><div class="inp ro">${esc(d.model?.display_name || '—')} (${esc(d.model?.model_id || '—')})</div></div>
        <div class="field" style="margin-top:10px"><label>Prompt version hiệu lực</label>
          <div class="codebox">${esc(d.activePrompt?.content || '(chưa có)')}</div>
          <span class="hint">${d.activePrompt ? promptBadge(d.activePrompt.status) : ''} · xem lịch sử ở màn Prompts</span></div>
      </div></div>
      <div class="card"><div class="ch"><span class="n">2</span><h3>Skills &amp; Tools</h3></div><div class="cb">
        <div class="chiplist">${d.skills.map((s) => `<span class="pill">${esc(s.name)}</span>`).join('') || '<span class="muted">Không có Skill</span>'}</div>
        <div class="chiplist" style="margin-top:10px">${d.tools.map((t) => `<span class="pill">${esc(t.name)} · ${esc(t.permission_level)} ${opBadge(t.status)}</span>`).join('') || '<span class="muted">Không có Tool</span>'}</div>
      </div></div>
    </div>

    <div class="grid2">
      <div class="card"><div class="ch"><span class="n">3</span><h3>Guardrails</h3></div><div class="cb"><ul style="margin:0;padding-left:18px">${guardrailRows}</ul></div></div>
      <div class="card"><div class="ch"><span class="n">4</span><h3>AI Impact Assessment</h3></div><div class="cb">
        ${d.aia ? `<div class="field"><label>Trạng thái</label><div>${approvalBadge(d.aia.status === 'APPROVED' ? 'Đã phê duyệt' : d.aia.status)}</div></div>
          <p class="muted" style="margin-top:8px;font-size:12.5px">${esc(d.aia.risk)} risk · giám sát người: ${esc(d.aia.human_oversight)}</p>` : '<div class="empty">Chưa có hồ sơ AIA — bắt buộc theo ISO 42001.</div>'}
      </div></div>
    </div>

    <div class="card"><div class="ch"><span class="n">5</span><h3>Evaluation gần nhất</h3></div><div class="cb">
      ${d.lastEvaluation ? `<span class="badge ${d.lastEvaluation.status === 'PASS' ? 'b-good' : 'b-crit'}"><span class="g"></span>${esc(d.lastEvaluation.status)}</span>
        <span class="muted" style="margin-left:8px">${d.lastEvaluation.pass_count} đạt / ${d.lastEvaluation.fail_count} không đạt</span>` : '<div class="empty">Chưa chạy Evaluation.</div>'}
    </div></div>

    <div class="card"><div class="ch"><span class="n">6</span><h3>Tool Gateway — thử gọi Tool</h3></div><div class="cb">
      <p class="muted" style="margin-top:0">Agent chỉ được gọi Tool đã whitelist bên dưới; Tool Gateway ghi lại Trace đầy đủ.</p>
      <div class="grid2">
        <div class="field"><label>Tool</label><select class="inp" id="gw-tool">${d.tools.map((t) => `<option value="${t.id}">${esc(t.name)} (${esc(t.permission_level)})</option>`).join('') || '<option>Không có Tool</option>'}</select></div>
        <div style="align-self:end"><button class="btn primary" onclick="_callTool('${d.id}')" ${d.tools.length ? '' : 'disabled'}>Gọi qua Tool Gateway →</button></div>
      </div>
      <div id="gw-result" style="margin-top:12px"></div>
    </div></div>`;
}
window._callTool = async (agentId) => {
  const toolId = $('#gw-tool').value;
  try {
    const r = await api.callTool(toolId, agentId, {});
    $('#gw-result').innerHTML = `<div class="ai" style="background:var(--good-soft);border-color:color-mix(in srgb,var(--good) 30%,transparent)">
      <svg viewBox="0 0 24 24" fill="none" stroke="var(--good)" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>
      <div>Thành công · TraceId <b>${esc(r.traceId)}</b> · <a href="#" onclick="_go('traceDetail','${r.traceId}');return false">xem chi tiết Trace →</a></div></div>`;
    toast('Tool Gateway gọi thành công');
  } catch (e) {
    $('#gw-result').innerHTML = `<div class="ai"><svg viewBox="0 0 24 24" fill="none" stroke="var(--warn)" stroke-width="2"><path d="M12 9v4M12 17h.01M12 3a9 9 0 100 18 9 9 0 000-18z"/></svg><div><b>${esc(e.code)}</b> — ${esc(e.message)}</div></div>`;
  }
};

// ---------- Skills / Tools ----------
async function screenTools() {
  const [skills, tools] = await Promise.all([api.skills(), byPlatform(await api.tools())]);
  const toolsF = byPlatform(tools);
  return `
    <div class="pagehead"><div><div class="eyebrow">M29_AI</div><h1>Skills / Tools</h1><p>Registry năng lực và điểm gọi API — Tool Gateway là nơi duy nhất Agent được dùng để gọi ra ngoài.</p></div></div>
    <div class="card"><div class="ch"><h3>Skills</h3></div><div class="cb">
      <div class="chiplist">${skills.map((s) => `<span class="pill">${esc(s.name)} ${opBadge(s.status)}</span>`).join('') || '<span class="muted">Chưa có Skill</span>'}</div>
    </div></div>
    <div class="card"><div class="ch"><h3>Tools</h3></div><div class="tablewrap"><table>
      <thead><tr><th>Tool</th><th>Nền tảng</th><th>Endpoint</th><th>Permission</th><th>Trạng thái</th><th>Hành động</th></tr></thead>
      <tbody>${toolsF.map((t) => `<tr><td><b>${esc(t.name)}</b><div class="muted" style="font-size:11.5px">${esc(t.code)}</div></td>
        <td class="muted">${esc(platformName(t.platform_id))}</td><td class="type-tag">${t.http_method} ${esc(t.endpoint)}</td>
        <td><span class="pill">${esc(t.permission_level)}</span></td><td>${opBadge(t.status)}</td>
        <td>${canUI('registry', 'write') ? `<button class="btn small ${t.status === 'ACTIVE' ? 'danger' : 'primary'}" onclick="_toggleTool('${t.id}','${t.status === 'ACTIVE' ? 'DISABLED' : 'ACTIVE'}')">${t.status === 'ACTIVE' ? 'Tắt' : 'Bật'}</button>` : '—'}</td></tr>`).join('') || `<tr><td colspan="6" class="empty">Chưa có Tool trên nền tảng này.</td></tr>`}
      </tbody></table></div></div>`;
}
window._toggleTool = (id, status) => act(() => api.updateTool(id, { status }), status === 'DISABLED' ? 'Đã tắt Tool — Tool Gateway sẽ chặn' : 'Đã bật lại Tool');

// ---------- Prompts ----------
async function screenPrompts() {
  const prompts = await api.prompts();
  const agents = await api.agents();
  const withVersions = await Promise.all(prompts.map(async (p) => ({ p, versions: await api.promptVersions(p.id), agent: agents.find((a) => a.id === p.agent_id) })));
  return `
    <div class="pagehead"><div><div class="eyebrow">M29_AI</div><h1>Prompts</h1><p>Sửa nội dung luôn tạo version mới — bản đang hiệu lực không bị ghi đè.</p></div></div>
    ${withVersions.map(({ p, versions, agent }) => `
      <div class="card"><div class="ch"><h3>${esc(p.code)}</h3><span class="muted" style="margin-left:8px;font-size:12px">Agent: ${esc(agent?.name || p.agent_id)}</span></div>
      <div class="cb">
        <div class="tablewrap"><table><thead><tr><th>Version</th><th>Trạng thái</th><th>Người tạo</th><th>Nội dung</th><th>Hành động</th></tr></thead><tbody>
        ${versions.map((v) => `<tr><td class="rid">${esc(v.id)}</td><td>${promptBadge(v.status)}</td><td class="muted">${esc(v.created_by)}</td>
          <td class="muted" style="max-width:280px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:12px">${esc(v.content)}</td>
          <td>${promptVersionActions(p.id, v)}</td></tr>`).join('')}
        </tbody></table></div>
        ${canUI('registry', 'write') ? `<div class="field" style="margin-top:12px"><label>Tạo version mới</label><textarea class="inp" id="pv-content-${p.id}" placeholder="Nội dung prompt..."></textarea></div>
        <div style="text-align:right;margin-top:8px"><button class="btn small primary" onclick="_newPromptVersion('${p.id}')">Tạo version (Nháp)</button></div>` : ''}
      </div></div>`).join('')}`;
}
function promptVersionActions(promptId, v) {
  if (!canUI('registry', 'write')) return '—';
  if (v.status === 'DRAFT') return `<button class="btn small primary" onclick="_promptTx('${promptId}','${v.id}','submit-review')">Gửi soát xét</button>`;
  if (v.status === 'REVIEW') return `<button class="btn small primary" onclick="_promptTx('${promptId}','${v.id}','approve')">Phê duyệt</button>`;
  if (v.status === 'APPROVED') return `<button class="btn small primary" onclick="_promptTx('${promptId}','${v.id}','activate')">Kích hoạt</button>`;
  return '—';
}
window._newPromptVersion = (promptId) => act(() => api.createPromptVersion(promptId, $(`#pv-content-${promptId}`).value.trim()), 'Đã tạo version mới (Nháp)');
window._promptTx = (promptId, verId, action) => act(() => api.promptVersionTx(promptId, verId, action), 'Đã cập nhật version');

// ---------- Guardrails & Policies ----------
async function screenGovernance() {
  const [guardrails, policies] = await Promise.all([api.guardrails(), api.policies()]);
  return `
    <div class="pagehead"><div><div class="eyebrow">M29_AI</div><h1>Guardrails &amp; Policies</h1><p>AI không bao giờ tự phê duyệt — mọi thay đổi cần người có thẩm quyền.</p></div></div>
    <div class="card"><div class="ch"><h3>Guardrails</h3></div><div class="tablewrap"><table>
      <thead><tr><th>Code</th><th>Scope</th><th>Action</th><th>Vòng đời</th><th>Hành động</th></tr></thead><tbody>
      ${guardrails.map((g) => `<tr><td class="rid">${esc(g.code)}</td><td class="muted">${esc(g.scope)}</td><td><span class="pill">${esc(g.action)}</span></td><td>${approvalBadge(g.approvalStatus)}</td><td>${genericActions('guardrails', g)}</td></tr>`).join('')}
      </tbody></table></div></div>
    <div class="card"><div class="ch"><h3>Policies</h3></div><div class="tablewrap"><table>
      <thead><tr><th>Tên</th><th>Chủ sở hữu</th><th>Vòng đời</th><th>Hành động</th></tr></thead><tbody>
      ${policies.map((p) => `<tr><td>${esc(p.name)}</td><td class="muted">${esc(p.owner)}</td><td>${approvalBadge(p.approvalStatus)}</td><td>${genericActions('policies', p)}</td></tr>`).join('')}
      </tbody></table></div></div>`;
}
function genericActions(resource, r) {
  if (!canUI('governance', 'write')) return '—';
  const call = (action, body) => `_generic('${resource}','${r.id}','${action}'${body ? `,${JSON.stringify(body)}` : ''})`;
  if (r.approvalStatus === 'Nháp') return `<button class="btn small primary" onclick="${call('submit-review')}">Gửi soát xét</button>`;
  if (r.approvalStatus === 'Chờ soát xét') return `<button class="btn small primary" onclick="${call('review', { decision: 'approve' })}">Soát xét đạt</button>`;
  if (r.approvalStatus === 'Chờ phê duyệt') return `<button class="btn small primary" onclick="${call('approve', { decision: 'approve' })}">Phê duyệt</button>`;
  return '—';
}
window._generic = (resource, id, action, body) => act(() => (resource === 'guardrails' ? api.guardrailTx(id, action, body) : api.policyTx(id, action, body)), 'Đã cập nhật vòng đời');

// ---------- AIA ----------
async function screenAia() {
  const list = await api.aiaList();
  const agents = await api.agents();
  return `
    <div class="pagehead"><div><div class="eyebrow">M29_AI · ISO/IEC 42001</div><h1>AI Impact Assessment</h1><p>Bắt buộc cho mọi Agent có rủi ro — người có thẩm quyền phê duyệt, AI không tự kết luận.</p></div></div>
    <div class="card"><div class="tablewrap"><table><thead><tr><th>Mã AIA</th><th>Agent</th><th>Rủi ro</th><th>Trạng thái</th><th>Hành động</th></tr></thead><tbody>
    ${list.map((a) => `<tr><td class="rid">${esc(a.id)}</td><td>${esc(agents.find((ag) => ag.id === a.agent_id)?.name || a.agent_id)}</td><td class="muted">${esc(a.risk)}</td>
      <td>${approvalBadge(a.status === 'APPROVED' ? 'Đã phê duyệt' : a.status)}</td><td>${aiaActions(a)}</td></tr>`).join('') || `<tr><td colspan="5" class="empty">Chưa có hồ sơ AIA.</td></tr>`}
    </tbody></table></div></div>`;
}
function aiaActions(a) {
  if (!canUI('aia', 'write')) return '—';
  if (['NOT_ASSESSED', 'REVIEW_REQUIRED'].includes(a.status)) return `<button class="btn small primary" onclick="_aiaTx('${a.id}','start-draft')">Khởi tạo</button>`;
  if (a.status === 'DRAFT') return `<button class="btn small primary" onclick="_aiaTx('${a.id}','submit-review')">Gửi soát xét</button>`;
  if (a.status === 'REVIEWED') return `<button class="btn small primary" onclick="_aiaTx('${a.id}','approve')">Phê duyệt</button>`;
  return '—';
}
window._aiaTx = (id, action) => act(() => api.aiaTx(id, action), 'Đã cập nhật AIA');

// ---------- Evaluations ----------
async function screenEvaluations() {
  const suites = await api.evalSuites();
  const withRuns = await Promise.all(suites.map(async (s) => ({ s, runs: await api.evalRuns(s.id) })));
  return `
    <div class="pagehead"><div><div class="eyebrow">M29_AI</div><h1>Evaluations</h1><p>Bộ kiểm thử chất lượng Agent — Phase 1 chỉ smoke test.</p></div></div>
    ${withRuns.map(({ s, runs }) => `<div class="card"><div class="ch"><h3>${esc(s.name)}</h3>
      ${canUI('evaluations', 'write') ? `<button class="btn small primary" style="margin-left:auto" onclick="_runEval('${s.id}')">Chạy lại</button>` : ''}</div>
      <div class="cb"><div class="tablewrap"><table><thead><tr><th>Run</th><th>Đạt</th><th>Không đạt</th><th>Trạng thái</th><th>Thời gian</th></tr></thead><tbody>
      ${runs.map((r) => `<tr><td class="rid">${esc(r.id)}</td><td class="num">${r.pass_count}</td><td class="num">${r.fail_count}</td><td><span class="badge ${r.status === 'PASS' ? 'b-good' : 'b-crit'}"><span class="g"></span>${esc(r.status)}</span></td><td class="muted">${fmtTime(r.createdAt)}</td></tr>`).join('')}
      </tbody></table></div></div></div>`).join('') || '<div class="empty">Chưa có Evaluation Suite.</div>'}`;
}
window._runEval = (suiteId) => act(() => api.runEvaluation(suiteId), 'Đã chạy Evaluation');

// ---------- Traces ----------
async function screenTraces() {
  const traces = byPlatform(await api.traces()).slice().reverse();
  return `
    <div class="pagehead"><div><div class="eyebrow">M29_AI</div><h1>Traces &amp; Logs</h1><p>Mỗi lượt gọi AI qua Tool Gateway sinh đúng 1 Trace — bấm để xem chuỗi đầy đủ.</p></div></div>
    <div class="card"><div class="tablewrap"><table><thead><tr><th>TraceId</th><th>Nền tảng</th><th>Agent</th><th>Tokens</th><th>Latency</th><th>Thời gian</th></tr></thead><tbody>
    ${traces.map((r) => `<tr data-open onclick="_go('traceDetail','${r.id}')"><td class="rid">${esc(r.id)}</td><td class="muted">${esc(platformName(r.platform_id))}</td>
      <td class="muted">${esc(r.agent_id || '—')}</td><td class="num">${r.input_tokens + r.output_tokens}</td><td class="num">${r.latency_ms}ms</td><td class="muted">${fmtTime(r.created_at)}</td></tr>`).join('') || `<tr><td colspan="6" class="empty">Chưa có Trace nào.</td></tr>`}
    </tbody></table></div></div>`;
}
async function screenTraceDetail() {
  let t; try { t = await api.trace(route.id); } catch (e) { return loadError(e, 'Trace này'); }
  const r = t.request;
  return `
    <div class="pagehead"><div><div class="eyebrow" style="color:var(--ink-3)">Trace</div><h1>${esc(r.id)}</h1>
      <p>Chuỗi đầy đủ User → Agent → Skill → Tool → API → Result → Model → Tokens → Latency</p></div>
      <button class="btn ghost" onclick="_go('traces')">← Danh sách</button></div>
    <div class="card"><div class="ch"><h3>Request</h3></div><div class="cb">
      <div class="grid3">
        <div class="field"><label>Nền tảng</label><div class="inp ro">${esc(platformName(r.platform_id))}</div></div>
        <div class="field"><label>Agent</label><div class="inp ro">${esc(r.agent_id || '—')}</div></div>
        <div class="field"><label>Model</label><div class="inp ro">${esc(r.model_id || '—')}</div></div>
        <div class="field"><label>User</label><div class="inp ro">${esc(r.user_ref)}</div></div>
        <div class="field"><label>Tokens (in/out)</label><div class="inp ro">${r.input_tokens} / ${r.output_tokens}</div></div>
        <div class="field"><label>Latency</label><div class="inp ro">${r.latency_ms}ms</div></div>
      </div></div></div>
    <div class="card"><div class="ch"><h3>Tool Calls</h3></div><div class="cb">
      ${t.toolCalls.map((c) => `<div class="codebox" style="margin-bottom:8px"><b>${esc(c.tool_id)}</b> · ${esc(c.status)} · ${c.latency_ms}ms\nInput: ${esc(JSON.stringify(c.input))}\nOutput: ${esc(JSON.stringify(c.output))}</div>`).join('') || '<div class="empty">Không có Tool Call.</div>'}
    </div></div>`;
}

// ---------- Usage / Cost ----------
async function screenUsage() {
  const rows = await api.usage(platformFilter !== 'ALL' ? { platformId: platformFilter } : {});
  const totalCost = rows.reduce((s, r) => s + r.cost_estimate, 0);
  return `
    <div class="pagehead"><div><div class="eyebrow">M29_AI</div><h1>Token &amp; Cost</h1><p>Tổng hợp trực tiếp từ Trace theo ngày/nền tảng/agent/model.</p></div></div>
    <div class="kpis"><div class="kpi"><div class="lab">Chi phí ước tính</div><div class="val">$${totalCost.toFixed(6)}</div><div class="sub">${rows.length} nhóm ngày/agent</div></div></div>
    <div class="card"><div class="tablewrap"><table><thead><tr><th>Ngày</th><th>Nền tảng</th><th>Agent</th><th>Model</th><th>Tokens in</th><th>Tokens out</th><th>Chi phí ước tính</th></tr></thead><tbody>
    ${rows.map((r) => `<tr><td>${r.date}</td><td class="muted">${esc(platformName(r.platform_id))}</td><td class="muted">${esc(r.agent_id || '—')}</td><td class="muted">${esc(r.model_id || '—')}</td><td class="num">${r.tokens_in}</td><td class="num">${r.tokens_out}</td><td class="num">$${r.cost_estimate.toFixed(5)}</td></tr>`).join('') || `<tr><td colspan="7" class="empty">Chưa có dữ liệu sử dụng.</td></tr>`}
    </tbody></table></div></div>`;
}

// ---------- Secrets ----------
async function screenSecrets() {
  const list = await api.secrets();
  return `
    <div class="pagehead"><div><div class="eyebrow">M29_AI</div><h1>Secrets</h1><p>Giá trị thật không bao giờ hiển thị — chỉ thấy dạng masked.</p></div></div>
    ${canUI('secrets', 'write') ? `<div class="card"><div class="ch"><h3>Thêm Secret</h3></div><div class="cb">
      <div class="grid3">
        <div class="field"><label>Tên</label><input class="inp" id="s-name" placeholder="VD: GEMINI_API_KEY"/></div>
        <div class="field"><label>Nền tảng</label><select class="inp" id="s-platform">${platformsCache.map((p) => `<option value="${p.id}">${esc(p.name)}</option>`).join('')}</select></div>
        <div class="field"><label>Giá trị</label><input class="inp" id="s-value" type="password" placeholder="giá trị thật"/></div>
      </div>
      <div style="text-align:right;margin-top:10px"><button class="btn small primary" onclick="_createSecret()">Lưu</button></div>
    </div></div>` : ''}
    <div class="card"><div class="tablewrap"><table><thead><tr><th>Tên</th><th>Nền tảng</th><th>Giá trị</th><th>Trạng thái</th><th>Lần xoay gần nhất</th><th>Hành động</th></tr></thead><tbody>
    ${list.map((s) => `<tr><td>${esc(s.name)}</td><td class="muted">${esc(platformName(s.platform_id))}</td><td class="rid">${esc(s.masked_value)}</td><td>${opBadge(s.status)}</td><td class="muted">${fmtTime(s.last_rotated)}</td>
      <td>${canUI('secrets', 'write') ? `<button class="btn small danger" onclick="_disableSecret('${s.id}')">Vô hiệu hóa</button>` : '—'}</td></tr>`).join('') || `<tr><td colspan="6" class="empty">Chưa có Secret.</td></tr>`}
    </tbody></table></div></div>`;
}
window._createSecret = () => act(() => api.createSecret({ name: $('#s-name').value.trim(), platform_id: $('#s-platform').value, value: $('#s-value').value }), 'Đã lưu Secret (masked)');
window._disableSecret = (id) => act(() => api.disableSecret(id), 'Đã vô hiệu hóa Secret');

// ---------- Audit Log ----------
async function screenAudit() {
  const logs = (await api.auditLogs()).slice().reverse();
  return `
    <div class="pagehead"><div><div class="eyebrow">M29_AI</div><h1>Audit Log</h1><p>Append-only — ghi mọi thay đổi cấu hình (actor/entity/before/after/khi nào).</p></div></div>
    <div class="card"><div class="cb"><ul class="audit">
    ${logs.map((l) => `<li><time>${fmtTime(l.at)}</time><div><span class="who">${esc(l.actor)}</span> · ${esc(l.entity_type)}#${esc(l.entity_id)}${l.field ? ` · ${esc(l.field)}: ${esc(l.before)} → ${esc(l.after)}` : ''}${l.reason ? `<div class="muted" style="margin-top:2px">Lý do: ${esc(l.reason)}</div>` : ''}</div></li>`).join('') || '<li class="muted">Chưa có nhật ký.</li>'}
    </ul></div></div>`;
}

// ---------- khung ----------
const SCREENS = { dashboard: screenDashboard, platforms: screenPlatforms, models: screenModels, agents: screenAgents, agentDetail: screenAgentDetail, tools: screenTools, prompts: screenPrompts, governance: screenGovernance, aia: screenAia, evaluations: screenEvaluations, traces: screenTraces, traceDetail: screenTraceDetail, usage: screenUsage, secrets: screenSecrets, audit: screenAudit };
const TITLES = { dashboard: 'Dashboard', platforms: 'Platforms', models: 'Models & Providers', agents: 'Agents', agentDetail: 'Chi tiết Agent', tools: 'Skills / Tools', prompts: 'Prompts', governance: 'Guardrails & Policies', aia: 'AI Impact Assessment', evaluations: 'Evaluations', traces: 'Traces & Logs', traceDetail: 'Chi tiết Trace', usage: 'Token & Cost', secrets: 'Secrets', audit: 'Audit Log' };
const NAV_MAP = { agentDetail: 'agents', traceDetail: 'traces' };

async function render() {
  $('#crumb').textContent = TITLES[route.screen];
  document.querySelectorAll('#nav button[data-screen]').forEach((b) => b.setAttribute('aria-current', b.dataset.screen === (NAV_MAP[route.screen] || route.screen) ? 'true' : 'false'));
  const fn = SCREENS[route.screen] || screenDashboard;
  $('#view').innerHTML = '<div class="empty">Đang tải…</div>';
  try { $('#view').innerHTML = await fn(); }
  catch (e) {
    $('#view').innerHTML = e.status === 403
      ? `<div class="card"><div class="cb"><div class="empty">Vai trò <b>${esc(getRole())}</b> không đủ quyền xem màn hình này — đổi vai trò ở sidebar để thử lại.</div></div></div>`
      : `<div class="card"><div class="cb">Lỗi tải dữ liệu: ${esc(e.message)}</div></div>`;
  }
}

async function refreshPlatformSelect() {
  platformsCache = await api.platforms();
  const sel = $('#platform');
  sel.innerHTML = '<option value="ALL">Tất cả nền tảng</option>' + platformsCache.map((p) => `<option value="${p.id}">${esc(p.name)}</option>`).join('');
  sel.value = platformFilter;
}

async function mount() {
  try { await refreshPlatformSelect(); }
  catch (e) { $('#view').innerHTML = `<div class="card"><div class="cb">Không kết nối được API. Chạy server: <code>node api/server.js</code>.<br>${esc(e.message)}</div></div>`; return; }
  document.querySelectorAll('#nav button[data-screen]').forEach((b) => b.addEventListener('click', () => go(b.dataset.screen)));
  $('#platform').addEventListener('change', (e) => { platformFilter = e.target.value; render(); });
  $('#role').value = getRole();
  $('#role').addEventListener('change', (e) => { setRole(e.target.value); $('#roleDesc').textContent = e.target.value; render(); });
  $('#roleDesc').textContent = getRole();
  $('#theme').addEventListener('click', () => {
    const root = document.documentElement;
    const dark = (root.getAttribute('data-theme') || (matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light')) === 'dark';
    root.setAttribute('data-theme', dark ? 'light' : 'dark');
  });
  $('#reset').addEventListener('click', async () => { if (confirm('Đặt lại dữ liệu mẫu?')) { await api.reset(); await refreshPlatformSelect(); go('dashboard'); } });
  render();
}
document.addEventListener('DOMContentLoaded', mount);
