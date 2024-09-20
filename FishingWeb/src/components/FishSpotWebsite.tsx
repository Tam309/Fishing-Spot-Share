// src/components/FishingSpotWebsite.tsx
import React, { useState } from "react";
import { FaSearch, FaUpload, FaUser, FaMapMarkerAlt, FaFish, FaComments } from "react-icons/fa";
import { BiMenu } from "react-icons/bi";
import HomePage from "./HomePage";
import ExploreSpotsPage from "./ExploreSpotsPage";
import UploadSpotPage from "./UploadSpotPage";
import MySpotsPage from "./MySpotsPage";
import ProfilePage from "./ProfilePage";
import SharedSpotsPage from "./SharedSpotsPage";
import LoginPage from "./LoginPage";

const FishingSpotWebsite: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>("home");
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");

  const handleLogin = (user: string) => {
    setIsLoggedIn(true);
    setUsername(user);
    setCurrentPage("profile");
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setCurrentPage("home");
    setIsMenuOpen(false);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage />;
      case "explore":
        return <ExploreSpotsPage />;
      case "upload":
        return <UploadSpotPage />;
      case "mySpots":
        return <MySpotsPage />;
      case "profile":
        return <ProfilePage username={username} onLogout={handleLogout} />;
      case "sharedSpots":
        return <SharedSpotsPage />;
      case "login":
        return <LoginPage onLogin={handleLogin} />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Bar */}
      <nav className="bg-blue-600 p-4 text-white">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">FishSpot</h1>
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4">
            <button onClick={() => setCurrentPage("home")} className="hover:text-blue-200">
              Home
            </button>
            <button onClick={() => setCurrentPage("explore")} className="hover:text-blue-200">
              Explore Spots
            </button>
            <button onClick={() => setCurrentPage("upload")} className="hover:text-blue-200">
              Upload Spot
            </button>
            <button onClick={() => setCurrentPage("mySpots")} className="hover:text-blue-200">
              My Spots
            </button>
            <button onClick={() => setCurrentPage("sharedSpots")} className="hover:text-blue-200">
              Shared Spots
            </button>
            {isLoggedIn ? (
              <>
                <button onClick={() => setCurrentPage("profile")} className="hover:text-blue-200 flex items-center">
                  <FaUser className="mr-1" /> {username}
                </button>
                <button onClick={handleLogout} className="hover:text-blue-200">
                  Logout
                </button>
              </>
            ) : (
              <button onClick={() => setCurrentPage("login")} className="hover:text-blue-200">
                Login
              </button>
            )}
          </div>
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <BiMenu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-500 p-4">
          <button
            onClick={() => { setCurrentPage("home"); setIsMenuOpen(false); }}
            className="block w-full text-left py-2 text-white hover:bg-blue-600"
          >
            Home
          </button>
          <button
            onClick={() => { setCurrentPage("explore"); setIsMenuOpen(false); }}
            className="block w-full text-left py-2 text-white hover:bg-blue-600"
          >
            Explore Spots
          </button>
          <button
            onClick={() => { setCurrentPage("upload"); setIsMenuOpen(false); }}
            className="block w-full text-left py-2 text-white hover:bg-blue-600"
          >
            Upload Spot
          </button>
          <button
            onClick={() => { setCurrentPage("mySpots"); setIsMenuOpen(false); }}
            className="block w-full text-left py-2 text-white hover:bg-blue-600"
          >
            My Spots
          </button>
          <button
            onClick={() => { setCurrentPage("sharedSpots"); setIsMenuOpen(false); }}
            className="block w-full text-left py-2 text-white hover:bg-blue-600"
          >
            Shared Spots
          </button>
          {isLoggedIn ? (
            <>
              <button
                onClick={() => { setCurrentPage("profile"); setIsMenuOpen(false); }}
                className="block w-full text-left py-2 text-white hover:bg-blue-600 flex items-center"
              >
                <FaUser className="mr-1" /> {username}
              </button>
              <button
                onClick={() => { handleLogout(); }}
                className="block w-full text-left py-2 text-white hover:bg-blue-600"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => { setCurrentPage("login"); setIsMenuOpen(false); }}
              className="block w-full text-left py-2 text-white hover:bg-blue-600"
            >
              Login
            </button>
          )}
        </div>
      )}

      {/* Render Current Page */}
      {renderPage()}
    </div>
  );
};

export default FishingSpotWebsite;
