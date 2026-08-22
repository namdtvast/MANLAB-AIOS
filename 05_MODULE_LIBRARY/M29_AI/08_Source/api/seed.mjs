// AIOS Control Plane — dữ liệu mẫu khởi tạo (1 Platform thật trỏ M10, 1 placeholder VI-CONNECT)
import { APPROVAL, PROMPT_STATUS, OP_STATUS, HEALTH, PERMISSION_LEVEL, GUARDRAIL_ACTION, AIA_STATUS, nowISO } from './model.mjs';

export function seed() {
  const t = nowISO();

  const platforms = [
    { id: 'PLAT-MANLAB', code: 'MANLAB', name: 'ManLab (M10 Đảm bảo hiệu lực)', base_url: 'http://localhost:8010', api_base_url: 'http://localhost:8010', environment: 'INTERNAL', health: HEALTH.UNKNOWN, owner: 'Dương Thành Nam', adapter_type: 'ManlabPlatformAdapter', approvalStatus: APPROVAL.APPROVED, createdAt: t },
    { id: 'PLAT-VICONNECT', code: 'VICONNECT', name: 'VI-CONNECT', base_url: null, api_base_url: null, environment: 'STAGING', health: HEALTH.UNKNOWN, owner: '(chưa phân công)', adapter_type: 'PlaceholderPlatformAdapter', approvalStatus: APPROVAL.APPROVED, createdAt: t },
  ];

  const providers = [
    { id: 'PROV-GEMINI', code: 'GEMINI', name: 'Google Gemini', status: OP_STATUS.ACTIVE, createdAt: t },
  ];

  const models = [
    { id: 'MODEL-GEMINI-FLASH', provider_id: 'PROV-GEMINI', model_id: 'gemini-2.5-flash', display_name: 'Gemini 2.5 Flash', purpose: 'Phân tích chỉ số, cảnh báo bất thường', status: OP_STATUS.ACTIVE, temperature: 0.2, max_tokens: 2048, cost_profile_id: 'COST-GEMINI-FLASH', version: 1, createdAt: t },
  ];

  const skills = [
    { id: 'SKILL-PHANTICH-KPI', code: 'PhanTichKPI', name: 'Phân tích KPI đảm bảo hiệu lực', platform_scope: 'MANLAB', version: 1, status: OP_STATUS.ACTIVE, risk_level: 'LOW', createdAt: t },
  ];

  const tools = [
    { id: 'TOOL-M10-KPI', platform_id: 'PLAT-MANLAB', code: 'M10_KpiSummary', name: 'Xem KPI đảm bảo hiệu lực (M10)', endpoint: '/api/kpi/summary', http_method: 'GET', input_schema: {}, output_schema: { total: 'number', pass: 'number', warning: 'number', fail: 'number', capaOpen: 'number' }, permission_level: PERMISSION_LEVEL.READ, risk_level: 'LOW', require_confirmation: false, require_approval: false, status: OP_STATUS.ACTIVE, version: 1, createdAt: t },
  ];

  const agents = [
    { id: 'AGENT-M29-TROLY', platform_id: 'PLAT-MANLAB', code: 'AGENT_TROLY_M29', name: 'Trợ lý AI (M29)', purpose: 'Rà soát chỉ số KPI đảm bảo hiệu lực, gắn cờ cảnh báo — không tự kết luận phù hợp', model_id: 'MODEL-GEMINI-FLASH', active_prompt_version_id: 'PVER-1', status: OP_STATUS.ACTIVE, risk_level: 'MEDIUM', owner: 'Dương Thành Nam', version: 1, skillIds: ['SKILL-PHANTICH-KPI'], toolIds: ['TOOL-M10-KPI'], createdAt: t },
  ];

  const prompts = [
    { id: 'PROMPT-TROLY-M29', code: 'PROMPT_TROLY_M29', agent_id: 'AGENT-M29-TROLY', createdAt: t },
  ];
  const promptVersions = [
    { id: 'PVER-1', prompt_id: 'PROMPT-TROLY-M29', content: 'Bạn là trợ lý rà soát KPI đảm bảo hiệu lực kết quả (M10). Chỉ gắn cờ cảnh báo khi z-score |>=2| hoặc kết quả KHÔNG ĐẠT chưa có CAPA. Không tự kết luận sự phù hợp; luôn đề xuất người đủ năng lực kiểm chứng.', status: PROMPT_STATUS.ACTIVE, created_by: 'U-ADMIN', approved_by: 'U-ADMIN', effective_from: t, createdAt: t },
  ];

  const guardrails = [
    { id: 'GR-NO-AUTOAPPROVE', code: 'NO_AUTO_APPROVE', description: 'AI không được tự đổi trạng thái phê duyệt của hồ sơ nghiệp vụ (ISO/IEC 42001)', scope: 'AGENT', scope_ref: 'AGENT-M29-TROLY', severity: 'HIGH', action: GUARDRAIL_ACTION.BLOCK, approvalStatus: APPROVAL.APPROVED, createdAt: t },
  ];

  const policies = [
    { id: 'POL-AIOS-01', name: 'Chính sách quản trị AI Office', version: 1, owner: 'Dương Thành Nam', approver: 'Dương Thành Nam', effective_date: t, approvalStatus: APPROVAL.APPROVED, reference: 'MP29_AI', createdAt: t },
  ];

  const aia = [
    { id: 'AIA-2026-001', agent_id: 'AGENT-M29-TROLY', purpose: 'Rà soát KPI, gắn cờ cảnh báo cho người thẩm định', data_used: 'Chỉ số kỹ thuật P10 (không có dữ liệu cá nhân)', affected_users: 'Nhân sự phòng thí nghiệm ETV', risk: 'LOW', human_oversight: 'Người thẩm định xác nhận trước khi phê duyệt hồ sơ', controls: 'Guardrail NO_AUTO_APPROVE; Tool Gateway giới hạn READ-only', residual_risk: 'LOW', status: AIA_STATUS.APPROVED, review_date: t, createdAt: t },
  ];

  const evaluationSuites = [
    { id: 'EVSUITE-TROLY-SMOKE', name: 'Smoke test Trợ lý AI (M29)', agent_id: 'AGENT-M29-TROLY', createdAt: t },
  ];
  const evaluationCases = [
    { id: 'EVCASE-1', suite_id: 'EVSUITE-TROLY-SMOKE', input: { 'z-score': 2.4 }, expected: 'flag_warning' },
  ];
  const evaluationRuns = [
    { id: 'EVRUN-1', suite_id: 'EVSUITE-TROLY-SMOKE', agent_version: 1, pass_count: 1, fail_count: 0, status: 'PASS', createdAt: t },
  ];

  return {
    seq: { platform: 3, provider: 2, model: 2, agent: 2, skill: 2, tool: 2, prompt: 2, promptVersion: 2, guardrail: 2, policy: 2, aia: 2, evalSuite: 2, evalCase: 2, evalRun: 2, request: 1, toolCall: 1, auditLog: 1 },
    platforms, providers, models, agents, skills, tools, prompts, promptVersions,
    guardrails, policies, aia, evaluationSuites, evaluationCases, evaluationRuns,
    requests: [], toolCalls: [], auditLogs: [],
  };
}
