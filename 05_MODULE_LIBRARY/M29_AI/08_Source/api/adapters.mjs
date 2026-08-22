// AIOS Control Plane — IAIPlatformAdapter: cách gọi API thật của từng nền tảng, tách khỏi
// Tool Gateway để không rải `if (platform === "ManLab")` trong logic nghiệp vụ chung.

async function callWithTimeout(url, options, ms) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), ms);
  try {
    const started = Date.now();
    const res = await fetch(url, { ...options, signal: ctrl.signal });
    const output = await res.json().catch(() => null);
    return { status: res.status, output, latency_ms: Date.now() - started };
  } finally {
    clearTimeout(timer);
  }
}

const ManlabPlatformAdapter = {
  async call(platform, tool, input) {
    if (!platform.api_base_url) return { status: 502, output: null, latency_ms: 0, error_code: 'NO_API_BASE_URL' };
    const url = platform.api_base_url + tool.endpoint;
    try {
      const r = await callWithTimeout(url, {
        method: tool.http_method || 'GET',
        headers: { 'Content-Type': 'application/json' },
        body: tool.http_method && tool.http_method !== 'GET' ? JSON.stringify(input || {}) : undefined,
      }, 5000);
      return { ...r, error_code: r.status >= 400 ? 'PLATFORM_ERROR' : null };
    } catch (e) {
      return { status: 504, output: null, latency_ms: 5000, error_code: e.name === 'AbortError' ? 'TIMEOUT' : 'CONNECTION_ERROR' };
    }
  },
  async health(platform) {
    if (!platform.api_base_url) return { ok: false, error: 'NO_API_BASE_URL' };
    try {
      const r = await callWithTimeout(platform.api_base_url + '/api/kpi/summary', {}, 3000);
      return { ok: r.status < 400, error: r.status >= 400 ? `HTTP ${r.status}` : null };
    } catch (e) {
      return { ok: false, error: e.name === 'AbortError' ? 'TIMEOUT' : String(e.message || e) };
    }
  },
};

const PlaceholderPlatformAdapter = {
  async call() {
    return { status: 501, output: null, latency_ms: 0, error_code: 'NOT_INTEGRATED' };
  },
  async health() {
    return { ok: false, error: 'NOT_INTEGRATED' };
  },
};

const ADAPTERS = { ManlabPlatformAdapter, PlaceholderPlatformAdapter };
export const getAdapter = (adapterType) => ADAPTERS[adapterType] || PlaceholderPlatformAdapter;
