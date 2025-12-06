import { useState, useRef } from "react";
import "./book-modal-styles.css";
import useFetch from "../../../hooks/useFetch.js";
import { Link, useParams } from "react-router";

export default function BookModal({ book, isOpen, onClose, isOwner, isAuth }) {
  const {request} = useFetch;
  const {bookId} = useParams();
  const [isResizing, setIsResizing] = useState(false);
  const [modalHeight, setModalHeight] = useState(0);
  const modalRef = useRef(null);
  const startYRef = useRef(0);
  const startHeightRef = useRef(0);

  const deleteBook = async ()=> {
    try {

      await request(`/data/books/${bookId}`, 'DELETE')
      
    } catch (error) {
      alert('Can not delete the book :', error.message)
    }
  }

  if (!isOpen || !book) return null;

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsResizing(true);
    startYRef.current = e.clientY;

    if (modalRef.current) {
      console.log("Mouse moving:", e.clientY);
      const rect = modalRef.current.getBoundingClientRect();
      startHeightRef.current = rect.height;
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

    const constrainedHeight = Math.max(
      minHeight,
      Math.min(newHeight, maxHeight)
    );
    setModalHeight(constrainedHeight);
  };

  const handleMouseUp = () => {
    setIsResizing(false);
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return (
  <div className="modal-overlay">
    <div
      className="modal-content"
      style={{ height: modalHeight || "50%" }}
      ref={modalRef}
    >
      <div className="drag-area" onMouseDown={handleMouseDown}></div>

      <button className="close-button" onClick={onClose}>×</button>

      <div className="modal-body">
  
        <div className="modal-image">
          <img
            src={book.imageUrl}
            alt={`${book.title} Cover`}
          />
        </div>

     
        <div className="modal-details">
          <h2>{book.title}</h2>
          <p className="author">by {book.author}</p>
          {book.genre && <p className="genre">Genre: {book.genre}</p>}

          {book.rating && (
            <div className="rating">
              Rating: {"★".repeat(book.rating)}
              {"☆".repeat(5 - book.rating)}
            </div>
          )}

          {book.description && (
            <p className="description">{book.description}</p>
          )}
          {book.pages && <p className="pages">Pages: {book.pages}</p>}
          {book.isbn && <p className="isbn">ISBN: {book.isbn}</p>}

        {isOwner && (<div className="modal-actions">
            <button className="edit-btn"><Link to={`/books/${bookId}/edit`}>Edit</Link></button>
            <button lassName="delete-btn"  onClick={deleteBook}>Delete</button>
          </div>)}
          

           {isAuth && (
              <>
                <div className="rating-input-section">
                  <h3>Your Rating</h3>
                  <div className="star-input">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className="star">
                        ★
                      </span>
                    ))}
                  </div>
                </div>

                <div className="comment-section">
                  <h3>Your Comment</h3>
                  <textarea
                    placeholder="Write your thoughts about this book…"
                    className="comment-box"
                  ></textarea>
                  <button className="submit-comment-btn">Submit</button>
                </div>
              </>
            )}

        </div>
      </div>
    </div>
  </div>
);
}
