import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useAuth } from "../../context/AuthContext";
import { getAllElections, getAllParties, getPendingVoterRequests } from "../../api/api";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({ elections: 0, parties: 0, pendingRequests: 0 });

  useEffect(() => {
    Promise.all([getAllElections(), getAllParties(), getPendingVoterRequests()])
      .then(([e, p, r]) => setStats({ elections: e.data.length, parties: p.data.length, pendingRequests: r.data.length }))
      .catch(() => {});
  }, []);

  const cards = [
    { label: "Total Elections", value: stats.elections, icon: "🗳", path: "/admin/elections", color: "#1a5276" },
    { label: "Registered Parties", value: stats.parties, icon: "🏛", path: "/admin/parties", color: "#6c3483" },
    { label: "Pending Voter Requests", value: stats.pendingRequests, icon: "📋", path: "/admin/voter-requests", color: "#c0392b" },
  ];

  const quickActions = [
    { label: "Add New Election", path: "/admin/elections", icon: "＋" },
    { label: "Add Party", path: "/admin/parties", icon: "＋" },
    { label: "Assign Candidate", path: "/admin/candidates", icon: "＋" },
    { label: "Approve Results", path: "/admin/results", icon: "✓" },
  ];

  return (
    <Layout>
      <div style={styles.pageHeader}>
        <div>
          <h1 style={styles.pageTitle}>Admin Dashboard</h1>
          <p style={styles.pageSub}>Welcome back, {user?.userid} — Manage elections and oversee the voting process.</p>
        </div>
      </div>

      <div style={styles.statGrid}>
        {cards.map((c) => (
          <div key={c.label} style={{ ...styles.statCard, borderTop: `4px solid ${c.color}` }} onClick={() => navigate(c.path)}>
            <div style={styles.statIcon}>{c.icon}</div>
            <div style={{ ...styles.statValue, color: c.color }}>{c.value}</div>
            <div style={styles.statLabel}>{c.label}</div>
          </div>
        ))}
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Quick Actions</h2>
        <div style={styles.actionGrid}>
          {quickActions.map((a) => (
            <button key={a.label} style={styles.actionBtn} onClick={() => navigate(a.path)}>
              <span style={styles.actionIcon}>{a.icon}</span>
              {a.label}
            </button>
          ))}
        </div>
      </div>
    </Layout>
  );
}

const styles = {
  pageHeader: { marginBottom: 32 },
  pageTitle: { fontSize: 28, fontWeight: 700, color: "#0d1b2a", margin: "0 0 6px", fontFamily: "'Georgia', serif" },
  pageSub: { fontSize: 14, color: "#7f8c8d" },
  statGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 36 },
  statCard: { background: "#fff", borderRadius: 12, padding: "28px 24px", cursor: "pointer", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", transition: "transform 0.2s", textAlign: "center" },
  statIcon: { fontSize: 32, marginBottom: 12 },
  statValue: { fontSize: 40, fontWeight: 700, fontFamily: "'Georgia', serif" },
  statLabel: { fontSize: 13, color: "#7f8c8d", marginTop: 4, letterSpacing: 0.5 },
  section: { background: "#fff", borderRadius: 12, padding: 28, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" },
  sectionTitle: { fontSize: 18, fontWeight: 700, color: "#0d1b2a", margin: "0 0 20px", fontFamily: "'Georgia', serif" },
  actionGrid: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 },
  actionBtn: { padding: "16px 12px", background: "#f4f6f9", border: "1.5px solid #e8eaed", borderRadius: 10, cursor: "pointer", fontSize: 14, fontFamily: "'Georgia', serif", color: "#0d1b2a", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, fontWeight: 600 },
  actionIcon: { fontSize: 20 },
};
