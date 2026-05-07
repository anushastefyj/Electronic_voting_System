import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useAuth } from "../../context/AuthContext";
import { getMyVoterId, getVoterUpcomingElections } from "../../api/api";

export default function VoterDashboard() {
  const { user } = useAuth();
  const [voterInfo, setVoterInfo] = useState(null);
  const [upcomingCount, setUpcomingCount] = useState(0);

  useEffect(() => {
    if (user?.userid) {
      getMyVoterId(user.userid).then((r) => setVoterInfo(r.data)).catch(() => {});
      getVoterUpcomingElections().then((r) => setUpcomingCount(r.data.length)).catch(() => {});
    }
  }, [user]);

  return (
    <Layout>
      <div style={styles.header}>
        <h1 style={styles.title}>Voter Dashboard</h1>
        <p style={styles.sub}>Welcome, {user?.userid} — Your democratic portal.</p>
      </div>

      <div style={styles.voterCard}>
        <div style={styles.voterLeft}>
          <div style={styles.voterIcon}>🗳</div>
          <div>
            <div style={styles.voterLabel}>Your Voter ID</div>
            {voterInfo?.voterid ? (
              <div style={styles.voterId}>{voterInfo.voterid}</div>
            ) : (
              <div style={styles.noId}>Not yet assigned — request your voter ID</div>
            )}
          </div>
        </div>
        <div style={{ fontSize: 13, color: "#7f8c8d" }}>
          Constituency: {voterInfo?.constituency || "Pending"}
        </div>
      </div>

      <div style={styles.statGrid}>
        <StatCard icon="📅" value={upcomingCount} label="Upcoming Elections" color="#1a5276" />
        <StatCard icon="✓" value={voterInfo?.voterid ? "Ready" : "Pending"} label="Voter ID Status" color={voterInfo?.voterid ? "#1e8449" : "#c0392b"} />
      </div>

      <div style={styles.stepsCard}>
        <h2 style={styles.cardTitle}>How to Vote</h2>
        {[
          { step: "1", text: "Register & request your Voter ID from the portal" },
          { step: "2", text: "Wait for Electoral Officer to generate and assign your Voter ID" },
          { step: "3", text: "View upcoming elections and the list of candidates" },
          { step: "4", text: "On election day, cast your vote using your Voter ID" },
          { step: "5", text: "View the results once the Admin declares them" },
        ].map((s) => (
          <div key={s.step} style={styles.stepRow}>
            <div style={styles.stepNum}>{s.step}</div>
            <div style={styles.stepText}>{s.text}</div>
          </div>
        ))}
      </div>
    </Layout>
  );
}

function StatCard({ icon, value, label, color }) {
  return (
    <div style={{ background: "#fff", borderRadius: 12, padding: "28px 24px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", textAlign: "center", borderTop: `4px solid ${color}` }}>
      <div style={{ fontSize: 32, marginBottom: 12 }}>{icon}</div>
      <div style={{ fontSize: 32, fontWeight: 700, color, fontFamily: "'Georgia', serif" }}>{value}</div>
      <div style={{ fontSize: 13, color: "#7f8c8d", marginTop: 4 }}>{label}</div>
    </div>
  );
}

const styles = {
  header: { marginBottom: 24 },
  title: { fontSize: 26, fontWeight: 700, color: "#0d1b2a", margin: "0 0 6px", fontFamily: "'Georgia', serif" },
  sub: { fontSize: 14, color: "#7f8c8d" },
  voterCard: { background: "#0d1b2a", borderRadius: 12, padding: "24px 28px", marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "space-between" },
  voterLeft: { display: "flex", alignItems: "center", gap: 16 },
  voterIcon: { fontSize: 36 },
  voterLabel: { fontSize: 12, color: "#95a5a6", letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 },
  voterId: { fontSize: 26, fontWeight: 700, color: "#d4af37", letterSpacing: 3, fontFamily: "'Georgia', serif" },
  noId: { fontSize: 14, color: "#7f8c8d", fontStyle: "italic" },
  statGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 },
  stepsCard: { background: "#fff", borderRadius: 12, padding: 28, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" },
  cardTitle: { fontSize: 16, fontWeight: 700, color: "#0d1b2a", margin: "0 0 20px", fontFamily: "'Georgia', serif" },
  stepRow: { display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 14 },
  stepNum: { width: 28, height: 28, background: "#0d1b2a", color: "#d4af37", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, flexShrink: 0 },
  stepText: { fontSize: 14, color: "#2c3e50", lineHeight: 1.7, paddingTop: 4 },
};
