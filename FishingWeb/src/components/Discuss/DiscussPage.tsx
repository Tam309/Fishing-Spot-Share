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
  comment_id: string;
  comment_content: string;
  avatar: string;
  nick_name: string;
  saved: string;
  user_id: string;
}

const Discuss: React.FC = () => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const { post_id } = useParams<{ post_id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [userComment, setUserComment] = useState<string>("");
  const [editComment, setEditComment] = useState<string>("");
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const userId = localStorage.getItem("id");

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/posts/${post_id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = response.data.post;
        setPost(data);
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
        const response = await axios.get(`${baseUrl}/comments/${post_id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const formattedData = response.data.comments.map((comment: any) => ({
          comment_id: comment._id,
          comment_content: comment.content,
          avatar: comment.user_id.avatar || "https://via.placeholder.com/150",
          nick_name: comment.user_id.nick_name || comment.user_id.username,
          saved: comment.createdAt.split("T")[0],
          user_id: comment.user_id._id,
        }));
        setComments(formattedData);
        console.log("Comments data:", response.data.comments);
      } catch (error) {
        console.error("Error fetching comments data:", error);
      }
    };
    fetchComments();
  }, [post_id]);

  const sendComment = async () => {
    try {
      const response = await axios.post(
        `${baseUrl}/comments`,
        {
          postId: post_id,
          content: userComment,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = response.data.comment;
      const newComment = {
        comment_id: data._id,
        comment_content: data.content,
        avatar: data.avatar || "https://via.placeholder.com/150",
        nick_name: data.nick_name || data.username || "Anonymous",
        saved: data.createdAt.split("T")[0],
        user_id: data.user_id,
      };

      setComments((prevComments) => [...prevComments, newComment]);
      setUserComment("");
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  const handleSubmit = () => {
    if (!userComment) return;
    sendComment();
  };

  const handleEditComment = (index: number) => {
    setIsEditing(index);
    setEditComment(comments[index].comment_content);
    setOpenDropdown(null);
  };

  const handleSaveEdit = async (index: number) => {
    try {
      await axios.put(
        `${baseUrl}/comments/${comments[index].comment_id}`,
        {
          content: editComment,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (error) {
      console.error("Error editing comment:", error);
    }
    const updatedComments = comments.map((comment, i) =>
      i === index ? { ...comment, comment_content: editComment } : comment
    );
    setComments(updatedComments);
    setIsEditing(null);
    setOpenDropdown(null);
  };

  const handleDeleteComment = async (index: number) => {
    try {
      const response = await axios.delete(
        `${baseUrl}/comments/${comments[index].comment_id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        const updatedComments = comments.filter((_, i) => i !== index);
        setComments(updatedComments);
      }
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        alert("You can only delete your own comments.");
      } else {
        console.error("Error deleting comment:", error);
      }
    } finally {
      setOpenDropdown(null);
    }
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
                <img
                  src={post.avatar}
                  alt="Avatar"
                  className={styles.commentAvatar}
                />
                {post.nick_name}
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
              <FaFish /> {post.fish_type || "No fish types available"}
            </div>
          </div>
        </div>
      )}
      <div className={styles.comments}>
        {comments.map((comment, index) => (
          <div key={index} className={styles.commentItem}>
            <div className={styles.commentHeader}>
              <div className={styles.commentName}>{comment.nick_name}</div>
              <img
                src={comment.avatar}
                alt="Avatar"
                className={styles.commentAvatar}
              />
            </div>
            <div className={styles.commentContent}>
              {isEditing === index ? (
                <div>
                  <textarea
                    value={editComment}
                    onChange={(e) => setEditComment(e.target.value)}
                    rows={3}
                    className={styles.editTextarea}
                  />
                  <button
                    className={styles.btnPrimary}
                    onClick={() => handleSaveEdit(index)}
                  >
                    Save
                  </button>
                  <button
                    className={styles.btnSecondary}
                    onClick={() => setIsEditing(null)}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <p className={styles.commentText}>{comment.comment_content}</p>
              )}
              <div className={styles.commentActions}>
                <span>{comment.saved}</span>
                {comment.user_id === userId && ( // Only show dropdown for the author
                  <div
                    className={`${styles.dropdown} ${
                      openDropdown === index ? styles.dropdownActive : ""
                    }`}
                  >
                    <BsThreeDots
                      className={styles.threeDots}
                      onClick={() => handleDropDownClick(index)}
                    />
                    <div className={styles.dropdownMenu}>
                      <button onClick={() => handleEditComment(index)}>
                        Edit
                      </button>
                      <button onClick={() => handleDeleteComment(index)}>
                        Delete
                      </button>
                    </div>
                  </div>
                )}
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
