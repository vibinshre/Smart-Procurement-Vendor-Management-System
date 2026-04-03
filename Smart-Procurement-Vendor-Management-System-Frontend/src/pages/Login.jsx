







import { useState } from "react";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";   //  Import CSS file

export default function Login() {
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      if (!email.trim() || !password.trim()) {
        alert("Please enter both username and password");
        return;
      }

      const res = await API.post("/users/auth/login", {
        email: email.trim(),
        password: password.trim(),
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("email", email.trim());
      if (res.data.userId != null) {
        localStorage.setItem("userId", String(res.data.userId));
      }
      if (res.data.vendorId != null) {
        localStorage.setItem("vendorId", String(res.data.vendorId));
      }

      const role = res.data.role?.toUpperCase();

      if (role === "EMPLOYEE") navigate("/employee");
      else if (role === "MANAGER") navigate("/manager");
      else if (role === "ADMIN") navigate("/admin");
      else if (role === "FINANCE") navigate("/finance");
      else if (role === "VENDOR") navigate("/vendor");
      else alert("Role not configured: " + role);

    } catch (error) {
      const backendMessage =
        error?.response?.data?.message ||
        (typeof error?.response?.data === "string" ? error.response.data : "") ||
        error?.message ||
        "Login Failed. Please check credentials.";

      alert(backendMessage);
    }
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-form-container">
        <div className="login-info-panel">
          <div className="info-card">
            <p className="info-header">SMART PROCUREMENT</p>
            <h1 className="info-title">Vendor Management Platform</h1>
            <p className="info-text">
              Clean workflows for requisitions, approvals, invoices, and vendor
              operations.
            </p>
          </div>
        </div>
        <div className="login-form-panel">
          <h2 className="form-title">Sign In</h2>
          <input
            type="text"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setUsername(e.target.value)}
            className="login-input"
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />
          <button onClick={login} className="login-button">
            Login
          </button>
          <p className="vendor-text">
            Are you a Vendor?{" "}
            <Link
              to="/pages/vendor-register/VendorRegister"
              className="vendor-link"
            >
              Register Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

