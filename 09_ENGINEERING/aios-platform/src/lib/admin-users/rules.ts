// Phân quyền người dùng trên nền tảng — quy tắc thuần hàm, AUTHORITATIVE.
// Đặc tả: _meta/specs/20260904-admin-users-phan-quyen/spec.md (quy tắc R1–R8).
//
// NGUỒN QUY ĐỊNH: ETV.P28 §6.7.1 (phiếu F28.04: TP đề nghị → PT.ATTT/LĐV phê duyệt → QTHT thực
// hiện; rà soát ≥ 06 tháng/lần; thu hồi trong ngày làm việc) và Phụ lục II điểm 5 (cấp quyền
// không có phiếu đã phê duyệt là vi phạm nghiêm trọng, QTHT phải từ chối thực hiện).
//
// Bất đối xứng cố ý giữa cấp và thu hồi (spec §2.2): CẤP bắt buộc phiếu; THU HỒI chỉ bắt buộc
// lý do. Bắt phải có phiếu mới thu hồi được là dựng rào chắn ngay giữa thứ mà §6.7.1 đòi làm
// trong ngày làm việc khi nhân sự nghỉ hoặc chuyển công tác.
import type { M28AccessStatus, PlatformRole } from "@/generated/prisma/enums";
import { vaiTroHopLe } from "@/lib/vai-tro-module";

export interface Actor {
  id: string;
  role: PlatformRole;
}

/** Phiếu F28.04 dùng làm căn cứ, đã đọc từ database. */
export interface PhieuQuyen {
  id: string;
  subjectId: string | null;
  status: M28AccessStatus;
}

export type KetQua = { ok: true } | { ok: false; code: string; message: string };

const ok = (): KetQua => ({ ok: true });
const err = (code: string, message: string): KetQua => ({ ok: false, code, message });

export const NOTE_MAX = 500;

// Chỉ hai trạng thái này chứng minh quyền đã được phê duyệt. DE_NGHI/CHO_PHE_DUYET là phiếu
// chưa qua người có thẩm quyền; TU_CHOI và DA_THU_HOI thì nội dung phiếu đã hết giá trị.
const TRANG_THAI_PHIEU_DUNG: M28AccessStatus[] = ["DA_PHE_DUYET", "DA_THUC_HIEN"];

function kiemPhieu(phieu: PhieuQuyen | null, subjectId: string): KetQua {
  if (!phieu)
    return err("TICKET_REQUIRED", "Cấp quyền phải dẫn phiếu F28.04 đã phê duyệt ở M28 (ETV.P28 Phụ lục II điểm 5).");
  // Phiếu của người khác không phải căn cứ cho người này — đây chính là chỗ mà một ô gõ tay
  // không kiểm được, và là lý do cột căn cứ là khóa ngoại chứ không phải chuỗi.
  if (phieu.subjectId !== subjectId)
    return err("TICKET_SUBJECT", "Phiếu này cấp quyền cho người khác, không dùng làm căn cứ ở đây được.");
  if (!TRANG_THAI_PHIEU_DUNG.includes(phieu.status))
    return err("TICKET_STATE", "Phiếu chưa được phê duyệt hoặc đã hết giá trị.");
  return ok();
}

/** R1–R4 — cấp một vai trò module cho một người. */
export function capVaiTroModule(input: {
  actor: Actor;
  subjectId: string;
  moduleCode: string;
  role: string;
  phieu: PhieuQuyen | null;
  daCo: boolean;
}): KetQua {
  if (input.actor.role !== "ADMIN")
    return err("FORBIDDEN", "Chỉ Quản trị hệ thống cấp được vai trò trên nền tảng.");
  if (!vaiTroHopLe(input.moduleCode, input.role))
    return err("INVALID_ROLE", "Vai trò không thuộc danh mục vai trò của module này.");
  if (input.daCo) return err("DUPLICATE", "Người này đã có vai trò đó ở module này.");
  return kiemPhieu(input.phieu, input.subjectId);
}

/** R5, R8 — thu hồi một vai trò module. */
export function thuHoiVaiTroModule(input: {
  actor: Actor;
  subjectId: string;
  note: string;
}): KetQua {
  if (input.actor.role !== "ADMIN")
    return err("FORBIDDEN", "Chỉ Quản trị hệ thống thu hồi được vai trò trên nền tảng.");
  // Tự thu hồi vai trò của chính mình dễ khóa mình ra khỏi đúng module đang cần xử lý; và
  // "người thực hiện ≠ người bị tác động" là nguyên tắc tách vai của ETV.P28 §6.7.1.
  if (input.actor.id === input.subjectId)
    return err("SELF_CHANGE", "Không tự thu hồi vai trò của chính mình — nhờ quản trị viên khác.");
  const note = input.note.trim();
  if (!note) return err("REASON_REQUIRED", "Thu hồi bắt buộc nêu lý do (sự kiện nhân sự, kỳ rà soát, phiếu).");
  if (note.length > NOTE_MAX) return err("NOTE_TOO_LONG", `Lý do tối đa ${NOTE_MAX} ký tự.`);
  return ok();
}

/** R6, R7 — đổi vai trò nền tảng (ADMIN/MEMBER/VIEWER). */
export function doiVaiTroNenTang(input: {
  actor: Actor;
  subjectId: string;
  subjectRole: PlatformRole;
  roleMoi: PlatformRole;
  phieu: PhieuQuyen | null;
  /** Số ADMIN CÒN HIỆU LỰC ĐĂNG NHẬP hiện có, kể cả người đang bị đổi. */
  soAdminConHieuLuc: number;
}): KetQua {
  if (input.actor.role !== "ADMIN")
    return err("FORBIDDEN", "Chỉ Quản trị hệ thống đổi được vai trò nền tảng.");
  if (input.actor.id === input.subjectId)
    return err("SELF_CHANGE", "Không tự đổi vai trò nền tảng của chính mình.");
  if (input.roleMoi === input.subjectRole) return err("NO_CHANGE", "Vai trò không đổi.");
  // Hạ nốt ADMIN cuối cùng là tự tay bỏ khả năng thu hồi tài khoản của cả hệ thống — tức mất
  // luôn kiểm soát ETV.P28 §6.7.1. Không phải quy định của thủ tục, mà là điều kiện để thủ tục
  // còn thi hành được.
  if (input.subjectRole === "ADMIN" && input.roleMoi !== "ADMIN" && input.soAdminConHieuLuc <= 1)
    return err("LAST_ADMIN", "Đây là quản trị viên cuối cùng còn hiệu lực — cấp quyền cho người khác trước.");
  return kiemPhieu(input.phieu, input.subjectId);
}
