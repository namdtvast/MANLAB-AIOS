"use server";

// M27 — Server Actions. Logic quyết định nằm hoàn toàn ở "@/lib/m27/rules" — action này chỉ gọi
// rule rồi ghi DB, không tự quyết định gì thêm (mirror src/lib/m33/actions.ts).
//
// KHÔNG CÓ action xoá M27InfoAsset, và không được thêm: bản ghi kiểm kê giữ vĩnh viễn làm bằng
// chứng kể cả sau khi dữ liệu đã huỷ (ETV.P27 §6.7.1, Phụ lục I.2 — "Cấm tuyệt đối").
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import type {
  Classification,
  M27AssetType,
  M27BackupFrequency,
  M27CiaLevel,
  M27DataDomain,
  M27DisposalMethod,
} from "@/generated/prisma/enums";
import { getActor } from "./actor";
import {
  computeReviewCycleMonths,
  txApproveAsset,
  txApproveRuleVersion,
  txCancelAsset,
  txMarkAssetReviewed,
  txRecordRestoreTest,
  txRetireAsset,
  txReviewAsset,
  txSetAiUse,
  txSubmitAsset,
  validateAssetInput,
  type AssetForRules,
  type M27ActorUser,
  type TxResult,
} from "./rules";

type ItemType = "ASSET" | "RULE_VERSION";

async function logAudit(
  itemType: ItemType,
  itemId: string,
  actor: M27ActorUser,
  action: string,
  reason: string | null = null,
) {
  await prisma.m27AuditEntry.create({
    data: { itemType, itemId, actorId: actor.id, role: actor.m27Role ?? "—", action, reason },
  });
}

function revalidateM27(paths: string[] = []) {
  for (const p of [
    "/modules/M27",
    "/modules/M27/rules",
    "/modules/M27/due",
    "/modules/M27/personal-data",
    ...paths,
  ])
    revalidatePath(p);
}

const fail = (code: string, message: string) => ({ ok: false as const, code, message });

export async function listM27Users() {
  return prisma.user.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true, email: true } });
}

export interface AssetInput {
  name: string;
  assetType: M27AssetType;
  dataDomain: M27DataDomain;
  description: string;
  classification: Classification;
  classificationDowngradeRef: string;
  ciaC: M27CiaLevel;
  ciaI: M27CiaLevel;
  ciaA: M27CiaLevel;
  containsPersonalData: boolean;
  personalDataScope: string;
  legalBasis: string;
  ownerId: string;
  custodianId: string;
  storageLocation: string;
  systemRefs: string[];
  docRef: string;
  recordRef: string;
  datasetRefs: string[];
  retentionPeriod: string;
  retentionBasis: string;
  disposalMethod: M27DisposalMethod;
  backupRequired: boolean;
  backupFrequency: string;
  externalSharingAllowed: boolean;
  riskRefs: string[];
}

function assetData(input: AssetInput) {
  return {
    name: input.name.trim(),
    assetType: input.assetType,
    dataDomain: input.dataDomain,
    description: input.description.trim(),
    classification: input.classification,
    classificationDowngradeRef: input.classificationDowngradeRef.trim() || null,
    ciaC: input.ciaC,
    ciaI: input.ciaI,
    ciaA: input.ciaA,
    containsPersonalData: input.containsPersonalData,
    personalDataScope: input.personalDataScope.trim() || null,
    legalBasis: input.legalBasis.trim() || null,
    ownerId: input.ownerId,
    custodianId: input.custodianId || null,
    storageLocation: input.storageLocation.trim(),
    systemRefs: input.systemRefs ?? [],
    docRef: input.docRef.trim() || null,
    recordRef: input.recordRef.trim() || null,
    datasetRefs: input.datasetRefs ?? [],
    retentionPeriod: input.retentionPeriod.trim(),
    retentionBasis: input.retentionBasis.trim(),
    disposalMethod: input.disposalMethod,
    backupRequired: input.backupRequired,
    backupFrequency: input.backupRequired ? ((input.backupFrequency || null) as M27BackupFrequency | null) : null,
    // Hạn chế/Mật mặc định KHÔNG được phép chia sẻ ra ngoài (ETV.P27 §6.6) — ép ở tầng dữ liệu,
    // không để giao diện quyết định.
    externalSharingAllowed:
      input.classification === "HAN_CHE" || input.classification === "MAT"
        ? false
        : input.externalSharingAllowed,
    riskRefs: input.riskRefs ?? [],
    reviewCycleMonths: computeReviewCycleMonths({
      classification: input.classification,
      containsPersonalData: input.containsPersonalData,
    }),
  };
}

export async function createAsset(input: AssetInput) {
  const actor = await getActor();
  if (actor.m27Role !== "TP" && actor.m27Role !== "QTHT" && actor.m27Role !== "QLCL")
    return fail("FORBIDDEN", "TP, QTHT hoặc QLCL khai báo tài sản vào danh mục (ETV.P27 §6.1.5 bước 1).");
  const invalid = validateAssetInput({
    name: input.name,
    description: input.description,
    assetType: input.assetType,
    ownerId: input.ownerId || null,
    custodianId: input.custodianId || null,
    systemRefs: input.systemRefs ?? [],
    storageLocation: input.storageLocation,
    retentionPeriod: input.retentionPeriod,
    retentionBasis: input.retentionBasis,
  });
  if (invalid) return fail("INVALID", invalid);

  const created = await prisma.$transaction(async (tx) => {
    const r = await tx.m27InfoAsset.create({
      data: { code: "PENDING", ...assetData(input), createdById: actor.id },
    });
    // Mã cấp một lần theo ETV.P27 §6.1.2, dạng TS-<năm>-<số thứ tự>; mã của tài sản đã huỷ
    // không bao giờ cấp lại — bảo đảm bằng `seq` autoincrement, không đếm lại bản ghi.
    return tx.m27InfoAsset.update({
      where: { id: r.id },
      data: { code: `TS-${new Date().getFullYear()}-${String(r.seq).padStart(3, "0")}` },
    });
  });
  await logAudit("ASSET", created.id, actor, "Khai báo tài sản (Nháp)");
  revalidateM27();
  return { ok: true as const, id: created.id };
}

export async function updateAsset(id: string, input: AssetInput) {
  const actor = await getActor();
  const current = await prisma.m27InfoAsset.findUniqueOrThrow({
    where: { id },
    select: { status: true, createdById: true },
  });
  if (!["DRAFT", "REVIEW_REJECTED", "APPROVAL_REJECTED"].includes(current.status))
    return fail("BAD_STATE", "Chỉ sửa được bản ghi ở Nháp hoặc bị trả lại.");
  if (actor.id !== current.createdById && actor.m27Role !== "QLCL")
    return fail("FORBIDDEN", "Chỉ người lập hoặc QLCL sửa bản ghi.");
  const invalid = validateAssetInput({
    name: input.name,
    description: input.description,
    assetType: input.assetType,
    ownerId: input.ownerId || null,
    custodianId: input.custodianId || null,
    systemRefs: input.systemRefs ?? [],
    storageLocation: input.storageLocation,
    retentionPeriod: input.retentionPeriod,
    retentionBasis: input.retentionBasis,
  });
  if (invalid) return fail("INVALID", invalid);
  await prisma.m27InfoAsset.update({ where: { id }, data: assetData(input) });
  await logAudit("ASSET", id, actor, "Cập nhật bản ghi tài sản");
  revalidateM27([`/modules/M27/asset/${id}`]);
  return { ok: true as const };
}

async function loadAssetForRules(id: string): Promise<AssetForRules> {
  const a = await prisma.m27InfoAsset.findUniqueOrThrow({
    where: { id },
    select: {
      status: true,
      assetType: true,
      dataDomain: true,
      classification: true,
      classificationDowngradeRef: true,
      ciaC: true,
      ciaI: true,
      ciaA: true,
      containsPersonalData: true,
      legalBasis: true,
      ownerId: true,
      custodianId: true,
      systemRefs: true,
      retentionPeriod: true,
      retentionBasis: true,
      backupRequired: true,
      backupFrequency: true,
      aiUseAllowed: true,
      riskRefs: true,
      createdById: true,
      owner: { select: { id: true } },
    },
  });
  // `ownerActive`: nền tảng chưa có cột đánh dấu nhân sự đã nghỉ việc (User không có trường đó),
  // nên tạm coi chủ sở hữu còn hiệu lực khi bản ghi User còn tồn tại. Khi M03 cấp trạng thái
  // nhân sự, thay bằng cờ thật — đây là chỗ duy nhất phải sửa (ETV.P27 §6.8, Phụ lục I.1 đk 1).
  const { owner, ...rest } = a;
  return { ...rest, ownerActive: Boolean(owner) };
}

async function applyAssetTx(id: string, r: TxResult, actor: M27ActorUser) {
  if (!r.ok) return r;
  await prisma.m27InfoAsset.update({
    where: { id },
    data: { status: r.status as never, reason: r.reason, ...r.patch },
  });
  await logAudit("ASSET", id, actor, r.action, r.reason);
  revalidateM27([`/modules/M27/asset/${id}`]);
  return { ok: true as const };
}

export async function submitAsset(id: string) {
  const actor = await getActor();
  return applyAssetTx(id, txSubmitAsset(await loadAssetForRules(id), actor), actor);
}

export async function reviewAsset(id: string, pass: boolean, reason?: string) {
  const actor = await getActor();
  return applyAssetTx(id, txReviewAsset(await loadAssetForRules(id), actor, pass, reason), actor);
}

export async function approveAsset(id: string, pass: boolean, reason?: string) {
  const actor = await getActor();
  return applyAssetTx(id, txApproveAsset(await loadAssetForRules(id), actor, pass, reason), actor);
}

export async function cancelAsset(id: string, reason: string) {
  const actor = await getActor();
  return applyAssetTx(id, txCancelAsset(await loadAssetForRules(id), actor, reason), actor);
}

export async function retireAsset(id: string, reason: string) {
  const actor = await getActor();
  return applyAssetTx(id, txRetireAsset(await loadAssetForRules(id), actor, reason), actor);
}

export async function markAssetReviewed(id: string) {
  const actor = await getActor();
  return applyAssetTx(id, txMarkAssetReviewed(await loadAssetForRules(id), actor), actor);
}

export async function recordRestoreTest(id: string, passed: boolean, evidenceRef: string) {
  const actor = await getActor();
  return applyAssetTx(id, txRecordRestoreTest(await loadAssetForRules(id), actor, passed, evidenceRef), actor);
}

export async function setAiUse(id: string, allowed: boolean) {
  const actor = await getActor();
  return applyAssetTx(id, txSetAiUse(await loadAssetForRules(id), actor, allowed), actor);
}

export async function approveRuleVersion(id: string, pass: boolean, reason?: string) {
  const actor = await getActor();
  const v = await prisma.m27RuleVersion.findUniqueOrThrow({ where: { id }, select: { status: true } });
  const r = txApproveRuleVersion(v, actor, pass, reason);
  if (!r.ok) return r;
  await prisma.$transaction(async (tx) => {
    if (r.status === "DA_PHE_DUYET") {
      // Phiên bản cũ chuyển Hết hiệu lực — mỗi lần sửa tạo phiên bản mới, không sửa đè;
      // phiên bản cũ giữ làm bằng chứng (ETV.P27 §6.3).
      await tx.m27RuleVersion.updateMany({
        where: { status: "DA_PHE_DUYET", id: { not: id } },
        data: { status: "HET_HIEU_LUC" },
      });
    }
    await tx.m27RuleVersion.update({
      where: { id },
      data: { status: r.status as never, note: r.reason, ...r.patch },
    });
  });
  await logAudit("RULE_VERSION", id, actor, r.action, r.reason);
  revalidateM27();
  return { ok: true as const };
}
