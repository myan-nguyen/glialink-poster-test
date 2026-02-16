import { NextResponse } from "next/server";
import { prisma } from "@/server/db/prisma";
import { savePdfLocal } from "@/server/storage";

export async function POST(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;

  const form = await req.formData();
  const file = form.get("file");

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "Missing file" }, { status: 400 });
  }

  const { fileKey } = await savePdfLocal(file, id);

  await prisma.source.create({
    data: {
      projectId: id,
      kind: "PDF_UPLOAD",
      fileKey,
    },
  });

  await prisma.document.upsert({
    where: { projectId: id },
    update: {},
    create: { projectId: id },
  });

  return NextResponse.json({ ok: true, fileKey });
}
