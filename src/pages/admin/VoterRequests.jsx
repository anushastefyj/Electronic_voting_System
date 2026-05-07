import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { getPendingVoterRequests, approveVoterRequest } from "../../api/api";

export default function VoterRequests() {
  const [requests, setRequests] = useState([]);
  const [msg, setMsg] = useState(""); const [error, setError] = useState("");

  const fetch = () => getPendingVoterRequests().then((r) => setRequests(r.data)).catch(() => {});
  useEffect(() => { fetch(); }, []);

  const handleApprove = async (userId) => {
    setMsg(""); setError("");
    try {
      await approveVoterRequest(userId);
      setMsg(`Request for ${userId} forwarded to Electoral Officer.`);
      fetch();
    } catch (err) { setError(err.response?.data?.message || "Failed to approve request."); }
  };

  const statusLabel = (s) => {
    if (s === 1) return { text: "New Request", color: "#1a5276", bg: "#eaf0fb" };
    if (s === 2) return { text: "Forwarded to EO", color: "#d35400", bg: "#fef9e7" };
    if (s === 3) return { text: "EO Processed", color: "#1e8449", bg: "#f0fdf4" };
    return { text: "Unknown", color: "#7f8c8d", bg: "#f9fafb" };
  };

  return (
    <Layout>
      <h1 style={styles.title}>Voter ID Requests</h1>
      <p style={styles.sub}>Review voter ID applications and forward approved ones to the Electoral Officer.</p>

      {msg && <div style={styles.success}>{msg}</div>}
      {error && <div style={styles.error}>{error}</div>}

      <div style={styles.tableCard}>
        <h2 style={styles.cardTitle}>Pending Requests ({requests.filter(r => r.passedstatus === 1).length})</h2>
        {requests.length === 0 ? (
          <p style={styles.empty}>No voter requests at this time.</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>{["User ID", "Constituency", "Status", "Voter ID", "Action"].map(h => <Th key={h}>{h}</Th>)}</tr>
            </thead>
            <tbody>
              {requests.map((r, i) => {
                const s = statusLabel(r.passedstatus);
                return (
                  <tr key={r.userid} style={{ background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                    <Td><span style={styles.id}>{r.userid}</span></Td>
                    <Td>{r.constituency}</Td>
                    <Td>
                      <span style={{ background: s.bg, color: s.color, padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600 }}>{s.text}</span>
                    </Td>
                    <Td>{r.voterid || "—"}</Td>
                    <Td>
                      {r.passedstatus === 1 ? (
                        <button style={styles.approveBtn} onClick={() => handleApprove(r.userid)}>
                          Forward to EO →
                        </button>
                      ) : (
                        <span style={{ fontSize: 12, color: "#7f8c8d" }}>No action needed</span>
                      )}
                    </Td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
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
  approveBtn: { padding: "6px 14px", background: "#0d1b2a", color: "#d4af37", border: "none", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'Georgia', serif" },
};
