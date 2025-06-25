import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import UploadSpotPage from "./components/UploadSpot/UploadSpotPage";
import MySpotsPage from "./components/MySpot/MySpotsPage";
import ProfilePage from "./components/Profile/ProfilePage";
import LoginPage from "./components/Login/LoginPage";
import RegisterPage from "./components/Register/RegisterPage";
import EditPostPage from "./components/MySpot/EditPostPage";
import SinglePostPage from "./components/SinglePost/SinglePostPage";
import LandingPage from "./components/LandingPage/LandingPage";
import Layout from "./components/Layout";
import Discuss from "./components/Discuss/DiscussPage";
import EditProfilePage from "./components/EditProfilePage/EditProfilePage";
import ProtectedRoute from "./components/ProtectedRoute"; // Import the ProtectedRoute component

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    localStorage.getItem("loggedIn") === "true"
  );

  const handleSetIsLoggedIn = (value: boolean) => {
    setIsLoggedIn(value);
    localStorage.setItem("loggedIn", value.toString());
  };

  return (
    <Router>
      <Routes>
        <Route
          path="*"
          element={
            <Layout isLoggedIn={isLoggedIn} setIsLoggedIn={handleSetIsLoggedIn}>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route
                  path="/login"
                  element={
                    isLoggedIn ? (
                      <Navigate to="/home" replace />
                    ) : (
                      <LoginPage
                        isLoggedIn={isLoggedIn}
                        setIsLoggedIn={handleSetIsLoggedIn}
                      />
                    )
                  }
                />
                <Route path="/register" element={<RegisterPage />} />

                {/* Protected Routes */}
                <Route
                  path="/home"
                  element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                      <HomePage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/upload"
                  element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                      <UploadSpotPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/mySpots"
                  element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                      <MySpotsPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                      <ProfilePage
                        isLoggedIn={isLoggedIn}
                        setIsLoggedIn={handleSetIsLoggedIn}
                      />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/edit/:post_id"
                  element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                      <EditPostPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/posts/:post_id"
                  element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                      <SinglePostPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/discuss/:post_id"
                  element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                      <Discuss />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/editprofile"
                  element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                      <EditProfilePage />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;