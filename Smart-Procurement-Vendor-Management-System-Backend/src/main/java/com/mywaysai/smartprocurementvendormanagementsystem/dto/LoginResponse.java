package com.mywaysai.smartprocurementvendormanagementsystem.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginResponse {

    private String token;
    private String role;
    private Long userId;
    private Long vendorId;

    public LoginResponse(String token, String role) {
        this.token = token;
        this.role = role;
    }

    public LoginResponse(String token, String role, Long userId, Long vendorId) {
        this.token = token;
        this.role = role;
        this.userId = userId;
        this.vendorId = vendorId;
    }

}