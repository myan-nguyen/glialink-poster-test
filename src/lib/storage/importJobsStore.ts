import type { ImportJob, ImportSource } from "@/lib/types/project";
import { upsertProject } from "@/lib/storage/projectsStore";
import { buildMockProjectDraft } from "@/lib/mock/contentTemplates";

const KEY = "glialink_import_jobs_v1";

function rid(prefix: string) {
  return `${prefix}_${Math.random().toString(16).slice(2)}`;
}

function safeParse<T>(raw: string | null): T | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function loadJobs(): ImportJob[] {
  if (typeof window === "undefined") return [];
  return safeParse<ImportJob[]>(localStorage.getItem(KEY)) ?? [];
}

function saveJobs(jobs: ImportJob[]) {
  localStorage.setItem(KEY, JSON.stringify(jobs));
}

function upsertJob(job: ImportJob) {
  const all = loadJobs();
  const idx = all.findIndex((j) => j.id === job.id);
  if (idx >= 0) all[idx] = job;
  else all.unshift(job);
  saveJobs(all);
  return job;
}

const STEPS: Array<{ pct: number; msg: string }> = [
  { pct: 12, msg: "Uploading / fetching source…" },
  { pct: 35, msg: "Extracting structure…" },
  { pct: 60, msg: "Generating project blocks…" },
  { pct: 82, msg: "Creating tags and summaries…" },
  { pct: 96, msg: "Finalizing project…" },
  { pct: 100, msg: "Done" },
];

function computeProgress(job: ImportJob, now: number) {
  const elapsed = Math.max(0, now - job.startedAt);
  const t = Math.min(1, elapsed / job.mockDurationMs);
  const pct = Math.floor(t * 100);

  // choose step message by pct thresholds
  let msg = STEPS[0].msg;
  for (const s of STEPS) {
    if (pct >= s.pct) msg = s.msg;
  }
  return { pct, msg, done: pct >= 100 };
}

export function startImportJob(args: {
  ownerId: string;
  source: ImportSource;
  userIntent: string;
}): ImportJob {
  const now = Date.now();

  const job: ImportJob = {
    id: rid("job"),
    ownerId: args.ownerId,
    status: "running",
    source: args.source,
    userIntent: args.userIntent,
    createdAt: now,
    startedAt: now,
    progressPct: 0,
    stepMessage: "Starting…",
    mockDurationMs: 2600, // tweak as you like
  };

  return upsertJob(job);
}

export function pollImportJob(jobId: string): ImportJob | null {
  const job = loadJobs().find((j) => j.id === jobId);
  if (!job) return null;

  if (job.status === "completed" || job.status === "failed") return job;

  const now = Date.now();
  const { pct, msg, done } = computeProgress(job, now);

  let updated: ImportJob = {
    ...job,
    progressPct: pct,
    stepMessage: msg,
  };

  if (done) {
    // Create project ONCE, attach projectId to job
    const project = buildMockProjectDraft({
      ownerId: job.ownerId,
      source: job.source,
      userIntent: job.userIntent,
    });
    upsertProject(project);

    updated = {
      ...updated,
      status: "completed",
      projectId: project.id,
      progressPct: 100,
      stepMessage: "Done",
    };
  }

  return upsertJob(updated);
}
