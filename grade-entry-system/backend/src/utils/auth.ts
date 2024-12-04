import { createMiddleware } from 'hono/factory';
import { jwt } from 'hono/jwt';


export const authMiddleware = createMiddleware(async (c, next) => {
  console.log(c.env.JWT_SECRET);
  const jwtMiddleware = jwt({ secret: c.env.JWT_SECRET });
  return jwtMiddleware(c, next)
});