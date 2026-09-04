"use server";

// M33 — Server Actions. Logic quyết định nằm hoàn toàn ở "@/lib/m33/rules" — action này chỉ gọi
// rule rồi ghi DB, không tự quyết định gì thêm (mirror src/lib/m25/actions.ts).
// Không có action nào XÓA M33ITAsset/M33SystemAccount — thiết bị có thể rời Viện, bản ghi kiểm kê
// thì không (ETV.P33 Phụ lục II.1); mã tài sản không cấp lại (R22).
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import type {
  M33AccountType,
  M33AssetClass,
  M33Criticality,
  M33DiscoverySource,
  M33Environment,
  M33Impact,
  M33IncidentKind,
  M33MaintenanceCycle,
  M33MaintenanceType,
  M33NetworkZone,
  M33Severity,
  Classification,
} from "@/generated/prisma/enums";
import { getActor } from "./actor";
import {
  computeIncidentDue,
  computePriority,
  patchDueAt,
  txAcceptTask,
  txApproveAsset,
  txApprovePlan,
  txCancelAsset,
  txCancelIncident,
  txCancelTask,
  txCloseIncident,
  txCloseRecon,
  txDisposeAsset,
  txFlagOrphanAccount,
  txIsolateAsset,
  txLockAccount,
  txUnlockAccount,
  txMarkAssetReviewed,
  txMarkResolved,
  txPerformTask,
  txResumeAsset,
  txRetireAsset,
  txRevokeAccount,
  TRANG_THAI_NGUOI_DUNG,
  txReviewAsset,
  txRespondIncident,
  txStartTask,
  txSubmitAsset,
  txSubmitPlan,
  txSuspendAsset,
  validateAccountInput,
  validateAssetInput,
  validateIncidentInput,
  validateTaskInput,
  canEditAsset,
  type M33ActorUser,
  type TxResult,
} from "./rules";

type ItemType = "ASSET" | "PLAN" | "TASK" | "ACCOUNT" | "RECONCILIATION" | "INCIDENT";

async function logAudit(itemType: ItemType, itemId: string, actor: M33ActorUser, action: string, reason: string | null = null) {
  await prisma.m33AuditEntry.create({
    data: { itemType, itemId, actorId: actor.id, role: actor.m33Role ?? "—", action, reason },
  });
}

function revalidateM33(paths: string[] = []) {
  for (const p of ["/modules/M33", "/modules/M33/plan", "/modules/M33/maintenance", "/modules/M33/accounts", "/modules/M33/accounts/reconciliation", "/modules/M33/incidents", "/modules/M33/due", "/modules/M33/undiscovered", "/modules/M33/report", ...paths])
    revalidatePath(p);
}

const fail = (code: string, message: string) => ({ ok: false as const, code, message });

export async function listM33Users() {
  return prisma.user.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true, email: true } });
}

// ---------- ITAsset ----------

export interface AssetInput {
  name: string;
  assetClass: M33AssetClass;
  model?: string | null;
  serial?: string | null;
  networkZone?: M33NetworkZone | null;
  environment: M33Environment;
  location: string;
  userOwnerId: string;
  custodianId: string;
  criticality: M33Criticality;
  platformRefs?: string[];
  infoAssetRefs?: string[];
  measuringDeviceRef?: string | null;
  maxClassification: Classification;
  diskEncryption: boolean;
  screenLock?: boolean | null;
  antimalware?: boolean | null;
  defaultPasswordChanged?: boolean | null;
  unusedServicesClosed?: boolean | null;
  osVersion?: string | null;
  isPersonalDevice?: boolean;
  byodApprovalRef?: string | null;
  licenseType?: string | null;
  licenseExpiry?: string | null;
  warrantyUntil?: string | null;
  maintenanceContractRef?: string | null;
  eolDate?: string | null;
  maintenanceCycle: M33MaintenanceCycle;
  recoveryTimeObjective?: string | null;
  failoverPlan?: string | null;
  riskRefs?: string[];
  discoverySource: M33DiscoverySource;
}

function assetData(input: AssetInput) {
  return {
    name: input.name.trim(),
    assetClass: input.assetClass,
    model: input.model?.trim() || null,
    serial: input.serial?.trim() || null,
    networkZone: input.networkZone ?? null,
    environment: input.environment,
    location: input.location.trim(),
    userOwnerId: input.userOwnerId,
    custodianId: input.custodianId,
    criticality: input.criticality,
    platformRefs: input.platformRefs ?? [],
    infoAssetRefs: input.infoAssetRefs ?? [],
    measuringDeviceRef: input.measuringDeviceRef?.trim() || null,
    maxClassification: input.maxClassification,
    diskEncryption: input.diskEncryption,
    screenLock: input.screenLock ?? null,
    antimalware: input.antimalware ?? null,
    defaultPasswordChanged: input.defaultPasswordChanged ?? null,
    unusedServicesClosed: input.unusedServicesClosed ?? null,
    osVersion: input.osVersion?.trim() || null,
    isPersonalDevice: input.isPersonalDevice ?? false,
    byodApprovalRef: input.byodApprovalRef?.trim() || null,
    licenseType: input.licenseType?.trim() || null,
    licenseExpiry: input.licenseExpiry ? new Date(input.licenseExpiry) : null,
    warrantyUntil: input.warrantyUntil ? new Date(input.warrantyUntil) : null,
    maintenanceContractRef: input.maintenanceContractRef?.trim() || null,
    eolDate: input.eolDate ? new Date(input.eolDate) : null,
    maintenanceCycle: input.maintenanceCycle,
    recoveryTimeObjective: input.recoveryTimeObjective?.trim() || null,
    failoverPlan: input.failoverPlan?.trim() || null,
    riskRefs: input.riskRefs ?? [],
    discoverySource: input.discoverySource,
  };
}

export async function createAsset(input: AssetInput) {
  const actor = await getActor();
  if (actor.m33Role !== "QTHT" && actor.m33Role !== "VP")
    return fail("FORBIDDEN", "QTHT/VP khai báo tài sản vào danh mục (ETV.P33 §6.1.4).");
  const invalid = validateAssetInput({ ...input, freeTexts: [input.name, input.location, input.model, input.osVersion] });
  if (invalid) return fail("INVALID", invalid);
  const created = await prisma.$transaction(async (tx) => {
    const r = await tx.m33ITAsset.create({
      data: {
        code: "PENDING",
        ...assetData(input),
        reviewCycleMonths: input.criticality === "CAO" ? 12 : 12,
        inventoryDueAt: input.discoverySource === "PHAT_HIEN_CHUA_KIEM_KE" ? new Date(Date.now() + 30 * 86_400_000) : null,
        createdById: actor.id,
      },
    });
    return tx.m33ITAsset.update({
      where: { id: r.id },
      data: { code: `HT-${new Date().getFullYear()}-${String(r.seq).padStart(4, "0")}` },
    });
  });
  await logAudit("ASSET", created.id, actor, "Khai báo tài sản (Nháp)");
  revalidateM33();
  return { ok: true as const, id: created.id };
}

export async function updateAsset(id: string, input: AssetInput) {
  const actor = await getActor();
  const a = await prisma.m33ITAsset.findUniqueOrThrow({ where: { id }, select: { status: true } });
  if (!canEditAsset(a.status)) return fail("LOCKED", "Bản ghi đã gửi soát xét/đã phê duyệt — dùng thao tác vận hành thay vì sửa trực tiếp (ETV.P33 Phụ lục II.1).");
  const invalid = validateAssetInput({ ...input, freeTexts: [input.name, input.location, input.model, input.osVersion] });
  if (invalid) return fail("INVALID", invalid);
  await prisma.m33ITAsset.update({
    where: { id },
    data: {
      ...assetData(input),
      inventoryDueAt: input.discoverySource === "PHAT_HIEN_CHUA_KIEM_KE" ? new Date(Date.now() + 30 * 86_400_000) : null,
    },
  });
  await logAudit("ASSET", id, actor, "Cập nhật bản ghi (khi chưa phê duyệt)");
  revalidateM33([`/modules/M33/asset/${id}`]);
  return { ok: true as const };
}

// QTHT cập nhật trường vận hành trên tài sản đã phê duyệt: refs mềm, vá lỗi, EOL, bằng chứng xóa dữ liệu
export async function updateOperationalFields(
  id: string,
  input: {
    platformRefs?: string[];
    infoAssetRefs?: string[];
    measuringDeviceRef?: string | null;
    riskRefs?: string[];
    replacementPlan?: string | null;
    patchLevel?: string | null;
    lastPatchedAt?: string | null;
    disposalEvidenceRef?: string | null;
    handoverRecordRef?: string | null;
    networkIsolated?: boolean;
  },
) {
  const actor = await getActor();
  if (actor.m33Role !== "QTHT") return fail("FORBIDDEN", "QTHT cập nhật thông tin vận hành của tài sản.");
  await prisma.m33ITAsset.update({
    where: { id },
    data: {
      ...(input.platformRefs !== undefined ? { platformRefs: input.platformRefs } : {}),
      ...(input.infoAssetRefs !== undefined ? { infoAssetRefs: input.infoAssetRefs } : {}),
      ...(input.measuringDeviceRef !== undefined ? { measuringDeviceRef: input.measuringDeviceRef?.trim() || null } : {}),
      ...(input.riskRefs !== undefined ? { riskRefs: input.riskRefs } : {}),
      ...(input.replacementPlan !== undefined ? { replacementPlan: input.replacementPlan?.trim() || null } : {}),
      ...(input.patchLevel !== undefined ? { patchLevel: input.patchLevel?.trim() || null } : {}),
      ...(input.lastPatchedAt !== undefined ? { lastPatchedAt: input.lastPatchedAt ? new Date(input.lastPatchedAt) : null } : {}),
      ...(input.disposalEvidenceRef !== undefined ? { disposalEvidenceRef: input.disposalEvidenceRef?.trim() || null } : {}),
      ...(input.handoverRecordRef !== undefined ? { handoverRecordRef: input.handoverRecordRef?.trim() || null } : {}),
      ...(input.networkIsolated !== undefined ? { networkIsolated: input.networkIsolated } : {}),
    },
  });
  await logAudit("ASSET", id, actor, "Cập nhật thông tin vận hành (refs/vá lỗi/EOL/bằng chứng)");
  revalidateM33([`/modules/M33/asset/${id}`]);
  return { ok: true as const };
}

async function loadAssetForRules(id: string) {
  return prisma.m33ITAsset.findUniqueOrThrow({
    where: { id },
    select: {
      id: true,
      status: true,
      assetClass: true,
      userOwnerId: true,
      custodianId: true,
      criticality: true,
      maxClassification: true,
      diskEncryption: true,
      screenLock: true,
      antimalware: true,
      defaultPasswordChanged: true,
      unusedServicesClosed: true,
      isPersonalDevice: true,
      byodApprovalRef: true,
      licenseType: true,
      licenseExpiry: true,
      measuringDeviceRef: true,
      recoveryTimeObjective: true,
      failoverPlan: true,
      riskRefs: true,
      platformRefs: true,
      infoAssetRefs: true,
      disposalEvidenceRef: true,
      createdById: true,
    },
  });
}

async function applyAssetTx(id: string, r: TxResult, actor: M33ActorUser) {
  if (!r.ok) return r;
  await prisma.m33ITAsset.update({ where: { id }, data: { status: r.status as never, reason: r.reason, ...r.patch } });
  await logAudit("ASSET", id, actor, r.action, r.reason);
  revalidateM33([`/modules/M33/asset/${id}`]);
  return { ok: true as const };
}

export async function submitAsset(id: string) {
  const actor = await getActor();
  return applyAssetTx(id, txSubmitAsset(await loadAssetForRules(id)), actor);
}

export async function reviewAsset(id: string, pass: boolean, reason?: string) {
  const actor = await getActor();
  return applyAssetTx(id, txReviewAsset(await loadAssetForRules(id), actor, pass, reason), actor);
}

export async function approveAsset(id: string, pass: boolean, reason?: string) {
  const actor = await getActor();
  return applyAssetTx(id, txApproveAsset(await loadAssetForRules(id), actor, pass, reason), actor);
}

export async function suspendAsset(id: string, reason?: string) {
  const actor = await getActor();
  return applyAssetTx(id, txSuspendAsset(await loadAssetForRules(id), actor, reason), actor);
}

export async function resumeAsset(id: string) {
  const actor = await getActor();
  return applyAssetTx(id, txResumeAsset(await loadAssetForRules(id), actor), actor);
}

export async function retireAsset(id: string, reason?: string) {
  const actor = await getActor();
  return applyAssetTx(id, txRetireAsset(await loadAssetForRules(id), actor, reason), actor);
}

export async function disposeAsset(id: string, reason?: string) {
  const actor = await getActor();
  const activeAccounts = await prisma.m33SystemAccount.count({ where: { assetId: id, status: { not: "DA_THU_HOI" } } });
  return applyAssetTx(id, txDisposeAsset(await loadAssetForRules(id), actor, activeAccounts, reason), actor);
}

export async function cancelAsset(id: string, reason?: string) {
  const actor = await getActor();
  return applyAssetTx(id, txCancelAsset(await loadAssetForRules(id), actor, reason), actor);
}

export async function markAssetReviewed(id: string) {
  const actor = await getActor();
  const a = await loadAssetForRules(id);
  return applyAssetTx(id, txMarkAssetReviewed(a, actor, a.custodianId), actor);
}

export async function isolateAsset(id: string, reason?: string) {
  const actor = await getActor();
  return applyAssetTx(id, txIsolateAsset(await loadAssetForRules(id), actor, reason), actor);
}

// ---------- Kế hoạch bảo trì năm ----------

export async function createPlan(input: { year: number; scopeAssetIds: string[]; downtimeNeeds?: string | null; resourceNeeds?: string | null }) {
  const actor = await getActor();
  if (actor.m33Role !== "VP" && actor.m33Role !== "QTHT")
    return fail("FORBIDDEN", "Văn phòng chủ trì lập kế hoạch bảo trì năm (R19 — ETV.P33 §6.3.1).");
  if (!input.year || input.scopeAssetIds.length === 0)
    return fail("INVALID", "Bắt buộc năm kế hoạch và ít nhất 1 tài sản trong phạm vi (R19).");
  const created = await prisma.$transaction(async (tx) => {
    const r = await tx.m33MaintenancePlan.create({
      data: {
        code: "PENDING",
        year: input.year,
        downtimeNeeds: input.downtimeNeeds?.trim() || null,
        resourceNeeds: input.resourceNeeds?.trim() || null,
        createdById: actor.id,
        scopeAssets: { connect: input.scopeAssetIds.map((id) => ({ id })) },
      },
    });
    return tx.m33MaintenancePlan.update({ where: { id: r.id }, data: { code: `KHBT-${input.year}-${String(r.seq).padStart(2, "0")}` } });
  });
  await logAudit("PLAN", created.id, actor, `Lập kế hoạch bảo trì năm ${input.year} (Nháp)`);
  revalidateM33();
  return { ok: true as const, id: created.id };
}

export async function submitPlan(id: string) {
  const actor = await getActor();
  const p = await prisma.m33MaintenancePlan.findUniqueOrThrow({ where: { id }, include: { _count: { select: { scopeAssets: true } } } });
  const r = txSubmitPlan({ status: p.status, scopeAssetCount: p._count.scopeAssets });
  if (!r.ok) return r;
  await prisma.m33MaintenancePlan.update({ where: { id }, data: { status: r.status as never } });
  await logAudit("PLAN", id, actor, r.action);
  revalidateM33();
  return { ok: true as const };
}

export async function approvePlan(id: string, pass: boolean, reason?: string) {
  const actor = await getActor();
  const p = await prisma.m33MaintenancePlan.findUniqueOrThrow({ where: { id }, select: { status: true, createdById: true } });
  const r = txApprovePlan(p, actor, pass, reason);
  if (!r.ok) return r;
  await prisma.m33MaintenancePlan.update({ where: { id }, data: { status: r.status as never, reason: r.reason, ...r.patch } });
  await logAudit("PLAN", id, actor, r.action, r.reason);
  revalidateM33();
  return { ok: true as const };
}

// ---------- Bảo trì, vá lỗi ----------

export async function createTask(input: {
  taskType: M33MaintenanceType;
  severity?: M33Severity | null;
  assetIds: string[];
  planId?: string | null;
  plannedAt?: string | null;
  changeRef?: string | null;
  impactAssessmentRef?: string | null;
  measurementImpactRef?: string | null;
  methodImpactRef?: string | null;
  emergencyOrderRef?: string | null;
}) {
  const actor = await getActor();
  if (actor.m33Role !== "QTHT") return fail("FORBIDDEN", "QTHT lập công việc bảo trì, vá lỗi (ETV.P33 §6.3.2).");
  const invalid = validateTaskInput({ taskType: input.taskType, severity: input.severity, assetCount: input.assetIds.length, planId: input.planId });
  if (invalid) return fail("INVALID", invalid);
  const planned = input.plannedAt ? new Date(input.plannedAt) : new Date();
  const dueAt =
    input.taskType === "VA_LOI_BAO_MAT" && input.severity ? patchDueAt(input.severity, planned) : input.plannedAt ? planned : null;
  const created = await prisma.$transaction(async (tx) => {
    const r = await tx.m33MaintenanceTask.create({
      data: {
        code: "PENDING",
        taskType: input.taskType,
        severity: input.severity ?? null,
        plannedAt: planned,
        dueAt,
        planId: input.planId || null,
        changeRef: input.changeRef?.trim() || null,
        impactAssessmentRef: input.impactAssessmentRef?.trim() || null,
        measurementImpactRef: input.measurementImpactRef?.trim() || null,
        methodImpactRef: input.methodImpactRef?.trim() || null,
        emergencyOrderRef: input.emergencyOrderRef?.trim() || null,
        createdById: actor.id,
        assets: { connect: input.assetIds.map((id) => ({ id })) },
      },
    });
    return tx.m33MaintenanceTask.update({ where: { id: r.id }, data: { code: `BT-${new Date().getFullYear()}-${String(r.seq).padStart(4, "0")}` } });
  });
  await logAudit("TASK", created.id, actor, "Lập công việc bảo trì/vá lỗi");
  revalidateM33();
  return { ok: true as const, id: created.id };
}

async function loadTaskForRules(id: string) {
  const t = await prisma.m33MaintenanceTask.findUniqueOrThrow({
    where: { id },
    include: { plan: { select: { status: true } }, assets: { select: { id: true, assetClass: true } } },
  });
  return {
    row: t,
    forRules: {
      status: t.status,
      taskType: t.taskType,
      severity: t.severity,
      planId: t.planId,
      planApproved: t.plan?.status === "DA_PHE_DUYET",
      hasControlComputer: t.assets.some((a) => a.assetClass === "MAY_TINH_DIEU_KHIEN_DO"),
      changeRef: t.changeRef,
      impactAssessmentRef: t.impactAssessmentRef,
      measurementImpactRef: t.measurementImpactRef,
      emergencyOrderRef: t.emergencyOrderRef,
      performedById: t.performedById,
    },
  };
}

export async function startTask(id: string) {
  const actor = await getActor();
  const { forRules } = await loadTaskForRules(id);
  const r = txStartTask(forRules, actor);
  if (!r.ok) return r;
  await prisma.m33MaintenanceTask.update({ where: { id }, data: { status: r.status as never } });
  await logAudit("TASK", id, actor, r.action);
  revalidateM33();
  return { ok: true as const };
}

export async function performTask(id: string, input: { result: string; evidenceRef?: string | null; postCheckResult?: string | null; userNotified?: boolean }) {
  const actor = await getActor();
  const { forRules } = await loadTaskForRules(id);
  const r = txPerformTask(forRules, actor, input);
  if (!r.ok) return r;
  await prisma.m33MaintenanceTask.update({
    where: { id },
    data: { status: r.status as never, ...(input.userNotified ? { userNotifiedAt: new Date() } : {}), ...r.patch, result: input.result as never },
  });
  await logAudit("TASK", id, actor, r.action);
  revalidateM33();
  return { ok: true as const };
}

export async function acceptTask(id: string) {
  const actor = await getActor();
  const { row, forRules } = await loadTaskForRules(id);
  const r = txAcceptTask(forRules, actor);
  if (!r.ok) return r;
  await prisma.$transaction(async (tx) => {
    await tx.m33MaintenanceTask.update({ where: { id }, data: { status: r.status as never, ...r.patch } });
    // Sau nghiệm thu: cập nhật mốc bảo trì gần nhất trên các tài sản (ETV.P33 §6.3.2 bước 6)
    await tx.m33ITAsset.updateMany({
      where: { id: { in: row.assets.map((a) => a.id) } },
      data: { lastMaintainedAt: new Date(), ...(row.taskType === "VA_LOI_BAO_MAT" ? { lastPatchedAt: new Date() } : {}) },
    });
  });
  await logAudit("TASK", id, actor, r.action);
  revalidateM33();
  return { ok: true as const };
}

export async function cancelTask(id: string, reason?: string) {
  const actor = await getActor();
  const { forRules } = await loadTaskForRules(id);
  const r = txCancelTask(forRules, actor, reason);
  if (!r.ok) return r;
  await prisma.m33MaintenanceTask.update({ where: { id }, data: { status: r.status as never, reason: r.reason } });
  await logAudit("TASK", id, actor, r.action, r.reason);
  revalidateM33();
  return { ok: true as const };
}

// ---------- Tài khoản hệ thống ----------

// Sổ F33.03 → hiệu lực đăng nhập ManLab. Chỉ bản ghi khai platformUserId mới cắt đăng nhập; bản
// ghi của email công vụ hay tài khoản trên một thiết bị thì không đụng tới bảng User.
// Luôn gọi TRONG CÙNG transaction với lần cập nhật sổ — sổ ghi "đã thu hồi" mà người đó vẫn đăng
// nhập được chính là lỗ hổng mà thay đổi này sinh ra để bịt (ETV.P28 §6.7.1).
async function dongBoTaiKhoanNenTang(
  tx: Parameters<Parameters<typeof prisma.$transaction>[0]>[0],
  platformUserId: string | null,
  trangThaiSo: keyof typeof TRANG_THAI_NGUOI_DUNG,
  reason: string | null,
) {
  if (!platformUserId) return;
  await tx.user.update({
    where: { id: platformUserId },
    data: {
      accountStatus: TRANG_THAI_NGUOI_DUNG[trangThaiSo],
      accountStatusAt: new Date(),
      accountStatusReason: reason,
    },
  });
}


export async function createAccount(input: {
  loginName: string;
  accountType: M33AccountType;
  assetId?: string | null;
  platformRef?: string | null;
  holderId?: string | null;
  holderNote?: string | null;
  platformUserId?: string | null;
  accessRequestRef: string;
  secretLocation: string;
  secretIssuer: string;
  mfaEnabled: boolean;
  validUntil?: string | null;
  sharedApprovalRef?: string | null;
}) {
  const actor = await getActor();
  if (actor.m33Role !== "QTHT") return fail("FORBIDDEN", "QTHT ghi nhận tài khoản đã tạo theo phiếu M28 — người thực hiện, không phải người phê duyệt (R6).");
  const invalid = validateAccountInput({ ...input, freeTexts: [input.loginName, input.holderNote, input.secretLocation] });
  if (invalid) return fail("INVALID", invalid);
  const created = await prisma.$transaction(async (tx) => {
    const r = await tx.m33SystemAccount.create({
      data: {
        code: "PENDING",
        loginName: input.loginName.trim(),
        accountType: input.accountType,
        assetId: input.assetId || null,
        platformRef: input.platformRef?.trim() || null,
        holderId: input.holderId || null,
        holderNote: input.holderNote?.trim() || null,
        platformUserId: input.platformUserId || null,
        accessRequestRef: input.accessRequestRef.trim(),
        grantedAt: new Date(),
        secretLocation: input.secretLocation.trim(),
        secretIssuer: input.secretIssuer.trim(),
        mfaEnabled: input.mfaEnabled,
        validUntil: input.validUntil ? new Date(input.validUntil) : null,
        sharedApprovalRef: input.sharedApprovalRef?.trim() || null,
      },
    });
    return tx.m33SystemAccount.update({ where: { id: r.id }, data: { code: `TK-${new Date().getFullYear()}-${String(r.seq).padStart(4, "0")}` } });
  });
  await logAudit("ACCOUNT", created.id, actor, "Ghi nhận tài khoản theo phiếu F28.04");
  revalidateM33();
  return { ok: true as const, id: created.id };
}

export async function lockAccount(id: string, reason?: string) {
  return doiTrangThaiTaiKhoan(id, (s, actor) => txLockAccount(s, actor, reason));
}

// §6.4.3 — khóa tạm là để chờ PT.ATTT xem xét, nên phải có lối ra. Xem txUnlockAccount.
export async function unlockAccount(id: string, reason?: string) {
  return doiTrangThaiTaiKhoan(id, (s, actor) => txUnlockAccount(s, actor, reason));
}

export async function revokeAccount(id: string, reason?: string) {
  return doiTrangThaiTaiKhoan(id, (s, actor) => txRevokeAccount(s, actor, reason));
}

export async function flagOrphanAccount(id: string) {
  return doiTrangThaiTaiKhoan(id, (s, actor) => txFlagOrphanAccount(s, actor));
}

// Bốn action trên chỉ khác nhau ở rule được gọi — phần còn lại (đọc bản ghi, ghi sổ, đồng bộ hiệu
// lực đăng nhập, ghi vết) phải giống hệt nhau, nên viết một lần ở đây thay vì lặp bốn lần và để
// một bản quên mất bước đồng bộ.
async function doiTrangThaiTaiKhoan(id: string, quyetDinh: (s: { status: string }, actor: M33ActorUser) => TxResult) {
  const actor = await getActor();
  const s = await prisma.m33SystemAccount.findUniqueOrThrow({
    where: { id },
    select: { status: true, platformUserId: true },
  });
  const r = quyetDinh(s, actor);
  if (!r.ok) return r;
  await prisma.$transaction(async (tx) => {
    await tx.m33SystemAccount.update({
      where: { id },
      data: { status: r.status as never, reason: r.reason, ...r.patch },
    });
    await dongBoTaiKhoanNenTang(tx, s.platformUserId, r.status as keyof typeof TRANG_THAI_NGUOI_DUNG, r.reason);
  });
  await logAudit("ACCOUNT", id, actor, r.action, r.reason);
  revalidateM33();
  return { ok: true as const };
}

// R16 — biến động nhân sự (← M03): hạn thu hồi = CUỐI NGÀY LÀM VIỆC phát sinh sự kiện
export async function recordHrEvent(id: string, hrEventRef: string) {
  const actor = await getActor();
  if (actor.m33Role !== "QTHT") return fail("FORBIDDEN", "QTHT ghi nhận biến động nhân sự cho tài khoản.");
  if (!hrEventRef.trim()) return fail("INVALID", "Bắt buộc dẫn sự kiện nhân sự (← M03).");
  const eod = new Date();
  eod.setHours(23, 59, 59, 0);
  await prisma.m33SystemAccount.update({ where: { id }, data: { hrEventRef: hrEventRef.trim(), revocationDueAt: eod } });
  await logAudit("ACCOUNT", id, actor, "Biến động nhân sự — vào hàng chờ thu hồi trong ngày làm việc (R16)", hrEventRef.trim());
  revalidateM33();
  return { ok: true as const };
}

// ---------- Kỳ đối chiếu tài khoản ----------

export async function createReconciliation(input: { period: string; scope: "TOAN_BO" | "DAC_QUYEN_DICH_VU"; orphanAccountIds?: string[]; orphanRequestRefs?: string[] }) {
  const actor = await getActor();
  if (actor.m33Role !== "QTHT") return fail("FORBIDDEN", "QTHT mở kỳ đối chiếu tài khoản (R20 — ETV.P33 §6.4.2).");
  if (!input.period.trim()) return fail("INVALID", "Bắt buộc kỳ (vd 2026-H1).");
  const dup = await prisma.m33AccountReconciliation.count({ where: { period: input.period.trim(), scope: input.scope } });
  if (dup > 0) return fail("DUP", "Kỳ đối chiếu này đã tồn tại.");
  const now = new Date();
  // Hai nhóm tính tự động từ danh mục; hai nhóm đối chiếu với M28 (chưa lên nền tảng) nhập tay
  const [expired, mfaMissing] = await Promise.all([
    prisma.m33SystemAccount.findMany({ where: { status: "DANG_HOAT_DONG", validUntil: { lt: now } }, select: { id: true } }),
    prisma.m33SystemAccount.findMany({ where: { status: "DANG_HOAT_DONG", accountType: "DAC_QUYEN_QUAN_TRI", mfaEnabled: false }, select: { id: true } }),
  ]);
  const created = await prisma.$transaction(async (tx) => {
    const r = await tx.m33AccountReconciliation.create({
      data: {
        code: "PENDING",
        period: input.period.trim(),
        scope: input.scope,
        orphanAccountIds: input.orphanAccountIds ?? [],
        orphanRequestRefs: input.orphanRequestRefs ?? [],
        expiredAccountIds: expired.map((e) => e.id),
        mfaMissingIds: mfaMissing.map((e) => e.id),
        performedById: actor.id,
      },
    });
    return tx.m33AccountReconciliation.update({ where: { id: r.id }, data: { code: `KYDC-${new Date().getFullYear()}-${String(r.seq).padStart(2, "0")}` } });
  });
  await logAudit("RECONCILIATION", created.id, actor, `Mở kỳ đối chiếu ${input.period.trim()}`);
  revalidateM33();
  return { ok: true as const, id: created.id };
}

export async function reviewReconciliation(id: string) {
  const actor = await getActor();
  if (actor.m33Role !== "ATTT") return fail("FORBIDDEN", "PT.ATTT rà soát kỳ đối chiếu đặc quyền – dịch vụ (ETV.P33 §6.4.2 bước 5).");
  await prisma.m33AccountReconciliation.update({ where: { id }, data: { reviewedById: actor.id } });
  await logAudit("RECONCILIATION", id, actor, "PT.ATTT rà soát kỳ đối chiếu");
  revalidateM33();
  return { ok: true as const };
}

export async function submitReconToLdv(id: string) {
  const actor = await getActor();
  if (actor.m33Role !== "QTHT" && actor.m33Role !== "ATTT") return fail("FORBIDDEN", "QTHT/PT.ATTT trình kỳ đặc quyền lên LĐV (R20).");
  await prisma.m33AccountReconciliation.update({ where: { id }, data: { submittedToLdvAt: new Date() } });
  await logAudit("RECONCILIATION", id, actor, "Trình LĐV kỳ đối chiếu đặc quyền – dịch vụ");
  revalidateM33();
  return { ok: true as const };
}

export async function closeReconciliation(id: string) {
  const actor = await getActor();
  const r0 = await prisma.m33AccountReconciliation.findUniqueOrThrow({
    where: { id },
    select: { status: true, scope: true, submittedToLdvAt: true, reviewedById: true },
  });
  const r = txCloseRecon(r0, actor);
  if (!r.ok) return r;
  await prisma.m33AccountReconciliation.update({ where: { id }, data: { status: r.status as never, ...r.patch } });
  await logAudit("RECONCILIATION", id, actor, r.action);
  revalidateM33();
  return { ok: true as const };
}

// ---------- Sự cố ----------

export async function createIncident(input: {
  kind: M33IncidentKind;
  assetIds: string[];
  description: string;
  impact: M33Impact;
  securityFlag: boolean;
  platformDown?: boolean;
  measurementAffected?: boolean;
}) {
  const actor = await getActor();
  const invalid = validateIncidentInput({ description: input.description, assetCount: input.assetIds.length, securityFlag: input.securityFlag, freeTexts: [input.description] });
  if (invalid) return fail("INVALID", invalid);
  const assets = await prisma.m33ITAsset.findMany({ where: { id: { in: input.assetIds } }, select: { criticality: true } });
  const priority = computePriority(input.impact, {
    hasCriticalAsset: assets.some((a) => a.criticality === "CAO"),
    platformDown: input.platformDown ?? false,
    measurementAffected: input.measurementAffected ?? false,
  });
  const reportedAt = new Date();
  const dues = computeIncidentDue(priority, reportedAt);
  const created = await prisma.$transaction(async (tx) => {
    const r = await tx.m33ITIncident.create({
      data: {
        code: "PENDING",
        kind: input.kind,
        reportedById: actor.id,
        reportedAt,
        description: input.description.trim(),
        impact: input.impact,
        priority,
        responseDueAt: dues.responseDueAt,
        resolutionDueAt: dues.resolutionDueAt,
        securityFlag: input.securityFlag,
        measurementImpactRef: input.measurementAffected ? "CẦN CHUYỂN M10/M11 — dừng sử dụng kết quả liên quan" : null,
        assets: { connect: input.assetIds.map((id) => ({ id })) },
      },
    });
    return tx.m33ITIncident.update({ where: { id: r.id }, data: { code: `SC-${new Date().getFullYear()}-${String(r.seq).padStart(4, "0")}` } });
  });
  await logAudit("INCIDENT", created.id, actor, `Ghi nhận ${input.kind === "SU_CO" ? "sự cố" : "yêu cầu hỗ trợ"} — mức ${priority}`);
  revalidateM33();
  return { ok: true as const, id: created.id };
}

async function loadIncidentForRules(id: string) {
  return prisma.m33ITIncident.findUniqueOrThrow({
    where: { id },
    select: {
      status: true,
      priority: true,
      securityFlag: true,
      securityIncidentRef: true,
      securityConcluded: true,
      capaRef: true,
      rootCause: true,
      resolution: true,
      assetBackToNormal: true,
      lessonRef: true,
      noLessonReason: true,
    },
  });
}

export async function respondIncident(id: string, escalatedToLdv: boolean) {
  const actor = await getActor();
  const r = txRespondIncident(await loadIncidentForRules(id), actor, escalatedToLdv);
  if (!r.ok) return r;
  await prisma.m33ITIncident.update({ where: { id }, data: { status: r.status as never, ...r.patch } });
  await logAudit("INCIDENT", id, actor, r.action);
  revalidateM33();
  return { ok: true as const };
}

// Định tuyến 5 đích theo ETV.P33 §6.5.3 (R9)
export async function routeIncident(
  id: string,
  refs: { securityIncidentRef?: string | null; platformIncidentRef?: string | null; measurementImpactRef?: string | null; continuityRef?: string | null; capaRef?: string | null; maintenanceRef?: string | null },
) {
  const actor = await getActor();
  if (actor.m33Role !== "QTHT" && actor.m33Role !== "ATTT") return fail("FORBIDDEN", "QTHT định tuyến sự cố tới thủ tục chủ (R9).");
  await prisma.m33ITIncident.update({
    where: { id },
    data: {
      ...(refs.securityIncidentRef !== undefined ? { securityIncidentRef: refs.securityIncidentRef?.trim() || null } : {}),
      ...(refs.platformIncidentRef !== undefined ? { platformIncidentRef: refs.platformIncidentRef?.trim() || null } : {}),
      ...(refs.measurementImpactRef !== undefined ? { measurementImpactRef: refs.measurementImpactRef?.trim() || null } : {}),
      ...(refs.continuityRef !== undefined ? { continuityRef: refs.continuityRef?.trim() || null } : {}),
      ...(refs.capaRef !== undefined ? { capaRef: refs.capaRef?.trim() || null } : {}),
      ...(refs.maintenanceRef !== undefined ? { maintenanceRef: refs.maintenanceRef?.trim() || null } : {}),
    },
  });
  await logAudit("INCIDENT", id, actor, "Định tuyến sự cố tới thủ tục chủ (M28/M35/M10-M11/M31/M13)");
  revalidateM33();
  return { ok: true as const };
}

// PT.ATTT xác nhận M28 đã kết luận — điều kiện mở khóa đóng phiếu có yếu tố ATTT (R9)
export async function confirmSecurityConclusion(id: string) {
  const actor = await getActor();
  if (actor.m33Role !== "ATTT") return fail("FORBIDDEN", "Chỉ PT.ATTT xác nhận kết luận của M28 — M33 không tự kết luận (R9).");
  const i = await prisma.m33ITIncident.findUniqueOrThrow({ where: { id }, select: { securityIncidentRef: true } });
  if (!i.securityIncidentRef?.trim()) return fail("ROUTE_FIRST", "Chưa định tuyến sang M28 (thiếu số phiếu F28.03).");
  await prisma.m33ITIncident.update({ where: { id }, data: { securityConcluded: true } });
  await logAudit("INCIDENT", id, actor, "Xác nhận M28 đã kết luận sự cố ATTT");
  revalidateM33();
  return { ok: true as const };
}

export async function markIncidentResolved(id: string, input: { rootCause: string; resolution: string; assetBackToNormal: boolean; lessonRef?: string | null; noLessonReason?: string | null }) {
  const actor = await getActor();
  const r = txMarkResolved(await loadIncidentForRules(id), actor);
  if (!r.ok) return r;
  await prisma.m33ITIncident.update({
    where: { id },
    data: {
      status: r.status as never,
      rootCause: input.rootCause.trim() || null,
      resolution: input.resolution.trim() || null,
      assetBackToNormal: input.assetBackToNormal,
      lessonRef: input.lessonRef?.trim() || null,
      noLessonReason: input.noLessonReason?.trim() || null,
    },
  });
  await logAudit("INCIDENT", id, actor, r.action);
  revalidateM33();
  return { ok: true as const };
}

export async function closeIncident(id: string) {
  const actor = await getActor();
  const full = await prisma.m33ITIncident.findUniqueOrThrow({ where: { id }, include: { assets: { select: { id: true } } } });
  // R9 — đếm sự cố trong 90 ngày trên cùng tài sản (kể cả phiếu này)
  const since = new Date(Date.now() - 90 * 86_400_000);
  const repeatCount = await prisma.m33ITIncident.count({
    where: { kind: "SU_CO", reportedAt: { gte: since }, assets: { some: { id: { in: full.assets.map((a) => a.id) } } } },
  });
  const r = txCloseIncident(await loadIncidentForRules(id), actor, repeatCount);
  if (!r.ok) return r;
  await prisma.m33ITIncident.update({ where: { id }, data: { status: r.status as never } });
  await logAudit("INCIDENT", id, actor, r.action);
  revalidateM33();
  return { ok: true as const };
}

export async function cancelIncident(id: string, reason?: string) {
  const actor = await getActor();
  const r = txCancelIncident(await loadIncidentForRules(id), actor, reason);
  if (!r.ok) return r;
  await prisma.m33ITIncident.update({ where: { id }, data: { status: r.status as never, reason: r.reason } });
  await logAudit("INCIDENT", id, actor, r.action, r.reason);
  revalidateM33();
  return { ok: true as const };
}
