import React from 'react';
import { FaUser, FaFish, FaComments } from "react-icons/fa";
import './SharedSpotsPage.css'; // Import the CSS file

interface SharedSpot {
  id: number;
  name: string;
  description: string;
  image: string;
  sharedBy: string;
  date: string;
}

const SharedSpotsPage: React.FC = () => {
  const sharedSpots: SharedSpot[] = [
    {
      id: 1,
      name: "Golden Pond",
      description: "A serene spot for carp fishing",
      image:
        "https://images.unsplash.com/photo-1593816151811-39a9db0b7c82?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      sharedBy: "Alice Smith",
      date: "2023-05-15",
    },
    {
      id: 2,
      name: "Whispering Creek",
      description: "Perfect for trout fishing in spring",
      image:
        "https://images.unsplash.com/photo-1516034618791-0a1dd83f7e24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      sharedBy: "Bob Johnson",
      date: "2023-05-10",
    },
    {
      id: 3,
      name: "Eagle's Nest Lake",
      description: "Great for bass fishing with beautiful scenery",
      image:
        "https://images.unsplash.com/photo-1454623228540-d5832958ef4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      sharedBy: "Carol Davis",
      date: "2023-05-05",
    },
  ];

  const handleDiscuss = (id: number) => {
    console.log(`Discuss spot with ID: ${id}`);
  };

  return (
    <div className="shared-container">
      <h2 className="shared-title">Recently Shared Fishing Spots</h2>
      <div className="shared-grid">
        {sharedSpots.map((spot) => (
          <div key={spot.id} className="shared-card">
            <img
              src={spot.image}
              alt={spot.name}
              className="shared-image"
            />
            <div className="shared-content">
              <h3 className="shared-spot-name">{spot.name}</h3>
              <p className="shared-description">{spot.description}</p>
              <div className="shared-footer">
                <span className="shared-footer-icon">
                  <FaUser /> {spot.sharedBy}
                </span>
                <span>{spot.date}</span>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <button
                  onClick={() => handleDiscuss(spot.id)}
                  className="shared-discuss-btn"
                >
                  <FaComments /> Discuss
                </button>
                <span className="shared-fish">
                  <FaFish /> Carp, Bass
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SharedSpotsPage;
