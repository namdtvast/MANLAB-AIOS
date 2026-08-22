// AIOS webapp — lớp gọi API (fetch). Vai trò gửi qua header X-Role (mô phỏng RBAC).
let ROLE = 'AI_ADMIN';
export function setRole(r) { ROLE = r; }
export function getRole() { return ROLE; }

async function req(method, path, body) {
  const res = await fetch('/api/ai' + path, {
    method,
    headers: { 'Content-Type': 'application/json', 'X-Role': ROLE },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw Object.assign(new Error(data.message || 'Lỗi'), { code: data.errorCode || data.error, status: res.status });
  return data;
}

export const api = {
  // Platforms (M35)
  platforms: () => req('GET', '/platforms'),
  platform: (id) => req('GET', `/platforms/${id}`),
  createPlatform: (b) => req('POST', '/platforms', b),
  updatePlatform: (id, b) => req('PUT', `/platforms/${id}`, b),
  platformTx: (id, action, body) => req('POST', `/platforms/${id}/${action}`, body),

  // Registry (M29)
  providers: () => req('GET', '/providers'),
  createProvider: (b) => req('POST', '/providers', b),
  models: () => req('GET', '/models'),
  createModel: (b) => req('POST', '/models', b),
  updateModel: (id, b) => req('PUT', `/models/${id}`, b),
  agents: () => req('GET', '/agents'),
  agent: (id) => req('GET', `/agents/${id}`),
  createAgent: (b) => req('POST', '/agents', b),
  updateAgent: (id, b) => req('PUT', `/agents/${id}`, b),
  skills: () => req('GET', '/skills'),
  createSkill: (b) => req('POST', '/skills', b),
  tools: () => req('GET', '/tools'),
  createTool: (b) => req('POST', '/tools', b),
  updateTool: (id, b) => req('PUT', `/tools/${id}`, b),
  callTool: (id, agentId, input) => req('POST', `/tools/${id}/call`, { agentId, input }),

  // Prompts
  prompts: () => req('GET', '/prompts'),
  promptVersions: (promptId) => req('GET', `/prompts/${promptId}/versions`),
  createPromptVersion: (promptId, content) => req('POST', `/prompts/${promptId}/versions`, { content }),
  promptVersionTx: (promptId, verId, action) => req('POST', `/prompts/${promptId}/versions/${verId}/${action}`),

  // Guardrails / Policies
  guardrails: () => req('GET', '/guardrails'),
  createGuardrail: (b) => req('POST', '/guardrails', b),
  guardrailTx: (id, action, body) => req('POST', `/guardrails/${id}/${action}`, body),
  policies: () => req('GET', '/policies'),
  createPolicy: (b) => req('POST', '/policies', b),
  policyTx: (id, action, body) => req('POST', `/policies/${id}/${action}`, body),

  // AIA
  aiaList: () => req('GET', '/aia'),
  createAia: (b) => req('POST', '/aia', b),
  aiaTx: (id, action, body) => req('POST', `/aia/${id}/${action}`, body),

  // Evaluations
  evalSuites: () => req('GET', '/evaluations'),
  evalCases: (suiteId) => req('GET', `/evaluations/${suiteId}/cases`),
  evalRuns: (suiteId) => req('GET', `/evaluations/${suiteId}/runs`),
  runEvaluation: (suiteId) => req('POST', `/evaluations/${suiteId}/runs`, {}),

  // Traces / Usage / Secrets / Audit / Health
  traces: () => req('GET', '/traces'),
  trace: (id) => req('GET', `/traces/${id}`),
  usage: (q = {}) => req('GET', '/usage' + qs(q)),
  costs: (q = {}) => req('GET', '/costs' + qs(q)),
  secrets: () => req('GET', '/secrets'),
  createSecret: (b) => req('POST', '/secrets', b),
  rotateSecret: (id, value) => req('POST', `/secrets/${id}/rotate`, { value }),
  disableSecret: (id) => req('POST', `/secrets/${id}/disable`),
  auditLogs: () => req('GET', '/audit-logs'),
  health: () => req('GET', '/health'),
  checkHealth: () => req('POST', '/health'),
  reset: () => req('POST', '/reset'),
};

function qs(params) {
  const parts = Object.entries(params).filter(([, v]) => v).map(([k, v]) => `${k}=${encodeURIComponent(v)}`);
  return parts.length ? '?' + parts.join('&') : '';
}
