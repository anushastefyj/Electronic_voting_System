import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useAuth } from "../../context/AuthContext";
import { requestVoterId, getMyVoterId } from "../../api/api";

export default function RequestVoterId() {
  const { user } = useAuth();
  const [constituency, setConstituency] = useState("");
  const [existing, setExisting] = useState(null);
  const [msg, setMsg] = useState(""); const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.userid) {
      getMyVoterId(user.userid).then((r) => {
        // Only set existing if response has actual data (not empty {})
        const data = r.data;
        if (data && data.userid) {
          setExisting(data);
        } else {
          setExisting(null);
        }
      }).catch(() => setExisting(null));
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault(); setMsg(""); setError(""); setLoading(true);
    try {
      await requestVoterId({ userid: user.userid, constituency });
      setMsg("Voter ID request submitted! The Administrator will review and forward to Electoral Officer.");
      getMyVoterId(user.userid).then((r) => {
        const data = r.data;
        if (data && data.userid) {
          setExisting(data);
        } else {
          setExisting(null);
        }
      }).catch(() => {});
    } catch (err) { setError(err.response?.data?.message || "Request failed. You may have already submitted a request."); }
    finally { setLoading(false); }
  };

  return (
    <Layout>
      <h1 style={styles.title}>Request Voter ID</h1>
      <p style={styles.sub}>Submit your request to receive a Voter ID for participating in elections.</p>

      {existing?.voterid && (
        <div style={styles.assignedCard}>
          <div style={styles.assignedLabel}>🎉 Your Voter ID has been assigned!</div>
          <div style={styles.assignedId}>{existing.voterid}</div>
          <div style={styles.assignedConstituency}>Constituency: {existing.constituency}</div>
        </div>
      )}

      {!existing?.voterid && (
        <div style={styles.formCard}>
          <h2 style={styles.cardTitle}>Submit Request</h2>

          {existing && existing.userid && !existing.voterid && (
            <div style={styles.statusInfo}>
              <div style={styles.statusDot} />
              <span>Your request is being processed (Status: {existing.passedstatus === 1 ? "Submitted" : existing.passedstatus === 2 ? "Forwarded to EO" : "Under Review"})</span>
            </div>
          )}

          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.field}>
              <label style={styles.label}>User ID</label>
              <input style={{ ...styles.input, background: "#f9fafb", color: "#7f8c8d" }} value={user?.userid} disabled />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Constituency *</label>
              <input style={styles.input} value={constituency} onChange={(e) => setConstituency(e.target.value)} placeholder="Enter your constituency" required />
            </div>
            {msg && <div style={styles.success}>{msg}</div>}
            {error && <div style={styles.error}>{error}</div>}
            <button type="submit" style={styles.btn} disabled={loading || !!(existing && existing.userid)}>
              {loading ? "Submitting..." : (existing && existing.userid) ? "Request Already Submitted" : "Submit Request"}
            </button>
          </form>
        </div>
      )}

      <div style={styles.infoCard}>
        <h2 style={styles.cardTitle}>Request Process</h2>
        <div style={styles.timeline}>
          {[
            { label: "You submit a request", status: (existing && existing.userid) ? "done" : "pending" },
            { label: "Admin reviews and forwards to Electoral Officer", status: existing?.passedstatus >= 2 ? "done" : "pending" },
            { label: "Electoral Officer generates your Voter ID", status: existing?.voterid ? "done" : "pending" },
            { label: "You receive your Voter ID", status: existing?.voterid ? "done" : "pending" },
          ].map((step, i) => (
            <div key={i} style={styles.timelineRow}>
              <div style={{ ...styles.timelineDot, background: step.status === "done" ? "#1e8449" : "#dde2e8" }} />
              <span style={{ fontSize: 14, color: step.status === "done" ? "#1e8449" : "#7f8c8d", fontWeight: step.status === "done" ? 600 : 400 }}>{step.label}</span>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

const styles = {
  title: { fontSize: 26, fontWeight: 700, color: "#0d1b2a", marginBottom: 8, fontFamily: "'Georgia', serif" },
  sub: { fontSize: 14, color: "#7f8c8d", marginBottom: 24 },
  assignedCard: { background: "#0d1b2a", borderRadius: 12, padding: "32px", textAlign: "center", marginBottom: 24 },
  assignedLabel: { fontSize: 16, color: "#fff", marginBottom: 12 },
  assignedId: { fontSize: 40, fontWeight: 700, color: "#d4af37", letterSpacing: 4, fontFamily: "'Georgia', serif", marginBottom: 8 },
  assignedConstituency: { fontSize: 13, color: "#95a5a6" },
  formCard: { background: "#fff", borderRadius: 12, padding: 28, marginBottom: 24, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" },
  cardTitle: { fontSize: 16, fontWeight: 700, color: "#0d1b2a", margin: "0 0 20px", fontFamily: "'Georgia', serif" },
  statusInfo: { display: "flex", alignItems: "center", gap: 8, background: "#fef9e7", border: "1px solid #d4af37", borderRadius: 8, padding: "10px 14px", marginBottom: 20, fontSize: 13, color: "#d35400" },
  statusDot: { width: 8, height: 8, borderRadius: "50%", background: "#d4af37", flexShrink: 0 },
  form: { display: "flex", flexDirection: "column", gap: 16 },
  field: { display: "flex", flexDirection: "column", gap: 5 },
  label: { fontSize: 12, fontWeight: 600, color: "#2c3e50", letterSpacing: 0.4 },
  input: { padding: "10px 14px", border: "1.5px solid #dde2e8", borderRadius: 7, fontSize: 14, fontFamily: "'Georgia', serif", background: "#fff", color: "#0d1b2a", outline: "none" },
  success: { background: "#f0fdf4", border: "1px solid #27ae60", color: "#1e8449", padding: "10px 14px", borderRadius: 8, fontSize: 13 },
  error: { background: "#fdf0f0", border: "1px solid #e74c3c", color: "#c0392b", padding: "10px 14px", borderRadius: 8, fontSize: 13 },
  btn: { padding: "12px 28px", background: "#0d1b2a", color: "#d4af37", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: "pointer", alignSelf: "flex-start", fontFamily: "'Georgia', serif" },
  infoCard: { background: "#fff", borderRadius: 12, padding: 28, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" },
  timeline: { display: "flex", flexDirection: "column", gap: 16 },
  timelineRow: { display: "flex", alignItems: "center", gap: 12 },
  timelineDot: { width: 12, height: 12, borderRadius: "50%", flexShrink: 0 },
};