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
      .single();
    if (error) {
      return null;
    }
    return {
      xp: data.xp ?? 0,
      completed: data.completed ?? [],
      badges: data.badges ?? [],
    };
  } catch (err) {
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
      .select()
      .single();
    if (error) {
      // if error we set local storage instead
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
      .select()
      .single();
    if (error) {
      // If error we set local storage instead
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
  if (!userId) return null;
  // Try Supabase first
  const sb = await _sbGet(userId);
  if (sb !== null) return sb;
  // Fallback to local storage
  return await _lsGet(userId);
}

// Registres new user progress on DB - Gav
export async function createUserProgress(userId) {
  if (!userId) return null;
  const sb = await _sbCreate(userId);
  if (sb !== null) return sb;
  return await _lsSet(userId, { xp: 0, completed: [], badges: [] });
}

// Updates user progress on DB - Gav
export async function updateUserProgress(userId, xp, completed, badges) {
  if (!userId) return null;
  const sb = await _sbUpdate(userId, xp, completed, badges);
  if (sb !== null) return sb;
  return await _lsSet(userId, {
    xp: xp ?? 0,
    completed: completed ?? [],
    badges: badges ?? [],
  });
}
