package com.mywaysai.smartprocurementvendormanagementsystem.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.mywaysai.smartprocurementvendormanagementsystem.entity.PurchaseOrder;
import com.mywaysai.smartprocurementvendormanagementsystem.service.PurchaseOrderService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/po")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174", "http://localhost:5180"})
@RequiredArgsConstructor
public class PurchaseOrderController {

    private final PurchaseOrderService service;

    @PostMapping("/{vendorId}")
    public PurchaseOrder create(@PathVariable Long vendorId){
        return service.create(vendorId);
    }

    @PostMapping
    public PurchaseOrder createWithQuery(@RequestParam Long vendorId,
                                         @RequestParam(required = false) Long requisitionId,
                                         @RequestBody(required = false) PurchaseOrder payload) {
        return service.create(vendorId, requisitionId, payload);
    }

    @GetMapping
    public List<PurchaseOrder> all(@RequestParam(required = false) Long vendorId){
        if (vendorId != null) {
            return service.findByVendorId(vendorId);
        }
        return service.all();
    }

    @GetMapping("/requisition/{requisitionId}")
    public List<PurchaseOrder> getByRequisitionId(@PathVariable Long requisitionId) {
        return service.findByRequisitionId(requisitionId);
    }

    @GetMapping("/{id}")
    public PurchaseOrder getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    @GetMapping("/search")
    public List<PurchaseOrder> search(@RequestParam String keyword) {
        return service.search(keyword);
    }
}



//
//Monish R
//
//Muthuselvi C
//8:38 PM
//Muthuselvi C
//
//Sai Shobana Sri H
//8:38 PM
//SAI SHOBANA SRI
//
//Dhruv Battawar
//8:38 PM
//Dhruv Battawar
//
//Partha Pratim Makhal
//8:38 PM
//Partha Pratim Makhal
//
//RVibin Shree
//8:38 PM
//Vibin sri R
//
//        Kishor
//8:38 PM
//Kishor S
//
//Mozammil
//8:38 PM
//        Mozammil
//
//Ganesh n Bambulage
//8:38 PM
//Ganesh N bambulage
//
//239X1A3258 SIRIGIREDDY NITHIN REDDY
//8:38 PM
//        NITHIN
//
//Jyoshna K
//8:38 PM
//jyoshna Koppisetti
//
//jeruslin vince
//8:38 PM
//Jeruslin Vince V
//
//Trishna Ravi
//8:38 PM
//        Trishna
//
//Shaik Chand bhasha
//8:38 PM
//SHAIK CHAND BHASHA
//
//Yuvaraaj R K
//8:38 PM
//        Yuvaraaj
//
//Tejaswini Thakur
//8:38 PM
//Tejaswini Thakur