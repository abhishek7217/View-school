// src/pages/api/debug/dns.js
import dns from "dns";

export default async function handler(req, res) {
  try {
    const dbUrl = process.env.DATABASE_URL || "";
    let host = req.query.host || null;

    if (!host && dbUrl) {
      try {
        // try to parse hostname from DATABASE_URL
        const u = new URL(dbUrl);
        host = u.hostname;
      } catch (e) {
        // ignore parse error
      }
    }

    if (!host) return res.status(400).json({ error: "No host provided and DATABASE_URL not parseable." });

    // Do a DNS resolution using the server's resolver
    const lookup = await dns.promises.lookup(host);
    return res.status(200).json({ host, lookup });
  } catch (err) {
    return res.status(500).json({ error: err.message, stack: err.stack?.split("\n").slice(0,10) });
  }
}
