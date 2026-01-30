import { Hono } from "hono";
import { getSession } from "../lib/session";
import { verifyMessage } from "viem";
import { randomBytes } from "crypto";
import { getCookie, setCookie } from "hono/cookie";

const auth = new Hono();

auth.get("/nonce", async (c) => {
  const session = await getSession(c.req.raw, c.res as any);

  const timestamp = Date.now();
  const random = randomBytes(32).toString("hex");
  const nonce = `${timestamp}-${random}`;

  session.nonce = nonce;
  session.isAuthenticated = false;
  await session.save();

  return c.json({ nonce });
});

auth.post("/verify", async (c) => {
  const { address, signature } = await c.req.json();
  const session = await getSession(c.req.raw, c.res as any);

  if (!address || !signature) {
    return c.json({ error: "Address and signature required" }, 400);
  }

  if (!session.nonce) {
    return c.json({ error: "No nonce found" }, 401);
  }

  const [timestamp] = session.nonce.split("-");
  const age = Date.now() - parseInt(timestamp);
  if (age > 5 * 60 * 1000) {
    return c.json({ error: "Nonce expired" }, 401);
  }

  const message = `Sign this message to authenticate with your wallet.\n\nNonce: ${session.nonce}`;

  const isValid = await verifyMessage({
    address: address as `0x${string}`,
    message,
    signature: signature as `0x${string}`,
  });

  if (!isValid) {
    return c.json({ error: "Invalid signature" }, 401);
  }

  session.address = address.toLowerCase();
  session.isAuthenticated = true;
  session.nonce = undefined;
  await session.save();

  return c.json({
    success: true,
    address: session.address,
  });
});

auth.get("/me", async (c) => {
  const session = await getSession(c.req.raw, c.res as any);

  if (!session.isAuthenticated) {
    return c.json({ authenticated: false }, 401);
  }

  return c.json({
    authenticated: true,
    address: session.address,
  });
});

auth.post("/logout", async (c) => {
  const session = await getSession(c.req.raw, c.res as any);
  session.destroy();
  return c.json({ success: true });
});

auth.get("/session", async (c) => {
  const session = await getSession(c.req.raw, c.res as any);

  if (!session.isAuthenticated || !session.address) {
    return c.json({ error: "No active session" }, 401);
  }

  return c.json({
    valid: true,
    wallet_address: session.address,
  });
});

export default auth;
