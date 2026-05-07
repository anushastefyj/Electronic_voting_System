import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { getVoterUpcomingElections } from "../../api/api";

export default function UpcomingElections() {
  const [elections, setElections] = useState([]);

  useEffect(() => { getVoterUpcomingElections().then((r) => setElections(r.data)).catch(() => {}); }, []);

  return (
    <Layout>
      <h1 style={styles.title}>Upcoming Elections</h1>
      <p style={styles.sub}>Elections scheduled in your constituency.</p>
      {elections.length === 0 ? (
        <div style={styles.empty}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>📅</div>
          <div>No upcoming elections at this time.</div>
        </div>
      ) : (
        <div style={styles.grid}>
          {elections.map((e) => (
            <div key={e.electionid} style={styles.card}>
              <div style={styles.cardTop}>
                <span style={styles.badge}>{e.electionid}</span>
                <span style={styles.upcoming}>Upcoming</span>
              </div>
              <h2 style={styles.electionName}>{e.name}</h2>
              <div style={styles.details}>
                <Detail icon="📍" label="District" value={e.district} />
                <Detail icon="🏘" label="Constituency" value={e.constituency} />
                <Detail icon="🗓" label="Election Date" value={e.electiondate} />
                <Detail icon="📊" label="Counting Date" value={e.countingdate} />
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}

function Detail({ icon, label, value }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 0", borderBottom: "1px solid #f0f0f0" }}>
      <span>{icon}</span>
      <span style={{ fontSize: 12, color: "#7f8c8d", minWidth: 110 }}>{label}</span>
      <span style={{ fontSize: 14, color: "#0d1b2a", fontWeight: 500 }}>{value}</span>
    </div>
  );
}

const styles = {
  title: { fontSize: 26, fontWeight: 700, color: "#0d1b2a", marginBottom: 8, fontFamily: "'Georgia', serif" },
  sub: { fontSize: 14, color: "#7f8c8d", marginBottom: 24 },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 20 },
  card: { background: "#fff", borderRadius: 12, padding: 24, boxShadow: "0 2px 12px rgba(0,0,0,0.06)", borderTop: "4px solid #1a5276" },
  cardTop: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  badge: { background: "#eaf0fb", color: "#1a5276", padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600 },
  upcoming: { background: "#f0fdf4", color: "#1e8449", padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600 },
  electionName: { fontSize: 18, fontWeight: 700, color: "#0d1b2a", margin: "0 0 16px", fontFamily: "'Georgia', serif" },
  details: { display: "flex", flexDirection: "column" },
  empty: { textAlign: "center", padding: 60, color: "#7f8c8d", fontSize: 14, fontStyle: "italic" },
};
