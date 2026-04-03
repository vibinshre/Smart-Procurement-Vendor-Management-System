



import React, { useState } from "react";
import API from "../../api/axios";
import "./ProcessPayment.css";

export default function ProcessPayment() {

  const [invoiceId, setInvoiceId] = useState("");
  const [paidAmount, setPaidAmount] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert date to YYYY-MM-DD if needed
    let formattedDate = paymentDate;
    if (paymentDate && paymentDate.match(/^\d{2}-\d{2}-\d{4}$/)) {
      const [dd, mm, yyyy] = paymentDate.split("-");
      formattedDate = `${yyyy}-${mm.padStart(2, '0')}-${dd.padStart(2, '0')}`;
    }

    // Validate all fields
    if (!invoiceId || !paidAmount || !formattedDate || !paymentMode || !status) {
      alert("All fields are required. Please fill in all fields.");
      return;
    }

    const payload = {
      invoiceId: invoiceId,
      paidAmount: paidAmount === "" ? null : Number(paidAmount),
      paymentDate: formattedDate,
      paymentMode: paymentMode,
      status: status
    };
    console.log("Submitting payment payload:", payload);

    try {
      await API.post("/payment", payload);

      alert("Payment Processed Successfully");

      setInvoiceId("");
      setPaidAmount("");
      setPaymentDate("");
      setPaymentMode("");
    
      setStatus("");

    } catch (error) {
      console.error("Payment error:", error, "Payload:", payload);
      let msg = "Payment failed. Please check your input and try again.";
      if (error.response && error.response.data) {
        if (typeof error.response.data === "string") {
          msg += "\n" + error.response.data;
        } else if (error.response.data.message) {
          msg += "\n" + error.response.data.message;
        }
      }
      alert(msg);
    }
  };

  return (
    <div className="payment-container">

      <h2 className="payment-title">Process Payment</h2>

      <form className="payment-form" onSubmit={handleSubmit}>

        <div className="form-group">
          <label>Invoice ID</label>
          <input
            type="number"
            value={invoiceId}
            onChange={(e) => setInvoiceId(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Paid Amount</label>
          <input
            type="number"
            value={paidAmount}
            onChange={(e) => setPaidAmount(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Payment Date</label>
          <input
            type="date"
            value={paymentDate}
            onChange={(e) => setPaymentDate(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Payment Mode</label>
          <select
            value={paymentMode}
            onChange={(e) => setPaymentMode(e.target.value)}
            required
          >
            <option value="">Select Mode</option>
            <option value="Cash_TRANSFER">Cash Transfer</option>
            <option value="BANK_TRANSFER">Bank Transfer</option>
            <option value="UPI">UPI</option>
          </select>
        </div>

        <div className="form-group">
          <label>Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="">Select Status</option>
            <option value="COMPLETED">Completed</option>
            <option value="PENDING">Pending</option>
          </select>
        </div>

        <button className="payment-btn" type="submit">
          Process Payment
        </button>

      </form>

    </div>
  );
}