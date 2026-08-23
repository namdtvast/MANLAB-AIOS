"use server";

// M25 — Server Actions. Logic quyết định nằm hoàn toàn ở "@/lib/m25/rules" — action này chỉ gọi
// rule rồi ghi DB, không tự quyết định gì thêm (mirror src/lib/m17/actions.ts).
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getActor } from "./actor";
import {
  assertEditable,
  canEditReview,
  txApprove,
  txCancel,
  txReview,
  txSubmitForReview,
  validateClose,
  validateExpectation,
  validateRiskLink,
  type M25ActorUser,
  type TxResult,
} from "./rules";

type ItemType = "REVIEW" | "ISSUE" | "PARTY" | "EXPECTATION";

async function logAudit(itemType: ItemType, itemId: string, actor: M25ActorUser, action: string, reason: string | null = null) {
  await prisma.m25AuditEntry.create({
    data: { itemType, itemId, actorId: actor.id, role: actor.m25Role ?? "—", action, reason },
  });
}

function revalidateM25(paths: string[] = []) {
  revalidatePath("/modules/M25");
  revalidatePath("/modules/M25/monitoring");
  for (const p of paths) revalidatePath(p);
}

async function loadReviewForRules(id: string) {
  return prisma.m25ContextReview.findUniqueOrThrow({
    where: { id },
    select: { id: true, status: true, cycleType: true, triggerReason: true, summary: true, createdById: true },
  });
}

// Chặn mọi đường ghi vào kỳ đã phê duyệt/hết hiệu lực/hủy (quy tắc 8).
async function guardEditable(reviewId: string): Promise<TxResult | null> {
  const r = await prisma.m25ContextReview.findUniqueOrThrow({ where: { id: reviewId }, select: { status: true } });
  return assertEditable(r.status);
}

// ---------- Kỳ xem xét ----------

export async function createContextReview(input: {
  cycleType: "DINH_KY" | "DOT_XUAT";
  periodYear: number;
  triggerReason?: string;
  scopeSystems: string[];
  summary?: string;
  inheritFromPrevious: boolean;
}) {
  const actor = await getActor();
  if (input.cycleType === "DOT_XUAT" && !input.triggerReason?.trim())
    return { ok: false as const, code: "TRIGGER_REQUIRED", message: "Kỳ đột xuất bắt buộc ghi rõ sự kiện làm phát sinh (quy tắc 2 DacTa M25)." };
  if (input.scopeSystems.length === 0)
    return { ok: false as const, code: "SCOPE_REQUIRED", message: "Bắt buộc chọn ít nhất 1 hệ thống quản lý thuộc phạm vi." };

  const previous = await prisma.m25ContextReview.findFirst({
    where: { status: "APPROVED" },
    orderBy: { approvedAt: "desc" },
    include: { issues: { include: { riskLinks: true } }, parties: { include: { expectations: true } } },
  });

  const created = await prisma.$transaction(async (tx) => {
    const r = await tx.m25ContextReview.create({
      data: {
        code: "PENDING",
        cycleType: input.cycleType,
        periodYear: input.periodYear,
        triggerReason: input.triggerReason?.trim() || null,
        scopeSystems: input.scopeSystems as never,
        summary: input.summary?.trim() || null,
        createdById: actor.id,
      },
    });
    const code = `BC-${input.periodYear}-${String(r.seq).padStart(4, "0")}`;
    const withCode = await tx.m25ContextReview.update({ where: { id: r.id }, data: { code } });

    // Quy tắc 9 — kế thừa các mục CÒN HIỆU LỰC của kỳ trước làm điểm khởi đầu (không kế thừa mục đã đóng).
    if (input.inheritFromPrevious && previous) {
      for (const issue of previous.issues.filter((i) => i.status === "CON_HIEU_LUC")) {
        const ni = await tx.m25ContextIssue.create({
          data: {
            code: "PENDING",
            reviewId: withCode.id,
            origin: issue.origin,
            category: issue.category,
            title: issue.title,
            description: issue.description,
            direction: issue.direction,
            affectedSystems: issue.affectedSystems,
            impactLevel: issue.impactLevel,
            monitoringMethod: issue.monitoringMethod,
            monitoringFrequency: issue.monitoringFrequency,
            ownerId: issue.ownerId,
            objectiveRefs: issue.objectiveRefs,
            evidenceRefs: issue.evidenceRefs,
          },
        });
        await tx.m25ContextIssue.update({
          where: { id: ni.id },
          data: { code: `VD-${input.periodYear}-${String(ni.seq).padStart(4, "0")}` },
        });
        for (const link of issue.riskLinks) {
          await tx.m25IssueRiskLink.create({
            data: { issueId: ni.id, riskId: link.riskId, opportunityId: link.opportunityId },
          });
        }
      }
      for (const party of previous.parties.filter((p) => p.status === "CON_HIEU_LUC")) {
        const np = await tx.m25InterestedParty.create({
          data: {
            code: "PENDING",
            reviewId: withCode.id,
            name: party.name,
            group: party.group,
            influenceLevel: party.influenceLevel,
            engagementChannel: party.engagementChannel,
            monitoringFrequency: party.monitoringFrequency,
            ownerId: party.ownerId,
            impartialityFlag: party.impartialityFlag,
          },
        });
        await tx.m25InterestedParty.update({
          where: { id: np.id },
          data: { code: `BQT-${input.periodYear}-${String(np.seq).padStart(4, "0")}` },
        });
        for (const e of party.expectations) {
          await tx.m25PartyExpectation.create({
            data: {
              partyId: np.id,
              description: e.description,
              source: e.source,
              isComplianceObligation: e.isComplianceObligation,
              obligationRef: e.obligationRef,
              responseAction: e.responseAction,
              responseModuleRef: e.responseModuleRef,
              fulfillmentStatus: e.fulfillmentStatus,
            },
          });
        }
      }
    }
    return withCode;
  });

  await logAudit(
    "REVIEW",
    created.id,
    actor,
    input.inheritFromPrevious && previous ? `Lập kỳ xem xét bối cảnh (kế thừa mục còn hiệu lực của ${previous.code})` : "Lập kỳ xem xét bối cảnh",
  );
  revalidateM25();
  return { ok: true as const, id: created.id, code: created.code };
}

export async function updateContextReview(id: string, input: { summary?: string; triggerReason?: string; scopeSystems?: string[] }) {
  const actor = await getActor();
  const blocked = await guardEditable(id);
  if (blocked) return blocked;
  await prisma.m25ContextReview.update({
    where: { id },
    data: {
      summary: input.summary?.trim() || null,
      triggerReason: input.triggerReason?.trim() || null,
      ...(input.scopeSystems ? { scopeSystems: input.scopeSystems as never } : {}),
    },
  });
  await logAudit("REVIEW", id, actor, "Cập nhật thông tin kỳ xem xét");
  revalidateM25([`/modules/M25/review/${id}`]);
  return { ok: true as const };
}

async function applyReviewTransition(id: string, result: TxResult, actor: M25ActorUser) {
  if (!result.ok) return result;
  const before = await prisma.m25ContextReview.findUniqueOrThrow({ where: { id } });

  await prisma.$transaction(async (tx) => {
    await tx.m25ContextReview.update({ where: { id }, data: { status: result.status as never, reason: result.reason, ...result.patch } });

    // Quy tắc 9 — kỳ mới được phê duyệt thì kỳ đã phê duyệt trước đó tự Hết hiệu lực.
    if (result.status === "APPROVED") {
      const previous = await tx.m25ContextReview.findFirst({
        where: { status: "APPROVED", id: { not: id } },
        orderBy: { approvedAt: "desc" },
      });
      if (previous) {
        await tx.m25ContextReview.update({ where: { id: previous.id }, data: { status: "SUPERSEDED" } });
        await tx.m25ContextReview.update({ where: { id }, data: { supersedesId: previous.id } });
      }
    }
  });

  await logAudit("REVIEW", id, actor, `${result.action} (${before.status} → ${result.status})`, result.reason);
  revalidateM25([`/modules/M25/review/${id}`]);
  return result;
}

export async function submitContextReview(id: string): Promise<TxResult> {
  const actor = await getActor();
  const r = await loadReviewForRules(id);
  const [issues, parties] = await Promise.all([
    prisma.m25ContextIssue.findMany({
      where: { reviewId: id },
      select: { code: true, title: true, impactLevel: true, status: true, _count: { select: { riskLinks: true } } },
    }),
    prisma.m25InterestedParty.findMany({
      where: { reviewId: id },
      select: { code: true, name: true, status: true, _count: { select: { expectations: true } } },
    }),
  ]);
  return applyReviewTransition(
    id,
    txSubmitForReview(
      r,
      issues.map((i) => ({ code: i.code, title: i.title, impactLevel: i.impactLevel, status: i.status, riskLinkCount: i._count.riskLinks })),
      parties.map((p) => ({ code: p.code, name: p.name, status: p.status, expectationCount: p._count.expectations })),
    ),
    actor,
  );
}

export async function reviewContextReview(id: string, pass: boolean, reason?: string): Promise<TxResult> {
  const actor = await getActor();
  const r = await loadReviewForRules(id);
  return applyReviewTransition(id, txReview(r, actor, pass, reason), actor);
}

export async function approveContextReview(id: string, pass: boolean, conclusion?: string, reason?: string): Promise<TxResult> {
  const actor = await getActor();
  const r = await loadReviewForRules(id);
  return applyReviewTransition(id, txApprove(r, actor, pass, conclusion, reason), actor);
}

export async function cancelContextReview(id: string, reason?: string): Promise<TxResult> {
  const actor = await getActor();
  const r = await loadReviewForRules(id);
  return applyReviewTransition(id, txCancel(r, actor, reason), actor);
}

// ---------- Vấn đề bối cảnh ----------

export interface IssueInput {
  reviewId: string;
  origin: string;
  category: string;
  title: string;
  description: string;
  direction: string;
  affectedSystems: string[];
  impactLevel: string;
  monitoringMethod: string;
  monitoringFrequency: string;
  ownerId?: string;
  objectiveRefs: string[];
  evidenceRefs: string[];
}

export async function createContextIssue(input: IssueInput) {
  const actor = await getActor();
  const blocked = await guardEditable(input.reviewId);
  if (blocked) return blocked;
  if (input.affectedSystems.length === 0)
    return { ok: false as const, code: "SCOPE_REQUIRED", message: "Bắt buộc chọn ít nhất 1 hệ thống quản lý bị ảnh hưởng." };

  const review = await prisma.m25ContextReview.findUniqueOrThrow({ where: { id: input.reviewId } });
  const created = await prisma.$transaction(async (tx) => {
    const i = await tx.m25ContextIssue.create({
      data: {
        code: "PENDING",
        reviewId: input.reviewId,
        origin: input.origin as never,
        category: input.category as never,
        title: input.title,
        description: input.description,
        direction: input.direction as never,
        affectedSystems: input.affectedSystems as never,
        impactLevel: input.impactLevel as never,
        monitoringMethod: input.monitoringMethod,
        monitoringFrequency: input.monitoringFrequency as never,
        ownerId: input.ownerId || null,
        objectiveRefs: input.objectiveRefs,
        evidenceRefs: input.evidenceRefs,
      },
    });
    return tx.m25ContextIssue.update({
      where: { id: i.id },
      data: { code: `VD-${review.periodYear}-${String(i.seq).padStart(4, "0")}` },
    });
  });
  await logAudit("ISSUE", created.id, actor, `Thêm vấn đề bối cảnh ${created.code}`);
  revalidateM25([`/modules/M25/review/${input.reviewId}`]);
  return { ok: true as const, id: created.id };
}

export async function closeContextIssue(id: string, reason: string) {
  const actor = await getActor();
  const issue = await prisma.m25ContextIssue.findUniqueOrThrow({ where: { id } });
  const blocked = await guardEditable(issue.reviewId);
  if (blocked) return blocked;
  const invalid = validateClose(reason);
  if (invalid) return { ok: false as const, code: "REASON_REQUIRED", message: invalid };
  await prisma.m25ContextIssue.update({ where: { id }, data: { status: "DA_DONG", closeReason: reason } });
  await logAudit("ISSUE", id, actor, `Đóng vấn đề bối cảnh ${issue.code}`, reason);
  revalidateM25([`/modules/M25/review/${issue.reviewId}`]);
  return { ok: true as const };
}

export async function linkIssueToM01(input: { issueId: string; riskId?: string; opportunityId?: string }) {
  const actor = await getActor();
  const issue = await prisma.m25ContextIssue.findUniqueOrThrow({ where: { id: input.issueId } });
  const blocked = await guardEditable(issue.reviewId);
  if (blocked) return blocked;
  const invalid = validateRiskLink(input);
  if (invalid) return { ok: false as const, code: "BAD_LINK", message: invalid };

  const exists = await prisma.m25IssueRiskLink.findFirst({
    where: { issueId: input.issueId, riskId: input.riskId ?? null, opportunityId: input.opportunityId ?? null },
  });
  if (exists) return { ok: false as const, code: "DUPLICATE", message: "Liên kết này đã tồn tại." };

  await prisma.m25IssueRiskLink.create({
    data: { issueId: input.issueId, riskId: input.riskId || null, opportunityId: input.opportunityId || null },
  });
  await logAudit("ISSUE", input.issueId, actor, `Liên kết ${issue.code} → M01 (${input.riskId ? "rủi ro" : "cơ hội"})`);
  revalidateM25([`/modules/M25/review/${issue.reviewId}`]);
  return { ok: true as const };
}

export async function unlinkIssueFromM01(linkId: string) {
  const actor = await getActor();
  const link = await prisma.m25IssueRiskLink.findUniqueOrThrow({ where: { id: linkId }, include: { issue: true } });
  const blocked = await guardEditable(link.issue.reviewId);
  if (blocked) return blocked;
  await prisma.m25IssueRiskLink.delete({ where: { id: linkId } });
  await logAudit("ISSUE", link.issueId, actor, `Bỏ liên kết ${link.issue.code} → M01`);
  revalidateM25([`/modules/M25/review/${link.issue.reviewId}`]);
  return { ok: true as const };
}

// ---------- Bên quan tâm ----------

export interface PartyInput {
  reviewId: string;
  name: string;
  group: string;
  influenceLevel: string;
  engagementChannel: string;
  monitoringFrequency: string;
  ownerId?: string;
  impartialityFlag: boolean;
}

export async function createInterestedParty(input: PartyInput) {
  const actor = await getActor();
  const blocked = await guardEditable(input.reviewId);
  if (blocked) return blocked;
  const review = await prisma.m25ContextReview.findUniqueOrThrow({ where: { id: input.reviewId } });
  const created = await prisma.$transaction(async (tx) => {
    const p = await tx.m25InterestedParty.create({
      data: {
        code: "PENDING",
        reviewId: input.reviewId,
        name: input.name,
        group: input.group as never,
        influenceLevel: input.influenceLevel as never,
        engagementChannel: input.engagementChannel,
        monitoringFrequency: input.monitoringFrequency as never,
        ownerId: input.ownerId || null,
        impartialityFlag: input.impartialityFlag,
      },
    });
    return tx.m25InterestedParty.update({
      where: { id: p.id },
      data: { code: `BQT-${review.periodYear}-${String(p.seq).padStart(4, "0")}` },
    });
  });
  await logAudit(
    "PARTY",
    created.id,
    actor,
    input.impartialityFlag
      ? `Thêm bên quan tâm ${created.code} — CÓ nguy cơ ảnh hưởng tính khách quan (ISO/IEC 17025 §4.1)`
      : `Thêm bên quan tâm ${created.code}`,
  );
  revalidateM25([`/modules/M25/review/${input.reviewId}`]);
  return { ok: true as const, id: created.id };
}

export async function closeInterestedParty(id: string, reason: string) {
  const actor = await getActor();
  const party = await prisma.m25InterestedParty.findUniqueOrThrow({ where: { id } });
  const blocked = await guardEditable(party.reviewId);
  if (blocked) return blocked;
  const invalid = validateClose(reason);
  if (invalid) return { ok: false as const, code: "REASON_REQUIRED", message: invalid };
  await prisma.m25InterestedParty.update({ where: { id }, data: { status: "DA_DONG", closeReason: reason } });
  await logAudit("PARTY", id, actor, `Đóng bên quan tâm ${party.code}`, reason);
  revalidateM25([`/modules/M25/review/${party.reviewId}`]);
  return { ok: true as const };
}

export async function createPartyExpectation(input: {
  partyId: string;
  description: string;
  source: string;
  isComplianceObligation: boolean;
  obligationRef?: string;
  responseAction: string;
  responseModuleRef?: string;
  fulfillmentStatus: string;
}) {
  const actor = await getActor();
  const party = await prisma.m25InterestedParty.findUniqueOrThrow({ where: { id: input.partyId } });
  const blocked = await guardEditable(party.reviewId);
  if (blocked) return blocked;
  const invalid = validateExpectation(input);
  if (invalid) return { ok: false as const, code: "INVALID", message: invalid };

  const created = await prisma.m25PartyExpectation.create({
    data: {
      partyId: input.partyId,
      description: input.description,
      source: input.source as never,
      isComplianceObligation: input.isComplianceObligation,
      obligationRef: input.obligationRef?.trim() || null,
      responseAction: input.responseAction,
      responseModuleRef: input.responseModuleRef?.trim() || null,
      fulfillmentStatus: input.fulfillmentStatus as never,
    },
  });
  await logAudit(
    "EXPECTATION",
    created.id,
    actor,
    input.isComplianceObligation ? `Thêm mong đợi cho ${party.code} — nghĩa vụ tuân thủ (${input.obligationRef})` : `Thêm mong đợi cho ${party.code}`,
  );
  revalidateM25([`/modules/M25/review/${party.reviewId}`]);
  return { ok: true as const, id: created.id };
}

export async function deletePartyExpectation(id: string) {
  const actor = await getActor();
  const e = await prisma.m25PartyExpectation.findUniqueOrThrow({ where: { id }, include: { party: true } });
  const blocked = await guardEditable(e.party.reviewId);
  if (blocked) return blocked;
  await prisma.m25PartyExpectation.delete({ where: { id } });
  await logAudit("PARTY", e.partyId, actor, `Xóa 1 mong đợi của ${e.party.code}`);
  revalidateM25([`/modules/M25/review/${e.party.reviewId}`]);
  return { ok: true as const };
}

// ---------- Tra cứu phục vụ UI ----------

export async function listM01Linkables() {
  await getActor();
  const [risks, opportunities] = await Promise.all([
    prisma.m01RiskItem.findMany({ orderBy: { createdAt: "desc" }, select: { id: true, code: true, title: true }, take: 100 }),
    prisma.m01OpportunityItem.findMany({ orderBy: { createdAt: "desc" }, select: { id: true, code: true, title: true }, take: 100 }),
  ]);
  return { risks, opportunities };
}

export async function listM25Users() {
  await getActor();
  const assignments = await prisma.moduleRoleAssignment.findMany({
    where: { moduleCode: "M25" },
    include: { user: { select: { id: true, name: true } } },
  });
  return assignments.map((a) => ({ id: a.user.id, name: a.user.name ?? "—", role: a.role }));
}

export const isReviewEditable = async (status: string) => canEditReview(status as never);

// Cross-module: M17 dùng để cảnh báo mềm khi lập chương trình xem xét lãnh đạo mà năm đó chưa có
// kỳ bối cảnh nào được phê duyệt (quy tắc 1 DacTa M25 — cảnh báo, KHÔNG chặn).
export async function hasApprovedContextReview(year: number): Promise<boolean> {
  const count = await prisma.m25ContextReview.count({ where: { periodYear: year, status: { in: ["APPROVED", "SUPERSEDED"] } } });
  return count > 0;
}
