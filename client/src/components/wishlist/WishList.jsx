import { useContext } from "react";
import UserContext from "../../context/UserContext.jsx";
import "./wishlist.css";

export default function Wishlist({ onItemClick }) {
  const { user } = useContext(UserContext);

  if (!user?.wishlist || user.wishlist.length === 0) {
    return <p className="empty-wishlist">Your wishlist is empty.</p>;
  }

  return (
    <div className="wishlist-container">
      <h2>My Wishlist</h2>
      <div className="wishlist-grid">
        {user.wishlist.map(book => (
          <div
            key={book._id}
            className="wishlist-card"
            onClick={() => onItemClick && onItemClick(book)}
          >
            <img src={book.imgUrl} alt={book.title} />
            <p className="wishlist-title">{book.title}</p>
            <p className="wishlist-author">{book.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
