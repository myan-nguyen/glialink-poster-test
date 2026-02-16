import { Worker } from "bullmq";
import { redis } from "./connection";
import { runImportJob } from "../work/importPipeline";

export function startWorker() {
  const worker = new Worker(
    "import-queue",
    async (job) => {
      const { projectId, importJobId } = job.data as { projectId: string; importJobId: string };
      try {
        await runImportJob({ projectId, importJobId });
        
        // Force garbage collection after each job to prevent memory buildup
        if (global.gc) {
          global.gc();
        }
        
        return { ok: true };
      } catch (err) {
        // Force GC even on failure
        if (global.gc) {
          global.gc();
        }
        throw err;
      }
    },
    {
      connection: redis,
      concurrency: 1, // Process one job at a time to reduce memory pressure
      lockDuration: 300_000, // 5 minutes - enough time for API calls
      stalledInterval: 60_000, // Check for stalled jobs every 60s (default is 30s)
    }
  );

  worker.on("completed", (job) => {
    console.log("✅ Job completed:", job.id);
  });

  worker.on("failed", (job, err) => {
    console.error("❌ Worker failed:", job?.id, err.message);
  });

  worker.on("error", (err) => {
    console.error("❌ Worker error:", err);
  });

  console.log("✅ Import worker started (lockDuration: 5min, stalledInterval: 60s, concurrency: 1)");
}
