import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./SinglePostPage.css"; // Create a new CSS file to style this page
import { FaCommentAlt, FaFish, FaUser, FaCalendarAlt } from "react-icons/fa";

// Define interface for the post data
interface MyPost {
  post_id: number;
  spot_name: string;
  description: string;
//   photo_url: string;
  user_name: string;
  saved: string;
  fish_type: string;
}

const SinglePostPage: React.FC = () => {
  const [myPost, setMyPost] = useState<MyPost | null>(null);
  const { post_id } = useParams<{ post_id: string }>();

    const photo_url = "https://placehold.co/25x10";

  const fetchPostData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/posts/${post_id}`
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
    return <div>Loading...</div>; // Display loading while data is being fetched
  }

  // Render the post content using the fetched data
  return (
    <div className="single-post-container">
      <div className="single-post-image">
        <img
          src={photo_url}
          alt={myPost.spot_name}
          className="single-post-main-image"
        />
      </div>
      <div className="single-post-content">
        <h1 className="single-post-title">{myPost.spot_name}</h1>
        <div className="single-post-meta">
          <span className="single-post-author">
            <FaUser /> {myPost.user_name}
          </span>
          <span className="single-post-date">
            <FaCalendarAlt /> {myPost.saved.split("T")[0]}
          </span>
        </div>
        <p className="single-post-description">{myPost.description}</p>
        <div className="single-post-fish-species">
          <FaFish /> {myPost.fish_type}
        </div>
        <button className="single-post-discuss-btn">
          <FaCommentAlt /> Discuss
        </button>
      </div>
    </div>
  );
};

export default SinglePostPage;
