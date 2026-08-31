import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getM03Role } from "@/lib/m03/actor";
import {
  CONTRACT_STATUS_LABEL,
  CONTRACT_TYPE_LABEL,
  EMPLOYEE_STATUS_LABEL,
  EMPLOYMENT_TYPE_LABEL,
  INSPECTION_FIELD_LABEL,
  INSPECTOR_CARD_STATE_LABEL,
  SERVICE_TYPE_LABEL,
  TRAINING_STATUS_LABEL,
} from "@/lib/m03/labels";
import { currentInspectorCard, inspectorCardState, validateInspectorCard } from "@/lib/m03/rules";
import { NewTrainingForm } from "./NewTrainingForm";
import { NewLaborContractForm } from "./NewLaborContractForm";
import { NewServiceContractForm } from "./NewServiceContractForm";
import { ServiceContractActions } from "./ServiceContractActions";

export default async function M03EmployeeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [employee, m03Role] = await Promise.all([
    prisma.m03Employee.findUnique({
      where: { id },
      include: {
        fields: { orderBy: { field: "asc" } },
        inspectorCards: { orderBy: { expiresAt: "desc" } },
        trainingRecords: { orderBy: { createdAt: "desc" } },
        laborContracts: { orderBy: { createdAt: "desc" } },
        serviceContracts: { orderBy: { createdAt: "desc" } },
      },
    }),
    getM03Role(),
  ]);
  if (!employee) notFound();

  // Hiệu lực thẻ tính bằng hàm thuần trong rules.ts, không tính tay trong JSX — cùng một luật
  // với mọi nơi khác đọc thẻ (M10/M11 sẽ gọi canPerformInspection từ đúng chỗ đó).
  const card = currentInspectorCard(employee.inspectorCards);
  const cardState = card ? inspectorCardState(card) : null;
  const cardProblems = card ? validateInspectorCard(card) : [];
  // Cùng bộ tone với M01/M12: good / warn / crit — không tự chế lớp màu mới.
  const cardBadgeClass =
    cardState === "VALID"
      ? "bg-good-soft text-good"
      : cardState === "EXPIRING_SOON"
        ? "bg-warn-soft text-warn"
        : "bg-crit-soft text-crit";

  return (
    <div className="flex max-w-4xl flex-col gap-6">
      <div>
        <p className="font-mono text-xs text-ink-3">{employee.code}</p>
        <h1 className="font-head text-2xl font-bold text-ink">{employee.fullName}</h1>
        <p className="mt-1 text-sm text-ink-2">
          {employee.position} · {employee.department} · {EMPLOYMENT_TYPE_LABEL[employee.employmentType]} ·{" "}
          {EMPLOYEE_STATUS_LABEL[employee.status]}
        </p>
      </div>

      <section className="flex flex-col gap-2">
        <h2 className="font-head text-sm font-bold text-ink">Năng lực kiểm định</h2>
        <div className="rounded-lg border border-border bg-surface p-3 text-sm">
          <p className="text-ink-2">
            <span className="text-ink-3">Lĩnh vực được ủy quyền: </span>
            {employee.fields.length > 0
              ? employee.fields.map((f) => INSPECTION_FIELD_LABEL[f.field] ?? f.field).join(" · ")
              : "chưa gán lĩnh vực nào"}
          </p>
          {card && cardState ? (
            <p className="mt-2 text-ink-2">
              <span className="text-ink-3">Thẻ kiểm định viên: </span>
              <span className="font-mono text-xs text-ink">{card.cardNumber}</span>
              {card.decisionNumber && <span className="text-ink-3"> · QĐ {card.decisionNumber}</span>}
              {card.expiresAt && <span className="text-ink-3"> · hạn {card.expiresAt.toLocaleDateString("vi-VN")}</span>}
              <span className={`ml-2 inline-flex items-center rounded-full whitespace-nowrap px-2 py-0.5 text-xs font-medium ${cardBadgeClass}`}>
                {INSPECTOR_CARD_STATE_LABEL[cardState]}
              </span>
            </p>
          ) : (
            <p className="mt-2 text-ink-3">Chưa có thẻ kiểm định viên.</p>
          )}
          {cardProblems.length > 0 && (
            <p className="mt-2 text-xs text-crit">Dữ liệu thẻ cần kiểm tra: {cardProblems.join("; ")}.</p>
          )}
          {cardState === "EXPIRED" && (
            <p className="mt-2 text-xs text-ink-2">
              Thẻ hết hiệu lực thì không được sử dụng chuẩn đo lường và không được ký giấy chứng nhận kiểm định
              (ETV.P05 §6.2, ETV.P11 §6.3).
            </p>
          )}
        </div>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="font-head text-sm font-bold text-ink">Đào tạo</h2>
        <ul className="flex flex-col gap-2 text-sm">
          {employee.trainingRecords.map((t) => (
            <li key={t.id} className="rounded-lg border border-border bg-surface p-3">
              <a href={`/modules/M03/training/${t.id}`} className="whitespace-nowrap font-mono text-xs font-medium text-accent hover:underline">
                {t.code}
              </a>
              <span className="ml-2 text-ink-2">{TRAINING_STATUS_LABEL[t.status]}</span>
            </li>
          ))}
          {employee.trainingRecords.length === 0 && (
            <li className="rounded-lg border border-border bg-surface p-3 text-ink-3">Chưa có hồ sơ đào tạo nào.</li>
          )}
        </ul>
        <NewTrainingForm employeeId={employee.id} />
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="font-head text-sm font-bold text-ink">Hợp đồng lao động</h2>
        <ul className="flex flex-col gap-2 text-sm">
          {employee.laborContracts.map((c) => (
            <li key={c.id} className="rounded-lg border border-border bg-surface p-3">
              <a href={`/modules/M03/contract/${c.id}`} className="whitespace-nowrap font-mono text-xs font-medium text-accent hover:underline">
                {c.code}
              </a>
              <span className="ml-2 text-ink-2">
                {CONTRACT_TYPE_LABEL[c.contractType]} · {CONTRACT_STATUS_LABEL[c.status]}
              </span>
            </li>
          ))}
          {employee.laborContracts.length === 0 && (
            <li className="rounded-lg border border-border bg-surface p-3 text-ink-3">Chưa có hợp đồng lao động nào.</li>
          )}
        </ul>
        <NewLaborContractForm employeeId={employee.id} />
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="font-head text-sm font-bold text-ink">Hợp đồng dịch vụ</h2>
        <ul className="flex flex-col gap-2 text-sm">
          {employee.serviceContracts.map((c) => (
            <li key={c.id} className="flex items-center justify-between rounded-lg border border-border bg-surface p-3">
              <span>
                <span className="font-mono text-xs font-medium text-ink">{c.code}</span>
                <span className="ml-2 text-ink-2">
                  {SERVICE_TYPE_LABEL[c.serviceType]} · {c.status === "ACTIVE" ? "Đang hiệu lực" : c.status === "TERMINATED" ? "Đã chấm dứt" : "Đang soạn"}
                </span>
              </span>
              <ServiceContractActions id={c.id} status={c.status} />
            </li>
          ))}
          {employee.serviceContracts.length === 0 && (
            <li className="rounded-lg border border-border bg-surface p-3 text-ink-3">Chưa có hợp đồng dịch vụ nào.</li>
          )}
        </ul>
        <NewServiceContractForm employeeId={employee.id} />
      </section>

      <p className="text-xs text-ink-3">
        Vai trò M03 của bạn: <strong className="text-ink">{m03Role ?? "chưa gán"}</strong>
      </p>
    </div>
  );
}
