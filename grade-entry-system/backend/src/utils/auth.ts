import { createMiddleware } from 'hono/factory';
import { jwt } from 'hono/jwt';


export const authMiddleware = createMiddleware(async (c, next) => {
  const jwtMiddleware = jwt({ secret: c.env.JWT_SECRET });
  return jwtMiddleware(c, next)
});