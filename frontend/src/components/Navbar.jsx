import React from "react";

export default function Navbar({ user, onSeedDemo }) {
  return (
    <header className="bg-slate-900 text-slate-100 px-4 md:px-8 py-3 flex items-center justify-between shadow">
      <div className="flex items-center gap-2">
        <span className="text-2xl">📊</span>
        <div>
          <h1 className="font-semibold text-lg">InsightPulse</h1>
          <p className="text-xs text-slate-300">
            Business Analytics Dashboard
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        {user && (
          <span className="text-sm text-slate-200">
            Signed in as <strong>{user.name}</strong>
          </span>
        )}
        <button
          onClick={onSeedDemo}
          className="text-xs md:text-sm bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-1.5 rounded-md"
        >
          Seed Demo Data
        </button>
      </div>
    </header>
  );
}
