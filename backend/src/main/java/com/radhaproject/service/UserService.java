package com.radhaproject.service;

import com.radhaproject.dto.response.UserResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface UserService {

    UserResponse findById(Long id);

    Page<UserResponse> findAll(Pageable pageable);

    void deleteById(Long id);
}
