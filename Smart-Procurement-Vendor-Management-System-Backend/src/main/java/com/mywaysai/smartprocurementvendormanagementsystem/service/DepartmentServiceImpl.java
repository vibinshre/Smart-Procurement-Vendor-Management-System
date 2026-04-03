package com.mywaysai.smartprocurementvendormanagementsystem.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.mywaysai.smartprocurementvendormanagementsystem.entity.Department;
import com.mywaysai.smartprocurementvendormanagementsystem.repository.DepartmentRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DepartmentServiceImpl implements DepartmentService {

    private final DepartmentRepository repository;

    @Override
    public Department add(Department d){
        return repository.save(d);
    }

    @Override
    public List<Department> all(){
        return repository.findAll();
    }

    @Override
    public Department getById(Long id) {
        return repository.findById(id).orElseThrow(() -> new RuntimeException("Department not found"));
    }

    @Override
    public Department update(Long id, Department d) {
        Department existing = repository.findById(id).orElseThrow(() -> new RuntimeException("Department not found"));
        existing.setName(d.getName());
        existing.setLocation(d.getLocation());
        return repository.save(existing);
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }
}
