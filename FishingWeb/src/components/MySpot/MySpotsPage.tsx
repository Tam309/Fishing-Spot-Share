import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
  const user_id = localStorage.getItem("user_id")

  // Fetch user's posts based on user_id from JWT in the cookies
  const fetchPostData = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/posts/user/${user_id}`);
      setMySpots(response.data); // Set the fetched posts
    } catch (error) {
      console.log("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPostData();
  }, []);

  const handleEdit = (post_id: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the card's click event
    navigate(`/edit/${post_id}`); // Navigate to the edit page
    console.log(`Edit spot with ID: ${post_id}`);
  };

  const handleDelete = async (id: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the card's click event
    try {
      const response = await axios.delete(`http://localhost:3001/posts/${id}`);
      console.log(response.data);

      // Update the state to remove the deleted post
      setMySpots((prevSpots) => prevSpots.filter((spot) => spot.post_id !== id));
    } catch (error) {
      console.log(error);
    }
    console.log(`Delete spot with ID: ${id}`);
  };

  const handleSinglePostPage = (post_id: number) => {
    navigate(`/posts/${post_id}`);
  };

  return (
    <div className="my-spots-container">
      <h2 className="my-spots-heading">My Fishing Spots</h2>
      <div className="my-spots-grid">
        {mySpots.map((spot) => (
          <div
            key={spot.post_id}
            className="spot-card"
            onClick={() => handleSinglePostPage(spot.post_id)}
          >
            <img src={spot.photo_url} alt={spot.spot_name} />
            <div className="spot-card-content">
              <h3 className="spot-card-title">{spot.spot_name}</h3>
              <p className="spot-card-description">{spot.description}</p>
              <div className="spot-card-buttons">
                <button
                  onClick={(e) => handleEdit(spot.post_id, e)}
                  className="edit-btn"
                >
                  Edit
                </button>
                <button
                  onClick={(e) => handleDelete(spot.post_id, e)}
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
