package com.mywaysai.smartprocurementvendormanagementsystem.service;

import java.util.List;

import com.mywaysai.smartprocurementvendormanagementsystem.entity.Role;
import com.mywaysai.smartprocurementvendormanagementsystem.entity.User;
import com.mywaysai.smartprocurementvendormanagementsystem.repository.PurchaseOrderRepository;
import com.mywaysai.smartprocurementvendormanagementsystem.repository.RoleRepository;
import com.mywaysai.smartprocurementvendormanagementsystem.repository.UserRepository;
import com.mywaysai.smartprocurementvendormanagementsystem.repository.VendorDocumentRepository;
import com.mywaysai.smartprocurementvendormanagementsystem.repository.VendorRatingRepository;
import org.springframework.stereotype.Service;

import com.mywaysai.smartprocurementvendormanagementsystem.entity.Vendor;
import com.mywaysai.smartprocurementvendormanagementsystem.repository.VendorRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class VendorServiceImpl implements VendorService {

    private final VendorRepository repository;
    private final PurchaseOrderRepository purchaseOrderRepository;
    private final VendorDocumentRepository vendorDocumentRepository;
    private final VendorRatingRepository vendorRatingRepository;
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
//    @Override
//    public Vendor register(Vendor vendor) {
//        vendor.setApproved(false);
//        return repository.save(vendor);
//    }
@Override
public Vendor register(Vendor vendor) {

    vendor.setApproved(false);
    Vendor savedVendor = repository.save(vendor);

    User user = new User();
    user.setEmail(vendor.getEmail());
    user.setPassword(vendor.getPassword());
    user.setUsername(vendor.getCompanyName());
    user.setActive(true);

    Role vendorRole = roleRepository.findByRoleName("VENDOR");
    user.setRole(vendorRole);

    userRepository.save(user);

    return savedVendor;
}
    @Override
    public List<Vendor> getAll() {
        return repository.findAll();
    }

    @Override
    public Vendor getById(Long id) {
        return repository.findById(id).orElseThrow(() -> new RuntimeException("Vendor not found"));
    }

    @Override
    public Vendor update(Long id, Vendor vendor) {
        Vendor existing = repository.findById(id).orElseThrow(() -> new RuntimeException("Vendor not found"));
        if (vendor.getCompanyName() != null) existing.setCompanyName(vendor.getCompanyName());
        if (vendor.getContactPerson() != null) existing.setContactPerson(vendor.getContactPerson());
        if (vendor.getEmail() != null) existing.setEmail(vendor.getEmail());
        if (vendor.getPhone() != null) existing.setPhone(vendor.getPhone());
        if (vendor.getGstNumber() != null) existing.setGstNumber(vendor.getGstNumber());

        if (vendor.getPassword() != null && !vendor.getPassword().isBlank()) {
            existing.setPassword(vendor.getPassword());
        }

        return repository.save(existing);
    }

    @Override
    public void delete(Long id) {
        Vendor vendor = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vendor not found"));

        if (purchaseOrderRepository.existsByVendorId(id)) {
            throw new RuntimeException("Cannot delete vendor. Purchase orders exist for this vendor.");
        }

        if (vendorDocumentRepository.existsByVendorId(id)) {
            throw new RuntimeException("Cannot delete vendor. Uploaded documents exist for this vendor.");
        }

        if (vendorRatingRepository.existsByVendorId(id)) {
            throw new RuntimeException("Cannot delete vendor. Ratings exist for this vendor.");
        }

        userRepository.findByEmail(vendor.getEmail()).ifPresent(userRepository::delete);
        repository.deleteById(id);
    }

    @Override
    public Vendor approveVendor(Long id) {

        Vendor vendor = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vendor not found"));

        vendor.setApproved(true);

        return repository.save(vendor);
    }
}
