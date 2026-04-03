import React from "react";
import { useNavigate } from "react-router-dom";

function ReportAnalytics({ basePath = "/finance" }) {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Cost Analysis",
      description: "View procurement cost summary",
      icon: "Cost",
      path: `${basePath}/reports/cost-analysis`,
    },
    {
      title: "Spend Analysis",
      description: "Monthly procurement spending",
      icon: "Spend",
      path: `${basePath}/reports/spend-analysis`,
    },
    {
      title: "Vendor Performance",
      description: "Vendor order statistics",
      icon: "Vendor",
      path: `${basePath}/reports/vendor-performance`,
    },
  ];

  return (
    <div style={{ padding: "10px" }}>
      <h2 style={{ marginBottom: "20px" }}>Reports</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px",
        }}
      >
        {cards.map((card) => (
          <button
            key={card.title}
            onClick={() => navigate(card.path)}
            style={{
              border: "1px solid #cbd5e1",
              borderRadius: "10px",
              padding: "16px",
              textAlign: "left",
              background: "#ffffff",
              cursor: "pointer",
            }}
          >
            <div style={{ fontSize: "14px", color: "#334155", marginBottom: "10px" }}>{card.icon}</div>
            <div style={{ fontSize: "18px", fontWeight: "600", color: "#0f172a" }}>{card.title}</div>
            <div style={{ marginTop: "8px", fontSize: "14px", color: "#475569" }}>{card.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default ReportAnalytics;
