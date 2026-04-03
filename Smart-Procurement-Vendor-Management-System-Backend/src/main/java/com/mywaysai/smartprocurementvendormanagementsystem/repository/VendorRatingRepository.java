package com.mywaysai.smartprocurementvendormanagementsystem.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mywaysai.smartprocurementvendormanagementsystem.entity.VendorRating;

public interface VendorRatingRepository extends JpaRepository<VendorRating,Long>{
	List<VendorRating> findByVendorId(Long vendorId);
	boolean existsByVendorId(Long vendorId);
}

