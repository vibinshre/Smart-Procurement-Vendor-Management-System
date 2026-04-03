package com.mywaysai.smartprocurementvendormanagementsystem.service;

import java.util.List;

import com.mywaysai.smartprocurementvendormanagementsystem.entity.Item;
import com.mywaysai.smartprocurementvendormanagementsystem.repository.ItemRepository;
import org.springframework.stereotype.Service;

import com.mywaysai.smartprocurementvendormanagementsystem.entity.Inventory;
import com.mywaysai.smartprocurementvendormanagementsystem.repository.InventoryRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class InventoryServiceImpl implements InventoryService {
    private final ItemRepository itemRepository;
    private final InventoryRepository repository;

    @Override
    public Inventory updateStock(Inventory inv){

        Item item = itemRepository.findById(inv.getItem().getId())
                .orElseThrow(() -> new RuntimeException("Item not found"));

        inv.setItem(item);

        return repository.save(inv);
    }
//    public Inventory updateStock(Inventory inv){
//        return repository.save(inv);
//    }

    @Override
    public List<Inventory> all(){
        return repository.findAll();
    }

    @Override
    public Inventory getById(Long id) {
        return repository.findById(id).orElseThrow(() -> new RuntimeException("Inventory not found"));
    }

    @Override
    public Inventory update(Long id, Inventory inv) {
        Inventory existing = repository.findById(id).orElseThrow(() -> new RuntimeException("Inventory not found"));

        if (inv.getItem() != null && inv.getItem().getId() != null) {
            Item item = itemRepository.findById(inv.getItem().getId())
                    .orElseThrow(() -> new RuntimeException("Item not found"));
            existing.setItem(item);
        }

        existing.setQuantityAvailable(inv.getQuantityAvailable());
        existing.setWarehouseLocation(inv.getWarehouseLocation());

        return repository.save(existing);
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }
}

