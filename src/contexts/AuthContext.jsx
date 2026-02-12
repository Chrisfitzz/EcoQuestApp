import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../config/supabase.js";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function init() {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (!mounted) return;
        setUser(
          session?.user
            ? { id: session.user.id, email: session.user.email }
            : null
        );
        setLoading(false);
      } catch (err) {
        setUser(null);
        setLoading(false);
      }
    }

    init();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(
          session?.user
            ? { id: session.user.id, email: session.user.email }
            : null
        );
        setLoading(false);
      }
    );

    return () => {
      mounted = false;
      listener?.subscription?.unsubscribe?.();
    };
  }, []);

  const login = async (email, password) => {
    // Login function, accepts email and password - Gav
    const res = await supabase.auth.signInWithPassword({ email, password });
    if (res.error) throw res.error;
    const u = res.data?.user;
    if (u) setUser({ id: u.id, email: u.email });
  };

  const signup = async (email, password) => {
    // Signup function, accepts email and password - Gav
    const res = await supabase.auth.signUp({ email, password });
    if (res.error) throw res.error;
    const u = res.data?.user;
    if (u) setUser({ id: u.id, email: u.email });
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Make sure this is exported
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
