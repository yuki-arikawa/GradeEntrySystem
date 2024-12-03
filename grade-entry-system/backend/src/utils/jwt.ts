// import jwt from 'jsonwebtoken';
import { sign, verify } from "hono/jwt";

// 環境変数から秘密鍵を取得
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

// トークンの有効期限
const TOKEN_EXPIRY = Math.floor(Date.now() / 1000) + 60 * 60;

export type Payload = {
  id: number;
  role: string;
  exp: number;
}

// トークンを生成する関数
export const generateToken = async (payload: object): Promise<string> => {
  const token = await sign({...payload, exp: TOKEN_EXPIRY }, JWT_SECRET);
  return token;
};

// トークンを検証する関数
export const verifyToken = async (token: string): Promise<string | object | null> => {
  try{
    return verify(token, JWT_SECRET);
  }catch(error){
    console.error('Invalid token:', error);
    return null
  }
}

// トークンからuserIdを取得する関数
export const getUserIdFromToken = (token: string): number | null => {
  try{
    // ペイロードの型を定義
    interface JwtPayload {
      id: number;
    }

    const decoded = verifyToken(token);
    console.log(decoded);
    return decoded.id;
  }catch(error){
    console.error('Failed to extract userId from token:', error);
    return null;
  }
}

export const getRoleFromToken = (token: string): string | null => {
  try{
    // ペイロードの型を定義
    interface JwtPayload {
      role: string;
    }

    const decoded = verifyToken(token);
    return decoded.role;
  }catch(error){
    console.error('Failed to extract userId from token:', error);
    return null;
  }
}