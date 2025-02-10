import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './ProfilePage.module.css'; // Import the CSS module

interface UserData {
  nick_name: string;
  location: string;
  bio: string;
  avatar?: string; // Optional in case no profile picture is provided
  post_count: number
}

interface ProfilePageProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ setIsLoggedIn }) => {
  const baseUrl = import.meta.env.VITE_BASE_URL
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>(null);

  // Fetch user's data from backend
  const fetchUserData = async () => {
    const user_id = localStorage.getItem("user_id");
    if (user_id) {
      try {
        const response = await axios.get<UserData>(`${baseUrl}/users/${user_id}`);
        setUserData(response.data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const onLogout = () => {
    localStorage.removeItem("user_id");
    localStorage.removeItem("loggedIn");
    setIsLoggedIn(false);
    navigate('/');
  };

  const onEditProfile = () => {
    navigate('/editprofile');
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileCard}>
        {/* Profile Header */}
        <div className={styles.profileHeader}>
          <div className={styles.profileInfo}>
            <img
              src={userData?.avatar || '/path/to/default-avatar.png'} // Placeholder avatar if no profile picture
              alt="Profile"
              className={styles.profileAvatar}
            />
            <div>
              <h2 className={styles.profileUsername}>
                Welcome, {userData?.nick_name || "User"}!
              </h2>
              <p className={styles.profileLocation}>{userData?.location || "Unknown Location"}</p>
            </div>
          </div>
          {/* Edit Profile Button */}
          <button className={styles.editProfileBtn} onClick={onEditProfile}>
            Edit Profile
          </button>
        </div>
        {/* Bio Section */}
        <div className={styles.profileBioSection}>
          <h3 className={styles.profileBioTitle}>Bio</h3>
          <p className={styles.profileBioText}>
            {userData?.bio || ""}
          </p>
        </div>
        {/* Statistics */}
        <div className={styles.profileStats}>
          <div className={styles.profileStatCard}>
            <h4 className={styles.profileStatTitle}>Spots Uploaded</h4>
            <p className={styles.profileStatNumber}>{userData?.post_count}</p> {/* Replace with dynamic data if available */}
          </div>
          {/* <div className={styles.profileStatCard}>
            <h4 className={styles.profileStatTitle}>Total Likes</h4>
            <p className={styles.profileStatNumber}>127</p> 
          </div> */}
        </div>
        {/* Logout Button */}
        <button onClick={onLogout} className={styles.logoutBtn}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
