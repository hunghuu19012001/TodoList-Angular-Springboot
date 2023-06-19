package com.example.todolist.exception;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
public class CustomResponse {
    private int status;
    private String message;
}
