import React, { useState } from "react";
import styles from "./DiscussPage.module.css";
import { FaCommentAlt, FaFish, FaUser, FaCalendarAlt } from "react-icons/fa";

// Define the structure of a comment
interface Comment {
  message: string;
  avatar: string;
  time: string;
}

const Discuss: React.FC = () => {
  // Sample fishing spot data (this can be passed as props or fetched from an API)
  const myPost = {
    spot_name: "Kuivasjärvi",
    description: "This place has a huge amount of fish",
    photo_url:
      "https://res.cloudinary.com/dstq5xce2/image/upload/v1729684927/p4oyealh1t46cg43ylfj.jpg",
    fish_type: ["Carp", "Bass"],
    user_name: "tam",
    // saved: "2024-10-20T10:30:00Z", // Uncomment and use if needed
  };

  // State to hold comments
  const [comments, setComments] = useState<Comment[]>([
    {
      message: "This is a great spot! I caught a bass here last week.",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      time: "16 mins ago",
    },
    {
      message: "Planning to visit this place next month!",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
      time: "19 mins ago",
    },
  ]);

  // State to hold form input
  const [userComment, setUserComment] = useState<string>("");

  // Handle form submission
  const handleSubmit = () => {
    if (userComment) {
      const newComment: Comment = {
        message: userComment,
        avatar: "https://randomuser.me/api/portraits/men/3.jpg", // Placeholder avatar
        time: "Just now",
      };
      setComments([...comments, newComment]);

      // Clear input fields
      setUserComment("");
    }
    console.log("clicked")
  };

  return (
    <div className={styles.container}>
      {/* Fishing Spot Post */}
      <div className={styles['single-post-container']}>
        <div className={styles['single-post-image']}>
          <img
            src={myPost.photo_url}
            alt={myPost.spot_name}
            className={styles['single-post-main-image']}
          />
        </div>
        <div className={styles['single-post-content']}>
          <h1 className={styles['single-post-title']}>{myPost.spot_name}</h1>
          <div className={styles['single-post-meta']}>
            <span className={styles['single-post-author']}>
              <FaUser /> {myPost.user_name}
            </span>
            <span className={styles['single-post-date']}>
              {/* Uncomment and use if needed */}
              {/* <FaCalendarAlt /> {myPost.saved?.split("T")[0]} */}
            </span>
          </div>
          <p className={styles['single-post-description']}>
            {myPost.description}
          </p>
          <div className={styles['single-post-fish-species']}>
            <FaFish /> {myPost.fish_type.join(", ")}
          </div>
        </div>
      </div>

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
              {/* <h5>{comment.name}</h5> */}
              <p className={styles.commentText}>{comment.message}</p>
              <div className={styles.commentActions}>
                <span>{comment.time}</span>
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
