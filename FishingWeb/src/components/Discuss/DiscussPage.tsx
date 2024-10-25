import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import styles from "./DiscussPage.module.css";
import { FaCommentAlt, FaFish, FaUser, FaCalendarAlt } from "react-icons/fa";

// Define the structure of a post and comment
interface Post {
  spot_name: string;
  description: string;
  photo_url: string;
  fish_type: string;
  nick_name: string;
  saved?: string;
}

interface Comment {
  comment_content: string;
  avatar: string;
  nick_name: string;
  saved: string;
}

const Discuss: React.FC = () => {
  const { post_id } = useParams<{ post_id: string }>(); // Getting post_id from route params
  const user_id = localStorage.getItem("user_id");

  // State to hold the post data
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State to hold comments
  const [comments, setComments] = useState<Comment[]>([])

  // State to hold form input
  const [userComment, setUserComment] = useState<string>("");

  // Fetch post data from the API
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/posts/${post_id}`);
        setPost(response.data);
      } catch (error) {
        setError("Failed to load post data");
        console.error("Error fetching post data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPostData();
  }, [post_id]);

  // Fetch comments data from the API
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/posts/${post_id}/comments`);
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments data:", error);
      }
    };

    fetchComments();
  }, [post_id]);

  // Send new comment to back_end
  const sendComment = async () => {
    try {
      const response = await axios.post(`http://localhost:3001/posts/${post_id}/comments`, {
        user_id,
        comment_content: userComment
      });
      console.log(response.data);
      setComments([...comments, response.data]); // Update the comments state 
      setUserComment(""); // Clear the input field
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  }

  // Handle form submission
  const handleSubmit = () => {
    console.log("clicked");
    if (!userComment) return; 
    sendComment();  
  };

  if (loading) return <p>Loading post...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.container}>
      {/* Fishing Spot Post */}
      {post && (
        <div className={styles["single-post-container"]}>
          <div className={styles["single-post-image"]}>
            <img
              src={post.photo_url}
              alt={post.spot_name}
              className={styles["single-post-main-image"]}
            />
          </div>
          <div className={styles["single-post-content"]}>
            <h1 className={styles["single-post-title"]}>{post.spot_name}</h1>
            <div className={styles["single-post-meta"]}>
              <span className={styles["single-post-author"]}>
                <FaUser /> {post.nick_name}
              </span>
              <span className={styles["single-post-date"]}>
                {post.saved && (
                  <>
                    <FaCalendarAlt /> {post.saved.split("T")[0]}
                  </>
                )}
              </span>
            </div>
            <p className={styles["single-post-description"]}>
              {post.description}
            </p>
            <div className={styles["single-post-fish-species"]}>
              <FaFish /> {post.fish_type ? post.fish_type : "No fish types available"}
            </div>
          </div>
        </div>
      )}

      {/* Comments Section */}
      <div className={styles.comments}>
        {comments.map((comment, index) => (
          <div key={index} className={styles.commentItem}>
            <img
              src={comment.avatar}
              alt="Avatar"
              className={styles.commentAvatar}
            />
            <div className={styles.commentContent}>
              <p className={styles.commentText}>{comment.comment_content}</p>
              <div className={styles.commentActions}>
                <span>{comment.saved}</span>
                <div>
                  <button className={styles.btnPrimary}>Reply</button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Comment Form */}
        <div className={styles.commentForm}>
          <label htmlFor="userComment">Add a comment</label>
          <textarea
            value={userComment}
            onChange={(e) => setUserComment(e.target.value)}
            placeholder="Write your comment here..."
            id="userComment"
            rows={4}
          />
          <button onClick={handleSubmit} className={styles.btnPrimary}>
            Post Comment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Discuss;
