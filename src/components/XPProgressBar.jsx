import React, { useEffect, useRef } from "react";
import { useUserProgress } from "../contexts/UserProgressContext.jsx";

export default function XPBar() {
  //Handles level up system via local xp algorithm - Chris
  const { xp, level, xpForLevel } = useUserProgress();
  const currentLevelXp = (level - 1) * 100;
  const nextLevelXp = xpForLevel(level);
  const progress = Math.max(
    0,
    Math.min(
      100,
      ((xp - currentLevelXp) / (nextLevelXp - currentLevelXp)) * 100
    )
  );
  const fillRef = useRef();

  useEffect(() => {
    if (fillRef.current) {
      fillRef.current.style.width = `${progress}%`;
    }
  }, [progress]);

  return (
    <div className="panel xp-bar" style={{ marginBottom: 14 }}>
      <div className="label">Level {level}</div>
      <div className="xp-track">
        <div
          ref={fillRef}
          className="xp-fill"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="xp-text">
        {xp - currentLevelXp} / {nextLevelXp - currentLevelXp} XP
      </div>
    </div>
  );
}
