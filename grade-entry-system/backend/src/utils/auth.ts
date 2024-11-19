import { Context } from 'hono';
import { getUserIdFromToken } from './jwt'; // 既存の `getUserIdFromToken` をインポート

// 関数の定義
export const getUserIdFromRequest = (c: Context<{ Bindings: { DB: D1Database } }>): number | null => {
  // Authorization ヘッダーからトークンを取得
  const token = c.req.header('Authorization')?.split(' ')[1];
  if (!token) return null;

  // トークンから userId を取得
  return getUserIdFromToken(token);
};