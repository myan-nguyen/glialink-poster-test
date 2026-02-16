import { Queue } from "bullmq";
import { redis } from "./connection";

export const importQueue = new Queue("import-queue", {
  connection: redis,
  defaultJobOptions: {
    attempts: 3,
    backoff: { type: "exponential", delay: 2000 },
    removeOnComplete: 50,
    removeOnFail: 50,
  },
});
