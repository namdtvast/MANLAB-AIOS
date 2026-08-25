// Ranh giới dữ liệu quyết định tài liệu mức nào rời khỏi hạ tầng của Viện. Đây là chốt an ninh
// nặng nhất của Copilot, và nó thay cho một biến toàn cục vốn fail-closed — nên test phải khoá
// đúng hai điều: mặc định KHÔNG bao giờ nới, và trần không bao giờ vượt quá Nội bộ.
import { describe, expect, it } from "vitest";
import { mucBaoMatToiDa, mucDuocGui, INDEXABLE_LEVELS } from "../copilot/retrieval";
import { chuanHoaSoHoSo, kiemTraDatRanhGioi } from "../copilot/ranh-gioi";
import { AIDataBoundary } from "@/generated/prisma/enums";

const MOI_TRANG_THAI = Object.values(AIDataBoundary);

describe("Ánh xạ ranh giới dữ liệu → trần mức bảo mật (ETV.P29 §5.5)", () => {
  it("không rời hạ tầng Viện ⇒ trần Nội bộ", () => {
    expect(mucBaoMatToiDa("NO_EXTERNAL_TRANSFER")).toBe("Noi-bo");
  });

  it("rời hạ tầng nhưng CÓ cam kết đã trích F29.02 ⇒ trần Nội bộ", () => {
    expect(mucBaoMatToiDa("EXTERNAL_WITH_COMMITMENT")).toBe("Noi-bo");
  });

  it("rời hạ tầng, KHÔNG cam kết ⇒ chỉ Công khai", () => {
    expect(mucBaoMatToiDa("EXTERNAL_NO_COMMITMENT")).toBe("Cong-khai");
    expect(mucDuocGui("EXTERNAL_NO_COMMITMENT")).toEqual(["Cong-khai"]);
  });

  // ETV.P28 §5.13 cấm ở mức TRUY CẬP: "trợ lý AI chỉ được truy cập nguồn dữ liệu mức Công khai và
  // Nội bộ". Kể cả mô hình chạy trong hạ tầng của Viện cũng KHÔNG được chạm Hạn chế/Mật.
  it("KHÔNG trạng thái nào mở tới Hạn chế hay Mật — kể cả mô hình nội bộ", () => {
    for (const tt of MOI_TRANG_THAI) {
      expect(INDEXABLE_LEVELS as readonly string[]).toContain(mucBaoMatToiDa(tt));
      for (const muc of mucDuocGui(tt)) expect(["Cong-khai", "Noi-bo"]).toContain(muc);
    }
  });

  it("mọi trạng thái của enum đều có ánh xạ, không rơi vào nhánh không xác định", () => {
    for (const tt of MOI_TRANG_THAI) expect(mucDuocGui(tt).length).toBeGreaterThan(0);
  });
});

describe("kiemTraDatRanhGioi — trạng thái có cam kết đòi bằng chứng", () => {
  it("nới lên 'có cam kết' mà không dẫn hồ sơ thì bị chặn", () => {
    for (const soHoSo of [undefined, null, "", "   "]) {
      const r = kiemTraDatRanhGioi("EXTERNAL_WITH_COMMITMENT", soHoSo);
      expect(r.ok, String(soHoSo)).toBe(false);
      expect(r.loi).toContain("F29.02");
    }
  });

  it("dẫn được hồ sơ thì cho qua", () => {
    expect(kiemTraDatRanhGioi("EXTERNAL_WITH_COMMITMENT", "AIA-2026-003")).toMatchObject({ ok: true });
  });

  it("hai trạng thái còn lại không đòi hồ sơ — một cái không gửi gì ra, một cái đã siết nhất", () => {
    expect(kiemTraDatRanhGioi("NO_EXTERNAL_TRANSFER", undefined)).toMatchObject({ ok: true });
    expect(kiemTraDatRanhGioi("EXTERNAL_NO_COMMITMENT", undefined)).toMatchObject({ ok: true });
  });
});

describe("chuanHoaSoHoSo — không để lại hồ sơ mồ côi", () => {
  it("giữ số hồ sơ ở trạng thái có cam kết", () => {
    expect(chuanHoaSoHoSo("EXTERNAL_WITH_COMMITMENT", " AIA-2026-003 ")).toBe("AIA-2026-003");
  });

  // Siết lại mà vẫn giữ số hồ sơ cũ sẽ khiến người đọc bản ghi tưởng nền tảng vẫn có cam kết.
  it("xoá số hồ sơ khi chuyển về trạng thái không cần bằng chứng", () => {
    expect(chuanHoaSoHoSo("EXTERNAL_NO_COMMITMENT", "AIA-2026-003")).toBeNull();
    expect(chuanHoaSoHoSo("NO_EXTERNAL_TRANSFER", "AIA-2026-003")).toBeNull();
  });
});
