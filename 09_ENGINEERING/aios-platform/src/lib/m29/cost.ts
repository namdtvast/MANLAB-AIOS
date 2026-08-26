export interface ModelPricing {
  inputCostPerMillionTokens?: number;
  outputCostPerMillionTokens?: number;
  currency?: string;
  costPer1kTokens?: number;
}

export interface CostSnapshot {
  inputCostPerMillionTokens: number;
  outputCostPerMillionTokens: number;
  currency: string;
  estimatedCost: number;
}

/** Chi phí ước tính theo đơn giá tách token vào/ra, làm tròn ở mức đủ cho micro-transaction. */
export function calculateCost(inputTokens: number, outputTokens: number, pricing?: ModelPricing | null): CostSnapshot {
  const legacyRate = (pricing?.costPer1kTokens ?? 0) * 1000;
  const inputRate = pricing?.inputCostPerMillionTokens ?? legacyRate;
  const outputRate = pricing?.outputCostPerMillionTokens ?? legacyRate;
  const estimatedCost = (Math.max(0, inputTokens) * inputRate + Math.max(0, outputTokens) * outputRate) / 1_000_000;

  return {
    inputCostPerMillionTokens: inputRate,
    outputCostPerMillionTokens: outputRate,
    currency: pricing?.currency || "USD",
    estimatedCost: Math.round(estimatedCost * 100_000_000) / 100_000_000,
  };
}
