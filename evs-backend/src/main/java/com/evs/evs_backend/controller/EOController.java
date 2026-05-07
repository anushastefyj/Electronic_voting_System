package com.evs.evs_backend.controller;
import com.evs.evs_backend.entity.Application;
import com.evs.evs_backend.service.EOService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/eo")
@CrossOrigin(origins = "http://localhost:3000")
public class EOController {

    @Autowired
    private EOService eoService;

    @GetMapping("/voter-requests")
    public ResponseEntity<List<Application>> getEORequests() {
        return ResponseEntity.ok(eoService.getEORequests());
    }

    @PutMapping("/voter-requests/{userId}/generate")
    public ResponseEntity<?> generateVoterId(@PathVariable String userId) {
        try {
            return ResponseEntity.ok(Map.of("message", eoService.generateVoterId(userId)));
        } catch (Exception e) {
            return ResponseEntity.status(400).body(Map.of("message", e.getMessage()));
        }
    }

    @PutMapping("/voter-requests/{userId}/reject")
    public ResponseEntity<?> rejectVoterId(@PathVariable String userId) {
        try {
            return ResponseEntity.ok(Map.of("message", eoService.rejectVoterId(userId)));
        } catch (Exception e) {
            return ResponseEntity.status(400).body(Map.of("message", e.getMessage()));
        }
    }
}
