import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { authRoutes } from './routes/auth';
import { scoreRoutes } from './routes/scores';

const app = new Hono();

const allowedOrigins = [
  'http://localhost:3001',
  'https://gradeentrysystem.pages.dev',
];

// CORS設定
app.use(
  '*',
  cors({
    origin: (origin) => {
      console.log('CORS Origin:', origin); // デバッグ用
      if (allowedOrigins.includes(origin)) {
        return origin;
      }
      return null; // 許可されていない場合は CORS エラー
    },
    allowHeaders: ['Content-Type', 'Authorization'],
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

// 認証関連のルートを設定
app.route('/auth', authRoutes);
app.route('/scores', scoreRoutes);

export default app;