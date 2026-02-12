import React, { createContext, useContext, useEffect, useState } from "react";
import { getAllMissions } from "../services/missionService.js";

const MissionsContext = createContext();

export function MissionsProvider({ children }) {
  // Handles persistant setting and fetching of completion status of Missions - Gav
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getAllMissions().then((data) => {
      if (!mounted) return;
      setMissions(data);
      setLoading(false);
    });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <MissionsContext.Provider value={{ missions, loading }}>
      {children}
    </MissionsContext.Provider>
  );
}

export function useMissions() {
  return useContext(MissionsContext);
}
