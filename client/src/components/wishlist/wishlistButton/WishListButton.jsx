import { FaHeart } from "react-icons/fa";

export default function WishlistButton({ book, wishlist = [], onToggle }) {
    const isInWishlist = wishlist.some((b) => b._id === book._id);

    const handleClick = async (e) => {
        e.stopPropagation();

      
        const updatedWishlist = await onToggle(book);

        console.log("Toggled wishlist for book:", book.title);
        console.log("Updated wishlist:", updatedWishlist.map(b => b.title));
    };

    return (
        <button
            className={`wishlist-btn ${isInWishlist ? "active" : ""}`}
            onClick={handleClick}
            title={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
            <FaHeart />
        </button>
    );
}
