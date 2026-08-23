import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getM03Role } from "@/lib/m03/actor";
import {
  CONTRACT_STATUS_LABEL,
  CONTRACT_TYPE_LABEL,
  EMPLOYEE_STATUS_LABEL,
  EMPLOYMENT_TYPE_LABEL,
  SERVICE_TYPE_LABEL,
  TRAINING_STATUS_LABEL,
} from "@/lib/m03/labels";
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
        trainingRecords: { orderBy: { createdAt: "desc" } },
        laborContracts: { orderBy: { createdAt: "desc" } },
        serviceContracts: { orderBy: { createdAt: "desc" } },
      },
    }),
    getM03Role(),
  ]);
  if (!employee) notFound();

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
        <h2 className="font-head text-sm font-bold text-ink">Đào tạo</h2>
        <ul className="flex flex-col gap-2 text-sm">
          {employee.trainingRecords.map((t) => (
            <li key={t.id} className="rounded-lg border border-border bg-surface p-3">
              <a href={`/modules/M03/training/${t.id}`} className="font-mono text-xs font-medium text-accent hover:underline">
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
              <a href={`/modules/M03/contract/${c.id}`} className="font-mono text-xs font-medium text-accent hover:underline">
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
