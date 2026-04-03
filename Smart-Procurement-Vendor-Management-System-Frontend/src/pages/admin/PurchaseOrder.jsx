
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import "./admindashboard.css";
import "./master.css";

export default function PurchaseOrder() {
  const navigate = useNavigate();

  const [reqs, setReqs] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [poList, setPoList] = useState([]);
  const [search, setSearch] = useState("");

  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    requisitionId: "",
    vendorId: "",
    orderDate: "",
    expectedDelivery: "",
    totalAmount: ""
  });

  useEffect(() => {
    load();
  }, []);

  // LOAD DATA
  const load = async () => {
    try {

      const r = await api.get("/requisitions");
      const v = await api.get("/vendors");
      const p = await api.get("/po");

      setReqs(r.data);
      setVendors(v.data);
      setPoList(p.data);

    } catch (err) {
      console.error(err);
    }
  };

  // CREATE PO
  const savePO = async () => {

    if (!form.vendorId || !form.requisitionId) {
      alert("Select Vendor and Requisition");
      return;
    }

    try {

      await api.post(
        `/po?vendorId=${form.vendorId}&requisitionId=${form.requisitionId}`
      );

      alert("PO Created");

      setForm({
        requisitionId: "",
        vendorId: "",
        orderDate: "",
        expectedDelivery: "",
        totalAmount: ""
      });

      load();

    } catch (err) {
      console.error(err);
    }
  };

  // GET BY ID
  const getPO = async (id) => {

    try {

      const res = await api.get(`/po/${id}`);
      const data = res.data;

      setForm({
        requisitionId: data.requisition?.id || "",
        vendorId: data.vendor?.id || "",
        orderDate: data.orderDate || "",
        expectedDelivery: data.expectedDelivery || "",
        totalAmount: data.totalAmount || ""
      });

      setEditId(id);

    } catch (err) {
      console.error(err);
    }
  };

  // DELETE
  const deletePO = async (id) => {

    try {

      await api.delete(`/po/${id}`);
      load();

    } catch (err) {
      console.error(err);
    }
  };

  // SEARCH
  const searchPO = async () => {

    try {

      const res = await api.get(`/po/search?keyword=${search}`);
      setPoList(res.data);

    } catch (err) {
      console.error(err);
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (

    <div className="dashboard-container">
      <div className="sidebar">
        <h2>Admin Panel</h2>
        <hr />

        <h3>Master</h3>
        <ul>
          <li>
            <Link to="/master/roles">Roles</Link>
          </li>
          <li>
            <Link to="/master/departments">Departments</Link>
          </li>
          <li>
            <Link to="/master/users">Users</Link>
          </li>
        </ul>

        <h3>Procurement</h3>
        <ul>
          <li>
            <Link to="/admin/items">Items</Link>
          </li>
          <li>
            <Link to="/admin/PurchaseOrder">Purchase Order</Link>
          </li>
          <li>
            <Link to="/admin/Inventory">Inventory</Link>
          </li>
          <li>
            <Link to="/admin/reports">Reports</Link>
          </li>
          <li>
            <Link to="/admin/VendorApproval">Vendor Request Approval</Link>
          </li>
        </ul>

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>

      <div className="main-content">
        <div className="container">

      <h2>Purchase Orders</h2>

      {/* SEARCH */}

      <div className="search-bar">

        <input
          placeholder="Search PO"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button onClick={searchPO}>Search</button>

      </div>

      {/* FORM */}

      <div className="form-box">

        {/* REQUISITION */}

        <select
          value={form.requisitionId}
          onChange={(e) =>
            setForm({ ...form, requisitionId: e.target.value })
          }
        >

          <option value="">Select Requisition</option>

          {reqs.map((r) => (
            <option key={r.id} value={r.id}>
              Req #{r.id} - Qty {r.quantity}
            </option>
          ))}

        </select>

        {/* VENDOR */}

        <select
          value={form.vendorId}
          onChange={(e) =>
            setForm({ ...form, vendorId: e.target.value })
          }
        >

          <option value="">Select Vendor</option>

          {vendors.map((v) => (
            <option key={v.id} value={v.id}>
              {v.companyName}
            </option>
          ))}

        </select>

        {/* ORDER DATE */}

        <input
          type="date"
          value={form.orderDate}
          onChange={(e) =>
            setForm({ ...form, orderDate: e.target.value })
          }
        />

        {/* EXPECTED DELIVERY */}

        <input
          type="date"
          value={form.expectedDelivery}
          onChange={(e) =>
            setForm({ ...form, expectedDelivery: e.target.value })
          }
        />

        {/* TOTAL AMOUNT */}

        <input
          type="number"
          placeholder="Total Amount"
          value={form.totalAmount}
          onChange={(e) =>
            setForm({ ...form, totalAmount: e.target.value })
          }
        />

        <button onClick={savePO}>
          {editId ? "Update PO" : "Create PO"}
        </button>

      </div>

      {/* TABLE */}

      <table>

        <thead>

          <tr>
            <th>ID</th>
            <th>PO Number</th>
            <th>Vendor</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Action</th>
          </tr>

        </thead>

        <tbody>

          {poList.map((p) => (

            <tr key={p.id}>

              <td>{p.id}</td>

              <td>{p.poNumber}</td>

              <td>{p.vendor?.companyName}</td>

              <td>{p.totalAmount}</td>

              <td>{p.status}</td>

              <td>

                <button
                  className="action-btn"
                  onClick={() => getPO(p.id)}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => deletePO(p.id)}
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

        </div>
      </div>
    </div>

  );
}