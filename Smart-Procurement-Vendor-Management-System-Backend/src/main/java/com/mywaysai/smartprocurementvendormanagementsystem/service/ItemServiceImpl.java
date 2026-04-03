package com.mywaysai.smartprocurementvendormanagementsystem.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.mywaysai.smartprocurementvendormanagementsystem.entity.Item;
import com.mywaysai.smartprocurementvendormanagementsystem.repository.ItemRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ItemServiceImpl implements ItemService {

    private final ItemRepository repository;

    @Override
    public Item add(Item item){

    // item.setUnitPrice(((item.getUnitPrice())));
        return repository.save(item);
    }

    @Override
    public List<Item> list(){
        return repository.findAll();
    }

    @Override
    public Item getById(Long id) {
        return repository.findById(id).orElseThrow(() -> new RuntimeException("Item not found"));
    }

    @Override
    public Item update(Long id, Item item) {
        Item existing = repository.findById(id).orElseThrow(() -> new RuntimeException("Item not found"));
        existing.setItemName(item.getItemName());
        existing.setCategory(item.getCategory());
        existing.setUnitPrice(item.getUnitPrice());
        return repository.save(existing);
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }
}
