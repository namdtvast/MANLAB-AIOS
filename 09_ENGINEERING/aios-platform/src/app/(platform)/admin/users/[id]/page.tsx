import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { nhanVaiTro, vaiTroCuaModule } from "@/lib/vai-tro-module";
import { KhongCoQuyen, NHAN_TRANG_THAI_TAI_KHOAN, NHAN_VAI_TRO_NEN_TANG, th } from "../ui";
import { REQUEST_TYPE_LABEL } from "@/lib/m28/labels";
import { NutThuHoi, PhanQuyenPanel } from "./PhanQuyenPanel";

// Phân quyền cho một người: vai trò nền tảng + vai trò từng module, mỗi thay đổi dẫn phiếu
// F28.04 của chính người đó. Đặc tả: _meta/specs/20260904-admin-users-phan-quyen/spec.md

const NHAN_HANH_DONG: Record<string, string> = {
  CAP_VAI_TRO_MODULE: "Cấp vai trò module",
  THU_HOI_VAI_TRO_MODULE: "Thu hồi vai trò module",
  DOI_VAI_TRO_NEN_TANG: "Đổi vai trò nền tảng",
};

function dinhDangLuc(d: Date): string {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${p(d.getDate())}/${p(d.getMonth() + 1)}/${d.getFullYear()} ${p(d.getHours())}:${p(d.getMinutes())}`;
}

export default async function PhanQuyenNguoiDungPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();
  if (session?.user?.role !== "ADMIN") return <KhongCoQuyen />;

  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      accountStatus: true,
      moduleRoles: {
        orderBy: { moduleCode: "asc" },
        select: {
          id: true,
          moduleCode: true,
          role: true,
          createdAt: true,
          accessRequest: { select: { code: true } },
          grantedBy: { select: { name: true, email: true } },
        },
      },
    },
  });
  if (!user) notFound();

  const [modules, phieu, lichSu] = await Promise.all([
    prisma.platformModule.findMany({
      where: { status: "ACTIVE" },
      orderBy: { order: "asc" },
      select: { code: true, name: true },
    }),
    // Chỉ phiếu CỦA CHÍNH NGƯỜI NÀY và đã qua phê duyệt mới là căn cứ hợp lệ — rules.ts kiểm
    // lại điều kiện này ở server, danh sách ở đây chỉ để người dùng không phải chọn nhầm.
    prisma.m28AccessRequest.findMany({
      where: { subjectId: id, status: { in: ["DA_PHE_DUYET", "DA_THUC_HIEN"] } },
      orderBy: { createdAt: "desc" },
      select: { id: true, code: true, requestType: true, approvedAt: true },
    }),
    prisma.platformAccessAudit.findMany({
      where: { subjectId: id },
      orderBy: { at: "desc" },
      take: 20,
      select: {
        id: true,
        at: true,
        action: true,
        moduleCode: true,
        role: true,
        previousRole: true,
        note: true,
        actor: { select: { name: true, email: true } },
        accessRequestId: true,
      },
    }),
  ]);

  // Chỉ mời chọn module thật sự có danh mục vai trò: module đang vận hành mà chưa khai vai trò
  // thì cấp gì cũng là cấp một mã không ai công nhận.
  const moduleCoVaiTro = modules
    .map((m) => ({ ...m, vaiTro: vaiTroCuaModule(m.code) }))
    .filter((m) => m.vaiTro.length > 0);

  const tt = NHAN_TRANG_THAI_TAI_KHOAN[user.accountStatus];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link href="/admin/users" className="text-xs text-accent hover:underline">
          ← Người dùng và phân quyền
        </Link>
        <h1 className="mt-1 font-head text-2xl font-bold text-ink">{user.name ?? user.email}</h1>
        <p className="mt-1 flex flex-wrap items-center gap-2 text-sm text-ink-2">
          <span>{user.email}</span>
          <span className="text-ink-3">·</span>
          <span>{NHAN_VAI_TRO_NEN_TANG[user.role]}</span>
          <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${tt.className}`}>{tt.label}</span>
        </p>
        {phieu.length === 0 && (
          <p className="mt-3 max-w-3xl rounded-lg border border-warn/30 bg-warn-soft px-3 py-2 text-sm text-warn">
            Người này chưa có phiếu F28.04 nào đã phê duyệt trong M28, nên chưa cấp được vai trò. Lập phiếu tại{" "}
            <Link href="/modules/M28/access" className="font-semibold underline">
              M28 · Quyền truy cập
            </Link>{" "}
            trước (ETV.P28 §6.7.1: TP đề nghị → PT.ATTT/LĐV phê duyệt → QTHT thực hiện).
          </p>
        )}
      </div>

      <PhanQuyenPanel
        subjectId={user.id}
        vaiTroNenTang={user.role}
        modules={moduleCoVaiTro}
        phieu={phieu.map((p) => ({
          id: p.id,
          nhan: `${p.code} · ${REQUEST_TYPE_LABEL[p.requestType] ?? p.requestType}${p.approvedAt ? ` · duyệt ${dinhDangLuc(p.approvedAt)}` : ""}`,
        }))}
      />

      <section className="overflow-x-auto rounded-xl border border-border bg-surface">
        <h2 className="border-b border-border px-3 py-2 font-head text-sm font-bold text-ink">
          Vai trò module đang có hiệu lực
        </h2>
        <table className="w-full min-w-[48rem] text-sm">
          <thead>
            <tr>
              <th className={th}>Module</th>
              <th className={th}>Vai trò</th>
              <th className={th}>Căn cứ</th>
              <th className={th}>Người cấp</th>
              <th className={th}>Thu hồi</th>
            </tr>
          </thead>
          <tbody>
            {user.moduleRoles.map((r) => (
              <tr key={r.id} className="border-b border-border last:border-0">
                <td className="px-3 py-2 font-mono text-xs text-ink">{r.moduleCode}</td>
                <td className="px-3 py-2 text-ink">{nhanVaiTro(r.moduleCode, r.role)}</td>
                <td className="px-3 py-2 text-xs text-ink-2">
                  {r.accessRequest ? (
                    r.accessRequest.code
                  ) : (
                    <span className="rounded-full bg-warn-soft px-2 py-0.5 font-medium text-warn">chưa có phiếu</span>
                  )}
                </td>
                <td className="px-3 py-2 text-xs text-ink-2">
                  {r.grantedBy?.name ?? r.grantedBy?.email ?? "—"}
                </td>
                <td className="px-3 py-2">
                  <NutThuHoi assignmentId={r.id} />
                </td>
              </tr>
            ))}
            {user.moduleRoles.length === 0 && (
              <tr>
                <td colSpan={5} className="px-3 py-6 text-center text-sm text-ink-3">
                  Chưa có vai trò module nào — người này vào module nào cũng chỉ xem được.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      <section className="overflow-x-auto rounded-xl border border-border bg-surface">
        <h2 className="border-b border-border px-3 py-2 font-head text-sm font-bold text-ink">
          Lịch sử thao tác quyền
          <span className="ml-2 font-sans text-xs font-normal text-ink-3">
            (đọc cho kỳ rà soát quyền 06 tháng/lần — ETV.P28 §6.7.1)
          </span>
        </h2>
        <table className="w-full min-w-[48rem] text-sm">
          <thead>
            <tr>
              <th className={th}>Lúc</th>
              <th className={th}>Thao tác</th>
              <th className={th}>Nội dung</th>
              <th className={th}>Người thực hiện</th>
              <th className={th}>Căn cứ / lý do</th>
            </tr>
          </thead>
          <tbody>
            {lichSu.map((h) => (
              <tr key={h.id} className="border-b border-border last:border-0">
                <td className="px-3 py-2 text-xs text-ink-2">{dinhDangLuc(h.at)}</td>
                <td className="px-3 py-2 text-xs text-ink">{NHAN_HANH_DONG[h.action] ?? h.action}</td>
                <td className="px-3 py-2 text-xs text-ink-2">
                  {h.moduleCode
                    ? `${h.moduleCode} · ${nhanVaiTro(h.moduleCode, h.role ?? "")}`
                    : `${h.previousRole ?? "—"} → ${h.role ?? "—"}`}
                </td>
                <td className="px-3 py-2 text-xs text-ink-2">{h.actor.name ?? h.actor.email}</td>
                <td className="px-3 py-2 text-xs text-ink-2">{h.note ?? (h.accessRequestId ? "theo phiếu F28.04" : "—")}</td>
              </tr>
            ))}
            {lichSu.length === 0 && (
              <tr>
                <td colSpan={5} className="px-3 py-6 text-center text-sm text-ink-3">
                  Chưa có thao tác nào được ghi nhận.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}
