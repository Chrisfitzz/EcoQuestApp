import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavigationBar from "./components/NavigationBar.jsx";

import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import MissionsPage from "./pages/MissionsPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import AccountPage from "./pages/AccountPage.jsx";
// React Routers connect pages together
// NavigationBar is the top menu bar, contains links to different pages
export default function App() {
  return (
    <Router>
      <NavigationBar />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/missions" element={<MissionsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/account" element={<AccountPage />} />
        </Routes>
      </div>
    </Router>
  );
}
