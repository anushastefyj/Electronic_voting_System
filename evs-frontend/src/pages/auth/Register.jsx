import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerVoter } from "../../api/api";

export default function Register() {
  const [form, setForm] = useState({
    userid: "", password: "", firstname: "", lastname: "",
    dateofbirth: "", gender: "", street: "", location: "",
    city: "", state: "", pincode: "", mobileno: "", emailid: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setSuccess("");
    if (form.mobileno.length !== 10) { setError("Mobile number must be exactly 10 digits."); return; }
    setLoading(true);
    try {
      await registerVoter(form);
      setSuccess("Registration successful! You can now login.");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally { setLoading(false); }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <span style={styles.emblem}>🗳</span>
          <h1 style={styles.title}>Voter Registration</h1>
          <p style={styles.sub}>Electronic Voting System</p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <Section title="Login Credentials">
            <Row>
              <Field label="User ID *" value={form.userid} onChange={set("userid")} placeholder="Choose a user ID" required />
              <Field label="Password *" type="password" value={form.password} onChange={set("password")} placeholder="Choose a password" required />
            </Row>
          </Section>

          <Section title="Personal Details">
            <Row>
              <Field label="First Name *" value={form.firstname} onChange={set("firstname")} placeholder="First name" required />
              <Field label="Last Name *" value={form.lastname} onChange={set("lastname")} placeholder="Last name" required />
            </Row>
            <Row>
              <Field label="Date of Birth *" type="date" value={form.dateofbirth} onChange={set("dateofbirth")} required />
              <div style={styles.field}>
                <label style={styles.label}>Gender *</label>
                <select style={styles.input} value={form.gender} onChange={set("gender")} required>
                  <option value="">Select gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
            </Row>
            <Row>
              <Field label="Mobile Number *" value={form.mobileno} onChange={set("mobileno")} placeholder="10-digit mobile number" maxLength={10} required />
              <Field label="Email ID" type="email" value={form.emailid} onChange={set("emailid")} placeholder="your@email.com" />
            </Row>
          </Section>

          <Section title="Address Details">
            <Field label="Street Address *" value={form.street} onChange={set("street")} placeholder="Street / House No." required />
            <Row>
              <Field label="Location / Area" value={form.location} onChange={set("location")} placeholder="Area or locality" />
              <Field label="City *" value={form.city} onChange={set("city")} placeholder="City" required />
            </Row>
            <Row>
              <Field label="State *" value={form.state} onChange={set("state")} placeholder="State" required />
              <Field label="Pincode *" value={form.pincode} onChange={set("pincode")} placeholder="6-digit pincode" maxLength={6} required />
            </Row>
          </Section>

          {error && <div style={styles.error}>{error}</div>}
          {success && <div style={styles.success}>{success}</div>}

          <button type="submit" style={styles.btn} disabled={loading}>
            {loading ? "Registering..." : "Complete Registration →"}
          </button>

          <p style={styles.loginLink}>
            Already registered? <Link to="/login" style={styles.link}>Sign in here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, color: "#d4af37", textTransform: "uppercase", marginBottom: 16, paddingBottom: 8, borderBottom: "1px solid #e8eaed" }}>
        {title}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>{children}</div>
    </div>
  );
}

function Row({ children }) {
  return <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>{children}</div>;
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
  page: { minHeight: "100vh", background: "#f4f6f9", display: "flex", justifyContent: "center", padding: "40px 24px", fontFamily: "'Georgia', serif" },
  container: { width: "100%", maxWidth: 720, background: "#fff", borderRadius: 16, padding: "40px 48px", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" },
  header: { textAlign: "center", marginBottom: 36 },
  emblem: { fontSize: 40 },
  title: { fontSize: 28, fontWeight: 700, color: "#0d1b2a", margin: "8px 0 4px" },
  sub: { fontSize: 13, color: "#7f8c8d", letterSpacing: 2, textTransform: "uppercase" },
  form: { display: "flex", flexDirection: "column" },
  field: { display: "flex", flexDirection: "column", gap: 5 },
  label: { fontSize: 12, fontWeight: 600, color: "#2c3e50", letterSpacing: 0.4 },
  input: { padding: "10px 14px", border: "1.5px solid #dde2e8", borderRadius: 7, fontSize: 14, fontFamily: "'Georgia', serif", background: "#fff", color: "#0d1b2a", outline: "none" },
  error: { background: "#fdf0f0", border: "1px solid #e74c3c", color: "#c0392b", padding: "10px 14px", borderRadius: 8, fontSize: 13, marginBottom: 16 },
  success: { background: "#f0fdf4", border: "1px solid #27ae60", color: "#1e8449", padding: "10px 14px", borderRadius: 8, fontSize: 13, marginBottom: 16 },
  btn: { padding: "14px", background: "#0d1b2a", color: "#d4af37", border: "none", borderRadius: 8, fontSize: 15, fontWeight: 700, cursor: "pointer", letterSpacing: 1, fontFamily: "'Georgia', serif" },
  loginLink: { textAlign: "center", marginTop: 16, fontSize: 14, color: "#7f8c8d" },
  link: { color: "#1a5276", fontWeight: 600 },
};
