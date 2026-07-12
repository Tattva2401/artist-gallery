import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "npx tsx prisma/seed.ts", // Integrates your seeding directly into the CLI tool!
  },
  datasource: {
    // In Prisma 7, the migration tool uses this single direct URL connection
    url: env("DIRECT_URL"), 
  },
});