// test-conn.js
import pkg from 'pg';
const { Client } = pkg;

const connectionString = process.env.DATABASE_URL || 'paste_your_DATABASE_URL_here';

const client = new Client({
  connectionString,
  ssl: { rejectUnauthorized: false },
  connectionTimeoutMillis: 5000
});

(async () => {
  try {
    await client.connect();
    console.log('CONNECTED OK');
    const res = await client.query('SELECT 1 as ok');
    console.log('QUERY RESULT:', res.rows);
    await client.end();
  } catch (err) {
    console.error('CONN ERROR:', err.message);
    process.exit(1);
  }
})();
