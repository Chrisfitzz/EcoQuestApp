import React from "react";
import AchievementBadge from "./AchievementBadge.jsx";
import { useUserProgress } from "../contexts/UserProgressContext.jsx";

// fetches badges from backend thru useUserProgressContext.jsx and then displays them using achievementBagde - Chris
export default function AchievementsPanel() {
  const { badges: earnedBadgeIds, BADGE_DEFINITIONS } = useUserProgress();

  return (
    <div className="panel">
      <h3 style={{ fontSize: 18, marginBottom: 10 }}>Achievements</h3>
      <div className="achievements-grid">
        {BADGE_DEFINITIONS.map((b) => (
          <AchievementBadge
            key={b.id}
            badge={b}
            earned={earnedBadgeIds.includes(b.id)}
          />
        ))}
      </div>
    </div>
  );
}
