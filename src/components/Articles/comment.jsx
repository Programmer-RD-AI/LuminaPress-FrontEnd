// Comments.jsx
import { useState } from "react";
import "../../styles/components/Comments.css";
import { formatDate } from "../../utils/formatDate";
import { useUserAuth } from "../../hooks/Auth/useUserAuth";
import { addComment } from "../../API/articles/comments/addComment";
import DOMPurify from "dompurify";

const Comments = ({ articleId, initialComments }) => {
  const [comment, setComment] = useState("");
  const { user: userId } = useUserAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [comments, setComments] = useState(
    // Ensure comments is always an array
    Array.isArray(initialComments) ? initialComments : [],
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await addComment(
        articleId,
        userId,
        DOMPurify.sanitize(comment),
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to post comment");
      }

      // Ensure the returned comments is an array
      setComments(Array.isArray(data.comments) ? data.comments : []);
      setComment("");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="engagement-section">
      <div className="engagement-header">
        <h3>Join the Discussion</h3>
        <span className="comment-count">{comments.length} comments</span>
      </div>

      <div className="comment-box">
        <form onSubmit={handleSubmit}>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your thoughts..."
            className="comment-input"
          />
          {error && <div className="error-message">{error}</div>}
          <button
            type="submit"
            className="submit-button"
            disabled={isSubmitting || !comment.trim()}
          >
            {isSubmitting ? "Posting..." : "Post Comment"}
          </button>
        </form>
      </div>

      <div className="comments-list">
        {comments.map((comment) => (
          <div key={comment.id} className="comment-item">
            <div className="comment-author">
              <img
                src={`https://api.dicebear.com/6.x/initials/svg?seed=${comment.userId}`}
                alt={comment.userId}
                className="author-image"
              />
              <div className="author-info">
                {/* Use comment.userName instead of comment.userId */}
                <h4>{comment.userId}</h4>
                <span className="comment-date">
                  {formatDate(comment.createdAt)}
                </span>
              </div>
            </div>
            <p className="comment-text">{comment.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
