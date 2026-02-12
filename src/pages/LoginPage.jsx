import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  //Calls login from AuthContext and waits for email+password - Gav
  const handleLogin = async () => {
    setError(null);
    try {
      await login(email.trim(), password);
      navigate("/");
    } catch (err) {
      // or error message
      setError(err.message || "Login failed");
    }
  };

  //Calls signup from AuthContext and waits for email+password - Gav
  const handleSignup = async () => {
    setError(null);
    try {
      await signup(email.trim(), password);
      navigate("/");
    } catch (err) {
      // or error message
      setError(err.message || "Signup failed");
    }
  };

  return (
    <div style={{ maxWidth: 520, margin: "0 auto" }}>
      <div className="panel">
        <h2 style={{ marginBottom: 8 }}>Login / Signup</h2>
        {error && <p style={{ color: "#ffb4b4", marginBottom: 8 }}>{error}</p>}
        <div className="form">
          <input
            className="input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
            <button onClick={handleLogin} className="button-emerald">
              Login
            </button>
            <button onClick={handleSignup} className="button-ghost">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
