// M10 webapp — lớp gọi API (fetch). Vai trò gửi qua header X-Role.
let ROLE = 'LDP';
export function setRole(r) { ROLE = r; }

async function req(method, path, body) {
  const res = await fetch('/api' + path, {
    method,
    headers: { 'Content-Type': 'application/json', 'X-Role': ROLE },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw Object.assign(new Error(data.message || 'Lỗi'), { code: data.error, status: res.status });
  return data;
}

export const api = {
  list: () => req('GET', '/assessments'),
  get: (id) => req('GET', `/assessments/${id}`),
  create: (body) => req('POST', '/assessments', body),
  edit: (id, body) => req('PUT', `/assessments/${id}`, body),
  submit: (id) => req('POST', `/assessments/${id}/submit-review`),
  review: (id, decision, reason) => req('POST', `/assessments/${id}/review`, { decision, reason }),
  approve: (id, decision, reason) => req('POST', `/assessments/${id}/approve`, { decision, reason }),
  publish: (id, pubStatus, expiresAt, sourceCertId) => req('POST', `/assessments/${id}/publish`, { pubStatus, expiresAt, sourceCertId }),
  linkCapa: (id) => req('POST', `/assessments/${id}/link-capa`),
  newVersion: (id) => req('POST', `/assessments/${id}/new-version`),
  kpi: () => req('GET', '/kpi/summary'),
  reset: () => req('POST', '/reset'),
};
