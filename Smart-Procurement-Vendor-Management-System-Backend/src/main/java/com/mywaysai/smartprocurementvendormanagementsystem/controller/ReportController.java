package com.mywaysai.smartprocurementvendormanagementsystem.controller;

import java.util.Map;
import java.util.List;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.mywaysai.smartprocurementvendormanagementsystem.entity.PurchaseOrder;
import com.mywaysai.smartprocurementvendormanagementsystem.service.ReportExportService;
import com.mywaysai.smartprocurementvendormanagementsystem.service.ReportService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping({"/reports", "/api/reports"})
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5180"})
@RequiredArgsConstructor
public class ReportController {

    private final ReportService service;
    private final ReportExportService exportService;

    @GetMapping("/spend")
    public List<PurchaseOrder> report(){
        return service.spendReport();
    }

    @GetMapping("/cost-analysis")
    public Map<String, Object> costAnalysis() {
        return service.costAnalysis();
    }

    @GetMapping("/spend-analysis")
    public List<Object[]> spendAnalysis() {
        return service.spendAnalysis();
    }

    @GetMapping("/vendor-performance")
    public List<Object[]> vendorPerformance() {
        return service.vendorPerformance();
    }

    @GetMapping("/cost-analysis/pdf")
    public ResponseEntity<byte[]> exportCostAnalysisPdf() throws Exception {
        byte[] file = exportService.exportCostAnalysisPDF();
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=cost-analysis.pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(file);
    }

    @GetMapping("/cost-analysis/excel")
    public ResponseEntity<byte[]> exportCostAnalysisExcel() throws Exception {
        byte[] file = exportService.exportCostAnalysisExcel();
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=cost-analysis.xlsx")
                .contentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                .body(file);
    }

    @GetMapping("/spend-analysis/pdf")
    public ResponseEntity<byte[]> exportSpendAnalysisPdf() throws Exception {
        byte[] file = exportService.exportSpendAnalysisPDF();
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=spend-analysis.pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(file);
    }

    @GetMapping("/spend-analysis/excel")
    public ResponseEntity<byte[]> exportSpendAnalysisExcel() throws Exception {
        byte[] file = exportService.exportSpendAnalysisExcel();
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=spend-analysis.xlsx")
                .contentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                .body(file);
    }

    @GetMapping("/vendor-performance/pdf")
    public ResponseEntity<byte[]> exportVendorPerformancePdf() throws Exception {
        byte[] file = exportService.exportVendorPerformancePDF();
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=vendor-performance.pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(file);
    }

    @GetMapping("/vendor-performance/excel")
    public ResponseEntity<byte[]> exportVendorPerformanceExcel() throws Exception {
        byte[] file = exportService.exportVendorPerformanceExcel();
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=vendor-performance.xlsx")
                .contentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                .body(file);
    }
}
