// M29 — RBAC + vòng đời phê duyệt, port 1:1 từ
// 05_MODULE_LIBRARY/M29_AI/08_Source/api/rules.mjs (bản authoritative gốc).
// KHÔNG đổi hành vi so với bản gốc — chỉ đổi nhãn tiếng Việt trạng thái sang mã enum.
import type { AIApprovalStatus, AIAStatus, AIPermissionLevel, AIPromptStatus } from "@/generated/prisma/enums";
import { ROLE_RANK, TOOL_MIN_ROLE, type M29Role } from "./model";

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

// Vòng đời chuẩn (Nháp→Chờ soát xét→Chờ phê duyệt→Đã phê duyệt→Hết hiệu lực/Hủy) — dùng chung
// cho Platform/Guardrail/Policy.
export const approvalTransitions = {
  submit(entity: { approvalStatus: AIApprovalStatus }): TxResult {
    if (!(["DRAFT", "RETURNED", "REJECTED"] as AIApprovalStatus[]).includes(entity.approvalStatus))
      return err("NOT_DRAFT", "Chỉ bản ghi Nháp/Không soát xét/Không phê duyệt mới gửi được.");
    return ok("PENDING_REVIEW", "Gửi soát xét");
  },

  review(entity: { approvalStatus: AIApprovalStatus }, extra: { decision?: "return" | "approve"; reason?: string } = {}): TxResult {
    if (entity.approvalStatus !== "PENDING_REVIEW") return err("BAD_STATE", "Không ở bước Chờ soát xét.");
    if (extra.decision === "return") {
      if (!extra.reason) return err("REASON_REQUIRED", "Trả lại bắt buộc nhập lý do.");
      return ok("RETURNED", "Trả lại khi soát xét", extra.reason);
    }
    return ok("PENDING_APPROVAL", "Soát xét đạt → chờ phê duyệt");
  },

  approve(
    entity: { approvalStatus: AIApprovalStatus },
    user: { id: string },
    extra: { decision?: "reject" | "approve"; reason?: string } = {}
  ): TxResult {
    if (entity.approvalStatus !== "PENDING_APPROVAL") return err("BAD_STATE", "Không ở bước Chờ phê duyệt.");
    if (extra.decision === "reject") {
      if (!extra.reason) return err("REASON_REQUIRED", "Từ chối bắt buộc nhập lý do.");
      return ok("REJECTED", "Từ chối phê duyệt", extra.reason);
    }
    return ok("APPROVED", "Phê duyệt", null, { approvedBy: user.id });
  },

  archive(entity: { approvalStatus: AIApprovalStatus }, extra: { reason?: string } = {}): TxResult {
    if (entity.approvalStatus !== "APPROVED") return err("BAD_STATE", "Chỉ bản ghi Đã phê duyệt mới Hết hiệu lực/Hủy được.");
    if (!extra.reason) return err("REASON_REQUIRED", "Hết hiệu lực/Hủy bắt buộc nhập lý do.");
    return ok("ARCHIVED", "Hết hiệu lực/Hủy", extra.reason);
  },
};

// AIA dùng bộ trạng thái riêng (NOT_ASSESSED/DRAFT/REVIEWED/APPROVED/REVIEW_REQUIRED).
export const aiaTransitions = {
  startDraft(a: { status: AIAStatus }): TxResult {
    if (!(["NOT_ASSESSED", "REVIEW_REQUIRED"] as AIAStatus[]).includes(a.status))
      return err("BAD_STATE", "Chỉ khởi tạo từ Chưa đánh giá/Cần rà soát lại.");
    return ok("DRAFT", "Khởi tạo AIA");
  },
  submitReview(a: { status: AIAStatus }): TxResult {
    if (a.status !== "DRAFT") return err("BAD_STATE", "Chỉ Nháp mới gửi soát xét được.");
    return ok("REVIEWED", "Đã soát xét");
  },
  approve(a: { status: AIAStatus }, user: { id: string }): TxResult {
    if (a.status !== "REVIEWED") return err("BAD_STATE", "Chỉ AIA Đã soát xét mới phê duyệt được.");
    return ok("APPROVED", "Phê duyệt AIA", null, { approvedBy: user.id });
  },
  flagReviewRequired(a: { status: AIAStatus }, extra: { reason?: string } = {}): TxResult {
    if (a.status !== "APPROVED") return err("BAD_STATE", "Chỉ AIA Đã phê duyệt mới gắn cờ cần rà soát lại.");
    if (!extra.reason) return err("REASON_REQUIRED", "Gắn cờ rà soát lại bắt buộc nhập lý do.");
    return ok("REVIEW_REQUIRED", "Gắn cờ cần rà soát lại", extra.reason);
  },
};

// Prompt version: chỉ 1 bản ACTIVE / agent; sửa nội dung luôn tạo bản mới.
export const promptTransitions = {
  submitReview(v: { status: AIPromptStatus }): TxResult {
    if (v.status !== "DRAFT") return err("BAD_STATE", "Chỉ version Nháp mới gửi soát xét được.");
    return ok("REVIEW", "Gửi soát xét");
  },
  approve(v: { status: AIPromptStatus }, user: { id: string }): TxResult {
    if (v.status !== "REVIEW") return err("BAD_STATE", "Chỉ version đang soát xét mới phê duyệt được.");
    return ok("APPROVED", "Phê duyệt version", null, { approvedBy: user.id });
  },
  // activate() KHÔNG tự kiểm tra deploymentGate — actions.ts gọi evaluation.ts#deploymentGate
  // riêng trước khi gọi transition này, giữ đúng tách lớp của bản gốc (deploymentGate nằm
  // trong server.js, không phải rules.mjs).
  activate(v: { status: AIPromptStatus }): TxResult {
    if (v.status !== "APPROVED") return err("BAD_STATE", "Chỉ version Đã phê duyệt mới kích hoạt được.");
    return ok("ACTIVE", "Kích hoạt version");
  },
};

// Ràng buộc dữ liệu Tool.
export function validateTool(t: { permissionLevel: AIPermissionLevel; requireConfirmation: boolean; requireApproval: boolean }): TxResult {
  if (t.permissionLevel === "EXECUTE" && !t.requireConfirmation && !t.requireApproval)
    return err("EXECUTE_REQUIRES_GUARD", "Tool permissionLevel=EXECUTE bắt buộc requireConfirmation hoặc requireApproval.");
  return { ok: true, status: "", action: "", reason: null, patch: {} };
}

// Tool Gateway: user có đủ quyền tối thiểu theo permissionLevel của Tool không.
export function hasToolPermission(role: M29Role | null, tool: { permissionLevel: AIPermissionLevel }): boolean {
  if (!role) return false;
  const minRole = TOOL_MIN_ROLE[tool.permissionLevel];
  return (ROLE_RANK[role] ?? 0) >= (ROLE_RANK[minRole] ?? 99);
}
