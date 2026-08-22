// AIOS Control Plane API — Node built-in http (không phụ thuộc). Phục vụ webapp tĩnh + REST /api/ai.
// Chạy: node server.js   (PORT mặc định 8029, đổi bằng biến môi trường PORT)
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { load, save, col, findById, reset } from './db.mjs';
import * as audit from './audit.mjs';
import * as gateway from './gateway.mjs';
import * as usageMod from './usage.mjs';
import * as secrets from './secrets.mjs';
import { checkHealth, startHealthPolling } from './health.mjs';
import { USERS, ROLE_USER, nowISO, genId, OP_STATUS, PROMPT_STATUS, AIA_STATUS } from './model.mjs';
import { can, approvalTransitions, aiaTransitions, promptTransitions, validateTool } from './rules.mjs';

const __dir = dirname(fileURLToPath(import.meta.url));
const WEB_DIR = join(__dir, '..', 'webapp');
const PORT = process.env.PORT || 8029;

const MIME = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.json': 'application/json; charset=utf-8', '.ico': 'image/x-icon' };

const json = (res, code, data) => { res.writeHead(code, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' }); res.end(JSON.stringify(data)); };
const readBody = (req) => new Promise((resolve) => { let b = ''; req.on('data', (c) => (b += c)); req.on('end', () => { try { resolve(b ? JSON.parse(b) : {}); } catch { resolve({}); } }); });

const RULE_CODES = new Set(['NOT_DRAFT', 'BAD_STATE', 'REASON_REQUIRED', 'EXECUTE_REQUIRES_GUARD', 'TOOL_DISABLED']);
function fail(res, r) {
  const code = RULE_CODES.has(r.code) ? 409 : r.code === 'NOT_FOUND' ? 404 : r.code === 'FORBIDDEN' || r.code === 'TOOL_NOT_WHITELISTED' ? 403 : 400;
  return json(res, code, { traceId: genId('ERR'), errorCode: r.code, component: 'aios-control-plane', timestamp: nowISO(), message: r.message });
}
const denied = (res) => fail(res, { code: 'FORBIDDEN', message: 'Không đủ quyền truy cập tài nguyên này.' });
const notFound = (res, msg = 'Không tìm thấy.') => fail(res, { code: 'NOT_FOUND', message: msg });

function simpleCrud(collectionName, prefix) {
  return {
    list: () => col(collectionName),
    create(body, user) {
      const id = genId(prefix);
      const rec = { id, status: OP_STATUS.ACTIVE, version: 1, ...body, createdAt: nowISO() };
      col(collectionName).push(rec); save();
      audit.appendAudit({ actor: user.id, entityType: collectionName, entityId: id, after: rec, reason: 'create' });
      return rec;
    },
    get: (id) => findById(collectionName, id),
    update(id, body, user) {
      const rec = findById(collectionName, id); if (!rec) return null;
      const before = { ...rec };
      Object.assign(rec, body); save();
      audit.appendAudit({ actor: user.id, entityType: collectionName, entityId: id, before, after: rec, reason: 'update' });
      return rec;
    },
  };
}
const providers = simpleCrud('providers', 'PROV');
const models = simpleCrud('models', 'MODEL');
const skills = simpleCrud('skills', 'SKILL');
const agentsCrud = simpleCrud('agents', 'AGENT');
const toolsCrud = simpleCrud('tools', 'TOOL');

function agentDetail(id) {
  const agent = findById('agents', id); if (!agent) return null;
  const model = findById('models', agent.model_id) || null;
  const activePrompt = findById('promptVersions', agent.active_prompt_version_id) || null;
  const agentSkills = col('skills').filter((s) => (agent.skillIds || []).includes(s.id));
  const agentTools = col('tools').filter((t) => (agent.toolIds || []).includes(t.id));
  const guardrails = col('guardrails').filter((g) => g.scope_ref === id || g.scope === 'SYSTEM');
  const aiaRec = col('aia').find((a) => a.agent_id === id) || null;
  const evalRuns = col('evaluationRuns').filter((r) => col('evaluationSuites').some((s) => s.id === r.suite_id && s.agent_id === id));
  const lastEval = evalRuns.slice(-1)[0] || null;
  return { ...agent, model, activePrompt, skills: agentSkills, tools: agentTools, guardrails, aia: aiaRec, lastEvaluation: lastEval };
}

// Vòng đời chuẩn (submit-review / review / approve / archive) dùng cho Platform/Guardrail/Policy.
async function approvalAction(res, collectionName, id, action, body, user) {
  const rec = findById(collectionName, id); if (!rec) return notFound(res);
  const fn = approvalTransitions[action]; if (!fn) return fail(res, { code: 'BAD_TX', message: 'Hành động không hợp lệ.' });
  const r = fn(rec, user, body);
  if (!r.ok) return fail(res, r);
  const before = { ...rec };
  Object.assign(rec, r.patch, { approvalStatus: r.status });
  save();
  audit.appendAudit({ actor: user.id, entityType: collectionName, entityId: id, field: 'approvalStatus', before: before.approvalStatus, after: r.status, reason: r.reason });
  return json(res, 200, rec);
}

async function api(req, res, path) {
  const role = req.headers['x-role'] || 'AI_VIEWER';
  const user = USERS[ROLE_USER[role]] || USERS['U-VIEWER'];
  const seg = path.split('/').filter(Boolean); // ['api','ai', resource, id, sub, subid, subaction]
  const [, , resource, id, sub, subid, subaction] = seg;
  const body = (req.method === 'POST' || req.method === 'PUT') ? await readBody(req) : {};

  // ---------- Platforms (M35_NenTangSo) ----------
  if (resource === 'platforms') {
    if (!can(role, 'platforms', id && req.method !== 'GET' ? 'write' : 'read')) return denied(res);
    if (!id) {
      if (req.method === 'GET') return json(res, 200, col('platforms'));
      if (req.method === 'POST') {
        if (!can(role, 'platforms', 'write')) return denied(res);
        const rec = { id: genId('PLAT'), health: 'UNKNOWN', approvalStatus: 'Nháp', createdAt: nowISO(), ...body };
        col('platforms').push(rec); save();
        audit.appendAudit({ actor: user.id, entityType: 'platforms', entityId: rec.id, after: rec, reason: 'create' });
        return json(res, 201, rec);
      }
    } else if (!sub) {
      const p = findById('platforms', id); if (!p) return notFound(res);
      if (req.method === 'GET') return json(res, 200, p);
      if (req.method === 'PUT') {
        if (!can(role, 'platforms', 'write')) return denied(res);
        const before = { ...p }; Object.assign(p, body); save();
        audit.appendAudit({ actor: user.id, entityType: 'platforms', entityId: id, before, after: p, reason: 'update' });
        return json(res, 200, p);
      }
    } else if (sub === 'health' && req.method === 'GET') {
      return json(res, 200, { health: findById('platforms', id)?.health, last_error: findById('platforms', id)?.last_error, last_health_check_at: findById('platforms', id)?.last_health_check_at });
    } else if (sub === 'audit' && req.method === 'GET') {
      return json(res, 200, audit.listAudit().filter((a) => a.entity_type === 'platforms' && a.entity_id === id));
    } else if (['submit-review', 'review', 'approve', 'archive'].includes(sub) && req.method === 'POST') {
      const tx = { 'submit-review': 'submit' }[sub] || sub;
      return approvalAction(res, 'platforms', id, tx, body, user);
    }
    return notFound(res, 'Endpoint platform không tồn tại.');
  }

  // ---------- Provider / Model / Skill (CRUD đơn giản) ----------
  const simple = { providers, models, skills }[resource];
  if (simple) {
    if (!can(role, 'registry', id ? 'write' : 'read') && req.method !== 'GET') return denied(res);
    if (!can(role, 'registry', 'read') && req.method === 'GET') return denied(res);
    if (!id) {
      if (req.method === 'GET') return json(res, 200, simple.list());
      if (req.method === 'POST') return json(res, 201, simple.create(body, user));
    } else {
      const rec = simple.get(id); if (!rec) return notFound(res);
      if (req.method === 'GET') return json(res, 200, rec);
      if (req.method === 'PUT') return json(res, 200, simple.update(id, body, user));
    }
    return notFound(res);
  }

  // ---------- Agents ----------
  if (resource === 'agents') {
    if (!can(role, 'registry', 'read')) return denied(res);
    if (!id) {
      if (req.method === 'GET') return json(res, 200, col('agents'));
      if (req.method === 'POST') { if (!can(role, 'registry', 'write')) return denied(res); return json(res, 201, agentsCrud.create({ skillIds: [], toolIds: [], ...body }, user)); }
    } else if (!sub) {
      if (req.method === 'GET') { const d = agentDetail(id); return d ? json(res, 200, d) : notFound(res); }
      if (req.method === 'PUT') { if (!can(role, 'registry', 'write')) return denied(res); const r = agentsCrud.update(id, body, user); return r ? json(res, 200, r) : notFound(res); }
    }
    return notFound(res);
  }

  // ---------- Tools (+ Tool Gateway) ----------
  if (resource === 'tools') {
    if (!id) {
      if (req.method === 'GET') { if (!can(role, 'registry', 'read')) return denied(res); return json(res, 200, col('tools')); }
      if (req.method === 'POST') {
        if (!can(role, 'registry', 'write')) return denied(res);
        const v = validateTool(body); if (!v.ok) return fail(res, v);
        return json(res, 201, toolsCrud.create(body, user));
      }
    } else if (!sub) {
      const t = findById('tools', id); if (!t) return notFound(res);
      if (req.method === 'GET') { if (!can(role, 'registry', 'read')) return denied(res); return json(res, 200, t); }
      if (req.method === 'PUT') {
        if (!can(role, 'registry', 'write')) return denied(res);
        const merged = { ...t, ...body }; const v = validateTool(merged); if (!v.ok) return fail(res, v);
        return json(res, 200, toolsCrud.update(id, body, user));
      }
    } else if (sub === 'call' && req.method === 'POST') {
      const r = await gateway.callTool({ toolId: id, agentId: body.agentId, input: body.input, user });
      return r.ok ? json(res, 200, r) : fail(res, r);
    }
    return notFound(res);
  }

  // ---------- Prompts + versions ----------
  if (resource === 'prompts') {
    if (!can(role, 'registry', 'read')) return denied(res);
    if (!id) {
      if (req.method === 'GET') return json(res, 200, col('prompts'));
      if (req.method === 'POST') {
        if (!can(role, 'registry', 'write')) return denied(res);
        const rec = { id: genId('PROMPT'), createdAt: nowISO(), ...body };
        col('prompts').push(rec); save();
        return json(res, 201, rec);
      }
    } else if (sub === 'versions') {
      const versions = () => col('promptVersions').filter((v) => v.prompt_id === id);
      if (!subid) {
        if (req.method === 'GET') return json(res, 200, versions());
        if (req.method === 'POST') {
          if (!can(role, 'registry', 'write')) return denied(res);
          const rec = { id: genId('PVER'), prompt_id: id, content: body.content || '', status: PROMPT_STATUS.DRAFT, created_by: user.id, approved_by: null, effective_from: null, createdAt: nowISO() };
          col('promptVersions').push(rec); save();
          audit.appendAudit({ actor: user.id, entityType: 'promptVersions', entityId: rec.id, after: rec, reason: 'new-version' });
          return json(res, 201, rec);
        }
      } else if (!subaction && req.method === 'GET') {
        const v = findById('promptVersions', subid); return v ? json(res, 200, v) : notFound(res);
      } else if (['submit-review', 'approve', 'activate'].includes(subaction) && req.method === 'POST') {
        if (!can(role, 'registry', 'write')) return denied(res);
        const v = findById('promptVersions', subid); if (!v) return notFound(res);
        const fnName = subaction === 'submit-review' ? 'submitReview' : subaction;
        const r = promptTransitions[fnName](v, user); if (!r.ok) return fail(res, r);
        const before = v.status;
        Object.assign(v, r.patch, { status: r.status });
        if (r.status === PROMPT_STATUS.ACTIVE) {
          const agent = col('agents').find((a) => a.id === col('prompts').find((p) => p.id === id)?.agent_id);
          if (agent) {
            const prevActiveId = agent.active_prompt_version_id;
            if (prevActiveId && prevActiveId !== v.id) { const prev = findById('promptVersions', prevActiveId); if (prev) prev.status = PROMPT_STATUS.ARCHIVED; }
            agent.active_prompt_version_id = v.id;
          }
        }
        save();
        audit.appendAudit({ actor: user.id, entityType: 'promptVersions', entityId: v.id, field: 'status', before, after: r.status, reason: r.reason });
        return json(res, 200, v);
      }
    }
    return notFound(res);
  }

  // ---------- Guardrails / Policies (vòng đời chuẩn) ----------
  if (resource === 'guardrails' || resource === 'policies') {
    if (!can(role, 'governance', id && req.method !== 'GET' ? 'write' : 'read')) return denied(res);
    if (!id) {
      if (req.method === 'GET') return json(res, 200, col(resource));
      if (req.method === 'POST') {
        const rec = { id: genId(resource === 'guardrails' ? 'GR' : 'POL'), approvalStatus: 'Nháp', createdAt: nowISO(), ...body };
        col(resource).push(rec); save();
        audit.appendAudit({ actor: user.id, entityType: resource, entityId: rec.id, after: rec, reason: 'create' });
        return json(res, 201, rec);
      }
    } else if (!sub) {
      const rec = findById(resource, id); if (!rec) return notFound(res);
      if (req.method === 'GET') return json(res, 200, rec);
      if (req.method === 'PUT') {
        const before = { ...rec }; Object.assign(rec, body); save();
        audit.appendAudit({ actor: user.id, entityType: resource, entityId: id, before, after: rec, reason: 'update' });
        return json(res, 200, rec);
      }
    } else if (['submit-review', 'review', 'approve', 'archive'].includes(sub) && req.method === 'POST') {
      const tx = { 'submit-review': 'submit' }[sub] || sub;
      return approvalAction(res, resource, id, tx, body, user);
    }
    return notFound(res);
  }

  // ---------- AI Impact Assessment (AIA) ----------
  if (resource === 'aia') {
    if (!can(role, 'aia', id && req.method !== 'GET' ? 'write' : 'read')) return denied(res);
    if (!id) {
      if (req.method === 'GET') return json(res, 200, col('aia'));
      if (req.method === 'POST') {
        const rec = { id: genId('AIA'), status: AIA_STATUS.NOT_ASSESSED, createdAt: nowISO(), ...body };
        col('aia').push(rec); save();
        audit.appendAudit({ actor: user.id, entityType: 'aia', entityId: rec.id, after: rec, reason: 'create' });
        return json(res, 201, rec);
      }
    } else if (!sub) {
      const rec = findById('aia', id); if (!rec) return notFound(res);
      if (req.method === 'GET') return json(res, 200, rec);
      if (req.method === 'PUT') {
        const before = { ...rec }; Object.assign(rec, body); save();
        audit.appendAudit({ actor: user.id, entityType: 'aia', entityId: id, before, after: rec, reason: 'update' });
        return json(res, 200, rec);
      }
    } else if (['start-draft', 'submit-review', 'approve', 'flag-review-required'].includes(sub) && req.method === 'POST') {
      const rec = findById('aia', id); if (!rec) return notFound(res);
      const fnName = { 'start-draft': 'startDraft', 'submit-review': 'submitReview', approve: 'approve', 'flag-review-required': 'flagReviewRequired' }[sub];
      const r = aiaTransitions[fnName](rec, user, body); if (!r.ok) return fail(res, r);
      const before = rec.status; Object.assign(rec, r.patch, { status: r.status }); save();
      audit.appendAudit({ actor: user.id, entityType: 'aia', entityId: id, field: 'status', before, after: r.status, reason: r.reason });
      return json(res, 200, rec);
    }
    return notFound(res);
  }

  // ---------- Evaluations (Suite/Case/Run) ----------
  if (resource === 'evaluations') {
    if (!can(role, 'evaluations', 'read')) return denied(res);
    if (!id) {
      if (req.method === 'GET') return json(res, 200, col('evaluationSuites'));
      if (req.method === 'POST') {
        if (!can(role, 'evaluations', 'write')) return denied(res);
        const rec = { id: genId('EVSUITE'), createdAt: nowISO(), ...body };
        col('evaluationSuites').push(rec); save();
        audit.appendAudit({ actor: user.id, entityType: 'evaluationSuites', entityId: rec.id, after: rec, reason: 'create' });
        return json(res, 201, rec);
      }
    } else if (sub === 'cases') {
      if (req.method === 'GET') return json(res, 200, col('evaluationCases').filter((c) => c.suite_id === id));
      if (req.method === 'POST') {
        if (!can(role, 'evaluations', 'write')) return denied(res);
        const rec = { id: genId('EVCASE'), suite_id: id, ...body }; col('evaluationCases').push(rec); save();
        audit.appendAudit({ actor: user.id, entityType: 'evaluationCases', entityId: rec.id, after: rec, reason: 'create' });
        return json(res, 201, rec);
      }
    } else if (sub === 'runs') {
      if (req.method === 'GET') return json(res, 200, col('evaluationRuns').filter((r) => r.suite_id === id));
      if (req.method === 'POST') {
        if (!can(role, 'evaluations', 'write')) return denied(res);
        const cases = col('evaluationCases').filter((c) => c.suite_id === id);
        const rec = { id: genId('EVRUN'), suite_id: id, agent_version: body.agent_version || 1, pass_count: cases.length, fail_count: 0, status: cases.length ? 'PASS' : 'NO_CASES', createdAt: nowISO() };
        col('evaluationRuns').push(rec); save();
        return json(res, 201, rec);
      }
    } else if (!sub && req.method === 'GET') { const rec = findById('evaluationSuites', id); return rec ? json(res, 200, rec) : notFound(res); }
    return notFound(res);
  }

  // ---------- Traces ----------
  if (resource === 'traces') {
    if (!can(role, 'traces', 'read')) return denied(res);
    if (!id) return json(res, 200, gateway.listTraces());
    const t = gateway.getTrace(id); return t ? json(res, 200, t) : notFound(res);
  }

  // ---------- Usage / Costs ----------
  if (resource === 'usage' || resource === 'costs') {
    if (!can(role, 'usage', 'read')) return denied(res);
    const url = new URL(req.url, 'http://localhost');
    const filter = { platformId: url.searchParams.get('platformId') || undefined, agentId: url.searchParams.get('agentId') || undefined, modelId: url.searchParams.get('modelId') || undefined };
    return json(res, 200, resource === 'usage' ? usageMod.usage(filter) : { total_cost_estimate: usageMod.costs(filter) });
  }

  // ---------- Secrets ----------
  if (resource === 'secrets') {
    if (!can(role, 'secrets', id && req.method !== 'GET' ? 'write' : 'read')) return denied(res);
    if (!id) {
      if (req.method === 'GET') return json(res, 200, secrets.list());
      if (req.method === 'POST') {
        const rec = secrets.create(body);
        audit.appendAudit({ actor: user.id, entityType: 'secrets', entityId: rec.id, after: rec.masked_value, reason: 'create' });
        return json(res, 201, rec);
      }
    } else if (sub === 'rotate' && req.method === 'POST') {
      const r = secrets.rotate(id, body.value); if (!r) return notFound(res);
      audit.appendAudit({ actor: user.id, entityType: 'secrets', entityId: id, field: 'masked_value', after: r.masked_value, reason: 'rotate' });
      return json(res, 200, r);
    } else if (sub === 'disable' && req.method === 'POST') {
      const r = secrets.disable(id); if (!r) return notFound(res);
      audit.appendAudit({ actor: user.id, entityType: 'secrets', entityId: id, field: 'status', after: 'DISABLED', reason: 'disable' });
      return json(res, 200, r);
    } else if (!sub && req.method === 'GET') { const r = secrets.get(id); return r ? json(res, 200, r) : notFound(res); }
    return notFound(res);
  }

  // ---------- Audit Log (read-only) ----------
  if (resource === 'audit-logs') {
    if (!can(role, 'audit', 'read')) return denied(res);
    return json(res, 200, audit.listAudit());
  }

  // ---------- System Health ----------
  if (resource === 'health') {
    if (req.method === 'POST') { const platforms = await checkHealth(); return json(res, 200, platforms); }
    return json(res, 200, col('platforms').map((p) => ({ id: p.id, code: p.code, name: p.name, health: p.health, last_error: p.last_error, last_health_check_at: p.last_health_check_at })));
  }

  if (resource === 'reset' && req.method === 'POST') { reset(); return json(res, 200, load()); }

  return json(res, 404, { error: 'NOT_FOUND', message: 'Endpoint không tồn tại.' });
}

async function serveStatic(req, res, path) {
  let rel = path === '/' ? '/index.html' : path;
  const full = normalize(join(WEB_DIR, rel));
  if (!full.startsWith(WEB_DIR)) return json(res, 403, { error: 'FORBIDDEN' });
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
    if (path.startsWith('/api/ai/') || path === '/api/reset') return await api(req, res, path.replace('/api/reset', '/api/ai/reset'));
    return await serveStatic(req, res, path);
  } catch (e) {
    json(res, 500, { error: 'INTERNAL', message: String(e) });
  }
}).listen(PORT, () => {
  console.log(`AIOS Control Plane API + webapp: http://localhost:${PORT}`);
  startHealthPolling();
});
