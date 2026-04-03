package com.mywaysai.smartprocurementvendormanagementsystem.service;

import com.mywaysai.smartprocurementvendormanagementsystem.entity.Approval;

import java.util.List;

public interface ApprovalService {
    Approval approve(Long reqId);
    List<Approval> findAll();
    Approval findByRequisitionId(Long requisitionId);
}
