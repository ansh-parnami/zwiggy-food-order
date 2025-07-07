package com.zwiggy.zwiggy.Controller;

import com.zwiggy.zwiggy.Dto.AuthResponse;
import com.zwiggy.zwiggy.Dto.LoginRequest;
import com.zwiggy.zwiggy.Dto.RegisterRequest;
import com.zwiggy.zwiggy.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(userService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {

            try {
                return ResponseEntity.ok(userService.authenticate(request));
            } catch (RuntimeException e) {
                return ResponseEntity
                        .status(HttpStatus.UNAUTHORIZED)
                        .body(new AuthResponse(e.getMessage()));
            }
    }
}

