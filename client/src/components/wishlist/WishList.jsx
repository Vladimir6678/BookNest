export default function Wishlist({ wishlist, onItemClick, onRemove }) {
  if (!wishlist || wishlist.length === 0) {
    return <p className="empty-wishlist">Your wishlist is empty.</p>;
  }

  return (
    <div className="wishlist-container">
      <h2>My Wishlist</h2>
      <div className="wishlist-grid">
        {wishlist.map((book) => (
          <div key={book._id} className="wishlist-card">
            <img
              src={book.imageUrl} 
              alt={book.title} 
              onClick={() => onItemClick && onItemClick(book)}
            />
            <div className="wishlist-info">
              <p className="wishlist-title">{book.title}</p>
              <p className="wishlist-author">{book.author}</p>
              <button
                className="remove-btn"
                onClick={() => onRemove(book)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
