import { PrismaClient } from "@prisma/client";
import { PrismaD1 } from "@prisma/adapter-d1";
import { Context } from "hono";

export interface PrismaContext {
  Bindings: { DB: D1Database };
};
export const prismaContext = (
  c: Context<PrismaContext>
) => {
  const adapter = new PrismaD1(c.env.DB);
  const prisma = new PrismaClient({ adapter });

  return prisma;
};
