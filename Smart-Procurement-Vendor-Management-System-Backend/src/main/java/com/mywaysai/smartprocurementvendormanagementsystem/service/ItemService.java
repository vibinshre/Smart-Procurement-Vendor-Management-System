package com.mywaysai.smartprocurementvendormanagementsystem.service;

import java.util.List;

import com.mywaysai.smartprocurementvendormanagementsystem.entity.Item;

public interface ItemService {
    Item add(Item item);
    List<Item> list();
    Item getById(Long id);
    Item update(Long id, Item item);
    void delete(Long id);

}
