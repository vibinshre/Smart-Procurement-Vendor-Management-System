package com.mywaysai.smartprocurementvendormanagementsystem.controller;

import com.mywaysai.smartprocurementvendormanagementsystem.dto.DeliveryRequest;
import com.mywaysai.smartprocurementvendormanagementsystem.entity.Delivery;
import com.mywaysai.smartprocurementvendormanagementsystem.service.DeliveryService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/deliveries")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5180"})
public class DeliveryController {

    private final DeliveryService service;

    public DeliveryController(DeliveryService service) {
        this.service = service;
    }

    @PostMapping
    public Delivery create(@RequestBody DeliveryRequest request) {
        return service.createDelivery(
                request.getPurchaseOrderId(),
                request.getTrackingNumber(),
                request.getDeliveryStatus()
        );
    }

    @GetMapping
    public List<Delivery> getAll(){
        return service.getAll();
    }

    @GetMapping("/requisition/{requisitionId}")
    public List<Delivery> getByRequisitionId(@PathVariable Long requisitionId) {
        return service.getByRequisitionId(requisitionId);
    }
}

