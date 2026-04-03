







import { useEffect, useState } from "react";
import { getVendorPOs } from "../../api/vendorService";
import API from "../../api/axios";

export default function ViewPurchaseOrders() {

  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [vendorId, setVendorId] = useState(localStorage.getItem("vendorId"));

  useEffect(() => {

    const loadOrders = (id) => {
      getVendorPOs(id)
        .then(res => {
          setOrders(res.data);
          setError("");
        })
        .catch(err => {
          console.error(err);
          setError("Unable to load purchase orders.");
          setOrders([]);
        });
    };

    if (vendorId) {
      loadOrders(vendorId);
      return;
    }

    const email = localStorage.getItem("email");
    if (!email) {
      setError("Vendor session not found. Please logout and login again.");
      setOrders([]);
      return;
    }

    API.get("/vendors")
      .then((res) => {
        const vendors = Array.isArray(res.data) ? res.data : [];
        const matchedVendor = vendors.find(
          (v) => v?.email?.toLowerCase() === email.toLowerCase()
        );

        if (!matchedVendor?.id) {
          setError("Vendor session not found. Please contact admin.");
          setOrders([]);
          return;
        }

        const resolvedId = String(matchedVendor.id);
        localStorage.setItem("vendorId", resolvedId);
        setVendorId(resolvedId);
        loadOrders(resolvedId);
      })
      .catch((err) => {
        console.error(err);
        setError("Vendor session not found. Please logout and login again.");
        setOrders([]);
      });

  }, [vendorId]);

  return (
    <div>

      <h2 className="vendor-title-card">Purchase Orders</h2>

      {error && <p>{error}</p>}

      <table border="1" cellPadding="10">

        <thead>
          <tr>
            <th>PO ID</th>
            <th>PO Number</th>
            <th>Order Date</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>

          {orders.map(po => (
            <tr key={po.id}>
              <td>{po.id}</td>
              <td>{po.poNumber}</td>
              <td>{po.orderDate}</td>
              <td>{po.status}</td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}