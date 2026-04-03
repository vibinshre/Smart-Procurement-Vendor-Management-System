package com.mywaysai.smartprocurementvendormanagementsystem.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.mywaysai.smartprocurementvendormanagementsystem.entity.PurchaseOrder;
import com.mywaysai.smartprocurementvendormanagementsystem.repository.InvoiceRepository;
import com.mywaysai.smartprocurementvendormanagementsystem.repository.PurchaseOrderItemRepository;
import com.mywaysai.smartprocurementvendormanagementsystem.repository.PurchaseOrderRepository;
import com.mywaysai.smartprocurementvendormanagementsystem.repository.VendorRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReportService {

    private final InvoiceRepository invoiceRepo;
    private final VendorRepository vendorRepo;
    private final PurchaseOrderRepository purchaseOrderRepo;
    private final PurchaseOrderItemRepository purchaseOrderItemRepo;

    // Backward-compatible endpoint support for existing spend report listing
    public List<PurchaseOrder> spendReport() {
        return purchaseOrderRepo.findAll();
    }

    public Map<String, Object> costAnalysis() {
        Map<String, Object> report = new HashMap<>();

        Double totalSpend = invoiceRepo.getTotalSpend();
        report.put("totalSpend", totalSpend != null ? totalSpend : 0d);
        report.put("totalOrders", purchaseOrderRepo.count());
        report.put("totalVendors", vendorRepo.count());
        report.put("totalInvoices", invoiceRepo.count());

        return report;
    }

    public List<Object[]> vendorWiseCost() {
        return vendorRepo.vendorWiseCost();
    }

    public List<Object[]> spendAnalysis() {
        return purchaseOrderItemRepo.monthlySpend();
    }

    public List<Object[]> vendorPerformance() {
        return vendorRepo.vendorPerformanceReport();
    }
}
