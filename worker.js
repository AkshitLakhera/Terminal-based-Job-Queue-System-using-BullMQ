import pkg from "bullmq";
const { Worker } = pkg;
import { connection } from "./connection.js";
console.log("Worker started");
const worker= new Worker("job-queue",
    async (job)=>{
        const value=job.data.value;
        console.log("check value");
        await new Promise((res) =>setTimeout(res,3000));
        //just intentially failing it to see
        if (job.id === "5") {
          process.exit(1);
        }        
        if (value % 2 !== 0) {
            throw new Error(" Odd number error (intentional)");
    }
    console.log(` Job ${job.id} completed`);
},
{connection,
concurrency: 50
}
);
worker.on("failed", (job, err) => {
    console.log(
      ` Job ${job.id} failed (attempt ${job.attemptsMade}) → ${err.message}`
    );
  });