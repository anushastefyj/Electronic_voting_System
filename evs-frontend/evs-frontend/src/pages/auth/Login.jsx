import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { loginUser } from "../../api/api";

export default function Login() {
  const [form, setForm] = useState({ userid: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await loginUser(form);
      login(res.data);
      const type = res.data.usertype;
      if (type === "A") navigate("/admin");
      else if (type === "E") navigate("/eo");
      else navigate("/voter");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.left}>
        <div style={styles.leftContent}>
          <div style={styles.emblem}>🗳</div>
          <h1 style={styles.title}>Electronic<br />Voting System</h1>
          <p style={styles.subtitle}>Secure. Transparent. Democratic.</p>
          <div style={styles.divider} />
          <p style={styles.tagline}>
            A digital platform ensuring every voice is counted with integrity and accuracy.
          </p>
        </div>
      </div>

      <div style={styles.right}>
        <div style={styles.formBox}>
          <div style={styles.formHeader}>
            <h2 style={styles.formTitle}>Sign In</h2>
            <p style={styles.formSub}>Enter your credentials to continue</p>
          </div>

          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.field}>
              <label style={styles.label}>User ID</label>
              <input
                style={styles.input}
                type="text"
                placeholder="Enter your User ID"
                value={form.userid}
                onChange={(e) => setForm({ ...form, userid: e.target.value })}
                required
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Password</label>
              <input
                style={styles.input}
                type="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>

            {error && <div style={styles.error}>{error}</div>}

            <button type="submit" style={styles.btn} disabled={loading}>
              {loading ? "Signing in..." : "Sign In →"}
            </button>
          </form>

          <p style={styles.registerLink}>
            New voter?{" "}
            <Link to="/register" style={styles.link}>
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { display: "flex", minHeight: "100vh", fontFamily: "'Georgia', serif" },
  left: {
    flex: 1,
    background: "linear-gradient(145deg, #0d1b2a 0%, #1a3a5c 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 48,
  },
  leftContent: { maxWidth: 400, color: "#fff" },
  emblem: { fontSize: 64, marginBottom: 24 },
  title: { fontSize: 44, fontWeight: 700, lineHeight: 1.2, color: "#d4af37", margin: "0 0 16px" },
  subtitle: { fontSize: 16, color: "#95a5a6", letterSpacing: 3, textTransform: "uppercase", margin: "0 0 24px" },
  divider: { width: 60, height: 3, background: "#d4af37", marginBottom: 24 },
  tagline: { fontSize: 15, color: "#bdc3c7", lineHeight: 1.7 },
  right: {
    width: 480,
    background: "#f8f9fa",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 48,
  },
  formBox: { width: "100%", maxWidth: 360 },
  formHeader: { marginBottom: 32 },
  formTitle: { fontSize: 28, fontWeight: 700, color: "#0d1b2a", margin: "0 0 8px" },
  formSub: { fontSize: 14, color: "#7f8c8d" },
  form: { display: "flex", flexDirection: "column", gap: 20 },
  field: { display: "flex", flexDirection: "column", gap: 6 },
  label: { fontSize: 13, fontWeight: 600, color: "#2c3e50", letterSpacing: 0.5 },
  input: {
    padding: "12px 16px",
    border: "1.5px solid #dde2e8",
    borderRadius: 8,
    fontSize: 15,
    fontFamily: "'Georgia', serif",
    outline: "none",
    background: "#fff",
    color: "#0d1b2a",
    transition: "border 0.2s",
  },
  error: {
    background: "#fdf0f0",
    border: "1px solid #e74c3c",
    color: "#c0392b",
    padding: "10px 14px",
    borderRadius: 8,
    fontSize: 13,
  },
  btn: {
    padding: "14px",
    background: "#0d1b2a",
    color: "#d4af37",
    border: "none",
    borderRadius: 8,
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
    letterSpacing: 1,
    marginTop: 8,
    fontFamily: "'Georgia', serif",
  },
  registerLink: { textAlign: "center", marginTop: 20, fontSize: 14, color: "#7f8c8d" },
  link: { color: "#1a5276", fontWeight: 600 },
};
