import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { UserProgressProvider } from "./contexts/UserProgressContext.jsx";
import { MissionsProvider } from "./contexts/MissionsContext.jsx";
import "./index.css";

//AuthProvider and UserProgressProvider
//maintains persistant user login state and user data.
//MissionsProvider manages mission-related data across the app.
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
