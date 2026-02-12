import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.js";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { UserProgressProvider } from "./contexts/UserProgressContext.jsx";
import { MissionsProvider } from "./contexts/MissionsContext.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <UserProgressProvider>
        <MissionsProvider>
          <App />
        </MissionsProvider>
      </UserProgressProvider>
    </AuthProvider>
  </React.StrictMode>
);
