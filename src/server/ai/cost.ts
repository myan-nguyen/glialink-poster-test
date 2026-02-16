import { Prisma } from "@prisma/client";

const PER_MILLION = 1_000_000;

type Rates = { inputPerM: number; outputPerM: number; cachedInputPerM?: number };

const RATES: Record<string, Rates> = {
  "gpt-4o-mini": { inputPerM: 0.15, outputPerM: 0.60, cachedInputPerM: 0.075 },
  "gpt-4.1-mini": { inputPerM: 0.40, outputPerM: 1.60, cachedInputPerM: 0.10 },
  // add others here if you use them
};

export function computeCostUSD(params: {
  model: string;
  inputTokens: number;
  outputTokens: number;
  cachedInputTokens?: number;
}) {
  const rates = RATES[params.model];
  if (!rates) throw new Error(`No pricing rates configured for model: ${params.model}`);

  const cached = params.cachedInputTokens ?? 0;
  const nonCachedInput = Math.max(0, params.inputTokens - cached);

  const inputCost =
    (nonCachedInput * rates.inputPerM) / PER_MILLION +
    (cached * (rates.cachedInputPerM ?? rates.inputPerM)) / PER_MILLION;

  const outputCost = (params.outputTokens * rates.outputPerM) / PER_MILLION;

  return {
    inputCost: new Prisma.Decimal(inputCost.toFixed(8)),
    outputCost: new Prisma.Decimal(outputCost.toFixed(8)),
    totalCost: new Prisma.Decimal((inputCost + outputCost).toFixed(8)),
  };
}
