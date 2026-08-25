"use server";

// M34 — Server Actions. Logic quyết định nằm hoàn toàn ở "@/lib/m34/rules" — action này chỉ gọi
// rule rồi ghi DB, không tự quyết định gì thêm (mirror src/lib/m25/actions.ts).
// Không có action nào XÓA M34DataSet — tập đã hủy giữ bản ghi để truy vết (ETV.P34 Phụ lục II.1).
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import type {
  M34BelowThresholdCase,
  M34DataGroup,
  M34PublishedImpact,
  M34QualityDimension,
  M34SharingType,
  Classification,
} from "@/generated/prisma/enums";
import { getActor } from "./actor";
import {
  computeReviewCycle,
  detectRealDataPatterns,
  dictionaryRequired,
  txActivateDictionary,
  txApproveAI,
  txApproveDataSet,
  txApproveSharing,
  txArchiveDataSet,
  txAssessCorrection,
  txAtttOpinion,
  txAttachValidity,
  txCancelDataSet,
  txConcludeQuality,
  txConfirmDisposalMethod,
  txDisposeDataSet,
  txExecuteSharing,
  txMarkDuplicate,
  txMarkReviewed,
  txPerformCorrection,
  txProposeDisposal,
  txReactivateDataSet,
  txRecognizeMaster,
  txRecordMeasurement,
  txRejectCorrection,
  txResolveFinding,
  txReviewDataSet,
  txRevokeAI,
  txRevokeMaster,
  txRevokeSharing,
  txSubmitDataSet,
  txSubmitSharing,
  validateAICreate,
  validateCorrectionInput,
  validateDataSetInput,
  validateSharingCreate,
  canEditDataSet,
  type M34ActorUser,
  type TxResult,
} from "./rules";

type ItemType = "DATASET" | "DICTIONARY" | "MASTER" | "FINDING" | "QUALITY" | "CORRECTION" | "SHARING" | "AI_APPROVAL";

async function logAudit(itemType: ItemType, itemId: string, actor: M34ActorUser, action: string, reason: string | null = null) {
  await prisma.m34AuditEntry.create({
    data: { itemType, itemId, actorId: actor.id, role: actor.m34Role ?? "—", action, reason },
  });
}

function revalidateM34(paths: string[] = []) {
  for (const p of ["/modules/M34", "/modules/M34/master-data", "/modules/M34/quality", "/modules/M34/corrections", "/modules/M34/sharing", "/modules/M34/ai-data", "/modules/M34/due", "/modules/M34/report", ...paths])
    revalidatePath(p);
}

const fail = (code: string, message: string) => ({ ok: false as const, code, message });

// Danh sách người dùng để chọn CSHDL/QTDL và hiển thị tên các vai phụ
export async function listM34Users() {
  return prisma.user.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true, email: true } });
}

// ---------- DataSet ----------

export interface DataSetInput {
  name: string;
  dataGroup: M34DataGroup;
  purpose: string;
  ownerId: string;
  stewardId: string;
  primaryEntererId?: string | null;
  platformRef?: string | null;
  infraRef?: string | null;
  copiesNote?: string | null;
  classification: Classification;
  hasPersonalData: boolean;
  personalDataLegalRef?: string | null;
  qualityMetricsNote?: string | null;
  activeRetention?: string | null;
  retentionBasis: string;
  readScope?: string | null;
  writeScope?: string | null;
  externalSharingNote?: string | null;
  infoAssetRef?: string | null;
  recordRef?: string | null;
  isMasterData?: boolean;
  lineageNote?: string | null;
}

export async function createDataSet(input: DataSetInput) {
  const actor = await getActor();
  const invalid = validateDataSetInput(input);
  if (invalid) return fail("INVALID", invalid);

  // R6 — bản ghi mô tả, không chứa dữ liệu thật: cảnh báo trả về kèm kết quả, không chặn
  const warnings = [
    ...detectRealDataPatterns(input.purpose),
    ...detectRealDataPatterns(input.copiesNote),
    ...detectRealDataPatterns(input.qualityMetricsNote),
  ];

  const created = await prisma.$transaction(async (tx) => {
    const r = await tx.m34DataSet.create({
      data: {
        code: "PENDING",
        name: input.name.trim(),
        dataGroup: input.dataGroup,
        purpose: input.purpose.trim(),
        ownerId: input.ownerId,
        stewardId: input.stewardId,
        primaryEntererId: input.primaryEntererId || null,
        platformRef: input.platformRef?.trim() || null,
        infraRef: input.infraRef?.trim() || null,
        copiesNote: input.copiesNote?.trim() || null,
        classification: input.classification,
        hasPersonalData: input.hasPersonalData,
        personalDataLegalRef: input.personalDataLegalRef?.trim() || null,
        qualityMetricsNote: input.qualityMetricsNote?.trim() || null,
        activeRetention: input.activeRetention?.trim() || null,
        retentionBasis: input.retentionBasis.trim(),
        readScope: input.readScope?.trim() || null,
        writeScope: input.writeScope?.trim() || null,
        externalSharingNote: input.externalSharingNote?.trim() || null,
        infoAssetRef: input.infoAssetRef?.trim() || null,
        recordRef: input.recordRef?.trim() || null,
        isMasterData: input.isMasterData ?? input.dataGroup === "DU_LIEU_CHU",
        dictionaryRequired: dictionaryRequired(input.dataGroup),
        lineageNote: input.lineageNote?.trim() || null,
        reviewCycle: computeReviewCycle(input.hasPersonalData),
        createdById: actor.id,
      },
    });
    const code = `DS-${new Date().getFullYear()}-${String(r.seq).padStart(4, "0")}`;
    return tx.m34DataSet.update({ where: { id: r.id }, data: { code } });
  });
  await logAudit("DATASET", created.id, actor, "Khai báo tập dữ liệu (Nháp)");
  revalidateM34();
  return { ok: true as const, id: created.id, warnings };
}

export async function updateDataSet(id: string, input: DataSetInput) {
  const actor = await getActor();
  const ds = await prisma.m34DataSet.findUniqueOrThrow({ where: { id }, select: { status: true } });
  if (!canEditDataSet(ds.status)) return fail("LOCKED", "Bản ghi đã gửi soát xét/đã phê duyệt — không sửa trực tiếp được (ETV.P34 Phụ lục II.1).");
  const invalid = validateDataSetInput(input);
  if (invalid) return fail("INVALID", invalid);
  await prisma.m34DataSet.update({
    where: { id },
    data: {
      name: input.name.trim(),
      dataGroup: input.dataGroup,
      purpose: input.purpose.trim(),
      ownerId: input.ownerId,
      stewardId: input.stewardId,
      primaryEntererId: input.primaryEntererId || null,
      platformRef: input.platformRef?.trim() || null,
      infraRef: input.infraRef?.trim() || null,
      copiesNote: input.copiesNote?.trim() || null,
      classification: input.classification,
      hasPersonalData: input.hasPersonalData,
      personalDataLegalRef: input.personalDataLegalRef?.trim() || null,
      qualityMetricsNote: input.qualityMetricsNote?.trim() || null,
      activeRetention: input.activeRetention?.trim() || null,
      retentionBasis: input.retentionBasis.trim(),
      readScope: input.readScope?.trim() || null,
      writeScope: input.writeScope?.trim() || null,
      externalSharingNote: input.externalSharingNote?.trim() || null,
      infoAssetRef: input.infoAssetRef?.trim() || null,
      recordRef: input.recordRef?.trim() || null,
      isMasterData: input.isMasterData ?? input.dataGroup === "DU_LIEU_CHU",
      dictionaryRequired: dictionaryRequired(input.dataGroup),
      lineageNote: input.lineageNote?.trim() || null,
      reviewCycle: computeReviewCycle(input.hasPersonalData),
    },
  });
  await logAudit("DATASET", id, actor, "Cập nhật bản ghi (khi chưa phê duyệt)");
  revalidateM34([`/modules/M34/dataset/${id}`]);
  return { ok: true as const };
}

async function loadDataSetForRules(id: string) {
  return prisma.m34DataSet.findUniqueOrThrow({
    where: { id },
    select: {
      id: true,
      status: true,
      dataGroup: true,
      ownerId: true,
      stewardId: true,
      hasPersonalData: true,
      personalDataLegalRef: true,
      retentionBasis: true,
      qualityMetricsNote: true,
      dictionaryRequired: true,
      lineageNote: true,
      createdById: true,
      classification: true,
      primaryEntererId: true,
      disposalRetentionExpired: true,
      disposalNotBasis: true,
      disposalNoDispute: true,
      disposalNoDependent: true,
      disposalAtttConfirmedById: true,
      disposalRecordRef: true,
    },
  });
}

async function applyDataSetTx(id: string, r: TxResult, actor: M34ActorUser) {
  if (!r.ok) return r;
  const { __suspendUse, ...patch } = r.patch as { __suspendUse?: boolean } & Record<string, unknown>;
  void __suspendUse;
  await prisma.m34DataSet.update({ where: { id }, data: { status: r.status as never, reason: r.reason, ...patch } });
  await logAudit("DATASET", id, actor, r.action, r.reason);
  revalidateM34([`/modules/M34/dataset/${id}`]);
  return { ok: true as const };
}

export async function submitDataSet(id: string) {
  const actor = await getActor();
  const ds = await loadDataSetForRules(id);
  const activeDict = await prisma.m34DictionaryVersion.count({ where: { dataSetId: id, status: "ACTIVE" } });
  return applyDataSetTx(id, txSubmitDataSet(ds, activeDict > 0), actor);
}

export async function reviewDataSet(id: string, pass: boolean, reason?: string) {
  const actor = await getActor();
  const ds = await loadDataSetForRules(id);
  return applyDataSetTx(id, txReviewDataSet(ds, actor, pass, reason), actor);
}

export async function markDuplicateDataSet(id: string, mergedIntoId: string, reason?: string) {
  const actor = await getActor();
  const ds = await loadDataSetForRules(id);
  return applyDataSetTx(id, txMarkDuplicate(ds, actor, mergedIntoId, reason), actor);
}

export async function approveDataSet(id: string, pass: boolean, reason?: string) {
  const actor = await getActor();
  const ds = await loadDataSetForRules(id);
  return applyDataSetTx(id, txApproveDataSet(ds, actor, pass, reason), actor);
}

export async function markDataSetReviewed(id: string) {
  const actor = await getActor();
  const ds = await loadDataSetForRules(id);
  return applyDataSetTx(id, txMarkReviewed(ds, actor), actor);
}

export async function archiveDataSet(id: string, reason?: string) {
  const actor = await getActor();
  const ds = await loadDataSetForRules(id);
  return applyDataSetTx(id, txArchiveDataSet(ds, actor, reason), actor);
}

export async function reactivateDataSet(id: string, reason?: string) {
  const actor = await getActor();
  const ds = await loadDataSetForRules(id);
  return applyDataSetTx(id, txReactivateDataSet(ds, actor, reason), actor);
}

export async function proposeDisposal(id: string, reason?: string) {
  const actor = await getActor();
  const ds = await loadDataSetForRules(id);
  return applyDataSetTx(id, txProposeDisposal(ds, actor, reason), actor);
}

// QLCL cập nhật kết quả kiểm 4 ràng buộc §6.7.2 + số biên bản hủy ← M27
export async function updateDisposalChecklist(
  id: string,
  checklist: { retentionExpired: boolean; notBasis: boolean; noDispute: boolean; noDependent: boolean; disposalRecordRef?: string | null },
) {
  const actor = await getActor();
  if (actor.m34Role !== "QLCL") return fail("FORBIDDEN", "QLCL cập nhật kết quả kiểm tra ràng buộc trước khi hủy (ETV.P34 §6.7.2).");
  const ds = await prisma.m34DataSet.findUniqueOrThrow({ where: { id }, select: { status: true } });
  if (ds.status !== "DISPOSAL_PROPOSED") return fail("BAD_STATE", "Bản ghi chưa ở bước Đề nghị hủy.");
  await prisma.m34DataSet.update({
    where: { id },
    data: {
      disposalRetentionExpired: checklist.retentionExpired,
      disposalNotBasis: checklist.notBasis,
      disposalNoDispute: checklist.noDispute,
      disposalNoDependent: checklist.noDependent,
      disposalRecordRef: checklist.disposalRecordRef?.trim() || null,
    },
  });
  await logAudit("DATASET", id, actor, "Cập nhật kiểm tra ràng buộc trước khi hủy (ETV.P34 §6.7.2)");
  revalidateM34([`/modules/M34/dataset/${id}`]);
  return { ok: true as const };
}

export async function confirmDisposalMethod(id: string) {
  const actor = await getActor();
  const ds = await loadDataSetForRules(id);
  return applyDataSetTx(id, txConfirmDisposalMethod(ds, actor), actor);
}

export async function disposeDataSet(id: string, reason?: string) {
  const actor = await getActor();
  const ds = await loadDataSetForRules(id);
  return applyDataSetTx(id, txDisposeDataSet(ds, actor, reason), actor);
}

export async function cancelDataSet(id: string, reason?: string) {
  const actor = await getActor();
  const ds = await loadDataSetForRules(id);
  return applyDataSetTx(id, txCancelDataSet(ds, actor, reason), actor);
}

// ---------- Từ điển dữ liệu ----------

export interface DictFieldInput {
  fieldName: string;
  meaning: string;
  dataType: string;
  unit?: string | null;
  validDomain?: string | null;
  required: boolean;
  validationRule?: string | null;
  example?: string | null;
}

export async function createDictionaryVersion(dataSetId: string, input: { changeRef?: string | null; fields: DictFieldInput[] }) {
  const actor = await getActor();
  if (input.fields.length === 0) return fail("FIELDS_REQUIRED", "Từ điển phải có ít nhất 1 trường (ETV.P34 §6.1.2).");
  const bad = input.fields.find((f) => !f.fieldName.trim() || !f.meaning.trim() || !f.dataType.trim());
  if (bad) return fail("FIELD_INVALID", "Mỗi trường bắt buộc: tên, ý nghĩa nghiệp vụ, kiểu dữ liệu (F34.01 phần II).");
  const last = await prisma.m34DictionaryVersion.findFirst({ where: { dataSetId }, orderBy: { version: "desc" } });
  const version = (last?.version ?? 0) + 1;
  if (version >= 2 && !input.changeRef?.trim())
    return fail("CHANGE_REF_REQUIRED", "Thay đổi từ điển là thay đổi cấu trúc dữ liệu — bắt buộc phiếu F30.02 theo ETV.P30 (R3 — ETV.P34 §6.1.2).");
  const created = await prisma.m34DictionaryVersion.create({
    data: {
      dataSetId,
      version,
      changeRef: input.changeRef?.trim() || null,
      fields: {
        create: input.fields.map((f) => ({
          fieldName: f.fieldName.trim(),
          meaning: f.meaning.trim(),
          dataType: f.dataType.trim(),
          unit: f.unit?.trim() || null,
          validDomain: f.validDomain?.trim() || null,
          required: f.required,
          validationRule: f.validationRule?.trim() || null,
          example: f.example?.trim() || null,
        })),
      },
    },
  });
  await logAudit("DICTIONARY", created.id, actor, `Tạo từ điển phiên bản ${version} (Nháp)`);
  revalidateM34([`/modules/M34/dataset/${dataSetId}`, `/modules/M34/dataset/${dataSetId}/dictionary`]);
  return { ok: true as const, id: created.id };
}

export async function activateDictionaryVersion(id: string) {
  const actor = await getActor();
  const v = await prisma.m34DictionaryVersion.findUniqueOrThrow({ where: { id } });
  const r = txActivateDictionary(v);
  if (!r.ok) return r;
  await prisma.$transaction([
    prisma.m34DictionaryVersion.updateMany({
      where: { dataSetId: v.dataSetId, status: "ACTIVE" },
      data: { status: "SUPERSEDED" },
    }),
    prisma.m34DictionaryVersion.update({ where: { id }, data: { status: "ACTIVE", effectiveDate: new Date() } }),
  ]);
  await logAudit("DICTIONARY", id, actor, r.action);
  revalidateM34([`/modules/M34/dataset/${v.dataSetId}`, `/modules/M34/dataset/${v.dataSetId}/dictionary`]);
  return { ok: true as const };
}

// ---------- Dữ liệu chủ ----------

export async function createMasterSource(input: { masterType: string; dataSetId: string; sourceSystem: string; authorizedEditors: string; syncTargets?: string[] }) {
  const actor = await getActor();
  if (!input.masterType.trim() || !input.sourceSystem.trim() || !input.authorizedEditors.trim())
    return fail("INVALID", "Bắt buộc: loại dữ liệu chủ, nguồn sự thật (hệ thống/bảng), người được phân quyền thêm/sửa (F34.01 phần III).");
  const created = await prisma.$transaction(async (tx) => {
    const r = await tx.m34MasterDataSource.create({
      data: {
        code: "PENDING",
        masterType: input.masterType.trim(),
        dataSetId: input.dataSetId,
        sourceSystem: input.sourceSystem.trim(),
        authorizedEditors: input.authorizedEditors.trim(),
        syncTargets: input.syncTargets ?? [],
      },
    });
    return tx.m34MasterDataSource.update({
      where: { id: r.id },
      data: { code: `DC-${new Date().getFullYear()}-${String(r.seq).padStart(4, "0")}` },
    });
  });
  await logAudit("MASTER", created.id, actor, "Đề nghị công nhận nguồn sự thật duy nhất");
  revalidateM34();
  return { ok: true as const, id: created.id };
}

export async function recognizeMasterSource(id: string) {
  const actor = await getActor();
  const m = await prisma.m34MasterDataSource.findUniqueOrThrow({ where: { id } });
  if (m.status !== "DE_NGHI") return fail("BAD_STATE", "Chỉ công nhận nguồn đang ở trạng thái Đề nghị.");
  const existing = await prisma.m34MasterDataSource.count({
    where: { masterType: m.masterType, status: "DA_CONG_NHAN", id: { not: id } },
  });
  const r = txRecognizeMaster(actor, existing);
  if (!r.ok) return r;
  await prisma.m34MasterDataSource.update({
    where: { id },
    data: { status: "DA_CONG_NHAN", recognizedById: actor.id, recognizedAt: new Date() },
  });
  await logAudit("MASTER", id, actor, r.action);
  revalidateM34();
  return { ok: true as const };
}

export async function revokeMasterSource(id: string, reason?: string) {
  const actor = await getActor();
  const m = await prisma.m34MasterDataSource.findUniqueOrThrow({ where: { id }, select: { status: true } });
  if (m.status !== "DA_CONG_NHAN") return fail("BAD_STATE", "Chỉ thu hồi nguồn đã công nhận.");
  const r = txRevokeMaster(actor, reason);
  if (!r.ok) return r;
  await prisma.m34MasterDataSource.update({ where: { id }, data: { status: "THU_HOI", reason: r.reason } });
  await logAudit("MASTER", id, actor, r.action, r.reason);
  revalidateM34();
  return { ok: true as const };
}

export async function addMergeMap(masterSourceId: string, input: { oldRef: string; survivingRef: string; note?: string | null }) {
  const actor = await getActor();
  if (!input.oldRef.trim() || !input.survivingRef.trim())
    return fail("INVALID", "Bắt buộc bản ghi bị gộp và bản ghi giữ lại — hợp nhất tại nguồn, giữ lịch sử ánh xạ, không xóa cứng (ETV.P34 §6.4.4).");
  const created = await prisma.m34MasterMergeMap.create({
    data: { masterSourceId, oldRef: input.oldRef.trim(), survivingRef: input.survivingRef.trim(), note: input.note?.trim() || null },
  });
  await logAudit("MASTER", masterSourceId, actor, `Hợp nhất bản ghi trùng: ${input.oldRef} → ${input.survivingRef}`);
  revalidateM34();
  return { ok: true as const, id: created.id };
}

// ---------- Bảng tra song song ----------

export async function createFinding(input: { masterSourceId: string; description: string; usedBy: string; usedFor: string; diffNote: string; causedError: boolean; capaRef?: string | null }) {
  const actor = await getActor();
  if (!input.description.trim() || !input.usedBy.trim() || !input.usedFor.trim() || !input.diffNote.trim())
    return fail("INVALID", "Bắt buộc: bảng tra là gì, ai đang dùng, dùng làm căn cứ gì, chênh lệch so với nguồn chính thức (F34.01 phần III.1).");
  if (input.causedError && !input.capaRef?.trim())
    return fail("CAPA_REQUIRED", "Đã gây sai lệch kết quả/hồ sơ — bắt buộc số KPH theo ETV.P13 (R10 — ETV.P34 §6.2.2).");
  const created = await prisma.$transaction(async (tx) => {
    const r = await tx.m34ParallelLookupFinding.create({
      data: {
        code: "PENDING",
        masterSourceId: input.masterSourceId,
        description: input.description.trim(),
        usedBy: input.usedBy.trim(),
        usedFor: input.usedFor.trim(),
        diffNote: input.diffNote.trim(),
        causedError: input.causedError,
        capaRef: input.capaRef?.trim() || null,
        stoppedAt: new Date(), // ngừng sử dụng ngay khi phát hiện (ETV.P34 §6.2.2)
        status: "DANG_XU_LY",
      },
    });
    return tx.m34ParallelLookupFinding.update({
      where: { id: r.id },
      data: { code: `BT-${new Date().getFullYear()}-${String(r.seq).padStart(4, "0")}` },
    });
  });
  await logAudit("FINDING", created.id, actor, "Ghi nhận bảng tra song song — ngừng sử dụng ngay");
  revalidateM34();
  return { ok: true as const, id: created.id };
}

export async function resolveFinding(id: string) {
  const actor = await getActor();
  const f = await prisma.m34ParallelLookupFinding.findUniqueOrThrow({ where: { id } });
  const r = txResolveFinding(f, actor);
  if (!r.ok) return r;
  await prisma.m34ParallelLookupFinding.update({ where: { id }, data: { status: "DA_XU_LY", resolvedAt: new Date() } });
  await logAudit("FINDING", id, actor, r.action);
  revalidateM34();
  return { ok: true as const };
}

// ---------- Đo chất lượng ----------

export async function createQualityMeasurement(dataSetId: string, period: string) {
  const actor = await getActor();
  if (!period.trim()) return fail("INVALID", "Bắt buộc kỳ đo (vd 2026-Q3).");
  const ds = await prisma.m34DataSet.findUniqueOrThrow({ where: { id: dataSetId }, select: { dataGroup: true, status: true } });
  if (ds.status !== "ACTIVE" && ds.status !== "ARCHIVED") return fail("BAD_STATE", "Chỉ đo chất lượng tập đã vào danh mục (Hiệu lực/Lưu trữ).");
  const dup = await prisma.m34QualityMeasurement.count({ where: { dataSetId, period: period.trim() } });
  if (dup > 0) return fail("DUP_PERIOD", "Kỳ đo này đã tồn tại cho tập dữ liệu.");
  const { REQUIRED_DIMENSIONS } = await import("./rules");
  const created = await prisma.$transaction(async (tx) => {
    const r = await tx.m34QualityMeasurement.create({
      data: {
        code: "PENDING",
        dataSetId,
        period: period.trim(),
        rows: { create: REQUIRED_DIMENSIONS[ds.dataGroup].map((dimension) => ({ dimension, metric: "", threshold: "" })) },
      },
    });
    return tx.m34QualityMeasurement.update({
      where: { id: r.id },
      data: { code: `KD-${new Date().getFullYear()}-${String(r.seq).padStart(4, "0")}` },
    });
  });
  await logAudit("QUALITY", created.id, actor, `Mở kỳ đo ${period.trim()}`);
  revalidateM34([`/modules/M34/dataset/${dataSetId}`]);
  return { ok: true as const, id: created.id };
}

export async function recordQualityRows(
  measurementId: string,
  rows: { dimension: M34QualityDimension; metric: string; method?: string | null; threshold: string; value?: string | null; passed?: boolean | null }[],
) {
  const actor = await getActor();
  const m = await prisma.m34QualityMeasurement.findUniqueOrThrow({
    where: { id: measurementId },
    include: { dataSet: { select: { dataGroup: true, primaryEntererId: true } } },
  });
  const r = txRecordMeasurement(
    { status: m.status, dataGroup: m.dataSet.dataGroup, primaryEntererId: m.dataSet.primaryEntererId, measuredById: m.measuredById, previousFailed: false },
    actor.id,
  );
  if (!r.ok) return r;
  await prisma.$transaction(async (tx) => {
    for (const row of rows) {
      await tx.m34QualityRow.update({
        where: { measurementId_dimension: { measurementId, dimension: row.dimension } },
        data: {
          metric: row.metric.trim(),
          method: row.method?.trim() || null,
          threshold: row.threshold.trim(),
          value: row.value?.trim() || null,
          passed: row.passed ?? null,
        },
      });
    }
    await tx.m34QualityMeasurement.update({
      where: { id: measurementId },
      data: { status: "DANG_DO", measuredById: actor.id, measuredAt: new Date() },
    });
  });
  await logAudit("QUALITY", measurementId, actor, "Ghi giá trị đo");
  revalidateM34([`/modules/M34/dataset/${m.dataSetId}`]);
  return { ok: true as const };
}

export async function concludeQuality(
  measurementId: string,
  input: { verdictPass: boolean; belowThresholdCase?: M34BelowThresholdCase | null; remediationPlan?: string | null; capaRef?: string | null; validityRef?: string | null; integrationRef?: string | null; trend?: string | null },
) {
  const actor = await getActor();
  const m = await prisma.m34QualityMeasurement.findUniqueOrThrow({
    where: { id: measurementId },
    include: { rows: true, dataSet: { select: { id: true, dataGroup: true, primaryEntererId: true } } },
  });
  const previous = await prisma.m34QualityMeasurement.findFirst({
    where: { dataSetId: m.dataSetId, id: { not: measurementId }, status: { in: ["DAT", "KHONG_DAT"] } },
    orderBy: { createdAt: "desc" },
    select: { status: true },
  });
  const r = txConcludeQuality(
    {
      status: m.status,
      dataGroup: m.dataSet.dataGroup,
      primaryEntererId: m.dataSet.primaryEntererId,
      measuredById: m.measuredById,
      previousFailed: previous?.status === "KHONG_DAT",
    },
    actor,
    m.rows.map((row) => ({ dimension: row.dimension, passed: row.passed, value: row.value })),
    input,
  );
  if (!r.ok) return r;
  const { __suspendUse, ...patch } = r.patch as { __suspendUse?: boolean } & Record<string, unknown>;
  await prisma.$transaction(async (tx) => {
    await tx.m34QualityMeasurement.update({
      where: { id: measurementId },
      data: {
        status: r.status as never,
        reason: r.reason,
        concludedById: actor.id,
        validityRef: input.validityRef?.trim() || null,
        integrationRef: input.integrationRef?.trim() || null,
        ...(patch as object),
        trend: (input.trend as never) ?? null,
      },
    });
    if (__suspendUse) {
      await tx.m34DataSet.update({
        where: { id: m.dataSetId },
        data: { suspendedUse: true, suspendReason: "Chất lượng dưới ngưỡng — dừng sử dụng cho tới khi khắc phục (R14/R15 — ETV.P34 §6.4.3, §6.4.4)." },
      });
    }
  });
  await logAudit("QUALITY", measurementId, actor, r.action, r.reason);
  revalidateM34([`/modules/M34/dataset/${m.dataSetId}`]);
  return { ok: true as const };
}

export async function liftSuspension(dataSetId: string, reason?: string) {
  const actor = await getActor();
  if (actor.m34Role !== "QLCL") return fail("FORBIDDEN", "QLCL gỡ cờ dừng sử dụng sau khi xác nhận đã khắc phục (ETV.P34 §6.4.4).");
  if (!reason?.trim()) return fail("REASON_REQUIRED", "Gỡ cờ dừng sử dụng bắt buộc nêu căn cứ (kỳ đo đạt lại/kết luận M10-M11).");
  await prisma.m34DataSet.update({ where: { id: dataSetId }, data: { suspendedUse: false, suspendReason: null } });
  await logAudit("DATASET", dataSetId, actor, "Gỡ cờ dừng sử dụng", reason);
  revalidateM34([`/modules/M34/dataset/${dataSetId}`]);
  return { ok: true as const };
}

// ---------- Hiệu chỉnh dữ liệu ----------

export async function createCorrection(dataSetId: string, input: { recordPointer: string; oldValue: string; newValue: string; correctionReason: string; evidenceRef?: string | null }) {
  const actor = await getActor();
  const invalid = validateCorrectionInput(input);
  if (invalid) return fail("INVALID", invalid);
  const created = await prisma.$transaction(async (tx) => {
    const r = await tx.m34DataCorrection.create({
      data: {
        code: "PENDING",
        dataSetId,
        recordPointer: input.recordPointer.trim(),
        oldValue: input.oldValue.trim(),
        newValue: input.newValue.trim(),
        correctionReason: input.correctionReason.trim(),
        evidenceRef: input.evidenceRef?.trim() || null,
        requestedById: actor.id,
      },
    });
    return tx.m34DataCorrection.update({
      where: { id: r.id },
      data: { code: `HC-${new Date().getFullYear()}-${String(r.seq).padStart(4, "0")}` },
    });
  });
  await logAudit("CORRECTION", created.id, actor, "Đề nghị hiệu chỉnh dữ liệu đã ghi nhận");
  revalidateM34([`/modules/M34/dataset/${dataSetId}`]);
  return { ok: true as const, id: created.id };
}

async function loadCorrection(id: string) {
  return prisma.m34DataCorrection.findUniqueOrThrow({
    where: { id },
    include: { dataSet: { select: { id: true, ownerId: true, stewardId: true } } },
  });
}

export async function assessCorrection(id: string, publishedImpact: M34PublishedImpact) {
  const actor = await getActor();
  const c = await loadCorrection(id);
  const r = txAssessCorrection(
    { status: c.status, publishedImpact: c.publishedImpact, validityRef: c.validityRef, validityConclusion: c.validityConclusion, requestedById: c.requestedById, ownerId: c.dataSet.ownerId },
    actor,
    c.dataSet.stewardId,
    publishedImpact,
  );
  if (!r.ok) return r;
  await prisma.m34DataCorrection.update({ where: { id }, data: { status: r.status as never, ...r.patch } });
  await logAudit("CORRECTION", id, actor, r.action);
  revalidateM34([`/modules/M34/dataset/${c.dataSetId}`]);
  return { ok: true as const };
}

export async function attachCorrectionValidity(id: string, validityRef: string, conclusion: string) {
  const actor = await getActor();
  const c = await loadCorrection(id);
  const r = txAttachValidity(
    { status: c.status, publishedImpact: c.publishedImpact, validityRef: c.validityRef, validityConclusion: c.validityConclusion, requestedById: c.requestedById, ownerId: c.dataSet.ownerId },
    actor,
    validityRef,
    conclusion,
  );
  if (!r.ok) return r;
  await prisma.m34DataCorrection.update({ where: { id }, data: { ...r.patch } });
  await logAudit("CORRECTION", id, actor, r.action);
  revalidateM34([`/modules/M34/dataset/${c.dataSetId}`]);
  return { ok: true as const };
}

export async function performCorrection(id: string, correctionRecordId: string, capaRef?: string | null) {
  const actor = await getActor();
  const c = await loadCorrection(id);
  const r = txPerformCorrection(
    { status: c.status, publishedImpact: c.publishedImpact, validityRef: c.validityRef, validityConclusion: c.validityConclusion, requestedById: c.requestedById, ownerId: c.dataSet.ownerId },
    actor,
    c.dataSet.stewardId,
    correctionRecordId,
    capaRef,
  );
  if (!r.ok) return r;
  await prisma.m34DataCorrection.update({ where: { id }, data: { status: r.status as never, approvedById: c.dataSet.ownerId, ...r.patch } });
  await logAudit("CORRECTION", id, actor, r.action);
  revalidateM34([`/modules/M34/dataset/${c.dataSetId}`]);
  return { ok: true as const };
}

export async function rejectCorrection(id: string, reason?: string) {
  const actor = await getActor();
  const c = await loadCorrection(id);
  const r = txRejectCorrection(
    { status: c.status, publishedImpact: c.publishedImpact, validityRef: c.validityRef, validityConclusion: c.validityConclusion, requestedById: c.requestedById, ownerId: c.dataSet.ownerId },
    actor,
    reason,
  );
  if (!r.ok) return r;
  await prisma.m34DataCorrection.update({ where: { id }, data: { status: "TU_CHOI", reason: r.reason } });
  await logAudit("CORRECTION", id, actor, r.action, r.reason);
  revalidateM34([`/modules/M34/dataset/${c.dataSetId}`]);
  return { ok: true as const };
}

// ---------- Khai thác, chia sẻ ----------

export async function createSharingRequest(input: {
  requestType: M34SharingType;
  dataSetId: string;
  hasCustomerData: boolean;
  recipient?: string | null;
  purpose: string;
  scopeNote: string;
  channel: string;
  useUntil?: string | null;
  legalBasis?: string | null;
}) {
  const actor = await getActor();
  const invalid = validateSharingCreate(input);
  if (invalid) return fail("INVALID", invalid);
  const created = await prisma.$transaction(async (tx) => {
    const r = await tx.m34SharingRequest.create({
      data: {
        code: "PENDING",
        requestType: input.requestType,
        dataSetId: input.dataSetId,
        hasCustomerData: input.hasCustomerData,
        requesterId: actor.id,
        recipient: input.recipient?.trim() || null,
        purpose: input.purpose.trim(),
        scopeNote: input.scopeNote.trim(),
        channel: input.channel.trim(),
        useUntil: input.useUntil ? new Date(input.useUntil) : null,
        legalBasis: input.legalBasis?.trim() || null,
        revokeDue: input.useUntil ? new Date(input.useUntil) : null,
      },
    });
    return tx.m34SharingRequest.update({
      where: { id: r.id },
      data: { code: `CS-${new Date().getFullYear()}-${String(r.seq).padStart(4, "0")}` },
    });
  });
  await logAudit("SHARING", created.id, actor, "Lập phiếu khai thác/chia sẻ (Nháp)");
  revalidateM34([`/modules/M34/dataset/${input.dataSetId}`]);
  return { ok: true as const, id: created.id };
}

async function loadSharing(id: string) {
  return prisma.m34SharingRequest.findUniqueOrThrow({
    where: { id },
    include: { dataSet: { select: { id: true, ownerId: true, hasPersonalData: true } } },
  });
}

function sharingForRules(s: Awaited<ReturnType<typeof loadSharing>>) {
  return {
    status: s.status,
    requestType: s.requestType,
    hasPersonalData: s.dataSet.hasPersonalData,
    requesterId: s.requesterId,
    atttOpinionById: s.atttOpinionById,
    approvedById: s.approvedById,
    ownerId: s.dataSet.ownerId,
    minScopeLimited: s.minScopeLimited,
    minAnonymized: s.minAnonymized,
    minAnonymizeNA: s.minAnonymizeNA,
  };
}

async function applySharingTx(id: string, dataSetId: string, r: TxResult, actor: M34ActorUser) {
  if (!r.ok) return r;
  await prisma.m34SharingRequest.update({ where: { id }, data: { status: r.status as never, reason: r.reason, ...r.patch } });
  await logAudit("SHARING", id, actor, r.action, r.reason);
  revalidateM34([`/modules/M34/dataset/${dataSetId}`]);
  return { ok: true as const };
}

export async function submitSharing(id: string) {
  const actor = await getActor();
  const s = await loadSharing(id);
  return applySharingTx(id, s.dataSetId, txSubmitSharing(sharingForRules(s)), actor);
}

export async function giveAtttOpinion(
  id: string,
  accept: boolean,
  input: { note?: string | null; minScopeLimited: boolean; minAnonymized: boolean; minAnonymizeNA?: string | null; minTimeLimited?: boolean; minProtectedChannel?: boolean; minNdaRef?: string | null; minReturnDelete?: boolean },
) {
  const actor = await getActor();
  const s = await loadSharing(id);
  const r = txAtttOpinion(sharingForRules(s), actor, accept, input);
  if (!r.ok) return r;
  const extra = accept
    ? { minTimeLimited: input.minTimeLimited ?? false, minProtectedChannel: input.minProtectedChannel ?? false, minNdaRef: input.minNdaRef?.trim() || null, minReturnDelete: input.minReturnDelete ?? false }
    : {};
  return applySharingTx(id, s.dataSetId, { ...r, patch: { ...r.patch, ...extra } }, actor);
}

export async function approveSharing(id: string, pass: boolean, reason?: string) {
  const actor = await getActor();
  const s = await loadSharing(id);
  return applySharingTx(id, s.dataSetId, txApproveSharing(sharingForRules(s), actor, pass, reason), actor);
}

export async function executeSharing(id: string, logRef?: string | null) {
  const actor = await getActor();
  const s = await loadSharing(id);
  return applySharingTx(id, s.dataSetId, txExecuteSharing(sharingForRules(s), actor, logRef), actor);
}

export async function revokeSharing(id: string, evidenceRef?: string | null) {
  const actor = await getActor();
  const s = await loadSharing(id);
  return applySharingTx(id, s.dataSetId, txRevokeSharing(sharingForRules(s), actor, evidenceRef), actor);
}

// ---------- Dữ liệu cho AI ----------

export async function createAIApproval(dataSetId: string, input: { aiPurpose: string; aiSystemRef?: string | null; aiaRef: string; mitigation: string }) {
  const actor = await getActor();
  const ds = await prisma.m34DataSet.findUniqueOrThrow({ where: { id: dataSetId }, select: { classification: true, status: true } });
  if (ds.status !== "ACTIVE") return fail("BAD_STATE", "Chỉ tập đang Hiệu lực mới đề nghị dùng cho hệ thống AI được (ETV.P34 §6.8 điều kiện 1).");
  const invalid = validateAICreate(ds.classification, input.aiaRef);
  if (invalid) return fail("INVALID", invalid);
  if (!input.mitigation.trim()) return fail("MITIGATION_REQUIRED", "Bắt buộc biện pháp giảm thiểu theo mức phân loại (R22 — ETV.P34 §6.8 điều kiện 4).");
  const created = await prisma.$transaction(async (tx) => {
    const r = await tx.m34AIDataApproval.create({
      data: {
        code: "PENDING",
        dataSetId,
        aiPurpose: input.aiPurpose as never,
        aiSystemRef: input.aiSystemRef?.trim() || null,
        aiaRef: input.aiaRef.trim(),
        mitigation: input.mitigation.trim(),
      },
    });
    return tx.m34AIDataApproval.update({
      where: { id: r.id },
      data: { code: `DAI-${new Date().getFullYear()}-${String(r.seq).padStart(4, "0")}` },
    });
  });
  await logAudit("AI_APPROVAL", created.id, actor, "Đề nghị dùng tập dữ liệu cho hệ thống AI");
  revalidateM34([`/modules/M34/dataset/${dataSetId}`]);
  return { ok: true as const, id: created.id };
}

export async function giveAIAtttOpinion(id: string) {
  const actor = await getActor();
  if (actor.m34Role !== "ATTT") return fail("FORBIDDEN", "Chỉ PT.ATTT cho ý kiến về dữ liệu cấp cho hệ thống AI (ETV.P34 §6.8 điều kiện 2).");
  const a = await prisma.m34AIDataApproval.findUniqueOrThrow({ where: { id }, select: { status: true, dataSetId: true } });
  if (a.status !== "DE_NGHI") return fail("BAD_STATE", "Hồ sơ không ở bước Đề nghị.");
  await prisma.m34AIDataApproval.update({ where: { id }, data: { atttOpinionById: actor.id } });
  await logAudit("AI_APPROVAL", id, actor, "PT.ATTT cho ý kiến");
  revalidateM34([`/modules/M34/dataset/${a.dataSetId}`]);
  return { ok: true as const };
}

export async function approveAI(id: string, pass: boolean, reason?: string) {
  const actor = await getActor();
  const a = await prisma.m34AIDataApproval.findUniqueOrThrow({ where: { id } });
  const r = txApproveAI(a, actor, pass, reason);
  if (!r.ok) return r;
  await prisma.$transaction(async (tx) => {
    await tx.m34AIDataApproval.update({ where: { id }, data: { status: r.status as never, reason: r.reason, ...r.patch } });
    if (r.status === "DA_PHE_DUYET") await tx.m34DataSet.update({ where: { id: a.dataSetId }, data: { aiUsageApproved: true } });
  });
  await logAudit("AI_APPROVAL", id, actor, r.action, r.reason);
  revalidateM34([`/modules/M34/dataset/${a.dataSetId}`]);
  return { ok: true as const };
}

export async function revokeAI(id: string, reason?: string) {
  const actor = await getActor();
  const a = await prisma.m34AIDataApproval.findUniqueOrThrow({ where: { id } });
  const r = txRevokeAI(a, actor, reason);
  if (!r.ok) return r;
  await prisma.$transaction(async (tx) => {
    await tx.m34AIDataApproval.update({ where: { id }, data: { status: "THU_HOI", reason: r.reason } });
    const remain = await tx.m34AIDataApproval.count({ where: { dataSetId: a.dataSetId, status: "DA_PHE_DUYET", id: { not: id } } });
    if (remain === 0) await tx.m34DataSet.update({ where: { id: a.dataSetId }, data: { aiUsageApproved: false } });
  });
  await logAudit("AI_APPROVAL", id, actor, r.action, r.reason);
  revalidateM34([`/modules/M34/dataset/${a.dataSetId}`]);
  return { ok: true as const };
}
