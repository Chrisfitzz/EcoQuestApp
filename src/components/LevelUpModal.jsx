import React from "react";
import { useUserProgress } from "../contexts/UserProgressContext.jsx";

// Needed to display level up and to update user XP on the backend - Chris.
export default function LevelUpModal() {
  const { levelUp, setLevelUp } = useUserProgress();

  if (!levelUp) return null;

  return (
    <div className="modal-bg">
      <div className="modal">
        <h1 style={{ fontSize: 28, color: "#aaf7d1", marginBottom: 8 }}>
          🎉 Level Up!
        </h1>
        <p style={{ fontSize: 18 }}>You reached Level {levelUp}!</p>
        <div style={{ marginTop: 18 }}>
          <button
            onClick={() => setLevelUp(null)}
            className="button-emerald"
            style={{ padding: "10px 20px", borderRadius: 10 }}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
