// M10 — Control rules R1–R8, port 1:1 từ
// 05_MODULE_LIBRARY/M10_DamBaoKQ/08_Source/api/rules.mjs (bản authoritative gốc).
// KHÔNG đổi hành vi so với bản gốc — chỉ đổi STATUS/RESULT từ nhãn tiếng Việt
// (string) sang mã enum (khớp M10Status/M10Result trong schema Prisma).
import type { M10RecordType, M10Result, M10Status, M10PubStatus } from "@/generated/prisma/enums";

// record_type không cần trường kỹ thuật (planId/procedureId/criteriaId/personnelId/...)
const NO_TECH = new Set<M10RecordType>(["PLAN", "PUBLICATION"]);

export const PUB_RELEASE: Record<M10PubStatus, boolean> = {
  PASS: true,
  CONDITIONAL: true,
  WARNING: true,
  FAIL_BLOCKED: false,
  EXPIRED: false,
};

export interface AssessmentForRules {
  recordType: M10RecordType;
  status: M10Status;
  result: M10Result | null;
  capaId: string | null;
  expiresAt: Date | null;
  planId: string | null;
  procedureId: string | null;
  criteriaId: string | null;
  personnelId: string | null;
  rawData: number;
  evidence: number;
  createdById: string;
  reviewedById: string | null;
}

export interface M10ActorUser {
  id: string;
  m10Role: string | null; // vai trò M10 của user hiện tại (NTH/LDP/LDV/QLCL/QTHT), null nếu chưa gán
}

export function validateForSubmit(a: AssessmentForRules): string[] {
  const miss: string[] = [];
  if (!NO_TECH.has(a.recordType)) {
    if (!a.planId) miss.push("kế hoạch (plan_id)");
    if (!a.procedureId) miss.push("quy trình (procedure_id)");
    if (!a.criteriaId) miss.push("tiêu chí (criteria_id)");
    if (!a.personnelId) miss.push("nhân sự (personnel_id)");
    if (!a.rawData || a.rawData < 1) miss.push("dữ liệu thô (raw_data)");
    if (!a.evidence || a.evidence < 1) miss.push("bằng chứng (evidence)");
    if (!a.result) miss.push("kết quả (result)");
  }
  return miss;
}

export const canReview = (a: AssessmentForRules, u: M10ActorUser) =>
  u.m10Role === "LDP" && a.createdById !== u.id;

export const canApprove = (a: AssessmentForRules, u: M10ActorUser) =>
  u.m10Role === "LDV" && a.createdById !== u.id && a.reviewedById !== u.id;

export const canPublish = (_a: AssessmentForRules, u: M10ActorUser) => u.m10Role === "LDV";

export const requiresCapa = (a: AssessmentForRules) => a.result === "FAIL" && !a.capaId;

export function derivePubStatus(a: AssessmentForRules): M10PubStatus {
  if (a.expiresAt && a.expiresAt < new Date()) return "EXPIRED";
  if (a.result === "FAIL") return "FAIL_BLOCKED";
  if (a.result === "WARNING") return "WARNING";
  return "PASS";
}

export type TxResult =
  | { ok: true; status: M10Status; action: string; reason: string | null; patch: Record<string, unknown> }
  | { ok: false; code: string; message: string };

const ok = (status: M10Status, action: string, reason: string | null = null, patch: Record<string, unknown> = {}): TxResult => ({
  ok: true,
  status,
  action,
  reason,
  patch,
});
const err = (code: string, message: string): TxResult => ({ ok: false, code, message });

export function txSubmit(a: AssessmentForRules): TxResult {
  if (!(["DRAFT", "RETURNED", "REJECTED"] as M10Status[]).includes(a.status))
    return err("NOT_DRAFT", "Chỉ hồ sơ Nháp/Trả lại/Từ chối mới gửi được.");
  const miss = validateForSubmit(a);
  if (miss.length) return err("MISSING_REQUIRED", "Thiếu: " + miss.join(", "));
  return ok("PENDING_REVIEW", "Gửi soát xét");
}

export function txReview(
  a: AssessmentForRules,
  u: M10ActorUser,
  { decision, reason }: { decision?: "return" | "approve"; reason?: string } = {}
): TxResult {
  if (a.status !== "PENDING_REVIEW") return err("BAD_STATE", "Hồ sơ không ở bước Chờ soát xét.");
  if (!canReview(a, u)) return err("SELF_REVIEW_FORBIDDEN", "Chỉ LĐP (không phải người tạo) được soát xét.");
  if (decision === "return") {
    if (!reason) return err("REASON_REQUIRED", "Trả lại bắt buộc nhập lý do.");
    return ok("RETURNED", "Trả lại khi soát xét", reason, { reviewedById: u.id });
  }
  return ok("PENDING_APPROVAL", "Soát xét đạt → chờ phê duyệt", null, { reviewedById: u.id });
}

export function txApprove(
  a: AssessmentForRules,
  u: M10ActorUser,
  { decision, reason }: { decision?: "reject" | "approve"; reason?: string } = {}
): TxResult {
  if (a.status !== "PENDING_APPROVAL") return err("BAD_STATE", "Hồ sơ không ở bước Chờ phê duyệt.");
  if (!canApprove(a, u)) return err("SELF_REVIEW_FORBIDDEN", "Chỉ LĐV (không phải người tạo/soát xét) được phê duyệt.");
  if (decision === "reject") {
    if (!reason) return err("REASON_REQUIRED", "Từ chối bắt buộc nhập lý do.");
    return ok("REJECTED", "Từ chối phê duyệt", reason, { approvedById: null });
  }
  if (requiresCapa(a)) return err("CAPA_REQUIRED", "Kết quả KHÔNG ĐẠT: bắt buộc liên kết KPH-CAPA trước khi phê duyệt.");
  return ok("APPROVED", "Phê duyệt", null, { approvedById: u.id });
}

export function txPublish(
  a: AssessmentForRules,
  u: M10ActorUser,
  { pubStatus, expiresAt, sourceCertId }: { pubStatus?: M10PubStatus; expiresAt?: Date | null; sourceCertId?: string | null } = {}
): TxResult {
  if (a.status !== "APPROVED") return err("BAD_STATE", "Chỉ hồ sơ Đã phê duyệt mới công bố được.");
  if (!canPublish(a, u)) return err("SELF_REVIEW_FORBIDDEN", "Chỉ LĐV được công bố.");
  const release = pubStatus ? PUB_RELEASE[pubStatus] : false;
  if (!release && requiresCapa(a)) return err("CAPA_REQUIRED", "FAIL-BLOCKED: cần liên kết CAPA (→ M13).");
  return ok("PUBLISHED", `Công bố (${pubStatus})`, null, {
    pubStatus,
    releaseAllowed: release,
    expiresAt: expiresAt ?? null,
    sourceCertId: sourceCertId ?? null,
    sourceSnapshotAt: new Date(),
  });
}
