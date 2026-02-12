import type { ImportSource, ProjectDraft, ProjectBlock } from "@/lib/types/project";

function rid(prefix: string) {
  return `${prefix}_${Math.random().toString(16).slice(2)}`;
}

export function buildMockProjectDraft(args: {
  ownerId: string;
  source: ImportSource;
  userIntent: string;
}): ProjectDraft {
  const nowISO = new Date().toISOString().slice(0, 10);

  const blocks: ProjectBlock[] = [
    {
      id: rid("b"),
      kind: "background",
      title: "Background",
      content:
        "This block summarizes the context and why it matters. Keep it 3–5 sentences. Assume the reader is adjacent to your field, not a specialist.",
    },
    {
      id: rid("b"),
      kind: "question",
      title: "Research question",
      content:
        "State the core research question or hypothesis in one sentence. Add key constraints or assumptions below.",
    },
    {
      id: rid("b"),
      kind: "methods",
      title: "Methods",
      content:
        "Outline the approach at a high level: dataset/participants, measures, and analysis pipeline. Add links to code or protocols later.",
    },
    {
      id: rid("b"),
      kind: "results",
      title: "Results (so far)",
      content:
        "Highlight the 2–4 most important findings using short bullets.\n\n- Finding 1 (mock)\n- Finding 2 (mock)\n- Finding 3 (mock)",
    },
    {
      id: rid("b"),
      kind: "next_steps",
      title: "Next steps",
      content:
        "List what you’ll do next: experiments, analysis improvements, recruiting participants, or manuscript goals.",
    },
    {
      id: rid("b"),
      kind: "collab_asks",
      title: "Collaboration asks",
      content:
        "Be explicit about what you need:\n\n- Expertise (e.g., imaging/ML/statistics)\n- Data access\n- Validation cohort\n- Compute/resources\n- Clinical review",
    },
  ];

  const sourceLabel =
    args.source.kind === "pdf" ? `PDF: ${args.source.filename}` : `Link: ${args.source.url}`;

  return {
    id: rid("proj"),
    ownerId: args.ownerId,
    title: "Example Research Project (Mock Import)",
    summary:
      "A structured project page generated from a poster/paper to test workflow, editing, and sharing.",
    status: "draft",
    visibility: "draft",
    lastUpdatedISO: nowISO,

    source: args.source,
    userIntent:
      args.userIntent?.trim() ||
      "I want to clarify the project narrative and attract collaborators who can help with validation and next steps.",

    tags: ["neuroscience", "imaging", "methods", "collaboration", "poster-to-page"],
    blocks,

    rightPanel: {
      scientificSummary:
        "Scientific summary (mock): This project investigates X using Y method to evaluate Z outcome. Preliminary results suggest A and motivate B next steps.",
      generalSummary:
        "General summary (mock): We’re turning complex research into a clear, shareable page so others can understand it quickly and reach out to collaborate.",
      metadata: `Metadata (mock): ${sourceLabel} • Updated=${nowISO} • Visibility=draft`,
    },
  };
}
