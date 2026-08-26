import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { PARTY_STATUS_LABEL, PARTY_TYPE_LABEL, roleLabel, roleLabelMap } from "@/lib/m34/crm";
import { listPartyRoleTypes } from "@/lib/m34/crm-actions";

const th = "border-b border-border px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-ink-3";

export default async function CRMPage({ searchParams }: { searchParams: Promise<{ q?: string; role?: string; status?: string }> }) {
  const { q = "", role = "", status = "" } = await searchParams;
  const parties = await prisma.m34Party.findMany({
    where: {
      ...(q ? { OR: [{ legalName: { contains: q, mode: "insensitive" } }, { taxId: { contains: q, mode: "insensitive" } }, { code: { contains: q, mode: "insensitive" } }] } : {}),
      ...(status ? { status: status as never } : {}),
      ...(role ? { roles: { some: { roleTypeCode: role, active: true } } } : {}),
    },
    include: { roles: true, contacts: { where: { isPrimary: true }, take: 1 } },
    orderBy: { updatedAt: "desc" }, take: 200,
  });
  const roleTypes = await listPartyRoleTypes();
  const roleLabels = roleLabelMap(roleTypes);
  return <div className="flex flex-col gap-6">
    <header className="flex flex-wrap items-end justify-between gap-4">
      <div><p className="text-xs font-medium text-ink-3">M34 · MD01 · Dữ liệu chủ</p><h1 className="font-head text-2xl font-bold text-ink">CRM – Tổ chức/Cá nhân và Vai trò</h1><p className="mt-1 max-w-3xl text-sm text-ink-2">Một chủ thể có thể đồng thời là khách hàng, NCC, NTP, NSX hoặc đối tác. Chỉ hồ sơ Hiệu lực được dùng cho giao dịch mới.</p></div>
      <Link href="/modules/M34/crm/new" className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-ink hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2">Tạo Tổ chức/Cá nhân</Link>
    </header>
    <form className="grid gap-3 rounded-xl border border-border bg-surface p-4 md:grid-cols-[minmax(16rem,1fr)_14rem_12rem_auto]" aria-label="Bộ lọc CRM">
      <label className="text-sm font-medium text-ink">Tìm kiếm<input name="q" defaultValue={q} placeholder="Tên, MST hoặc mã Party" className="mt-1 w-full rounded-lg border border-border-strong bg-canvas px-3 py-2 font-normal" /></label>
      <label className="text-sm font-medium text-ink">Vai trò<select name="role" defaultValue={role} className="mt-1 w-full rounded-lg border border-border-strong bg-canvas px-3 py-2 font-normal"><option value="">Tất cả vai trò</option>{roleTypes.map(({code:v,nameVi:l})=><option key={v} value={v}>{l}</option>)}</select></label>
      <label className="text-sm font-medium text-ink">Trạng thái<select name="status" defaultValue={status} className="mt-1 w-full rounded-lg border border-border-strong bg-canvas px-3 py-2 font-normal"><option value="">Tất cả trạng thái</option>{Object.entries(PARTY_STATUS_LABEL).map(([v,l])=><option key={v} value={v}>{l}</option>)}</select></label>
      <button className="self-end rounded-lg border border-border-strong px-4 py-2 text-sm font-semibold text-ink hover:bg-sunk">Lọc</button>
    </form>
    <section><h2 className="mb-2 text-sm font-bold text-ink">Danh sách ({parties.length})</h2><div className="overflow-x-auto rounded-xl border border-border bg-surface"><table className="w-full min-w-[58rem] text-sm"><thead><tr><th className={th}>Mã</th><th className={th}>Tổ chức/Cá nhân</th><th className={th}>Định danh</th><th className={th}>Vai trò</th><th className={th}>Đầu mối</th><th className={th}>Trạng thái</th></tr></thead><tbody>{parties.map(p=><tr key={p.id} className="border-b border-border last:border-0 hover:bg-sunk"><td className="px-3 py-3"><Link className="font-mono text-xs font-semibold text-accent hover:underline" href={`/modules/M34/crm/${p.id}`}>{p.code}</Link></td><td className="px-3 py-3"><div className="font-medium text-ink">{p.legalName}</div><div className="text-xs text-ink-3">{PARTY_TYPE_LABEL[p.partyType]}{p.shortName ? ` · ${p.shortName}` : ""}</div></td><td className="px-3 py-3 text-ink-2">{p.taxId || "—"}</td><td className="px-3 py-3"><div className="flex flex-wrap gap-1">{p.roles.map(r=><span key={r.id} className="rounded-full bg-sunk px-2 py-0.5 text-xs text-ink-2">{roleLabel(roleLabels,r.roleTypeCode)}</span>)}</div></td><td className="px-3 py-3 text-xs text-ink-2">{p.contacts[0]?.fullName || "—"}<br/>{p.contacts[0]?.phone}</td><td className="px-3 py-3"><span className="rounded-full bg-sunk px-2 py-1 text-xs font-medium text-ink-2">{PARTY_STATUS_LABEL[p.status]}</span></td></tr>)}{!parties.length&&<tr><td colSpan={6} className="px-4 py-10 text-center text-ink-3">Chưa có hồ sơ phù hợp. Kiểm tra bộ lọc hoặc tạo Tổ chức/Cá nhân mới.</td></tr>}</tbody></table></div></section>
  </div>;
}
