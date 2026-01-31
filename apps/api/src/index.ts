import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import auth from "./auth";
import user from "./user";
import { product } from "./product";

const app = new Hono();

app.use("*", logger());

app.use(
  "*",
  cors({
    origin: "http://localhost:3001",
    credentials: true,
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
  }),
);

app.get("/health", (c) => c.json({ status: "ok" }));

app.route("/auth", auth);
app.route("/user", user);
app.route("products", product);

const port = Number(process.env.PORT) || 8000;

console.log(`🚀 Server running on http://localhost:${port}`);

export default {
  port,
  fetch: app.fetch,
};
