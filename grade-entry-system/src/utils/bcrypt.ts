import bcrypt from 'bcryptjs';

// パスワードをハッシュ化する関数
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;  // ハッシュの強度指定
  return await bcrypt.hash(password, saltRounds);
};

// パスワードを検証する関数
export const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
}