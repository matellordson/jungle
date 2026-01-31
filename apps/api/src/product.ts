import { Hono } from "hono";
import { getSession } from "../lib/session";
import { getDbWithContext } from "../lib/db";

type Variables = {
  address: string;
};

export const product = new Hono<{ Variables: Variables }>();

product.use("/*", async (c, next) => {
  const session = await getSession(c.req.raw, c.res as any);

  if (!session.isAuthenticated || !session.address) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  c.set("address", session.address);
  await next();
});

product.get("/all", async (c) => {
  const address = c.get("address");
  const db = await getDbWithContext(address);
  const products = await db`
  SELECT * FROM product
  `;
  await db.end();
  return c.json(products);
});
