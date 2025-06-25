import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./SinglePostPage.module.css";
import { FaCommentAlt, FaFish, FaUser, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface MyPost {
  post_id: string;
  spot_name: string;
  description: string;
  photo_url: string;
  sharedBy: string;
  nick_name: string;
  avatar: string;
  fish_type: string;
  date?: string; 
  location: string;
}

const SinglePostPage: React.FC = () => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [myPost, setMyPost] = useState<MyPost | null>(null);
  const { post_id } = useParams<{ post_id: string }>();

  const navigate = useNavigate();

  const fetchPostData = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/posts/${post_id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = response.data.post; 
      setMyPost(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPostData();
  }, []);

  if (!myPost) {
    return <div>Loading...</div>;
  }
  
  const handleDiscuss = (post_id: string) => {
    console.log(`Discuss spot with ID: ${post_id}`);
    navigate(`/discuss/${post_id}`);
  };

  return (
    <div className={styles.singlePostContainer}>
      <div className={styles.singlePostImage}>
        <img
          src={myPost.photo_url}
          alt={myPost.spot_name}
          className={styles.singlePostMainImage}
        />
      </div>
      <div className={styles.singlePostContent}>
        <h1 className={styles.singlePostTitle}>{myPost.spot_name}</h1>
        <div className={styles.singlePostMeta}>
          <span>
            <img
              src={myPost.avatar}
              alt="Avatar"
              className={styles.commentAvatar}
            />
            {myPost.nick_name}
          </span>
          {myPost.date ? (
            <span>
              <FaCalendarAlt /> {myPost.date.split("T")[0]}
            </span>
          ) : (
            <span>
              <FaCalendarAlt /> Date not available
            </span>
          )}
        </div>
        <div className={styles.singlePostLocation}>
          <FaMapMarkerAlt /> {myPost.location}
        </div>
        <p className={styles.singlePostDescription}>{myPost.description}</p>
        <div className={styles.singlePostFishSpecies}>
          <FaFish /> {myPost.fish_type}
        </div>
        <button className={styles.singlePostDiscussBtn} onClick={() => handleDiscuss(String(myPost.post_id))}>
          <FaCommentAlt /> Discuss
        </button>
      </div>
    </div>
  );
};

export default SinglePostPage;