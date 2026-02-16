import { NextResponse } from "next/server";
import { prisma } from "@/server/db/prisma";
import { importQueue } from "@/server/queue/queues";

export async function POST(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id: projectId } = await ctx.params;

  const importJob = await prisma.importJob.create({
    data: {
      projectId,
      status: "QUEUED",
      progress: 0,
      message: "Queued",
    },
    select: { id: true },
  });

  await importQueue.add(
    "import-project",
    { projectId, importJobId: importJob.id },
    { jobId: importJob.id } // stable id
  );

  return NextResponse.json({ ok: true, importJobId: importJob.id });
}
