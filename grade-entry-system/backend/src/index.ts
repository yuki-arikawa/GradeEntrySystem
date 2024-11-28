import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { authRoutes } from './routes/auth';
import { scoreRoutes } from './routes/scores';

const app = new Hono();

// CORS設定
app.use(
  '*',
  cors({
    origin: 'https://gradeentrysystem.pages.dev/',
    allowHeaders: ['Content-Type', 'Authorization'],
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

// 認証関連のルートを設定
app.route('/auth', authRoutes);
app.route('/scores', scoreRoutes);

export default app;