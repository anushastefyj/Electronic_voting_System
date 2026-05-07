package com.evs.evs_backend.service;

import com.evs.evs_backend.entity.*;
import com.evs.evs_backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VoterService {

    @Autowired private ApplicationRepository applicationRepo;
    @Autowired private ElectionRepository electionRepo;
    @Autowired private CandidateRepository candidateRepo;
    @Autowired private ResultRepository resultRepo;

    // ── REQUEST VOTER ID ────────────────────────────────────────────────────
    public String requestVoterId(String userid, String constituency) {
        Optional<Application> existing = applicationRepo.findByUserid(userid);
        if (existing.isPresent()) {
            throw new RuntimeException("You have already submitted a voter ID request.");
        }

        Application app = new Application();
        app.setUserid(userid);
        app.setConstituency(constituency);
        app.setPassedstatus(1); // New request
        app.setApprovedstatus(null);
        app.setVoterid(null);
        applicationRepo.save(app);

        return "Voter ID request submitted successfully.";
    }

    // ── GET MY VOTER ID ─────────────────────────────────────────────────────
    public Application getMyVoterId(String userid) {
        return applicationRepo.findByUserid(userid).orElse(null);
    }

    // ── UPCOMING ELECTIONS ──────────────────────────────────────────────────
    public List<Election> getUpcomingElections() {
        return electionRepo.findAll(); // Returns all elections (adjust filter as needed)
    }

    // ── CANDIDATES BY ELECTION ──────────────────────────────────────────────
    public List<Candidate> getCandidatesByElection(String electionId) {
        return candidateRepo.findByElectionid(electionId);
    }

    // ── CAST VOTE ───────────────────────────────────────────────────────────
    public String castVote(String voterId, String electionId, String candidateId) {
        // Check if voter already voted in this election
        List<Result> existing = resultRepo.findByElectionid(electionId);
        // Simple check - in production use evs_tbl_voter_details
        // Update or insert result
        Optional<Result> resultOpt = existing.stream()
                .filter(r -> r.getCandidateid().equals(candidateId))
                .findFirst();

        if (resultOpt.isPresent()) {
            Result result = resultOpt.get();
            result.setVotecount(result.getVotecount() + 1);
            resultRepo.save(result);
        } else {
            Result newResult = new Result();
            newResult.setElectionid(electionId);
            newResult.setCandidateid(candidateId);
            newResult.setVotecount(1);
            resultRepo.save(newResult);
        }

        return "Vote cast successfully!";
    }

    // ── VIEW RESULTS ────────────────────────────────────────────────────────
    public List<Result> getResults(String electionId) {
        List<Result> results = resultRepo.findByElectionid(electionId);
        if (results.isEmpty()) {
            throw new RuntimeException("Results not yet declared for this election.");
        }
        return results;
    }
}
