// src/components/HomePage.tsx
import React from 'react';
import { FaSearch } from "react-icons/fa";

const HomePage: React.FC = () => {
  return (
    <div className="relative h-screen">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1514469038836-36452c63d69a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80')",
        }}
      ></div>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
        <h1 className="text-5xl font-bold mb-4">Discover Your Perfect Fishing Spot</h1>
        <p className="text-xl mb-8">
          Share and explore the best fishing locations with fellow anglers
        </p>
        {/* Search Bar */}
        <div className="w-full max-w-md">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for fishing spots..."
              className="w-full py-3 px-4 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-blue-600">
              <FaSearch size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
