import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./MySpotsPage.module.css"; // Import the CSS module

interface MySpot {
  post_id: number;
  spot_name: string;
  description: string;
  photo_url: string;
}

const MySpotsPage: React.FC = () => {
  const baseUrl = import.meta.env.VITE_BASE_URL
  const [mySpots, setMySpots] = useState<MySpot[]>([]);
  const navigate = useNavigate();
  const user_id = localStorage.getItem("user_id");

  // Fetch user's posts
  const fetchPostData = async () => {
    try {
      const response = await axios.get(`${baseUrl}/posts/user/${user_id}`);
      setMySpots(response.data);
    } catch (error) {
      console.log("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPostData();
  }, []);

  const handleEdit = (post_id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/edit/${post_id}`);
    console.log(`Edit spot with ID: ${post_id}`);
  };

  const handleDelete = async (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const response = await axios.delete(`${baseUrl}/posts/${id}`);
      setMySpots((prevSpots) => prevSpots.filter((spot) => spot.post_id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSinglePostPage = (post_id: number) => {
    navigate(`/posts/${post_id}`);
  };

  return (
    <div className={styles.mySpotsContainer}>
      <h2 className={styles.mySpotsHeading}>My Fishing Spots</h2>
      <div className={styles.mySpotsGrid}>
        {mySpots.map((spot) => (
          <div
            key={spot.post_id}
            className={styles.spotCard}
            onClick={() => handleSinglePostPage(spot.post_id)}
          >
            <img src={spot.photo_url} alt={spot.spot_name} className={styles.spotCardImg} />
            <div className={styles.spotCardContent}>
              <h3 className={styles.spotCardTitle}>{spot.spot_name}</h3>
              <p className={styles.spotCardDescription}>{spot.description}</p>
              <div className={styles.spotCardButtons}>
                <button
                  onClick={(e) => handleEdit(spot.post_id, e)}
                  className={styles.editBtn}
                >
                  Edit
                </button>
                <button
                  onClick={(e) => handleDelete(spot.post_id, e)}
                  className={styles.deleteBtn}
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
