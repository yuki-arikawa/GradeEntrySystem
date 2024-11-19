import { Hono } from 'hono';
import { Context } from 'hono';
import { PrismaClient } from '@prisma/client';
import { PrismaD1 } from '@prisma/adapter-d1';
import { getUserIdFromToken } from '../utils/jwt';

const scoreRoutes = new Hono();

// Prisma Clientを初期化する関数
const getPrisma = (db: D1Database) => {
  const adapter = new PrismaD1(db);
  return new PrismaClient({ adapter });
}

// 型定義
type ScoreEntryRequest = {
  score: number;
  testDate: string; // YYYY-MM-DD形式
};

// 点数入力エンドポイント
scoreRoutes.post('/entry', async (c: Context<{ Bindings: { DB: D1Database } }>) => {
  const prisma = getPrisma(c.env.DB);
  const { score, testDate } = await c.req.json<ScoreEntryRequest>();
  // Authorizationからトークン取得
  const token = c.req.header('Authorization')?.split(' ')[1];
  if(!token){
    return c.json({ error: 'Authorization token missing' }, 401);
  }

  // トークンから userId を取得
  const userId = getUserIdFromToken(token);
  console.log(typeof(userId));
  if(!userId) {
    return c.json({ error: 'Invalid or expired token' }, 401);
  }

  // 点数データをデータベースに保存
  try{
    const newScore = await prisma.score.create({
      data: {
        userId,
        score,
        testDate: new Date(testDate),
      },
    });
    return c.json({ newScore }, 201);
  }catch(error){
    return c.json({ error: 'Failed to save score', details: error.message  }, 500);
  }
});

// 点数履歴取得エンドポイント
scoreRoutes.get('/history', async (c: Context<{ Bindings: { DB: D1Database } }>) => {
  const prisma = getPrisma(c.env.DB);

  // Authorizationからトークン取得
  const token = c.req.header('Authorization')?.split(' ')[1];
  if(!token){
    return c.json({ error: 'Authorization token missing' }, 401);
  }

  // トークンからuserIdを取得
  const userId = getUserIdFromToken(token);
  if(!userId) {
    return c.json({ error: 'Invalid or expired token' }, 401);
  }

  // 点数履歴をデータベースから取得
  try{
    const scoreHistory = await prisma.score.findMany({
      where: { userId },
      orderBy: { testDate: 'desc' }, // 日付の降順
    });
    return c.json({ scoreHistory }, 200);
  } catch(error) {
    return c.json({ error: 'Failed to retrieve score history', details: error.message }, 500);
  }

})

export { scoreRoutes };