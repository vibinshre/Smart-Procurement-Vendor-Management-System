


import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getRoles } from "../../api/roleService";
import { getDepartments } from "../../api/departmentService";
import { getUsers } from "../../api/userService";
import api from "../../api/axios";
import "./admindashboard.css";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    roles: 0,
    departments: 0,
    users: 0,
  });
  const [procurementStats, setProcurementStats] = useState({
    items: 0,
    purchaseOrders: 0,
    inventory: 0,
    vendorRequestApproval: 0,
  });
  const [loadingStats, setLoadingStats] = useState(true);
  const [statsError, setStatsError] = useState("");

  useEffect(() => {
    const loadStats = async () => {
      setLoadingStats(true);
      setStatsError("");

      try {
        const [rolesRes, departmentsRes, usersRes, itemsRes, poRes, inventoryRes, vendorsRes] = await Promise.all([
          getRoles(),
          getDepartments(),
          getUsers(),
          api.get("/items"),
          api.get("/po"),
          api.get("/inventory"),
          api.get("/vendors"),
        ]);

        setStats({
          roles: Array.isArray(rolesRes.data) ? rolesRes.data.length : 0,
          departments: Array.isArray(departmentsRes.data) ? departmentsRes.data.length : 0,
          users: Array.isArray(usersRes.data) ? usersRes.data.length : 0,
        });

        const vendors = Array.isArray(vendorsRes.data) ? vendorsRes.data : [];
        const pendingVendors = vendors.filter((vendor) => !vendor?.approved).length;

        setProcurementStats({
          items: Array.isArray(itemsRes.data) ? itemsRes.data.length : 0,
          purchaseOrders: Array.isArray(poRes.data) ? poRes.data.length : 0,
          inventory: Array.isArray(inventoryRes.data) ? inventoryRes.data.length : 0,
          vendorRequestApproval: pendingVendors,
        });
      } catch (error) {
        console.error("Failed to load admin stats", error);
        setStatsError("Could not load dashboard counts.");
      } finally {
        setLoadingStats(false);
      }
    };

    loadStats();
  }, []);

  const masterCards = useMemo(
    () => [
      {
        key: "roles",
        title: "Roles",
        subtitle: "Manage role catalog and permissions",
        count: stats.roles,
        to: "/master/roles",
      },
      {
        key: "departments",
        title: "Departments",
        subtitle: "Maintain departments and locations",
        count: stats.departments,
        to: "/master/departments",
      },
      {
        key: "users",
        title: "Users",
        subtitle: "Create and maintain user accounts",
        count: stats.users,
        to: "/master/users",
      },
    ],
    [stats]
  );

  const procurementCards = useMemo(
    () => [
      {
        key: "items",
        title: "Items",
        subtitle: "Manage procurement item catalog",
        count: procurementStats.items,
        to: "/admin/items",
      },
      {
        key: "purchase-orders",
        title: "Purchase Orders",
        subtitle: "Create and monitor purchase orders",
        count: procurementStats.purchaseOrders,
        to: "/admin/PurchaseOrder",
      },
      {
        key: "inventory",
        title: "Inventory",
        subtitle: "Track stock and inventory movement",
        count: procurementStats.inventory,
        to: "/admin/Inventory",
      },
      {
        key: "reports",
        title: "Reports",
        subtitle: "View cost, spend, and vendor performance reports",
        to: "/admin/reports",
      },
      {
        key: "vendor-request-approval",
        title: "Vendor Request Approval",
        subtitle: "Review and approve vendor requests",
        count: procurementStats.vendorRequestApproval,
        to: "/admin/VendorApproval",
      },
    ],
    [procurementStats]
  );

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="dashboard-container">

      {/* Sidebar */}
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

      {/* Main Content */}
      <div className="main-content">
        <h1 className="admin-gradient-title">Welcome Admin</h1>
        <p className="main-subtitle">Select a module from the sidebar or use quick cards below.</p>

        <div className="master-section">
          <div className="master-section-header">
            <h2>Master Management</h2>
            {loadingStats && <span className="status-pill">Loading counts...</span>}
          </div>

          {statsError ? <p className="status-error">{statsError}</p> : null}

          <div className="master-cards-grid">
            {masterCards.map((card) => (
              <button
                key={card.key}
                type="button"
                className="master-card"
                onClick={() => navigate(card.to)}
                aria-label={`Open ${card.title}`}
              >
                <div className="master-card-top">
                  <span className="master-card-title">{card.title}</span>
                  {typeof card.count === "number" ? (
                    <span className="master-card-count">{card.count}</span>
                  ) : null}
                </div>
                <p className="master-card-subtitle">{card.subtitle}</p>
                <span className="master-card-link">Open</span>
              </button>
            ))}
          </div>
        </div>

        <div className="master-section">
          <div className="master-section-header">
            <h2>Procurement</h2>
          </div>

          <div className="master-cards-grid">
            {procurementCards.map((card) => (
              <button
                key={card.key}
                type="button"
                className="master-card"
                onClick={() => navigate(card.to)}
                aria-label={`Open ${card.title}`}
              >
                <div className="master-card-top">
                  <span className="master-card-title">{card.title}</span>
                  {typeof card.count === "number" ? (
                    <span className="master-card-count">{card.count}</span>
                  ) : null}
                </div>
                <p className="master-card-subtitle">{card.subtitle}</p>
                <span className="master-card-link">Open</span>
              </button>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}