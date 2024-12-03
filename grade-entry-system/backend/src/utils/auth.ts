import { Context } from 'hono';
import { getCookie } from 'hono/cookie';
import { getRoleFromToken, getUserIdFromToken } from './jwt';


// 関数の定義
export const getUserIdFromRequest = (c: Context<{ Bindings: { DB: D1Database } }>): number | null => {
  // Authorization ヘッダーからトークンを取得
  const token = getCookie(c, 'token');
  if (!token) return null;

  // トークンから userId を取得
  return getUserIdFromToken(token);
};

export const getRoleFromRequest = (c: Context<{ Bindings: { DB: D1Database } }>): string | null => {
  // Authorization ヘッダーからトークンを取得
  const token = getCookie(c, 'token');
  if (!token) return null;

  // トークンから role を取得
  return getRoleFromToken(token);
}