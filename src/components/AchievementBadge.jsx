import React from "react";

//Simple function, displays achievement badges - Chris

export default function AchievementBadge({ badge, earned }) {
  const { title, description, tier = "bronze" } = badge || {};
  const icon = earned ? "🏆" : "🔒";
  return (
    <div className={`badge ${tier}`}>
      <div className="icon">{icon}</div>
      <div className="title">{title}</div>
      <div className="desc">{description}</div>
      <div className="status">{earned ? "Earned" : "Locked"}</div>
    </div>
  );
}
