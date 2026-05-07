package com.evs.evs_backend.service;

import com.evs.evs_backend.entity.Application;
import com.evs.evs_backend.entity.UserProfile;
import com.evs.evs_backend.entity.Voter;
import com.evs.evs_backend.repository.ApplicationRepository;
import com.evs.evs_backend.repository.UserProfileRepository;
import com.evs.evs_backend.repository.VoterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class EOService {

    @Autowired
    private ApplicationRepository applicationRepo;

    @Autowired
    private VoterRepository voterRepo;

    @Autowired
    private UserProfileRepository userProfileRepo;

    // Get all requests that Admin has forwarded (passedstatus = 2)
    public List<Application> getEORequests() {
        return applicationRepo.findByPassedstatus(2);
    }

    // Generate voter ID and approve
    @Transactional
    public String generateVoterId(String userId) {

        // ── Step 1: Get the application ────────────────────────────────────
        Application app = applicationRepo.findByUserid(userId)
                .orElseThrow(() -> new RuntimeException("Request not found for: " + userId));

        // ── Step 2: Get user profile for voter details ──────────────────────
        UserProfile profile = userProfileRepo.findByUserid(userId)
                .orElseThrow(() -> new RuntimeException("User profile not found for: " + userId));

        // ── Step 3: Generate voter ID ───────────────────────────────────────
        // Format: 2 letters (userId) + 2 letters (constituency) + 4 digits
        String namePart = userId.length() >= 2
                ? userId.substring(0, 2).toUpperCase()
                : userId.toUpperCase();
        String constPart = app.getConstituency() != null && app.getConstituency().length() >= 2
                ? app.getConstituency().substring(0, 2).toUpperCase()
                : (app.getConstituency() != null ? app.getConstituency().toUpperCase() : "XX");
        long count = applicationRepo.count();
        String voterId = namePart + constPart + String.format("%04d", count);

        // ── Step 4: Save to evs_tbl_voter FIRST (FK requires this) ──────────
        Voter voter = new Voter();
        voter.setVoterid(voterId);
        voter.setName(profile.getFirstname() + " " + profile.getLastname());
        voter.setDateofbirth(profile.getDateofbirth());
        voter.setGender(profile.getGender());
        voter.setDistrict(profile.getCity());
        voter.setConstituency(app.getConstituency());
        voter.setMobileno(profile.getMobileno());
        voter.setEmailid(profile.getEmailid());
        voterRepo.save(voter); // ✅ Insert into evs_tbl_voter first

        // ── Step 5: Now update application with the voterid ─────────────────
        app.setVoterid(voterId);       // ✅ FK now satisfied
        app.setPassedstatus(3);        // EO processed
        app.setApprovedstatus(1);      // Approved
        applicationRepo.save(app);

        return "Voter ID generated: " + voterId;
    }

    // Reject voter ID request
    @Transactional
    public String rejectVoterId(String userId) {
        Application app = applicationRepo.findByUserid(userId)
                .orElseThrow(() -> new RuntimeException("Request not found for: " + userId));

        app.setPassedstatus(3);    // EO processed
        app.setApprovedstatus(0);  // Rejected
        app.setVoterid(null);      // No voter ID assigned
        applicationRepo.save(app);

        return "Voter ID request rejected for: " + userId;
    }
}