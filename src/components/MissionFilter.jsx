import React from "react";
// Filter UI component that displays on MissionPage, useful for sorting, filtering - Chris
export default function MissionFilter({ categories = [], selected, onChange }) {
  return (
    <div
      style={{
        marginTop: 14,
        marginBottom: 14,
        display: "flex",
        gap: 8,
        flexWrap: "wrap",
      }}
    >
      <button
        onClick={() => onChange("All")}
        className={`button-ghost`}
        style={{
          background:
            selected === "All" ? "rgba(16,185,129,0.12)" : "transparent",
        }}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className="button-ghost"
          style={{
            background:
              selected === cat ? "rgba(16,185,129,0.12)" : "transparent",
          }}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
