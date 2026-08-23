"use server";

// M14 — Server Actions. Logic quyết định nằm hoàn toàn ở "@/lib/m14/rules" — action này chỉ gọi
// rule rồi ghi DB (mirror src/lib/m13/actions.ts). Endpoint tương ứng trong 02_API/API.md.
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import type { M14DocType, M14KnowledgeCategory } from "@/generated/prisma/enums";
import { getActor } from "./actor";
import {
  assertNotAiActor,
  canApplySuggestion,
  txApprove,
  txDiscard,
  txPublish,
  txRetire,
  txReview,
  txSubmitReview,
  validateCode,
  type M14ActorUser,
  type TxResult,
} from "./rules";

async function logAudit(itemType: "DOCUMENT" | "SUGGESTION", itemId: string, actor: M14ActorUser, action: string, reason: string | null) {
  await prisma.m14AuditEntry.create({
    data: { itemType, itemId, actorId: actor.id, role: actor.m14Role ?? "—", action, reason },
  });
}

function revalidateM14(paths: string[] = []) {
  revalidatePath("/modules/M14");
  for (const p of paths) revalidatePath(p);
}

// ---------- Văn bản ----------

export async function createDocument(input: {
  code: string;
  title: string;
  docType: M14DocType;
  owner: string;
  department: string;
  processCode?: string;
  revision?: string;
  effectiveDate?: string;
  isoClause?: string;
  legalBasis?: string;
  keywords?: string;
  knowledgeCategory?: M14KnowledgeCategory;
  permissionGroup?: string;
  retention?: string;
  sourceOrg?: string;
  supersedesCode?: string;
}) {
  const actor = await getActor();
  const aiBlocked = assertNotAiActor(actor);
  if (aiBlocked) throw new Error(aiBlocked.ok ? "" : aiBlocked.message);

  const codeCheck = validateCode(input.code.trim(), input.docType);
  if (!codeCheck.ok) throw new Error(codeCheck.message);

  const existing = await prisma.m14Document.findUnique({ where: { code: input.code.trim() } });
  if (existing) throw new Error(`Mã "${input.code.trim()}" đã tồn tại — mã văn bản phải duy nhất toàn hệ thống (quy tắc 1 ETV.P14).`);

  const superseded = input.supersedesCode
    ? await prisma.m14Document.findUnique({ where: { code: input.supersedesCode.trim() } })
    : null;
  if (input.supersedesCode && !superseded) throw new Error(`Không tìm thấy văn bản bị thay thế có mã "${input.supersedesCode}".`);

  const split = (s?: string) => (s ? s.split(";").map((x) => x.trim()).filter(Boolean) : []);

  const created = await prisma.m14Document.create({
    data: {
      code: input.code.trim(),
      title: input.title,
      docType: input.docType,
      owner: input.owner,
      department: input.department,
      processCode: input.processCode || null,
      revision: input.revision || null,
      effectiveDate: input.effectiveDate ? new Date(input.effectiveDate) : null,
      isoClause: split(input.isoClause),
      legalBasis: split(input.legalBasis),
      keywords: split(input.keywords),
      knowledgeCategory: input.knowledgeCategory ?? null,
      permissionGroup: input.permissionGroup || null,
      retention: input.retention || null,
      sourceOrg: input.sourceOrg || null,
      supersedesId: superseded?.id ?? null, // quy tắc 6: cặp nghịch đảo do Prisma tự nối 2 chiều
      createdById: actor.id,
    },
  });

  await logAudit(
    "DOCUMENT",
    created.id,
    actor,
    superseded ? `Soạn thảo văn bản mới (thay thế ${superseded.code})` : "Soạn thảo văn bản mới",
    null
  );
  revalidateM14();
  return created;
}

async function applyTransition(id: string, result: TxResult, actor: M14ActorUser) {
  if (!result.ok) return result;
  const before = await prisma.m14Document.findUniqueOrThrow({ where: { id } });
  const data: Record<string, unknown> = { status: result.status, ...result.patch };
  if (result.status === "CHO_PHE_DUYET" || result.status === "KHONG_SOAT_XET") data.reviewedById = actor.id;
  if (result.status === "DA_PHE_DUYET" || result.status === "KHONG_PHE_DUYET") data.approvedById = actor.id;
  if (result.patch.distributionNote) {
    data.publishedById = actor.id;
    data.publishedAt = new Date();
  }
  await prisma.m14Document.update({ where: { id }, data: data as never });
  const arrow = before.status === result.status ? "" : ` (${before.status} → ${result.status})`;
  await logAudit("DOCUMENT", id, actor, `${result.action}${arrow}`, result.reason);
  revalidateM14([`/modules/M14/doc/${id}`]);
  return result;
}

export async function submitReview(id: string): Promise<TxResult> {
  const actor = await getActor();
  const d = await prisma.m14Document.findUniqueOrThrow({ where: { id } });
  return applyTransition(id, txSubmitReview(d, actor), actor);
}

export async function reviewDocument(id: string, input: { passed: boolean; reason?: string }): Promise<TxResult> {
  const actor = await getActor();
  const d = await prisma.m14Document.findUniqueOrThrow({ where: { id } });
  return applyTransition(id, txReview(d, actor, input), actor);
}

export async function approveDocument(id: string, input: { passed: boolean; reason?: string }): Promise<TxResult> {
  const actor = await getActor();
  const d = await prisma.m14Document.findUniqueOrThrow({ where: { id } });
  return applyTransition(id, txApprove(d, actor, input), actor);
}

export async function publishDocument(id: string, distributionNote: string): Promise<TxResult> {
  const actor = await getActor();
  const d = await prisma.m14Document.findUniqueOrThrow({ where: { id } });
  return applyTransition(id, txPublish(d, actor, distributionNote), actor);
}

export async function retireDocument(id: string, reason: string): Promise<TxResult> {
  const actor = await getActor();
  const d = await prisma.m14Document.findUniqueOrThrow({ where: { id } });
  return applyTransition(id, txRetire(d, actor, reason), actor);
}

export async function discardDocument(id: string, reason: string): Promise<TxResult> {
  const actor = await getActor();
  const d = await prisma.m14Document.findUniqueOrThrow({ where: { id } });
  return applyTransition(id, txDiscard(d, actor, reason), actor);
}

// ---------- Gợi ý AI (ETV.P14 §6.9 — AI chỉ gợi ý, người có thẩm quyền mới áp dụng) ----------

export async function createAiSuggestion(documentId: string, input: { field: string; suggestedValue: string; rationale?: string }) {
  const actor = await getActor();
  if (actor.m14Role !== "AI_AGENT") {
    return { ok: false as const, code: "PERMISSION_DENIED", message: "Chỉ tài khoản AI Agent (← M29) mới tạo gợi ý tự động." };
  }
  const s = await prisma.m14AiSuggestion.create({
    data: { documentId, field: input.field, suggestedValue: input.suggestedValue, rationale: input.rationale, createdById: actor.id },
  });
  await logAudit("SUGGESTION", s.id, actor, `AI gợi ý trường "${input.field}" — chờ người có thẩm quyền áp dụng`, input.rationale ?? null);
  revalidateM14([`/modules/M14/doc/${documentId}`]);
  return { ok: true as const };
}

export async function applyAiSuggestion(suggestionId: string): Promise<TxResult> {
  const actor = await getActor();
  if (!canApplySuggestion(actor)) {
    return { ok: false, code: "PERMISSION_DENIED", message: "Vai trò hiện tại không được áp dụng gợi ý của AI vào văn bản." };
  }
  const s = await prisma.m14AiSuggestion.findUniqueOrThrow({ where: { id: suggestionId } });
  if (s.appliedAt) return { ok: false, code: "ALREADY_APPLIED", message: "Gợi ý này đã được áp dụng rồi." };

  const value = s.suggestedValue.split(";").map((x) => x.trim()).filter(Boolean);
  const patch: Record<string, unknown> =
    s.field === "isoClause"
      ? { isoClause: value }
      : s.field === "legalBasis"
        ? { legalBasis: value }
        : s.field === "aiTags"
          ? { aiTags: value }
          : s.field === "keywords"
            ? { keywords: value }
            : {};
  if (Object.keys(patch).length === 0) {
    return { ok: false, code: "UNSUPPORTED_FIELD", message: `Chưa hỗ trợ áp dụng tự động cho trường "${s.field}".` };
  }

  await prisma.$transaction([
    prisma.m14Document.update({ where: { id: s.documentId }, data: patch as never }),
    prisma.m14AiSuggestion.update({ where: { id: suggestionId }, data: { appliedById: actor.id, appliedAt: new Date() } }),
  ]);
  await logAudit("DOCUMENT", s.documentId, actor, `Áp dụng gợi ý AI cho trường "${s.field}"`, s.suggestedValue);
  revalidateM14([`/modules/M14/doc/${s.documentId}`]);
  return { ok: true, status: "", action: "Áp dụng gợi ý AI", reason: null, patch: {} };
}
