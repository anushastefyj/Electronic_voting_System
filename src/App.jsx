import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageElections from "./pages/admin/ManageElections";
import ManageParties from "./pages/admin/ManageParties";
import ManageCandidates from "./pages/admin/ManageCandidates";
import VoterRequests from "./pages/admin/VoterRequests";
import ApproveResults from "./pages/admin/ApproveResults";

import EODashboard from "./pages/eo/EODashboard";
import GenerateVoterId from "./pages/eo/GenerateVoterId";

import VoterDashboard from "./pages/voter/VoterDashboard";
import RequestVoterId from "./pages/voter/RequestVoterId";
import UpcomingElections from "./pages/voter/UpcomingElections";
import CastVote from "./pages/voter/CastVote";
import ViewResults from "./pages/voter/ViewResults";

function ProtectedRoute({ children, role }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (role && user.usertype !== role) return <Navigate to="/login" />;
  return children;
}

function RoleRedirect() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (user.usertype === "A") return <Navigate to="/admin" />;
  if (user.usertype === "E") return <Navigate to="/eo" />;
  if (user.usertype === "V") return <Navigate to="/voter" />;
  return <Navigate to="/login" />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RoleRedirect />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<ProtectedRoute role="A"><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/elections" element={<ProtectedRoute role="A"><ManageElections /></ProtectedRoute>} />
          <Route path="/admin/parties" element={<ProtectedRoute role="A"><ManageParties /></ProtectedRoute>} />
          <Route path="/admin/candidates" element={<ProtectedRoute role="A"><ManageCandidates /></ProtectedRoute>} />
          <Route path="/admin/voter-requests" element={<ProtectedRoute role="A"><VoterRequests /></ProtectedRoute>} />
          <Route path="/admin/results" element={<ProtectedRoute role="A"><ApproveResults /></ProtectedRoute>} />

          {/* EO Routes */}
          <Route path="/eo" element={<ProtectedRoute role="E"><EODashboard /></ProtectedRoute>} />
          <Route path="/eo/generate-voter-id" element={<ProtectedRoute role="E"><GenerateVoterId /></ProtectedRoute>} />

          {/* Voter Routes */}
          <Route path="/voter" element={<ProtectedRoute role="V"><VoterDashboard /></ProtectedRoute>} />
          <Route path="/voter/request-id" element={<ProtectedRoute role="V"><RequestVoterId /></ProtectedRoute>} />
          <Route path="/voter/elections" element={<ProtectedRoute role="V"><UpcomingElections /></ProtectedRoute>} />
          <Route path="/voter/cast-vote" element={<ProtectedRoute role="V"><CastVote /></ProtectedRoute>} />
          <Route path="/voter/results" element={<ProtectedRoute role="V"><ViewResults /></ProtectedRoute>} />

          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
