import { Hono } from "hono";
import { userProfile } from "./routes/profile";

const app = new Hono();

app
  .get("/", (c) => {
    return c.text("Hello Hono!");
  })
  .route("/profile", userProfile);

export default app;
