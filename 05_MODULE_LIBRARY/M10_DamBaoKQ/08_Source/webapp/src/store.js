// M10_DamBaoKQ — Kho trạng thái (in-memory + localStorage) và dispatch hành động
import { seed, nowISO, USERS } from './model.js';
import { T } from './rules.js';

const LS_KEY = 'm10_assessments_v1';
const LS_ROLE = 'm10_role_v1';

let state = { list: [], role: 'LDP' };
const subs = [];

export function init() {
  const raw = localStorage.getItem(LS_KEY);
  state.list = raw ? JSON.parse(raw) : seed();
  state.role = localStorage.getItem(LS_ROLE) || 'LDP';
  persist();
}

function persist() {
  localStorage.setItem(LS_KEY, JSON.stringify(state.list));
  localStorage.setItem(LS_ROLE, state.role);
  subs.forEach((f) => f(state));
}

export function subscribe(fn) { subs.push(fn); }
export function getState() { return state; }
export function currentUser() { return USERS[state.role]; }
export function setRole(role) { state.role = role; persist(); }
export function byId(id) { return state.list.find((a) => a.id === id); }

export function add(a) { state.list.unshift(a); persist(); }

export function update(id, patch) {
  const a = byId(id);
  Object.assign(a, patch);
  persist();
  return a;
}

// Ghi audit trail (append-only — R6)
function logAudit(a, action, reason) {
  const u = currentUser();
  a.audit = a.audit || [];
  a.audit.push({ ts: nowISO(), actor: u.id, role: u.role, action, reason: reason || null });
}

// Áp một transition từ rules.T; trả về kết quả để UI hiển thị lỗi/thành công
export function transition(id, txName, ...args) {
  const a = byId(id);
  const user = currentUser();
  const r = T[txName](a, user, ...args);
  if (!r.ok) return r;
  const from = a.status;
  Object.assign(a, r.patch, { status: r.status });
  logAudit(a, `${r.action} (${from} → ${r.status})`, r.reason);
  persist();
  return r;
}

export function linkCapa(id) {
  const a = byId(id);
  a.capaId = 'CAPA-' + a.id.slice(-4);
  logAudit(a, `Liên kết KPH-CAPA ${a.capaId} (→ M13)`, null);
  persist();
  return a.capaId;
}

// R6 — sửa bản đã phê duyệt: tạo phiên bản mới thay vì ghi đè
export function newVersion(id) {
  const a = byId(id);
  a.version += 1;
  a.status = 'Nháp';
  a.reviewedBy = null; a.approvedBy = null;
  logAudit(a, `Tạo phiên bản v${a.version} (thay bản đã phê duyệt)`, null);
  persist();
}

export function reset() { localStorage.removeItem(LS_KEY); localStorage.removeItem(LS_ROLE); init(); }
