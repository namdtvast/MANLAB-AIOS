// M12 — state machine/gate thuần hàm, AUTHORITATIVE. Port từ ETV.P12_KhieuNai.md (Đã phê duyệt,
// lần 03) — xem 01_Requirement/_work/20260823-xay-moi-m12/spec.md để đối chiếu "Quyết định phạm
// vi" (không có 08_Source nguyên mẫu, giống M01/M02/M03/M04/M16/M17). Gate chính: bắt buộc văn
// bản khiếu nại chính thức (F14.03) khi không giải quyết được ngay tại chỗ (quy tắc 1-2).
import type { M12ComplaintStatus } from "@/generated/prisma/enums";

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

export interface M12ActorUser {
  id: string;
  m12Role: string | null; // QLCL / LDV / TIEPNHAN / PHUTRACH
}

export interface ComplaintForRules {
  status: M12ComplaintStatus;
  resolvedOnSpot: boolean;
  customerSatisfiedOnSpot: boolean | null;
  isComplex: boolean;
  externalDocRef: string | null;
  capaRef: string | null;
  assignedToId: string | null;
}

// Quy tắc 2: giải thích được ngay + khách hài lòng → không bắt buộc F14.03; ngược lại bắt buộc.
export function requiresExternalDoc(c: { resolvedOnSpot: boolean; customerSatisfiedOnSpot: boolean | null }): boolean {
  return !(c.resolvedOnSpot && c.customerSatisfiedOnSpot === true);
}

// Quy tắc 1-2: LĐV phân công cán bộ phụ trách xử lý — bắt buộc đã có F14.03 nếu không giải
// quyết được ngay tại chỗ.
export function txAssignComplaint(c: ComplaintForRules, u: M12ActorUser, assignedToId: string): TxResult {
  if (c.status !== "NHAP") return err("BAD_STATE", "Chỉ khiếu nại ở trạng thái Nháp mới phân công xử lý được.");
  if (u.m12Role !== "LDV") return err("FORBIDDEN", "Chỉ LĐV được phân công xử lý khiếu nại.");
  if (requiresExternalDoc(c) && !c.externalDocRef) {
    return err(
      "EXTERNAL_DOC_REQUIRED",
      "Khiếu nại không giải thích được ngay hoặc khách chưa thỏa mãn — bắt buộc khởi tạo văn bản khiếu nại chính thức (F14.03, quy tắc 1-2 ETV.P12) trước khi phân công."
    );
  }
  if (!assignedToId) return err("ASSIGNEE_REQUIRED", "Bắt buộc phân công cán bộ phụ trách xử lý.");
  return ok("DANG_XU_LY", "LĐV phân công xử lý", null, { assignedToId });
}

export function txRespondComplaint(c: ComplaintForRules, u: M12ActorUser, resolution: string): TxResult {
  if (c.status !== "DANG_XU_LY") return err("BAD_STATE", "Chỉ khiếu nại Đang xử lý mới trả lời được.");
  if (c.assignedToId !== u.id) return err("FORBIDDEN", "Chỉ cán bộ được phân công mới trả lời khiếu nại này.");
  if (!resolution) return err("RESOLUTION_REQUIRED", "Bắt buộc nhập nội dung trả lời khách hàng.");
  return ok("DA_TRA_LOI", "Trả lời khách hàng", null, { resolution });
}

// Quy tắc 5: đóng hồ sơ khi khách đồng ý; nếu khách chưa chấp nhận, chỉ LĐV quyết định dừng giải
// quyết, bắt buộc lý do bằng văn bản. Quy tắc 4: phức tạp bắt buộc có CAPA trước khi đóng hồ sơ.
export function txCloseComplaint(
  c: ComplaintForRules,
  u: M12ActorUser,
  { customerSatisfied, reason }: { customerSatisfied: boolean; reason?: string }
): TxResult {
  if (c.status !== "DA_TRA_LOI") return err("BAD_STATE", "Chỉ khiếu nại Đã trả lời mới đóng/dừng giải quyết được.");
  if (customerSatisfied) {
    if (c.isComplex && !c.capaRef) {
      return err(
        "CAPA_REQUIRED",
        "Khiếu nại phức tạp/ảnh hưởng lớn — bắt buộc có hành động khắc phục (CAPA, quy tắc 4 ETV.P12) trước khi đóng hồ sơ."
      );
    }
    return ok("DONG_HO_SO", "Đóng hồ sơ — khách hàng đồng ý phương án xử lý", null, { customerSatisfied: true });
  }
  if (u.m12Role !== "LDV") return err("FORBIDDEN", "Chỉ LĐV được quyết định dừng giải quyết khi khách hàng chưa chấp nhận (quy tắc 5 ETV.P12).");
  if (!reason) return err("REASON_REQUIRED", "Bắt buộc nêu rõ lý do bằng văn bản khi dừng giải quyết.");
  return ok("KHONG_DAT_THOA_THUAN", "LĐV quyết định dừng giải quyết", reason, { customerSatisfied: false });
}

// Quy tắc 6: phàn nàn/góp ý chỉ chuyển thành khiếu nại 1 lần, không tự động.
export const canEscalate = (f: { escalatedComplaintId: string | null }) => !f.escalatedComplaintId;
