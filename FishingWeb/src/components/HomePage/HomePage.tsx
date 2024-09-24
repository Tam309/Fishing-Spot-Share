import React from 'react';
import { FaSearch } from "react-icons/fa";
import './HomePage.css'; // Import the CSS file

const HomePage: React.FC = () => {
  return (
    <div className="fullscreen-container">
      {/* Background Image */}
      <div
        className="background-image"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1514469038836-36452c63d69a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80')",
        }}
      ></div>
      {/* Overlay */}
      <div className="overlay"></div>
      {/* Content */}
      <div className="content">
        <h1>Discover Your Perfect Fishing Spot</h1>
        <p>Share and explore the best fishing locations with fellow anglers</p>
        {/* Search Bar */}
        <div className="search-container">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for fishing spots..."
            />
            <button>
              <FaSearch size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
