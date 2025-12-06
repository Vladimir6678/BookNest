import { createContext, useContext, useState } from "react";
import useFetch from "../hooks/useFetch.js";
import UserContext from "./UserContext";

const CommentContext = createContext({
  comments: [],
  getAllComments: () => {},
  addComment: () => {},
  deleteComment: () => {},
});

export function CommentProvider({ children }) {
  const { request } = useFetch();
  const [comments, setComments] = useState([]);
  const { user } = useContext(UserContext); // use logged-in user

  const getAllComments = async (bookId) => {
    try {
      const result = await request(
        `/data/comments?where=bookId="${bookId}"&sortBy=_createdOn%20desc`,
        "GET"
      );
      setComments(result);
    } catch (err) {
      alert("Failed to fetch comments: " + err.message);
    }
  };

  const addComment = async (bookId, message) => {
    if (!user) {
      alert("You must be logged in to comment!");
      return null;
    }

    try {
      const newComment = await request(
        "/data/comments",
        "POST",
        {
          bookId,
          message,
          _ownerId: user._id,
          username: user.username
        },
        { Authorization: `Bearer ${user.accessToken}` } // attach token if required
      );

      // Update comments immediately
      setComments((prev) => [newComment, ...prev]);
      return newComment;
    } catch (err) {
      alert("Failed to add comment: " + err.message);
      return null;
    }
  };

  const deleteComment = async (commentId) => {
    try {
      await request(`/data/comments/${commentId}`, "DELETE", null, {
        Authorization: `Bearer ${user?.accessToken}`,
      });

      setComments((prev) => prev.filter((c) => c._id !== commentId));
    } catch (err) {
      alert("Failed to delete comment: " + err.message);
    }
  };

  return (
    <CommentContext.Provider
      value={{
        comments,
        getAllComments,
        addComment,
        deleteComment,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
}

export default CommentContext;
