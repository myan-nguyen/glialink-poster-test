import { openai } from "@/server/ai/openai";
import { prisma } from "@/server/db/prisma";
import { computeCostUSD } from "@/server/ai/cost";

type UsageLike = {
  input_tokens?: number;
  output_tokens?: number;
  total_tokens?: number;
  input_tokens_details?: { cached_tokens?: number };
};

function safeUsage(resp: any): UsageLike {
  return (resp?.usage ?? {}) as UsageLike;
}

async function addUsageToImportJob(params: {
  importJobId: string;
  model: string;
  usage: UsageLike;
}) {
  const inputTokens = params.usage.input_tokens ?? 0;
  const outputTokens = params.usage.output_tokens ?? 0;
  const cachedInputTokens = params.usage.input_tokens_details?.cached_tokens ?? 0;
  const totalTokens = params.usage.total_tokens ?? inputTokens + outputTokens;

  const { inputCost, outputCost, totalCost } = computeCostUSD({
    model: params.model,
    inputTokens,
    outputTokens,
    cachedInputTokens,
  });

  // Accumulate costs/tokens across multiple calls for the same ImportJob
  await prisma.importJob.update({
    where: { id: params.importJobId },
    data: {
      model: params.model,
      inputTokens: { increment: inputTokens },
      outputTokens: { increment: outputTokens },
      cachedInputTokens: { increment: cachedInputTokens },
      totalTokens: { increment: totalTokens },
      inputCostUsd: { increment: inputCost },
      outputCostUsd: { increment: outputCost },
      totalCostUsd: { increment: totalCost },
    },
  });
}

export type StructuredSummary = {
  title: string | null;
  authors: string[];
  researchQuestion: string | null;
  methodology: string | null;
  results: string | null;
  conclusions: string | null;
};

export type ExtendedSummary = StructuredSummary & {
  seeking: string[];
  offering: string[];
  tags: string[];
  aiBullets: string[];
};

function safeJsonParse<T>(s: string): T | null {
  try {
    return JSON.parse(s) as T;
  } catch {
    return null;
  }
}

/**
 * Streamlined single-call summarization using only OpenAI.
 * Input text is already cleaned by Cheerio, so no preprocessing needed.
 */
export async function summarizeWithSchema(params: {
  importJobId: string;
  researcherName: string;
  institution: string;
  intent?: string;
  sourcePack: string;
}): Promise<ExtendedSummary> {
  const model = "gpt-4o-mini";
  
  // CRITICAL: Limit input AGGRESSIVELY to prevent memory issues
  const MAX_INPUT_CHARS = 8000; // Ultra-conservative
  
  // Truncate FIRST - no preprocessing needed (Cheerio already cleaned it)
  const input = params.sourcePack.slice(0, MAX_INPUT_CHARS);

  // Build compact prompt
  const prompt = `Extract research information from this content.

Researcher: ${params.researcherName}
Institution: ${params.institution}
Intent: ${params.intent || "Not specified"}

Content:
${input}

Return ONLY valid JSON (no markdown, no commentary):
{
  "title": "string or null",
  "authors": ["array of strings"],
  "researchQuestion": "string or null",
  "methodology": "string or null",
  "results": "string or null",
  "conclusions": "string or null",
  "seeking": ["what they need"],
  "offering": ["what they provide"],
  "tags": ["keyword1", "keyword2"],
  "aiBullets": ["point1", "point2"]
}`;

  try {
    const resp = await openai.chat.completions.create({
      model,
      messages: [
        {
          role: "system",
          content: "You are a research information extraction expert. Return only valid JSON with no explanation.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.3,
      max_tokens: 1000,
      response_format: { type: "json_object" },
    });

    // Track usage
    await addUsageToImportJob({
      importJobId: params.importJobId,
      model,
      usage: safeUsage(resp.usage),
    });

    const content = resp.choices[0]?.message?.content || "{}";
    const parsed = safeJsonParse<ExtendedSummary>(content);

    // Always return valid object
    return (
      parsed ?? {
        title: null,
        authors: [],
        researchQuestion: null,
        methodology: null,
        results: null,
        conclusions: null,
        seeking: [],
        offering: [],
        tags: [],
        aiBullets: [],
      }
    );
  } catch (error) {
    console.error("Summarization error:", error);
    // Return safe fallback on any error
    return {
      title: null,
      authors: [],
      researchQuestion: null,
      methodology: null,
      results: null,
      conclusions: null,
      seeking: [],
      offering: [],
      tags: [],
      aiBullets: [],
    };
  }
}

/**
 * Legacy function - kept for backwards compatibility
 * Delegates to summarizeWithSchema
 */
export async function summarizeOnce(params: {
  importJobId: string;
  model?: string;
  extractedText: string;
  maxOutputTokens?: number;
}): Promise<StructuredSummary> {
  const summary = await summarizeWithSchema({
    importJobId: params.importJobId,
    researcherName: "Unknown",
    institution: "Unknown",
    sourcePack: params.extractedText,
  });

  return {
    title: summary.title,
    authors: summary.authors,
    researchQuestion: summary.researchQuestion,
    methodology: summary.methodology,
    results: summary.results,
    conclusions: summary.conclusions,
  };
}

