import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { getAllElections, getElectionResults, approveResults } from "../../api/api";

export default function ApproveResults() {
  const [elections, setElections] = useState([]);
  const [selectedElection, setSelectedElection] = useState("");
  const [results, setResults] = useState([]);
  const [msg, setMsg] = useState(""); const [error, setError] = useState("");

  useEffect(() => { getAllElections().then((r) => setElections(r.data)).catch(() => {}); }, []);

  const fetchResults = (eid) => {
    if (!eid) return;
    getElectionResults(eid).then((r) => setResults(r.data)).catch(() => setResults([]));
  };

  const handleApprove = async () => {
    if (!selectedElection) return;
    setMsg(""); setError("");
    try {
      await approveResults(selectedElection);
      setMsg("Results approved and declared successfully!");
    } catch (err) { setError(err.response?.data?.message || "Failed to approve results."); }
  };

  const maxVotes = results.length > 0 ? Math.max(...results.map(r => r.votecount)) : 0;

  return (
    <Layout>
      <h1 style={styles.title}>Election Results</h1>
      <p style={styles.sub}>Review vote counts and approve results for public declaration.</p>

      <div style={styles.card}>
        <div style={{ display: "flex", gap: 16, alignItems: "flex-end", marginBottom: 24 }}>
          <div style={{ flex: 1 }}>
            <label style={styles.label}>Select Election</label>
            <select style={styles.select} value={selectedElection} onChange={(e) => { setSelectedElection(e.target.value); fetchResults(e.target.value); }}>
              <option value="">Choose an election</option>
              {elections.map((e) => <option key={e.electionid} value={e.electionid}>{e.name} ({e.electionid})</option>)}
            </select>
          </div>
          {selectedElection && results.length > 0 && (
            <button style={styles.approveBtn} onClick={handleApprove}>Approve & Declare Results</button>
          )}
        </div>

        {msg && <div style={styles.success}>{msg}</div>}
        {error && <div style={styles.error}>{error}</div>}

        {results.length === 0 && selectedElection && <p style={styles.empty}>No results found for this election.</p>}

        {results.length > 0 && (
          <div style={styles.resultsList}>
            <div style={styles.resultsHeader}>
              <span>Candidate</span><span>Party</span><span style={{ textAlign: "right" }}>Votes</span>
            </div>
            {[...results].sort((a, b) => b.votecount - a.votecount).map((r, i) => (
              <div key={r.candidateid} style={{ ...styles.resultRow, background: i === 0 ? "#fffdf0" : "#fff", border: i === 0 ? "1.5px solid #d4af37" : "1.5px solid #f0f0f0" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  {i === 0 && <span style={{ fontSize: 18 }}>🏆</span>}
                  <span style={{ fontWeight: i === 0 ? 700 : 400, color: "#0d1b2a" }}>{r.candidateid}</span>
                </div>
                <span style={{ color: "#7f8c8d", fontSize: 13 }}>{r.electionid}</span>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontWeight: 700, fontSize: 18, color: i === 0 ? "#c0392b" : "#0d1b2a" }}>{r.votecount}</div>
                  <div style={{ height: 6, background: "#f0f0f0", borderRadius: 3, marginTop: 4, width: 100 }}>
                    <div style={{ height: "100%", background: i === 0 ? "#d4af37" : "#1a5276", borderRadius: 3, width: `${(r.votecount / maxVotes) * 100}%`, transition: "width 0.5s" }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

const styles = {
  title: { fontSize: 26, fontWeight: 700, color: "#0d1b2a", marginBottom: 8, fontFamily: "'Georgia', serif" },
  sub: { fontSize: 14, color: "#7f8c8d", marginBottom: 24 },
  card: { background: "#fff", borderRadius: 12, padding: 28, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" },
  label: { display: "block", fontSize: 12, fontWeight: 600, color: "#2c3e50", letterSpacing: 0.4, marginBottom: 6 },
  select: { width: "100%", padding: "10px 14px", border: "1.5px solid #dde2e8", borderRadius: 7, fontSize: 14, fontFamily: "'Georgia', serif", background: "#fff", color: "#0d1b2a", outline: "none" },
  approveBtn: { padding: "11px 24px", background: "#1e8449", color: "#fff", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap", fontFamily: "'Georgia', serif" },
  success: { background: "#f0fdf4", border: "1px solid #27ae60", color: "#1e8449", padding: "10px 14px", borderRadius: 8, fontSize: 13, marginBottom: 16 },
  error: { background: "#fdf0f0", border: "1px solid #e74c3c", color: "#c0392b", padding: "10px 14px", borderRadius: 8, fontSize: 13, marginBottom: 16 },
  empty: { color: "#7f8c8d", fontStyle: "italic", fontSize: 14 },
  resultsList: { display: "flex", flexDirection: "column", gap: 10 },
  resultsHeader: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", padding: "8px 16px", fontSize: 12, fontWeight: 700, color: "#7f8c8d", letterSpacing: 1, textTransform: "uppercase" },
  resultRow: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", padding: "16px 20px", borderRadius: 10, alignItems: "center" },
};
