package com.mywaysai.smartprocurementvendormanagementsystem.service;

import java.io.ByteArrayOutputStream;
import java.util.List;
import java.util.Map;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReportExportService {

    private final ReportService reportService;

    public byte[] exportCostAnalysisExcel() throws Exception {
        Map<String, Object> report = reportService.costAnalysis();
        List<Object[]> vendorWiseList = reportService.vendorWiseCost();

        try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream output = new ByteArrayOutputStream()) {
            Sheet sheet = workbook.createSheet("Cost Analysis");

            CellStyle headerStyle = workbook.createCellStyle();
            Font headerFont = workbook.createFont();
            headerFont.setBold(true);
            headerStyle.setFont(headerFont);

            int rowNum = 0;

            Row title = sheet.createRow(rowNum++);
            Cell titleCell = title.createCell(0);
            titleCell.setCellValue("SMART PROCUREMENT SYSTEM - COST ANALYSIS");
            titleCell.setCellStyle(headerStyle);

            rowNum++;

            Row r1 = sheet.createRow(rowNum++);
            r1.createCell(0).setCellValue("Total Spend");
            r1.createCell(1).setCellValue(String.valueOf(report.get("totalSpend")));

            Row r2 = sheet.createRow(rowNum++);
            r2.createCell(0).setCellValue("Total Orders");
            r2.createCell(1).setCellValue(String.valueOf(report.get("totalOrders")));

            Row r3 = sheet.createRow(rowNum++);
            r3.createCell(0).setCellValue("Total Vendors");
            r3.createCell(1).setCellValue(String.valueOf(report.get("totalVendors")));

            Row r4 = sheet.createRow(rowNum++);
            r4.createCell(0).setCellValue("Total Invoices");
            r4.createCell(1).setCellValue(String.valueOf(report.get("totalInvoices")));

            rowNum++;

            Row vendorTitle = sheet.createRow(rowNum++);
            vendorTitle.createCell(0).setCellValue("Vendor Wise Cost");

            Row header = sheet.createRow(rowNum++);
            Cell cell1 = header.createCell(0);
            cell1.setCellValue("Vendor Name");
            cell1.setCellStyle(headerStyle);

            Cell cell2 = header.createCell(1);
            cell2.setCellValue("Total Spend");
            cell2.setCellStyle(headerStyle);

            rowNum++;
            for (Object[] v : vendorWiseList) {
                Row r = sheet.createRow(rowNum++);
                String vendorName = v[0] != null ? v[0].toString() : "Unknown";
                double amount = v[1] != null ? Double.parseDouble(v[1].toString()) : 0;

                r.createCell(0).setCellValue(vendorName);
                r.createCell(1).setCellValue(amount);
            }

            sheet.autoSizeColumn(0);
            sheet.autoSizeColumn(1);

            workbook.write(output);

            return output.toByteArray();
        }
    }

    public byte[] exportSpendAnalysisExcel() throws Exception {
        List<Object[]> spendList = reportService.spendAnalysis();

        try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            Sheet sheet = workbook.createSheet("Spend Analysis");

            CellStyle titleStyle = workbook.createCellStyle();
            Font titleFont = workbook.createFont();
            titleFont.setBold(true);
            titleFont.setFontHeightInPoints((short) 16);
            titleStyle.setFont(titleFont);
            titleStyle.setAlignment(HorizontalAlignment.CENTER);

            CellStyle headerStyle = workbook.createCellStyle();
            Font headerFont = workbook.createFont();
            headerFont.setBold(true);
            headerStyle.setFont(headerFont);
            headerStyle.setAlignment(HorizontalAlignment.CENTER);

            int rowNum = 0;

            Row title = sheet.createRow(rowNum++);
            Cell titleCell = title.createCell(0);
            titleCell.setCellValue("SPEND ANALYSIS REPORT");
            titleCell.setCellStyle(titleStyle);
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 1));

            rowNum++;

            Row header = sheet.createRow(rowNum++);
            Cell c1 = header.createCell(0);
            c1.setCellValue("Month");
            c1.setCellStyle(headerStyle);

            Cell c2 = header.createCell(1);
            c2.setCellValue("Total Spend");
            c2.setCellStyle(headerStyle);

            for (Object[] s : spendList) {
                Row r = sheet.createRow(rowNum++);
                String month = s[0] != null ? s[0].toString() : "Unknown";
                double amount = s[1] != null ? Double.parseDouble(s[1].toString()) : 0;

                r.createCell(0).setCellValue(month);
                r.createCell(1).setCellValue(amount);
            }

            sheet.autoSizeColumn(0);
            sheet.autoSizeColumn(1);

            workbook.write(out);

            return out.toByteArray();
        }
    }

    public byte[] exportVendorPerformanceExcel() throws Exception {
        List<Object[]> vendorList = reportService.vendorPerformance();

        try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            Sheet sheet = workbook.createSheet("Vendor Performance");

            CellStyle titleStyle = workbook.createCellStyle();
            Font titleFont = workbook.createFont();
            titleFont.setBold(true);
            titleFont.setFontHeightInPoints((short) 16);
            titleStyle.setFont(titleFont);
            titleStyle.setAlignment(HorizontalAlignment.CENTER);

            CellStyle headerStyle = workbook.createCellStyle();
            Font headerFont = workbook.createFont();
            headerFont.setBold(true);
            headerStyle.setFont(headerFont);
            headerStyle.setAlignment(HorizontalAlignment.CENTER);

            int rowNum = 0;

            Row title = sheet.createRow(rowNum++);
            Cell titleCell = title.createCell(0);
            titleCell.setCellValue("VENDOR PERFORMANCE REPORT");
            titleCell.setCellStyle(titleStyle);
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 3));

            rowNum++;

            Row header = sheet.createRow(rowNum++);
            Cell c1 = header.createCell(0);
            c1.setCellValue("Vendor Name");
            c1.setCellStyle(headerStyle);

            Cell c2 = header.createCell(1);
            c2.setCellValue("Total Orders");
            c2.setCellStyle(headerStyle);

            Cell c3 = header.createCell(2);
            c3.setCellValue("Average Order Value");
            c3.setCellStyle(headerStyle);

            Cell c4 = header.createCell(3);
            c4.setCellValue("Total Spend");
            c4.setCellStyle(headerStyle);

            for (Object[] v : vendorList) {
                Row r = sheet.createRow(rowNum++);

                String vendorName = v[0] != null ? v[0].toString() : "Unknown Vendor";
                String totalOrders = v[1] != null ? v[1].toString() : "0";
                String avgValue = v[2] != null ? v[2].toString() : "0";
                String totalSpend = v[3] != null ? v[3].toString() : "0";

                r.createCell(0).setCellValue(vendorName);
                r.createCell(1).setCellValue(totalOrders);
                r.createCell(2).setCellValue(avgValue);
                r.createCell(3).setCellValue(totalSpend);
            }

            sheet.autoSizeColumn(0);
            sheet.autoSizeColumn(1);
            sheet.autoSizeColumn(2);
            sheet.autoSizeColumn(3);

            workbook.write(out);

            return out.toByteArray();
        }
    }

    public byte[] exportCostAnalysisPDF() throws Exception {
        Map<String, Object> report = reportService.costAnalysis();
        List<Object[]> vendorList = reportService.vendorWiseCost();

        ByteArrayOutputStream out = new ByteArrayOutputStream();

        try (PdfWriter writer = new PdfWriter(out);
                PdfDocument pdf = new PdfDocument(writer);
                Document document = new Document(pdf)) {

            Paragraph title = new Paragraph("SMART PROCUREMENT SYSTEM\nCOST ANALYSIS REPORT")
                    .setBold()
                    .setFontSize(18);
            document.add(title);

            document.add(new Paragraph("\nSummary\n").setBold());

            document.add(new Paragraph("Total Spend : " + report.get("totalSpend")));
            document.add(new Paragraph("Total Orders : " + report.get("totalOrders")));
            document.add(new Paragraph("Total Vendors : " + report.get("totalVendors")));
            document.add(new Paragraph("Total Invoices : " + report.get("totalInvoices")));

            document.add(new Paragraph("\nVendor Wise Cost\n").setBold());

            Table table = new Table(2);
            table.addCell("Vendor Name");
            table.addCell("Total Spend");

            for (Object[] v : vendorList) {
                String vendorName = v[0] != null ? v[0].toString() : "Unknown";
                String amount = v[1] != null ? v[1].toString() : "0";

                table.addCell(vendorName);
                table.addCell(amount);
            }

            document.add(table);
        }

        return out.toByteArray();
    }

    public byte[] exportVendorPerformancePDF() throws Exception {
        List<Object[]> vendorList = reportService.vendorPerformance();

        ByteArrayOutputStream out = new ByteArrayOutputStream();

        try (PdfWriter writer = new PdfWriter(out);
                PdfDocument pdf = new PdfDocument(writer);
                Document document = new Document(pdf)) {

            Paragraph title = new Paragraph("SMART PROCUREMENT SYSTEM\nVENDOR PERFORMANCE REPORT")
                    .setBold()
                    .setFontSize(18);

            document.add(title);
            document.add(new Paragraph(" "));

            Table table = new Table(4);
            table.addCell("Vendor");
            table.addCell("Total Orders");
            table.addCell("Average Order Value");
            table.addCell("Total Spend");

            for (Object[] v : vendorList) {
                table.addCell(v[0] != null ? v[0].toString() : "N/A");
                table.addCell(v[1] != null ? v[1].toString() : "0");
                table.addCell(v[2] != null ? v[2].toString() : "0");
                table.addCell(v[3] != null ? v[3].toString() : "0");
            }

            document.add(table);
        }

        return out.toByteArray();
    }

    public byte[] exportSpendAnalysisPDF() throws Exception {
        List<Object[]> spendList = reportService.spendAnalysis();

        ByteArrayOutputStream out = new ByteArrayOutputStream();

        try (PdfWriter writer = new PdfWriter(out);
                PdfDocument pdf = new PdfDocument(writer);
                Document document = new Document(pdf)) {

            Paragraph title = new Paragraph("SMART PROCUREMENT SYSTEM\nSPEND ANALYSIS REPORT")
                    .setBold()
                    .setFontSize(18);

            document.add(title);
            document.add(new Paragraph(" "));

            Table table = new Table(2);
            table.addCell("Month");
            table.addCell("Total Spend");

            for (Object[] s : spendList) {
                table.addCell(s[0] != null ? s[0].toString() : "Unknown");
                table.addCell(s[1] != null ? s[1].toString() : "0");
            }

            document.add(table);
        }

        return out.toByteArray();
    }
}
