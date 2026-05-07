package com.evs.evs_backend.controller;

import com.evs.evs_backend.entity.*;
import com.evs.evs_backend.service.VoterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/voter")
@CrossOrigin(origins = "http://localhost:3000")
public class VoterController {

    @Autowired
    private VoterService voterService;

    @PostMapping("/voter-id-request")
    public ResponseEntity<?> requestVoterId(@RequestBody Map<String, String> body) {
        try {
            String result = voterService.requestVoterId(body.get("userid"), body.get("constituency"));
            return ResponseEntity.ok(Map.of("message", result));
        } catch (Exception e) {
            return ResponseEntity.status(400).body(Map.of("message", e.getMessage()));
        }
    }

    @GetMapping("/voter-id/{userid}")
    public ResponseEntity<?> getMyVoterId(@PathVariable String userid) {
        try {
            Application app = voterService.getMyVoterId(userid);
            if (app == null) return ResponseEntity.ok(Map.of());
            return ResponseEntity.ok(app);
        } catch (Exception e) {
            return ResponseEntity.status(400).body(Map.of("message", e.getMessage()));
        }
    }

    @GetMapping("/elections/upcoming")
    public ResponseEntity<List<Election>> getUpcomingElections() {
        return ResponseEntity.ok(voterService.getUpcomingElections());
    }

    @GetMapping("/elections/{electionId}/candidates")
    public ResponseEntity<List<Candidate>> getCandidates(@PathVariable String electionId) {
        return ResponseEntity.ok(voterService.getCandidatesByElection(electionId));
    }

    @PostMapping("/vote")
    public ResponseEntity<?> castVote(@RequestBody Map<String, String> body) {
        try {
            String result = voterService.castVote(
                body.get("voterid"),
                body.get("electionid"),
                body.get("candidateid")
            );
            return ResponseEntity.ok(Map.of("message", result));
        } catch (Exception e) {
            return ResponseEntity.status(400).body(Map.of("message", e.getMessage()));
        }
    }

    @GetMapping("/elections/{electionId}/results")
    public ResponseEntity<?> getResults(@PathVariable String electionId) {
        try {
            return ResponseEntity.ok(voterService.getResults(electionId));
        } catch (Exception e) {
            return ResponseEntity.status(404).body(Map.of("message", e.getMessage()));
        }
    }
}
