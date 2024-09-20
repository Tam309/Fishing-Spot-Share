// src/components/ProfilePage.tsx
import React from 'react';

const ProfilePage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center mb-6">
          <img
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80"
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover mb-4 md:mb-0 md:mr-6"
          />
          <div>
            <h2 className="text-3xl font-bold mb-2">John Doe</h2>
            <p className="text-gray-600 mb-2">Avid angler and nature enthusiast</p>
            <p className="text-gray-600">Seattle, Washington</p>
          </div>
        </div>
        {/* Bio Section */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Bio</h3>
          <p className="text-gray-600">
            I've been fishing for over 20 years and love exploring new spots.
            Always up for trading fishing stories and tips!
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
        {/* Edit Profile Button */}
        <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
