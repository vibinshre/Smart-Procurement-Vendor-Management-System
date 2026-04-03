package com.mywaysai.smartprocurementvendormanagementsystem.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mywaysai.smartprocurementvendormanagementsystem.entity.Invoice;
import com.mywaysai.smartprocurementvendormanagementsystem.service.InvoiceServiceImpl;

@RestController
@RequestMapping("/invoice")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5180"})
//@RequiredArgsConstructor
public class InvoiceController {



        private final InvoiceServiceImpl service;

        public InvoiceController(InvoiceServiceImpl service) {
            this.service = service;
        }

        @PostMapping
        public Invoice create(@RequestBody Invoice request) {
            return service.create(request);
        }

        @GetMapping
        public List<Invoice> getAll() {
            return service.getAll();
        }

        @GetMapping("/{id}")
        public Invoice getById(@PathVariable Long id) {
            return service.getById(id);
        }

        @GetMapping("/requisition/{requisitionId}")
        public List<Invoice> getByRequisitionId(@PathVariable Long requisitionId) {
            return service.getByRequisitionId(requisitionId);
        }


//
//    @PostMapping
//    public Invoice create(@RequestBody Invoice invoice){
//        return service.create(invoice);
//    }


}
