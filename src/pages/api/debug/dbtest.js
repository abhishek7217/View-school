// src/pages/api/debug/dbtest.js
import pkg from "pg";
const { Client } = pkg;

export default async function handler(req, res) {
  const connectionString = process.env.DATABASE_URL || "";
  if (!connectionString) {
    return res.status(400).json({ error: "DATABASE_URL is not set in env" });
  }

  const client = new Client({
    connectionString,
    // allow connection from hosted envs
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 5000,
  });

  try {
    await client.connect();
    const result = await client.query("SELECT 1 AS ok");
    await client.end();
    return res.status(200).json({ ok: true, rows: result.rows });
  } catch (err) {
    return res.status(500).json({ error: err.message, stack: err.stack?.split("\n").slice(0,10) });
  }
}
