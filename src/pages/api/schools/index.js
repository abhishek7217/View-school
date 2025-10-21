
import pool from "../../../../lib/db";

export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const result = await pool.query(
        "SELECT id, name, address, city, state, contact, image, email_id FROM schools ORDER BY id DESC"
      );
      return res.status(200).json({ schools: result.rows });
    } catch (err) {
      console.error("GET /api/schools error:", err);
      return res.status(500).json({ error: err.message });
    }
  }

  if (req.method === "POST") {
    try {
      const { name, address, city, state, contact, image, email_id } = req.body;

      if (!name) return res.status(400).json({ error: "Name is required" });

      const insertQuery = `INSERT INTO schools (name, address, city, state, contact, image, email_id)
                           VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`;
      const values = [
        name,
        address || null,
        city || null,
        state || null,
        contact || null,
        image || null,
        email_id || null,
      ];

      const result = await pool.query(insertQuery, values);
      return res.status(201).json({ id: result.rows[0].id });
    } catch (err) {
      console.error("POST /api/schools error:", err);
      return res.status(500).json({ error: err.message });
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
