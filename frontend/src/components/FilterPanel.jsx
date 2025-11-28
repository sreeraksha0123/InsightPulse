import React from "react";

export default function FilterPanel({ filters, onChange, onApply }) {
  const handleChange = (e) => {
    onChange({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col md:flex-row gap-4 items-end md:items-center justify-between">
      <div className="flex flex-wrap gap-4">
        <div className="flex flex-col text-sm">
          <label className="text-slate-600 mb-1">Start Date</label>
          <input
            type="date"
            name="start_date"
            value={filters.start_date || ""}
            onChange={handleChange}
            className="border border-slate-300 rounded-md px-2 py-1 text-sm"
          />
        </div>
        <div className="flex flex-col text-sm">
          <label className="text-slate-600 mb-1">End Date</label>
          <input
            type="date"
            name="end_date"
            value={filters.end_date || ""}
            onChange={handleChange}
            className="border border-slate-300 rounded-md px-2 py-1 text-sm"
          />
        </div>
        <div className="flex flex-col text-sm">
          <label className="text-slate-600 mb-1">Segment</label>
          <input
            type="text"
            name="segment"
            placeholder="e.g. North"
            value={filters.segment || ""}
            onChange={handleChange}
            className="border border-slate-300 rounded-md px-2 py-1 text-sm"
          />
        </div>
      </div>
      <button
        onClick={onApply}
        className="bg-slate-900 text-slate-50 text-sm px-4 py-2 rounded-md hover:bg-slate-800"
      >
        Apply Filters
      </button>
    </div>
  );
}
