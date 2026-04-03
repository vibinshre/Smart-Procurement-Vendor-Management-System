package com.mywaysai.smartprocurementvendormanagementsystem.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.mywaysai.smartprocurementvendormanagementsystem.entity.PurchaseOrderItem;

public interface PurchaseOrderItemRepository extends JpaRepository< PurchaseOrderItem,Long>{ 

	@Query("""
		   SELECT MONTH(p.orderDate), COALESCE(SUM(i.price * i.quantity), 0)
		   FROM PurchaseOrderItem i
		   JOIN i.purchaseOrder p
		   GROUP BY MONTH(p.orderDate)
		   ORDER BY MONTH(p.orderDate)
		   """)
	List<Object[]> monthlySpend();
} 