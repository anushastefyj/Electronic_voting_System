import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const navLinks = {
  A: [
    { to: "/admin", label: "Dashboard" },
    { to: "/admin/elections", label: "Elections" },
    { to: "/admin/parties", label: "Parties" },
    { to: "/admin/candidates", label: "Candidates" },
    { to: "/admin/voter-requests", label: "Voter Requests" },
    { to: "/admin/results", label: "Results" },
  ],
  E: [
    { to: "/eo", label: "Dashboard" },
    { to: "/eo/generate-voter-id", label: "Voter ID Requests" },
  ],
  V: [
    { to: "/voter", label: "Dashboard" },
    { to: "/voter/request-id", label: "Request Voter ID" },
    { to: "/voter/elections", label: "Elections" },
    { to: "/voter/cast-vote", label: "Cast Vote" },
    { to: "/voter/results", label: "Results" },
  ],
};

const roleLabel = { A: "Administrator", E: "Electoral Officer", V: "Voter" };
const roleBadgeColor = { A: "#c0392b", E: "#d35400", V: "#1a5276" };

export default function Layout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const links = navLinks[user?.usertype] || [];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div style={styles.wrapper}>
      <aside style={styles.sidebar}>
        <div style={styles.brand}>
          <div style={styles.brandIcon}>🗳</div>
          <div>
            <div style={styles.brandName}>EVS</div>
            <div style={styles.brandSub}>Electronic Voting</div>
          </div>
        </div>

        <div style={styles.roleBadge(user?.usertype)}>
          {roleLabel[user?.usertype]}
        </div>
        <div style={styles.userInfo}>{user?.userid}</div>

        <nav style={styles.nav}>
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              style={{
                ...styles.navLink,
                ...(location.pathname === link.to ? styles.navLinkActive : {}),
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button onClick={handleLogout} style={styles.logoutBtn}>
          ⬡ Logout
        </button>
      </aside>

      <main style={styles.main}>
        <div style={styles.content}>{children}</div>
      </main>
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    minHeight: "100vh",
    background: "#f4f6f9",
    fontFamily: "'Georgia', serif",
  },
  sidebar: {
    width: 240,
    background: "#0d1b2a",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    padding: "24px 0",
    position: "fixed",
    top: 0,
    left: 0,
    height: "100vh",
    zIndex: 100,
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "0 24px 24px",
    borderBottom: "1px solid #1e3a5f",
    marginBottom: 20,
  },
  brandIcon: { fontSize: 28 },
  brandName: { fontSize: 22, fontWeight: 700, letterSpacing: 2, color: "#d4af37" },
  brandSub: { fontSize: 11, color: "#7f8c8d", letterSpacing: 1, textTransform: "uppercase" },
  roleBadge: (type) => ({
    margin: "0 20px 4px",
    padding: "4px 12px",
    borderRadius: 20,
    fontSize: 11,
    fontWeight: 600,
    textAlign: "center",
    letterSpacing: 1,
    background: roleBadgeColor[type] || "#1a5276",
    color: "#fff",
    textTransform: "uppercase",
  }),
  userInfo: {
    textAlign: "center",
    fontSize: 13,
    color: "#95a5a6",
    marginBottom: 24,
    padding: "0 20px",
  },
  nav: { flex: 1, display: "flex", flexDirection: "column", padding: "0 12px", gap: 4 },
  navLink: {
    padding: "10px 16px",
    borderRadius: 8,
    color: "#bdc3c7",
    textDecoration: "none",
    fontSize: 14,
    fontFamily: "'Georgia', serif",
    transition: "all 0.2s",
    letterSpacing: 0.3,
  },
  navLinkActive: {
    background: "#d4af37",
    color: "#0d1b2a",
    fontWeight: 700,
  },
  logoutBtn: {
    margin: "12px 20px 0",
    padding: "10px",
    background: "transparent",
    border: "1px solid #c0392b",
    color: "#e74c3c",
    borderRadius: 8,
    cursor: "pointer",
    fontSize: 13,
    letterSpacing: 1,
  },
  main: { marginLeft: 240, flex: 1, padding: 32 },
  content: { maxWidth: 1100, margin: "0 auto" },
};
