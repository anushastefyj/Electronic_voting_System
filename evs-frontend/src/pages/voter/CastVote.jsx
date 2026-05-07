import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useAuth } from "../../context/AuthContext";
import { getVoterUpcomingElections, getElectionCandidates, castVote, getMyVoterId } from "../../api/api";

export default function CastVote() {
  const { user } = useAuth();
  const [elections, setElections] = useState([]);
  const [selectedElection, setSelectedElection] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState("");
  const [voterId, setVoterId] = useState("");
  const [msg, setMsg] = useState(""); const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [voted, setVoted] = useState(false);

  useEffect(() => {
    getVoterUpcomingElections().then((r) => setElections(r.data)).catch(() => {});
    if (user?.userid) {
      getMyVoterId(user.userid).then((r) => setVoterId(r.data?.voterid || "")).catch(() => {});
    }
  }, [user]);

  const handleElectionChange = (e) => {
    setSelectedElection(e.target.value); setSelectedCandidate("");
    if (e.target.value) {
      getElectionCandidates(e.target.value).then((r) => setCandidates(r.data)).catch(() => setCandidates([]));
    } else { setCandidates([]); }
  };

  const handleVote = async (e) => {
    e.preventDefault(); setMsg(""); setError("");
    if (!voterId) { setError("You don't have a Voter ID yet. Please request one first."); return; }
    if (!selectedElection || !selectedCandidate) { setError("Please select an election and a candidate."); return; }
    setLoading(true);
    try {
      await castVote({ voterid: voterId, electionid: selectedElection, candidateid: selectedCandidate });
      setMsg("Your vote has been cast successfully! Thank you for participating.");
      setVoted(true);
    } catch (err) { setError(err.response?.data?.message || "Failed to cast vote. You may have already voted in this election."); }
    finally { setLoading(false); }
  };

  return (
    <Layout>
      <h1 style={styles.title}>Cast Your Vote</h1>
      <p style={styles.sub}>Your vote is secret and secure. Each voter can vote once per election.</p>

      {voted ? (
        <div style={styles.successCard}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>✅</div>
          <h2 style={styles.successTitle}>Vote Cast Successfully!</h2>
          <p style={styles.successText}>Your vote has been securely recorded. Thank you for participating in the democratic process.</p>
          <div style={styles.votedId}>Voter ID: {voterId}</div>
        </div>
      ) : (
        <div style={styles.formCard}>
          <div style={styles.voterIdRow}>
            <span style={styles.voterIdLabel}>Your Voter ID:</span>
            <span style={styles.voterIdValue}>{voterId || <span style={{ color: "#c0392b", fontStyle: "italic" }}>Not assigned — request Voter ID first</span>}</span>
          </div>

          <form onSubmit={handleVote} style={styles.form}>
            <div style={styles.field}>
              <label style={styles.label}>Select Election *</label>
              <select style={styles.select} value={selectedElection} onChange={handleElectionChange} required>
                <option value="">Choose an election</option>
                {elections.map((e) => <option key={e.electionid} value={e.electionid}>{e.name} — {e.constituency}</option>)}
              </select>
            </div>

            {candidates.length > 0 && (
              <div style={styles.field}>
                <label style={styles.label}>Select Candidate *</label>
                <div style={styles.candidateList}>
                  {candidates.map((c) => (
                    <div key={c.candidateid} style={{ ...styles.candidateCard, border: selectedCandidate === c.candidateid ? "2px solid #0d1b2a" : "1.5px solid #e8eaed", background: selectedCandidate === c.candidateid ? "#f0f4f8" : "#fff" }} onClick={() => setSelectedCandidate(c.candidateid)}>
                      <div style={styles.candidateRadio}>
                        <div style={{ ...styles.radioOuter, borderColor: selectedCandidate === c.candidateid ? "#0d1b2a" : "#bdc3c7" }}>
                          {selectedCandidate === c.candidateid && <div style={styles.radioInner} />}
                        </div>
                      </div>
                      <div>
                        <div style={styles.candidateName}>{c.name}</div>
                        <div style={styles.candidateMeta}>Party: {c.partyid} · {c.constituency}</div>
                        <div style={styles.candidateId}>{c.candidateid}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {msg && <div style={styles.success}>{msg}</div>}
            {error && <div style={styles.error}>{error}</div>}

            <button type="submit" style={styles.btn} disabled={loading || !voterId || !selectedCandidate}>
              {loading ? "Casting Vote..." : "🗳 Cast My Vote"}
            </button>
          </form>
        </div>
      )}
    </Layout>
  );
}

const styles = {
  title: { fontSize: 26, fontWeight: 700, color: "#0d1b2a", marginBottom: 8, fontFamily: "'Georgia', serif" },
  sub: { fontSize: 14, color: "#7f8c8d", marginBottom: 24 },
  successCard: { background: "#0d1b2a", borderRadius: 16, padding: "48px", textAlign: "center" },
  successTitle: { fontSize: 24, fontWeight: 700, color: "#d4af37", margin: "0 0 12px", fontFamily: "'Georgia', serif" },
  successText: { fontSize: 15, color: "#bdc3c7", lineHeight: 1.7, maxWidth: 400, margin: "0 auto 20px" },
  votedId: { background: "#1e3a5c", color: "#d4af37", padding: "8px 20px", borderRadius: 20, display: "inline-block", fontSize: 14, fontWeight: 600, letterSpacing: 2 },
  formCard: { background: "#fff", borderRadius: 12, padding: 32, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" },
  voterIdRow: { display: "flex", alignItems: "center", gap: 12, background: "#f9fafb", border: "1.5px solid #e8eaed", borderRadius: 8, padding: "12px 16px", marginBottom: 24 },
  voterIdLabel: { fontSize: 13, color: "#7f8c8d", fontWeight: 600 },
  voterIdValue: { fontSize: 15, fontWeight: 700, color: "#0d1b2a", letterSpacing: 1 },
  form: { display: "flex", flexDirection: "column", gap: 20 },
  field: { display: "flex", flexDirection: "column", gap: 8 },
  label: { fontSize: 12, fontWeight: 600, color: "#2c3e50", letterSpacing: 0.4 },
  select: { padding: "10px 14px", border: "1.5px solid #dde2e8", borderRadius: 7, fontSize: 14, fontFamily: "'Georgia', serif", background: "#fff", color: "#0d1b2a", outline: "none" },
  candidateList: { display: "flex", flexDirection: "column", gap: 10 },
  candidateCard: { display: "flex", alignItems: "flex-start", gap: 14, padding: "16px 20px", borderRadius: 10, cursor: "pointer", transition: "all 0.15s" },
  candidateRadio: { marginTop: 2 },
  radioOuter: { width: 18, height: 18, borderRadius: "50%", border: "2px solid", display: "flex", alignItems: "center", justifyContent: "center" },
  radioInner: { width: 9, height: 9, borderRadius: "50%", background: "#0d1b2a" },
  candidateName: { fontSize: 15, fontWeight: 700, color: "#0d1b2a", marginBottom: 4 },
  candidateMeta: { fontSize: 13, color: "#7f8c8d" },
  candidateId: { fontSize: 11, color: "#aab2bd", marginTop: 2 },
  success: { background: "#f0fdf4", border: "1px solid #27ae60", color: "#1e8449", padding: "10px 14px", borderRadius: 8, fontSize: 13 },
  error: { background: "#fdf0f0", border: "1px solid #e74c3c", color: "#c0392b", padding: "10px 14px", borderRadius: 8, fontSize: 13 },
  btn: { padding: "14px 28px", background: "#0d1b2a", color: "#d4af37", border: "none", borderRadius: 8, fontSize: 15, fontWeight: 700, cursor: "pointer", alignSelf: "flex-start", fontFamily: "'Georgia', serif", letterSpacing: 1 },
};
