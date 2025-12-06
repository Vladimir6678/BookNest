import { createContext, useContext, useState, useEffect } from "react";
import useFetch from "../hooks/useFetch.js";

const CommentContext = createContext({
  comments: [],
  getAllComments: () => {},
  addComment: () => {},
  deleteComment: () => {},
});

export function CommentProvider({ children }) {
  const { request } = useFetch();
  const [comments, setComments] = useState([]);

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
    try {
      const newComment = await request("/data/comments", "POST", { bookId, message });
      setComments((prev) => [newComment, ...prev]);
      return newComment;
    } catch (err) {
      alert("Failed to add comment: " + err.message);
      return null;
    }
  };

  const deleteComment = async (commentId) => {
    try {
      await request(`/data/comments/${commentId}`, "DELETE");
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