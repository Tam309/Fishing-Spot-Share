import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import styles from "./DiscussPage.module.css";
import { FaCalendarAlt, FaFish } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";

interface Post {
  spot_name: string;
  description: string;
  photo_url: string;
  fish_type: string;
  nick_name: string;
  saved?: string;
  avatar: string;
}

interface Comment {
  comment_id: number;
  comment_content: string;
  avatar: string;
  nick_name: string;
  saved: string;
  user_id: number;
  // Ensuring user_id is a string here for comparison
}

const Discuss: React.FC = () => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const { post_id } = useParams<{ post_id: string }>();
  const loggedInUserId = Number(localStorage.getItem("user_id")); // Get the user_id from localStorage
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [userComment, setUserComment] = useState<string>("");
  const [editComment, setEditComment] = useState<string>("");

  // New state to track which comment's dropdown is open
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/posts/${post_id}`);
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

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`${baseUrl}/posts/${post_id}/comments`);
        setComments(response.data);
        console.log("Comments data:", response.data);
      } catch (error) {
        console.error("Error fetching comments data:", error);
      }
    };
    fetchComments();
  }, [post_id]);

  const sendComment = async () => {
    try {
      const response = await axios.post(`${baseUrl}/posts/${post_id}/comments`, {
        user_id: loggedInUserId,
        comment_content: userComment,
      });

      // Add the full response data (with comment_id) to the comments array
      setComments((prevComments) => [...prevComments, {
        ...response.data,
        user_id: loggedInUserId, // Ensure user_id is included
      }]);
      setUserComment("");  // Clear the comment input
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  const handleSubmit = () => {
    if (!userComment) return;
    sendComment();
  };

  const handleEditComment = (index: number) => {
    if (comments[index].user_id !== loggedInUserId) {
      alert("You can't edit another user's comment.");
      return;
    }
    setIsEditing(index);
    setEditComment(comments[index].comment_content);
  };

  const handleSaveEdit = async (index: number) => {
    // Send edited comment to server
    try {
      await axios.put(`${baseUrl}/posts/${post_id}/comments/${comments[index].comment_id}`, {
        comment_content: editComment,
      });
    } catch (error) {
      console.error("Error editing comment:", error);
    }
    const updatedComments = comments.map((comment, i) =>
      i === index ? { ...comment, comment_content: editComment } : comment
    );
    setComments(updatedComments);
    setIsEditing(null);
  };

  const handleDeleteComment = async (index: number) => {
    try {
      await axios.delete(`${baseUrl}/posts/${post_id}/comments/${comments[index].comment_id}`);
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
    if (comments[index].user_id !== loggedInUserId) {
      alert("You can't delete another user's comment.");
      return;
    }
    const updatedComments = comments.filter((_, i) => i !== index);
    setComments(updatedComments);
  };

  const handleDropDownClick = (index: number) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  if (loading) return <p>Loading post...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.container}>
      {post && (
        <div className={styles["single-post-container"]}>
          <div className={styles["single-post-image"]}>
            <img src={post.photo_url} alt={post.spot_name} className={styles["single-post-main-image"]} />
          </div>
          <div className={styles["single-post-content"]}>
            <h1 className={styles["single-post-title"]}>{post.spot_name}</h1>
            <div className={styles["single-post-meta"]}>
              <span className={styles["single-post-author"]}>
                <img src={post.avatar} alt="Avatar" className={styles.commentAvatar} />
                {post.nick_name}
              </span>
              <span className={styles["single-post-date"]}>
                {post.saved && <><FaCalendarAlt /> {post.saved.split("T")[0]}</>}
              </span>
            </div>
            <p className={styles["single-post-description"]}>{post.description}</p>
            <div className={styles["single-post-fish-species"]}>
              <FaFish /> {post.fish_type || "No fish types available"}
            </div>
          </div>
        </div>
      )}
      <div className={styles.comments}>
        {comments.map((comment, index) => (
          <div key={index} className={styles.commentItem}>
            <img src={comment.avatar} alt="Avatar" className={styles.commentAvatar} />
            <div className={styles.commentContent}>
              {isEditing === index ? (
                <div>
                  <textarea
                    value={editComment}
                    onChange={(e) => setEditComment(e.target.value)}
                    rows={3}
                    className={styles.editTextarea}
                  />
                  <button className={styles.btnPrimary} onClick={() => handleSaveEdit(index)}>
                    Save
                  </button>
                </div>
              ) : (
                <p className={styles.commentText}>{comment.comment_content}</p>
              )}
              <div className={styles.commentActions}>
                <span>{comment.saved}</span>
                <div className={`${styles.dropdown} ${openDropdown === index ? styles.dropdownActive : ""}`}>
                  <BsThreeDots className={styles.threeDots} onClick={() => handleDropDownClick(index)} />
                  <div className={styles.dropdownMenu}>
                    <button onClick={() => handleEditComment(index)}>Edit</button>
                    <button onClick={() => handleDeleteComment(index)}>Delete</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
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
