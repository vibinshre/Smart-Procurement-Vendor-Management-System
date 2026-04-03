import { useState } from "react";
import { createDelivery } from "../../api/vendorService";

export default function Delivery() {

  const [form, setForm] = useState({
    purchaseOrderId: "",
    deliveryDate: "",
    status: "DELIVERED"
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = () => {

    createDelivery(form)
      .then(() => alert("Delivery Submitted"))
      .catch(err => console.error(err));

  };

  return (
    <div className="vendor-page-section">
      <h2 className="vendor-title-card">Delivery Tracking</h2>

      <div className="vendor-form-card">
        <form
          className="vendor-inline-form"
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          <input
            className="vendor-input"
            name="purchaseOrderId"
            placeholder="Purchase Order ID"
            onChange={handleChange}
          />

          <input
            className="vendor-input"
            type="date"
            name="deliveryDate"
            onChange={handleChange}
          />

          <select className="vendor-select" name="status" onChange={handleChange}>
            <option value="DELIVERED">DELIVERED</option>
            <option value="IN_TRANSIT">IN TRANSIT</option>
            <option value="PENDING">PENDING</option>
          </select>

          <button className="vendor-submit-btn" type="submit">Submit Delivery</button>
        </form>
      </div>
    </div>
  );
}