import { describe, expect, it } from "vitest";
import { calculateCost } from "../cost";

describe("M29 FinOps — tính chi phí token", () => {
  it("tách đúng đơn giá token vào và token ra theo 1 triệu token", () => {
    expect(calculateCost(4_000, 500, {
      inputCostPerMillionTokens: 5,
      outputCostPerMillionTokens: 25,
      currency: "USD",
    })).toEqual({
      inputCostPerMillionTokens: 5,
      outputCostPerMillionTokens: 25,
      currency: "USD",
      estimatedCost: 0.0325,
    });
  });

  it("không tính token âm và hỗ trợ giá pha trộn cũ trong giai đoạn chuyển đổi", () => {
    expect(calculateCost(-10, 1_000, { costPer1kTokens: 0.0075 }).estimatedCost).toBe(0.0075);
    expect(calculateCost(1_000, 1_000, {
      inputCostPerMillionTokens: 0,
      outputCostPerMillionTokens: 0,
      costPer1kTokens: 0.0075,
    }).estimatedCost).toBe(0);
  });

  it("không có bảng giá thì chi phí bằng 0, không sinh NaN", () => {
    expect(calculateCost(1_000, 500, null)).toMatchObject({ estimatedCost: 0, currency: "USD" });
  });
});

// Ngữ nghĩa của giá 0 — chỗ dễ hiểu nhầm nhất của calculateCost, khoá lại bằng test.
//
// `??` chỉ lùi về giá cũ khi trường per-million VẮNG MẶT, không lùi khi nó bằng 0. Đây là CHỦ ĐÍCH:
// 0 nghĩa là "miễn phí", khác hẳn "chưa khai giá". Migration 20260826103000 đã backfill
// costPer1kTokens * 1000 cho mọi model có giá cũ > 0, nên hàng cũ không rơi vào nhánh 0 một cách
// tình cờ; model còn để 0 là model thật sự không tính tiền (vd bậc miễn phí, mô hình tự vận hành).
describe("Ngữ nghĩa giá 0", () => {
  it("giá per-million = 0 nghĩa là MIỄN PHÍ, không lùi về giá pha trộn cũ", () => {
    const r = calculateCost(1_000_000, 1_000_000, {
      inputCostPerMillionTokens: 0,
      outputCostPerMillionTokens: 0,
      costPer1kTokens: 99,
    });
    expect(r.estimatedCost).toBe(0);
  });

  it("VẮNG MẶT trường per-million mới lùi về giá pha trộn cũ", () => {
    expect(calculateCost(1_000_000, 0, { costPer1kTokens: 0.0075 }).estimatedCost).toBe(7.5);
  });

  it("giá vào và giá ra tách bạch, không dùng chung một con số", () => {
    const r = calculateCost(1_000_000, 1_000_000, { inputCostPerMillionTokens: 5, outputCostPerMillionTokens: 25 });
    expect(r.estimatedCost).toBe(30);
    expect(r.inputCostPerMillionTokens).not.toBe(r.outputCostPerMillionTokens);
  });

  it("đơn vị tiền tệ giữ nguyên theo model, mặc định USD khi bỏ trống", () => {
    expect(calculateCost(0, 0, { currency: "VND" }).currency).toBe("VND");
    expect(calculateCost(0, 0, { currency: "" }).currency).toBe("USD");
  });
});
