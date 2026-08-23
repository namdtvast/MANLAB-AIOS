// M02 — gate/state machine thuần hàm, AUTHORITATIVE. Port từ ETV.P02_BaoMat.md (Đã phê duyệt,
// lần 03) quy tắc 1–10 — xem 01_Requirement/_work/20260823-xay-moi-m02/spec.md để đối chiếu
// "Quyết định phạm vi" (không có 08_Source nguyên mẫu, giống M01/M03).
import type { M02AuthorityLevel, M02CommitmentStatus, M02CommitmentType, M02IncidentStatus } from "@/generated/prisma/enums";

export type TxResult =
  | { ok: true; status: string; action: string; reason: string | null; patch: Record<string, unknown> }
  | { ok: false; code: string; message: string };

const ok = (status: string, action: string, reason: string | null = null, patch: Record<string, unknown> = {}): TxResult => ({
  ok: true,
  status,
  action,
  reason,
  patch,
});
const err = (code: string, message: string): TxResult => ({ ok: false, code, message });

export interface M02ActorUser {
  id: string;
  m02Role: string | null; // NV / TP / QLCL / LDV
}

// ---------- SecurityCommitment ----------

export interface CommitmentForRules {
  status: M02CommitmentStatus;
}

export const canRevokeCommitment = (u: M02ActorUser) => u.m02Role === "TP" || u.m02Role === "QLCL";

export function txRevokeCommitment(c: CommitmentForRules, u: M02ActorUser): TxResult {
  if (c.status !== "HIEU_LUC") return err("BAD_STATE", "Chỉ cam kết Hiệu lực mới thu hồi được.");
  if (!canRevokeCommitment(u)) return err("FORBIDDEN", "Chỉ TP/QLCL được thu hồi cam kết bảo mật.");
  return ok("DA_THU_HOI", "Thu hồi cam kết bảo mật", null, { revokedById: u.id, revokedAt: new Date() });
}

// ---------- VisitorLog — gate quy tắc 2 (bắt buộc cam kết KHÁCH hợp lệ trước) ----------

export interface CommitmentForVisitorGate {
  type: M02CommitmentType;
  status: M02CommitmentStatus;
}

export function validateVisitorCommitment(c: CommitmentForVisitorGate | null): string | null {
  if (!c) return "Không tìm thấy cam kết bảo mật.";
  if (c.type !== "KHACH") return "Cam kết không thuộc loại Khách — không dùng để ghi sổ khách.";
  if (c.status !== "HIEU_LUC") return "Cam kết đã bị thu hồi — không hợp lệ để ghi sổ khách.";
  return null;
}

// ---------- DisclosureApproval — gate quy tắc 5 ----------

export interface DisclosureForRules {
  status: "DRAFT" | "APPROVED";
  customerNotified: boolean;
  legallyProhibitedNotify: boolean;
  authorityLevel: M02AuthorityLevel;
}

export const canApproveDisclosure = (d: DisclosureForRules, u: M02ActorUser) =>
  (d.authorityLevel === "TP" && u.m02Role === "TP") || (d.authorityLevel === "LDV" && u.m02Role === "LDV");

export function txApproveDisclosure(d: DisclosureForRules, u: M02ActorUser): TxResult {
  if (d.status !== "DRAFT") return err("NOT_DRAFT", "Chỉ hồ sơ Đang soạn mới duyệt được.");
  if (!canApproveDisclosure(d, u))
    return err("FORBIDDEN", `Chỉ ${d.authorityLevel === "TP" ? "TP" : "LĐV"} (đúng thẩm quyền đã chọn) được duyệt công bố này.`);
  if (!d.customerNotified && !d.legallyProhibitedNotify) {
    return err(
      "NOTIFY_REQUIRED",
      "Bắt buộc đã thông báo khách hàng trước khi công bố, trừ khi pháp luật cấm thông báo (quy tắc 5 ETV.P02)."
    );
  }
  return ok("APPROVED", "Phê duyệt công bố thông tin", null, { approvedById: u.id });
}

// ---------- SecurityIncident — quy tắc 8 ----------

export interface IncidentForRules {
  status: M02IncidentStatus;
  impactAssessment: string | null;
  correctiveAction: string | null;
}

export const canAssessIncident = (u: M02ActorUser) => u.m02Role === "TP";
export const canCloseIncident = (u: M02ActorUser) => u.m02Role === "TP" || u.m02Role === "LDV";

export function txAssessIncident(
  inc: IncidentForRules,
  u: M02ActorUser,
  { impactAssessment, notificationRequired }: { impactAssessment: string; notificationRequired: boolean }
): TxResult {
  if (inc.status !== "DETECTED") return err("BAD_STATE", "Hồ sơ không ở bước Đã phát hiện.");
  if (!canAssessIncident(u)) return err("FORBIDDEN", "Chỉ TP được đánh giá sự cố bảo mật.");
  if (!impactAssessment) return err("IMPACT_REQUIRED", "Bắt buộc đánh giá phạm vi/hậu quả trước khi chuyển bước.");
  return ok("ASSESSED", "Đánh giá phạm vi/hậu quả sự cố", null, {
    assessedById: u.id,
    impactAssessment,
    notificationRequired,
  });
}

export function txCloseIncident(inc: IncidentForRules, u: M02ActorUser, { correctiveAction }: { correctiveAction: string }): TxResult {
  if (inc.status !== "ASSESSED") return err("BAD_STATE", "Hồ sơ không ở bước Đã đánh giá.");
  if (!canCloseIncident(u)) return err("FORBIDDEN", "Chỉ TP/LĐV được đóng hồ sơ sự cố.");
  if (!correctiveAction) return err("CORRECTIVE_REQUIRED", "Không được đóng hồ sơ khi thiếu biện pháp khắc phục (quy tắc 8 ETV.P02).");
  return ok("CLOSED", "Đóng hồ sơ sự cố — đã khắc phục", null, { closedById: u.id, correctiveAction });
}
