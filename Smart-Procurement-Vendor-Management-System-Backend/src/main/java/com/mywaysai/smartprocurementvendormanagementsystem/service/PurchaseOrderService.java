package com.mywaysai.smartprocurementvendormanagementsystem.service;

import java.util.List;

import com.mywaysai.smartprocurementvendormanagementsystem.entity.PurchaseOrder;

public interface PurchaseOrderService {
    PurchaseOrder create(Long vendorId);
    PurchaseOrder create(Long vendorId, Long requisitionId, PurchaseOrder payload);
    List<PurchaseOrder> all();
    List<PurchaseOrder> findByVendorId(Long vendorId);
    List<PurchaseOrder> findByRequisitionId(Long requisitionId);
    PurchaseOrder getById(Long id);
    void delete(Long id);
    List<PurchaseOrder> search(String keyword);
}
