import "dotenv/config";
import { startWorker } from "@/server/queue/worker";

startWorker();
