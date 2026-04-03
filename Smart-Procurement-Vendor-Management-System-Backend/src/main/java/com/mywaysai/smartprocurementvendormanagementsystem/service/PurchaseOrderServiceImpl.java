package com.mywaysai.smartprocurementvendormanagementsystem.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.mywaysai.smartprocurementvendormanagementsystem.entity.PurchaseOrder;
import com.mywaysai.smartprocurementvendormanagementsystem.entity.Requisition;
import com.mywaysai.smartprocurementvendormanagementsystem.entity.Vendor;
import com.mywaysai.smartprocurementvendormanagementsystem.repository.PurchaseOrderRepository;
import com.mywaysai.smartprocurementvendormanagementsystem.repository.RequisitionRepository;
import com.mywaysai.smartprocurementvendormanagementsystem.repository.VendorRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PurchaseOrderServiceImpl implements PurchaseOrderService {

    private final PurchaseOrderRepository poRepository;
    private final VendorRepository vendorRepository;
    private final RequisitionRepository requisitionRepository;

    @Override
    public PurchaseOrder create(Long vendorId) {
        Vendor vendor = vendorRepository.findById(vendorId).orElseThrow();

        PurchaseOrder po = new PurchaseOrder();
        po.setPoNumber("PO-" + System.currentTimeMillis());
        po.setStatus("CREATED");
        po.setOrderDate(LocalDate.now());
        po.setVendor(vendor);

        return poRepository.save(po);
    }

    @Override
    public PurchaseOrder create(Long vendorId, Long requisitionId, PurchaseOrder payload) {
        PurchaseOrder po = create(vendorId);

        if (requisitionId != null) {
            Requisition requisition = requisitionRepository.findById(requisitionId)
                    .orElseThrow(() -> new RuntimeException("Requisition not found"));
            po.setRequisition(requisition);
        }

        if (payload != null) {
            if (payload.getOrderDate() != null) {
                po.setOrderDate(payload.getOrderDate());
            }
            if (payload.getExpectedDelivery() != null) {
                po.setExpectedDelivery(payload.getExpectedDelivery());
            }
            if (payload.getTotalAmount() != null) {
                po.setTotalAmount(payload.getTotalAmount());
            }
        }

        return poRepository.save(po);
    }

    @Override
    public List<PurchaseOrder> all() {
        return poRepository.findAll();
    }

    @Override
    public List<PurchaseOrder> findByVendorId(Long vendorId) {
        return poRepository.findByVendorId(vendorId);
    }

    @Override
    public List<PurchaseOrder> findByRequisitionId(Long requisitionId) {
        return poRepository.findByRequisitionId(requisitionId);
    }

    @Override
    public PurchaseOrder getById(Long id) {
        return poRepository.findById(id).orElseThrow(() -> new RuntimeException("Purchase order not found"));
    }

    @Override
    public void delete(Long id) {
        poRepository.deleteById(id);
    }

    @Override
    public List<PurchaseOrder> search(String keyword) {
        if (keyword == null || keyword.isBlank()) {
            return poRepository.findAll();
        }

        String q = keyword.toLowerCase(Locale.ROOT);
        return poRepository.findAll().stream()
                .filter(po ->
                        (po.getPoNumber() != null && po.getPoNumber().toLowerCase(Locale.ROOT).contains(q)) ||
                        (po.getStatus() != null && po.getStatus().toLowerCase(Locale.ROOT).contains(q)) ||
                        (po.getVendor() != null && po.getVendor().getCompanyName() != null &&
                                po.getVendor().getCompanyName().toLowerCase(Locale.ROOT).contains(q))
                )
                .collect(Collectors.toList());
    }
}
