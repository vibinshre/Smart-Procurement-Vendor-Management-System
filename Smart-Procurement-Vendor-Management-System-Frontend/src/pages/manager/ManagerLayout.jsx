import { NavLink } from "react-router-dom";
import "./managerdashboard.css";

export default function ManagerLayout({ children }) {
  return (
    <div className="dashboard-container">

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

        <button className="logout-btn">Logout</button>
      </div>

      <div className="main-content">
        {children}
      </div>

    </div>
  );
}