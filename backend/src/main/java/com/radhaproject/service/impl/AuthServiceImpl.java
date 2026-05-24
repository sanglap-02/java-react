package com.radhaproject.service.impl;

import com.radhaproject.dto.request.LoginRequest;
import com.radhaproject.dto.request.RegisterRequest;
import com.radhaproject.dto.response.AuthResponse;
import com.radhaproject.entity.User;
import com.radhaproject.exception.ConflictException;
import com.radhaproject.mapper.UserMapper;
import com.radhaproject.repository.UserRepository;
import com.radhaproject.security.JwtService;
import com.radhaproject.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final UserMapper userMapper;

    @Override
    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.email(), request.password())
        );
        User user = userRepository.findByEmail(request.email()).orElseThrow();
        String token = jwtService.generateToken(user.getEmail());
        return AuthResponse.of(token, jwtService.getExpirationMs(), userMapper.toResponse(user));
    }

    @Override
    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new ConflictException("Email already registered");
        }
        User user = User.builder()
            .firstName(request.firstName())
            .lastName(request.lastName())
            .email(request.email())
            .password(passwordEncoder.encode(request.password()))
            .role(User.Role.ROLE_USER)
            .build();
        userRepository.save(user);
        String token = jwtService.generateToken(user.getEmail());
        return AuthResponse.of(token, jwtService.getExpirationMs(), userMapper.toResponse(user));
    }
}
