import { supabase } from "../config/supabase.js";

/*
Local Storage Functions:
_lsGet - Get user progress from Local Storage
_lsSet - Set user progress in Local Storage

Supabase Functions:
_sbGet - Get user progress from Supabase
_sbCreate - Create new user progress in Supabase
_sbUpdate - Update user progress in Supabase

Public Functions:
getUserProgress - Public function to get user progress
createUserProgress - Public function to create user progress
updateUserProgress - Public function to update user progress
*/
const PREFIX = "ecoquest_progress:";

function lsKey(userId) {
  return PREFIX + userId;
}
// Helper function to validate if a string is a valid UUID
function isUuid(v) {
  return typeof v === "string" &&
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(v);
}


// Local storage helpers act as fallback incase DB or API doesnt work
async function _lsGet(userId) {
  try {
    const raw = localStorage.getItem(lsKey(userId));
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
async function _lsSet(userId, payload) {
  try {
    localStorage.setItem(lsKey(userId), JSON.stringify(payload));
    return payload;
  } catch {
    return null;
  }
}

// Supabase helpers for user progress data - Gav
async function _sbGet(userId) {
  try {
    const { data, error } = await supabase
        .from("user_progress")
        .select("*")
        .eq("user_id", userId)
        .maybeSingle(); // ✅ allows 0 rows

    if (error) {
      console.warn("[user_progress] supabase error:", error);
      return null;
    }

    // If no row exists yet, create one
    if (!data) {
      return await _sbCreate(userId);
    }

    return {
      xp: data.xp ?? 0,
      completed: data.completed ?? [],
      badges: data.badges ?? [],
    };
  } catch {
    return null;
  }
}


// Function is called when a new user is created - Gav
async function _sbCreate(userId) {
  try {
    const payload = { user_id: userId, xp: 0, completed: [], badges: [] };
    const { data, error } = await supabase
        .from("user_progress")
        .insert(payload)
        .select(); // returns an array

    if (error) {
      console.warn("[user_progress] create error:", error);
      return await _lsSet(userId, { xp: 0, completed: [], badges: [] });
    }

    const row = Array.isArray(data) ? data[0] : data;

    return {
      xp: row?.xp ?? 0,
      completed: row?.completed ?? [],
      badges: row?.badges ?? [],
    };

    if (error) {
      // if error we set local storage instead
      console.warn("[user_progress] supabase error:", error);
      return await _lsSet(userId, { xp: 0, completed: [], badges: [] });
    }
    return {
      xp: data.xp ?? 0,
      completed: data.completed ?? [],
      badges: data.badges ?? [],
    };
  } catch {
    return await _lsSet(userId, { xp: 0, completed: [], badges: [] });
  }
}

// Updates user progress in Supabase - Gav
async function _sbUpdate(userId, xp, completed, badges) {
  try {
    const { data, error } = await supabase
        .from("user_progress")
        .upsert(
            {
              user_id: userId,
              xp: xp ?? 0,
              completed: completed ?? [],
              badges: badges ?? [],
            },
            { onConflict: "user_id" }
        )
        .select(); // array

    if (error) {
      console.warn("[user_progress] update error:", error);
      return await _lsSet(userId, {
        xp: xp ?? 0,
        completed: completed ?? [],
        badges: badges ?? [],
      });
    }

    const row = Array.isArray(data) ? data[0] : data;

    return {
      xp: row?.xp ?? 0,
      completed: row?.completed ?? [],
      badges: row?.badges ?? [],
    };

    if (error) {
      // If error we set local storage instead
      console.warn("[user_progress] supabase error:", error);

      return await _lsSet(userId, {
        xp: xp ?? 0,
        completed: completed ?? [],
        badges: badges ?? [],
      });
    }
    return {
      xp: data.xp ?? 0,
      completed: data.completed ?? [],
      badges: data.badges ?? [],
    };
  } catch {
    return await _lsSet(userId, {
      xp: xp ?? 0,
      completed: completed ?? [],
      badges: badges ?? [],
    });
  }
}

// The public functions below are what other files will call to interact with user progress data
// Public API - this is what most files will call when refreshing or loading a page - Gav
export async function getUserProgress(userId) {
  if (!isUuid(userId)) return null;      //  prevents bad calls
  const sb = await _sbGet(userId);
  if (sb !== null) return sb;
  return await _lsGet(userId);
}

// Registres new user progress on DB - Gav
export async function createUserProgress(userId) {
  if (!isUuid(userId)) return null;      // prevents bad calls
  const sb = await _sbCreate(userId);
  if (sb !== null) return sb;
  return await _lsSet(userId, { xp: 0, completed: [], badges: [] });
}

// Updates user progress on DB - Gav
export async function updateUserProgress(userId, xp, completed, badges) {
  if (!isUuid(userId)) return null;      //  prevents bad calls
  const sb = await _sbUpdate(userId, xp, completed, badges);
  if (sb !== null) return sb;
  return await _lsSet(userId, { xp: xp ?? 0, completed: completed ?? [], badges: badges ?? [] });
}






