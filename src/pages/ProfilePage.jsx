import React from "react";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useUserProgress } from "../contexts/UserProgressContext.jsx";
import AchievementsPanel from "../components/AchievementsPanel.jsx";
import XPBar from "../components/XPProgressBar.jsx";

export default function ProfilePage() {
  const { user } = useAuth(); // Calls useAuth and useUserProgress for persistance - Chris
  const { xp, level, completed, badges } = useUserProgress();

  if (!user) return <p className="panel">Please log in to see your profile.</p>;

  return (
    <div className="grid" style={{ gap: 18 }}>
      <div className="panel">
        <h1 style={{ fontSize: 22 }}>{user.email}</h1>
        <p className="small-muted">User ID: {user.id}</p>
      </div>

      <div className="grid grid-2">
        <div className="panel">
          <h3 style={{ marginBottom: 8 }}>Progress</h3>
          <XPBar />
          <div style={{ marginTop: 12, color: "var(--muted)" }}>
            <div>
              Level: <strong style={{ color: "#fff" }}>{level}</strong>
            </div>
            <div>
              XP: <strong style={{ color: "#fff" }}>{xp}</strong>
            </div>
            <div>
              Missions completed:{" "}
              <strong style={{ color: "#fff" }}>{completed.length}</strong>
            </div>
            <div>
              Badges earned:{" "}
              <strong style={{ color: "#fff" }}>{badges.length}</strong>
            </div>
          </div>
        </div>

        <div className="panel">
          <h3 style={{ marginBottom: 8 }}>Your Badges</h3>
          <AchievementsPanel />
        </div>
      </div>
    </div>
  );
}
