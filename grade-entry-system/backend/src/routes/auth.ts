import { Hono } from 'hono';
import { Context } from 'hono';
import { PrismaClient } from '@prisma/client';
import { PrismaD1 } from '@prisma/adapter-d1';
import { generateToken } from '../utils/jwt';
import { hashPassword, verifyPassword } from '../utils/bcrypt';

const authRoutes = new Hono();

// Prisma Clientを初期化する関数
const getPrismaClient = (db: D1Database) => {
  const adapter = new PrismaD1(db);
  return new PrismaClient({ adapter });
}

// ログインエンドポイント
authRoutes.post('/login', async (c: Context<{ Bindings: { DB: D1Database } }>) => {
  const prisma = getPrismaClient(c.env.DB);
  const {id, password} = await c.req.json<{ id: number; password: string }>();

  // ユーザーをデータベースから取得
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if(!user){
    return c.json({ error: 'User not found' }, 404);
  }

  // パスワード検証
  const isPasswordValid = await verifyPassword(password, user.passwordHash);
  if(!isPasswordValid){
    return c.json({error: 'Invalid password'}, 401);
  }

  // JWTトークンの生成
  const token = generateToken({ id: user.id, role: user.role });

  return c.json({ token });
});

// ユーザー登録エンドポイント
authRoutes.post('/register', async (c: Context<{ Bindings: { DB: D1Database } }>) => {
  const prisma = getPrismaClient(c.env.DB);

  const { id, password, role } = await c.req.json<{ id: number; password: string; role: string }>();
  // パスワードのハッシュ化
  const hashedPassword = await hashPassword(password);

  // 新しいユーザーをデータベースに挿入
  try {
    const newUser = await prisma.user.create({
      data: {
        id,
        passwordHash: hashedPassword,
        role,
      },
    });
    return c.json({ newUser }, 201);
  } catch (error) {
    return c.json({ error: 'User registration failed', details: error.message }, 500);
  }
});

export {authRoutes};