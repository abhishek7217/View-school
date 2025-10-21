
import Link from "next/link";

export default function Home() {
  return (
    <div style={{ maxWidth: 800, margin: "30px auto", padding: 20 }}>
      <h1>School Directory</h1>
      <p>Welcome — click a link below:</p>

      <div style={{ display: "flex", gap: 12 }}>
        <Link
          href="/addSchool"
          style={{
            display: "inline-block",
            padding: "10px 16px",
            background: "#0ea5a4",
            color: "#fff",
            borderRadius: 8,
            textDecoration: "none",
            fontWeight: 600
          }}
        >
          ➕ Add School
        </Link>

        <Link
          href="/showSchools"
          style={{
            display: "inline-block",
            padding: "10px 16px",
            background: "#06b6d4",
            color: "#fff",
            borderRadius: 8,
            textDecoration: "none",
            fontWeight: 600
          }}
        >
          📚 Show Schools
        </Link>
      </div>

      <hr style={{ margin: "20px 0" }} />

      <p style={{ color: "#666" }}>
        Note: Use <strong>Add School</strong> to open the form. Use <strong>Show Schools</strong> to view all schools.
      </p>
    </div>
  );
}
