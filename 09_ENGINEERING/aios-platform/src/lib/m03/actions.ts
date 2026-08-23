"use server";

// M03 — Server Actions. Logic quyết định chuyển trạng thái nằm hoàn toàn ở "@/lib/m03/rules" —
// action này chỉ gọi rule rồi ghi DB, không tự quyết định gì thêm (mirror src/lib/m01/actions.ts).
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import type {
  M03ContractType,
  M03EmploymentType,
  M03ServiceType,
  M03TerminationContractType,
  M03TrainingPlanType,
} from "@/generated/prisma/enums";
import { getActor } from "./actor";
import {
  allConditionsMet,
  txApproveRecruitment,
  txApproveTraining,
  txFulfillRecruitment,
  txRenewContract,
  txSignContract,
  txSubmitRecruitment,
  txSubmitTraining,
  txTerminateContract,
  validateTermination,
  type M03ActorUser,
  type TxResult,
} from "./rules";

async function logAudit(
  itemType: "RECRUITMENT" | "TRAINING_RECORD" | "LABOR_CONTRACT" | "SERVICE_CONTRACT" | "TERMINATION",
  itemId: string,
  actor: M03ActorUser,
  action: string,
  reason: string | null
) {
  await prisma.m03AuditEntry.create({
    data: { itemType, itemId, actorId: actor.id, role: actor.m03Role ?? "—", action, reason },
  });
}

function revalidateM03(paths: string[]) {
  revalidatePath("/modules/M03");
  for (const p of paths) revalidatePath(p);
}

// ---------- RecruitmentPlan ----------

export async function createRecruitmentPlan(input: { position: string; department: string; headcount: number; requirement: string }) {
  const actor = await getActor();
  const year = new Date().getFullYear();
  const created = await prisma.$transaction(async (tx) => {
    const r = await tx.m03RecruitmentPlan.create({
      data: { code: "PENDING", ...input, createdById: actor.id },
    });
    const code = `TD-${year}-${String(r.seq).padStart(4, "0")}`;
    return tx.m03RecruitmentPlan.update({ where: { id: r.id }, data: { code } });
  });
  await logAudit("RECRUITMENT", created.id, actor, "Tạo đề xuất tuyển dụng", null);
  revalidateM03([]);
  return created;
}

async function applyRecruitmentTransition(id: string, result: TxResult, actor: M03ActorUser) {
  if (!result.ok) return result;
  const before = await prisma.m03RecruitmentPlan.findUniqueOrThrow({ where: { id } });
  await prisma.m03RecruitmentPlan.update({ where: { id }, data: { status: result.status as never, ...result.patch } });
  await logAudit("RECRUITMENT", id, actor, `${result.action} (${before.status} → ${result.status})`, result.reason);
  revalidateM03([`/modules/M03/recruitment/${id}`]);
  return result;
}

export async function submitRecruitmentPlan(id: string): Promise<TxResult> {
  const actor = await getActor();
  const r = await prisma.m03RecruitmentPlan.findUniqueOrThrow({ where: { id } });
  return applyRecruitmentTransition(id, txSubmitRecruitment(r), actor);
}

export async function approveRecruitmentPlan(id: string, input: { decision: "reject" | "approve"; reason?: string }): Promise<TxResult> {
  const actor = await getActor();
  const r = await prisma.m03RecruitmentPlan.findUniqueOrThrow({ where: { id } });
  return applyRecruitmentTransition(id, txApproveRecruitment(r, actor, input), actor);
}

export async function fulfillRecruitmentPlan(
  id: string,
  employee: { fullName: string; position: string; department: string; employmentType: M03EmploymentType; hireDate: string }
) {
  const actor = await getActor();
  const r = await prisma.m03RecruitmentPlan.findUniqueOrThrow({ where: { id } });
  const result = txFulfillRecruitment(r, actor);
  if (!result.ok) return result;

  const year = new Date().getFullYear();
  const created = await prisma.$transaction(async (tx) => {
    await tx.m03RecruitmentPlan.update({ where: { id }, data: { status: "FULFILLED" } });
    const e = await tx.m03Employee.create({
      data: {
        code: "PENDING",
        fullName: employee.fullName,
        position: employee.position,
        department: employee.department,
        employmentType: employee.employmentType,
        hireDate: new Date(employee.hireDate),
        recruitmentPlanId: id,
      },
    });
    const code = `NS-${year}-${String(e.seq).padStart(4, "0")}`;
    return tx.m03Employee.update({ where: { id: e.id }, data: { code } });
  });
  await logAudit("RECRUITMENT", id, actor, `Đã tuyển — tạo hồ sơ nhân sự ${created.code}`, null);
  revalidateM03([`/modules/M03/recruitment/${id}`]);
  return { ok: true, employeeId: created.id } as const;
}

export async function listEmployees() {
  await getActor();
  return prisma.m03Employee.findMany({ orderBy: { createdAt: "desc" } });
}

// ---------- TrainingPlan / TrainingRecord ----------

export async function createTrainingPlan(input: { employeeId: string; planType: M03TrainingPlanType; content: string[]; trainer: string }) {
  const actor = await getActor();
  if (input.planType === "BAN_DAU" && input.content.length < 8) {
    return { ok: false, code: "CONTENT_INCOMPLETE", message: "Đào tạo Ban đầu bắt buộc đủ ≥8 nội dung (quy tắc DacTa.md §2.2)." } as const;
  }
  const year = new Date().getFullYear();
  const created = await prisma.$transaction(async (tx) => {
    const p = await tx.m03TrainingPlan.create({ data: { code: "PENDING", ...input } });
    const code = `DT-${year}-${String(p.seq).padStart(4, "0")}`;
    return tx.m03TrainingPlan.update({ where: { id: p.id }, data: { code } });
  });
  await logAudit("TRAINING_RECORD", created.id, actor, "Tạo kế hoạch đào tạo", null);

  const rYear = new Date().getFullYear();
  const record = await prisma.$transaction(async (tx) => {
    const rec = await tx.m03TrainingRecord.create({
      data: { code: "PENDING", trainingPlanId: created.id, employeeId: input.employeeId },
    });
    const code = `PT-${rYear}-${String(rec.seq).padStart(4, "0")}`;
    return tx.m03TrainingRecord.update({ where: { id: rec.id }, data: { code } });
  });
  await logAudit("TRAINING_RECORD", record.id, actor, "Tạo phiếu theo dõi kết quả đào tạo", null);
  revalidateM03([]);
  return record;
}

export async function updateTrainingConditions(
  id: string,
  input: Partial<{
    c1AttendedAllContent: boolean;
    c2FollowedRules: boolean;
    c3CanPerformWork: boolean;
    c4RecordsComplete: boolean;
    c5AssessmentPassed: boolean;
    c6EvidenceSufficient: boolean;
    assessmentMethod: string;
    evidence: string;
  }>
) {
  await getActor();
  const updated = await prisma.m03TrainingRecord.update({ where: { id }, data: input });
  revalidateM03([`/modules/M03/training/${id}`]);
  return updated;
}

async function applyTrainingTransition(id: string, result: TxResult, actor: M03ActorUser) {
  if (!result.ok) return result;
  const before = await prisma.m03TrainingRecord.findUniqueOrThrow({ where: { id } });
  await prisma.m03TrainingRecord.update({ where: { id }, data: { status: result.status as never, ...result.patch } });
  await logAudit("TRAINING_RECORD", id, actor, `${result.action} (${before.status} → ${result.status})`, result.reason);
  revalidateM03([`/modules/M03/training/${id}`]);
  return result;
}

export async function submitTrainingRecord(id: string): Promise<TxResult> {
  const actor = await getActor();
  const t = await prisma.m03TrainingRecord.findUniqueOrThrow({ where: { id } });
  return applyTrainingTransition(id, txSubmitTraining(t), actor);
}

export async function approveTrainingRecord(id: string, input: { decision: "reject" | "approve"; reason?: string }): Promise<TxResult> {
  const actor = await getActor();
  const t = await prisma.m03TrainingRecord.findUniqueOrThrow({ where: { id } });
  const result = txApproveTraining(t, actor, input);
  if (!result.ok) return applyTrainingTransition(id, result, actor);
  const applied = await applyTrainingTransition(id, result, actor);
  if (applied.ok && result.status === "APPROVED" && allConditionsMet(t)) {
    await prisma.m03Employee.update({ where: { id: t.employeeId }, data: { status: "CHINHTHUC" } });
  }
  return applied;
}

// ---------- LaborContract ----------

export async function createLaborContract(input: { employeeId: string; contractType: M03ContractType; duration?: string; salary?: number; bhxhInfo?: string }) {
  const actor = await getActor();
  const year = new Date().getFullYear();
  const created = await prisma.$transaction(async (tx) => {
    const c = await tx.m03LaborContract.create({ data: { code: "PENDING", ...input } });
    const code = `HDLD-${year}-${String(c.seq).padStart(4, "0")}`;
    return tx.m03LaborContract.update({ where: { id: c.id }, data: { code } });
  });
  await logAudit("LABOR_CONTRACT", created.id, actor, "Soạn hợp đồng lao động", null);
  revalidateM03([]);
  return created;
}

async function applyContractTransition(id: string, result: TxResult, actor: M03ActorUser) {
  if (!result.ok) return result;
  const before = await prisma.m03LaborContract.findUniqueOrThrow({ where: { id } });
  const patch = { ...result.patch } as Record<string, unknown>;
  if ("_appendSnapshot" in patch) {
    const snapshot = patch._appendSnapshot;
    delete patch._appendSnapshot;
    const history = Array.isArray(before.renewalHistory) ? before.renewalHistory : [];
    patch.renewalHistory = [...history, snapshot ?? { expiryDate: before.expiryDate, at: new Date() }];
  }
  await prisma.m03LaborContract.update({ where: { id }, data: { status: result.status as never, ...patch } });
  await logAudit("LABOR_CONTRACT", id, actor, `${result.action} (${before.status} → ${result.status})`, result.reason);
  revalidateM03([`/modules/M03/contract/${id}`]);
  return result;
}

export async function signLaborContract(id: string, input: { effectiveDate: string }): Promise<TxResult> {
  const actor = await getActor();
  const c = await prisma.m03LaborContract.findUniqueOrThrow({ where: { id } });
  return applyContractTransition(id, txSignContract(c, actor, { effectiveDate: new Date(input.effectiveDate) }), actor);
}

export async function renewLaborContract(id: string, input: { newExpiryDate: string }): Promise<TxResult> {
  const actor = await getActor();
  const c = await prisma.m03LaborContract.findUniqueOrThrow({ where: { id } });
  return applyContractTransition(
    id,
    txRenewContract(c, actor, {
      newExpiryDate: new Date(input.newExpiryDate),
      previousSnapshot: { expiryDate: c.expiryDate, renewedAt: new Date() },
    }),
    actor
  );
}

export async function terminateLaborContract(id: string, input: { reason: string; securityRevoked: boolean; bhxhSettled: boolean }) {
  const actor = await getActor();
  const c = await prisma.m03LaborContract.findUniqueOrThrow({ where: { id } });
  const missing = validateTermination(input);
  if (missing.length) return { ok: false, code: "MISSING_REQUIRED", message: "Thiếu: " + missing.join(", ") } as const;
  const result = txTerminateContract(c, actor, { reason: input.reason });
  if (!result.ok) return result;
  await prisma.$transaction(async (tx) => {
    await tx.m03LaborContract.update({ where: { id }, data: { status: "TERMINATED" } });
    await tx.m03Employee.update({ where: { id: c.employeeId }, data: { status: "DANGHIVIEC" } });
    const year = new Date().getFullYear();
    const term = await tx.m03ContractTermination.create({
      data: {
        code: "PENDING",
        contractType: "LABOR",
        contractId: id,
        reason: input.reason,
        securityRevoked: input.securityRevoked,
        bhxhSettled: input.bhxhSettled,
        terminatedById: actor.id,
      },
    });
    await tx.m03ContractTermination.update({ where: { id: term.id }, data: { code: `TL-${year}-${String(term.seq).padStart(4, "0")}` } });
  });
  await logAudit("LABOR_CONTRACT", id, actor, "Chấm dứt hợp đồng lao động", input.reason);
  revalidateM03([`/modules/M03/contract/${id}`]);
  return { ok: true } as const;
}

// ---------- ServiceContract ----------

export async function createServiceContract(input: { employeeId: string; serviceType: M03ServiceType; duration?: string; fee?: number }) {
  const actor = await getActor();
  const year = new Date().getFullYear();
  const created = await prisma.$transaction(async (tx) => {
    const c = await tx.m03ServiceContract.create({ data: { code: "PENDING", ...input } });
    const code = `HDDV-${year}-${String(c.seq).padStart(4, "0")}`;
    return tx.m03ServiceContract.update({ where: { id: c.id }, data: { code } });
  });
  await logAudit("SERVICE_CONTRACT", created.id, actor, "Soạn hợp đồng dịch vụ", null);
  revalidateM03([]);
  return created;
}

export async function signServiceContract(id: string) {
  const actor = await getActor();
  if (actor.m03Role !== "LDV") return { ok: false, code: "FORBIDDEN", message: "Chỉ LĐV được ký hợp đồng." } as const;
  const before = await prisma.m03ServiceContract.findUniqueOrThrow({ where: { id } });
  if (before.status !== "DRAFT") return { ok: false, code: "BAD_STATE", message: "Chỉ hợp đồng Đang soạn mới ký được." } as const;
  await prisma.m03ServiceContract.update({ where: { id }, data: { status: "ACTIVE", signedById: actor.id } });
  await logAudit("SERVICE_CONTRACT", id, actor, "Ký hợp đồng dịch vụ (DRAFT → ACTIVE)", null);
  revalidateM03([]);
  return { ok: true } as const;
}

export async function terminateServiceContract(id: string, input: { reason: string; securityRevoked: boolean; bhxhSettled: boolean }) {
  const actor = await getActor();
  if (actor.m03Role !== "LDV") return { ok: false, code: "FORBIDDEN", message: "Chỉ LĐV được chấm dứt hợp đồng." } as const;
  const missing = validateTermination(input);
  if (missing.length) return { ok: false, code: "MISSING_REQUIRED", message: "Thiếu: " + missing.join(", ") } as const;
  const before = await prisma.m03ServiceContract.findUniqueOrThrow({ where: { id } });
  if (before.status !== "ACTIVE") return { ok: false, code: "BAD_STATE", message: "Chỉ hợp đồng Đang hiệu lực mới chấm dứt được." } as const;
  await prisma.$transaction(async (tx) => {
    await tx.m03ServiceContract.update({ where: { id }, data: { status: "TERMINATED" } });
    const year = new Date().getFullYear();
    const term = await tx.m03ContractTermination.create({
      data: {
        code: "PENDING",
        contractType: "SERVICE",
        contractId: id,
        reason: input.reason,
        securityRevoked: input.securityRevoked,
        bhxhSettled: input.bhxhSettled,
        terminatedById: actor.id,
      },
    });
    await tx.m03ContractTermination.update({ where: { id: term.id }, data: { code: `TL-${year}-${String(term.seq).padStart(4, "0")}` } });
  });
  await logAudit("SERVICE_CONTRACT", id, actor, "Chấm dứt hợp đồng dịch vụ", input.reason);
  revalidateM03([]);
  return { ok: true } as const;
}

export async function listAssignableUsers() {
  await getActor();
  const assignments = await prisma.moduleRoleAssignment.findMany({ where: { moduleCode: "M03" }, include: { user: true } });
  const seen = new Set<string>();
  return assignments
    .filter((a) => (seen.has(a.userId) ? false : (seen.add(a.userId), true)))
    .map((a) => ({ id: a.userId, name: a.user.name ?? a.user.email, role: a.role }));
}

export type { M03TerminationContractType };
