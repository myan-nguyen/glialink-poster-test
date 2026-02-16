import { NextResponse } from "next/server";
import { prisma } from "@/server/db/prisma";

export async function GET(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;

  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      jobs: { orderBy: { createdAt: "desc" }, take: 1 },
    },
  });

  if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const latestJob = project.jobs[0];

  // shape matches your ProjectPageClient expectation
  return NextResponse.json({
    id: project.id,
    status: project.status,
    updatedAtISO: project.updatedAt.toISOString(),
    sidebar: {
      seeking: project.seeking,
      offering: project.offering,
      title: project.title,
      authors: project.authors,
      labName: project.researcherName ? `${project.researcherName}` : undefined,
      labAffiliation: project.researcherInstitution,
      aiSynthesis: project.aiBullets,
    },
    parsed: {
      researchQuestion: project.researchQuestion,
      methodology: project.methodology,
      results: project.results,
      conclusions: project.conclusions,
    },
    job: latestJob
      ? {
          status: latestJob.status.toLowerCase(),
          progressPct: latestJob.progress,
          message: latestJob.message,
        }
      : undefined,
  });
}
