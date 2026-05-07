import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { addCandidate, getCandidatesByElection, getAllElections, getAllParties } from "../../api/api";

const emptyForm = { name: "", electionid: "", partyid: "", district: "", constituency: "", dateofbirth: "", mobileno: "", address: "", emailid: "" };

export default function ManageCandidates() {
  const [candidates, setCandidates] = useState([]);
  const [elections, setElections] = useState([]);
  const [parties, setParties] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [selectedElection, setSelectedElection] = useState("");
  const [msg, setMsg] = useState(""); const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllElections().then((r) => setElections(r.data)).catch(() => {});
    getAllParties().then((r) => setParties(r.data)).catch(() => {});
  }, []);

  const fetchCandidates = (eid) => {
    if (!eid) return;
    getCandidatesByElection(eid).then((r) => setCandidates(r.data)).catch(() => setCandidates([]));
  };

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const handleAdd = async (e) => {
    e.preventDefault(); setMsg(""); setError(""); setLoading(true);
    if (form.mobileno && form.mobileno.length !== 10) { setError("Mobile number must be 10 digits."); setLoading(false); return; }
    try {
      await addCandidate(form);
      setMsg("Candidate assigned successfully!"); setForm(emptyForm); fetchCandidates(form.electionid);
    } catch (err) { setError(err.response?.data?.message || "Failed to add candidate."); }
    finally { setLoading(false); }
  };

  return (
    <Layout>
      <h1 style={styles.title}>Manage Candidates</h1>

      <div style={styles.formCard}>
        <h2 style={styles.cardTitle}>Assign Candidate to Election</h2>
        <form onSubmit={handleAdd} style={styles.form}>
          <div style={styles.grid2}>
            <Field label="Candidate Name *" value={form.name} onChange={set("name")} placeholder="Full name" required />
            <div style={styles.field}>
              <label style={styles.label}>Election *</label>
              <select style={styles.select} value={form.electionid} onChange={(e) => { set("electionid")(e); }} required>
                <option value="">Select election</option>
                {elections.map((e) => <option key={e.electionid} value={e.electionid}>{e.name} ({e.electionid})</option>)}
              </select>
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Party *</label>
              <select style={styles.select} value={form.partyid} onChange={set("partyid")} required>
                <option value="">Select party</option>
                {parties.map((p) => <option key={p.party_id} value={p.party_id}>{p.name} ({p.party_id})</option>)}
              </select>
            </div>
            <Field label="District *" value={form.district} onChange={set("district")} placeholder="District" required />
            <Field label="Constituency *" value={form.constituency} onChange={set("constituency")} placeholder="Constituency" required />
            <Field label="Date of Birth *" type="date" value={form.dateofbirth} onChange={set("dateofbirth")} required />
            <Field label="Mobile No" value={form.mobileno} onChange={set("mobileno")} placeholder="10-digit mobile" maxLength={10} />
            <Field label="Email ID" type="email" value={form.emailid} onChange={set("emailid")} placeholder="email@example.com" />
          </div>
          <Field label="Address *" value={form.address} onChange={set("address")} placeholder="Full address" required />
          {msg && <div style={styles.success}>{msg}</div>}
          {error && <div style={styles.error}>{error}</div>}
          <button type="submit" style={styles.btn} disabled={loading}>{loading ? "Assigning..." : "Assign Candidate"}</button>
        </form>
      </div>

      <div style={styles.tableCard}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
          <h2 style={{ ...styles.cardTitle, margin: 0 }}>Candidates by Election</h2>
          <select style={{ ...styles.select, width: 240 }} value={selectedElection} onChange={(e) => { setSelectedElection(e.target.value); fetchCandidates(e.target.value); }}>
            <option value="">Select election to view</option>
            {elections.map((e) => <option key={e.electionid} value={e.electionid}>{e.name}</option>)}
          </select>
        </div>
        {candidates.length === 0 ? <p style={styles.empty}>Select an election to view candidates.</p> : (
          <table style={styles.table}>
            <thead><tr>{["ID", "Name", "Party", "District", "Constituency", "Mobile", "Email"].map(h => <Th key={h}>{h}</Th>)}</tr></thead>
            <tbody>
              {candidates.map((c, i) => (
                <tr key={c.candidateid} style={{ background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                  <Td><span style={styles.id}>{c.candidateid}</span></Td>
                  <Td>{c.name}</Td><Td>{c.partyid}</Td><Td>{c.district}</Td>
                  <Td>{c.constituency}</Td><Td>{c.mobileno}</Td><Td>{c.emailid || "—"}</Td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
}

function Field({ label, ...props }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      <label style={{ fontSize: 12, fontWeight: 600, color: "#2c3e50", letterSpacing: 0.4 }}>{label}</label>
      <input style={{ padding: "10px 14px", border: "1.5px solid #dde2e8", borderRadius: 7, fontSize: 14, fontFamily: "'Georgia', serif", background: "#fff", color: "#0d1b2a", outline: "none" }} {...props} />
    </div>
  );
}
function Th({ children }) { return <th style={{ padding: "12px 16px", textAlign: "left", fontSize: 12, fontWeight: 700, color: "#7f8c8d", letterSpacing: 1, textTransform: "uppercase", borderBottom: "2px solid #e8eaed", background: "#f9fafb" }}>{children}</th>; }
function Td({ children }) { return <td style={{ padding: "12px 16px", fontSize: 14, color: "#2c3e50", borderBottom: "1px solid #f0f0f0" }}>{children}</td>; }

const styles = {
  title: { fontSize: 26, fontWeight: 700, color: "#0d1b2a", marginBottom: 24, fontFamily: "'Georgia', serif" },
  formCard: { background: "#fff", borderRadius: 12, padding: 28, marginBottom: 24, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" },
  tableCard: { background: "#fff", borderRadius: 12, padding: 28, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" },
  cardTitle: { fontSize: 16, fontWeight: 700, color: "#0d1b2a", margin: "0 0 20px", fontFamily: "'Georgia', serif" },
  form: { display: "flex", flexDirection: "column", gap: 16 },
  grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 },
  field: { display: "flex", flexDirection: "column", gap: 5 },
  label: { fontSize: 12, fontWeight: 600, color: "#2c3e50", letterSpacing: 0.4 },
  select: { padding: "10px 14px", border: "1.5px solid #dde2e8", borderRadius: 7, fontSize: 14, fontFamily: "'Georgia', serif", background: "#fff", color: "#0d1b2a", outline: "none" },
  btn: { padding: "12px 28px", background: "#0d1b2a", color: "#d4af37", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: "pointer", alignSelf: "flex-start", fontFamily: "'Georgia', serif" },
  success: { background: "#f0fdf4", border: "1px solid #27ae60", color: "#1e8449", padding: "10px 14px", borderRadius: 8, fontSize: 13 },
  error: { background: "#fdf0f0", border: "1px solid #e74c3c", color: "#c0392b", padding: "10px 14px", borderRadius: 8, fontSize: 13 },
  table: { width: "100%", borderCollapse: "collapse" },
  empty: { color: "#7f8c8d", fontStyle: "italic", fontSize: 14 },
  id: { background: "#eaf0fb", color: "#1a5276", padding: "2px 8px", borderRadius: 4, fontSize: 12, fontWeight: 600 },
};
