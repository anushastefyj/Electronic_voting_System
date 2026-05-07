import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { getEORequests, generateVoterId, rejectVoterId } from "../../api/api";

export default function GenerateVoterId() {
  const [requests, setRequests] = useState([]);
  const [msg, setMsg] = useState(""); const [error, setError] = useState("");

  const fetch = () => getEORequests().then((r) => setRequests(r.data)).catch(() => {});
  useEffect(() => { fetch(); }, []);

  const handleGenerate = async (userId) => {
    setMsg(""); setError("");
    try {
      await generateVoterId(userId);
      setMsg(`Voter ID generated successfully for ${userId}`);
      fetch();
    } catch (err) { setError(err.response?.data?.message || "Failed to generate voter ID."); }
  };

  const handleReject = async (userId) => {
    setMsg(""); setError("");
    try {
      await rejectVoterId(userId);
      setMsg(`Request for ${userId} rejected.`);
      fetch();
    } catch (err) { setError(err.response?.data?.message || "Failed to reject request."); }
  };

  const pending = requests.filter(r => r.passedstatus === 2 || r.approvedstatus === null);
  const processed = requests.filter(r => r.passedstatus === 3);

  return (
    <Layout>
      <h1 style={styles.title}>Voter ID Requests</h1>
      <p style={styles.sub}>These requests have been approved by the Administrator. Generate or reject each voter ID.</p>

      {msg && <div style={styles.success}>{msg}</div>}
      {error && <div style={styles.error}>{error}</div>}

      <div style={styles.tableCard}>
        <h2 style={styles.cardTitle}>Pending — Awaiting Your Action ({pending.length})</h2>
        {pending.length === 0 ? (
          <p style={styles.empty}>No pending requests at this time.</p>
        ) : (
          <table style={styles.table}>
            <thead><tr>{["User ID", "Constituency", "Action"].map(h => <Th key={h}>{h}</Th>)}</tr></thead>
            <tbody>
              {pending.map((r, i) => (
                <tr key={r.userid} style={{ background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                  <Td><span style={styles.id}>{r.userid}</span></Td>
                  <Td>{r.constituency}</Td>
                  <Td>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button style={styles.generateBtn} onClick={() => handleGenerate(r.userid)}>✓ Generate ID</button>
                      <button style={styles.rejectBtn} onClick={() => handleReject(r.userid)}>✗ Reject</button>
                    </div>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {processed.length > 0 && (
        <div style={{ ...styles.tableCard, marginTop: 24 }}>
          <h2 style={styles.cardTitle}>Processed Requests ({processed.length})</h2>
          <table style={styles.table}>
            <thead><tr>{["User ID", "Constituency", "Voter ID", "Status"].map(h => <Th key={h}>{h}</Th>)}</tr></thead>
            <tbody>
              {processed.map((r, i) => (
                <tr key={r.userid} style={{ background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                  <Td><span style={styles.id}>{r.userid}</span></Td>
                  <Td>{r.constituency}</Td>
                  <Td>{r.voterid ? <span style={styles.voterId}>{r.voterid}</span> : "—"}</Td>
                  <Td>
                    <span style={{ background: r.approvedstatus === 1 ? "#f0fdf4" : "#fdf0f0", color: r.approvedstatus === 1 ? "#1e8449" : "#c0392b", padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600 }}>
                      {r.approvedstatus === 1 ? "Approved" : "Rejected"}
                    </span>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Layout>
  );
}

function Th({ children }) { return <th style={{ padding: "12px 16px", textAlign: "left", fontSize: 12, fontWeight: 700, color: "#7f8c8d", letterSpacing: 1, textTransform: "uppercase", borderBottom: "2px solid #e8eaed", background: "#f9fafb" }}>{children}</th>; }
function Td({ children }) { return <td style={{ padding: "12px 16px", fontSize: 14, color: "#2c3e50", borderBottom: "1px solid #f0f0f0" }}>{children}</td>; }

const styles = {
  title: { fontSize: 26, fontWeight: 700, color: "#0d1b2a", marginBottom: 8, fontFamily: "'Georgia', serif" },
  sub: { fontSize: 14, color: "#7f8c8d", marginBottom: 24 },
  success: { background: "#f0fdf4", border: "1px solid #27ae60", color: "#1e8449", padding: "10px 14px", borderRadius: 8, fontSize: 13, marginBottom: 16 },
  error: { background: "#fdf0f0", border: "1px solid #e74c3c", color: "#c0392b", padding: "10px 14px", borderRadius: 8, fontSize: 13, marginBottom: 16 },
  tableCard: { background: "#fff", borderRadius: 12, padding: 28, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" },
  cardTitle: { fontSize: 16, fontWeight: 700, color: "#0d1b2a", margin: "0 0 20px", fontFamily: "'Georgia', serif" },
  table: { width: "100%", borderCollapse: "collapse" },
  empty: { color: "#7f8c8d", fontStyle: "italic", fontSize: 14 },
  id: { background: "#eaf0fb", color: "#1a5276", padding: "2px 8px", borderRadius: 4, fontSize: 12, fontWeight: 600 },
  voterId: { background: "#fef9e7", color: "#d35400", padding: "2px 8px", borderRadius: 4, fontSize: 12, fontWeight: 700 },
  generateBtn: { padding: "6px 14px", background: "#1e8449", color: "#fff", border: "none", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'Georgia', serif" },
  rejectBtn: { padding: "6px 14px", background: "transparent", color: "#c0392b", border: "1px solid #c0392b", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'Georgia', serif" },
};
