import React, { useState, useEffect } from "react";
import { FaUser, FaFish, FaComments } from "react-icons/fa";
import "./SharedSpotsPage.css"; // Import the CSS file
import axios from "axios";

interface SharedSpot {
  post_id: number;
  spot_name: string;
  description: string;
  photo_url: string;
  sharedBy: string;
  date: string;
}

const SharedSpotsPage: React.FC = () => {
  const [sharedSpots, setSharedSpots] = useState<SharedSpot[]>([]);

  const fetchPost = async () => {
    try {
      const response = await axios.get(`http://localhost:3001`);
      const data = response.data;
      setSharedSpots(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const handleDiscuss = (id: number) => {
    console.log(`Discuss spot with ID: ${id}`);
  };

  return (
    <div className="shared-container">
      <h2 className="shared-title">Recently Shared Fishing Spots</h2>
      <div className="shared-grid">
        {sharedSpots.map((spot) => (
          <div key={spot.post_id} className="shared-card">
            <img src={spot.photo_url} alt={spot.spot_name} className="shared-image" />
            <div className="shared-content">
              <h3 className="shared-spot-name">{spot.spot_name}</h3>
              <p className="shared-description">{spot.description}</p>
              <div className="shared-footer">
                <span className="shared-footer-icon">
                  <FaUser /> {spot.sharedBy}
                </span>
                <span>{spot.date}</span>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <button
                  onClick={() => handleDiscuss(spot.post_id)}
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
