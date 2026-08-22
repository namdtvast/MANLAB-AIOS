"use server";

// M10 — Server Actions, port từ
// 05_MODULE_LIBRARY/M10_DamBaoKQ/08_Source/api/store.mjs (thao tác dữ liệu +
// audit trail) sang Prisma/Postgres. Logic quyết định chuyển trạng thái nằm
// hoàn toàn ở "@/lib/m10/rules" — action này chỉ gọi rule rồi ghi DB, không
// tự quyết định gì thêm (giữ đúng nguyên tắc rules.mjs là nguồn xác thực).
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import type { M10PubStatus, M10RecordType } from "@/generated/prisma/enums";
import { getActor } from "./actor";
import {
  txApprove,
  txPublish,
  txReview,
  txSubmit,
  type AssessmentForRules,
  type M10ActorUser,
  type TxResult,
} from "./rules";

function toRulesShape(a: {
  recordType: M10RecordType;
  status: string;
  result: string | null;
  capaId: string | null;
  expiresAt: Date | null;
  planId: string | null;
  procedureId: string | null;
  criteriaId: string | null;
  personnelId: string | null;
  rawData: number;
  evidence: number;
  createdById: string;
  reviewedById: string | null;
}): AssessmentForRules {
  return {
    ...a,
    status: a.status as AssessmentForRules["status"],
    result: a.result as AssessmentForRules["result"],
  };
}

async function logAudit(assessmentId: string, actor: M10ActorUser, action: string, reason: string | null) {
  await prisma.m10AuditEntry.create({
    data: {
      assessmentId,
      actorId: actor.id,
      role: actor.m10Role ?? "—",
      action,
      reason,
    },
  });
}

async function applyTransition(id: string, result: TxResult, actor: M10ActorUser) {
  if (!result.ok) return result;
  const before = await prisma.m10Assessment.findUniqueOrThrow({ where: { id } });
  await prisma.m10Assessment.update({
    where: { id },
    data: { status: result.status, ...result.patch },
  });
  await logAudit(id, actor, `${result.action} (${before.status} → ${result.status})`, result.reason);
  revalidatePath(`/modules/M10/${id}`);
  revalidatePath("/modules/M10");
  return result;
}

export async function submitAssessment(id: string): Promise<TxResult> {
  const actor = await getActor();
  const a = await prisma.m10Assessment.findUniqueOrThrow({ where: { id } });
  return applyTransition(id, txSubmit(toRulesShape(a)), actor);
}

export async function reviewAssessment(
  id: string,
  input: { decision: "return" | "approve"; reason?: string }
): Promise<TxResult> {
  const actor = await getActor();
  const a = await prisma.m10Assessment.findUniqueOrThrow({ where: { id } });
  return applyTransition(id, txReview(toRulesShape(a), actor, input), actor);
}

export async function approveAssessment(
  id: string,
  input: { decision: "reject" | "approve"; reason?: string }
): Promise<TxResult> {
  const actor = await getActor();
  const a = await prisma.m10Assessment.findUniqueOrThrow({ where: { id } });
  return applyTransition(id, txApprove(toRulesShape(a), actor, input), actor);
}

export async function publishAssessment(
  id: string,
  input: { pubStatus: M10PubStatus; expiresAt?: string; sourceCertId?: string }
): Promise<TxResult> {
  const actor = await getActor();
  const a = await prisma.m10Assessment.findUniqueOrThrow({ where: { id } });
  return applyTransition(
    id,
    txPublish(toRulesShape(a), actor, {
      pubStatus: input.pubStatus,
      expiresAt: input.expiresAt ? new Date(input.expiresAt) : null,
      sourceCertId: input.sourceCertId ?? null,
    }),
    actor
  );
}

export async function linkCapa(id: string): Promise<void> {
  const actor = await getActor();
  const a = await prisma.m10Assessment.findUniqueOrThrow({ where: { id } });
  const capaId = "CAPA-" + a.code.slice(-4);
  await prisma.m10Assessment.update({ where: { id }, data: { capaId } });
  await logAudit(id, actor, `Liên kết KPH-CAPA ${capaId} (→ M13)`, null);
  revalidatePath(`/modules/M10/${id}`);
}

export async function newVersion(id: string): Promise<void> {
  const actor = await getActor();
  const a = await prisma.m10Assessment.findUniqueOrThrow({ where: { id } });
  const version = a.version + 1;
  await prisma.m10Assessment.update({
    where: { id },
    data: { version, status: "DRAFT", reviewedById: null, approvedById: null },
  });
  await logAudit(id, actor, `Tạo phiên bản v${version} (thay bản đã phê duyệt)`, null);
  revalidatePath(`/modules/M10/${id}`);
}

export async function createAssessment(input: {
  recordType: M10RecordType;
  object: string;
  planId?: string;
  procedureId?: string;
  personnelId?: string;
  criteriaId?: string;
  rawData?: number;
  evidence?: number;
}) {
  const actor = await getActor();
  const year = new Date().getFullYear();
  const created = await prisma.$transaction(async (tx) => {
    const a = await tx.m10Assessment.create({
      data: {
        code: "PENDING", // placeholder, cập nhật ngay dưới đây khi đã biết seq
        recordType: input.recordType,
        object: input.object,
        planId: input.planId ?? null,
        procedureId: input.procedureId ?? null,
        personnelId: input.personnelId ?? null,
        criteriaId: input.criteriaId ?? null,
        rawData: input.rawData ?? 0,
        evidence: input.evidence ?? 0,
        indicators: {},
        createdById: actor.id,
      },
    });
    const code = `P10-${year}-${String(a.seq).padStart(4, "0")}`;
    return tx.m10Assessment.update({ where: { id: a.id }, data: { code } });
  });
  await logAudit(created.id, actor, "Tạo hồ sơ", null);
  revalidatePath("/modules/M10");
  return created;
}

export async function editAssessment(
  id: string,
  input: Partial<{
    object: string;
    result: string;
    indicators: Record<string, number>;
    rawData: number;
    evidence: number;
    planId: string;
    procedureId: string;
    personnelId: string;
    criteriaId: string;
  }>
) {
  await getActor(); // chỉ để bắt buộc phải đăng nhập; chưa gate theo role cho edit (giống bản gốc)
  const updated = await prisma.m10Assessment.update({
    where: { id },
    data: input as Parameters<typeof prisma.m10Assessment.update>[0]["data"],
  });
  revalidatePath(`/modules/M10/${id}`);
  return updated;
}
