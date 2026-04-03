package com.mywaysai.smartprocurementvendormanagementsystem.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mywaysai.smartprocurementvendormanagementsystem.entity.Approval;
import com.mywaysai.smartprocurementvendormanagementsystem.service.ApprovalService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/approvals")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174", "http://localhost:5180"})
@RequiredArgsConstructor
public class ApprovalController {

    private final ApprovalService service;

    @PostMapping("/{id}")
    public Approval approve(@PathVariable Long id){
        return service.approve(id);
    }

    @GetMapping
    public List<Approval> getAll() {
        return service.findAll();
    }

    @GetMapping("/{requisitionId}")
    public Approval getByRequisitionId(@PathVariable Long requisitionId) {
        return service.findByRequisitionId(requisitionId);
    }
}

