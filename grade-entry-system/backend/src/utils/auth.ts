import { createMiddleware } from 'hono/factory';
import { jwt } from 'hono/jwt';

export const authMiddleware = createMiddleware(async (c, next) => {
  const jwtMiddleware = jwt({ secret: process.env.JWT_SECRET || 'secret' });
  return jwtMiddleware(c, next)
});