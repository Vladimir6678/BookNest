import useFetch from "../hooks/useFetch.js";
import { useContext, useState, useEffect } from "react";
import UserContext from "../context/UserContext.jsx";

export default function useWishlist() {
  const { user } = useContext(UserContext);
  const { request } = useFetch();
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    if (!user?._id) return;

    async function fetchWishlist() {
      try {
        const data = await request(`/users/${user._id}/wishlist`, "GET", null, {
          Authorization: `Bearer ${user.accessToken}`,
        });
        setWishlist(data || []);
      } catch (err) {
        console.error("Failed to load wishlist", err);
        setWishlist([]); // fallback to empty array
      }
    }

    fetchWishlist();
  }, [user]);

  const toggleWishlist = async (book) => {
    if (!user?._id) return;

    const isInWishlist = wishlist.some(b => b._id === book._id);
    try {
      if (isInWishlist) {
        await request(`/users/${user._id}/wishlist/${book._id}`, "DELETE", null, {
          Authorization: `Bearer ${user.accessToken}`,
        });
        setWishlist(prev => prev.filter(b => b._id !== book._id));
      } else {
        await request(`/users/${user._id}/wishlist/${book._id}`, "POST", null, {
          Authorization: `Bearer ${user.accessToken}`,
        });
        setWishlist(prev => [...prev, book]);
      }
    } catch (err) {
      console.error("Failed to update wishlist", err);
    }
  };

  return { wishlist, toggleWishlist };
}
