import axios from "axios";

const api = axios.create({
  baseURL: "/api",  // ✅ Use relative URL — Vite proxy forwards to http://localhost:8081/api
  headers: { "Content-Type": "application/json" },
});

// Auth APIs
export const loginUser = (data) => api.post("/auth/login", data);
export const registerVoter = (data) => api.post("/auth/register", data);
export const changePassword = (data) => api.put("/auth/change-password", data);

// Admin - Elections
export const addElection = (data) => api.post("/admin/elections", data);
export const getAllElections = () => api.get("/admin/elections");
export const getUpcomingElections = () => api.get("/admin/elections/upcoming");

// Admin - Parties
export const addParty = (data) => api.post("/admin/parties", data);
export const getAllParties = () => api.get("/admin/parties");

// Admin - Candidates
export const addCandidate = (data) => api.post("/admin/candidates", data);
export const getCandidatesByElection = (electionId) => api.get(`/admin/candidates/${electionId}`);
export const getCandidatesByParty = (partyId) => api.get(`/admin/candidates/party/${partyId}`);

// Admin - Voter Requests
export const getPendingVoterRequests = () => api.get("/admin/voter-requests");
export const approveVoterRequest = (userId) => api.put(`/admin/voter-requests/${userId}/approve`);

// Admin - Results
export const getElectionResults = (electionId) => api.get(`/admin/results/${electionId}`);
export const approveResults = (electionId) => api.put(`/admin/results/${electionId}/approve`);

// EO
export const getEORequests = () => api.get("/eo/voter-requests");
export const generateVoterId = (userId) => api.put(`/eo/voter-requests/${userId}/generate`);
export const rejectVoterId = (userId) => api.put(`/eo/voter-requests/${userId}/reject`);

// Voter
export const requestVoterId = (data) => api.post("/voter/voter-id-request", data);
export const getMyVoterId = (userId) => api.get(`/voter/voter-id/${userId}`);
export const getVoterUpcomingElections = () => api.get("/voter/elections/upcoming");
export const getElectionCandidates = (electionId) => api.get(`/voter/elections/${electionId}/candidates`);
export const castVote = (data) => api.post("/voter/vote", data);
export const getResults = (electionId) => api.get(`/voter/elections/${electionId}/results`);

export default api;