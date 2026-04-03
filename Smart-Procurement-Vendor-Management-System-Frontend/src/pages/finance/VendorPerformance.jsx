import React, { useEffect, useState } from "react";
import API from "../../api/axios";
import BarChartComponent from "../../components/BarChartComponent";
import PieChartComponent from "../../components/PieChartComponent";

function VendorPerformance() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    API.get("/reports/vendor-performance")
      .then((res) => {
        setData(res.data);
      })
      .catch(() => {
        setError("Failed to load vendor performance data");
      });
  }, []);

  const downloadFile = async (type) => {
    try {
      const response = await API.get(`/reports/vendor-performance/${type}`, {
        responseType: "blob",
      });

      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });

      const filename = `vendor-performance-${type}.${type === "excel" ? "xlsx" : "pdf"}`;
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = filename;

      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download error:", err);
    }
  };

  const chartData = data.map((row) => ({
    vendorName: row[0],
    totalOrders: Number(row[1]) || 0,
    averageOrderValue: Number(row[2]) || 0,
    totalSpend: Number(row[3]) || 0,
  }));

  const pieData = chartData.map((item) => ({
    name: item.vendorName,
    value: item.totalSpend,
  }));

  return (
    <div style={{ padding: "30px", background: "#f8fafc", minHeight: "100vh" }}>
      <h2 style={{ marginBottom: "24px", color: "#0f172a" }}>Vendor Performance Report</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div
        style={{
          background: "#ffffff",
          borderRadius: "16px",
          padding: "20px",
          boxShadow: "0 8px 24px rgba(15, 23, 42, 0.08)",
          marginBottom: "32px",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th style={{ border: "1px solid #cbd5e1", padding: "12px", background: "#25921e", color: "#ffffff" }}>
                Vendor Name
              </th>
              <th style={{ border: "1px solid #cbd5e1", padding: "12px", background: "#25921e", color: "#ffffff" }}>
                Total Orders
              </th>
              <th style={{ border: "1px solid #cbd5e1", padding: "12px", background: "#25921e", color: "#ffffff" }}>
                Average Order Value
              </th>
              <th style={{ border: "1px solid #cbd5e1", padding: "12px", background: "#25921e", color: "#ffffff" }}>
                Total Spend
              </th>
            </tr>
          </thead>

          <tbody>
            {data.length > 0 ? (
              data.map((row, index) => (
                <tr key={index}>
                  <td style={{ border: "1px solid #cbd5e1", padding: "12px", textAlign: "center", color: "#111827" }}>
                    {row[0]}
                  </td>
                  <td style={{ border: "1px solid #cbd5e1", padding: "12px", textAlign: "center", color: "#111827" }}>
                    {row[1]}
                  </td>
                  <td style={{ border: "1px solid #cbd5e1", padding: "12px", textAlign: "center", color: "#111827" }}>
                    {row[2]}
                  </td>
                  <td style={{ border: "1px solid #cbd5e1", padding: "12px", textAlign: "center", color: "#111827" }}>
                    {row[3]}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: "center", padding: "12px" }}>
                  Loading...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {chartData.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 24, marginBottom: "32px", alignItems: "stretch" }}>
          <div style={{ flex: "1 1 460px", minWidth: 320 }}>
            <BarChartComponent
              data={chartData}
              xKey="vendorName"
              barKey="totalSpend"
              title="Total Spend by Vendor"
            />
          </div>

          <div style={{ flex: "1 1 460px", minWidth: 320 }}>
            <PieChartComponent
              data={pieData}
              dataKey="value"
              nameKey="name"
              title="Vendor Spend Distribution"
            />
          </div>
        </div>
      )}

      <div
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <button
          onClick={() => downloadFile("pdf")}
          style={{
            background: "#0891b2",
            color: "#ffffff",
            border: "none",
            borderRadius: "8px",
            padding: "12px 20px",
            cursor: "pointer",
          }}
        >
          Download PDF
        </button>
        <button
          onClick={() => downloadFile("excel")}
          style={{
            background: "#0891b2",
            color: "#ffffff",
            border: "none",
            borderRadius: "8px",
            padding: "12px 20px",
            cursor: "pointer",
          }}
        >
          Download Excel
        </button>
      </div>
    </div>
  );
}

export default VendorPerformance;
