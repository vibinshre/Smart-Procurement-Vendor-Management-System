// PieChartComponent.jsx
import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = [
  "#2563eb",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
  "#f97316",
  "#84cc16",
];

export default function PieChartComponent({ data, dataKey, nameKey, title }) {
  return (
    <div
      style={{
        width: "100%",
        minHeight: 420,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "#ffffff",
        borderRadius: "16px",
        padding: "20px 16px 8px",
        boxShadow: "0 8px 24px rgba(15, 23, 42, 0.08)",
      }}
    >
      <h4 style={{ textAlign: "center", margin: "0 0 16px", color: "#0f172a" }}>{title}</h4>

      <div style={{ width: "100%", height: 340 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart margin={{ top: 10, right: 20, left: 20, bottom: 70 }}>
            <Pie
              data={data}
              dataKey={dataKey}
              nameKey={nameKey}
              cx="50%"
              cy="42%"
              outerRadius={95}
              innerRadius={35}
              paddingAngle={3}
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend
              verticalAlign="bottom"
              align="center"
              iconType="circle"
              wrapperStyle={{ paddingTop: "16px" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
