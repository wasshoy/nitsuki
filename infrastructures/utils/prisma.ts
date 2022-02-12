import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["query", "error", "warn", "info"],
});

export default prisma;

export * from "@prisma/client";
