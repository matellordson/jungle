import postgres from "postgres";

const DATABASE_URL = process.env.DATABASE_URL!;

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
