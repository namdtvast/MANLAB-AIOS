import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getM14Role } from "@/lib/m14/actor";
import { DOC_STATUS_LABEL, DOC_TYPE_LABEL, M14_ROLE_LABEL } from "@/lib/m14/labels";
import { CanCuBanner } from "@/components/CanCuBanner";
import { StatCard } from "@/components/StatCard";

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

const LOC_LABEL: Record<string, string> = {
  "hieu-luc": "Đang có hiệu lực",
  "cho-xu-ly": "Đang chờ xử lý",
  "goi-y": "Có gợi ý AI chờ áp dụng",
};

export default async function M14ListPage({ searchParams }: { searchParams: Promise<{ loc?: string }> }) {
  const { loc } = await searchParams;
  const [docs, role, openSuggestions] = await Promise.all([
    prisma.m14Document.findMany({
      orderBy: { createdAt: "desc" },
      include: { createdBy: true, supersedes: true },
    }),
    getM14Role(),
    // Lấy documentId chứ không chỉ đếm: thẻ "Gợi ý AI chờ áp dụng" phải lọc được ra
    // đúng những văn bản đang có gợi ý treo.
    prisma.m14AiSuggestion.findMany({ where: { appliedAt: null }, select: { documentId: true } }),
  ]);

  const pendingSuggestions = openSuggestions.length;
  const docsWithSuggestion = new Set(openSuggestions.map((s) => s.documentId));

  const effective = docs.filter((d) => d.status === "DA_PHE_DUYET").length;
  const inFlight = docs.filter((d) => ["CHO_SOAT_XET", "CHO_PHE_DUYET"].includes(d.status)).length;

  // Bộ lọc nông từ thẻ chỉ số — bấm vào con số thì thấy đúng những văn bản làm nên con số đó.
  const filter = loc && LOC_LABEL[loc] ? loc : null;
  const listed =
    filter === "hieu-luc"
      ? docs.filter((d) => d.status === "DA_PHE_DUYET")
      : filter === "cho-xu-ly"
        ? docs.filter((d) => ["CHO_SOAT_XET", "CHO_PHE_DUYET"].includes(d.status))
        : filter === "goi-y"
          ? docs.filter((d) => docsWithSuggestion.has(d.id))
          : docs;

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
        <StatCard label="Đang có hiệu lực" value={effective} tone="good" href="/modules/M14?loc=hieu-luc#so-dang-ky" />
        <StatCard
          label="Đang chờ xử lý"
          value={inFlight}
          tone={inFlight > 0 ? "warn" : "ink"}
          href="/modules/M14?loc=cho-xu-ly#so-dang-ky"
        />
        <StatCard label="Gợi ý AI chờ áp dụng" value={pendingSuggestions} href="/modules/M14?loc=goi-y#so-dang-ky" />
        <StatCard label="Tổng văn bản" value={docs.length} href="/modules/M14#so-dang-ky" />
      </div>

      <section id="so-dang-ky" className="flex scroll-mt-24 flex-col gap-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-head text-sm font-bold text-ink">Sổ đăng ký văn bản (F14.02 nội bộ · F14.03 bên ngoài)</h2>
          <Link href="/modules/M14/doc/new" className="rounded-lg bg-accent px-3 py-1.5 text-xs font-semibold text-accent-ink hover:opacity-90">
            + Soạn thảo văn bản
          </Link>
        </div>

        {filter && (
          <p className="flex flex-wrap items-center gap-2 text-xs text-ink-2">
            Đang lọc: <strong className="text-ink">{LOC_LABEL[filter]}</strong> ({listed.length}/{docs.length} văn bản)
            <Link href="/modules/M14#so-dang-ky" className="font-medium text-accent hover:underline">
              Bỏ lọc
            </Link>
          </p>
        )}

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
              {listed.map((d) => (
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
              {listed.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-3 py-6 text-center text-sm text-ink-3">
                    {filter ? `Không có văn bản nào thuộc nhóm “${LOC_LABEL[filter]}”.` : "Chưa có văn bản nào."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
