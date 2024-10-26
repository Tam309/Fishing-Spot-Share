import React from "react";
import { Link } from "react-router-dom";
import { FaFish, FaMapMarkerAlt, FaUserFriends } from "react-icons/fa";
import styles from "./LandingPage.module.css"; // CSS Module

const LandingPage: React.FC = () => {
  return (
    <div className={styles.landingPage}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Find Your Perfect Fishing Spot</h1>
          <p className={styles.heroSubtitle}>
            Discover the best places to fish, share your experiences, and become part of a vibrant angler community.
          </p>
          <Link to="/login" className={styles.ctaButton}>
            Explore Now
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className={styles.aboutSection}>
        <div className={styles.aboutContent}>
          <h2>What We Offer</h2>
          <p>
            FishSpot helps you explore and share the most amazing fishing spots across the country. Whether you're an experienced angler or just starting, you'll find the perfect location to enjoy your fishing experience.
          </p>
        </div>
        <div className={styles.featuresGrid}>
          <div className={styles.featureItem}>
            <FaFish size={40} />
            <h3>Find Spots</h3>
            <p>Discover the best fishing spots around you.</p>
          </div>
          <div className={styles.featureItem}>
            <FaMapMarkerAlt size={40} />
            <h3>Upload Locations</h3>
            <p>Share your favorite fishing spots with the community.</p>
          </div>
          <div className={styles.featureItem}>
            <FaUserFriends size={40} />
            <h3>Join the Community</h3>
            <p>Connect with fellow anglers and exchange tips.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <h3>FishSpot</h3>
          <p>Explore | Share | Connect</p>
          <div className={styles.footerLinks}>
            <Link to="/contact">Contact Us</Link>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
