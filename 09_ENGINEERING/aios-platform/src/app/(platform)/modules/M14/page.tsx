import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getM14Role } from "@/lib/m14/actor";
import { DOC_STATUS_LABEL, DOC_TYPE_LABEL, M14_ROLE_LABEL } from "@/lib/m14/labels";
import { CanCuBanner } from "@/components/CanCuBanner";

const TONE_CLASS: Record<string, string> = {
  good: "bg-good-soft text-good",
  warn: "bg-warn-soft text-warn",
  crit: "bg-crit-soft text-crit",
  neutral: "bg-sunk text-ink-2",
};

const STATUS_TONE: Record<string, string> = {
  NHAP: "neutral",
  CHO_SOAT_XET: "warn",
  KHONG_SOAT_XET: "crit",
  CHO_PHE_DUYET: "warn",
  KHONG_PHE_DUYET: "crit",
  DA_PHE_DUYET: "good",
  HET_HIEU_LUC_HUY: "neutral",
};

const th = "border-b border-border px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-ink-3";

export default async function M14ListPage() {
  const [docs, role, pendingSuggestions] = await Promise.all([
    prisma.m14Document.findMany({
      orderBy: { createdAt: "desc" },
      include: { createdBy: true, supersedes: true },
    }),
    getM14Role(),
    prisma.m14AiSuggestion.count({ where: { appliedAt: null } }),
  ]);

  const effective = docs.filter((d) => d.status === "DA_PHE_DUYET").length;
  const inFlight = docs.filter((d) => ["CHO_SOAT_XET", "CHO_PHE_DUYET"].includes(d.status)).length;

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="text-xs font-medium text-ink-3">M14 · MP14 · Kiểm soát tài liệu</p>
        <h1 className="font-head text-2xl font-bold text-ink">Danh mục văn bản kiểm soát</h1>
        <p className="mt-1 text-sm text-ink-2">
          Vai trò M14 của bạn:{" "}
          <strong className="text-ink">{role ? (M14_ROLE_LABEL[role] ?? role) : "Chưa được gán vai trò"}</strong>
        </p>
      </div>

      <CanCuBanner moduleCode="M14" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="rounded-xl border border-border bg-surface p-4">
          <p className="text-xs text-ink-3">Đang có hiệu lực</p>
          <p className="font-head text-2xl font-bold text-good">{effective}</p>
        </div>
        <div className="rounded-xl border border-border bg-surface p-4">
          <p className="text-xs text-ink-3">Đang chờ xử lý</p>
          <p className="font-head text-2xl font-bold text-warn">{inFlight}</p>
        </div>
        <div className="rounded-xl border border-border bg-surface p-4">
          <p className="text-xs text-ink-3">Gợi ý AI chờ áp dụng</p>
          <p className="font-head text-2xl font-bold text-ink">{pendingSuggestions}</p>
        </div>
        <div className="rounded-xl border border-border bg-surface p-4">
          <p className="text-xs text-ink-3">Tổng văn bản</p>
          <p className="font-head text-2xl font-bold text-ink">{docs.length}</p>
        </div>
      </div>

      <section className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-head text-sm font-bold text-ink">Sổ đăng ký văn bản (F14.02 nội bộ · F14.03 bên ngoài)</h2>
          <Link href="/modules/M14/doc/new" className="rounded-lg bg-accent px-3 py-1.5 text-xs font-semibold text-accent-ink hover:opacity-90">
            + Soạn thảo văn bản
          </Link>
        </div>
        <div className="overflow-x-auto rounded-xl border border-border bg-surface">
          <table className="w-full min-w-[36rem] text-sm">
            <thead>
              <tr>
                <th className={th}>Mã số</th>
                <th className={th}>Tên văn bản</th>
                <th className={th}>Loại</th>
                <th className={th}>Lần BH</th>
                <th className={th}>Trạng thái</th>
                <th className={th}>Thay thế</th>
              </tr>
            </thead>
            <tbody>
              {docs.map((d) => (
                <tr key={d.id} className="border-b border-border last:border-0 hover:bg-sunk">
                  <td className="px-3 py-2">
                    <Link href={`/modules/M14/doc/${d.id}`} className="whitespace-nowrap font-mono text-xs font-medium text-accent hover:underline">
                      {d.code}
                    </Link>
                  </td>
                  <td className="px-3 py-2 text-ink">{d.title}</td>
                  <td className="px-3 py-2 text-ink-2">{DOC_TYPE_LABEL[d.docType]}</td>
                  <td className="px-3 py-2 text-ink-2">{d.revision ?? "—"}</td>
                  <td className="px-3 py-2">
                    <span className={`inline-flex items-center rounded-full whitespace-nowrap px-2 py-0.5 text-xs font-medium ${TONE_CLASS[STATUS_TONE[d.status]]}`}>
                      {DOC_STATUS_LABEL[d.status]}
                    </span>
                  </td>
                  <td className="px-3 py-2 font-mono text-xs text-ink-2">{d.supersedes?.code ?? "—"}</td>
                </tr>
              ))}
              {docs.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-3 py-6 text-center text-sm text-ink-3">Chưa có văn bản nào.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
