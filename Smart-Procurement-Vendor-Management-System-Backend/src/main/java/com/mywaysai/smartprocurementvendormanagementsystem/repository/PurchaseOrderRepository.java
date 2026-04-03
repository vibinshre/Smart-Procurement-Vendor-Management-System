package com.mywaysai.smartprocurementvendormanagementsystem.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mywaysai.smartprocurementvendormanagementsystem.entity.PurchaseOrder;


public interface PurchaseOrderRepository  extends JpaRepository<PurchaseOrder,Long>{ 
	List<PurchaseOrder> findByRequisitionId(Long requisitionId);
	List<PurchaseOrder> findByVendorId(Long vendorId);
	boolean existsByVendorId(Long vendorId);
}