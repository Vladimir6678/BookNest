import BookCard from "../books-page/book-card/BookCard.jsx";
import "./wishlist.css";

export default function Wishlist({ wishlist, onItemClick, onRemove }) {
  if (!wishlist || wishlist.length === 0) {
    return <p className="empty-wishlist">Your wishlist is empty.</p>;
  }

  return (
    <div className="wishlist-container">
      <h2>My Wishlist</h2>
      <div className="wishlist-grid">
        {wishlist.map((book) => (
          <BookCard
           book={book}
          ></BookCard>
        ))}
      </div>
    </div>
  );
}
