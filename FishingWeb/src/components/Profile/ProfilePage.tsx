import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ProfilePage.module.css'; // Import the CSS module

interface ProfilePageProps {
  username: string;
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ username, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.removeItem("user_id");
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileCard}>
        {/* Profile Header */}
        <div className={styles.profileHeader}>
          <img
            src={`https://api.adorable.io/avatars/285/${username}.png`} // Placeholder avatar
            alt="Profile"
            className={styles.profileAvatar}
          />
          <div>
            <h2 className={styles.profileUsername}>Welcome, {username}!</h2>
            <p className={styles.profileBio}>Avid angler and nature enthusiast</p>
            <p className={styles.profileBio}>Seattle, Washington</p>
          </div>
        </div>
        {/* Bio Section */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Bio</h3>
          <p className={styles.profileBio}>
            I've been fishing for over 20 years and love exploring new spots. Always up for trading fishing stories and tips!
          </p>
        </div>
        {/* Statistics */}
        <div className={styles.profileStats}>
          <div className={styles.profileStatCard}>
            <h4 className={styles.profileStatTitle}>Spots Uploaded</h4>
            <p className={styles.profileStatNumber}>15</p>
          </div>
          <div className={styles.profileStatCard}>
            <h4 className={styles.profileStatTitle}>Total Likes</h4>
            <p className={styles.profileStatNumber}>127</p>
          </div>
        </div>
        {/* Logout Button */}
        <button
          onClick={onLogout}
          className={styles.logoutBtn}
        >
          Logout
        </button>

      </div>
    </div>
  );
};

export default ProfilePage;
