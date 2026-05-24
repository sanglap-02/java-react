package com.radhaproject.service;

import com.radhaproject.dto.request.LoginRequest;
import com.radhaproject.dto.request.RegisterRequest;
import com.radhaproject.dto.response.AuthResponse;

public interface AuthService {

    AuthResponse login(LoginRequest request);

    AuthResponse register(RegisterRequest request);
}
