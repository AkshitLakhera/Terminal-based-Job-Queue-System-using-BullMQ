import { Queue } from "bullmq";
import { connection } from "./connection.js";
const queue = new Queue("job-queue",{connection});
const value=Number(process.argv[2]);
if (isNaN(value)) {
    console.log(" Please provide a number");
    process.exit(1);
  }
  try {
    const job = await queue.add("process-number", { value });
    console.log(" JOB STORED IN REDIS", job.id);
    await queue.close(); // I need to wait for Redis connection to close
    process.exit(0);
  } catch (err) {
    console.error(" FAILED TO ADD JOB:", err);
    process.exit(1);
  }
  
