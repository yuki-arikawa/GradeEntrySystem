import { Hono } from 'hono';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { PrismaD1 } from '@prisma/adapter-d1';
import { Context } from 'hono';
import 'dotenv/config';

type Bindings = {
  DB: D1Database;
};

// HonoとPrismaの定義
const app = new Hono<{Bindings: Bindings}>();


// JWT秘密鍵の設定
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

// 型定義
type LoginRequest = {
  id: number;
  password: string;
};

type RegisterRequest = {
  id: number;
  password: string;
  role: string;
};

// ユーザー情報取得エンドポイント（デバッグ用）
app.get("/users", async(c: Context) => {
  const adapter = new PrismaD1(c.env.DB);
  const prisma = new PrismaClient({adapter});

  // ユーザーをデータベースから取得
  const user = await prisma.user.findMany();

  return c.json(user);
});

// ユーザー登録エンドポイント
app.post("/auth/register", async (c: Context) => {
  // Prisma ClientとAdapterの設定
  const adapter = new PrismaD1(c.env.DB);
  const prisma = new PrismaClient({ adapter });

  const { id, password, role } = await c.req.json<RegisterRequest>();

  // パスワードハッシュ化
  const hashedPassword = await bcrypt.hash(password, 10);

  // 新しいユーザーをデータベースに挿入
  try{
    const newUser = await prisma.user.create({
      data: {
        id,
        passwordHash: hashedPassword,
        role,
      },
    });
    return c.json({newUser}, 201);
  }catch(error){
    return c.json({ error: 'User registration failed', details: error.message }, 500);
  }
});

// ログインエンドポイント
app.post("auth/login", async (c: Context) => {
  const adapter = new PrismaD1(c.env.DB);
  const prisma = new PrismaClient({adapter});

  const {id, password} = await c.req.json<LoginRequest>();

  // ユーザーをデータベースから取得
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if(!user){
    return c.json({ error: 'User not found' }, 404);
  }

  // パスワード検証
  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  if(!isPasswordValid){
    return c.json({error: 'Invalid password'}, 401);
  }

  // JWTトークンの生成
  const token = jwt.sign({ id: user.id.toString(), role: user.role }, JWT_SECRET, {
    expiresIn: '1h',
  })

  return c.json({ token });
});

export default app;