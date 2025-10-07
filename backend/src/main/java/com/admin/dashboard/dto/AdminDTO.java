package com.admin.dashboard.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class AdminDTO {
    private Long id;
    
    @Email
    @NotBlank
    private String email;
    
    @NotBlank
    private String password;

    public AdminDTO() {}

    public AdminDTO(Long id, String email) {
        this.id = id;
        this.email = email;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}
