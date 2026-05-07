package com.evs.evs_backend.service;

import com.evs.evs_backend.dto.LoginRequest;
import com.evs.evs_backend.dto.LoginResponse;
import com.evs.evs_backend.dto.RegisterRequest;
import com.evs.evs_backend.entity.UserCredentials;
import com.evs.evs_backend.entity.UserProfile;
import com.evs.evs_backend.repository.UserCredentialsRepository;
import com.evs.evs_backend.repository.UserProfileRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserCredentialsRepository credentialsRepo;

    @Autowired
    private UserProfileRepository profileRepo;

    // ✅ Injected from SecurityConfig @Bean — no manual instantiation
    @Autowired
    private PasswordEncoder passwordEncoder;

    // ── LOGIN ──────────────────────────────────────────────────────────────
    public LoginResponse login(LoginRequest request) {
        Optional<UserCredentials> opt = credentialsRepo.findByUserid(request.getUserid());

        if (opt.isEmpty()) {
            throw new RuntimeException("User not found");
        }

        UserCredentials creds = opt.get();

        if (!passwordEncoder.matches(request.getPassword(), creds.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        LoginResponse response = new LoginResponse();
        response.setUserid(creds.getUserid());
        response.setUsertype(creds.getUsertype());
        response.setMessage("Login successful");

        return response;
    }

    // ── REGISTER (Voter only) ───────────────────────────────────────────────
    public String register(RegisterRequest request) {

        if (credentialsRepo.findByUserid(request.getUserid()).isPresent()) {
            throw new RuntimeException("User ID already exists. Please choose another.");
        }

        UserCredentials creds = new UserCredentials();
        creds.setUserid(request.getUserid());
        creds.setPassword(passwordEncoder.encode(request.getPassword()));
        creds.setUsertype("V");
        creds.setLoginstatus(1);
        credentialsRepo.save(creds);

        UserProfile profile = new UserProfile();
        profile.setUserid(request.getUserid());
        profile.setFirstname(request.getFirstname());
        profile.setLastname(request.getLastname());
        profile.setDateofbirth(request.getDateofbirth());
        profile.setGender(request.getGender());
        profile.setStreet(request.getStreet());
        profile.setLocation(request.getLocation());
        profile.setCity(request.getCity());
        profile.setState(request.getState());
        profile.setPincode(request.getPincode());
        profile.setMobileno(request.getMobileno());
        profile.setEmailid(request.getEmailid());
        profileRepo.save(profile);

        return "Registration successful!";
    }

    // ── CHANGE PASSWORD ─────────────────────────────────────────────────────
    public String changePassword(String userid, String oldPassword, String newPassword) {

        UserCredentials creds = credentialsRepo.findByUserid(userid)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(oldPassword, creds.getPassword())) {
            throw new RuntimeException("Old password is incorrect");
        }

        creds.setPassword(passwordEncoder.encode(newPassword));
        credentialsRepo.save(creds);

        return "Password changed successfully";
    }
}