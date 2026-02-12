import type { ImportJob, ImportSource } from "@/lib/types/project";
import { startImportJob, pollImportJob } from "@/lib/storage/importJobsStore";

/**
 * Mock client API for import.
 * Later: replace implementations with fetch("/api/import/start") etc.
 */

export async function startImport(params: {
  ownerId: string;
  source: ImportSource;
  userIntent: string;
}): Promise<ImportJob> {
  return startImportJob(params);
}

export async function getImportStatus(jobId: string): Promise<ImportJob | null> {
  return pollImportJob(jobId);
}
