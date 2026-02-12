import React, { useEffect, useState } from "react";
import MissionCard from "../components/MissionCard.jsx";
import XPBar from "../components/XPProgressBar.jsx";
import LevelUpModal from "../components/LevelUpModal.jsx";
import MissionFilter from "../components/MissionFilter.jsx";
import XPFloatingText from "../components/XPFloatingText.jsx";

import { getAllMissions } from "../services/missionService.js";
import { getWeeklyChallenges } from "../services/weeklyChallengeService.js";
import { updateUserProgress } from "../services/userService.js";

import { useUserProgress } from "../contexts/UserProgressContext.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";

export default function MissionsPage() {
  const [missions, setMissions] = useState([]);
  const [weekly, setWeekly] = useState([]);
  const [filter, setFilter] = useState("All");

  const [xpPopups, setXpPopups] = useState([]);

  const { xp, completed, setXp, setCompleted } = useUserProgress();
  const { user } = useAuth();

  useEffect(() => {
    let mounted = true;
    getAllMissions().then((m) => {
      if (!mounted) return;
      setMissions(m);
    });
    const { challenges } = getWeeklyChallenges();
    setWeekly(challenges);
    return () => {
      mounted = false;
    };
  }, []);

  const handleCompleteMission = async (mission) => {
    if (completed.includes(mission.id)) return;

    const newXp = xp + mission.points;
    const newCompleted = [...completed, mission.id];

    setXp(newXp);
    setCompleted(newCompleted);

    // XP Popup animation
    setXpPopups((prev) => [
      ...prev,
      { id: Date.now(), amount: mission.points },
    ]);

    if (user) {
      await updateUserProgress(user.id, newXp, newCompleted);
    }
  };

  const categories = [...new Set(missions.map((m) => m.category))];

  const filteredMissions =
    filter === "All" ? missions : missions.filter((m) => m.category === filter);

  return (
    <div style={{ position: "relative" }}>
      <XPBar />
      <LevelUpModal />

      {xpPopups.map((p) => (
        <XPFloatingText key={p.id} amount={p.amount} />
      ))}

      <MissionFilter
        categories={categories}
        selected={filter}
        onChange={setFilter}
      />

      <h2 style={{ marginTop: 8, marginBottom: 8 }}>Weekly Challenges</h2>
      <div className="grid grid-2" style={{ marginBottom: 16 }}>
        {weekly.map((mission) => (
          <MissionCard
            key={mission.id}
            mission={mission}
            completed={completed}
            onComplete={handleCompleteMission}
          />
        ))}
      </div>

      <h2 style={{ marginTop: 8, marginBottom: 8 }}>All Missions</h2>
      <div className="grid grid-2">
        {filteredMissions.map((mission) => (
          <MissionCard
            key={mission.id}
            mission={mission}
            completed={completed}
            onComplete={handleCompleteMission}
          />
        ))}
      </div>
    </div>
  );
}
