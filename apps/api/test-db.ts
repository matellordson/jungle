import postgres from "postgres";

async function testDatabase() {
  const sql = postgres(process.env.DATABASE_URL!, {
    connect_timeout: 5,
  });

  try {
    const result = await sql`SELECT * from users`;
    console.log(result);
  } catch (err) {
    console.error("❌ Database connection failed");
    console.error(err);
  } finally {
    await sql.end();
  }
}

testDatabase();
