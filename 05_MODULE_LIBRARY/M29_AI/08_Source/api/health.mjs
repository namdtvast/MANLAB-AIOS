// AIOS Control Plane — System Health: poll nhẹ trạng thái từng Platform (AC-08)
import { load, save } from './db.mjs';
import { getAdapter } from './adapters.mjs';
import { HEALTH, AIA_STATUS, nowISO } from './model.mjs';
import { appendAudit } from './audit.mjs';

export async function checkHealth() {
  const d = load();
  for (const platform of d.platforms) {
    if (platform.approvalStatus !== 'Đã phê duyệt') continue;
    const adapter = getAdapter(platform.adapter_type);
    const r = await adapter.health(platform);
    platform.health = r.ok ? HEALTH.HEALTHY : (r.error === 'NOT_INTEGRATED' ? HEALTH.UNKNOWN : HEALTH.DOWN);
    platform.last_error = r.error || null;
    platform.last_health_check_at = new Date().toISOString();
  }
  save();
  return d.platforms;
}

// AIA workflow đầy đủ (Phase 2) — tự động gắn cờ REVIEW_REQUIRED khi quá hạn review_date,
// không chờ con người phát hiện. Đây là chuyển trạng thái do HỆ THỐNG kích hoạt (đến hạn),
// không phải AI tự kết luận nội dung đánh giá — không vi phạm ràng buộc ISO 42001.
export function checkAiaReviews() {
  const d = load();
  const now = new Date();
  for (const aia of d.aia) {
    if (aia.status !== AIA_STATUS.APPROVED || !aia.review_date) continue;
    if (new Date(aia.review_date) >= now) continue;
    const before = aia.status;
    aia.status = AIA_STATUS.REVIEW_REQUIRED;
    appendAudit({ actor: 'SYSTEM', entityType: 'aia', entityId: aia.id, field: 'status', before, after: aia.status, reason: `Quá hạn rà soát định kỳ (review_date=${aia.review_date})` });
  }
  return d.aia;
}

export function startHealthPolling(intervalMs = 30000) {
  const tick = () => { checkHealth().catch(() => {}); checkAiaReviews(); };
  tick();
  return setInterval(tick, intervalMs);
}
