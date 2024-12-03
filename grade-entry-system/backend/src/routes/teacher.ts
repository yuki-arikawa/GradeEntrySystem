import { Hono } from "hono";
import { Context } from "hono";
import { PrismaClient } from "@prisma/client";
import { PrismaD1 } from "@prisma/adapter-d1";
import { authMiddleware } from "../utils/auth";
import { Payload } from "../utils/jwt";

const teacherRoutes = new Hono();

// Prisma Clientを初期化する関数
const getPrisma = (db: D1Database) => {
  const adapter = new PrismaD1(db);
  return new PrismaClient({ adapter });
};

// 日付ごとの点数一覧取得エンドポイント
teacherRoutes.get('/scores/date', authMiddleware, async (c: Context<{ Bindings: { DB: D1Database } }>) => {
  const prisma = getPrisma(c.env.DB);

  const payload: Payload = c.get('jwtPayload');
  const role = payload.role;

  if(role !== 'teacher'){
    return c.json({ error: 'This page is for teachers only'}, 403);
  }

  // クエリパラメータから日付取得
  const dateParam = c.req.query('date');
  if(!dateParam){
    return c.json({error: 'Date query parameter is required'}, 400);
  }

  // 日付フォーマットの検証
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(dateParam)) {
    return c.json({ error: 'Invalid date format, expected YYYY-MM-DD' }, 400);
  }

  // 日付をDate型に変換
  const date = new Date(dateParam);

  try {
    // 指定された日付の点数を取得
    const scores = await prisma.score.findMany({
      where: { testDate: date },
      select: { userId: true, score: true },
      orderBy: { userId: 'asc' },
    });

    return c.json({ data: scores }, 200);
  } catch(error) {
    return c.json(
      { error: 'Failed to retrieve scores by date', details: error instanceof Error ? error.message : 'Unknown error' },
      500
    );
  }
});

export { teacherRoutes };