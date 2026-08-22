"use server";

// M21 — Server Actions, port từ hàm thao tác dữ liệu trong
// 05_MODULE_LIBRARY/M21_CongBoNangLuc/08_Source/index.html (newRecord/addCatalogItem/doTransition)
// sang Prisma/Postgres. Logic quyết định chuyển trạng thái nằm hoàn toàn ở "@/lib/m21/rules" —
// action này chỉ gọi rule rồi ghi DB, không tự quyết định gì thêm.
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import type { M21LineResult, M21RecordType, M21Status } from "@/generated/prisma/enums";
import { getActor } from "./actor";
import { isEditable, txTransition, type M21ActorUser, type RecordForRules, type TxResult } from "./rules";

const ETV = {
  toChuc: "VIỆN KIỂM ĐỊNH CÔNG NGHỆ VÀ MÔI TRƯỜNG",
  diaChi: "Tầng 14 Tòa nhà Zen Tower, số 12 Khuất Duy Tiến, P. Thanh Xuân, TP. Hà Nội",
  dienThoai: "0813.98.98.38",
  email: "kiemdinh@etv.org.vn",
  diaDiemDL: "Khu C3-2B/NO4, Ngõ 1, đường Vũ Đình Tụng, P. Long Biên, TP Hà Nội",
  daiDien: "TS. Nguyễn Hoàng Giang — Viện trưởng",
};

function coQuanTiepNhanMacDinh(loai: M21RecordType) {
  return loai === "DL" ? "Trung tâm Phục vụ hành chính công TP. Hà Nội" : "Bộ Nông nghiệp và Môi trường";
}

async function logAudit(recordId: string, actor: M21ActorUser, action: string, reason: string | null) {
  await prisma.m21AuditEntry.create({
    data: { recordId, actorId: actor.id, role: actor.m21Role ?? "—", action, reason },
  });
}

async function loadForRules(id: string): Promise<{ record: Awaited<ReturnType<typeof prisma.m21Record.findUniqueOrThrow>>; rulesInput: RecordForRules }> {
  const record = await prisma.m21Record.findUniqueOrThrow({ where: { id }, include: { lines: true } });
  const rulesInput: RecordForRules = {
    loai: record.loai,
    status: record.status,
    lan: record.lan,
    diaDiem: record.diaDiem,
    toChuc: record.toChuc,
    diaChi: record.diaChi,
    daiDien: record.daiDien,
    coQuanTiepNhan: record.coQuanTiepNhan,
    ngayGui: record.ngayGui,
    phienBanCu: (record.phienBanCu as unknown[] | null) ?? null,
    lines: record.lines.map((l) => ({
      id: l.id,
      dichVu: l.dichVu,
      ten: l.ten,
      linhVuc: l.linhVuc,
      phamVi: l.phamVi,
      ccx: l.ccx,
      quyTrinh: l.quyTrinh,
      nguoiTH: l.nguoiTH,
      ghiChu: l.ghiChu,
      ketQua: l.ketQua,
      lyDo: l.lyDo,
      bangChung: l.bangChung,
      bcFileName: l.bcFileName,
      linked: l.linked,
      catalogRef: l.catalogRef,
    })),
  };
  return { record, rulesInput };
}

export async function createRecord(loai: M21RecordType) {
  const actor = await getActor();
  if (!actor.m21Role) throw new Error("Chưa được gán vai trò M21.");
  const year = new Date().getFullYear();
  const prefix = loai === "DL" ? "CB-" : "TB-";

  const created = await prisma.$transaction(async (tx) => {
    const rec = await tx.m21Record.create({
      data: {
        code: "PENDING",
        loai,
        status: "CHUALAP",
        toChuc: ETV.toChuc,
        diaChi: ETV.diaChi,
        daiDien: ETV.daiDien,
        dienThoai: ETV.dienThoai,
        email: ETV.email,
        diaDiem: loai === "DL" ? ETV.diaDiemDL : "",
        coQuanTiepNhan: coQuanTiepNhanMacDinh(loai),
        baoCaoHangNam: loai === "QTMT" ? { ky: "", khoiLuong: "", thayDoi: "", qaqc: "", suCo: "", nguoiLap: "", ngayLap: "" } : undefined,
        createdById: actor.id,
        lines: { create: [{ dichVu: loai === "QTMT" ? "quantrac" : "kiemdinh" }] },
      },
    });
    const code = `${prefix}${String(rec.seq).padStart(2, "0")}/${year}`;
    return tx.m21Record.update({ where: { id: rec.id }, data: { code, status: "DANGLAP" } });
  });
  await logAudit(created.id, actor, `Tạo hồ sơ ${loai === "DL" ? "công bố Đo lường" : "thông báo QTMT"}`, null);
  revalidatePath("/modules/M21");
  return created;
}

export async function createDLRecordAndRedirect() {
  const created = await createRecord("DL");
  redirect(`/modules/M21/${created.id}`);
}

export async function createQTMTRecordAndRedirect() {
  const created = await createRecord("QTMT");
  redirect(`/modules/M21/${created.id}`);
}

export async function updateHeader(
  id: string,
  input: Partial<{
    toChuc: string;
    diaChi: string;
    daiDien: string;
    dienThoai: string;
    email: string;
    diaDiem: string;
    coQuanTiepNhan: string;
    coQuanChuQuan: string;
    congNhanSo: string;
    congNhanHieuLuc: string;
  }>
) {
  const actor = await getActor();
  const record = await prisma.m21Record.findUniqueOrThrow({ where: { id } });
  if (!isEditable(record.kyso)) throw new Error("Hồ sơ đã ký số — dữ liệu khóa (BR1). Dùng \"Điều chỉnh\" để sửa.");
  if (!actor.m21Role) throw new Error("Chưa được gán vai trò M21.");
  await prisma.m21Record.update({ where: { id }, data: input });
  revalidatePath(`/modules/M21/${id}`);
}

export async function addLine(recordId: string) {
  const actor = await getActor();
  const record = await prisma.m21Record.findUniqueOrThrow({ where: { id: recordId } });
  if (!isEditable(record.kyso)) throw new Error("Hồ sơ đã ký số — dữ liệu khóa (BR1).");
  if (!actor.m21Role) throw new Error("Chưa được gán vai trò M21.");
  await prisma.m21Line.create({ data: { recordId, dichVu: record.loai === "QTMT" ? "quantrac" : "kiemdinh" } });
  revalidatePath(`/modules/M21/${recordId}`);
}

export async function updateLine(
  lineId: string,
  input: Partial<{
    ten: string;
    linhVuc: string;
    phamVi: string;
    ccx: string;
    quyTrinh: string;
    nguoiTH: string;
    ghiChu: string;
    ketQua: M21LineResult;
    lyDo: string;
    bangChung: string;
    bcFileName: string;
    linked: boolean;
    catalogRef: string;
  }>
) {
  const actor = await getActor();
  if (!actor.m21Role) throw new Error("Chưa được gán vai trò M21.");
  const line = await prisma.m21Line.findUniqueOrThrow({ where: { id: lineId }, include: { record: true } });
  if (!isEditable(line.record.kyso)) throw new Error("Hồ sơ đã ký số — dữ liệu khóa (BR1).");
  await prisma.m21Line.update({ where: { id: lineId }, data: input });
  revalidatePath(`/modules/M21/${line.recordId}`);
}

export async function deleteLine(lineId: string) {
  const actor = await getActor();
  if (!actor.m21Role) throw new Error("Chưa được gán vai trò M21.");
  const line = await prisma.m21Line.findUniqueOrThrow({ where: { id: lineId }, include: { record: true } });
  if (!isEditable(line.record.kyso)) throw new Error("Hồ sơ đã ký số — dữ liệu khóa (BR1).");
  await prisma.m21Line.delete({ where: { id: lineId } });
  revalidatePath(`/modules/M21/${line.recordId}`);
}

export async function transition(id: string, to: M21Status, extra: { reason?: string; receiptNo?: string } = {}): Promise<TxResult> {
  const actor = await getActor();
  const { record, rulesInput } = await loadForRules(id);
  const result = txTransition(rulesInput, actor, to, extra);
  if (!result.ok) return result;

  await prisma.m21Record.update({ where: { id }, data: result.patch });
  await logAudit(id, actor, `${result.label} (${record.status} → ${to})`, extra.reason ?? null);
  if (to === "CONGHIEU") {
    await logAudit(id, actor, "PA-B: Đã phát sự kiện công khai → chờ M05 ghi nhận năng lực & chuyển PTĐ sang “Đang sử dụng”", null);
  }
  revalidatePath(`/modules/M21/${id}`);
  revalidatePath("/modules/M21");
  return result;
}
