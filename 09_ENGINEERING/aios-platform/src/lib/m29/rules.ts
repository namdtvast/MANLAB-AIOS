// M29 — RBAC + vòng đời phê duyệt, port 1:1 từ
// 05_MODULE_LIBRARY/M29_AI/08_Source/api/rules.mjs (bản authoritative gốc).
// KHÔNG đổi hành vi so với bản gốc — chỉ đổi nhãn tiếng Việt trạng thái sang mã enum.
import type {
  AIApprovalStatus,
  AIAStatus,
  AIIncidentSeverity,
  AIIncidentStatus,
  AIPermissionLevel,
  AIPromptStatus,
  AIUnregisteredStatus,
} from "@/generated/prisma/enums";
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

  // ETV.P35 §6.1.7 bước 6: phê duyệt CHƯA phải là đưa vào vận hành. Còn một bước riêng — bật kiểm
  // tra sức khoẻ, kết nối bộ chuyển đổi — rồi bản ghi mới chuyển Hiệu lực (StateMachine.md trạng
  // thái 7). Tách khỏi approve() vì hai việc khác người và khác thời điểm: phê duyệt là quyết
  // định của người có thẩm quyền, đưa vào vận hành là thao tác kỹ thuật.
  activate(entity: { approvalStatus: AIApprovalStatus }): TxResult {
    if (entity.approvalStatus !== "APPROVED") return err("BAD_STATE", "Chỉ bản ghi Đã phê duyệt mới đưa vào vận hành được.");
    return ok("ACTIVE", "Đưa vào vận hành");
  },

  archive(entity: { approvalStatus: AIApprovalStatus }, extra: { reason?: string } = {}): TxResult {
    // Nhận cả ACTIVE: nền tảng đang vận hành vẫn phải ngừng vận hành được (ETV.P35 §6.5). Giữ cả
    // APPROVED vì bản ghi đã duyệt nhưng chưa từng đưa vào vận hành cũng có thể bị bỏ.
    if (!(["APPROVED", "ACTIVE"] as AIApprovalStatus[]).includes(entity.approvalStatus))
      return err("BAD_STATE", "Chỉ bản ghi Đã phê duyệt hoặc Hiệu lực mới Hết hiệu lực/Hủy được.");
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

// ---------- Increment 4 — Phiếu sự cố AI (ETV.P29 mục 5.7.3, 6.3) ----------

export interface IncidentForRules {
  status: AIIncidentStatus;
  severity: AIIncidentSeverity;
  detectedById: string;
  containmentAction: string;
  affectsIssuedResult: boolean;
  sensitiveDataExposed: boolean;
}

export const incidentTransitions = {
  /** Mới → Đang xử lý. Bắt buộc đã ghi biện pháp khống chế ("khống chế trước" — P29 5.7.3 bước 1). */
  start(inc: IncidentForRules, extra: { containmentAction?: string } = {}): TxResult {
    if (inc.status !== "NEW") return err("BAD_STATE", "Chỉ phiếu Mới mới chuyển sang Đang xử lý được.");
    const containment = extra.containmentAction ?? inc.containmentAction;
    if (!containment.trim()) return err("CONTAINMENT_REQUIRED", "Bắt buộc ghi biện pháp khống chế đã thực hiện trước khi chuyển sang Đang xử lý.");
    return ok("IN_PROGRESS", "Bắt đầu xử lý", null, { containmentAction: containment });
  },

  submit(inc: IncidentForRules): TxResult {
    if (inc.status !== "IN_PROGRESS") return err("BAD_STATE", "Chỉ phiếu Đang xử lý mới trình xác nhận được.");
    return ok("PENDING_CONFIRMATION", "Trình xác nhận");
  },

  /**
   * Chờ xác nhận → Đã đóng. Gom đủ 5 ràng buộc của P29 mục 5.7.3:
   * (1) người phát hiện không tự đóng · (2) sự cố Nghiêm trọng chỉ LĐV (SUPER_ADMIN) đóng ·
   * (3) Nghiêm trọng/Đáng kể bắt buộc mã KPH · (4) lộ dữ liệu nhạy cảm bắt buộc số phiếu F28.03 ·
   * (5) ảnh hưởng kết quả đã phát hành bắt buộc mã hồ sơ MP10/MP11.
   */
  close(
    inc: IncidentForRules,
    user: { id: string; role: M29Role | null },
    extra: { capRef?: string; f28Ref?: string; issuedResultRef?: string; closureNote?: string } = {}
  ): TxResult {
    if (inc.status !== "PENDING_CONFIRMATION") return err("BAD_STATE", "Chỉ phiếu Chờ xác nhận mới đóng được.");
    if (user.id === inc.detectedById)
      return err("SELF_CLOSE_FORBIDDEN", "Người phát hiện hoặc liên quan trực tiếp tới sự cố không được kết luận và đóng chính sự cố đó (ETV.P29 mục 5.7.3).");
    if (inc.severity === "SEVERE" && user.role !== "SUPER_ADMIN")
      return err("APPROVER_ROLE_REQUIRED", "Sự cố mức Nghiêm trọng chỉ Lãnh đạo Viện (SUPER_ADMIN) được kết luận và đóng.");
    if ((["SEVERE", "SIGNIFICANT"] as AIIncidentSeverity[]).includes(inc.severity) && !extra.capRef?.trim())
      return err("CAP_REQUIRED", "Sự cố mức Nghiêm trọng/Đáng kể bắt buộc lập KPH theo ETV.MP13 — nhập mã phiếu KPH.");
    if (inc.sensitiveDataExposed && !extra.f28Ref?.trim())
      return err("F28_REQUIRED", "Sự cố có lộ dữ liệu Hạn chế/Mật hoặc dữ liệu cá nhân bắt buộc có số phiếu ETV.P.F28.03 (xử lý đồng thời theo ETV.MP28).");
    if (inc.affectsIssuedResult && !extra.issuedResultRef?.trim())
      return err("ISSUED_RESULT_REF_REQUIRED", "Sự cố ảnh hưởng kết quả/chứng chỉ đã phát hành bắt buộc ghi mã hồ sơ đã xử lý theo ETV.MP10/MP11.");
    return ok("CLOSED", "Đóng sự cố", extra.closureNote ?? null, {
      capRef: extra.capRef ?? null,
      f28Ref: extra.f28Ref ?? null,
      issuedResultRef: extra.issuedResultRef ?? null,
      closureNote: extra.closureNote ?? null,
      closedById: user.id,
    });
  },

  cancel(inc: IncidentForRules, user: { role: M29Role | null }, extra: { reason?: string } = {}): TxResult {
    if (inc.status === "CLOSED" || inc.status === "CANCELLED") return err("BAD_STATE", "Phiếu đã kết thúc, không hủy được.");
    if (user.role !== "SUPER_ADMIN") return err("APPROVER_ROLE_REQUIRED", "Chỉ Lãnh đạo Viện (SUPER_ADMIN) được hủy phiếu sự cố.");
    if (!extra.reason?.trim()) return err("REASON_REQUIRED", "Hủy phiếu bắt buộc ghi lý do.");
    return ok("CANCELLED", "Hủy phiếu", extra.reason, { cancelReason: extra.reason });
  },
};

// ---------- Increment 4 — Hệ thống AI chưa đăng ký (ETV.P29 mục 5.1.7) ----------

export interface SightingForRules {
  status: AIUnregisteredStatus;
  sensitiveData: boolean;
  incidentId: string | null;
}

export const unregisteredTransitions = {
  startRegistering(s: SightingForRules): TxResult {
    if (s.status !== "OPEN") return err("BAD_STATE", "Chỉ bản ghi Mới phát hiện mới chuyển sang Đang hoàn thiện đăng ký được.");
    return ok("REGISTERING", "Bắt đầu hoàn thiện hồ sơ đăng ký");
  },

  /** Đóng bằng "Đã đăng ký" — bắt buộc trỏ tới Agent đã đăng ký thật trong danh mục. */
  markRegistered(s: SightingForRules, extra: { registeredAgentId?: string } = {}): TxResult {
    if (s.status === "REGISTERED" || s.status === "DISCONTINUED") return err("BAD_STATE", "Bản ghi đã kết thúc.");
    if (!extra.registeredAgentId) return err("AGENT_REQUIRED", "Đóng bằng Đã đăng ký bắt buộc chọn Agent tương ứng đã có trong danh mục hệ thống AI.");
    if (s.sensitiveData && !s.incidentId)
      return err("INCIDENT_REQUIRED", "Hệ thống AI này đã xử lý dữ liệu Hạn chế/Mật hoặc dữ liệu cá nhân — bắt buộc mở phiếu sự cố (ETV.P29 mục 5.1.7) trước khi đóng bản ghi.");
    return ok("REGISTERED", "Đã hoàn thiện đăng ký", null, { registeredAgentId: extra.registeredAgentId });
  },

  discontinue(s: SightingForRules, extra: { reason?: string } = {}): TxResult {
    if (s.status === "REGISTERED" || s.status === "DISCONTINUED") return err("BAD_STATE", "Bản ghi đã kết thúc.");
    if (!extra.reason?.trim()) return err("REASON_REQUIRED", "Chấm dứt sử dụng bắt buộc ghi lý do.");
    if (s.sensitiveData && !s.incidentId)
      return err("INCIDENT_REQUIRED", "Hệ thống AI này đã xử lý dữ liệu Hạn chế/Mật hoặc dữ liệu cá nhân — bắt buộc mở phiếu sự cố trước khi đóng bản ghi.");
    return ok("DISCONTINUED", "Chấm dứt sử dụng", extra.reason, { closeReason: extra.reason });
  },
};
