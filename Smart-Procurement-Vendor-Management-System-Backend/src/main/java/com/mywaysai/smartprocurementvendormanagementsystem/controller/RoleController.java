package com.mywaysai.smartprocurementvendormanagementsystem.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.mywaysai.smartprocurementvendormanagementsystem.entity.Role;
import com.mywaysai.smartprocurementvendormanagementsystem.service.RoleService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/roles")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5180"})
@RequiredArgsConstructor
public class RoleController {

    private final RoleService service;

    @PostMapping
    public Role add(@RequestBody Role r){
        return service.create(r);
    }

    @GetMapping
    public List<Role> list(){
        return service.list();
    }

    @GetMapping("/{id}")
    public Role getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @PutMapping("/{id}")
    public Role update(@PathVariable Long id, @RequestBody Role role) {
        return service.update(id, role);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
