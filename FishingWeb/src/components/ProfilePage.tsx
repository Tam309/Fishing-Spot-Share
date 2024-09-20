// src/components/ProfilePage.tsx
import React from 'react';

interface ProfilePageProps {
  username: string;
  onLogout: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ username, onLogout }) => {
  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center mb-6">
          <img
            src={`https://api.adorable.io/avatars/285/${username}.png`} // Placeholder avatar
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover mb-4 md:mb-0 md:mr-6"
          />
          <div>
            <h2 className="text-3xl font-bold mb-2">Welcome, {username}!</h2>
            <p className="text-gray-600 mb-2">Avid angler and nature enthusiast</p>
            <p className="text-gray-600">Seattle, Washington</p>
          </div>
        </div>
        {/* Bio Section */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Bio</h3>
          <p className="text-gray-600">
            I've been fishing for over 20 years and love exploring new spots. Always up for trading fishing stories and tips!
          </p>
        </div>
        {/* Statistics */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <h4 className="font-semibold">Spots Uploaded</h4>
            <p className="text-2xl font-bold text-blue-600">15</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <h4 className="font-semibold">Total Likes</h4>
            <p className="text-2xl font-bold text-blue-600">127</p>
          </div>
        </div>
        {/* Logout Button */}
        <button
          onClick={onLogout}
          className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
