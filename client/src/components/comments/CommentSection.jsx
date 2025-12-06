import { useState, useEffect } from "react";
import { useContext } from "react";
import CommentContext from "../../context/CommentContext";
import { useParams } from "react-router";

export default function CommentSection({ isAuth }) {
  const { comments, getAllComments, addComment, deleteComment } = useContext(CommentContext);

  const { bookId } = useParams();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    async function load() {
      setLoading(true);
      await getAllComments(bookId);
      setLoading(false);
    }
    load();
  }, [bookId]);


  const handleSubmit = async () => {
    if (!message.trim()) return;

    const created = await addComment(bookId, message);

    if (created) {
      setMessage(""); 
    }
  };

  return (
    <div className="comment-section">

      <h3>Comments</h3>


      {isAuth && (
        <div className="add-comment-container">
          <textarea
            className="comment-box"
            placeholder="Write your comment..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>

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
                <p>{comment.message}</p>
                <small className="comment-date">
                  {new Date(comment._createdOn).toLocaleString()}
                </small>
              </div>

             
              {isAuth &&
                comment._ownerId === localStorage.getItem("userId") && (
                  <button
                    className="delete-comment-btn"
                    onClick={() => deleteComment(comment._id)}
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
