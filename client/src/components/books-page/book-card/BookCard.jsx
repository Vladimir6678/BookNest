
import "./book-card-styles.css";

export default function BookCard({ book, onClick, wishlist = [], onToggleWishlist }) {
  const isInWishlist = wishlist.some((b) => b._id === book._id);

  return (
    <div className="book-card" onClick={onClick}>
      <img src={book.imageUrl} alt={book.title} className="book-image" />
      <div className="book-info">
        <h3>{book.title}</h3>
        <p className="author">{book.author}</p>
      </div>
    
    </div>
  );
}

