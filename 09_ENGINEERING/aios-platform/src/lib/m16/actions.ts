"use server";

// M16 — Server Actions. Logic quyết định nằm hoàn toàn ở "@/lib/m16/rules" — action này chỉ gọi
// rule rồi ghi DB, không tự quyết định gì thêm (mirror src/lib/m01/actions.ts).
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import type { M16AuditType, M16Conformity } from "@/generated/prisma/enums";
import { getActor } from "./actor";
import { createNcw } from "@/lib/m13/actions";
import { ensureLessonFromSource } from "@/lib/m26/hooks";
import {
  canCreateFinding,
  canCreateReport,
  computeIsLate,
  txAcknowledgeFinding,
  txApprovePlan,
  txCloseProgram,
  txConfirmProgram,
  txProposeCorrectiveAction,
  txProposeFollowUpAudit,
  txRecognizeQualification,
  txRecordDissent,
  txReviewPlan,
  txSubmitPlan,
  type M16ActorUser,
  type M16QualTypeLite,
  type ProgramMemberForRules,
  type TxResult,
} from "./rules";

async function logAudit(itemType: "PLAN" | "PROGRAM" | "REPORT", itemId: string, actor: M16ActorUser, action: string, reason: string | null) {
  await prisma.m16AuditEntry.create({
    data: { itemType, itemId, actorId: actor.id, role: actor.m16Role ?? "—", action, reason },
  });
}

function revalidateM16(paths: string[] = []) {
  revalidatePath("/modules/M16");
  for (const p of paths) revalidatePath(p);
}

// ---------- AuditPlan ----------

export async function createAuditPlan(input: { type: M16AuditType; year: number; scope: string[]; auditors: string[]; isAdHoc: boolean }) {
  const actor = await getActor();
  const yearNow = new Date().getFullYear();
  const created = await prisma.$transaction(async (tx) => {
    const p = await tx.m16AuditPlan.create({ data: { code: "PENDING", ...input, createdById: actor.id } });
    const code = `KHDG-${yearNow}-${String(p.seq).padStart(4, "0")}`;
    return tx.m16AuditPlan.update({ where: { id: p.id }, data: { code } });
  });
  await logAudit("PLAN", created.id, actor, "Lập kế hoạch đánh giá", null);
  revalidateM16();
  return created;
}

async function applyPlanTransition(id: string, result: TxResult, actor: M16ActorUser) {
  if (!result.ok) return result;
  const before = await prisma.m16AuditPlan.findUniqueOrThrow({ where: { id } });
  await prisma.m16AuditPlan.update({ where: { id }, data: { status: result.status as never, ...result.patch } });
  await logAudit("PLAN", id, actor, `${result.action} (${before.status} → ${result.status})`, result.reason);
  revalidateM16([`/modules/M16/plan/${id}`]);
  return result;
}

export async function submitAuditPlan(id: string): Promise<TxResult> {
  const actor = await getActor();
  const p = await prisma.m16AuditPlan.findUniqueOrThrow({ where: { id } });
  return applyPlanTransition(id, txSubmitPlan(p), actor);
}

export async function reviewAuditPlan(id: string, input: { decision: "return" | "approve"; reason?: string }): Promise<TxResult> {
  const actor = await getActor();
  const p = await prisma.m16AuditPlan.findUniqueOrThrow({ where: { id } });
  return applyPlanTransition(id, txReviewPlan(p, actor, input), actor);
}

export async function approveAuditPlan(id: string, input: { decision: "reject" | "approve"; reason?: string }): Promise<TxResult> {
  const actor = await getActor();
  const p = await prisma.m16AuditPlan.findUniqueOrThrow({ where: { id } });
  return applyPlanTransition(id, txApprovePlan(p, actor, input), actor);
}

// ---------- AuditProgram ----------

// Increment 13: đoàn đánh giá là nhân sự thật của M03 (để validate năng lực — quy tắc 1);
// teamLeadName/teamMembers vẫn được ghi làm bản chụp tên tại thời điểm lập chương trình.
export async function createAuditProgram(input: {
  planId: string;
  department: string;
  field: string;
  auditDate: string;
  teamLeadEmployeeId: string;
  memberEmployeeIds: string[];
}) {
  const actor = await getActor();
  const plan = await prisma.m16AuditPlan.findUniqueOrThrow({ where: { id: input.planId } });
  if (plan.status !== "APPROVED") return { ok: false, code: "PLAN_NOT_APPROVED", message: "Chỉ kế hoạch Đã phê duyệt mới lập chương trình được." } as const;
  if (!input.teamLeadEmployeeId) return { ok: false, code: "LEAD_REQUIRED", message: "Bắt buộc chọn trưởng đoàn từ danh sách nhân sự (M03)." } as const;

  const lead = await prisma.m03Employee.findUniqueOrThrow({ where: { id: input.teamLeadEmployeeId } });
  const memberIds = [...new Set(input.memberEmployeeIds.filter((id) => id && id !== input.teamLeadEmployeeId))];
  const members = await prisma.m03Employee.findMany({ where: { id: { in: memberIds } } });

  const yearNow = new Date().getFullYear();
  const created = await prisma.$transaction(async (tx) => {
    const p = await tx.m16AuditProgram.create({
      data: {
        code: "PENDING",
        planId: input.planId,
        department: input.department,
        field: input.field,
        auditDate: new Date(input.auditDate),
        teamLeadEmployeeId: lead.id,
        teamLeadName: lead.fullName,
        teamMembers: members.map((m) => m.fullName),
      },
    });
    await tx.m16ProgramMember.createMany({
      data: [lead.id, ...members.map((m) => m.id)].map((employeeId) => ({ programId: p.id, employeeId })),
    });
    const code = `CTDG-${yearNow}-${String(p.seq).padStart(4, "0")}`;
    return tx.m16AuditProgram.update({ where: { id: p.id }, data: { code } });
  });
  await logAudit("PROGRAM", created.id, actor, `Lập chương trình đánh giá — trưởng đoàn ${lead.fullName}, ${members.length} thành viên`, null);
  revalidateM16();
  return created;
}

// Nạp thành viên đoàn kèm năng lực đã công nhận — đúng dữ liệu rule cần, không hơn.
export async function loadProgramMembersForRules(programId: string): Promise<ProgramMemberForRules[]> {
  const program = await prisma.m16AuditProgram.findUniqueOrThrow({
    where: { id: programId },
    include: { members: { include: { employee: { include: { m16Qualifications: true } } } } },
  });
  return program.members.map((m) => ({
    employeeId: m.employeeId,
    fullName: m.employee.fullName,
    isLead: m.employeeId === program.teamLeadEmployeeId,
    quals: m.employee.m16Qualifications.map((q) => q.qualType as string),
  }));
}

export async function confirmAuditProgram(id: string): Promise<TxResult> {
  const actor = await getActor();
  const p = await prisma.m16AuditProgram.findUniqueOrThrow({ where: { id } });
  const members = await loadProgramMembersForRules(id);
  const result = txConfirmProgram(
    { status: p.status, auditDate: p.auditDate, hasLeadEmployee: Boolean(p.teamLeadEmployeeId), members },
    actor
  );
  if (!result.ok) return result;
  await prisma.m16AuditProgram.update({ where: { id }, data: { status: "CONFIRMED", ...result.patch } });
  await logAudit("PROGRAM", id, actor, "Xác nhận chương trình đánh giá (DRAFT → CONFIRMED) — đoàn đủ năng lực theo quy tắc 1", null);
  revalidateM16([`/modules/M16/program/${id}`]);
  return result;
}

// ---------- Increment 13: sổ năng lực đánh giá viên (quy tắc 1) ----------

export async function recognizeQualification(input: {
  employeeId: string;
  qualType: M16QualTypeLite;
  trainingRecordId?: string;
  note?: string;
}): Promise<TxResult> {
  const actor = await getActor();
  const evidence = input.trainingRecordId
    ? await prisma.m03TrainingRecord.findUnique({ where: { id: input.trainingRecordId }, select: { employeeId: true, result: true, status: true } })
    : null;

  const result = txRecognizeQualification(actor, {
    employeeId: input.employeeId,
    qualType: input.qualType,
    evidence: evidence ? { employeeId: evidence.employeeId, result: evidence.result, status: evidence.status } : null,
    note: input.note,
  });
  if (!result.ok) return result;

  const qual = await prisma.m16AuditorQualification.upsert({
    where: { employeeId_qualType: { employeeId: input.employeeId, qualType: input.qualType } },
    create: {
      employeeId: input.employeeId,
      qualType: input.qualType,
      trainingRecordId: input.trainingRecordId ?? null,
      note: input.note ?? null,
      recognizedById: actor.id,
    },
    update: { trainingRecordId: input.trainingRecordId ?? null, note: input.note ?? null, recognizedById: actor.id, recognizedAt: new Date() },
  });
  await logAudit("PROGRAM", qual.id, actor, result.action, result.reason);
  revalidateM16(["/modules/M16/auditors"]);
  return result;
}

export async function revokeQualification(id: string): Promise<TxResult> {
  const actor = await getActor();
  if (actor.m16Role !== "QLCL") return { ok: false, code: "FORBIDDEN", message: "Chỉ QLCL được thu hồi công nhận năng lực đánh giá viên." };
  const qual = await prisma.m16AuditorQualification.findUniqueOrThrow({ where: { id }, include: { employee: true } });
  await prisma.m16AuditorQualification.delete({ where: { id } });
  await logAudit("PROGRAM", id, actor, `Thu hồi công nhận năng lực ${qual.qualType} của ${qual.employee.fullName}`, null);
  revalidateM16(["/modules/M16/auditors"]);
  return { ok: true, status: "REVOKED", action: "Thu hồi công nhận năng lực", reason: null, patch: {} };
}

// ---------- AuditFinding ----------

export async function createAuditFinding(input: {
  programId: string;
  clauseRef: string;
  department: string;
  description: string;
  conformity: M16Conformity;
  evidence?: string;
  auditorSignature: string;
  capaRef?: string;
}) {
  const actor = await getActor();
  if (!canCreateFinding(actor)) return { ok: false, code: "FORBIDDEN", message: "Chỉ Đánh giá viên/Trưởng đoàn được ghi phát hiện." } as const;

  const yearNow = new Date().getFullYear();
  const created = await prisma.$transaction(async (tx) => {
    const f = await tx.m16AuditFinding.create({ data: { code: "PENDING", ...input } });
    const code = `PH-${yearNow}-${String(f.seq).padStart(4, "0")}`;
    return tx.m16AuditFinding.update({ where: { id: f.id }, data: { code } });
  });
  await logAudit("PROGRAM", input.programId, actor, `Ghi phát hiện ${created.code} (${input.conformity})`, null);
  revalidateM16([`/modules/M16/program/${input.programId}`]);
  return created;
}

// ---------- AuditReport ----------

export async function createAuditReport(input: {
  programId: string;
  openingMeetingNotes?: string;
  closingMeetingDate: string;
  closingConclusion: string;
}) {
  const actor = await getActor();
  if (!canCreateReport(actor)) return { ok: false, code: "FORBIDDEN", message: "Chỉ Trưởng đoàn đánh giá được tạo báo cáo tổng hợp." } as const;

  const submittedAt = new Date();
  const closingMeetingDate = new Date(input.closingMeetingDate);
  const isLate = computeIsLate(closingMeetingDate, submittedAt);

  const yearNow = new Date().getFullYear();
  const created = await prisma.$transaction(async (tx) => {
    const r = await tx.m16AuditReport.create({
      data: {
        code: "PENDING",
        programId: input.programId,
        openingMeetingNotes: input.openingMeetingNotes,
        closingMeetingDate,
        closingConclusion: input.closingConclusion,
        submittedAt,
        isLate,
        createdById: actor.id,
      },
    });
    const code = `BCDG-${yearNow}-${String(r.seq).padStart(4, "0")}`;
    return tx.m16AuditReport.update({ where: { id: r.id }, data: { code } });
  });
  await logAudit("PROGRAM", input.programId, actor, `Đệ trình báo cáo tổng hợp ${created.code}${isLate ? " — TRỄ HẠN" : ""}`, null);
  revalidateM16([`/modules/M16/program/${input.programId}`]);
  return created;
}

// ---------- Increment 13: quy tắc 6 — Trưởng bộ phận nhận kết quả → đề xuất CAPA qua M13 ----------

export async function acknowledgeFinding(findingId: string): Promise<TxResult> {
  const actor = await getActor();
  const f = await prisma.m16AuditFinding.findUniqueOrThrow({ where: { id: findingId } });
  const result = txAcknowledgeFinding({ conformity: f.conformity, acknowledgedById: f.acknowledgedById, ncwId: f.ncwId }, actor);
  if (!result.ok) return result;

  await prisma.m16AuditFinding.update({ where: { id: findingId }, data: { acknowledgedById: actor.id, acknowledgedAt: new Date() } });
  await logAudit("PROGRAM", f.programId, actor, `${result.action} — phát hiện ${f.code}`, null);
  revalidateM16([`/modules/M16/program/${f.programId}`]);
  return result;
}

// Tạo hồ sơ KPH THẬT bên M13 bằng chính action của M13 (không ghi thẳng vào bảng M13) — hồ sơ đó
// đi tiếp đúng luồng M13: đánh giá mức độ → phương án → thẩm xét → đóng.
export async function proposeCorrectiveAction(findingId: string, input: { rootCause: string }): Promise<TxResult> {
  const actor = await getActor();
  const f = await prisma.m16AuditFinding.findUniqueOrThrow({ where: { id: findingId } });
  const result = txProposeCorrectiveAction({ conformity: f.conformity, acknowledgedById: f.acknowledgedById, ncwId: f.ncwId }, actor, input);
  if (!result.ok) return result;

  const ncw = await createNcw({
    sourceType: "DANH_GIA_NOI_BO",
    sourceRef: `${f.code} (M16 — ${f.clauseRef})`,
    description: `[Đánh giá nội bộ ${f.code}] ${f.description}\nNguyên nhân do Trưởng bộ phận phân tích: ${input.rootCause}`,
    emergencyStop: false,
  });
  await prisma.m16AuditFinding.update({ where: { id: findingId }, data: { ncwId: ncw.id, rootCauseProposal: input.rootCause } });
  await logAudit("PROGRAM", f.programId, actor, `${result.action} — phát hiện ${f.code} → hồ sơ ${ncw.code} (M13)`, input.rootCause);
  revalidateM16([`/modules/M16/program/${f.programId}`]);
  return result;
}

// ---------- Increment 13: quy tắc 3 — ý kiến bảo lưu trên báo cáo ----------

export async function recordReportDissent(reportId: string, input: { opinionBy: string; opinion: string }): Promise<TxResult> {
  const actor = await getActor();
  const report = await prisma.m16AuditReport.findUniqueOrThrow({ where: { id: reportId } });
  const result = txRecordDissent(actor, input);
  if (!result.ok) return result;

  await prisma.m16ReportDissent.create({
    data: { reportId, opinionBy: input.opinionBy, opinion: input.opinion, recordedById: actor.id },
  });
  await logAudit("PROGRAM", report.programId, actor, `${result.action} trên báo cáo ${report.code} — kết luận trưởng đoàn giữ nguyên`, input.opinion);
  revalidateM16([`/modules/M16/program/${report.programId}`]);
  return result;
}

// ---------- Increment 13: quy tắc 7 — LĐP thẩm tra, đóng chương trình / đánh giá bổ sung ----------

export async function closeAuditProgram(id: string, input: { note?: string } = {}): Promise<TxResult> {
  const actor = await getActor();
  const p = await prisma.m16AuditProgram.findUniqueOrThrow({
    where: { id },
    include: { findings: { include: { ncw: true } }, _count: { select: { reports: true } } },
  });
  const result = txCloseProgram(
    {
      status: p.status,
      reportCount: p._count.reports,
      findings: p.findings.map((f) => ({ code: f.code, conformity: f.conformity, ncwStatus: f.ncw?.status ?? null })),
    },
    actor,
    input
  );
  if (!result.ok) return result;

  await prisma.m16AuditProgram.update({
    where: { id },
    data: { status: "CLOSED", closedAt: new Date(), closedById: actor.id, closureNote: input.note ?? null },
  });
  await logAudit("PROGRAM", id, actor, `${result.action} (CONFIRMED → CLOSED)`, result.reason);

  // Hook mềm sang M26 (quy tắc 6 DacTa M26 / ETV.P26 mục 5.2.1): mỗi phát hiện KHÔNG PHÙ HỢP của
  // chương trình đánh giá là tri thức phải giữ lại. Bỏ qua phát hiện đã chuyển thành hồ sơ KPH bên
  // M13 — bài học cho nhánh đó do hook của M13 sinh khi đóng KPH, tránh hai phiếu cho một sự việc.
  // Cảnh báo mềm — không chặn việc đóng chương trình của M16.
  for (const f of p.findings) {
    if (f.conformity !== "KHONG_PHU_HOP" || f.ncwId) continue;
    await ensureLessonFromSource({
      sourceType: "DANH_GIA",
      sourceRef: f.code,
      title: `Bài học từ phát hiện đánh giá ${f.code}`,
      context: `${f.description} (điều khoản ${f.clauseRef}, bộ phận ${f.department}).`,
      createdById: actor.id,
      rootCauseRef: f.rootCauseProposal ?? null,
    });
  }

  revalidateM16([`/modules/M16/program/${id}`]);
  return result;
}

export async function proposeFollowUpAudit(programId: string, input: { reason: string }): Promise<TxResult> {
  const actor = await getActor();
  const program = await prisma.m16AuditProgram.findUniqueOrThrow({ where: { id: programId }, include: { plan: true } });
  const result = txProposeFollowUpAudit(actor, input);
  if (!result.ok) return result;

  const yearNow = new Date().getFullYear();
  const created = await prisma.$transaction(async (tx) => {
    const plan = await tx.m16AuditPlan.create({
      data: {
        code: "PENDING",
        type: program.plan.type,
        year: yearNow,
        scope: [program.department],
        auditors: [],
        isAdHoc: true,
        followUpOfProgramId: programId,
        createdById: actor.id,
      },
    });
    const code = `KHDG-${yearNow}-${String(plan.seq).padStart(4, "0")}`;
    return tx.m16AuditPlan.update({ where: { id: plan.id }, data: { code } });
  });
  await logAudit("PLAN", created.id, actor, `Đề xuất đánh giá bổ sung sau chương trình ${program.code}`, input.reason);
  await logAudit("PROGRAM", programId, actor, `${result.action} — kế hoạch đột xuất ${created.code}`, input.reason);
  revalidateM16([`/modules/M16/program/${programId}`, `/modules/M16/plan/${created.id}`]);
  return result;
}

export async function listApprovedPlans() {
  await getActor();
  return prisma.m16AuditPlan.findMany({ where: { status: "APPROVED" }, orderBy: { createdAt: "desc" } });
}
