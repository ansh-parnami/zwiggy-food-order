package com.zwiggy.zwiggy.Dto;

import lombok.Data;

@Data
public class RegisterRequest {
    private String email;
    private String password;
}
