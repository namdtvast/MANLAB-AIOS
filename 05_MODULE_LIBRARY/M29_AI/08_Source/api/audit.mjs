// AIOS Control Plane — Audit Log append-only (ghi mọi thay đổi cấu hình)
import { load, save, nextSeq } from './db.mjs';
import { nowISO } from './model.mjs';

export function appendAudit({ actor, entityType, entityId, field = null, before = null, after = null, reason = null }) {
  const d = load();
  const entry = { id: `AUDIT-${nextSeq('auditLog')}`, actor, entity_type: entityType, entity_id: entityId, field, before, after, reason, at: nowISO() };
  d.auditLogs.push(entry);
  save();
  return entry;
}

export const listAudit = () => load().auditLogs;
