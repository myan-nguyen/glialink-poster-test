import type { StructuredSummary } from "./openaiSummarize";

export function blocksFromSummary(s: StructuredSummary & { aiBullets: string[] }) {
  return [
    { kind: "TITLE" as const, title: "Title", content: s.title },
    { kind: "AUTHORS" as const, title: "Authors", content: s.authors.join(", ") },
    { kind: "RESEARCH_QUESTION" as const, title: "Research question", content: s.researchQuestion },
    { kind: "METHODOLOGY" as const, title: "Methodology", content: s.methodology },
    { kind: "RESULTS" as const, title: "Results", content: s.results },
    { kind: "CONCLUSIONS" as const, title: "Conclusions", content: s.conclusions },
    { kind: "AI_SYNTHESIS" as const, title: "Glialink AI synthesis", content: s.aiBullets.map(b => `• ${b}`).join("\n") },
  ];
}
