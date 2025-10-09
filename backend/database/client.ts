import { neon } from "@neondatabase/serverless";

export const sql = neon(Bun.env.DATABASE_URL!);
