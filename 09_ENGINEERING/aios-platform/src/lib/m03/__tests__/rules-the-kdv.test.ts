// K5 — hiệu lực thẻ kiểm định viên. Mọi ca test dưới đây dựng từ MỘT tình huống có thật: đối
// chiếu 145 bản ghi nhân sự ManLab ngày 31/08/2026 cho thấy 11/27 thẻ đã hết hạn mà không ai
// biết, 5 thẻ bị nhập đảo ngày cấp/ngày hết hạn, 1 thẻ thiếu ngày hết hạn, 1 số thẻ trùng ở hai
// người. Bộ test giữ cho từng lớp lỗi đó không lọt lại.
import { describe, expect, it } from "vitest";
import {
  INSPECTOR_CARD_EXPIRING_SOON_DAYS,
  canPerformInspection,
  currentInspectorCard,
  duplicateCardNumbers,
  inspectorCardState,
  validateInspectorCard,
} from "../rules";

const NOW = new Date("2026-08-31T00:00:00Z");
const days = (n: number) => new Date(NOW.getTime() + n * 24 * 60 * 60 * 1000);

describe("inspectorCardState", () => {
  it("thẻ còn xa hạn là VALID", () => {
    expect(inspectorCardState({ expiresAt: days(365) }, NOW)).toBe("VALID");
  });

  it("thẻ quá hạn là EXPIRED — đúng 11/27 thẻ trong dữ liệu thật rơi vào đây", () => {
    expect(inspectorCardState({ expiresAt: new Date("2026-03-31T00:00:00Z") }, NOW)).toBe("EXPIRED");
  });

  it("thẻ trong cửa sổ cảnh báo là EXPIRING_SOON", () => {
    expect(inspectorCardState({ expiresAt: days(INSPECTOR_CARD_EXPIRING_SOON_DAYS - 1) }, NOW)).toBe("EXPIRING_SOON");
  });

  it("hết hạn ĐÚNG thời điểm mốc tính là EXPIRED, không phải còn hiệu lực", () => {
    expect(inspectorCardState({ expiresAt: NOW }, NOW)).toBe("EXPIRED");
  });

  it("đúng biên cửa sổ cảnh báo vẫn là EXPIRING_SOON, chưa phải VALID", () => {
    expect(inspectorCardState({ expiresAt: days(INSPECTOR_CARD_EXPIRING_SOON_DAYS) }, NOW)).toBe("EXPIRING_SOON");
    expect(inspectorCardState({ expiresAt: days(INSPECTOR_CARD_EXPIRING_SOON_DAYS + 1) }, NOW)).toBe("VALID");
  });

  it("thiếu ngày hết hạn KHÔNG được coi là còn hiệu lực — trả NO_EXPIRY riêng", () => {
    expect(inspectorCardState({ expiresAt: null }, NOW)).toBe("NO_EXPIRY");
  });

  it("cửa sổ cảnh báo đổi được mà không phải sửa hàm", () => {
    expect(inspectorCardState({ expiresAt: days(120) }, NOW, 90)).toBe("VALID");
    expect(inspectorCardState({ expiresAt: days(120) }, NOW, 180)).toBe("EXPIRING_SOON");
  });
});

describe("validateInspectorCard", () => {
  it("bắt được ngày cấp SAU ngày hết hạn — đúng 5 bản ghi bị nhập đảo trong dữ liệu thật", () => {
    const problems = validateInspectorCard({
      cardNumber: "0180-01",
      issuedAt: new Date("2031-03-31T00:00:00Z"),
      expiresAt: new Date("2026-03-31T00:00:00Z"),
    });
    expect(problems).toHaveLength(1);
    expect(problems[0]).toContain("nhập đảo");
  });

  it("thẻ ghi đúng chiều thì không báo vấn đề gì", () => {
    expect(
      validateInspectorCard({
        cardNumber: "0186-01",
        issuedAt: new Date("2026-03-31T00:00:00Z"),
        expiresAt: new Date("2031-03-31T00:00:00Z"),
      })
    ).toEqual([]);
  });

  it("bắt được thẻ thiếu ngày hết hạn", () => {
    expect(validateInspectorCard({ cardNumber: "3961", issuedAt: null, expiresAt: null })).toContain(
      "thiếu ngày hết hạn thẻ"
    );
  });

  it("bắt được số thẻ rỗng, kể cả khi chỉ toàn khoảng trắng", () => {
    expect(validateInspectorCard({ cardNumber: "   ", issuedAt: null, expiresAt: days(30) })).toContain(
      "thiếu số thẻ kiểm định viên"
    );
  });

  it("cấp và hết hạn cùng một ngày cũng là lỗi — thẻ không có ngày hiệu lực nào", () => {
    const d = new Date("2026-03-31T00:00:00Z");
    expect(validateInspectorCard({ cardNumber: "x", issuedAt: d, expiresAt: d })).toHaveLength(1);
  });
});

describe("currentInspectorCard", () => {
  it("chọn thẻ có hạn xa nhất, không phụ thuộc thứ tự mảng", () => {
    const cu = { expiresAt: new Date("2026-03-31T00:00:00Z") };
    const moi = { expiresAt: new Date("2031-03-31T00:00:00Z") };
    expect(currentInspectorCard([cu, moi])).toBe(moi);
    expect(currentInspectorCard([moi, cu])).toBe(moi);
  });

  it("thẻ thiếu ngày hết hạn xếp sau thẻ có ngày", () => {
    const khongHan = { expiresAt: null };
    const coHan = { expiresAt: new Date("2026-03-31T00:00:00Z") };
    expect(currentInspectorCard([khongHan, coHan])).toBe(coHan);
  });

  it("không có thẻ nào thì trả null, không ném lỗi", () => {
    expect(currentInspectorCard([])).toBeNull();
  });
});

describe("duplicateCardNumbers", () => {
  it('phát hiện số thẻ dùng cho hai người — ca "3961" trong dữ liệu thật', () => {
    expect(
      duplicateCardNumbers([
        { employeeId: "e1", cardNumber: "3961" },
        { employeeId: "e2", cardNumber: "3961" },
        { employeeId: "e3", cardNumber: "3962" },
      ])
    ).toEqual(["3961"]);
  });

  it("cùng một người giữ hai thẻ khác số thì không phải trùng", () => {
    expect(
      duplicateCardNumbers([
        { employeeId: "e1", cardNumber: "0186-01" },
        { employeeId: "e1", cardNumber: "0186-02" },
      ])
    ).toEqual([]);
  });
});

describe("canPerformInspection — điều kiện chặn ETV.P05 §6.2", () => {
  it("không có thẻ thì không được thực hiện kiểm định", () => {
    expect(canPerformInspection([], NOW)).toBe(false);
  });

  it("thẻ hết hạn thì không được, kể cả khi từng có thẻ hợp lệ trước đó", () => {
    expect(
      canPerformInspection([{ expiresAt: new Date("2023-03-10T00:00:00Z") }, { expiresAt: new Date("2026-03-31T00:00:00Z") }], NOW)
    ).toBe(false);
  });

  it("thẻ sắp hết hạn VẪN được — sắp hết hạn không phải là hết hiệu lực", () => {
    expect(canPerformInspection([{ expiresAt: days(10) }], NOW)).toBe(true);
  });

  it("thẻ thiếu ngày hết hạn KHÔNG được coi là hợp lệ", () => {
    expect(canPerformInspection([{ expiresAt: null }], NOW)).toBe(false);
  });
});
