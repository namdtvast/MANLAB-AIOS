import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getM16Role } from "@/lib/m16/actor";
import { CONFORMITY_LABEL, PROGRAM_STATUS_LABEL, QUAL_TYPE_LABEL } from "@/lib/m16/labels";
import { missingQualifications, programPreparationWarning, REQUIRED_LEAD_QUALS, REQUIRED_MEMBER_QUALS } from "@/lib/m16/rules";
import { NCW_STATUS_LABEL } from "@/lib/m13/labels";
import { CloseProgramPanel } from "./CloseProgramPanel";
import { ConfirmProgramButton } from "./ConfirmProgramButton";
import { DissentForm } from "./DissentForm";
import { FindingActions } from "./FindingActions";
import { NewFindingForm } from "./NewFindingForm";
import { NewReportForm } from "./NewReportForm";

export default async function M16ProgramDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [p, m16Role] = await Promise.all([
    prisma.m16AuditProgram.findUnique({
      where: { id },
      include: {
        plan: true,
        closedBy: true,
        members: { include: { employee: { include: { m16Qualifications: true } } } },
        findings: { include: { ncw: true, acknowledgedBy: true }, orderBy: { code: "asc" } },
        reports: { include: { createdBy: true, dissents: { include: { recordedBy: true }, orderBy: { createdAt: "asc" } } } },
      },
    }),
    getM16Role(),
  ]);
  if (!p) notFound();

  const auditEntries = await prisma.m16AuditEntry.findMany({
    where: { itemType: "PROGRAM", itemId: id },
    orderBy: { ts: "asc" },
    include: { actor: true },
  });

  // Quy tắc 1: hiện đúng thứ đoàn còn thiếu, không chỉ báo "không đủ điều kiện".
  const memberViews = p.members.map((m) => ({
    employeeId: m.employeeId,
    fullName: m.employee.fullName,
    isLead: m.employeeId === p.teamLeadEmployeeId,
    quals: m.employee.m16Qualifications.map((q) => q.qualType as string),
  }));
  const qualProblems = missingQualifications(memberViews);
  const prepWarning = programPreparationWarning(p.auditDate);

  return (
    <div className="flex max-w-4xl flex-col gap-6">
      <div>
        <p className="font-mono text-xs text-ink-3">{p.code}</p>
        <h1 className="font-head text-2xl font-bold text-ink">{p.department}</h1>
        <p className="mt-1 text-sm text-ink-2">
          {p.field} · {p.auditDate.toLocaleDateString("vi-VN")} · {PROGRAM_STATUS_LABEL[p.status]}
        </p>
      </div>

      {prepWarning && p.status !== "CLOSED" && (
        <p className="rounded-lg border border-border bg-warn-soft px-3 py-2 text-sm text-warn">⚠ {prepWarning}</p>
      )}

      <dl className="grid grid-cols-2 gap-x-4 gap-y-3 rounded-xl border border-border bg-surface p-4 text-sm">
        <dt className="text-ink-3">Kế hoạch</dt>
        <dd className="text-ink">
          <Link href={`/modules/M16/plan/${p.planId}`} className="text-accent hover:underline">
            {p.plan.code}
          </Link>
        </dd>
        <dt className="text-ink-3">Trưởng đoàn</dt>
        <dd className="text-ink">{p.teamLeadName}</dd>
        <dt className="text-ink-3">Thành viên đoàn</dt>
        <dd className="text-ink">{p.teamMembers.join(", ") || "—"}</dd>
        {p.closedAt && (
          <>
            <dt className="text-ink-3">Đóng chương trình</dt>
            <dd className="text-ink">
              {p.closedBy?.name} · {p.closedAt.toLocaleDateString("vi-VN")}
              {p.closureNote ? ` — ${p.closureNote}` : ""}
            </dd>
          </>
        )}
      </dl>

      <section className="flex flex-col gap-2">
        <h2 className="font-head text-sm font-bold text-ink">Năng lực đoàn đánh giá (quy tắc 1 ETV.P16)</h2>
        <ul className="flex flex-col gap-2 text-sm">
          {memberViews.map((m) => {
            const required = m.isLead ? REQUIRED_LEAD_QUALS : REQUIRED_MEMBER_QUALS;
            const missing = required.filter((q) => !m.quals.includes(q));
            return (
              <li key={m.employeeId} className="rounded-lg border border-border bg-surface p-3">
                <p className="text-ink">
                  {m.fullName}
                  {m.isLead && <span className="ml-2 rounded-full bg-sunk px-2 py-0.5 text-xs text-ink-2">Trưởng đoàn</span>}
                </p>
                <p className={missing.length === 0 ? "text-good" : "text-warn"}>
                  {missing.length === 0
                    ? `Đủ năng lực: ${required.map((q) => QUAL_TYPE_LABEL[q]).join(" · ")}`
                    : `Còn thiếu: ${missing.map((q) => QUAL_TYPE_LABEL[q]).join(" · ")}`}
                </p>
              </li>
            );
          })}
          {memberViews.length === 0 && (
            <li className="rounded-lg border border-border bg-surface p-3 text-ink-3">
              Chương trình chưa gán nhân sự thật (bản ghi trước Increment 13) — không kiểm tra được năng lực.
            </li>
          )}
        </ul>
        {qualProblems.length > 0 && p.status === "DRAFT" && (
          <p className="text-xs text-ink-2">
            Công nhận năng lực tại{" "}
            <Link href="/modules/M16/auditors" className="text-accent hover:underline">
              Sổ năng lực đánh giá viên
            </Link>{" "}
            trước khi xác nhận chương trình.
          </p>
        )}
      </section>

      {p.status === "DRAFT" && <ConfirmProgramButton id={p.id} />}

      <section className="flex flex-col gap-2">
        <h2 className="font-head text-sm font-bold text-ink">Phát hiện</h2>
        <ul className="flex flex-col gap-2 text-sm">
          {p.findings.map((f) => (
            <li key={f.id} className="rounded-lg border border-border bg-surface p-3">
              <p className="font-mono text-xs text-ink-3">{f.code}</p>
              <p className="text-ink">
                {f.clauseRef} · {f.department} · {CONFORMITY_LABEL[f.conformity]}
              </p>
              <p className="text-ink-2">{f.description}</p>
              {f.acknowledgedBy && (
                <p className="text-xs text-ink-2">
                  Trưởng bộ phận đã nhận kết quả: {f.acknowledgedBy.name} · {f.acknowledgedAt?.toLocaleDateString("vi-VN")}
                </p>
              )}
              {f.rootCauseProposal && <p className="text-xs text-ink-2">Nguyên nhân (Trưởng bộ phận): {f.rootCauseProposal}</p>}
              {f.ncw ? (
                <p className="text-xs text-ink-2">
                  Hành động khắc phục:{" "}
                  <Link href={`/modules/M13/ncw/${f.ncw.id}`} className="text-accent hover:underline">
                    {f.ncw.code}
                  </Link>{" "}
                  (M13) — {NCW_STATUS_LABEL[f.ncw.status]}
                </p>
              ) : (
                f.conformity === "KHONG_PHU_HOP" && (
                  <p className="text-xs text-warn">Chưa chuyển sang M13 — quy tắc 6 ETV.P16 bắt buộc mọi KPH phải có hành động khắc phục.</p>
                )
              )}
              {f.capaRef && <p className="text-xs text-ink-3">CAPA (dữ liệu cũ): {f.capaRef}</p>}
              {f.conformity === "KHONG_PHU_HOP" && m16Role === "TRUONGBOPHAN" && p.status === "CONFIRMED" && (
                <FindingActions findingId={f.id} acknowledged={Boolean(f.acknowledgedById)} hasNcw={Boolean(f.ncwId)} />
              )}
            </li>
          ))}
          {p.findings.length === 0 && <li className="rounded-lg border border-border bg-surface p-3 text-ink-3">Chưa có phát hiện nào.</li>}
        </ul>
        {p.status === "CONFIRMED" && <NewFindingForm programId={p.id} />}
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="font-head text-sm font-bold text-ink">Báo cáo tổng hợp</h2>
        <ul className="flex flex-col gap-2 text-sm">
          {p.reports.map((r) => (
            <li key={r.id} className="rounded-lg border border-border bg-surface p-3">
              <p className="font-mono text-xs text-ink-3">
                {r.code} {r.isLate && <span className="ml-2 rounded-full bg-crit-soft px-2 py-0.5 text-xs text-crit">Trễ hạn</span>}
              </p>
              <p className="text-ink">Kết luận: {r.closingConclusion}</p>
              <p className="text-ink-2">Người đệ trình: {r.createdBy.name}</p>

              {r.dissents.length > 0 && (
                <div className="mt-2 rounded-lg border border-border bg-bg p-2">
                  <p className="text-xs font-medium text-ink">
                    Ý kiến bảo lưu (quy tắc 3 ETV.P16 — kết luận trưởng đoàn ở trên vẫn là cuối cùng)
                  </p>
                  <ul className="mt-1 flex flex-col gap-1">
                    {r.dissents.map((d) => (
                      <li key={d.id} className="text-xs text-ink-2">
                        <strong className="text-ink">{d.opinionBy}</strong>: {d.opinion}{" "}
                        <span className="text-ink-3">(ghi bởi {d.recordedBy.name})</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {p.status === "CONFIRMED" && (m16Role === "DANHGIAVIEN" || m16Role === "TRUONGDOAN") && <DissentForm reportId={r.id} />}
            </li>
          ))}
          {p.reports.length === 0 && <li className="rounded-lg border border-border bg-surface p-3 text-ink-3">Chưa có báo cáo nào.</li>}
        </ul>
        {p.status === "CONFIRMED" && <NewReportForm programId={p.id} />}
      </section>

      {p.status === "CONFIRMED" && m16Role === "LDP" && <CloseProgramPanel programId={p.id} />}

      <div>
        <h2 className="mb-2 font-head text-sm font-bold text-ink">Nhật ký</h2>
        <ul className="flex flex-col gap-2 text-sm">
          {auditEntries.map((e) => (
            <li key={e.id} className="rounded-lg border border-border bg-surface p-3">
              <p className="text-ink">
                <span className="text-ink-3">{e.ts.toLocaleString("vi-VN")}</span> · {e.actor.name} ({e.role}) — {e.action}
              </p>
              {e.reason && <p className="mt-1 text-ink-2">Lý do: {e.reason}</p>}
            </li>
          ))}
          {auditEntries.length === 0 && <li className="rounded-lg border border-border bg-surface p-3 text-ink-3">Chưa có sự kiện nào.</li>}
        </ul>
      </div>

      <p className="text-xs text-ink-3">
        Vai trò M16 của bạn: <strong className="text-ink">{m16Role ?? "chưa gán"}</strong>
      </p>
    </div>
  );
}
