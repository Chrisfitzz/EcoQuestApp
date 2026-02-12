import React from "react";
// Mission Display componenet, useful for displaying scalable mission array. - Chris
export default function MissionCard({ mission, completed = [], onComplete }) {
  const isCompleted = completed.includes(mission.id);

  return (
    <div className="mission-card" style={{ opacity: isCompleted ? 0.6 : 1 }}>
      <h2>{mission.title}</h2>
      <p className="small-muted">Category: {mission.category}</p>
      <p className="small-muted">Points: {mission.points}</p>
      <p style={{ marginTop: 8, marginBottom: 12 }}>{mission.description}</p>
      <div className="meta">
        <button
          onClick={() => onComplete(mission)}
          disabled={isCompleted}
          className="button-emerald"
          style={
            isCompleted
              ? {
                  background: "#454545",
                  boxShadow: "none",
                  cursor: "not-allowed",
                }
              : {}
          }
        >
          {isCompleted ? "Completed" : "Complete Mission"}
        </button>
        <div
          style={{ marginLeft: "auto", color: "var(--muted)", fontWeight: 700 }}
        >
          {mission.emoji || "🌿"}
        </div>
      </div>
    </div>
  );
}
