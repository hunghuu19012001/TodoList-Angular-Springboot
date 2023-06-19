package com.example.todolist.entity.dto.response;

import com.example.todolist.security.model.JwtResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponse {

    private JwtResponse jwtResponse;
}
