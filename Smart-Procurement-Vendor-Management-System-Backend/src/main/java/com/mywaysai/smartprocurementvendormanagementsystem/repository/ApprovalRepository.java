 package com.mywaysai.smartprocurementvendormanagementsystem.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ApprovalRepository extends JpaRepository<com.mywaysai.smartprocurementvendormanagementsystem.entity.Approval, Long>{ 
	Optional<com.mywaysai.smartprocurementvendormanagementsystem.entity.Approval> findByRequisitionId(Long requisitionId);
}
