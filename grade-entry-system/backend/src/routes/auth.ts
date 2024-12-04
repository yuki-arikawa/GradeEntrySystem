import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client';
import { PrismaD1 } from '@prisma/adapter-d1';
import { sign } from 'hono/jwt';

import { hashPassword, verifyPassword } from '../utils/bcrypt';
import { authMiddleware } from '../utils/auth';

type Bindings = {
  JWT_SECRET: string,
  DB: D1Database
}

const authRoutes = new Hono<{Bindings: Bindings}>();

// Prisma Clientを初期化する関数
const getPrismaClient = (db: D1Database) => {
  const adapter = new PrismaD1(db);
  return new PrismaClient({ adapter });
}

// ログインエンドポイント
authRoutes.post('/login', async (c) => {
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

  try{
    // JWTトークンの生成
    // const token =  await generateToken({ id: user.id, role: user.role });
    const token = await sign({id: user.id, role: user.role, exp: Math.floor(Date.now() / 1000) + 60 * 60 }, c.env.JWT_SECRET);

    // クッキーを設定
    // c.header('Set-Cookie', `token=${token}; HttpOnly; Secure; Path=/; SameSite=None; Max-Age=3600`);

    return c.json({ token });
  }catch(error){
    return c.json({ error: 'Token generation failed' }, 500);
  }
});

// ログアウトエンドポイント
authRoutes.post('/logout', async (c) => {
  // トークンを削除するためのSet-Cookie
  c.header('Set-Cookie', 'token=; HttpOnly; Secure; Path=/; Max-Age=0');
  return c.json({ message: 'Logged out successfully' });
});

authRoutes.get('/check', authMiddleware, async (c) => {
  try{
    const payload = c.get('jwtPayload');
    if(payload){
      return c.json({ success: true }, 200);
    }else{
      return c.json({ error: 'Unauthorized', payload }, 401);
    }
  }catch(error){
    return c.json({ error: 'Unauthorized: Invalid token' }, 401);
  }
});

// ユーザー登録エンドポイント
authRoutes.post('/register', async (c) => {
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