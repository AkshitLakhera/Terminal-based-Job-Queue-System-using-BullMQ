import pkg from "bullmq";
const { Queue } = pkg;
import { connection } from "./connection.js";
const queue = new Queue("job-queue", { connection });
const TOTAL_JOBS = 50;
(async () => {
  for (let i = 1; i <= TOTAL_JOBS; i++) {
    await queue.add("process-number", { value: i });
    console.log("Added job", i);
  }
  await queue.close();
  process.exit(0);
})();
