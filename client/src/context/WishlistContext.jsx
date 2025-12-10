import { createContext, useContext, useState, useEffect } from "react";
import useFetch from "../hooks/useFetch.js";
import UserContext from "./UserContext.jsx";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const contextValue = useWishlistLogic();
  return (
    <WishlistContext.Provider value={contextValue}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlistContext() {
  return useContext(WishlistContext);
}

function useWishlistLogic() {
  const { request } = useFetch();
  const { user } = useContext(UserContext);
  const [wishlist, setWishlist] = useState([]);

  // Load wishlist for the current user
  const loadWishlist = async () => {
    if (!user || !user.accessToken) {
      setWishlist([]);
      return;
    }

    try {
      // SoftUni API: get wishlist items by owner
      const data = await request(
        `/data/wishlist?where=_ownerId%3D"${user._id}"`,
        "GET",
        null,
        { accessToken: user.accessToken }
      );
      setWishlist(data);
    } catch (err) {
      console.error("Failed to load wishlist:", err);
      setWishlist([]);
    }
  };

  useEffect(() => {
    loadWishlist();
  }, [user]);

  // Add book with full info
  const addToWishlist = async (book) => {
    if (!user || !user.accessToken) return;

    try {
      const postData = {
        bookId: book._id,
        title: book.title,
        author: book.author,
        genre: book.genre,
        imageUrl: book.imageUrl,
        pdfUrl: book.pdfUrl,
        description: book.description,
      };

      const newItem = await request("/data/wishlist", "POST", postData, {
        accessToken: user.accessToken,
      });
      setWishlist((prev) => [...prev, newItem]);
    } catch (err) {
      console.error("Failed to add book:", err);
      alert("Failed to add book to wishlist.");
    }
  };

  // Remove from wishlist by wishlist item ID
  const removeFromWishlist = async (wishlistItemId) => {
    if (!user || !user.accessToken) return;

    try {
      await request(`/data/wishlist/${wishlistItemId}`, "DELETE", null, {
        accessToken: user.accessToken,
      });
      setWishlist((prev) => prev.filter((item) => item._id !== wishlistItemId));
    } catch (err) {
      console.error("Failed to remove book:", err);
      alert("Failed to remove book from wishlist.");
    }
  };

  const toggleWishlist = async (book, wishlistItemId) => {
    if (!user || !user.accessToken) {
      alert("Please log in to manage your wishlist.");
      return;
    }

    if (wishlistItemId) {
      await removeFromWishlist(wishlistItemId);
    } else {
      await addToWishlist(book);
    }
  };

  return { wishlist, toggleWishlist, loadWishlist };
}
