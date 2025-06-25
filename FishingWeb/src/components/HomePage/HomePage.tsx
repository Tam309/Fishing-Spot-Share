import React, { useState, useEffect } from "react";
import { FaUser, FaFish, FaComments, FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styles from "./HomePage.module.css"; 
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
  fish_type: string;
  location: string; 
}

const SharedSpotsPage: React.FC = () => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [sharedSpots, setSharedSpots] = useState<SharedSpot[]>([]);
  const navigate = useNavigate();

  const fetchPost = async () => {
    try {
      const response = await axios.get(`${baseUrl}/posts`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          sort: "createdAt",
          order: "desc",
        },
      });
      const data = response.data.posts;
      const formattedData = data.map((post: any) => ({
        post_id: post.post_id,
        spot_name: post.spot_name,
        description: post.description,
        photo_url: post.photo_url,
        sharedBy: post.user_id,
        date: post.date,
        nick_name: post.nick_name,
        avatar: post.avatar || "https://via.placeholder.com/150",
        fish_type: post.fish_type,
        location: post.location || "Unknown Location", 
      }));
      setSharedSpots(formattedData);
      console.log(formattedData);
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

  const handleSinglePost = (post_id: number) => {
    console.log(`View single post with ID: ${post_id}`);
    navigate(`/posts/${post_id}`);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Recently Shared Fishing Spots</h2>
      <div className={styles.grid}>
        {sharedSpots.map((spot) => (
          <div key={spot.post_id} className={styles.card} onClick={() => handleSinglePost(spot.post_id)}>
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
              <div className={styles.location}>
                <FaMapMarkerAlt /> {spot.location}
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