







import { useEffect, useState } from "react";
import { NavLink, Outlet ,useNavigate} from "react-router-dom";
import api from "../../api/axios";

import "./managerdashboard.css";

export default function ManagerDashboard() {

  const [requisitions, setRequisitions] = useState([]);
  const [approvals, setApprovals] = useState([]);
  const [orders, setOrders] = useState([]);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };
  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {

      const req = await api.get("/requisitions");
      const app = await api.get("/approvals");
      const po = await api.get("/po");

      setRequisitions(req.data);
      setApprovals(app.data);
      setOrders(po.data);

    } catch (err) {
      console.error("Dashboard Load Error:", err);
    }
  };

  // counts
  const pendingCount = requisitions.filter(
    r => r.status === "PENDING"
  ).length;

  const approvedCount = approvals.filter(
    a => (a.decision || a.status) === "APPROVED"
  ).length;

  const poCount = orders.length;

  return (
    <div className="dashboard-container">

      {/* Sidebar */}
      <div className="sidebar">
        <h2>Manager</h2>
        <hr />

        <ul>
          <li>
            <NavLink to="/manager" end className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/manager/pending" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
              Pending Approvals
            </NavLink>
          </li>
          <li>
            <NavLink to="/manager/approved" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
              Approved Requests
            </NavLink>
          </li>
        </ul>
 <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="main-content">

        <h2 className="manager-title-card">Manager Dashboard</h2>

        <div className="card-grid">

          <div className="pending-mini-group">
            <div className="mini-card mini-card-label">
              <h3>Pending Approvals</h3>
            </div>

            <div className="mini-card mini-card-count">
              <p>{pendingCount}</p>
            </div>
          </div>

          <div className="pending-mini-group">
            <div className="mini-card mini-card-label">
              <h3>Approved Requests</h3>
            </div>

            <div className="mini-card mini-card-count">
              <p>{approvedCount}</p>
            </div>
          </div>

          <div className="pending-mini-group">
            <div className="mini-card mini-card-label">
              <h3>Purchase Orders</h3>
            </div>

            <div className="mini-card mini-card-count">
              <p>{poCount}</p>
            </div>
          </div>

        </div>

        <Outlet />

      </div>
    </div>
  );
}