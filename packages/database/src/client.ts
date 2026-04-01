import * as dotenv from "dotenv"
dotenv.config()
import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "./generated/prisma/client"

console.log("DB PASS:", process.env.DATABASE_URL)

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
})
const globalForPrisma = globalThis as typeof globalThis & {
  prisma?: PrismaClient
}
export const prisma: PrismaClient =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
  })
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma
}
