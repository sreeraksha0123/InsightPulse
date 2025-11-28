import React, { useEffect, useState } from "react";
import { fetchMetrics } from "../services/api.js";
import FilterPanel from "./FilterPanel.jsx";
import ChartCard from "./ChartCard.jsx";

export default function Dashboard({ token }) {
  const [filters, setFilters] = useState({});
  const [metrics, setMetrics] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadMetrics = async () => {
    try {
      setLoading(true);
      const data = await fetchMetrics(token, filters);
      setMetrics(data);
    } catch (err) {
      console.error("Failed to load metrics:", err);
      alert("Failed to load metrics. Check backend logs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMetrics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const groupedByMetric = metrics.reduce((acc, m) => {
    acc[m.metric_name] = acc[m.metric_name] || [];
    acc[m.metric_name].push(m);
    return acc;
  }, {});

  return (
    <div className="flex flex-col gap-6">
      <FilterPanel
        filters={filters}
        onChange={setFilters}
        onApply={loadMetrics}
      />

      {loading ? (
        <div className="text-center text-slate-600 mt-8">
          Loading metrics...
        </div>
      ) : metrics.length === 0 ? (
        <div className="text-center text-slate-600 mt-8">
          No metrics available. Click "Seed Demo Data" in the top right to populate sample data.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {Object.entries(groupedByMetric).map(([name, rows]) => (
            <ChartCard key={name} title={name} data={rows} />
          ))}
        </div>
      )}
    </div>
  );
}
