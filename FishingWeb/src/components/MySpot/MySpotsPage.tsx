import React from "react";
import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./MySpotsPage.css"; // Import the CSS file

interface MySpot {
  post_id: number;
  spot_name: string;
  description: string;
  photo_url: string;
}

const MySpotsPage: React.FC = () => {
  const [mySpots, setMySpots] = useState<MySpot[]>([]);
  const navigate = useNavigate();

  const fetchPostData = async () => {
    try {
      const response = await fetch("http://localhost:3001");
      const data = await response.json();
      setMySpots(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPostData();
  }, []);

  const handleEdit = (post_id: number) => {
    // Navigate to the edit page with the id of the spot to edit
    navigate("/edit");
    console.log(`Edit spot with ID: ${post_id}`);
  };

  const handleDelete = (id: number) => {
    console.log(`Delete spot with ID: ${id}`);
  };

  return (
    <div className="my-spots-container">
      <h2 className="my-spots-heading">My Fishing Spots</h2>
      <div className="my-spots-grid">
        {mySpots.map((spot) => (
          <div key={spot.post_id} className="spot-card">
            <img src="https://placehold.co/723x964" alt={spot.spot_name} />
            <div className="spot-card-content">
              <h3 className="spot-card-title">{spot.spot_name}</h3>
              <p className="spot-card-description">{spot.description}</p>
              <div className="spot-card-buttons">
                <button
                  onClick={() => handleEdit(spot.post_id)}
                  className="edit-btn"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(spot.post_id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MySpotsPage;
