package com.admin.dashboard.service;

import com.admin.dashboard.dto.AdminDTO;
import com.admin.dashboard.entity.Admin;
import com.admin.dashboard.repository.AdminRepository;
import com.admin.dashboard.config.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    
    @Autowired
    private AdminRepository adminRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private JwtUtil jwtUtil;

    public String login(AdminDTO adminDTO) {
        Admin admin = adminRepository.findByEmail(adminDTO.getEmail())
            .orElseThrow(() -> new RuntimeException("Admin not found"));
        
        if (!passwordEncoder.matches(adminDTO.getPassword(), admin.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }
        
        return jwtUtil.generateToken(admin.getEmail());
    }

    public AdminDTO register(AdminDTO adminDTO) {
        if (adminRepository.existsByEmail(adminDTO.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
        
        Admin admin = new Admin();
        admin.setEmail(adminDTO.getEmail());
        admin.setPassword(passwordEncoder.encode(adminDTO.getPassword()));
        
        Admin savedAdmin = adminRepository.save(admin);
        return new AdminDTO(savedAdmin.getId(), savedAdmin.getEmail());
    }
}
