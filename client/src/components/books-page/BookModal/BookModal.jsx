import { useState, useRef, useContext } from "react";
import { useNavigate, Link } from "react-router";
import "./book-modal-styles.css";
import useFetch from "../../../hooks/useFetch.js";
import CommentSection from "../../comments/CommentSection.jsx";
import UserContext from "../../../context/UserContext";
import Rating from "../../ratings/Rating.jsx";
import WishlistButton from "../../wishlist/wishlistButton/WishListButton.jsx";




export default function BookModal({ book, isOpen, onUpdate, setBook, onClose, isOwner, isAuth, wishlist = [], onWishlistToggle }) {
  const { request } = useFetch();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [isResizing, setIsResizing] = useState(false);
  const [modalHeight, setModalHeight] = useState(0);
  const modalRef = useRef(null);
  const startYRef = useRef(0);
  const startHeightRef = useRef(0);

  if (!isOpen || !book) return null;

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsResizing(true);
    startYRef.current = e.clientY;
    if (modalRef.current) {
      startHeightRef.current = modalRef.current.getBoundingClientRect().height;
    }
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (isResizing) return;
    const deltaY = startYRef.current - e.clientY;
    const newHeight = startHeightRef.current + deltaY;
    const minHeight = 200;
    const maxHeight = window.innerHeight - 40;
    setModalHeight(Math.max(minHeight, Math.min(newHeight, maxHeight)));
  };

  const handleMouseUp = () => {
    setIsResizing(false);
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const deleteBook = async () => {
    if (!user?.accessToken) {
      alert("You are not authorized to delete this book.");
      return;
    }
    try {
      await request(`/data/books/${book._id}`, "DELETE", null, {
        Authorization: `Bearer ${user.accessToken}`,
      });
      alert("Book deleted successfully!");
      navigate("/");
    } catch (error) {
      alert("Cannot delete the book: " + (error.message || error));
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ height: modalHeight || "50%" }} ref={modalRef}>
        <div className="drag-area" onMouseDown={handleMouseDown}></div>
        <button className="close-button" onClick={onClose} > × </button>

        <div className="modal-body">
          <div className="modal-image-wrapper" style={{ position: "relative" }}>
            <img
              src={book.imageUrl}
              alt={`${book.title} Cover`}
              className="modal-book-image"
            />

            <WishlistButton
              book={book}
              wishlist={wishlist}
              onToggle={onWishlistToggle}
              style={{
                position: "absolute",
                top: "12px",
                right: "12px",
                zIndex: 10,
              }}
            />
          </div>




        <div className="modal-details">
          <h2>{book.title}</h2>
          <p className="author">by {book.author}</p>
          <p className="genre">Genre: {book.genre}</p>
          <p className="description">{book.description}</p>

          {isOwner && (
            <div className="modal-actions">

              <Link to={`/books/${book._id}/edit`} className="edit-btn">
                Edit
              </Link>

              <button className="delete-btn" onClick={deleteBook}>Delete</button>
            </div>
          )}

          <Rating book={book} onUpdate={onUpdate} />
          <CommentSection isAuth={isAuth} />
         
        </div>
      </div>
    </div>
    </div >

  );

}


