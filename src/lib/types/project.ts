export type Visibility = "draft" | "private" | "link" | "public";
export type ProjectStatus = "draft" | "published";

export type ImportSource =
  | { kind: "pdf"; filename: string }
  | { kind: "link"; url: string };

export type ProjectBlockKind =
  | "background"
  | "question"
  | "methods"
  | "results"
  | "next_steps"
  | "collab_asks"
  | "limitations"
  | "other";

export type ProjectBlock = {
  id: string;
  kind: ProjectBlockKind;
  title: string;
  content: string; // markdown-ish text
};

export type ProjectDraft = {
  id: string;
  ownerId: string; // future: auth user id
  title: string;
  summary: string;
  status: ProjectStatus;
  visibility: Visibility;
  lastUpdatedISO: string;

  source: ImportSource;
  userIntent: string;

  tags: string[];
  blocks: ProjectBlock[];

  rightPanel: {
    scientificSummary: string;
    generalSummary: string;
    metadata: string;
  };
};

// ---- Import job types (future: DB table) ----
export type ImportJobStatus = "queued" | "running" | "completed" | "failed";

export type ImportJob = {
  id: string;
  ownerId: string;
  status: ImportJobStatus;

  source: ImportSource;
  userIntent: string;

  createdAt: number; // epoch ms
  startedAt: number; // epoch ms

  progressPct: number;
  stepMessage: string;

  // when done:
  projectId?: string;

  // when failed:
  error?: string;

  // mock only: deterministic duration
  mockDurationMs: number;
};
