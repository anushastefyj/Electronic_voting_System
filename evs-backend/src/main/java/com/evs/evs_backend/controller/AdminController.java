package com.evs.evs_backend.controller;

import com.evs.evs_backend.entity.*;
import com.evs.evs_backend.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {

    @Autowired
    private AdminService adminService;

    // ── ELECTIONS ───────────────────────────────────────────────────────────
    @PostMapping("/elections")
    public ResponseEntity<?> addElection(@RequestBody Election election) {
        try {
            return ResponseEntity.ok(adminService.addElection(election));
        } catch (Exception e) {
            return ResponseEntity.status(400).body(Map.of("message", e.getMessage()));
        }
    }

    @GetMapping("/elections")
    public ResponseEntity<List<Election>> getAllElections() {
        return ResponseEntity.ok(adminService.getAllElections());
    }

    @GetMapping("/elections/upcoming")
    public ResponseEntity<List<Election>> getUpcomingElections() {
        return ResponseEntity.ok(adminService.getUpcomingElections());
    }

    // ── PARTIES ─────────────────────────────────────────────────────────────
    @PostMapping("/parties")
    public ResponseEntity<?> addParty(@RequestBody Party party) {
        try {
            return ResponseEntity.ok(adminService.addParty(party));
        } catch (Exception e) {
            return ResponseEntity.status(400).body(Map.of("message", e.getMessage()));
        }
    }

    @GetMapping("/parties")
    public ResponseEntity<List<Party>> getAllParties() {
        return ResponseEntity.ok(adminService.getAllParties());
    }

    // ── CANDIDATES ──────────────────────────────────────────────────────────
    @PostMapping("/candidates")
    public ResponseEntity<?> addCandidate(@RequestBody Candidate candidate) {
        try {
            return ResponseEntity.ok(adminService.addCandidate(candidate));
        } catch (Exception e) {
            return ResponseEntity.status(400).body(Map.of("message", e.getMessage()));
        }
    }

    @GetMapping("/candidates/{electionId}")
    public ResponseEntity<List<Candidate>> getCandidatesByElection(@PathVariable String electionId) {
        return ResponseEntity.ok(adminService.getCandidatesByElection(electionId));
    }

    @GetMapping("/candidates/party/{partyId}")
    public ResponseEntity<List<Candidate>> getCandidatesByParty(@PathVariable String partyId) {
        return ResponseEntity.ok(adminService.getCandidatesByParty(partyId));
    }

    // ── VOTER REQUESTS ──────────────────────────────────────────────────────
    @GetMapping("/voter-requests")
    public ResponseEntity<List<Application>> getAllVoterRequests() {
        return ResponseEntity.ok(adminService.getAllVoterRequests());
    }

    @PutMapping("/voter-requests/{userId}/approve")
    public ResponseEntity<?> approveVoterRequest(@PathVariable String userId) {
        try {
            return ResponseEntity.ok(Map.of("message", adminService.approveVoterRequest(userId)));
        } catch (Exception e) {
            return ResponseEntity.status(400).body(Map.of("message", e.getMessage()));
        }
    }

    // ── RESULTS ─────────────────────────────────────────────────────────────
    @GetMapping("/results/{electionId}")
    public ResponseEntity<List<Result>> getResults(@PathVariable String electionId) {
        return ResponseEntity.ok(adminService.getResultsByElection(electionId));
    }

    @PutMapping("/results/{electionId}/approve")
    public ResponseEntity<?> approveResults(@PathVariable String electionId) {
        try {
            return ResponseEntity.ok(Map.of("message", adminService.approveResults(electionId)));
        } catch (Exception e) {
            return ResponseEntity.status(400).body(Map.of("message", e.getMessage()));
        }
    }
}