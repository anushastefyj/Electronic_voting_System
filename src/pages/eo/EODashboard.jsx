import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useAuth } from "../../context/AuthContext";
import { getEORequests } from "../../api/api";

export default function EODashboard() {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);

  useEffect(() => { getEORequests().then((r) => setRequests(r.data)).catch(() => {}); }, []);

  const pending = requests.filter(r => r.passedstatus === 2).length;
  const processed = requests.filter(r => r.passedstatus === 3).length;

  return (
    <Layout>
      <div style={styles.header}>
        <h1 style={styles.title}>Electoral Officer Dashboard</h1>
        <p style={styles.sub}>Welcome, {user?.userid} — Process voter ID requests for your constituency.</p>
      </div>

      <div style={styles.statGrid}>
        <div style={{ ...styles.statCard, borderTop: "4px solid #d35400" }}>
          <div style={styles.statIcon}>📋</div>
          <div style={{ ...styles.statValue, color: "#d35400" }}>{pending}</div>
          <div style={styles.statLabel}>Pending Approvals</div>
        </div>
        <div style={{ ...styles.statCard, borderTop: "4px solid #1e8449" }}>
          <div style={styles.statIcon}>✓</div>
          <div style={{ ...styles.statValue, color: "#1e8449" }}>{processed}</div>
          <div style={styles.statLabel}>Processed</div>
        </div>
        <div style={{ ...styles.statCard, borderTop: "4px solid #1a5276" }}>
          <div style={styles.statIcon}>📊</div>
          <div style={{ ...styles.statValue, color: "#1a5276" }}>{requests.length}</div>
          <div style={styles.statLabel}>Total Requests</div>
        </div>
      </div>

      <div style={styles.infoCard}>
        <h2 style={styles.cardTitle}>Your Responsibilities</h2>
        <ul style={styles.list}>
          <li>Review voter ID applications forwarded by the Administrator</li>
          <li>Generate voter IDs for approved applicants</li>
          <li>Reject requests that do not meet eligibility criteria</li>
          <li>Voter ID format: 2 letters (name) + 2 letters (constituency) + 4 digits</li>
        </ul>
      </div>
    </Layout>
  );
}

const styles = {
  header: { marginBottom: 32 },
  title: { fontSize: 26, fontWeight: 700, color: "#0d1b2a", margin: "0 0 6px", fontFamily: "'Georgia', serif" },
  sub: { fontSize: 14, color: "#7f8c8d" },
  statGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 28 },
  statCard: { background: "#fff", borderRadius: 12, padding: "28px 24px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", textAlign: "center" },
  statIcon: { fontSize: 32, marginBottom: 12 },
  statValue: { fontSize: 40, fontWeight: 700, fontFamily: "'Georgia', serif" },
  statLabel: { fontSize: 13, color: "#7f8c8d", marginTop: 4 },
  infoCard: { background: "#fff", borderRadius: 12, padding: 28, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" },
  cardTitle: { fontSize: 16, fontWeight: 700, color: "#0d1b2a", margin: "0 0 16px", fontFamily: "'Georgia', serif" },
  list: { paddingLeft: 20, display: "flex", flexDirection: "column", gap: 10, color: "#2c3e50", fontSize: 14, lineHeight: 1.6 },
};
