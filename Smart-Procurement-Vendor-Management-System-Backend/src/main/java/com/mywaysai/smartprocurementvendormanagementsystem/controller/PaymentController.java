package com.mywaysai.smartprocurementvendormanagementsystem.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mywaysai.smartprocurementvendormanagementsystem.dto.PaymentRequest;
import com.mywaysai.smartprocurementvendormanagementsystem.entity.Invoice;
import com.mywaysai.smartprocurementvendormanagementsystem.entity.Payment;
import com.mywaysai.smartprocurementvendormanagementsystem.repository.InvoiceRepository;
import com.mywaysai.smartprocurementvendormanagementsystem.repository.PaymentRepository;
import com.mywaysai.smartprocurementvendormanagementsystem.service.PaymentService;

@RestController
@RequestMapping("/payment")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5180"})
//@RequiredArgsConstructor
public class PaymentController {


        private final PaymentRepository paymentRepository;
        private final InvoiceRepository invoiceRepository;
        private final PaymentService service;
        public PaymentController(PaymentRepository paymentRepository,
                                 InvoiceRepository invoiceRepository, PaymentService service) {
            this.paymentRepository = paymentRepository;
            this.invoiceRepository = invoiceRepository;
            this.service = service;
        }

        @PostMapping
        public Payment create(@RequestBody PaymentRequest request) {

            Invoice invoice = invoiceRepository.findById(request.getInvoiceId())
                .orElseThrow(() -> new RuntimeException("Invoice not found"));

            Payment payment = new Payment();
            payment.setInvoice(invoice);
            payment.setPaidAmount(request.getPaidAmount());
            payment.setPaymentDate(request.getPaymentDate());
            payment.setPaymentMode(request.getPaymentMode());
            payment.setStatus(request.getStatus());

            // Mark invoice as PAID and save
            invoice.setStatus("PAID");
            invoiceRepository.save(invoice);

            return paymentRepository.save(payment);
        }

        @GetMapping
        public List<Payment> getAll() {
            return paymentRepository.findAll();
        }

        @GetMapping("/{id}")
        public Payment getById(@PathVariable Long id) {
            return paymentRepository.findById(id).orElseThrow();
        }
//        @PostMapping
//    public Payment pay(@RequestBody Payment payment){
//        return service.pay(payment);
//    }
}
