package com.mywaysai.smartprocurementvendormanagementsystem.service;

import com.mywaysai.smartprocurementvendormanagementsystem.entity.Delivery;

import java.util.List;

public interface DeliveryService {


    Delivery createDelivery(Long purchaseOrderId, String trackingNumber, String deliveryStatus);

    List<Delivery> getAll();
    List<Delivery> getByRequisitionId(Long requisitionId);

    Delivery track(Delivery d);
}
