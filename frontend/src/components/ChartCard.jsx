import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ChartCard({ title, data, color = "#0f766e" }) {
  const formatted = data.map((d) => ({
    ...d,
    date: d.created_at.slice(0, 10),
  }));

  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col gap-2">
      <h3 className="font-semibold text-slate-800 text-sm md:text-base">
        {title}
      </h3>
      <div className="w-full h-56">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={formatted}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="date" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
