// AIOS Control Plane — System Health: poll nhẹ trạng thái từng Platform (AC-08)
import { load, save } from './db.mjs';
import { getAdapter } from './adapters.mjs';
import { HEALTH } from './model.mjs';

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

export function startHealthPolling(intervalMs = 30000) {
  checkHealth().catch(() => {});
  return setInterval(() => checkHealth().catch(() => {}), intervalMs);
}
