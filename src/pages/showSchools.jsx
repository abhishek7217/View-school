
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get("/api/schools");
        setSchools(res.data.schools || []);
      } catch (err) {
        console.error("fetch schools error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return (
    <div className="container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Schools</h1>
        <Link href="/" style={{ color: "#06b6d4", textDecoration: "none" }}>← Home</Link>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid">
          {schools.length === 0 && <div>No schools found. Add one at /addSchool</div>}
          {schools.map((s) => (
            <div key={s.id} className="card">
              {s.image ? (
                <img src={s.image} alt={s.name} />
              ) : (
                <div style={{ height: 150, display: "flex", alignItems: "center", justifyContent: "center", background: "#f6f6f6" }}>
                  No Image
                </div>
              )}
              <div className="card-body">
                <h3 style={{ margin: 0 }}>{s.name}</h3>
                <p style={{ margin: "8px 0" }}>{s.address}</p>
                <div className="small-muted">{s.city} • {s.state}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
