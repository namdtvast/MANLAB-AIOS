import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getM12Role } from "@/lib/m12/actor";
import { escalateFeedback } from "@/lib/m12/actions";
import { CHANNEL_LABEL, COMPLAINT_STATUS_LABEL, FEEDBACK_CATEGORY_LABEL, FEEDBACK_ORIGIN_LABEL, M12_ROLE_LABEL } from "@/lib/m12/labels";

const TONE_CLASS: Record<string, string> = {
  good: "bg-good-soft text-good",
  warn: "bg-warn-soft text-warn",
  crit: "bg-crit-soft text-crit",
  neutral: "bg-sunk text-ink-2",
};

function Badge({ label, tone }: { label: string; tone: string }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${TONE_CLASS[tone]}`}>
      {label}
    </span>
  );
}

const COMPLAINT_TONE: Record<string, string> = {
  NHAP: "neutral",
  DANG_XU_LY: "warn",
  DA_TRA_LOI: "warn",
  DONG_HO_SO: "good",
  KHONG_DAT_THOA_THUAN: "crit",
};

export default async function M12ListPage() {
  const [complaints, feedbacks, role] = await Promise.all([
    prisma.m12Complaint.findMany({ orderBy: { createdAt: "desc" }, include: { createdBy: true, assignedTo: true } }),
    prisma.m12Feedback.findMany({ orderBy: { createdAt: "desc" }, take: 10, include: { escalatedComplaint: true } }),
    getM12Role(),
  ]);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="text-xs font-medium text-ink-3">M12 · MP12 · Khiếu nại</p>
        <h1 className="font-head text-2xl font-bold text-ink">Khiếu nại &amp; Phàn nàn/Góp ý</h1>
        <p className="mt-1 text-sm text-ink-2">
          Vai trò M12 của bạn:{" "}
          <strong className="text-ink">{role ? (M12_ROLE_LABEL[role] ?? role) : "Chưa được gán vai trò"}</strong>
        </p>
      </div>

      <section className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h2 className="font-head text-sm font-bold text-ink">Khiếu nại</h2>
          <Link href="/modules/M12/complaint/new" className="rounded-lg bg-accent px-3 py-1.5 text-xs font-semibold text-accent-ink hover:opacity-90">
            + Tiếp nhận khiếu nại
          </Link>
        </div>
        <div className="overflow-x-auto rounded-xl border border-border bg-surface">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="border-b border-border px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-ink-3">Mã</th>
                <th className="border-b border-border px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-ink-3">Kênh</th>
                <th className="border-b border-border px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-ink-3">Trạng thái</th>
                <th className="border-b border-border px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-ink-3">Người phụ trách</th>
                <th className="border-b border-border px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-ink-3">Người tiếp nhận</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((c) => (
                <tr key={c.id} className="border-b border-border last:border-0 hover:bg-sunk">
                  <td className="px-3 py-2">
                    <Link href={`/modules/M12/complaint/${c.id}`} className="font-mono text-xs font-medium text-accent hover:underline">
                      {c.code}
                    </Link>
                  </td>
                  <td className="px-3 py-2 text-ink-2">{CHANNEL_LABEL[c.channel]}</td>
                  <td className="px-3 py-2">
                    <Badge label={COMPLAINT_STATUS_LABEL[c.status]} tone={COMPLAINT_TONE[c.status]} />
                  </td>
                  <td className="px-3 py-2 text-ink-2">{c.assignedTo?.name ?? "—"}</td>
                  <td className="px-3 py-2 text-ink-2">{c.createdBy.name}</td>
                </tr>
              ))}
              {complaints.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-3 py-6 text-center text-sm text-ink-3">Chưa có khiếu nại nào.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h2 className="font-head text-sm font-bold text-ink">Phàn nàn / Góp ý gần đây</h2>
          <Link href="/modules/M12/feedback/new" className="rounded-lg border border-border-strong px-3 py-1.5 text-xs font-semibold text-ink hover:bg-sunk">
            + Ghi nhận phàn nàn/góp ý
          </Link>
        </div>
        <div className="overflow-x-auto rounded-xl border border-border bg-surface">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="border-b border-border px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-ink-3">Mã</th>
                <th className="border-b border-border px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-ink-3">Nguồn</th>
                <th className="border-b border-border px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-ink-3">Nhóm</th>
                <th className="border-b border-border px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-ink-3">Đã chuyển khiếu nại?</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.map((f) => (
                <tr key={f.id} className="border-b border-border last:border-0 hover:bg-sunk">
                  <td className="px-3 py-2 font-mono text-xs text-ink">{f.code}</td>
                  <td className="px-3 py-2 text-ink-2">{FEEDBACK_ORIGIN_LABEL[f.origin]}</td>
                  <td className="px-3 py-2 text-ink-2">{FEEDBACK_CATEGORY_LABEL[f.category]}</td>
                  <td className="px-3 py-2">
                    {f.escalatedComplaint ? (
                      <Link href={`/modules/M12/complaint/${f.escalatedComplaint.id}`} className="text-accent hover:underline">
                        {f.escalatedComplaint.code}
                      </Link>
                    ) : (
                      <form
                        action={async () => {
                          "use server";
                          await escalateFeedback(f.id);
                        }}
                      >
                        <button type="submit" className="cursor-pointer text-xs font-medium text-accent hover:underline">
                          Chuyển thành khiếu nại (quy tắc 6)
                        </button>
                      </form>
                    )}
                  </td>
                </tr>
              ))}
              {feedbacks.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-3 py-6 text-center text-sm text-ink-3">Chưa có phàn nàn/góp ý nào.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
