// BarChartComponent.jsx
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";

const BAR_COLORS = [
  "#2563eb",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
  "#f97316",
  "#84cc16",
];

export default function BarChartComponent({ data, xKey, barKey, title }) {
  return (
    <div
      style={{
        width: "100%",
        minHeight: 420,
        background: "#ffffff",
        borderRadius: "16px",
        padding: "20px 16px 8px",
        boxShadow: "0 8px 24px rgba(15, 23, 42, 0.08)",
      }}
    >
      <h4 style={{ textAlign: "center", margin: "0 0 16px", color: "#0f172a" }}>{title}</h4>

      <div style={{ width: "100%", height: 340 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 40 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
            <XAxis
              dataKey={xKey}
              angle={data.length > 4 ? -20 : 0}
              textAnchor={data.length > 4 ? "end" : "middle"}
              height={data.length > 4 ? 70 : 40}
              tick={{ fill: "#334155", fontSize: 12 }}
            />
            <YAxis tick={{ fill: "#334155", fontSize: 12 }} />
            <Tooltip />
            <Legend verticalAlign="top" />
            <Bar dataKey={barKey} radius={[8, 8, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={BAR_COLORS[index % BAR_COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
