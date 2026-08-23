"use server";

// M26 — Server Actions. Mọi quyết định nghiệp vụ nằm ở "@/lib/m26/rules"; action chỉ gọi rule,
// ghi DB và ghi nhật ký (mirror src/lib/m25/actions.ts).
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getActor } from "./actor";
import {
  assertEditable,
  isDueForReview,
  needsAccessLog,
  txAnalyzeLesson,
  txApprove,
  txApproveLesson,
  txCancel,
  txCancelLesson,
  txCancelSharing,
  txCompleteSharing,
  txCreateNewVersion,
  txFulfillNeed,
  txMarkReviewed,
  txReview,
  txRetire,
  txSetAiIndex,
  txStartNeed,
  txSubmitForReview,
  txSubmitLesson,
  txWaiveNeed,
  validateItemInput,
  validateSharingItems,
  TRANSFER_METHODS,
  type ItemForRules,
  type M26ActorUser,
} from "./rules";
import type {
  M26Category,
  M26Confidentiality,
  M26Criticality,
  M26KnowledgeForm,
  M26LessonSource,
  M26NeedMethod,
  M26NeedTrigger,
  M26Origin,
  M26ReviewCycle,
  M26SharingForm,
} from "@/generated/prisma/enums";

type ItemType = "ITEM" | "LESSON" | "NEED" | "SHARING";
type Fail = { ok: false; code: string; message: string };
const fail = (code: string, message: string): Fail => ({ ok: false, code, message });

async function logAudit(
  itemType: ItemType,
  itemId: string,
  actor: M26ActorUser,
  action: string,
  opts: { before?: string | null; after?: string | null; reason?: string | null } = {},
) {
  await prisma.m26AuditEntry.create({
    data: {
      itemType,
      itemId,
      actorId: actor.id,
      role: actor.m26Role ?? "—",
      action,
      before: opts.before ?? null,
      after: opts.after ?? null,
      reason: opts.reason ?? null,
    },
  });
}

function revalidateM26(paths: string[] = []) {
  revalidatePath("/modules/M26");
  revalidatePath("/modules/M26/lessons");
  revalidatePath("/modules/M26/needs");
  revalidatePath("/modules/M26/sharing");
  revalidatePath("/modules/M26/knowledge-risk");
  for (const p of paths) revalidatePath(p);
}

const yearNow = () => new Date().getFullYear();
const pad = (n: number) => String(n).padStart(4, "0");

// Nạp mục tri thức kèm các số đếm mà rules cần (số người giữ, liên kết rủi ro, nhu cầu chuyển giao).
async function loadItemForRules(id: string): Promise<ItemForRules & { id: string; code: string; version: number }> {
  const item = await prisma.m26KnowledgeItem.findUniqueOrThrow({
    where: { id },
    include: {
      _count: { select: { holders: true, riskLinks: true } },
      needs: { select: { method: true, status: true } },
    },
  });
  const transferNeedCount = item.needs.filter(
    (n) => (TRANSFER_METHODS as readonly string[]).includes(n.method) && n.status !== "KHONG_THUC_HIEN",
  ).length;
  return {
    id: item.id,
    code: item.code,
    version: item.version,
    status: item.status,
    knowledgeForm: item.knowledgeForm,
    criticality: item.criticality,
    confidentiality: item.confidentiality,
    sourceRef: item.sourceRef,
    docId: item.docId,
    summary: item.summary,
    createdById: item.createdById,
    ownerId: item.ownerId,
    holderCount: item._count.holders,
    riskLinkCount: item._count.riskLinks,
    transferNeedCount,
    aiIndexed: item.aiIndexed,
  };
}

// ---------- Mục tri thức ----------

export interface ItemFormInput {
  title: string;
  knowledgeForm: M26KnowledgeForm;
  category: M26Category;
  origin: M26Origin;
  summary: string;
  sourceRef?: string;
  docId?: string;
  ownerId: string;
  criticality: M26Criticality;
  confidentiality: M26Confidentiality;
  appliesTo: string[];
  reviewCycle: M26ReviewCycle;
  holderIds: string[];
}

export async function createItem(input: ItemFormInput) {
  const actor = await getActor();
  if (actor.m26Role !== "QLCL" && actor.m26Role !== "TP")
    return fail("FORBIDDEN", "Chỉ QLCL hoặc Trưởng phòng được lập mục tri thức (ETV.P26 mục 5.1.7).");

  const invalid = validateItemInput({
    title: input.title,
    knowledgeForm: input.knowledgeForm,
    summary: input.summary,
    sourceRef: input.sourceRef,
    docId: input.docId || null,
    holderCount: input.holderIds.length,
  });
  if (invalid) return fail("INVALID", invalid);

  const created = await prisma.$transaction(async (tx) => {
    const item = await tx.m26KnowledgeItem.create({
      data: {
        code: "PENDING",
        title: input.title.trim(),
        knowledgeForm: input.knowledgeForm,
        category: input.category,
        origin: input.origin,
        summary: input.summary.trim(),
        sourceRef: input.sourceRef?.trim() || null,
        docId: input.docId || null,
        ownerId: input.ownerId,
        criticality: input.criticality,
        confidentiality: input.confidentiality,
        appliesTo: input.appliesTo.filter((s) => s.trim()),
        reviewCycle: input.reviewCycle,
        createdById: actor.id,
      },
    });
    const withCode = await tx.m26KnowledgeItem.update({
      where: { id: item.id },
      data: { code: `TT-${yearNow()}-${pad(item.seq)}` },
    });
    for (const userId of input.holderIds) {
      await tx.m26KnowledgeHolder.create({ data: { itemId: withCode.id, userId } });
    }
    return withCode;
  });

  await logAudit("ITEM", created.id, actor, "Lập mục tri thức", { after: "DRAFT" });
  revalidateM26();
  return { ok: true as const, id: created.id, code: created.code };
}

export async function updateItem(id: string, input: ItemFormInput) {
  const actor = await getActor();
  const item = await loadItemForRules(id);
  const locked = assertEditable(item.status);
  if (locked && !locked.ok) return fail(locked.code, locked.message);

  const invalid = validateItemInput({
    title: input.title,
    knowledgeForm: input.knowledgeForm,
    summary: input.summary,
    sourceRef: input.sourceRef,
    docId: input.docId || null,
    holderCount: input.holderIds.length,
  });
  if (invalid) return fail("INVALID", invalid);

  await prisma.$transaction(async (tx) => {
    await tx.m26KnowledgeItem.update({
      where: { id },
      data: {
        title: input.title.trim(),
        knowledgeForm: input.knowledgeForm,
        category: input.category,
        origin: input.origin,
        summary: input.summary.trim(),
        sourceRef: input.sourceRef?.trim() || null,
        docId: input.docId || null,
        ownerId: input.ownerId,
        criticality: input.criticality,
        confidentiality: input.confidentiality,
        appliesTo: input.appliesTo.filter((s) => s.trim()),
        reviewCycle: input.reviewCycle,
      },
    });
    await tx.m26KnowledgeHolder.deleteMany({ where: { itemId: id, userId: { notIn: input.holderIds } } });
    for (const userId of input.holderIds) {
      await tx.m26KnowledgeHolder.upsert({
        where: { itemId_userId: { itemId: id, userId } },
        create: { itemId: id, userId },
        update: {},
      });
    }
  });

  await logAudit("ITEM", id, actor, "Cập nhật nội dung mục tri thức");
  revalidateM26([`/modules/M26/item/${id}`]);
  return { ok: true as const };
}

export async function linkRisk(itemId: string, riskId: string) {
  const actor = await getActor();
  if (actor.m26Role !== "QLCL" && actor.m26Role !== "TP" && actor.m26Role !== "LDV")
    return fail("FORBIDDEN", "Chỉ QLCL/TP/LĐV được liên kết rủi ro mất tri thức.");
  const existing = await prisma.m26ItemRiskLink.findUnique({ where: { itemId_riskId: { itemId, riskId } } });
  if (existing) return fail("DUPLICATE", "Rủi ro này đã được liên kết với mục tri thức.");
  await prisma.m26ItemRiskLink.create({ data: { itemId, riskId } });
  const risk = await prisma.m01RiskItem.findUnique({ where: { id: riskId }, select: { code: true } });
  await logAudit("ITEM", itemId, actor, "Liên kết rủi ro mất tri thức bên M01", { after: risk?.code ?? riskId });
  revalidateM26([`/modules/M26/item/${itemId}`]);
  return { ok: true as const };
}

export async function unlinkRisk(itemId: string, riskId: string) {
  const actor = await getActor();
  if (actor.m26Role !== "QLCL" && actor.m26Role !== "TP" && actor.m26Role !== "LDV")
    return fail("FORBIDDEN", "Chỉ QLCL/TP/LĐV được gỡ liên kết rủi ro.");
  await prisma.m26ItemRiskLink.deleteMany({ where: { itemId, riskId } });
  await logAudit("ITEM", itemId, actor, "Gỡ liên kết rủi ro bên M01");
  revalidateM26([`/modules/M26/item/${itemId}`]);
  return { ok: true as const };
}

export async function submitItemForReview(id: string) {
  const actor = await getActor();
  const item = await loadItemForRules(id);
  const r = txSubmitForReview(item);
  if (!r.ok) return fail(r.code, r.message);
  await prisma.m26KnowledgeItem.update({ where: { id }, data: { status: "PENDING_REVIEW", reason: null } });
  await logAudit("ITEM", id, actor, r.action, { before: item.status, after: r.status });
  revalidateM26([`/modules/M26/item/${id}`]);
  return { ok: true as const };
}

export async function reviewItem(id: string, pass: boolean, reason?: string) {
  const actor = await getActor();
  const item = await loadItemForRules(id);
  const r = txReview(item, actor, pass, reason);
  if (!r.ok) return fail(r.code, r.message);
  await prisma.m26KnowledgeItem.update({
    where: { id },
    data: { status: r.status as never, reason: r.reason, ...r.patch },
  });
  await logAudit("ITEM", id, actor, r.action, { before: item.status, after: r.status, reason: r.reason });
  revalidateM26([`/modules/M26/item/${id}`]);
  return { ok: true as const };
}

export async function approveItem(id: string, pass: boolean, reason?: string) {
  const actor = await getActor();
  const item = await loadItemForRules(id);
  const r = txApprove(item, actor, pass, reason);
  if (!r.ok) return fail(r.code, r.message);

  // Phiên bản mới được duyệt ⇒ bản cũ Hết hiệu lực + gỡ chỉ mục AI TRONG CÙNG GIAO DỊCH (quy tắc 5, 10).
  const current = await prisma.m26KnowledgeItem.findUniqueOrThrow({ where: { id }, select: { supersedesId: true } });
  await prisma.$transaction(async (tx) => {
    await tx.m26KnowledgeItem.update({
      where: { id },
      data: { status: r.status as never, reason: r.reason, ...r.patch },
    });
    if (pass && current.supersedesId) {
      await tx.m26KnowledgeItem.update({
        where: { id: current.supersedesId },
        data: {
          status: "RETIRED",
          retiredAt: new Date(),
          aiIndexed: false,
          reason: "Bị thay thế bởi phiên bản mới đã được phê duyệt (quy tắc 5 DacTa M26).",
        },
      });
    }
  });

  await logAudit("ITEM", id, actor, r.action, { before: item.status, after: r.status, reason: r.reason });
  if (pass && current.supersedesId) {
    await logAudit("ITEM", current.supersedesId, actor, "Hết hiệu lực do có phiên bản mới được phê duyệt", {
      before: "APPROVED",
      after: "RETIRED",
    });
  }
  revalidateM26([`/modules/M26/item/${id}`]);
  return { ok: true as const };
}

export async function markItemReviewed(id: string) {
  const actor = await getActor();
  const item = await loadItemForRules(id);
  const r = txMarkReviewed(item, actor);
  if (!r.ok) return fail(r.code, r.message);
  await prisma.m26KnowledgeItem.update({ where: { id }, data: r.patch as never });
  await logAudit("ITEM", id, actor, r.action, { after: new Date().toISOString().slice(0, 10) });
  revalidateM26([`/modules/M26/item/${id}`, "/modules/M26/review-due"]);
  return { ok: true as const };
}

export async function createNewVersion(id: string) {
  const actor = await getActor();
  const item = await loadItemForRules(id);
  const r = txCreateNewVersion(item, actor);
  if (!r.ok) return fail(r.code, r.message);

  const src = await prisma.m26KnowledgeItem.findUniqueOrThrow({ where: { id }, include: { holders: true } });
  const existingNext = await prisma.m26KnowledgeItem.findUnique({ where: { supersedesId: id }, select: { id: true } });
  if (existingNext) return fail("VERSION_EXISTS", "Mục này đã có phiên bản kế tiếp đang soạn — mở phiên bản đó để sửa.");

  const created = await prisma.$transaction(async (tx) => {
    const next = await tx.m26KnowledgeItem.create({
      data: {
        code: "PENDING",
        title: src.title,
        knowledgeForm: src.knowledgeForm,
        category: src.category,
        origin: src.origin,
        summary: src.summary,
        sourceRef: src.sourceRef,
        docId: src.docId,
        ownerId: src.ownerId,
        criticality: src.criticality,
        confidentiality: src.confidentiality,
        appliesTo: src.appliesTo,
        reviewCycle: src.reviewCycle,
        version: src.version + 1,
        supersedesId: src.id,
        createdById: actor.id,
      },
    });
    const withCode = await tx.m26KnowledgeItem.update({
      where: { id: next.id },
      data: { code: `TT-${yearNow()}-${pad(next.seq)}` },
    });
    for (const h of src.holders) {
      await tx.m26KnowledgeHolder.create({ data: { itemId: withCode.id, userId: h.userId, note: h.note } });
    }
    return withCode;
  });

  await logAudit("ITEM", created.id, actor, `Tạo phiên bản ${src.version + 1} từ ${src.code}`, { before: src.code, after: created.code });
  revalidateM26([`/modules/M26/item/${id}`, `/modules/M26/item/${created.id}`]);
  return { ok: true as const, id: created.id, code: created.code };
}

export async function retireItem(id: string, reason: string) {
  const actor = await getActor();
  const item = await loadItemForRules(id);
  const r = txRetire(item, actor, reason);
  if (!r.ok) return fail(r.code, r.message);
  // Chuyển trạng thái + gỡ chỉ mục AI cùng một lần ghi: không để tồn tại trạng thái trung gian.
  await prisma.m26KnowledgeItem.update({
    where: { id },
    data: { status: r.status as never, reason: r.reason, ...r.patch },
  });
  await logAudit("ITEM", id, actor, r.action, { before: item.status, after: r.status, reason: r.reason });
  if (item.aiIndexed) await logAudit("ITEM", id, actor, "Gỡ khỏi chỉ mục trợ lý AI (kèm hết hiệu lực)", { before: "true", after: "false" });
  revalidateM26([`/modules/M26/item/${id}`]);
  return { ok: true as const };
}

export async function cancelItem(id: string, reason: string) {
  const actor = await getActor();
  const item = await loadItemForRules(id);
  const r = txCancel(item, actor, reason);
  if (!r.ok) return fail(r.code, r.message);
  await prisma.m26KnowledgeItem.update({ where: { id }, data: { status: r.status as never, reason: r.reason } });
  await logAudit("ITEM", id, actor, r.action, { before: item.status, after: r.status, reason: r.reason });
  revalidateM26([`/modules/M26/item/${id}`]);
  return { ok: true as const };
}

export async function setAiIndex(id: string, enable: boolean) {
  const actor = await getActor();
  const item = await loadItemForRules(id);
  const r = txSetAiIndex(item, actor, enable);
  if (!r.ok) return fail(r.code, r.message);
  await prisma.m26KnowledgeItem.update({ where: { id }, data: r.patch as never });
  await logAudit("ITEM", id, actor, r.action, { before: String(item.aiIndexed), after: String(enable) });
  revalidateM26([`/modules/M26/item/${id}`]);
  return { ok: true as const };
}

// Lượt xem mục Hạn chế/Mật phải vào nhật ký (ISO/IEC 27001 — ETV.P26 mục 5.1.4).
export async function logItemAccess(id: string) {
  const actor = await getActor();
  const item = await prisma.m26KnowledgeItem.findUniqueOrThrow({
    where: { id },
    select: { confidentiality: true, code: true },
  });
  if (!needsAccessLog(item.confidentiality)) return { ok: true as const, logged: false };
  await logAudit("ITEM", id, actor, `Xem mục tri thức mức ${item.confidentiality === "MAT" ? "Mật" : "Hạn chế"}`);
  return { ok: true as const, logged: true };
}

// ---------- Bài học kinh nghiệm ----------

export interface LessonFormInput {
  title: string;
  sourceType: M26LessonSource;
  sourceRef: string;
  context: string;
  rootCauseRef?: string;
  lesson: string;
  recommendedAction: string;
  shareRequired: boolean;
  knowledgeItemId?: string;
}

export async function createLesson(input: LessonFormInput) {
  const actor = await getActor();
  if (!actor.m26Role) return fail("FORBIDDEN", "Cần vai trò M26 để gửi đề xuất bài học kinh nghiệm.");
  if (!input.title.trim() || !input.sourceRef.trim() || !input.context.trim() || !input.lesson.trim() || !input.recommendedAction.trim())
    return fail("INVALID", "Bắt buộc nhập: tên bài học, bản ghi gốc, bối cảnh, bài học rút ra và khuyến nghị.");

  const created = await prisma.$transaction(async (tx) => {
    const l = await tx.m26LessonLearned.create({
      data: {
        code: "PENDING",
        title: input.title.trim(),
        sourceType: input.sourceType,
        sourceRef: input.sourceRef.trim(),
        context: input.context.trim(),
        rootCauseRef: input.rootCauseRef?.trim() || null,
        lesson: input.lesson.trim(),
        recommendedAction: input.recommendedAction.trim(),
        shareRequired: input.shareRequired,
        knowledgeItemId: input.knowledgeItemId || null,
        createdById: actor.id,
      },
    });
    return tx.m26LessonLearned.update({ where: { id: l.id }, data: { code: `BH-${yearNow()}-${pad(l.seq)}` } });
  });

  await logAudit("LESSON", created.id, actor, "Lập phiếu bài học kinh nghiệm", { after: "MOI" });
  revalidateM26();
  return { ok: true as const, id: created.id, code: created.code };
}

export async function updateLesson(id: string, input: LessonFormInput) {
  const actor = await getActor();
  const l = await prisma.m26LessonLearned.findUniqueOrThrow({ where: { id } });
  if (l.status === "DA_PHE_DUYET" || l.status === "HUY")
    return fail("LOCKED", "Phiếu bài học đã phê duyệt/đã hủy là hồ sơ bất biến.");
  if (actor.m26Role !== "QLCL" && actor.m26Role !== "TP" && actor.id !== l.createdById)
    return fail("FORBIDDEN", "Chỉ người lập, QLCL hoặc Trưởng phòng được sửa phiếu bài học.");

  await prisma.m26LessonLearned.update({
    where: { id },
    data: {
      title: input.title.trim(),
      sourceType: input.sourceType,
      sourceRef: input.sourceRef.trim(),
      context: input.context.trim(),
      rootCauseRef: input.rootCauseRef?.trim() || null,
      lesson: input.lesson.trim(),
      recommendedAction: input.recommendedAction.trim(),
      shareRequired: input.shareRequired,
      knowledgeItemId: input.knowledgeItemId || null,
    },
  });
  await logAudit("LESSON", id, actor, "Cập nhật phiếu bài học kinh nghiệm");
  revalidateM26([`/modules/M26/lessons/${id}`]);
  return { ok: true as const };
}

export async function analyzeLesson(id: string) {
  const actor = await getActor();
  const l = await prisma.m26LessonLearned.findUniqueOrThrow({ where: { id } });
  const r = txAnalyzeLesson(l, actor);
  if (!r.ok) return fail(r.code, r.message);
  await prisma.m26LessonLearned.update({ where: { id }, data: { status: r.status as never } });
  await logAudit("LESSON", id, actor, r.action, { before: l.status, after: r.status });
  revalidateM26([`/modules/M26/lessons/${id}`]);
  return { ok: true as const };
}

export async function submitLesson(id: string) {
  const actor = await getActor();
  const l = await prisma.m26LessonLearned.findUniqueOrThrow({ where: { id } });
  const r = txSubmitLesson(l, actor);
  if (!r.ok) return fail(r.code, r.message);
  await prisma.m26LessonLearned.update({ where: { id }, data: { status: r.status as never } });
  await logAudit("LESSON", id, actor, r.action, { before: l.status, after: r.status });
  revalidateM26([`/modules/M26/lessons/${id}`]);
  return { ok: true as const };
}

export async function approveLesson(id: string, pass: boolean, reason?: string) {
  const actor = await getActor();
  const l = await prisma.m26LessonLearned.findUniqueOrThrow({ where: { id } });
  const r = txApproveLesson(l, actor, pass, reason);
  if (!r.ok) return fail(r.code, r.message);
  await prisma.m26LessonLearned.update({
    where: { id },
    data: { status: r.status as never, reason: r.reason, ...r.patch },
  });
  await logAudit("LESSON", id, actor, r.action, { before: l.status, after: r.status, reason: r.reason });
  revalidateM26([`/modules/M26/lessons/${id}`]);
  return { ok: true as const };
}

export async function cancelLesson(id: string, reason: string) {
  const actor = await getActor();
  const l = await prisma.m26LessonLearned.findUniqueOrThrow({ where: { id } });
  const r = txCancelLesson(l, actor, reason);
  if (!r.ok) return fail(r.code, r.message);
  await prisma.m26LessonLearned.update({ where: { id }, data: { status: r.status as never, reason: r.reason } });
  await logAudit("LESSON", id, actor, r.action, { before: l.status, after: r.status, reason: r.reason });
  revalidateM26([`/modules/M26/lessons/${id}`]);
  return { ok: true as const };
}

// ---------- Nhu cầu tri thức ----------

export interface NeedFormInput {
  trigger: M26NeedTrigger;
  triggerRef: string;
  description: string;
  requiredBy: string; // yyyy-mm-dd
  method: M26NeedMethod;
  responsibleId: string;
}

export async function createNeed(input: NeedFormInput) {
  const actor = await getActor();
  if (actor.m26Role !== "QLCL" && actor.m26Role !== "TP" && actor.m26Role !== "LDV")
    return fail("FORBIDDEN", "Chỉ QLCL/TP/LĐV được lập phiếu nhu cầu tri thức.");
  if (!input.triggerRef.trim() || !input.description.trim()) return fail("INVALID", "Bắt buộc nhập căn cứ phát sinh và mô tả nhu cầu.");
  const requiredBy = new Date(input.requiredBy);
  if (Number.isNaN(requiredBy.getTime())) return fail("INVALID", "Hạn cần có tri thức không hợp lệ.");

  const created = await prisma.$transaction(async (tx) => {
    const n = await tx.m26KnowledgeNeed.create({
      data: {
        code: "PENDING",
        trigger: input.trigger,
        triggerRef: input.triggerRef.trim(),
        description: input.description.trim(),
        requiredBy,
        method: input.method,
        responsibleId: input.responsibleId,
        createdById: actor.id,
      },
    });
    return tx.m26KnowledgeNeed.update({ where: { id: n.id }, data: { code: `NC-${yearNow()}-${pad(n.seq)}` } });
  });

  await logAudit("NEED", created.id, actor, "Lập phiếu nhu cầu tri thức", { after: "MO" });
  revalidateM26();
  return { ok: true as const, id: created.id, code: created.code };
}

// Gắn nhu cầu vào mục tri thức đang thiếu người kế cận (dùng cho gate ETV.P26 mục 5.1.6).
export async function attachNeedToItem(needId: string, itemId: string | null) {
  const actor = await getActor();
  if (actor.m26Role !== "QLCL" && actor.m26Role !== "TP")
    return fail("FORBIDDEN", "Chỉ QLCL hoặc Trưởng phòng được gắn nhu cầu vào mục tri thức.");
  await prisma.m26KnowledgeNeed.update({ where: { id: needId }, data: { resultItemId: itemId } });
  await logAudit("NEED", needId, actor, itemId ? "Gắn nhu cầu với mục tri thức" : "Gỡ liên kết mục tri thức", { after: itemId ?? "—" });
  revalidateM26();
  return { ok: true as const };
}

export async function setNeedResult(id: string, result: { itemId?: string | null; trainingId?: string | null }) {
  const actor = await getActor();
  if (actor.m26Role !== "QLCL" && actor.m26Role !== "TP")
    return fail("FORBIDDEN", "Chỉ QLCL hoặc Trưởng phòng được ghi nhận kết quả bổ sung tri thức.");
  await prisma.m26KnowledgeNeed.update({
    where: { id },
    data: { resultItemId: result.itemId ?? null, resultTrainingId: result.trainingId ?? null },
  });
  await logAudit("NEED", id, actor, "Ghi nhận kết quả bổ sung tri thức", {
    after: result.itemId ?? result.trainingId ?? "—",
  });
  revalidateM26([`/modules/M26/needs`]);
  return { ok: true as const };
}

export async function startNeed(id: string) {
  const actor = await getActor();
  const n = await prisma.m26KnowledgeNeed.findUniqueOrThrow({ where: { id } });
  const r = txStartNeed(n, actor);
  if (!r.ok) return fail(r.code, r.message);
  await prisma.m26KnowledgeNeed.update({ where: { id }, data: { status: r.status as never } });
  await logAudit("NEED", id, actor, r.action, { before: n.status, after: r.status });
  revalidateM26();
  return { ok: true as const };
}

export async function fulfillNeed(id: string) {
  const actor = await getActor();
  const n = await prisma.m26KnowledgeNeed.findUniqueOrThrow({ where: { id } });
  const r = txFulfillNeed(n, actor);
  if (!r.ok) return fail(r.code, r.message);
  await prisma.m26KnowledgeNeed.update({ where: { id }, data: { status: r.status as never, ...r.patch } });
  await logAudit("NEED", id, actor, r.action, { before: n.status, after: r.status });
  revalidateM26();
  return { ok: true as const };
}

export async function waiveNeed(id: string, reason: string) {
  const actor = await getActor();
  const n = await prisma.m26KnowledgeNeed.findUniqueOrThrow({ where: { id } });
  const r = txWaiveNeed(n, actor, reason);
  if (!r.ok) return fail(r.code, r.message);
  await prisma.m26KnowledgeNeed.update({
    where: { id },
    data: { status: r.status as never, reason: r.reason, ...r.patch },
  });
  await logAudit("NEED", id, actor, r.action, { before: n.status, after: r.status, reason: r.reason });
  revalidateM26();
  return { ok: true as const };
}

// ---------- Hoạt động chia sẻ ----------

export interface SharingFormInput {
  form: M26SharingForm;
  heldAt: string; // yyyy-mm-dd
  topic: string;
  presenterId: string;
  itemIds: string[];
  participantIds: string[];
  evidenceTrainingId?: string;
  evidenceRef?: string;
  handoverNote?: string;
  effectivenessNote?: string;
}

async function nonApprovedCodes(itemIds: string[]): Promise<string[]> {
  if (itemIds.length === 0) return [];
  const items = await prisma.m26KnowledgeItem.findMany({
    where: { id: { in: itemIds }, status: { not: "APPROVED" } },
    select: { code: true },
  });
  return items.map((i) => i.code);
}

export async function createSharing(input: SharingFormInput) {
  const actor = await getActor();
  if (actor.m26Role !== "QLCL" && actor.m26Role !== "TP")
    return fail("FORBIDDEN", "Chỉ QLCL hoặc Trưởng phòng được lập hoạt động chia sẻ tri thức.");
  if (!input.topic.trim()) return fail("INVALID", "Bắt buộc nhập nội dung/chủ đề chia sẻ.");
  const heldAt = new Date(input.heldAt);
  if (Number.isNaN(heldAt.getTime())) return fail("INVALID", "Thời gian tổ chức không hợp lệ.");

  const invalid = validateSharingItems(await nonApprovedCodes(input.itemIds));
  if (invalid) return fail("ITEM_NOT_APPROVED", invalid);

  const created = await prisma.$transaction(async (tx) => {
    const s = await tx.m26SharingEvent.create({
      data: {
        code: "PENDING",
        form: input.form,
        heldAt,
        topic: input.topic.trim(),
        presenterId: input.presenterId,
        evidenceTrainingId: input.evidenceTrainingId || null,
        evidenceRef: input.evidenceRef?.trim() || null,
        handoverNote: input.handoverNote?.trim() || null,
        effectivenessNote: input.effectivenessNote?.trim() || null,
        createdById: actor.id,
        items: { create: input.itemIds.map((itemId) => ({ itemId })) },
        participants: { create: input.participantIds.map((userId) => ({ userId })) },
      },
    });
    return tx.m26SharingEvent.update({ where: { id: s.id }, data: { code: `CS-${yearNow()}-${pad(s.seq)}` } });
  });

  await logAudit("SHARING", created.id, actor, "Lập kế hoạch chia sẻ tri thức", { after: "KE_HOACH" });
  revalidateM26();
  return { ok: true as const, id: created.id, code: created.code };
}

export async function completeSharing(id: string, effectivenessNote?: string) {
  const actor = await getActor();
  const s = await prisma.m26SharingEvent.findUniqueOrThrow({
    where: { id },
    include: { items: { select: { itemId: true } }, _count: { select: { participants: true } } },
  });
  const r = txCompleteSharing(
    {
      status: s.status,
      form: s.form,
      evidenceTrainingId: s.evidenceTrainingId,
      evidenceRef: s.evidenceRef,
      itemCount: s.items.length,
      participantCount: s._count.participants,
      nonApprovedItemCodes: await nonApprovedCodes(s.items.map((i) => i.itemId)),
    },
    actor,
  );
  if (!r.ok) return fail(r.code, r.message);
  await prisma.m26SharingEvent.update({
    where: { id },
    data: { status: r.status as never, effectivenessNote: effectivenessNote?.trim() || s.effectivenessNote },
  });
  await logAudit("SHARING", id, actor, r.action, { before: s.status, after: r.status });
  revalidateM26();
  return { ok: true as const };
}

export async function cancelSharing(id: string, reason: string) {
  const actor = await getActor();
  const s = await prisma.m26SharingEvent.findUniqueOrThrow({
    where: { id },
    include: { items: { select: { itemId: true } }, _count: { select: { participants: true } } },
  });
  const r = txCancelSharing(
    {
      status: s.status,
      form: s.form,
      evidenceTrainingId: s.evidenceTrainingId,
      evidenceRef: s.evidenceRef,
      itemCount: s.items.length,
      participantCount: s._count.participants,
      nonApprovedItemCodes: [],
    },
    actor,
    reason,
  );
  if (!r.ok) return fail(r.code, r.message);
  await prisma.m26SharingEvent.update({ where: { id }, data: { status: r.status as never, reason: r.reason } });
  await logAudit("SHARING", id, actor, r.action, { before: s.status, after: r.status, reason: r.reason });
  revalidateM26();
  return { ok: true as const };
}

// Dùng cho bảng "đến hạn rà soát" phía server component.
export async function itemsDueForReview() {
  const items = await prisma.m26KnowledgeItem.findMany({
    where: { status: "APPROVED" },
    include: { owner: true },
    orderBy: { code: "asc" },
  });
  return items.filter((i) => isDueForReview(i.reviewCycle, i.lastReviewedAt ?? i.approvedAt));
}
