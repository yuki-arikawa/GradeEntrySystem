import { Hono } from 'hono';
import { authRoutes } from './routes/auth';
import { scoreRoutes } from './routes/scores';

const app = new Hono();

// 認証関連のルートを設定
app.route('/auth', authRoutes);
app.route('/scores', scoreRoutes);

export default app;