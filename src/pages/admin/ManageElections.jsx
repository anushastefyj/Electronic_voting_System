import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { addElection, getAllElections } from "../../api/api";

const emptyForm = { name: "", electiondate: "", district: "", constituency: "", countingdate: "" };

export default function ManageElections() {
  const [elections, setElections] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchElections = () => getAllElections().then((r) => setElections(r.data)).catch(() => {});

  useEffect(() => { fetchElections(); }, []);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const handleAdd = async (e) => {
    e.preventDefault();
    setMsg(""); setError("");
    setLoading(true);
    try {
      await addElection(form);
      setMsg("Election added successfully!");
      setForm(emptyForm);
      fetchElections();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add election.");
    } finally { setLoading(false); }
  };

  return (
    <Layout>
      <h1 style={styles.title}>Manage Elections</h1>

      <div style={styles.formCard}>
        <h2 style={styles.cardTitle}>Add New Election</h2>
        <form onSubmit={handleAdd} style={styles.form}>
          <div style={styles.grid2}>
            <Field label="Election Name *" value={form.name} onChange={set("name")} placeholder="e.g. General Election 2024" required />
            <Field label="Election Date *" type="date" value={form.electiondate} onChange={set("electiondate")} required />
            <Field label="District *" value={form.district} onChange={set("district")} placeholder="e.g. Mumbai" required />
            <Field label="Constituency *" value={form.constituency} onChange={set("constituency")} placeholder="e.g. Andheri" required />
            <Field label="Counting Date *" type="date" value={form.countingdate} onChange={set("countingdate")} required />
          </div>
          {msg && <div style={styles.success}>{msg}</div>}
          {error && <div style={styles.error}>{error}</div>}
          <button type="submit" style={styles.btn} disabled={loading}>{loading ? "Adding..." : "Add Election"}</button>
        </form>
      </div>

      <div style={styles.tableCard}>
        <h2 style={styles.cardTitle}>All Elections</h2>
        {elections.length === 0 ? (
          <p style={styles.empty}>No elections found.</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>{["Election ID", "Name", "Date", "District", "Constituency", "Counting Date"].map(h => <Th key={h}>{h}</Th>)}</tr>
            </thead>
            <tbody>
              {elections.map((e, i) => (
                <tr key={e.electionid} style={{ background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                  <Td><span style={styles.id}>{e.electionid}</span></Td>
                  <Td>{e.name}</Td>
                  <Td>{e.electiondate}</Td>
                  <Td>{e.district}</Td>
                  <Td>{e.constituency}</Td>
                  <Td>{e.countingdate}</Td>
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

function Th({ children }) {
  return <th style={{ padding: "12px 16px", textAlign: "left", fontSize: 12, fontWeight: 700, color: "#7f8c8d", letterSpacing: 1, textTransform: "uppercase", borderBottom: "2px solid #e8eaed", background: "#f9fafb" }}>{children}</th>;
}
function Td({ children }) {
  return <td style={{ padding: "12px 16px", fontSize: 14, color: "#2c3e50", borderBottom: "1px solid #f0f0f0" }}>{children}</td>;
}

const styles = {
  title: { fontSize: 26, fontWeight: 700, color: "#0d1b2a", marginBottom: 24, fontFamily: "'Georgia', serif" },
  formCard: { background: "#fff", borderRadius: 12, padding: 28, marginBottom: 24, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" },
  tableCard: { background: "#fff", borderRadius: 12, padding: 28, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" },
  cardTitle: { fontSize: 16, fontWeight: 700, color: "#0d1b2a", margin: "0 0 20px", fontFamily: "'Georgia', serif" },
  form: { display: "flex", flexDirection: "column", gap: 16 },
  grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 },
  btn: { padding: "12px 28px", background: "#0d1b2a", color: "#d4af37", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: "pointer", alignSelf: "flex-start", fontFamily: "'Georgia', serif" },
  success: { background: "#f0fdf4", border: "1px solid #27ae60", color: "#1e8449", padding: "10px 14px", borderRadius: 8, fontSize: 13 },
  error: { background: "#fdf0f0", border: "1px solid #e74c3c", color: "#c0392b", padding: "10px 14px", borderRadius: 8, fontSize: 13 },
  table: { width: "100%", borderCollapse: "collapse" },
  empty: { color: "#7f8c8d", fontStyle: "italic", fontSize: 14 },
  id: { background: "#eaf0fb", color: "#1a5276", padding: "2px 8px", borderRadius: 4, fontSize: 12, fontWeight: 600 },
};
