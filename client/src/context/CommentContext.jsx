import { createContext, useState } from "react";
import useFetch from "../hooks/useFetch.js";

const CommentContext = createContext({
  comments: [],
  getAllComments: async () => {},
  addComment: async () => {},
  deleteComment: async () => {},
});

export function CommentProvider({ children }) {
  const { request } = useFetch();
  const [comments, setComments] = useState([]);

 
  const getAllComments = async (bookId) => {
    try {
      const url = `/data/comments?where=${encodeURIComponent(
        `bookId="${bookId}"`
      )}&sortBy=_createdOn%20desc`;
      const result = await request(url, "GET");
      setComments(result);
    } catch (err) {
      console.error("Failed to fetch comments:", err);
      alert("Failed to fetch comments: " + (err.message || err));
    }
  };


  const addComment = async (bookId, message, user) => {
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
          username: user.username,
        },
        {
          Authorization: `Bearer ${user.accessToken}`,
        }
      );
      setComments((prev) => [newComment, ...prev]);
      return newComment;
    } catch (err) {
      console.error("Failed to add comment:", err);
      alert("Failed to add comment: " + (err.message || err));
      return null;
    }
  };

 
  const deleteComment = async (commentId, user) => {
    if (!user) {
      alert("You must be logged in to delete a comment!");
      return;
    }

    try {
      await request(`/data/comments/${commentId}`, "DELETE", null, {
        Authorization: `Bearer ${user.accessToken}`,
      });
      setComments((prev) => prev.filter((c) => c._id !== commentId));
    } catch (err) {
      console.error("Failed to delete comment:", err);
      alert("Failed to delete comment: " + (err.message || err));
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
