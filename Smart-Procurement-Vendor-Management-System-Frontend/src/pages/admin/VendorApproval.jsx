



import { useEffect, useState } from "react";
import API from "../../api/axios";


import { Link, useNavigate } from "react-router-dom";
import "./admindashboard.css";

export default function VendorApproval() {

  const [vendors, setVendors] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [editVendor, setEditVendor] = useState(null);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const loadVendors = async () => {
    try {
      const res = await API.get("/vendors");
      setVendors(res.data);
    } catch (error) {
      console.error("Failed to load vendors", error);
      alert("Failed to load vendors. Please try again.");
    }
  };

  useEffect(() => {
    loadVendors();
  }, []);

  const approveVendor = async (id) => {
    try {
      await API.put(`/vendors/${id}/approve`);
      alert("Vendor Approved Successfully");
      loadVendors();
    } catch (error) {
      console.error("Failed to approve vendor", error);
      alert("Unable to approve vendor.");
    }
  };

  const deleteVendor = async (id) => {
    try {
      await API.delete(`/vendors/${id}`);
      alert("Vendor Deleted");
      loadVendors();
    } catch (error) {
      console.error("Failed to delete vendor", error);
      const backendMessage =
        error?.response?.data?.message ||
        (typeof error?.response?.data === "string" ? error.response.data : "") ||
        "Unable to delete vendor.";
      alert(backendMessage);
    }
  };

  const searchVendor = async () => {
    if (!searchId) return loadVendors();

    try {
      const res = await API.get(`/vendors/${searchId}`);
      setVendors([res.data]);
    } catch (error) {
      console.error("Vendor search failed", error);
      alert("Vendor not found.");
      setVendors([]);
    }
  };

  const editClick = (vendor) => {
    setEditVendor(vendor);
  };

  const updateVendor = async () => {
    try {
      await API.put(`/vendors/${editVendor.id}`, editVendor);
      alert("Vendor Updated");
      setEditVendor(null);
      loadVendors();
    } catch (error) {
      console.error("Failed to update vendor", error);
      alert("Unable to update vendor.");
    }
  };

  return (

    <div className="dashboard-container">

      {/* SIDEBAR */}
      <div className="sidebar">
        <h2>Smart Procurement</h2>
        <hr/>

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
            <Link to="/admin">Dashboard</Link>
          </li>
          <li>
            <Link to="/admin/items">Items</Link>
          </li>
          <li>
            <Link to="/admin/PurchaseOrder">Purchase Orders</Link>
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


      {/* MAIN CONTENT */}
      <div className="main-content">

        <h2>Vendor Approval</h2>

        {/* SEARCH */}
        <div>
          <input
            placeholder="Search Vendor by ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
          <button onClick={searchVendor}>Search</button>
          <button onClick={loadVendors}>Reset</button>
        </div>

        {/* UPDATE FORM */}
        {editVendor && (
          <div className="edit-form">

            <h3>Update Vendor</h3>

            <input
              value={editVendor.companyName}
              onChange={(e) =>
                setEditVendor({ ...editVendor, companyName: e.target.value })
              }
            />

            <input
              value={editVendor.email}
              onChange={(e) =>
                setEditVendor({ ...editVendor, email: e.target.value })
              }
            />

            <button onClick={updateVendor}>Update</button>
            <button onClick={() => setEditVendor(null)}>Cancel</button>

          </div>
        )}

        {/* TABLE */}
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Company</th>
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {vendors.map((v) => (
              <tr key={v.id}>
                <td>{v.id}</td>
                <td>{v.companyName}</td>
                <td>{v.email}</td>
                <td>{v.approved ? "Approved" : "Pending"}</td>

                <td className="vendor-actions">
                  {!v.approved && (
                    <button className="approve-btn" onClick={() => approveVendor(v.id)}>
                      Approve
                    </button>
                  )}

                  <button className="update-btn" onClick={() => editClick(v)}>
                    Update
                  </button>

                  <button className="delete-btn" onClick={() => deleteVendor(v.id)}>
                    Delete
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}