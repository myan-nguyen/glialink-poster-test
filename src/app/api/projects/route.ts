import { NextResponse } from "next/server";
import { prisma } from "@/server/db/prisma";

export async function POST(req: Request) {
  const body = await req.json();

  const {
    researcherName,
    researcherInstitution,
    publicationUrl,
    sourceUrls = [],
    intent,
  } = body as {
    researcherName: string;
    researcherInstitution: string;
    publicationUrl: string;
    sourceUrls?: string[];
    intent?: string;
  };

  // TODO: replace with real auth owner id
  const ownerId = "demo";

  const project = await prisma.project.create({
    data: {
      ownerId,
      status: "IMPORTING",
      visibility: "DRAFT",
      researcherName,
      researcherInstitution,
      publicationUrl,
      intent,
      sources: {
        create: [
          { kind: "PUBLICATION_URL", url: publicationUrl },
          ...sourceUrls.map((u) => ({ kind: "EXTRA_URL" as const, url: u })),
        ],
      },
    },
    select: { id: true },
  });

  return NextResponse.json({ projectId: project.id });
}
