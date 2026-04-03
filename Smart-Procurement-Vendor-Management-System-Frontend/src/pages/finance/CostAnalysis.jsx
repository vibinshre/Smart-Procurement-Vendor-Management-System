
import React, { useEffect, useState } from "react";
import API from "../../api/axios";
import PieChartComponent from "../../components/PieChartComponent";

function CostAnalysis() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    API.get("/reports/cost-analysis")
      .then((res) => {
        setData(res.data);
      })
      .catch(() => {
        setError("Failed to load report data");
      });
  }, []);

  const downloadFile = async (type) => {
    try {
      const response = await API.get(`/reports/cost-analysis/${type}`, {
        responseType: "blob",
      });

      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });

      const filename = `cost-analysis-${type}.${type === "excel" ? "xlsx" : "pdf"}`;
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

  // Prepare pie chart data
  const pieData = [
    { name: "Total Spend", value: data?.totalSpend ?? 0 },
    { name: "Total Orders", value: data?.totalOrders ?? 0 },
    { name: "Total Vendors", value: data?.totalVendors ?? 0 },
    { name: "Total Invoices", value: data?.totalInvoices ?? 0 },
  ];

  return (
    <div style={{ padding: "30px" }}>
      <h2>Cost Analysis Report</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ display: "flex", flexWrap: "wrap", gap: 32 }}>
        <div style={{ flex: 1, minWidth: 320 }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "20px",
            }}
          >
            <thead>
              <tr>
                <th style={{ border: "1px solid #cbd5e1", padding: "10px", background: "#2f8f49" }}>
                  Total Spend
                </th>
                <th style={{ border: "1px solid #cbd5e1", padding: "10px", background: "#2f8f49" }}>
                  Total Orders
                </th>
                <th style={{ border: "1px solid #cbd5e1", padding: "10px", background: "#2f8f49" }}>
                  Total Vendors
                </th>
                <th style={{ border: "1px solid #cbd5e1", padding: "10px", background: "#2f8f49" }}>
                  Total Invoices
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "center", color: "#111827" }}>
                  {data?.totalSpend ?? "Loading..."}
                </td>
                <td style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "center", color: "#111827" }}>
                  {data?.totalOrders ?? "Loading..."}
                </td>
                <td style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "center", color: "#111827" }}>
                  {data?.totalVendors ?? "Loading..."}
                </td>
                <td style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "center", color: "#111827" }}>
                  {data?.totalInvoices ?? "Loading..."}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div style={{ flex: 1, minWidth: 320 }}>
          <PieChartComponent
            data={pieData}
            dataKey="value"
            nameKey="name"
            title="Cost Analysis Distribution"
          />
        </div>
      </div>

      <div
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <button onClick={() => downloadFile("pdf")}>Download PDF</button>
        <button onClick={() => downloadFile("excel")}>Download Excel</button>
      </div>
    </div>
  );
}

export default CostAnalysis;
