import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext.jsx";
import {
  getUserProgress,
  createUserProgress,
  updateUserProgress,
} from "../services/userService.js";

const UserProgressContext = createContext();

export const BADGE_DEFINITIONS = [
  // Local Badge Storage - Gav
  {
    id: "level-5",
    title: "Rising Star",
    description: "Reach Level 5",
    type: "level",
    threshold: 5,
    tier: "bronze",
  },
  {
    id: "level-10",
    title: "Eco Enthusiast",
    description: "Reach Level 10",
    type: "level",
    threshold: 10,
    tier: "silver",
  },
  {
    id: "level-15",
    title: "Eco Champion",
    description: "Reach Level 15",
    type: "level",
    threshold: 15,
    tier: "gold",
  },
  {
    id: "marathoner-5",
    title: "Mission Taker",
    description: "Complete 5 missions",
    type: "completed_count",
    threshold: 5,
    tier: "bronze",
  },
  {
    id: "marathoner-20",
    title: "Committed Hero",
    description: "Complete 20 missions",
    type: "completed_count",
    threshold: 20,
    tier: "gold",
  },
];

export function UserProgressProvider({ children }) {
  //Default state of user
  const { user } = useAuth();

  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [completed, setCompleted] = useState([]);
  const [badges, setBadges] = useState([]);
  const [levelUp, setLevelUp] = useState(null);

  const xpForLevel = (lvl) => lvl * 100;

  // recalculate level when xp changes
  useEffect(() => {
    const newLevel = Math.floor(xp / 100) + 1;
    if (newLevel > level) {
      setLevel(newLevel);
      setLevelUp(newLevel);
    } else if (newLevel < level) {
      setLevel(newLevel);
    }
    awardBadgesForLevel(newLevel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [xp]);

  // load progress for user (from supabase or local fallback)
  useEffect(() => {
    let mounted = true;
    if (!user) {
      setXp(0);
      setLevel(1);
      setCompleted([]);
      setBadges([]);
      return;
    }

    (async () => {
      const data = await getUserProgress(user.id);
      if (!mounted) return;
      if (!data) {
        const created = await createUserProgress(user.id);
        setXp(created.xp ?? 0);
        setCompleted(created.completed ?? []);
        setBadges(created.badges ?? []);
        setLevel(Math.floor((created.xp ?? 0) / 100) + 1);
      } else {
        setXp(data.xp ?? 0);
        setCompleted(data.completed ?? []);
        setBadges(data.badges ?? []);
        setLevel(Math.floor((data.xp ?? 0) / 100) + 1);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [user]);

  const persist = async (nextXp, nextCompleted, nextBadges) => {
    if (!user) return;
    try {
      await updateUserProgress(user.id, nextXp, nextCompleted, nextBadges);
    } catch (err) {
      console.error("persist error", err);
    }
  };

  const awardBadge = async (badgeId) => {
    if (badges.includes(badgeId)) return false;
    const nextBadges = [...badges, badgeId];
    setBadges(nextBadges);
    await persist(xp, completed, nextBadges);
    return true;
  };

  const awardBadgesForLevel = (currentLevel) => {
    BADGE_DEFINITIONS.filter(
      (b) => b.type === "level" && currentLevel >= b.threshold
    ).forEach((b) => {
      if (!badges.includes(b.id)) awardBadge(b.id);
    });
  };

  const awardBadgesForCompletedCount = (completedArray) => {
    const count = (completedArray || []).length;
    BADGE_DEFINITIONS.filter(
      (b) => b.type === "completed_count" && count >= b.threshold
    ).forEach((b) => {
      if (!badges.includes(b.id)) awardBadge(b.id);
    });
  };

  const markMissionCompleted = async (missionId, missionPoints) => {
    // Updates Mission status and adds xp to user xp on the backend
    if (completed.includes(missionId)) return;
    const nextCompleted = [...completed, missionId];
    const nextXp = xp + missionPoints;

    setCompleted(nextCompleted);
    setXp(nextXp);

    awardBadgesForCompletedCount(nextCompleted);

    await persist(nextXp, nextCompleted, badges);
  };

  const grantBadge = async (badgeId) => {
    return awardBadge(badgeId);
  };

  return (
    <UserProgressContext.Provider
      value={{
        xp,
        setXp,
        level,
        completed,
        setCompleted,
        badges,
        setBadges,
        levelUp,
        setLevelUp,
        xpForLevel,
        markMissionCompleted,
        grantBadge,
        BADGE_DEFINITIONS,
      }}
    >
      {children}
    </UserProgressContext.Provider>
  );
}

export const useUserProgress = () => useContext(UserProgressContext);
