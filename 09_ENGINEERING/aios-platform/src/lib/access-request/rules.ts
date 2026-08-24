// Yêu cầu cấp tài khoản — quy tắc thuần hàm, AUTHORITATIVE.
// Đặc tả: _meta/specs/20260824-trang-chu-cong-khai/spec.md (quy tắc R1–R6).
//
// R1 là ràng buộc quan trọng nhất và không nằm trong file này mà nằm ở chỗ KHÔNG có gì:
// không hàm nào ở đây tạo User, sinh mật khẩu hay gán vai trò. Form công khai chỉ ghi
// nhận đề nghị; việc cấp tài khoản vẫn thuộc quy trình của Quản trị hệ thống.
import type { AccessRequestStatus, PlatformRole } from "@/generated/prisma/enums";

export const FIELD_LIMITS = {
  fullName: 120,
  email: 160,
  organization: 160,
  phone: 32,
  purpose: 1000,
  reviewNote: 1000,
} as const;

export type AccessRequestField = "fullName" | "email" | "organization" | "phone" | "purpose";

export interface AccessRequestInput {
  fullName: string;
  email: string;
  organization: string;
  phone: string;
  purpose: string;
}

export type ValidationResult =
  | { ok: true; value: AccessRequestInput }
  | { ok: false; errors: Partial<Record<AccessRequestField, string>> };

// Cố tình dễ dãi: mục tiêu là chặn lỗi gõ nhầm rõ ràng, không phải thẩm định email thật —
// email có hợp lệ hay không thì bước duyệt của Quản trị hệ thống mới xác nhận được.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateAccessRequest(raw: Partial<Record<AccessRequestField, string>>): ValidationResult {
  const value: AccessRequestInput = {
    fullName: (raw.fullName ?? "").trim(),
    email: (raw.email ?? "").trim().toLowerCase(),
    organization: (raw.organization ?? "").trim(),
    phone: (raw.phone ?? "").trim(),
    purpose: (raw.purpose ?? "").trim(),
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

  if (Object.keys(errors).length > 0) return { ok: false, errors };
  return { ok: true, value };
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
