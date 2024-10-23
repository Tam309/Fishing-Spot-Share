import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { BiMenu } from "react-icons/bi";
import styles from "./FishingSpotWebsite.module.css"; // Import the CSS module

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
    <div className={styles.minScreen}>
      {/* Navigation Bar */}
      <nav className={styles.navbar}>
        <div className={styles.navbarContainer}>
          <h1 className={styles.logo}>FishSpot</h1>
          <div className={styles.menuDesktop}>
            <Link to="/" className={styles.navLink}>Home</Link>
            <Link to="/explore" className={styles.navLink}>Explore Spots</Link>
            <Link to="/upload" className={styles.navLink}>Upload Spot</Link>
            <Link to="/mySpots" className={styles.navLink}>My Spots</Link>
            <Link to="/sharedSpots" className={styles.navLink}>Shared Spots</Link>
            {isLoggedIn ? (
              <>
                <Link to="/profile" className={styles.navLink}>
                  <FaUser className={styles.icon} /> {username}
                </Link>
                <button onClick={handleLogout} className={styles.navLink}>
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className={styles.navLink}>Login</Link>
            )}
          </div>
          <div className={styles.menuMobile}>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <BiMenu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className={styles.content}>
        {isMenuOpen && (
          <div className={styles.menuMobileExpanded}>
            <Link to="/" onClick={() => setIsMenuOpen(false)} className={styles.mobileLink}>Home</Link>
            <Link to="/explore" onClick={() => setIsMenuOpen(false)} className={styles.mobileLink}>Explore Spots</Link>
            <Link to="/upload" onClick={() => setIsMenuOpen(false)} className={styles.mobileLink}>Upload Spot</Link>
            <Link to="/mySpots" onClick={() => setIsMenuOpen(false)} className={styles.mobileLink}>My Spots</Link>
            <Link to="/sharedSpots" onClick={() => setIsMenuOpen(false)} className={styles.mobileLink}>Shared Spots</Link>
            {isLoggedIn ? (
              <>
                <Link to="/profile" onClick={() => setIsMenuOpen(false)} className={styles.mobileLink}>
                  <FaUser className={styles.icon} /> {username}
                </Link>
                <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className={styles.mobileLink}>
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" onClick={() => setIsMenuOpen(false)} className={styles.mobileLink}>Login</Link>
            )}
          </div>
        )}

        {/* Rest of your content goes here */}
        <div className={styles.container}>
          {/* Your content like Explore Spots or other components */}
        </div>
      </div>
    </div>
  );
};

export default FishingSpotWebsite;
