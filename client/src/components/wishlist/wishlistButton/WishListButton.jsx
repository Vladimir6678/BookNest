export default function WishlistButton({ book, wishlist = [], onToggle = () => {} }) {
  const isInWishlist = wishlist.some(b => b._id === book._id);

  return (
    <button
      className={`wishlist-btn ${isInWishlist ? "active" : ""}`}
      onClick={() => onToggle(book)}
      title={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
    >
      <FaHeart />
    </button>
  );
}
