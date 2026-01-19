import { Hono } from "hono";
import { getSession } from "../lib/session";
import { getDbWithContext } from "../lib/db";

type Variables = {
  address: string;
};

const user = new Hono<{ Variables: Variables }>();

user.use("/*", async (c, next) => {
  const session = await getSession(c.req.raw, c.res as any);

  if (!session.isAuthenticated || !session.address) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  c.set("address", session.address);
  await next();
});

user.get("/profile", async (c) => {
  const address = c.get("address");
  const db = await getDbWithContext(address);

  const [userProfile] = await db`
    SELECT id, wallet_address, created_at
    FROM users
    WHERE wallet_address = ${address}
  `;

  await db.end();

  if (!userProfile) {
    return c.json({ error: "User not found" }, 404);
  }

  return c.json({ profile: userProfile });
});

user.post("/data", async (c) => {
  const address = c.get("address");
  const { data } = await c.req.json();

  const db = await getDbWithContext(address);

  const [existingUser] = await db`
    INSERT INTO users (wallet_address)
    VALUES (${address})
    ON CONFLICT (wallet_address) DO UPDATE SET wallet_address = ${address}
    RETURNING id
  `;

  const [savedData] = await db`
    INSERT INTO user_data (user_id, data)
    VALUES (${existingUser.id}, ${JSON.stringify(data)})
    RETURNING *
  `;

  await db.end();

  return c.json({ success: true, data: savedData });
});

user.get("/data", async (c) => {
  const address = c.get("address");
  const db = await getDbWithContext(address);

  const userData = await db`
    SELECT ud.*
    FROM user_data ud
    JOIN users u ON ud.user_id = u.id
    WHERE u.wallet_address = ${address}
    ORDER BY ud.created_at DESC
  `;

  await db.end();

  return c.json({ data: userData });
});

export default user;
