package com.example.todolist.security.model;

import lombok.Data;
import org.springframework.stereotype.Component;

@Data
@Component
public class ChangePasswordRequest {
    private String username;
    private String oldPassword;
    private String newPassword;


}
