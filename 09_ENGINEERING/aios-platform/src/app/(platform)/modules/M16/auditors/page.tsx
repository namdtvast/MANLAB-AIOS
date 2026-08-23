// Sổ năng lực đánh giá viên (quy tắc 1 ETV.P16, Increment 13) — bằng chứng là hồ sơ đào tạo thật
// của M03, không phải cờ tự khai.
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getM16Role } from "@/lib/m16/actor";
import { QUAL_TYPE_LABEL } from "@/lib/m16/labels";
import { REQUIRED_LEAD_QUALS, REQUIRED_MEMBER_QUALS } from "@/lib/m16/rules";
import { RecognizeForm } from "./RecognizeForm";

export default async function M16AuditorsPage() {
  const [employees, role] = await Promise.all([
    prisma.m03Employee.findMany({
      orderBy: { code: "asc" },
      include: {
        m16Qualifications: { include: { trainingRecord: true, recognizedBy: true } },
        trainingRecords: { where: { result: "DAT", status: "APPROVED" }, include: { trainingPlan: true } },
      },
    }),
    getM16Role(),
  ]);

  return (
    <div className="flex max-w-4xl flex-col gap-6">
      <div>
        <p className="text-xs font-medium text-ink-3">M16 · Quy tắc 1 ETV.P16</p>
        <h1 className="font-head text-2xl font-bold text-ink">Sổ năng lực đánh giá viên</h1>
        <p className="mt-1 text-sm text-ink-2">
          Đánh giá viên phải đủ {REQUIRED_MEMBER_QUALS.length} năng lực ({REQUIRED_MEMBER_QUALS.map((q) => QUAL_TYPE_LABEL[q]).join(" + ")}); trưởng
          đoàn phải đủ {REQUIRED_LEAD_QUALS.length}. Bằng chứng bắt buộc là hồ sơ đào tạo đã phê duyệt <strong className="text-ink">Đạt</strong> bên
          M03 — chương trình đánh giá không xác nhận được nếu đoàn chưa đủ năng lực.
        </p>
        <Link href="/modules/M16" className="mt-2 inline-block text-sm text-accent hover:underline">
          ← Kế hoạch &amp; Chương trình đánh giá
        </Link>
      </div>

      <ul className="flex flex-col gap-3">
        {employees.map((e) => {
          const quals = e.m16Qualifications.map((q) => q.qualType as string);
          const isAuditorReady = REQUIRED_MEMBER_QUALS.every((q) => quals.includes(q));
          const isLeadReady = REQUIRED_LEAD_QUALS.every((q) => quals.includes(q));
          return (
            <li key={e.id} className="flex flex-col gap-2 rounded-xl border border-border bg-surface p-4">
              <div className="flex items-baseline justify-between gap-3">
                <div>
                  <p className="font-mono text-xs text-ink-3">{e.code}</p>
                  <p className="font-medium text-ink">{e.fullName}</p>
                  <p className="text-sm text-ink-2">
                    {e.position} · {e.department}
                  </p>
                </div>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    isLeadReady ? "bg-good-soft text-good" : isAuditorReady ? "bg-warn-soft text-warn" : "bg-sunk text-ink-2"
                  }`}
                >
                  {isLeadReady ? "Đủ điều kiện trưởng đoàn" : isAuditorReady ? "Đủ điều kiện đánh giá viên" : "Chưa đủ năng lực"}
                </span>
              </div>

              <ul className="flex flex-col gap-1 text-sm">
                {e.m16Qualifications.map((q) => (
                  <li key={q.id} className="rounded-lg border border-border bg-bg px-3 py-2">
                    <p className="text-ink">{QUAL_TYPE_LABEL[q.qualType]}</p>
                    <p className="text-xs text-ink-2">
                      {q.trainingRecord ? `Bằng chứng: hồ sơ đào tạo ${q.trainingRecord.code} (M03)` : `Căn cứ: ${q.note ?? "—"}`} · Công nhận bởi{" "}
                      {q.recognizedBy.name} ngày {q.recognizedAt.toLocaleDateString("vi-VN")}
                    </p>
                  </li>
                ))}
                {e.m16Qualifications.length === 0 && <li className="text-ink-3">Chưa công nhận năng lực nào.</li>}
              </ul>

              {role === "QLCL" && (
                <RecognizeForm
                  employeeId={e.id}
                  employeeName={e.fullName}
                  passedRecords={e.trainingRecords.map((r) => ({ id: r.id, code: r.code, planType: r.trainingPlan.planType }))}
                />
              )}
            </li>
          );
        })}
        {employees.length === 0 && (
          <li className="rounded-xl border border-border bg-surface p-4 text-sm text-ink-3">
            Chưa có hồ sơ nhân sự nào trong M03 để công nhận năng lực.
          </li>
        )}
      </ul>

      <p className="text-xs text-ink-3">
        Vai trò M16 của bạn: <strong className="text-ink">{role ?? "chưa gán"}</strong>
        {role !== "QLCL" && " — chỉ QLCL được công nhận năng lực."}
      </p>
    </div>
  );
}
