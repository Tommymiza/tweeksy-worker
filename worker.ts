import dotenv from "dotenv";
import { run } from "graphile-worker";
import { Pool } from "pg";
import { testJob } from "./tasks/test";
dotenv.config();

async function main() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL.replace("?sslmode=require", ""),
    ssl:
      process.env.NODE_ENV === "development"
        ? false
        : {
            rejectUnauthorized: true,
            ca: process.env.DATABASE_CA,
          },
  });

  console.log(process.env.DATABASE_URL);

  const runner = await run({
    pgPool: pool,
    concurrency: 1,
    taskList: {
      testJob,
    },
  });

  await runner.promise;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
