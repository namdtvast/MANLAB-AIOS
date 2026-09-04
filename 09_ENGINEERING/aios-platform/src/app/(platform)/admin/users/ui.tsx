import type { PlatformRole, UserAccountStatus } from "@/generated/prisma/enums";

// Mảnh dùng chung giữa trang danh sách và trang chi tiết phân quyền.

export const th =
  "border-b border-border px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-ink-3";

export const NHAN_VAI_TRO_NEN_TANG: Record<PlatformRole, string> = {
  ADMIN: "Quản trị hệ thống",
  MEMBER: "Người dùng",
  VIEWER: "Chỉ xem",
};

export const NHAN_TRANG_THAI_TAI_KHOAN: Record<UserAccountStatus, { label: string; className: string }> = {
  DANG_HOAT_DONG: { label: "Đang hoạt động", className: "bg-good-soft text-good" },
  TAM_KHOA: { label: "Tạm khóa", className: "bg-warn-soft text-warn" },
  DA_THU_HOI: { label: "Đã thu hồi", className: "bg-crit-soft text-crit" },
};

export function KhongCoQuyen() {
  return (
    <div className="max-w-2xl rounded-xl border border-crit/30 bg-crit-soft p-5">
      <h1 className="font-head text-lg font-bold text-crit">Không có quyền truy cập</h1>
      <p className="mt-1.5 text-sm text-ink-2">
        Chỉ Quản trị hệ thống xem và thay đổi được phân quyền người dùng.
      </p>
    </div>
  );
}
