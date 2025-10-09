import { Hono } from "hono";
import { sql } from "../../database/client";

export const userProfile = new Hono();

async function getUserProfile() {
  try {
    const response = await sql`SELECT * FROM profile`;
    return response;
  } catch (error) {
    console.log(error);
  }
}

userProfile.get("/", async (c) => {
  const data = await getUserProfile();
  return c.json(data);
});
