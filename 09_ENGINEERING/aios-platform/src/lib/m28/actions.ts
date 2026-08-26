"use server";

// M28 — Server Actions. Logic quyết định nằm hoàn toàn ở "@/lib/m28/rules" — action này chỉ gọi
// rule rồi ghi DB, không tự quyết định gì thêm (mirror src/lib/m27/actions.ts).
//
// Điểm khác M27: R1 là ràng buộc LIÊN MODULE. Nền tảng không dùng FK chéo module nên action phải
// tự truy vấn danh mục M27 để đếm số mã tài sản có thật, rồi TRUYỀN VÀO rule. Rule vẫn thuần hàm.
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import type {
  Classification,
  M28IncidentStatus,
  M28RequestType,
  M28Severity,
  M28SubjectType,
  M28TreatmentOption,
} from "@/generated/prisma/enums";
import { getActor, getRoleOf } from "./actor";
import {
  computeImpact,
  computeRiskScore,
  isBcpInput,
  txAcceptResidual,
  txAdvanceIncident,
  txApproveAccess,
  txApproveRisk,
  txApproveSoA,
  txExecuteAccess,
  txMarkRiskTreated,
  txRetireRisk,
  txReviewRisk,
  txRevokeAccess,
  txSubmitAccess,
  txSubmitRisk,
  txVerifyTreatment,
  validateRiskInput,
  type AccessForRules,
  type IncidentForRules,
  type M28ActorUser,
  type RiskForRules,
  type TxResult,
} from "./rules";

type ItemType = "RISK" | "TREATMENT" | "SOA_VERSION" | "INCIDENT" | "ACCESS_REQUEST" | "ACCESS_REVIEW";

async function logAudit(
  itemType: ItemType,
  itemId: string,
  actor: M28ActorUser,
  action: string,
  reason: string | null = null,
) {
  await prisma.m28AuditEntry.create({
    data: { itemType, itemId, actorId: actor.id, role: actor.m28Role ?? "—", action, reason },
  });
}

function revalidateM28(paths: string[] = []) {
  for (const p of [
    "/modules/M28",
    "/modules/M28/soa",
    "/modules/M28/incidents",
    "/modules/M28/access",
    "/modules/M28/report",
    ...paths,
  ])
    revalidatePath(p);
}

const fail = (code: string, message: string) => ({ ok: false as const, code, message });

export async function listM28Users() {
  return prisma.user.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true, email: true } });
}

/// Danh mục tài sản M27 để chọn khi khai báo rủi ro — chỉ tài sản Đang sử dụng mới gắn được.
export async function listM27Assets() {
  return prisma.m27InfoAsset.findMany({
    where: { status: "DANG_SU_DUNG" },
    orderBy: { code: "asc" },
    select: { code: true, name: true, classification: true },
  });
}

/// R1 — đếm số mã tài sản THỰC SỰ có trong danh mục M27 và đang sử dụng.
async function countExistingAssets(codes: string[]): Promise<number> {
  if (codes.length === 0) return 0;
  return prisma.m27InfoAsset.count({ where: { code: { in: codes }, status: "DANG_SU_DUNG" } });
}

// ---------------------------------------------------------------------------
// Rủi ro an toàn thông tin
// ---------------------------------------------------------------------------

export interface RiskInput {
  title: string;
  assetRefs: string[];
  classification: Classification;
  threat: string;
  vulnerability: string;
  existingControls: string;
  impactC: number;
  impactI: number;
  impactA: number;
  likelihood: number;
  treatmentOption: M28TreatmentOption;
  soaControlRefs: string[];
  ownerId: string;
  m01RiskRef: string;
}

export async function createRisk(input: RiskInput) {
  const actor = await getActor();
  if (!["ATTT", "TP", "QTHT", "QLCL"].includes(actor.m28Role ?? ""))
    return fail("FORBIDDEN", "PT.ATTT, TP, QTHT hoặc QLCL nhận diện và mô tả rủi ro (ETV.P28 Phụ lục II mục 1).");

  const [assetsExist, ownerRole] = await Promise.all([
    countExistingAssets(input.assetRefs),
    getRoleOf(input.ownerId),
  ]);
  const invalid = validateRiskInput({ ...input, ownerRole }, assetsExist);
  if (invalid) return fail("INVALID", invalid);

  const impact = computeImpact(input.impactC, input.impactI, input.impactA);
  const riskScore = computeRiskScore(input.likelihood, impact);

  const created = await prisma.$transaction(async (tx) => {
    const r = await tx.m28SecurityRisk.create({
      data: {
        code: "PENDING",
        title: input.title.trim(),
        assetRefs: input.assetRefs,
        classification: input.classification,
        threat: input.threat.trim(),
        vulnerability: input.vulnerability.trim(),
        existingControls: input.existingControls.trim() || null,
        impactC: input.impactC,
        impactI: input.impactI,
        impactA: input.impactA,
        likelihood: input.likelihood,
        impact,
        riskScore,
        treatmentOption: input.treatmentOption,
        soaControlRefs: input.soaControlRefs,
        ownerId: input.ownerId,
        m01RiskRef: input.m01RiskRef.trim() || null,
        bcpInput: isBcpInput(input.impactA),
        createdById: actor.id,
      },
    });
    return tx.m28SecurityRisk.update({
      where: { id: r.id },
      data: { code: `RR-ATTT-${new Date().getFullYear()}-${String(r.seq).padStart(3, "0")}` },
    });
  });
  await logAudit("RISK", created.id, actor, "Khai báo rủi ro (Nháp)");
  revalidateM28();
  return { ok: true as const, id: created.id };
}

async function loadRiskForRules(id: string): Promise<RiskForRules> {
  const r = await prisma.m28SecurityRisk.findUniqueOrThrow({
    where: { id },
    select: {
      status: true,
      assetRefs: true,
      classification: true,
      impactC: true,
      impactI: true,
      impactA: true,
      likelihood: true,
      riskScore: true,
      treatmentOption: true,
      soaControlRefs: true,
      ownerId: true,
      residualScore: true,
      residualAcceptedById: true,
      residualAcceptReason: true,
      createdById: true,
      treatments: { select: { status: true, interimMeasure: true } },
    },
  });
  const { treatments, ...rest } = r;
  return {
    ...rest,
    ownerRole: await getRoleOf(r.ownerId),
    treatmentCount: treatments.length,
    unverifiedTreatmentCount: treatments.filter((t) => t.status !== "HOAN_THANH").length,
  };
}

async function applyRiskTx(id: string, r: TxResult, actor: M28ActorUser) {
  if (!r.ok) return r;
  await prisma.m28SecurityRisk.update({
    where: { id },
    data: { status: r.status as never, reason: r.reason, ...r.patch },
  });
  await logAudit("RISK", id, actor, r.action, r.reason);
  revalidateM28([`/modules/M28/risk/${id}`]);
  return { ok: true as const };
}

export async function submitRisk(id: string) {
  const actor = await getActor();
  return applyRiskTx(id, txSubmitRisk(await loadRiskForRules(id), actor), actor);
}

export async function reviewRisk(id: string, pass: boolean, reason?: string) {
  const actor = await getActor();
  return applyRiskTx(id, txReviewRisk(await loadRiskForRules(id), actor, pass, reason), actor);
}

export async function approveRisk(id: string, pass: boolean, reason?: string) {
  const actor = await getActor();
  const risk = await loadRiskForRules(id);
  const hasInterim = await prisma.m28RiskTreatment.count({
    where: { riskId: id, NOT: { interimMeasure: null } },
  });
  return applyRiskTx(id, txApproveRisk(risk, actor, pass, hasInterim > 0, reason), actor);
}

export async function markRiskTreated(id: string) {
  const actor = await getActor();
  return applyRiskTx(id, txMarkRiskTreated(await loadRiskForRules(id), actor), actor);
}

export async function acceptResidual(id: string, likelihood: number, impact: number, reason?: string) {
  const actor = await getActor();
  return applyRiskTx(id, txAcceptResidual(await loadRiskForRules(id), actor, likelihood, impact, reason), actor);
}

export async function retireRisk(id: string, reason: string) {
  const actor = await getActor();
  return applyRiskTx(id, txRetireRisk(await loadRiskForRules(id), actor, reason), actor);
}

// ---------------------------------------------------------------------------
// Hạng mục Kế hoạch xử lý rủi ro
// ---------------------------------------------------------------------------

export async function addTreatment(input: {
  riskId: string;
  measure: string;
  soaControlRef: string;
  responsibleId: string;
  resources: string;
  dueAt: string;
  interimMeasure: string;
  verificationMethod: string;
}) {
  const actor = await getActor();
  if (!["ATTT", "TP", "QLCL", "LDV"].includes(actor.m28Role ?? ""))
    return fail("FORBIDDEN", "PT.ATTT, TP, QLCL hoặc LĐV lập hạng mục Kế hoạch xử lý rủi ro.");
  if (!input.measure.trim()) return fail("INVALID", "Thiếu biện pháp xử lý cụ thể (ETV.P28 mục 6.5.2).");
  if (!input.soaControlRef.trim())
    return fail("INVALID", "Thiếu mã kiểm soát tương ứng trong SoA (ETV.P28 mục 6.5.2).");
  if (!input.verificationMethod.trim())
    return fail("INVALID", "Thiếu cách xác nhận hiệu lực — biện pháp chưa xác nhận hiệu lực không được ghi là hoàn thành (ETV.P28 mục 6.5.2).");
  if (!input.dueAt) return fail("INVALID", "Thiếu hạn hoàn thành.");

  const t = await prisma.m28RiskTreatment.create({
    data: {
      riskId: input.riskId,
      measure: input.measure.trim(),
      soaControlRef: input.soaControlRef.trim(),
      responsibleId: input.responsibleId,
      resources: input.resources.trim() || null,
      dueAt: new Date(input.dueAt),
      interimMeasure: input.interimMeasure.trim() || null,
      verificationMethod: input.verificationMethod.trim(),
      status: "DANG_THUC_HIEN",
    },
  });
  await logAudit("TREATMENT", t.id, actor, "Thêm hạng mục xử lý rủi ro");
  revalidateM28([`/modules/M28/risk/${input.riskId}`]);
  return { ok: true as const, id: t.id };
}

export async function verifyTreatment(id: string, verificationNote: string) {
  const actor = await getActor();
  const t = await prisma.m28RiskTreatment.findUniqueOrThrow({
    where: { id },
    select: { status: true, completedAt: true, riskId: true },
  });
  const r = txVerifyTreatment(t, actor, verificationNote);
  if (!r.ok) return r;
  await prisma.m28RiskTreatment.update({
    where: { id },
    data: { status: r.status as never, ...r.patch },
  });
  await logAudit("TREATMENT", id, actor, r.action, r.reason);
  revalidateM28([`/modules/M28/risk/${t.riskId}`]);
  return { ok: true as const };
}

// ---------------------------------------------------------------------------
// Tuyên bố áp dụng (SoA)
// ---------------------------------------------------------------------------

export async function updateSoAControl(
  id: string,
  input: {
    applicable: boolean;
    justification: string;
    exclusionReason: string;
    implementation: string;
    implementationStatus: "CHUA_THUC_HIEN" | "DANG_THUC_HIEN" | "DA_THUC_HIEN";
    evidenceRefs: string[];
    evidenceDueAt: string;
  },
) {
  const actor = await getActor();
  if (!["ATTT", "QLCL"].includes(actor.m28Role ?? ""))
    return fail("FORBIDDEN", "PT.ATTT lập và QLCL soát xét SoA (ETV.P28 mục 6.6).");
  const control = await prisma.m28SoAControl.findUniqueOrThrow({
    where: { id },
    select: { soaVersion: { select: { id: true, status: true } } },
  });
  // Bản Đã phê duyệt là chỉ đọc: mỗi lần sửa tạo phiên bản MỚI, không sửa đè (R8; ETV.P28 mục 6.6).
  if (control.soaVersion.status !== "DRAFT" && control.soaVersion.status !== "PENDING_REVIEW")
    return fail(
      "READ_ONLY",
      "Phiên bản SoA đã trình hoặc đã phê duyệt là chỉ đọc — sửa nội dung phải tạo phiên bản mới, không sửa đè (R8; ETV.P28 mục 6.6).",
    );
  if (input.applicable && !input.justification.trim())
    return fail("INVALID", "Kiểm soát ghi Áp dụng phải nêu lý do áp dụng: rủi ro tương ứng, yêu cầu pháp luật, hợp đồng hoặc tiêu chuẩn (ETV.P28 mục 6.6).");
  if (!input.applicable && !input.exclusionReason.trim())
    return fail("INVALID", "Kiểm soát ghi Loại trừ BẮT BUỘC nêu căn cứ loại trừ, không được ghi chung chung (R7; ETV.P28 mục 6.6).");

  await prisma.m28SoAControl.update({
    where: { id },
    data: {
      applicable: input.applicable,
      justification: input.applicable ? input.justification.trim() : null,
      exclusionReason: input.applicable ? null : input.exclusionReason.trim(),
      implementation: input.implementation.trim() || null,
      implementationStatus: input.implementationStatus,
      evidenceRefs: input.evidenceRefs,
      evidenceDueAt: input.evidenceDueAt ? new Date(input.evidenceDueAt) : null,
    },
  });
  await logAudit("SOA_VERSION", control.soaVersion.id, actor, `Cập nhật dòng kiểm soát SoA`);
  revalidateM28();
  return { ok: true as const };
}

export async function submitSoA(id: string) {
  const actor = await getActor();
  if (!["ATTT", "QLCL"].includes(actor.m28Role ?? ""))
    return fail("FORBIDDEN", "PT.ATTT lập, QLCL soát xét rồi trình LĐV (ETV.P28 mục 6.6).");
  const v = await prisma.m28SoAVersion.findUniqueOrThrow({ where: { id }, select: { status: true } });
  if (v.status !== "DRAFT" && v.status !== "PENDING_REVIEW")
    return fail("BAD_STATE", "Phiên bản không ở trạng thái soạn thảo.");
  await prisma.m28SoAVersion.update({ where: { id }, data: { status: "PENDING_APPROVAL" } });
  await logAudit("SOA_VERSION", id, actor, "Trình LĐV phê duyệt Tuyên bố áp dụng");
  revalidateM28();
  return { ok: true as const };
}

export async function approveSoA(id: string, pass: boolean, reason?: string) {
  const actor = await getActor();
  const v = await prisma.m28SoAVersion.findUniqueOrThrow({
    where: { id },
    select: { status: true, scopeExclusions: true },
  });
  const [controlCount, missingExclusion] = await Promise.all([
    prisma.m28SoAControl.count({ where: { soaVersionId: id } }),
    prisma.m28SoAControl.count({
      where: { soaVersionId: id, applicable: false, OR: [{ exclusionReason: null }, { exclusionReason: "" }] },
    }),
  ]);
  const r = txApproveSoA(v, actor, pass, missingExclusion, controlCount, reason);
  if (!r.ok) return r;
  await prisma.$transaction(async (tx) => {
    if (r.status === "DA_PHE_DUYET") {
      await tx.m28SoAVersion.updateMany({
        where: { status: "DA_PHE_DUYET", id: { not: id } },
        data: { status: "HET_HIEU_LUC" },
      });
    }
    await tx.m28SoAVersion.update({
      where: { id },
      data: { status: r.status as never, reason: r.reason, ...r.patch },
    });
  });
  await logAudit("SOA_VERSION", id, actor, r.action, r.reason);
  revalidateM28();
  return { ok: true as const };
}

// ---------------------------------------------------------------------------
// Sự cố an toàn thông tin
// ---------------------------------------------------------------------------

export async function reportIncident(input: {
  symptom: string;
  assetRefs: string[];
  classification: Classification;
  severity: M28Severity;
  detectedAt: string;
  occurredAt: string;
  involvesCustomerData: "CO" | "KHONG" | "CHUA_XAC_DINH";
  involvesPersonalData: "CO" | "KHONG" | "CHUA_XAC_DINH";
  affectsResultValidity: boolean;
}) {
  // Ai cũng báo được sự cố, kể cả nhân sự không có vai trò M28 (ETV.P28 mục 6.8.2 bước 1).
  const actor = await getActor();
  if (!input.symptom.trim()) return fail("INVALID", "Thiếu mô tả hiện tượng quan sát được.");
  if (!input.detectedAt) return fail("INVALID", "Thiếu thời điểm phát hiện.");

  const created = await prisma.$transaction(async (tx) => {
    const r = await tx.m28SecurityIncident.create({
      data: {
        code: "PENDING",
        reporterId: actor.id,
        symptom: input.symptom.trim(),
        assetRefs: input.assetRefs,
        classification: input.classification,
        severity: input.severity,
        detectedAt: new Date(input.detectedAt),
        occurredAt: input.occurredAt ? new Date(input.occurredAt) : null,
        reportedAt: new Date(),
        involvesCustomerData: input.involvesCustomerData,
        involvesPersonalData: input.involvesPersonalData,
        affectsResultValidity: input.affectsResultValidity,
      },
    });
    return tx.m28SecurityIncident.update({
      where: { id: r.id },
      data: { code: `SC-ATTT-${new Date().getFullYear()}-${String(r.seq).padStart(3, "0")}` },
    });
  });
  await logAudit("INCIDENT", created.id, actor, "Ghi nhận sự cố an toàn thông tin");
  revalidateM28();
  return { ok: true as const, id: created.id };
}

async function loadIncidentForRules(id: string): Promise<IncidentForRules> {
  const i = await prisma.m28SecurityIncident.findUniqueOrThrow({
    where: { id },
    select: {
      status: true,
      severity: true,
      reporterId: true,
      affectsResultValidity: true,
      m10Ref: true,
      m11Ref: true,
      lessonRef: true,
      involvesCustomerData: true,
      involvesPersonalData: true,
      notifications: true,
      evidencePreserved: true,
      recoveryAt: true,
    },
  });
  const notifications = Array.isArray(i.notifications) ? i.notifications : [];
  return {
    ...i,
    notificationCount: notifications.length,
    // Người liên quan trực tiếp: hiện lấy từ người báo cáo. Khi có trường ghi nhận người gây ra
    // sự cố trong kết luận điều tra, bổ sung vào đây — R20 chặn theo danh sách này.
    involvedUserIds: [i.reporterId],
  };
}

export async function updateIncidentFields(
  id: string,
  input: {
    evidencePreserved?: string;
    scopeOfImpact?: string;
    m10Ref?: string;
    m11Ref?: string;
    lessonRef?: string;
    capaRef?: string;
    riskRefs?: string[];
    involvesCustomerData?: "CO" | "KHONG" | "CHUA_XAC_DINH";
    involvesPersonalData?: "CO" | "KHONG" | "CHUA_XAC_DINH";
  },
) {
  const actor = await getActor();
  if (!["ATTT", "QTHT", "QLCL", "LDV"].includes(actor.m28Role ?? ""))
    return fail("FORBIDDEN", "Chỉ PT.ATTT, QTHT, QLCL hoặc LĐV cập nhật hồ sơ sự cố.");
  const current = await prisma.m28SecurityIncident.findUniqueOrThrow({
    where: { id },
    select: { status: true },
  });
  // R10 — không cho sửa/xoá bằng chứng của sự cố đã đóng.
  if (current.status === "DA_DONG" || current.status === "HUY")
    return fail("BAD_STATE", "Sự cố đã kết thúc — không sửa hồ sơ; mở phiếu mới nếu có tình tiết mới.");

  const data: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(input)) {
    if (v === undefined) continue;
    if (Array.isArray(v)) data[k] = v;
    else if (typeof v === "string") data[k] = v.trim() || null;
    else data[k] = v;
  }
  if (Object.keys(data).length === 0) return { ok: true as const };
  await prisma.m28SecurityIncident.update({ where: { id }, data });
  await logAudit("INCIDENT", id, actor, "Cập nhật hồ sơ sự cố");
  revalidateM28([`/modules/M28/incident/${id}`]);
  return { ok: true as const };
}

export async function advanceIncident(id: string, next: M28IncidentStatus, note?: string) {
  const actor = await getActor();
  const i = await loadIncidentForRules(id);
  const r = txAdvanceIncident(i, actor, next, note);
  if (!r.ok) return r;
  await prisma.m28SecurityIncident.update({
    where: { id },
    data: { status: r.status as never, reason: r.reason, ...r.patch },
  });
  await logAudit("INCIDENT", id, actor, r.action, r.reason);
  revalidateM28([`/modules/M28/incident/${id}`]);
  return { ok: true as const };
}

// ---------------------------------------------------------------------------
// Quyền truy cập
// ---------------------------------------------------------------------------

export interface AccessItem {
  heThong: string;
  vaiTro: string;
  isPrivileged: boolean;
  mucPhanLoai: Classification;
  validUntil: string;
}

export async function createAccessRequest(input: {
  subjectId: string;
  subjectExternal: string;
  subjectType: M28SubjectType;
  ndaRef: string;
  awarenessTrainingRef: string;
  requestType: M28RequestType;
  reason: string;
  items: AccessItem[];
}) {
  const actor = await getActor();
  if (actor.m28Role !== "TP" && actor.m28Role !== "QLCL")
    return fail("FORBIDDEN", "Trưởng phòng đề nghị cấp/thay đổi/thu hồi quyền cho nhân sự thuộc phòng (ETV.P28 mục 6.7.1).");
  if (input.items.length === 0) return fail("INVALID", "Phải nêu ít nhất một hệ thống và mức quyền.");
  if (!input.reason.trim()) return fail("INVALID", "Thiếu lý do đề nghị.");
  if (!input.subjectId && !input.subjectExternal.trim())
    return fail("INVALID", "Thiếu người được cấp quyền.");

  const hasPrivileged = input.items.some((i) => i.isPrivileged);
  const touchesRestricted = input.items.some((i) => i.mucPhanLoai === "HAN_CHE" || i.mucPhanLoai === "MAT");

  const created = await prisma.$transaction(async (tx) => {
    const r = await tx.m28AccessRequest.create({
      data: {
        code: "PENDING",
        subjectId: input.subjectId || null,
        subjectExternal: input.subjectExternal.trim() || null,
        subjectType: input.subjectType,
        ndaRef: input.ndaRef.trim() || null,
        awarenessTrainingRef: input.awarenessTrainingRef.trim() || null,
        requestType: input.requestType,
        reason: input.reason.trim(),
        items: input.items as never,
        // MFA bắt buộc với tài khoản đặc quyền, truy cập từ xa, thư điện tử công vụ và hệ thống
        // chứa thông tin mức Hạn chế/Mật (ETV.P28 mục 6.7.1).
        mfaRequired: hasPrivileged || touchesRestricted,
        requestedById: actor.id,
      },
    });
    return tx.m28AccessRequest.update({
      where: { id: r.id },
      data: { code: `QTC-${new Date().getFullYear()}-${String(r.seq).padStart(3, "0")}` },
    });
  });
  await logAudit("ACCESS_REQUEST", created.id, actor, "Lập phiếu yêu cầu quyền truy cập");
  revalidateM28();
  return { ok: true as const, id: created.id };
}

async function loadAccessForRules(id: string): Promise<AccessForRules> {
  const a = await prisma.m28AccessRequest.findUniqueOrThrow({
    where: { id },
    select: {
      status: true,
      subjectType: true,
      ndaRef: true,
      awarenessTrainingRef: true,
      items: true,
      requestedById: true,
      approvedById: true,
    },
  });
  const items = (Array.isArray(a.items) ? a.items : []) as unknown as AccessItem[];
  return {
    status: a.status,
    subjectType: a.subjectType,
    ndaRef: a.ndaRef,
    awarenessTrainingRef: a.awarenessTrainingRef,
    hasPrivilegedItem: items.some((i) => i?.isPrivileged),
    touchesRestrictedOrSecret: items.some((i) => i?.mucPhanLoai === "HAN_CHE" || i?.mucPhanLoai === "MAT"),
    requestedById: a.requestedById,
    approvedById: a.approvedById,
  };
}

async function applyAccessTx(id: string, r: TxResult, actor: M28ActorUser) {
  if (!r.ok) return r;
  await prisma.m28AccessRequest.update({
    where: { id },
    data: { status: r.status as never, statusReason: r.reason, ...r.patch },
  });
  await logAudit("ACCESS_REQUEST", id, actor, r.action, r.reason);
  revalidateM28([`/modules/M28/access/${id}`]);
  return { ok: true as const };
}

export async function submitAccess(id: string) {
  const actor = await getActor();
  return applyAccessTx(id, txSubmitAccess(await loadAccessForRules(id), actor), actor);
}

export async function approveAccess(id: string, pass: boolean, reason?: string) {
  const actor = await getActor();
  return applyAccessTx(id, txApproveAccess(await loadAccessForRules(id), actor, pass, reason), actor);
}

export async function executeAccess(id: string, systemLogRef: string) {
  const actor = await getActor();
  return applyAccessTx(id, txExecuteAccess(await loadAccessForRules(id), actor, systemLogRef), actor);
}

export async function revokeAccess(id: string, assetsReturned: boolean, reason: string) {
  const actor = await getActor();
  return applyAccessTx(id, txRevokeAccess(await loadAccessForRules(id), actor, assetsReturned, reason), actor);
}

export async function recordAccessReview(input: {
  period: string;
  scope: "PHONG" | "TAI_KHOAN_DAC_QUYEN";
  department: string;
  accountsReviewed: number;
  excessFound: number;
  revoked: number;
  revocationRefs: string[];
}) {
  const actor = await getActor();
  if (!["TP", "ATTT", "LDV", "QLCL"].includes(actor.m28Role ?? ""))
    return fail("FORBIDDEN", "TP rà soát quyền của phòng; LĐV rà soát tài khoản đặc quyền (ETV.P28 mục 6.7.1).");
  if (!input.period.trim()) return fail("INVALID", "Thiếu kỳ rà soát.");
  // Quyền thừa phải được thu hồi BẰNG PHIẾU, không thu hồi ngầm.
  if (input.revoked > 0 && input.revocationRefs.length === 0)
    return fail(
      "REVOCATION_REF_REQUIRED",
      "Có quyền thừa đã thu hồi thì phải dẫn chiếu phiếu thu hồi tương ứng — không thu hồi ngầm (ETV.P28 mục 6.7.1).",
    );
  const rv = await prisma.m28AccessReview.create({
    data: {
      period: input.period.trim(),
      scope: input.scope,
      department: input.department.trim() || null,
      accountsReviewed: input.accountsReviewed,
      excessFound: input.excessFound,
      revoked: input.revoked,
      revocationRefs: input.revocationRefs,
      reviewerId: actor.id,
      reviewedAt: new Date(),
    },
  });
  await logAudit("ACCESS_REVIEW", rv.id, actor, "Ghi nhận đợt rà soát quyền truy cập");
  revalidateM28();
  return { ok: true as const, id: rv.id };
}
