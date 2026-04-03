package com.mywaysai.smartprocurementvendormanagementsystem.controller;

import org.springframework.web.bind.annotation.*;

import com.mywaysai.smartprocurementvendormanagementsystem.entity.Requisition;
import com.mywaysai.smartprocurementvendormanagementsystem.service.RequisitionService;

import lombok.RequiredArgsConstructor;

import java.util.List;

@RestController
@RequestMapping("/requisitions")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5180"})
@RequiredArgsConstructor
public class RequisitionController {

    private final RequisitionService service;

    @PostMapping
    public Requisition create(@RequestBody Requisition r){
        return service.create(r);
    }

    @GetMapping
    public List<Requisition> getAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public Requisition getById(@PathVariable Long id) {
        return service.findById(id);
    }

    @PutMapping("/{id}")
    public Requisition update(@PathVariable Long id, @RequestBody Requisition requisition) {
        return service.update(id, requisition);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
