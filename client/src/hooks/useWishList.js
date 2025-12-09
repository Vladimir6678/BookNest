import { useState, useEffect, useContext } from "react";
import useFetch from "./useFetch.js";
import UserContext from "../context/UserContext.jsx";

export default function useWishlist() {
  const { request } = useFetch();
  const { user } = useContext(UserContext);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    if (user?.accessToken) {
      loadWishlist();
    } else {
      setWishlist([]);
    }
  }, [user?.accessToken, request]);

  const loadWishlist = async () => {
    try {
      const data = await request("/data/wishlist", "GET");
      setWishlist(data || []);
    } catch (error) {
      console.error("Failed to load wishlist:", error);
      setWishlist([]);
    }
  };

  const toggleWishlist = async (book) => {
    if (!user?.accessToken) {
      alert("Please log in to manage your wishlist.");
      return;
    }

    const isInWishlist = wishlist.some((b) => b._id === book._id);

    try {
      if (isInWishlist) {
        await request(`/data/wishlist/${book._id}`, "DELETE");
        setWishlist((prev) => prev.filter((b) => b._id !== book._id));
      } else {
        await request("/data/wishlist", "POST", { bookId: book._id });
        setWishlist((prev) => [...prev, book]);
      }
    } catch (error) {
      console.error(`Failed to ${isInWishlist ? "remove from" : "add to"} wishlist:`, error);
      alert("Failed to update wishlist. Please try again.");
      loadWishlist();
    }
  };

  return { wishlist, toggleWishlist };
}
