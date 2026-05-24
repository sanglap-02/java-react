package com.radhaproject.dto.response;

import com.radhaproject.entity.User;

import java.time.Instant;

public record UserResponse(
    Long id,
    String firstName,
    String lastName,
    String email,
    String role,
    Instant createdAt
) {}
