import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./SinglePostPage.module.css";
import { FaCommentAlt, FaFish, FaUser, FaCalendarAlt } from "react-icons/fa";

// Define interface for the post data
interface MyPost {
  post_id: number;
  spot_name: string;
  description: string;
  photo_url: string;
  nick_name: string;
  saved: string;
  fish_type: string;
  avatar: string;
}

const SinglePostPage: React.FC = () => {
  const baseUrl = import.meta.env.VITE_BASE_URL
  const [myPost, setMyPost] = useState<MyPost | null>(null);
  const { post_id } = useParams<{ post_id: string }>();

  const fetchPostData = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/posts/${post_id}`
      );
      const data = response.data;
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
          <span>
            <FaCalendarAlt /> {myPost.saved.split("T")[0]}
          </span>
        </div>
        <p className={styles.singlePostDescription}>{myPost.description}</p>
        <div className={styles.singlePostFishSpecies}>
          <FaFish /> {myPost.fish_type}
        </div>
        <button className={styles.singlePostDiscussBtn}>
          <FaCommentAlt /> Discuss
        </button>
      </div>
    </div>
  );
};

export default SinglePostPage;
