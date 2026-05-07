import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { getVoterUpcomingElections, getResults } from "../../api/api";

export default function ViewResults() {
  const [elections, setElections] = useState([]);
  const [selectedElection, setSelectedElection] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => { getVoterUpcomingElections().then((r) => setElections(r.data)).catch(() => {}); }, []);

  const fetchResults = (eid) => {
    if (!eid) return;
    setError("");
    getResults(eid).then((r) => setResults(r.data)).catch(() => { setResults([]); setError("Results not yet declared for this election."); });
  };

  const maxVotes = results.length > 0 ? Math.max(...results.map(r => r.votecount)) : 0;
  const winner = results.length > 0 ? [...results].sort((a, b) => b.votecount - a.votecount)[0] : null;

  return (
    <Layout>
      <h1 style={styles.title}>Election Results</h1>
      <p style={styles.sub}>View declared election results and vote counts.</p>

      <div style={styles.card}>
        <div style={styles.selectorRow}>
          <label style={styles.label}>Select Election</label>
          <select style={styles.select} value={selectedElection} onChange={(e) => { setSelectedElection(e.target.value); fetchResults(e.target.value); setResults([]); }}>
            <option value="">Choose an election</option>
            {elections.map((e) => <option key={e.electionid} value={e.electionid}>{e.name}</option>)}
          </select>
        </div>

        {error && <div style={styles.info}>{error}</div>}

        {winner && (
          <div style={styles.winnerCard}>
            <div style={styles.winnerLabel}>🏆 Winner</div>
            <div style={styles.winnerName}>{winner.candidateid}</div>
            <div style={styles.winnerVotes}>{winner.votecount} votes</div>
          </div>
        )}

        {results.length > 0 && (
          <div style={styles.resultsList}>
            <div style={styles.resultsHeader}>
              <span>Rank</span><span>Candidate</span><span>Votes</span><span>Share</span>
            </div>
            {[...results].sort((a, b) => b.votecount - a.votecount).map((r, i) => {
              const total = results.reduce((s, x) => s + x.votecount, 0);
              const pct = total > 0 ? ((r.votecount / total) * 100).toFixed(1) : 0;
              return (
                <div key={r.candidateid} style={styles.resultRow}>
                  <span style={{ ...styles.rank, background: i === 0 ? "#d4af37" : "#f0f0f0", color: i === 0 ? "#0d1b2a" : "#7f8c8d" }}>#{i + 1}</span>
                  <span style={{ fontWeight: i === 0 ? 700 : 400, color: "#0d1b2a", fontSize: 14 }}>{r.candidateid}</span>
                  <span style={{ fontWeight: 600, color: "#0d1b2a" }}>{r.votecount}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 80, height: 6, background: "#f0f0f0", borderRadius: 3 }}>
                      <div style={{ height: "100%", background: i === 0 ? "#d4af37" : "#1a5276", borderRadius: 3, width: `${(r.votecount / maxVotes) * 100}%` }} />
                    </div>
                    <span style={{ fontSize: 12, color: "#7f8c8d" }}>{pct}%</span>
                  </div>
                </div>
              );
            })}
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
  selectorRow: { display: "flex", flexDirection: "column", gap: 6, marginBottom: 24 },
  label: { fontSize: 12, fontWeight: 600, color: "#2c3e50", letterSpacing: 0.4 },
  select: { padding: "10px 14px", border: "1.5px solid #dde2e8", borderRadius: 7, fontSize: 14, fontFamily: "'Georgia', serif", background: "#fff", color: "#0d1b2a", outline: "none", maxWidth: 360 },
  info: { background: "#fef9e7", border: "1px solid #d4af37", color: "#d35400", padding: "10px 14px", borderRadius: 8, fontSize: 13, marginBottom: 20 },
  winnerCard: { background: "#0d1b2a", borderRadius: 12, padding: "24px 28px", textAlign: "center", marginBottom: 24 },
  winnerLabel: { fontSize: 14, color: "#95a5a6", marginBottom: 8 },
  winnerName: { fontSize: 28, fontWeight: 700, color: "#d4af37", fontFamily: "'Georgia', serif", marginBottom: 4 },
  winnerVotes: { fontSize: 14, color: "#bdc3c7" },
  resultsList: { display: "flex", flexDirection: "column", gap: 0 },
  resultsHeader: { display: "grid", gridTemplateColumns: "60px 1fr 80px 140px", padding: "8px 16px", fontSize: 11, fontWeight: 700, color: "#7f8c8d", letterSpacing: 1, textTransform: "uppercase", borderBottom: "2px solid #e8eaed" },
  resultRow: { display: "grid", gridTemplateColumns: "60px 1fr 80px 140px", padding: "14px 16px", alignItems: "center", borderBottom: "1px solid #f5f5f5" },
  rank: { width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 },
};
