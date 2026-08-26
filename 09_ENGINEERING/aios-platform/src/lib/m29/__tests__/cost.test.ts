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
