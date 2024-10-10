import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import ExploreSpotsPage from "./components/ExploreSpot/ExploreSpotsPage";
import UploadSpotPage from "./components/UploadSpot/UploadSpotPage";
import MySpotsPage from "./components/MySpot/MySpotsPage";
import ProfilePage from "./components/Profile/ProfilePage";
import SharedSpotsPage from "./components/SharedSpot/SharedSpotsPage";
import LoginPage from "./components/Login/LoginPage";
import FishingSpotWebsite from "./components/FishSpotWebsite";
import RegisterPage from "./components/Register/RegisterPage";

const App: React.FC = () => {
  return (
    <Router>
      <FishingSpotWebsite />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/explore" element={<ExploreSpotsPage />} />
        <Route path="/upload" element={<UploadSpotPage />} />
        <Route path="/mySpots" element={<MySpotsPage />} />
        <Route path="/profile" element={<ProfilePage username="User" onLogout={() => {}} />} />
        <Route path="/sharedSpots" element={<SharedSpotsPage />} />
        <Route path="/login" element={<LoginPage onLogin={() => {}} />} />
        <Route path="/register" element={<RegisterPage onRegister={() => {}} />} />
      </Routes>
    </Router>
  );
};

export default App;
