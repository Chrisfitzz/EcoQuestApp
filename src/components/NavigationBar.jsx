import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";

export default function NavigationBar() {
  //Called on every page since itse useful for navigation - Chris / Gav
  const { user, logout } = useAuth(); // UseAuth called to provide logout functionality via navbar
  const nav = useNavigate();

  const doLogout = async () => {
    // Has logout button that also redirects to login page
    await logout();
    nav("/");
  };

  return (
    <nav>
      <div className="brand">EcoQuest</div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/missions">Missions</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/account">Account</Link>
        {user ? (
          <button
            onClick={doLogout}
            className="btn"
            style={{ background: "#c0392b", color: "#fff" }}
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="btn"
            style={{
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.03)",
              padding: "8px 12px",
              borderRadius: 8,
            }}
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
