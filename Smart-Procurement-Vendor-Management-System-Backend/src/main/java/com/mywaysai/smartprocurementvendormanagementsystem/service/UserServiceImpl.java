package com.mywaysai.smartprocurementvendormanagementsystem.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.mywaysai.smartprocurementvendormanagementsystem.dto.LoginRequest;
import com.mywaysai.smartprocurementvendormanagementsystem.dto.LoginResponse;
import com.mywaysai.smartprocurementvendormanagementsystem.entity.Department;
import com.mywaysai.smartprocurementvendormanagementsystem.entity.Role;
import com.mywaysai.smartprocurementvendormanagementsystem.entity.User;
import com.mywaysai.smartprocurementvendormanagementsystem.entity.Vendor;
import com.mywaysai.smartprocurementvendormanagementsystem.repository.DepartmentRepository;
import com.mywaysai.smartprocurementvendormanagementsystem.repository.RoleRepository;
import com.mywaysai.smartprocurementvendormanagementsystem.repository.UserRepository;
import com.mywaysai.smartprocurementvendormanagementsystem.repository.VendorRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository repository;
    private final RoleRepository roleRepository;
    private final DepartmentRepository  departmentRepository;

    private final VendorRepository vendorRepository;
    @Override
    public User save(User user) {
        return null;
    }

    @Override
    public User createUser(User user) {

        User user1 = new User();
        user1.setEmail(user.getEmail());
        user1.setPassword(user.getPassword());
        user1.setUsername(user.getUsername());
        user1.setActive(true);

        Role role = roleRepository.findById(user.getRole().getId())
                .orElseThrow(() -> new RuntimeException("Role not found"));


        Department department = departmentRepository.findById(user.getDepartment().getId())
                .orElseThrow(() -> new RuntimeException("Department not found"));

        user1.setDepartment(department);
        user1.setRole(role);

        return repository.save(user1);
    }

    @Override
    public User updateUser(Long id, User user) {
        User existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        existing.setUsername(user.getUsername());
        existing.setEmail(user.getEmail());
        existing.setActive(user.isActive());

        if (user.getPassword() != null && !user.getPassword().isBlank()) {
            existing.setPassword(user.getPassword());
        }

        if (user.getRole() != null && user.getRole().getId() != null) {
            Role role = roleRepository.findById(user.getRole().getId())
                    .orElseThrow(() -> new RuntimeException("Role not found"));
            existing.setRole(role);
        }

        if (user.getDepartment() != null && user.getDepartment().getId() != null) {
            Department department = departmentRepository.findById(user.getDepartment().getId())
                    .orElseThrow(() -> new RuntimeException("Department not found"));
            existing.setDepartment(department);
        }

        return repository.save(existing);
    }
    @Override
    public List<User> getAll() {
        return repository.findAll();
    }

    @Override
    public User getById(Long id) {
        return repository.findById(id).orElseThrow();
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }

    @Override
    public LoginResponse login(LoginRequest request) {

        // 1. Check in Vendor table first so vendor session maps to actual Vendor.id
        Optional<Vendor> vendorOptional = vendorRepository.findByEmail(request.getEmail());
        if (vendorOptional.isPresent()) {
            Vendor vendor = vendorOptional.get();
            if (!vendor.isApproved()) {
                throw new RuntimeException("Vendor not approved by admin yet");
            }
            if (!vendor.getPassword().equals(request.getPassword())) {
                throw new RuntimeException("Invalid password for vendor");
            }
            return new LoginResponse(
                    "dummy-token-vendor",
                    "VENDOR",
                    null,
                    vendor.getId()
            );
        }

        // 2. Check in User table
        Optional<User> userOptional = repository.findByEmail(request.getEmail());
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (!user.getPassword().equals(request.getPassword())) {
                throw new RuntimeException("Invalid password for user");
            }
            if (user.getRole() == null) {
                throw new RuntimeException("User role not assigned");
            }

            Long vendorId = null;
            if ("VENDOR".equalsIgnoreCase(user.getRole().getRoleName())) {
                vendorId = vendorRepository.findByEmail(user.getEmail())
                        .map(Vendor::getId)
                        .orElse(null);
            }

            return new LoginResponse(
                    "dummy-token-user",
                    user.getRole().getRoleName(),
                    user.getId(),
                    vendorId
            );
        }

        // 3. If not found in either
        throw new RuntimeException("Invalid email");
    }
}
