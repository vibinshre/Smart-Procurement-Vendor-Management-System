package com.mywaysai.smartprocurementvendormanagementsystem.service;

import java.util.List;

import com.mywaysai.smartprocurementvendormanagementsystem.entity.Department;

public interface DepartmentService {
    Department add(Department d);
    List<Department> all();
    Department getById(Long id);
    Department update(Long id, Department d);
    void delete(Long id);
}

