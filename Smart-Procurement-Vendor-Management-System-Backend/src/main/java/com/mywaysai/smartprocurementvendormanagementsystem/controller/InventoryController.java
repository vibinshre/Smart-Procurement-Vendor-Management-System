package com.mywaysai.smartprocurementvendormanagementsystem.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.mywaysai.smartprocurementvendormanagementsystem.entity.Inventory;
import com.mywaysai.smartprocurementvendormanagementsystem.service.InventoryService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/inventory")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5180"})
@RequiredArgsConstructor
public class InventoryController {

    private final InventoryService service;

    @PostMapping
    public Inventory update(@RequestBody Inventory inv){
        return service.updateStock(inv);
    }

    @GetMapping
    public List<Inventory> all(){
        return service.all();
    }

    @GetMapping("/{id}")
    public Inventory getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @PutMapping("/{id}")
    public Inventory update(@PathVariable Long id, @RequestBody Inventory inv) {
        return service.update(id, inv);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
