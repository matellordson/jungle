import postgres from "postgres";

const DATABASE_URL =
  process.env.DATABASE_URL ||
  "postgresql://bun_app_user.kapkoywrllrbgqixqbzl:r37YE7w3QUs@aws-0-us-west-2.pooler.supabase.com:6543/postgres";

// Default connection pool
const sql = postgres(DATABASE_URL, {
  max: 10,
  idle_timeout: 20,
});

// Execute queries with RLS context
export async function withRLSContext(walletAddress: string, callback: any) {
  return await sql.begin(async (txn) => {
    // Set RLS context within transaction
    await txn.unsafe(
      `SELECT set_config('app.current_user_address', '${walletAddress.toLowerCase()}', true)`,
    );

    // Execute callback with transaction
    return await callback(txn);
  });
}

export default sql;
