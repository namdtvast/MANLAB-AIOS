import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { KICH_THUOC_TRANG, PhanTrang, boQua, chotTrang } from "@/components/PhanTrang";
import { KhongCoQuyen, NHAN_TRANG_THAI_TAI_KHOAN, NHAN_VAI_TRO_NEN_TANG, th } from "./ui";

// Danh sách người dùng nền tảng và tình trạng phân quyền của từng người.
// Vai trò module (ModuleRoleAssignment) là thứ quyết định ai làm được gì trong từng module —
// trước trang này bảng đó CHỈ prisma/seed.ts ghi được, nên tài khoản người thật không có vai
// trò nào. Xem _meta/specs/20260904-admin-users-phan-quyen/spec.md.
// Gate nằm ở server: menu có hiện mục này hay không là chuyện hiển thị, không phải kiểm soát.

export default async function AdminUsersPage({ searchParams }: { searchParams: Promise<{ trang?: string }> }) {
  const { trang: trangRaw } = await searchParams;
  const session = await auth();
  if (session?.user?.role !== "ADMIN") return <KhongCoQuyen />;

  const tong = await prisma.user.count();
  const trang = chotTrang(trangRaw, tong);
  const [users, tongKhongPhieu] = await Promise.all([
    prisma.user.findMany({
      orderBy: [{ role: "asc" }, { email: "asc" }],
      skip: boQua(trang),
      take: KICH_THUOC_TRANG,
      // Chọn trường tường minh: passwordHash không có việc gì đi qua tầng render.
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        accountStatus: true,
        demoAccount: true,
        moduleRoles: { select: { id: true, accessRequestId: true } },
      },
    }),
    prisma.moduleRoleAssignment.count({ where: { accessRequestId: null } }),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-xs font-medium text-ink-3">QUẢN TRỊ HỆ THỐNG</p>
        <h1 className="font-head text-2xl font-bold text-ink">Người dùng và phân quyền</h1>
        <p className="mt-1.5 max-w-3xl text-sm text-ink-2">
          Vai trò module quyết định ai làm được gì trong từng module. Cấp quyền phải dẫn{" "}
          <strong>phiếu F28.04 đã phê duyệt</strong> của chính người đó ở M28 — ETV.P28 Phụ lục II điểm 5 xếp việc
          cấp quyền không phiếu là vi phạm nghiêm trọng. Thu hồi thì làm ngay, chỉ cần nêu lý do (§6.7.1 — trong
          ngày làm việc).
        </p>
        {tongKhongPhieu > 0 && (
          // Không giấu con số này đi: quyền không truy được về phiếu chính là thứ kỳ rà soát
          // 06 tháng/lần của P28 §6.7.1 phải nhìn thấy. Phần lớn là dữ liệu demo do seed tạo
          // trước khi có cơ chế căn cứ.
          <p className="mt-2 rounded-lg border border-warn/30 bg-warn-soft px-3 py-2 text-sm text-warn">
            Có <strong>{tongKhongPhieu}</strong> vai trò module chưa truy được về phiếu F28.04.
          </p>
        )}
      </div>

      <div className="overflow-x-auto rounded-xl border border-border bg-surface">
        <table className="w-full min-w-[56rem] text-sm">
          <thead>
            <tr>
              <th className={th}>Người dùng</th>
              <th className={th}>Vai trò nền tảng</th>
              <th className={th}>Tài khoản</th>
              <th className={th}>Vai trò module</th>
              <th className={th}></th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => {
              const khongPhieu = u.moduleRoles.filter((r) => !r.accessRequestId).length;
              const tt = NHAN_TRANG_THAI_TAI_KHOAN[u.accountStatus];
              return (
                <tr key={u.id} className="border-b border-border last:border-0 hover:bg-sunk">
                  <td className="px-3 py-2">
                    <span className="block font-medium text-ink">{u.name ?? "—"}</span>
                    <span className="block text-xs text-ink-3">{u.email}</span>
                  </td>
                  <td className="px-3 py-2 text-xs text-ink-2">
                    {NHAN_VAI_TRO_NEN_TANG[u.role]}
                    {u.demoAccount && (
                      <span className="ml-1 rounded-full bg-sunk px-2 py-0.5 text-xs text-ink-3">demo</span>
                    )}
                  </td>
                  <td className="px-3 py-2">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${tt.className}`}>{tt.label}</span>
                  </td>
                  <td className="px-3 py-2 text-xs text-ink-2">
                    {u.moduleRoles.length === 0 ? (
                      <span className="text-ink-3">chưa có vai trò nào</span>
                    ) : (
                      <>
                        {u.moduleRoles.length} vai trò
                        {khongPhieu > 0 && <span className="ml-1 text-warn">· {khongPhieu} chưa có phiếu</span>}
                      </>
                    )}
                  </td>
                  <td className="px-3 py-2 text-right">
                    <Link href={`/admin/users/${u.id}`} className="text-xs text-accent hover:underline">
                      Phân quyền →
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <PhanTrang path="/admin/users" trang={trang} tong={tong} donVi="người dùng" />
      </div>
    </div>
  );
}
