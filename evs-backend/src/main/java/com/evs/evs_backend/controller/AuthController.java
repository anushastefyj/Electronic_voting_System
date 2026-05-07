package com.evs.evs_backend.controller;

import com.evs.evs_backend.dto.LoginRequest;
import com.evs.evs_backend.dto.LoginResponse;
import com.evs.evs_backend.dto.RegisterRequest;
import com.evs.evs_backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
// NOTE: CORS is now handled globally in SecurityConfig — @CrossOrigin not needed here
public class AuthController {

    @Autowired
    private AuthService authService;

    // REMOVED: /hash/{raw} endpoint — never expose a public BCrypt endpoint

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            LoginResponse response = authService.login(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(401).body(Map.of("message", e.getMessage()));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            String result = authService.register(request);
            return ResponseEntity.ok(Map.of("message", result));
        } catch (Exception e) {
            return ResponseEntity.status(400).body(Map.of("message", e.getMessage()));
        }
    }

    @PutMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody Map<String, String> body) {
        try {
            String result = authService.changePassword(
                body.get("userid"),
                body.get("oldPassword"),
                body.get("newPassword")
            );
            return ResponseEntity.ok(Map.of("message", result));
        } catch (Exception e) {
            return ResponseEntity.status(400).body(Map.of("message", e.getMessage()));
        }
    }
}
