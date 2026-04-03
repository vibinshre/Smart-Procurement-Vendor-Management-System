import { useState } from "react";
import axios from "../../api/axios";
import { useNavigate, Link } from "react-router-dom";

export default function VendorRegister() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    vendorName: "",
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    gstNumber: "",
    address: "",
    password: "",
  });

  const registerVendor = async () => {
    try {
      await axios.post("/vendors", form);
      alert("Vendor Registered Successfully. Wait for approval.");
      navigate("/login");
    } catch (error) {
      alert("Registration Failed");
    }
  };

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const inputStyle = {
    width: "100%",
    padding: "15px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "16px",
    boxSizing: "border-box",
    background: "#f8fbff",
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #74b820, #2a5298)",
        padding: "24px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          maxWidth: "1100px",
          minHeight: "620px",
          backgroundColor: "#ffffff",
          borderRadius: "15px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            flex: 1,
            minWidth: "320px",
            padding: "50px",
            background: "linear-gradient(160deg, #f8fbff, #eef5ff)",
            color: "#173053",
            borderRight: "1px solid #e2e8f0",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            boxSizing: "border-box",
          }}
        >
          <p
            style={{
              fontSize: "14px",
              fontWeight: "bold",
              letterSpacing: "1px",
              margin: "0 0 10px",
              color: "#2f5f94",
            }}
          >
            SMART PROCUREMENT
          </p>
          <h1
            style={{
              fontSize: "36px",
              fontWeight: "bold",
              margin: "0 0 16px",
              lineHeight: 1.15,
              color: "#173053",
            }}
          >
            Vendor Registration Portal
          </h1>
          <p
            style={{
              margin: 0,
              fontSize: "16px",
              lineHeight: 1.6,
              color: "#385678",
            }}
          >
            Register your business to manage orders, track approvals, and handle
            procurement workflows from one place.
          </p>
        </div>

        <div
          style={{
            flex: 1,
            minWidth: "320px",
            padding: "50px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            boxSizing: "border-box",
          }}
        >
          <h2
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              marginBottom: "24px",
              color: "#333",
            }}
          >
            Vendor Registration
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
            }}
          >
            <input
              style={inputStyle}
              placeholder="Vendor Name"
              value={form.vendorName}
              onChange={handleChange("vendorName")}
            />

            <input
              style={inputStyle}
              placeholder="Company Name"
              value={form.companyName}
              onChange={handleChange("companyName")}
            />

            <input
              style={inputStyle}
              placeholder="Contact Person"
              value={form.contactPerson}
              onChange={handleChange("contactPerson")}
            />

            <input
              style={inputStyle}
              placeholder="Email"
              value={form.email}
              onChange={handleChange("email")}
            />

            <input
              style={inputStyle}
              placeholder="Phone"
              value={form.phone}
              onChange={handleChange("phone")}
            />

            <input
              style={inputStyle}
              placeholder="GST Number"
              value={form.gstNumber}
              onChange={handleChange("gstNumber")}
            />

            <input
              style={{ ...inputStyle, gridColumn: "1 / -1" }}
              placeholder="Address"
              value={form.address}
              onChange={handleChange("address")}
            />

            <input
              style={{ ...inputStyle, gridColumn: "1 / -1" }}
              placeholder="Password"
              type="password"
              value={form.password}
              onChange={handleChange("password")}
            />
          </div>

          <button
            onClick={registerVendor}
            style={{
              width: "100%",
              marginTop: "20px",
              padding: "15px",
              backgroundColor: "#38761d",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Register
          </button>

          <p
            style={{
              marginTop: "25px",
              fontSize: "14px",
              textAlign: "center",
            }}
          >
            Already registered?{" "}
            <Link
              to="/login"
              style={{
                color: "#38761d",
                fontWeight: "bold",
                textDecoration: "none",
              }}
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
