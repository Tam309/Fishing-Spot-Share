import React from 'react';
import './ProfilePage.css'; // Import the CSS file

interface ProfilePageProps {
  username: string;
  onLogout: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ username, onLogout }) => {
  return (
    <div className="profile-container">
      <div className="profile-card">
        {/* Profile Header */}
        <div className="profile-header">
          <img
            src={`https://api.adorable.io/avatars/285/${username}.png`} // Placeholder avatar
            alt="Profile"
            className="profile-avatar"
          />
          <div>
            <h2 className="profile-username">Welcome, {username}!</h2>
            <p className="profile-bio">Avid angler and nature enthusiast</p>
            <p className="profile-bio">Seattle, Washington</p>
          </div>
        </div>
        {/* Bio Section */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Bio</h3>
          <p className="profile-bio">
            I've been fishing for over 20 years and love exploring new spots. Always up for trading fishing stories and tips!
          </p>
        </div>
        {/* Statistics */}
        <div className="profile-stats">
          <div className="profile-stat-card">
            <h4 className="profile-stat-title">Spots Uploaded</h4>
            <p className="profile-stat-number">15</p>
          </div>
          <div className="profile-stat-card">
            <h4 className="profile-stat-title">Total Likes</h4>
            <p className="profile-stat-number">127</p>
          </div>
        </div>
        {/* Logout Button */}
        <button
          onClick={onLogout}
          className="logout-btn"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
