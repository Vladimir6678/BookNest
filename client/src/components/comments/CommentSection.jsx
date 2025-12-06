import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import CommentContext from "../../context/CommentContext";
import UserContext from "../../context/UserContext";
import "./comments.css";

export default function CommentSection() {
  const { comments, getAllComments, addComment, deleteComment } =
    useContext(CommentContext);
  const { user, isAuthenticated } = useContext(UserContext);

  const { bookId } = useParams();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

 
  useEffect(() => {
    async function loadComments() {
      setLoading(true);
      await getAllComments(bookId);
      setLoading(false);
    }
    loadComments();
  }, [bookId]);

  const handleSubmit = async () => {
    if (!message.trim()) return;

    const created = await addComment(bookId, message, user);

    if (created) setMessage(""); 
  };

  return (
    <div className="comment-section">
      <h3>Comments</h3>

      {isAuthenticated && (
        <div className="add-comment-container">
          <textarea
            className="comment-box"
            placeholder="Write your comment..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="submit-comment-btn" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      )}

      <hr />

      {loading ? (
        <p>Loading comments...</p>
      ) : comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        <ul className="comments-list">
          {comments.map((comment) => (
            <li key={comment._id} className="comment-item">
              <div className="comment-body">
                <strong>{comment.username}</strong>
                <p>{comment.message}</p>
                <small className="comment-date">
                  {new Date(comment._createdOn).toLocaleString()}
                </small>
              </div>

              {isAuthenticated && comment._ownerId === user?._id && (
                <button
                  className="delete-comment-btn"
                  onClick={() => deleteComment(comment._id, user)}
                >
                  Delete
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
