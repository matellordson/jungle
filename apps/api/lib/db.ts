import postgres from "postgres";

const DATABASE_URL =
  process.env.DATABASE_URL ||
  "postgresql://bun_app_user.kapkoywrllrbgqixqbzl:r37YE7w3QUs@aws-0-us-west-2.pooler.supabase.com:6543/postgres";

export async function getDbWithContext(walletAddress: string) {
  const connection = postgres(DATABASE_URL);

  await connection`
    SELECT set_config('app.current_user_address', ${walletAddress.toLowerCase()}, true)
  `;

  return connection;
}

export default postgres(DATABASE_URL, {
  max: 10,
  idle_timeout: 20,
});
