import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { BiMenu } from "react-icons/bi";
import "./FishingSpotWebsite.css"; // Import the CSS file

const FishingSpotWebsite: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setIsMenuOpen(false);
  };

  return (
    <div className="min-screen">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-container">
          <h1 className="logo">FishSpot</h1>
          <div className="menu-desktop">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/explore" className="nav-link">Explore Spots</Link>
            <Link to="/upload" className="nav-link">Upload Spot</Link>
            <Link to="/mySpots" className="nav-link">My Spots</Link>
            <Link to="/sharedSpots" className="nav-link">Shared Spots</Link>
            {isLoggedIn ? (
              <>
                <Link to="/profile" className="nav-link">
                  <FaUser className="icon" /> {username}
                </Link>
                <button onClick={handleLogout} className="nav-link">
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="nav-link">Login</Link>
            )}
          </div>
          <div className="menu-mobile">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <BiMenu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="content">
        {isMenuOpen && (
          <div className="menu-mobile-expanded">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="mobile-link">Home</Link>
            <Link to="/explore" onClick={() => setIsMenuOpen(false)} className="mobile-link">Explore Spots</Link>
            <Link to="/upload" onClick={() => setIsMenuOpen(false)} className="mobile-link">Upload Spot</Link>
            <Link to="/mySpots" onClick={() => setIsMenuOpen(false)} className="mobile-link">My Spots</Link>
            <Link to="/sharedSpots" onClick={() => setIsMenuOpen(false)} className="mobile-link">Shared Spots</Link>
            {isLoggedIn ? (
              <>
                <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="mobile-link">
                  <FaUser className="icon" /> {username}
                </Link>
                <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="mobile-link">
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" onClick={() => setIsMenuOpen(false)} className="mobile-link">Login</Link>
            )}
          </div>
        )}

        {/* Rest of your content goes here */}
        <div className="container">
          {/* Your content like Explore Spots or other components */}
        </div>
      </div>
    </div>
  );
};

export default FishingSpotWebsite;
