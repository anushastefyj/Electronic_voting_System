import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { addParty, getAllParties } from "../../api/api";

const emptyForm = { name: "", leader: "", symbol: "" };

export default function ManageParties() {
  const [parties, setParties] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [msg, setMsg] = useState(""); const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetch = () => getAllParties().then((r) => setParties(r.data)).catch(() => {});
  useEffect(() => { fetch(); }, []);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const handleAdd = async (e) => {
    e.preventDefault(); setMsg(""); setError(""); setLoading(true);
    try {
      await addParty(form);
      setMsg("Party added successfully!"); setForm(emptyForm); fetch();
    } catch (err) { setError(err.response?.data?.message || "Failed to add party."); }
    finally { setLoading(false); }
  };

  return (
    <Layout>
      <h1 style={styles.title}>Manage Parties</h1>

      <div style={styles.formCard}>
        <h2 style={styles.cardTitle}>Add New Party</h2>
        <form onSubmit={handleAdd} style={styles.form}>
          <div style={styles.grid3}>
            <Field label="Party Name *" value={form.name} onChange={set("name")} placeholder="e.g. National Party" required />
            <Field label="Party Leader *" value={form.leader} onChange={set("leader")} placeholder="Leader's full name" required />
            <Field label="Party Symbol *" value={form.symbol} onChange={set("symbol")} placeholder="e.g. Lotus, Car, Hand" required />
          </div>
          {msg && <div style={styles.success}>{msg}</div>}
          {error && <div style={styles.error}>{error}</div>}
          <button type="submit" style={styles.btn} disabled={loading}>{loading ? "Adding..." : "Add Party"}</button>
        </form>
      </div>

      <div style={styles.tableCard}>
        <h2 style={styles.cardTitle}>Registered Parties ({parties.length})</h2>
        {parties.length === 0 ? <p style={styles.empty}>No parties found.</p> : (
          <div style={styles.cardGrid}>
            {parties.map((p) => (
              <div key={p.party_id} style={styles.partyCard}>
                <div style={styles.partySymbol}>{p.symbol?.[0] || "🏛"}</div>
                <div style={styles.partyId}>{p.party_id}</div>
                <div style={styles.partyName}>{p.name}</div>
                <div style={styles.partyLeader}>Leader: {p.leader}</div>
                <div style={styles.partySymbolText}>Symbol: {p.symbol}</div>
              </div>
            ))}
          </div>
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

const styles = {
  title: { fontSize: 26, fontWeight: 700, color: "#0d1b2a", marginBottom: 24, fontFamily: "'Georgia', serif" },
  formCard: { background: "#fff", borderRadius: 12, padding: 28, marginBottom: 24, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" },
  tableCard: { background: "#fff", borderRadius: 12, padding: 28, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" },
  cardTitle: { fontSize: 16, fontWeight: 700, color: "#0d1b2a", margin: "0 0 20px", fontFamily: "'Georgia', serif" },
  form: { display: "flex", flexDirection: "column", gap: 16 },
  grid3: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 },
  btn: { padding: "12px 28px", background: "#0d1b2a", color: "#d4af37", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: "pointer", alignSelf: "flex-start", fontFamily: "'Georgia', serif" },
  success: { background: "#f0fdf4", border: "1px solid #27ae60", color: "#1e8449", padding: "10px 14px", borderRadius: 8, fontSize: 13 },
  error: { background: "#fdf0f0", border: "1px solid #e74c3c", color: "#c0392b", padding: "10px 14px", borderRadius: 8, fontSize: 13 },
  empty: { color: "#7f8c8d", fontStyle: "italic", fontSize: 14 },
  cardGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 16 },
  partyCard: { border: "1.5px solid #e8eaed", borderRadius: 12, padding: 20, textAlign: "center" },
  partySymbol: { fontSize: 36, marginBottom: 8 },
  partyId: { fontSize: 11, color: "#7f8c8d", marginBottom: 4 },
  partyName: { fontSize: 15, fontWeight: 700, color: "#0d1b2a", marginBottom: 6 },
  partyLeader: { fontSize: 13, color: "#2c3e50", marginBottom: 4 },
  partySymbolText: { fontSize: 12, color: "#7f8c8d" },
};
