package com.mywaysai.smartprocurementvendormanagementsystem.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.mywaysai.smartprocurementvendormanagementsystem.entity.Vendor;

public interface VendorRepository extends JpaRepository<Vendor,Long>{
    Optional<Vendor> findByEmail(String email);

    @Query("""
        SELECT v.companyName,
            COUNT(p.id),
            COALESCE(CASE WHEN COUNT(p.id) = 0 THEN 0 ELSE SUM(i.amount) / COUNT(p.id) END, 0),
            COALESCE(SUM(i.amount), 0)
        FROM Vendor v
        LEFT JOIN PurchaseOrder p ON p.vendor.id = v.id
        LEFT JOIN Invoice i ON i.purchaseOrder.id = p.id
        GROUP BY v.companyName
        """)
    List<Object[]> vendorPerformanceReport();

    @Query("""
        SELECT v.companyName,
            COALESCE(SUM(i.amount), 0)
        FROM Vendor v
        LEFT JOIN PurchaseOrder p ON p.vendor.id = v.id
        LEFT JOIN Invoice i ON i.purchaseOrder.id = p.id
        GROUP BY v.companyName
        """)
    List<Object[]> vendorWiseCost();
}

