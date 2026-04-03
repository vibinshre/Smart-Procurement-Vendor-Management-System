package com.mywaysai.smartprocurementvendormanagementsystem.service;

import java.util.List;

import com.mywaysai.smartprocurementvendormanagementsystem.entity.Item;
import com.mywaysai.smartprocurementvendormanagementsystem.repository.ItemRepository;
import org.springframework.stereotype.Service;

import com.mywaysai.smartprocurementvendormanagementsystem.entity.Requisition;
import com.mywaysai.smartprocurementvendormanagementsystem.repository.RequisitionRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RequisitionServiceImpl implements RequisitionService {

    private final RequisitionRepository repository;
    private final ItemRepository itemRepository;

    @Override
    public Requisition create(Requisition r){


        Item item = itemRepository.findById(r.getItem().getId())
                .orElseThrow(() -> new RuntimeException("Item not found"));

        r.setItem(item);



        r.setStatus("PENDING");
        return repository.save(r);
    }





    @Override
    public List<Requisition> list(){
        return repository.findAll();
    }

    @Override
    public List<Requisition> findAll() {

        return   repository.findAll();

    }

    @Override
    public Requisition findById(Long id) {
        return repository.findById(id).orElseThrow(() -> new RuntimeException("Requisition not found"));
    }

    @Override
    public Requisition update(Long id, Requisition requisition) {
        Requisition existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Requisition not found"));

        if (requisition.getItem() != null && requisition.getItem().getId() != null) {
            Item item = itemRepository.findById(requisition.getItem().getId())
                    .orElseThrow(() -> new RuntimeException("Item not found"));
            existing.setItem(item);
        }

        existing.setQuantity(requisition.getQuantity());
        if (requisition.getStatus() != null && !requisition.getStatus().isBlank()) {
            existing.setStatus(requisition.getStatus());
        }

        return repository.save(existing);
    }

    @Override
    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Requisition not found");
        }
        repository.deleteById(id);
    }
}
