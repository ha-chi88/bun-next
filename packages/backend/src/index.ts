import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { PrismaContext, prismaContext } from "./lib/prisma";
import { z } from "zod";
import { cors } from "hono/cors";

const app = new Hono<PrismaContext>()
  .use(
    "*",
    cors({
      origin: "*",//["https://rod.expfrom.me", "http://localhost:3000"], // 本番と開発環境のURL
      allowHeaders: ["X-Custom-Header", "Upgrade-Insecure-Requests"],
      allowMethods: ["POST", "GET", "OPTIONS"],
      exposeHeaders: ["Content-Length", "X-Kuma-Revision"],
      maxAge: 600,
      credentials: true,
    })
  )
  .get("/", async (c) => {
    const prisma = prismaContext(c);

    const prefectures = await prisma.prefecture.findMany();
    return c.json(prefectures);
  })
  .post(
    "/",
    zValidator(
      "json",
      z.object({ name: z.string(), prefectureId: z.string() })
    ),
    async (c) => {
      const prisma = prismaContext(c);
      const { name, prefectureId } = c.req.valid("json");
      const prefecture = await prisma.prefecture.create({
        data: { name, prefectureId },
      });
      return c.json(prefecture, 201);
    }
  );

export type AppType = typeof app;
export default app;
