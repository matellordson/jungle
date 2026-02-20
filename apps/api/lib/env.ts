// Load environment variables explicitly
import { config } from "dotenv";
import { resolve } from "path";

// Load .env file from backend directory
config({ path: resolve(process.cwd(), ".env") });

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const env = {
  PORT: Number(process.env.PORT) || 3001,
  SESSION_SECRET: requireEnv("SESSION_SECRET"),
  DATABASE_URL: requireEnv("DATABASE_URL"),
  FRONTEND_URL: requireEnv("FRONTEND_URL"),
  NODE_ENV: process.env.NODE_ENV,
};

// Validate on startup
if (env.SESSION_SECRET.length < 32) {
  throw new Error("SESSION_SECRET must be at least 32 characters");
}
