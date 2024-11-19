import jwt from 'jsonwebtoken';

// 環境変数から秘密鍵を取得
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

// トークンの有効期限
const TOKEN_EXPIRY = '1h';

// トークンを生成する関数
export const generateToken = (payload: object): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
};

// トークンを検証する関数
export const verifyToken = (token: string): object | string | null => {
  try{
    return jwt.verify(token, JWT_SECRET);
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

    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    return decoded.id;
  }catch(error){
    console.error('Failed to extract userId from token:', error);
    return null;
  }
}