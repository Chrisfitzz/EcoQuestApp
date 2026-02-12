import React from "react";
import { useAuth } from "../contexts/AuthContext.jsx";

export default function HomePage() {
  const { user, logout } = useAuth(); // Called to allow user to logout and display on homepage - Gav

  return (
    <div className="grid" style={{ gap: 18 }}>
      <div className="panel">
        <h1 style={{ fontSize: 22 }}>Welcome {user?.email || "Guest"}!</h1>
        <p className="small-muted" style={{ marginTop: 8 }}>
          EcoQuest helps you complete small missions to earn XP, level up, and
          unlock badges. Explore missions and get started!
        </p>
        {user && <div style={{ marginTop: 12 }}></div>}
      </div>
      <div className="grid grid-2">
        <div className="panel">
          <h3 style={{ marginBottom: 8 }}>Quick Tips</h3>
          <ul className="small-muted" style={{ listStyle: "disc inside" }}>
            <li>Complete missions to earn XP and level up.</li>
            <li>Collect badges by hitting thresholds.</li>
            <li>Weekly challenges give extra XP.</li>
          </ul>
        </div>
        <div className="panel">
          <h3 style={{ marginBottom: 8 }}>Get Started</h3>
          <p className="small-muted">
            Visit the Missions page to begin — or sign up / login if you want
            your progress saved.
          </p>
        </div>
      </div>
    </div>
  );
}
