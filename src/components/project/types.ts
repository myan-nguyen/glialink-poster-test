export type ProjectStatus = "IMPORTING" | "DRAFT" | "PUBLISHED" | "FAILED";

export type ProjectSidebarData = {
  seeking?: string[];
  offering?: string[];
  title?: string;
  authors?: string[];
  labName?: string;
  labAffiliation?: string;
  aiSynthesis?: string[]; // bullet list
};

export type ProjectDTO = {
  id: string;
  status: ProjectStatus;
  updatedAtISO: string;

  // right panel data
  sidebar: ProjectSidebarData;

  // structured sections you asked for:
  parsed: {
    researchQuestion?: string;
    methodology?: string;
    results?: string;
    conclusions?: string;
  };

  // job status (optional if importing)
  job?: {
    status: "queued" | "running" | "completed" | "failed";
    progressPct: number;
    message: string;
  };
};
