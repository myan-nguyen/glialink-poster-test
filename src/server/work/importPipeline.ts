import { prisma } from "@/server/db/prisma";
import { fetchUrlText } from "@/server/import/urlIngest";
import { extractPdfTextLocal } from "@/server/import/pdfExtract";
import { chunkText } from "@/server/import/chunk";
import { summarizeWithSchema } from "@/server/import/openaiSummarize";
import { blocksFromSummary } from "@/server/import/blocksFromJson";

async function setJob(importJobId: string, progress: number, message: string) {
  await prisma.importJob.update({
    where: { id: importJobId },
    data: { status: "RUNNING", progress, message },
  });
}

export async function runImportJob(args: { projectId: string; importJobId: string }) {
  const { projectId, importJobId } = args;

  try {
    console.log(`🔍 Starting import for project ${projectId}`);
    await setJob(importJobId, 5, "Loading sources…");

    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: { sources: true },
    });
    if (!project) throw new Error("Project not found");

    // 1) URL ingestion - process and discard immediately to save memory
    console.log(`📥 Fetching ${project.sources.filter((s: { url: any; }) => s.url).length} URLs...`);
    await setJob(importJobId, 15, "Fetching URLs…");
    const urlSources = project.sources.filter((s: { url: any; }) => s.url);
    
    // Process URLs one at a time, storing only essential info
    const urlTexts: Array<{ url: string; text: string }> = [];
    for (const s of urlSources) {
      console.log(`🌐 Fetching URL: ${s.url}`);
      const text = await fetchUrlText(s.url!);
      console.log(`✓ Fetched ${text.length} chars from ${s.url}`);
      urlTexts.push({ url: s.url!, text });
      // Store to DB and release from memory
      await prisma.source.update({ where: { id: s.id }, data: { fetchedText: text } });
    }

    // 2) PDF extraction (if any)
    await setJob(importJobId, 35, "Extracting PDF text…");
    const pdfSources = project.sources.filter((s: { fileKey: any; }) => s.fileKey);
    let pdfText = "";
    let numPages: number | null = null;

    if (pdfSources.length) {
      // v1: just use first uploaded pdf
      const { text, numPages: np } = await extractPdfTextLocal(pdfSources[0].fileKey!);
      pdfText = text.slice(0, 50_000); // Reduced cap for PDF text
      numPages = np;
      await prisma.document.upsert({
        where: { projectId },
        update: { extractedText: pdfText, numPages: np ?? undefined },
        create: { projectId, extractedText: pdfText, numPages: np ?? undefined },
      });
    }

    // 3) Build source pack (cap size more aggressively with cheerio 8k limit)
    await setJob(importJobId, 55, "Preparing source pack…");
    
    // Build source pack in controlled chunks to avoid memory spike
    const sourceLines: string[] = [
      `Researcher: ${project.researcherName}`,
      `Institution: ${project.researcherInstitution}`,
      `Intent: ${project.intent ?? ""}`,
    ];
    
    // Add URL content with size limits
    let urlCharsUsed = 0;
    const MAX_URL_CHARS = 60_000; // Conservative limit
    for (const { url, text } of urlTexts) {
      const charsToAdd = Math.min(text.length, MAX_URL_CHARS - urlCharsUsed);
      if (charsToAdd > 0) {
        sourceLines.push(`URL: ${url}`);
        sourceLines.push(text.slice(0, charsToAdd));
        sourceLines.push("---");
        urlCharsUsed += charsToAdd;
        if (urlCharsUsed >= MAX_URL_CHARS) break;
      }
    }
    
    // Add PDF content if available
    if (pdfText) {
      sourceLines.push("PDF EXTRACT:");
      sourceLines.push(pdfText.slice(0, 30_000)); // Aggressive limit
    }
    
    // Join all at once, not incrementally
    let sourcePackRaw = sourceLines.join("\n").slice(0, 100_000);
    
    // Clear intermediate arrays to free memory
    sourceLines.length = 0;
    
    // 4) Chunking & subsetting for AI
    await setJob(importJobId, 65, "Preparing content for AI…");
    // Just use the raw content directly - don't chunk since we're limiting to 8k anyway
    const sourcePack = sourcePackRaw.slice(0, 8000); // Final hard limit for AI
    
    // Clear memory before AI call
    urlTexts.length = 0;
    pdfText = "";

    // 5) LLM summarize
    await setJob(importJobId, 80, "Generating structured summary…");
    const summary = await summarizeWithSchema({
      importJobId,
      researcherName: project.researcherName,
      institution: project.researcherInstitution,
      intent: project.intent ?? undefined,
      sourcePack,
    });

    // 6) Write canonical fields + blocks
    await setJob(importJobId, 92, "Saving blocks…");
    await prisma.project.update({
      where: { id: projectId },
      data: {
        status: "DRAFT",
        title: summary.title,
        authors: summary.authors,
        researchQuestion: summary.researchQuestion,
        methodology: summary.methodology,
        results: summary.results,
        conclusions: summary.conclusions,
        seeking: summary.seeking,
        offering: summary.offering,
        tags: summary.tags,
        aiBullets: summary.aiBullets,
        blocks: {
          deleteMany: {}, // replace parsed blocks on re-import (later: keep user edits)
          create: blocksFromSummary(summary).map((b, idx) => ({
            kind: b.kind,
            title: b.title,
            content: b.content ?? "", // Handle null content
            order: idx,
            source: "PARSED",
          })),
        },
      },
    });

    await prisma.importJob.update({
      where: { id: importJobId },
      data: { status: "COMPLETED", progress: 100, message: "Done" },
    });
  } catch (err: any) {
    await prisma.importJob.update({
      where: { id: importJobId },
      data: {
        status: "FAILED",
        progress: 100,
        message: "Failed",
        error: err?.message ?? String(err),
      },
    });

    await prisma.project.update({
      where: { id: projectId },
      data: { status: "FAILED" },
    });

    throw err;
  }
}
