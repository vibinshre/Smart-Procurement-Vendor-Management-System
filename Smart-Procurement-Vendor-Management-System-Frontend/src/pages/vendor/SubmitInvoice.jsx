
import { useState } from "react";
import { submitInvoice } from "../../api/vendorService";

export default function SubmitInvoice() {

  const [form, setForm] = useState({
    poId: "",
    invoiceNumber: "",
    amount: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const poId = Number(form.poId);
    const amount = Number(form.amount);
    if (!form.poId || Number.isNaN(poId) || poId <= 0) {
      alert("Enter a valid Purchase Order ID");
      return;
    }
    if (!form.invoiceNumber?.trim()) {
      alert("Enter invoice number");
      return;
    }
    if (form.amount === "" || Number.isNaN(amount) || amount < 0) {
      alert("Enter a valid amount");
      return;
    }

    submitInvoice({
      purchaseOrder: { id: poId },
      invoiceNumber: form.invoiceNumber.trim(),
      amount
    })
      .then(() => alert("Invoice Submitted"))
      .catch(err => {
        console.error(err);
        const msg = err.response?.data?.message || err.message || "Could not submit invoice";
        alert(msg);
      });
  };

  return (
    <div className="vendor-page-section">
      <h2 className="vendor-title-card">Submit Invoice</h2>

      <div className="vendor-form-card">
        <form
          className="vendor-inline-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <input
            className="vendor-input"
            name="poId"
            placeholder="Purchase Order ID"
            onChange={handleChange}
          />

          <input
            className="vendor-input"
            name="invoiceNumber"
            placeholder="Invoice Number"
            onChange={handleChange}
          />

          <input
            className="vendor-input"
            name="amount"
            placeholder="Amount"
            onChange={handleChange}
          />

          <button className="vendor-submit-btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}