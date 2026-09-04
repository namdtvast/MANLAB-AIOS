// Phân quyền là chỗ mà một lỗi im lặng cũng đủ mở toang hoặc khóa chặt cả hệ thống, nên mỗi
// điều kiện chặn ở rules.ts phải có test canh. Dẫn chiếu ETV.P28 §6.7.1 và Phụ lục II điểm 5.
import { describe, expect, it } from "vitest";
import { capVaiTroModule, doiVaiTroNenTang, thuHoiVaiTroModule } from "../rules";
import type { Actor, PhieuQuyen } from "../rules";

const admin: Actor = { id: "u-admin", role: "ADMIN" };
const thuong: Actor = { id: "u-nv", role: "MEMBER" };
const phieuDung: PhieuQuyen = { id: "p1", subjectId: "u-a", status: "DA_PHE_DUYET" };

const expectErr = (r: ReturnType<typeof capVaiTroModule>, code: string) =>
  expect(r).toMatchObject({ ok: false, code });

describe("cấp vai trò module — không có quyền ngoài phiếu (P28 Phụ lục II điểm 5)", () => {
  const base = { actor: admin, subjectId: "u-a", moduleCode: "M33", role: "QTHT", daCo: false };

  it("phiếu đã phê duyệt của đúng người ⇒ cấp được", () => {
    expect(capVaiTroModule({ ...base, phieu: phieuDung })).toEqual({ ok: true });
    expect(capVaiTroModule({ ...base, phieu: { ...phieuDung, status: "DA_THUC_HIEN" } })).toEqual({ ok: true });
  });

  it("không phiếu, phiếu của người khác, phiếu chưa duyệt ⇒ đều bị chặn", () => {
    expectErr(capVaiTroModule({ ...base, phieu: null }), "TICKET_REQUIRED");
    expectErr(capVaiTroModule({ ...base, phieu: { ...phieuDung, subjectId: "u-b" } }), "TICKET_SUBJECT");
    expectErr(capVaiTroModule({ ...base, phieu: { ...phieuDung, status: "CHO_PHE_DUYET" } }), "TICKET_STATE");
    expectErr(capVaiTroModule({ ...base, phieu: { ...phieuDung, status: "TU_CHOI" } }), "TICKET_STATE");
    expectErr(capVaiTroModule({ ...base, phieu: { ...phieuDung, status: "DA_THU_HOI" } }), "TICKET_STATE");
  });

  it("vai trò phải thuộc danh mục của chính module đó", () => {
    // QTHT có thật ở M33 nhưng không có trong danh mục M10; gõ sai mã vai trò không báo lỗi ở
    // đâu cả, người dùng chỉ thấy mình không có quyền — nên phải chặn ngay lúc cấp.
    expectErr(capVaiTroModule({ ...base, moduleCode: "M10", role: "ATTT", phieu: phieuDung }), "INVALID_ROLE");
    expectErr(capVaiTroModule({ ...base, role: "KHONG_CO_THAT", phieu: phieuDung }), "INVALID_ROLE");
    expect(capVaiTroModule({ ...base, moduleCode: "M10", role: "LDP", phieu: phieuDung })).toEqual({ ok: true });
  });

  it("người không phải ADMIN và trường hợp trùng ⇒ bị chặn", () => {
    expectErr(capVaiTroModule({ ...base, actor: thuong, phieu: phieuDung }), "FORBIDDEN");
    expectErr(capVaiTroModule({ ...base, daCo: true, phieu: phieuDung }), "DUPLICATE");
  });
});

describe("thu hồi vai trò module — làm ngay, nhưng phải nêu lý do (P28 §6.7.1)", () => {
  const base = { actor: admin, subjectId: "u-a" };

  it("có lý do là thu hồi được, KHÔNG đòi phiếu", () => {
    expect(thuHoiVaiTroModule({ ...base, note: "Chấm dứt hợp đồng 04/09/2026 (M03)" })).toEqual({ ok: true });
  });

  it("thiếu lý do, tự thu hồi của mình, không phải ADMIN ⇒ bị chặn", () => {
    expectErr(thuHoiVaiTroModule({ ...base, note: "   " }), "REASON_REQUIRED");
    expectErr(thuHoiVaiTroModule({ ...base, subjectId: admin.id, note: "lý do" }), "SELF_CHANGE");
    expectErr(thuHoiVaiTroModule({ ...base, actor: thuong, note: "lý do" }), "FORBIDDEN");
  });
});

describe("đổi vai trò nền tảng — không để hệ thống mất quản trị viên", () => {
  const base = {
    actor: admin,
    subjectId: "u-a",
    subjectRole: "MEMBER" as const,
    roleMoi: "ADMIN" as const,
    phieu: phieuDung,
    soAdminConHieuLuc: 2,
  };

  it("nâng lên ADMIN theo phiếu đã duyệt ⇒ được", () => {
    expect(doiVaiTroNenTang(base)).toEqual({ ok: true });
  });

  it("hạ ADMIN cuối cùng ⇒ bị chặn", () => {
    const haXuong = { ...base, subjectRole: "ADMIN" as const, roleMoi: "VIEWER" as const };
    expectErr(doiVaiTroNenTang({ ...haXuong, soAdminConHieuLuc: 1 }), "LAST_ADMIN");
    expect(doiVaiTroNenTang({ ...haXuong, soAdminConHieuLuc: 2 })).toEqual({ ok: true });
  });

  it("tự đổi vai trò của mình, đổi mà không đổi gì, thiếu phiếu ⇒ bị chặn", () => {
    expectErr(doiVaiTroNenTang({ ...base, subjectId: admin.id }), "SELF_CHANGE");
    expectErr(doiVaiTroNenTang({ ...base, roleMoi: "MEMBER" }), "NO_CHANGE");
    expectErr(doiVaiTroNenTang({ ...base, phieu: null }), "TICKET_REQUIRED");
  });
});
