// Yêu cầu cấp tài khoản — quy tắc thuần hàm, AUTHORITATIVE.
// Đặc tả: _meta/specs/20260824-trang-chu-cong-khai/spec.md (quy tắc R1–R6).
//
// R1 là ràng buộc quan trọng nhất và không nằm trong file này mà nằm ở chỗ KHÔNG có gì:
// không hàm nào ở đây tạo User, sinh mật khẩu hay gán vai trò. Form công khai chỉ ghi
// nhận đề nghị; việc cấp tài khoản vẫn thuộc quy trình của Quản trị hệ thống.
//
// R7 (bổ sung 27/08/2026) — người đề nghị tự đặt mật khẩu ngay khi gửi form. File này chỉ
// KIỂM TRA mật khẩu, không băm và không lưu: băm bằng bcrypt là việc của actions.ts, và
// mật khẩu bản rõ không được đi đâu ngoài lần băm đó. Đặt mật khẩu ở bước này KHÔNG phá R1
// — vẫn không có User nào được tạo; chỉ là bí mật xác thực do chính chủ đặt, giữ tạm cho
// tới khi QTHT cấp tài khoản.
import type { AccessRequestStatus, PlatformRole } from "@/generated/prisma/enums";

export const FIELD_LIMITS = {
  fullName: 120,
  email: 160,
  organization: 160,
  phone: 32,
  purpose: 1000,
  reviewNote: 1000,
} as const;

// Độ dài tối thiểu 12 ký tự — cùng ngưỡng scripts/cap-tai-khoan.ts và
// scripts/doi-mat-khau-demo.ts đang áp cho mật khẩu do QTHT đặt; một hệ thống không nên có
// hai ngưỡng khác nhau cho cùng một loại bí mật.
export const PASSWORD_MIN = 12;
// Trần 64 ký tự là để tránh giới hạn 72 BYTE của bcrypt: quá ngưỡng đó bcrypt cắt phần thừa
// mà không báo gì, người dùng sẽ đăng nhập được bằng một mật khẩu ngắn hơn mình tưởng. Tiếng
// Việt có dấu tốn tới 3 byte/ký tự nên phải kiểm cả byte, không chỉ đếm ký tự.
export const PASSWORD_MAX = 64;
const PASSWORD_MAX_BYTES = 72;

// Mật khẩu này từng nằm trong mã nguồn công khai của repo (xem scripts/doi-mat-khau-demo.ts)
// — chặn ngay tại form thay vì để người dùng đặt lại đúng giá trị đã lộ.
const MAT_KHAU_DA_LO = "DoiMatKhauNgay!2026";

export type AccessRequestField =
  | "fullName"
  | "email"
  | "organization"
  | "phone"
  | "purpose"
  | "password"
  | "passwordConfirm";

// Các trường được phép trả ngược về trình duyệt khi form lỗi. Mật khẩu KHÔNG nằm trong đây:
// gửi lại bản rõ về client là tự tay đưa bí mật đi thêm một vòng qua mạng và vào bộ nhớ
// trang, đổi lấy đúng một chút tiện tay gõ lại.
export type AccessRequestEchoField = Exclude<AccessRequestField, "password" | "passwordConfirm">;

export interface AccessRequestInput {
  fullName: string;
  email: string;
  organization: string;
  phone: string;
  purpose: string;
  // Bản rõ — người gọi phải băm ngay và không được lưu, ghi log hay trả về giao diện.
  password: string;
}

export type ValidationResult =
  | { ok: true; value: AccessRequestInput }
  | { ok: false; errors: Partial<Record<AccessRequestField, string>> };

// Cố tình dễ dãi: mục tiêu là chặn lỗi gõ nhầm rõ ràng, không phải thẩm định email thật —
// email có hợp lệ hay không thì bước duyệt của Quản trị hệ thống mới xác nhận được.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateAccessRequest(raw: Partial<Record<AccessRequestField, string>>): ValidationResult {
  // Mọi trường đều .trim() trừ mật khẩu: khoảng trắng đầu/cuối là ký tự hợp lệ trong mật
  // khẩu, cắt đi ở đây sẽ băm một chuỗi khác chuỗi người dùng gõ và họ không đăng nhập được.
  const password = raw.password ?? "";
  const passwordConfirm = raw.passwordConfirm ?? "";
  const value: AccessRequestInput = {
    fullName: (raw.fullName ?? "").trim(),
    email: (raw.email ?? "").trim().toLowerCase(),
    organization: (raw.organization ?? "").trim(),
    phone: (raw.phone ?? "").trim(),
    purpose: (raw.purpose ?? "").trim(),
    password,
  };
  const errors: Partial<Record<AccessRequestField, string>> = {};

  if (value.fullName.length < 2) errors.fullName = "Nhập họ và tên.";
  else if (value.fullName.length > FIELD_LIMITS.fullName)
    errors.fullName = `Họ và tên tối đa ${FIELD_LIMITS.fullName} ký tự.`;

  if (!EMAIL_RE.test(value.email)) errors.email = "Email không hợp lệ.";
  else if (value.email.length > FIELD_LIMITS.email)
    errors.email = `Email tối đa ${FIELD_LIMITS.email} ký tự.`;

  if (value.organization.length < 2) errors.organization = "Nhập đơn vị hoặc tổ chức.";
  else if (value.organization.length > FIELD_LIMITS.organization)
    errors.organization = `Đơn vị tối đa ${FIELD_LIMITS.organization} ký tự.`;

  if (value.phone.length > FIELD_LIMITS.phone)
    errors.phone = `Điện thoại tối đa ${FIELD_LIMITS.phone} ký tự.`;

  if (value.purpose.length < 10)
    errors.purpose = "Mô tả rõ hơn phần việc cần truy cập (tối thiểu 10 ký tự).";
  else if (value.purpose.length > FIELD_LIMITS.purpose)
    errors.purpose = `Nội dung tối đa ${FIELD_LIMITS.purpose} ký tự.`;

  // R7 — mật khẩu do chính người đề nghị đặt.
  if (password.length < PASSWORD_MIN) errors.password = `Mật khẩu tối thiểu ${PASSWORD_MIN} ký tự.`;
  else if (password.length > PASSWORD_MAX)
    errors.password = `Mật khẩu tối đa ${PASSWORD_MAX} ký tự.`;
  else if (byteLength(password) > PASSWORD_MAX_BYTES)
    errors.password = "Mật khẩu quá dài — rút ngắn lại (chữ có dấu tính nhiều hơn một ký tự).";
  else if (password === MAT_KHAU_DA_LO)
    errors.password = "Mật khẩu này đã bị lộ công khai — chọn mật khẩu khác.";
  else if (!/[A-Za-zÀ-ỹ]/.test(password) || !/[0-9]/.test(password))
    errors.password = "Mật khẩu phải có cả chữ và số.";
  else if (emailLocalPart(value.email).length >= 3 &&
    password.toLowerCase().includes(emailLocalPart(value.email)))
    errors.password = "Mật khẩu không được chứa tên email của chính mình.";

  if (!errors.password && passwordConfirm !== password)
    errors.passwordConfirm = "Nhập lại mật khẩu chưa khớp.";

  if (Object.keys(errors).length > 0) return { ok: false, errors };
  return { ok: true, value };
}

// Đếm byte UTF-8 — chạy được cả trên server lẫn trong trình duyệt, không cần Buffer.
function byteLength(s: string): number {
  return new TextEncoder().encode(s).length;
}

// Phần trước dấu @ của email đã chuẩn hóa. Chỉ dùng để chặn mật khẩu kiểu "nguyenh2026";
// ngắn dưới 3 ký tự thì bỏ qua vì so khớp sẽ dính nhầm gần như mọi mật khẩu.
function emailLocalPart(email: string): string {
  return email.split("@")[0] ?? "";
}

export type ReviewDecision = "APPROVED" | "REJECTED";

export type ReviewResult =
  | { ok: true; status: AccessRequestStatus; reviewNote: string | null }
  | { ok: false; code: string; message: string };

/**
 * R4/R5/R6 — chỉ Quản trị hệ thống xử lý được, chỉ đi từ PENDING, từ chối bắt buộc lý do.
 * Trả về trạng thái mới; KHÔNG tạo tài khoản (R1) — "đồng ý cấp" khác với "đã cấp".
 */
export function reviewAccessRequest(
  request: { status: AccessRequestStatus },
  actor: { role: PlatformRole },
  decision: ReviewDecision,
  reviewNote: string,
): ReviewResult {
  if (actor.role !== "ADMIN")
    return { ok: false, code: "FORBIDDEN", message: "Chỉ Quản trị hệ thống xử lý được yêu cầu cấp tài khoản." };

  if (request.status !== "PENDING")
    return { ok: false, code: "BAD_STATE", message: "Yêu cầu này đã được xử lý, không đổi lại được." };

  const note = reviewNote.trim();
  if (decision === "REJECTED" && note.length === 0)
    return { ok: false, code: "REASON_REQUIRED", message: "Từ chối phải kèm lý do." };

  if (note.length > FIELD_LIMITS.reviewNote)
    return { ok: false, code: "NOTE_TOO_LONG", message: `Ghi chú tối đa ${FIELD_LIMITS.reviewNote} ký tự.` };

  return { ok: true, status: decision, reviewNote: note.length > 0 ? note : null };
}
