package com.mywaysai.smartprocurementvendormanagementsystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mywaysai.smartprocurementvendormanagementsystem.entity.Delivery;

import java.util.List;


public interface DeliveryRepository extends JpaRepository<Delivery,Long>{ 
	List<Delivery> findByPurchaseOrderRequisitionId(Long requisitionId);
}