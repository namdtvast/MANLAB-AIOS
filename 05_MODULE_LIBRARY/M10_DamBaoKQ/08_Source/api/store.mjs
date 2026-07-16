// M10 API — Lưu trữ file JSON + dispatch có audit trail
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { seed, nowISO, USERS, ROLE_USER } from './model.mjs';
import { T } from './rules.mjs';

const __dir = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dir, 'data');
const DATA_FILE = join(DATA_DIR, 'data.json');

let db = null;

function load() {
  if (db) return db;
  if (existsSync(DATA_FILE)) db = JSON.parse(readFileSync(DATA_FILE, 'utf8'));
  else { db = seed(); save(); }
  return db;
}
function save() {
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
  writeFileSync(DATA_FILE, JSON.stringify(db, null, 2));
}

export const userFromRole = (role) => USERS[ROLE_USER[role]] || USERS['U-LDP'];
export const list = () => load().list;
export const byId = (id) => load().list.find((a) => a.id === id);

export function create(body, user) {
  const d = load();
  const id = `P10-2026-${String(d.seq++).padStart(4, '0')}`;
  const a = {
    id, recordType: body.recordType || 'PT_ILC', object: body.object || '', status: 'Nháp',
    result: body.result ?? null, version: 1, indicators: body.indicators || {},
    planId: body.planId || null, procedureId: body.procedureId || null, personnelId: body.personnelId || null,
    criteriaId: body.criteriaId || null, rawData: body.rawData || 0, evidence: body.evidence || 0, capaId: null,
    pubStatus: null, sourceCertId: null, sourceSnapshotAt: null, releaseAllowed: false, expiresAt: null,
    createdBy: user.id, reviewedBy: null, approvedBy: null,
    audit: [{ ts: nowISO(), actor: user.id, role: user.role, action: 'Tạo hồ sơ', reason: null }],
  };
  d.list.unshift(a); save();
  return a;
}

const EDIT_FIELDS = ['object', 'result', 'indicators', 'rawData', 'evidence', 'planId', 'procedureId', 'personnelId', 'criteriaId'];
export function edit(id, body) {
  const a = byId(id); if (!a) return null;
  for (const f of EDIT_FIELDS) if (f in body) a[f] = body[f];
  save(); return a;
}

function logAudit(a, user, action, reason) {
  a.audit.push({ ts: nowISO(), actor: user.id, role: user.role, action, reason: reason || null });
}

// Áp transition từ rules.T; trả {ok|error, assessment}
export function transition(id, txName, user, args) {
  const a = byId(id); if (!a) return { ok: false, code: 'NOT_FOUND', message: 'Không tìm thấy hồ sơ.' };
  const fn = T[txName]; if (!fn) return { ok: false, code: 'BAD_TX', message: 'Hành động không hợp lệ.' };
  const r = fn(a, user, args);
  if (!r.ok) return r;
  const from = a.status;
  Object.assign(a, r.patch, { status: r.status });
  logAudit(a, user, `${r.action} (${from} → ${r.status})`, r.reason);
  save();
  return { ok: true, assessment: a };
}

export function linkCapa(id, user) {
  const a = byId(id); if (!a) return null;
  a.capaId = 'CAPA-' + a.id.slice(-4);
  logAudit(a, user, `Liên kết KPH-CAPA ${a.capaId} (→ M13)`, null);
  save(); return a;
}

export function newVersion(id, user) {
  const a = byId(id); if (!a) return null;
  a.version += 1; a.status = 'Nháp'; a.reviewedBy = null; a.approvedBy = null;
  logAudit(a, user, `Tạo phiên bản v${a.version} (thay bản đã phê duyệt)`, null);
  save(); return a;
}

export function kpi() {
  const l = list();
  const total = l.length;
  const by = (r) => l.filter((a) => a.result === r).length;
  const capaOpen = l.filter((a) => a.result === 'KHÔNG ĐẠT' && !a.capaId).length;
  return { total, pass: by('ĐẠT'), warning: by('CẢNH BÁO'), fail: by('KHÔNG ĐẠT'), capaOpen };
}

export function reset() { db = seed(); save(); return db; }
