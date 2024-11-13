import React, { useState, useEffect } from "react";
import { FaUser, FaFish, FaComments } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styles from "./HomePage.module.css"; // Import the CSS Module
import axios from "axios";

interface SharedSpot {
  post_id: number;
  spot_name: string;
  description: string;
  photo_url: string;
  sharedBy: string;
  date: string;
  nick_name: string;
  avatar: string;
  fish_type: string
}

const SharedSpotsPage: React.FC = () => {
  const baseUrl = import.meta.env.VITE_BASE_URL
  const [sharedSpots, setSharedSpots] = useState<SharedSpot[]>([]);
  const navigate = useNavigate();

  const fetchPost = async () => {
    try {
      const response = await axios.get(`${baseUrl}`);
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

  const handleDiscuss = (post_id: number) => {
    console.log(`Discuss spot with ID: ${post_id}`);
    navigate(`/discuss/${post_id}`);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Recently Shared Fishing Spots</h2>
      <div className={styles.grid}>
        {sharedSpots.map((spot) => (
          <div key={spot.post_id} className={styles.card} onClick={() => handleDiscuss(spot.post_id)}>
            <img
              src={spot.photo_url}
              alt={spot.spot_name}
              className={styles.image}
            />
            <div className={styles.content}>
              <h3 className={styles.spotName}>{spot.spot_name}</h3>
              <p className={styles.description}>{spot.description}</p>
              <div className={styles.footer}>
                <span className={styles.footerIcon}>
                  <img
                    src={spot.avatar}
                    alt="Avatar"
                    className={styles.commentAvatar}
                  />{" "}
                  {spot.nick_name}
                </span>
                <span>{spot.date}</span>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <button
                  onClick={() => handleDiscuss(spot.post_id)}
                  className={styles.discussBtn}
                >
                  <FaComments /> Discuss
                </button>
                <span className={styles.fish}>
                  <FaFish /> {spot.fish_type}
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
