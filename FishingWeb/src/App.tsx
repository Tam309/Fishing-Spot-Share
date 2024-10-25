import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import ExploreSpotsPage from "./components/ExploreSpot/ExploreSpotsPage";
import UploadSpotPage from "./components/UploadSpot/UploadSpotPage";
import MySpotsPage from "./components/MySpot/MySpotsPage";
import ProfilePage from "./components/Profile/ProfilePage";
import SharedSpotsPage from "./components/SharedSpot/SharedSpotsPage";
import LoginPage from "./components/Login/LoginPage";
import RegisterPage from "./components/Register/RegisterPage";
import EditPostPage from "./components/MySpot/EditPostPage";
import SinglePostPage from "./components/SinglePost/SinglePostPage";
import LandingPage from "./components/LandingPage/LandingPage";
import Layout from "./components/Layout";
import Discuss from "./components/Discuss/DiscussPage";
import EditProfilePage from "./components/EditProfilePage/EditProfilePage";

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(localStorage.getItem("loggedIn") === "true");

  const handleSetIsLoggedIn = (value: boolean) => {
    setIsLoggedIn(value);
    localStorage.setItem("loggedIn", value.toString());
  };

  return (
    <Router>
      {/* Wrap everything with Router */}
      <Routes>
        {/* Layout handles navigation bar conditionally based on the route */}
        <Route
          path="*"
          element={
            <Layout isLoggedIn={isLoggedIn} setIsLoggedIn={handleSetIsLoggedIn}>
              <Routes>
                <Route path="/editprofile" element={<EditProfilePage />} />
                <Route path="/" element={<LandingPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/explore" element={<ExploreSpotsPage />} />
                <Route path="/upload" element={<UploadSpotPage />} />
                <Route path="/mySpots" element={<MySpotsPage />} />
                <Route
                  path="/profile"
                  element={
                    <ProfilePage
                      isLoggedIn={isLoggedIn}
                      setIsLoggedIn={setIsLoggedIn}
                    />
                  }
                />
                <Route path="/sharedSpots" element={<SharedSpotsPage />} />
                <Route
                  path="/login"
                  element={
                    <LoginPage
                      isLoggedIn={isLoggedIn}
                      setIsLoggedIn={setIsLoggedIn}
                    />
                  }
                />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/edit/:post_id" element={<EditPostPage />} />
                <Route path="/posts/:post_id" element={<SinglePostPage />} />
                <Route path="/discuss/:post_id" element={<Discuss />}/>
                
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
