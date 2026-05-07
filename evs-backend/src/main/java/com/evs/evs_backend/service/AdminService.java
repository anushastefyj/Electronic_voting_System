package com.evs.evs_backend.service;

import com.evs.evs_backend.entity.*;
import com.evs.evs_backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class AdminService {

    @Autowired private ElectionRepository electionRepo;
    @Autowired private PartyRepository partyRepo;
    @Autowired private CandidateRepository candidateRepo;
    @Autowired private ApplicationRepository applicationRepo;
    @Autowired private ResultRepository resultRepo;

    // ── ELECTIONS ───────────────────────────────────────────
    public Election addElection(Election election) {
        long count = electionRepo.count() + 1;
        election.setElectionid(String.format("E%03d", count));
        return electionRepo.save(election);
    }

    public List<Election> getAllElections() {
        return electionRepo.findAll();
    }

    // ✅ FIXED METHOD
    public List<Election> getUpcomingElections() {
        return electionRepo.findByElectiondateAfter(LocalDate.now());
    }

    // ── PARTIES ─────────────────────────────────────────────
    public Party addParty(Party party) {
        long count = partyRepo.count() + 1;
        party.setParty_id(String.format("P%03d", count));
        return partyRepo.save(party);
    }

    public List<Party> getAllParties() {
        return partyRepo.findAll();
    }

    // ── CANDIDATES ──────────────────────────────────────────
    public Candidate addCandidate(Candidate candidate) {
        long count = candidateRepo.count() + 1;
        candidate.setCandidateid(String.format("C%03d", count));
        return candidateRepo.save(candidate);
    }

    public List<Candidate> getCandidatesByElection(String electionId) {
        return candidateRepo.findByElectionid(electionId);
    }

    public List<Candidate> getCandidatesByParty(String partyId) {
        return candidateRepo.findByPartyid(partyId);
    }

    // ── VOTER REQUESTS ──────────────────────────────────────
    public List<Application> getAllVoterRequests() {
        return applicationRepo.findAll();
    }

    public String approveVoterRequest(String userId) {
        Application app = applicationRepo.findByUserid(userId)
                .orElseThrow(() -> new RuntimeException("Request not found for user: " + userId));

        app.setPassedstatus(2);
        applicationRepo.save(app);

        return "Request forwarded to Electoral Officer";
    }

    // ── RESULTS ─────────────────────────────────────────────
    public List<Result> getResultsByElection(String electionId) {
        return resultRepo.findByElectionid(electionId);
    }

    public String approveResults(String electionId) {
        List<Result> results = resultRepo.findByElectionid(electionId);

        if (results.isEmpty()) {
            throw new RuntimeException("No results found for election: " + electionId);
        }

        return "Results approved and declared for election: " + electionId;
    }
}