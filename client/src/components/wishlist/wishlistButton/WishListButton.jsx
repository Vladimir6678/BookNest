import { FaHeart } from "react-icons/fa";
import { useWishlistContext } from "../../../context/WishlistContext.jsx";
import { useContext } from "react";
import UserContext from "../../../context/UserContext.jsx";
import "./wishlist-button.css";

export default function WishlistButton({ book, style = {} }) {
  const { wishlist, toggleWishlist } = useWishlistContext();
  const { user } = useContext(UserContext);

  const wishlistItem = wishlist.find((w) => w.bookId === book._id);

  const isInWishlist = !!wishlistItem;

  const handleClick = async (e) => {
    e.stopPropagation();

    if (!user || !user.accessToken) {
      alert("Please log in to manage your wishlist.");
      return;
    }

    await toggleWishlist(book, wishlistItem?._id);
  };

  const buttonClassName = `wishlist-button ${isInWishlist ? "active" : ""}`;

  return (
    <button className={buttonClassName} onClick={handleClick} style={style}>
      <FaHeart />
    </button>
  );
}
