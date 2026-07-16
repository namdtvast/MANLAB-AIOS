// M10 API — Node built-in http (không phụ thuộc). Phục vụ webapp tĩnh + REST /api.
// Chạy: node server.js   (PORT mặc định 8010, đổi bằng biến môi trường PORT)
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as store from './store.mjs';

const __dir = dirname(fileURLToPath(import.meta.url));
const WEB_DIR = join(__dir, '..', 'webapp');
const PORT = process.env.PORT || 8010;

const MIME = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml', '.json': 'application/json; charset=utf-8', '.ico': 'image/x-icon' };

const json = (res, code, data) => {
  res.writeHead(code, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
  res.end(JSON.stringify(data));
};
const readBody = (req) => new Promise((resolve) => {
  let b = ''; req.on('data', (c) => (b += c)); req.on('end', () => { try { resolve(b ? JSON.parse(b) : {}); } catch { resolve({}); } });
});

// 409 cho vi phạm quy tắc nghiệp vụ (khớp API.md §5)
const RULE_CODES = new Set(['NOT_DRAFT', 'MISSING_REQUIRED', 'REASON_REQUIRED', 'SELF_REVIEW_FORBIDDEN', 'CAPA_REQUIRED', 'BAD_STATE']);
const fail = (res, r) => json(res, RULE_CODES.has(r.code) ? 409 : (r.code === 'NOT_FOUND' ? 404 : 400), { error: r.code, message: r.message });

async function api(req, res, path) {
  const user = store.userFromRole(req.headers['x-role'] || 'LDP');
  const seg = path.split('/').filter(Boolean); // ['api','assessments',':id',...]
  const [, resource, id, action] = seg;

  if (resource === 'kpi' && id === 'summary') return json(res, 200, store.kpi());
  if (resource === 'reset' && req.method === 'POST') return json(res, 200, store.reset());

  if (resource === 'assessments') {
    if (!id) {
      if (req.method === 'GET') return json(res, 200, store.list());
      if (req.method === 'POST') return json(res, 201, store.create(await readBody(req), user));
    } else if (!action) {
      const a = store.byId(id);
      if (!a) return fail(res, { code: 'NOT_FOUND', message: 'Không tìm thấy hồ sơ.' });
      if (req.method === 'GET') return json(res, 200, a);
      if (req.method === 'PUT') return json(res, 200, store.edit(id, await readBody(req)));
    } else {
      const body = req.method === 'POST' ? await readBody(req) : {};
      if (action === 'audit') return json(res, 200, (store.byId(id)?.audit) || []);
      if (action === 'link-capa') { const a = store.linkCapa(id, user); return a ? json(res, 200, a) : fail(res, { code: 'NOT_FOUND', message: 'Không tìm thấy.' }); }
      if (action === 'new-version') { const a = store.newVersion(id, user); return a ? json(res, 200, a) : fail(res, { code: 'NOT_FOUND', message: 'Không tìm thấy.' }); }
      const tx = { 'submit-review': 'submit', review: 'review', approve: 'approve', publish: 'publish' }[action];
      if (tx) { const r = store.transition(id, tx, user, body); return r.ok ? json(res, 200, r.assessment) : fail(res, r); }
    }
  }
  return json(res, 404, { error: 'NOT_FOUND', message: 'Endpoint không tồn tại.' });
}

async function serveStatic(req, res, path) {
  let rel = path === '/' ? '/index.html' : path;
  const full = normalize(join(WEB_DIR, rel));
  if (!full.startsWith(WEB_DIR)) return json(res, 403, { error: 'FORBIDDEN' }); // chống path traversal
  try {
    const data = await readFile(full);
    res.writeHead(200, { 'Content-Type': MIME[extname(full)] || 'application/octet-stream' });
    res.end(data);
  } catch {
    json(res, 404, { error: 'NOT_FOUND', message: 'File không tồn tại.' });
  }
}

createServer(async (req, res) => {
  const path = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  try {
    if (path.startsWith('/api/')) return await api(req, res, path);
    return await serveStatic(req, res, path);
  } catch (e) {
    json(res, 500, { error: 'INTERNAL', message: String(e) });
  }
}).listen(PORT, () => console.log(`M10 API + webapp: http://localhost:${PORT}`));
