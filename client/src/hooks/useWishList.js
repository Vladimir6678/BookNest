import { useContext, useEffect, useState, useRef, useCallback } from "react";
import UserContext from "../context/UserContext.jsx";
import useFetch from "./useFetch.js";

export default function useWishlist() {
    const { user } = useContext(UserContext);
    const { request } = useFetch();
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const mountedRef = useRef(true);

    useEffect(() => {
        mountedRef.current = true;
        return () => (mountedRef.current = false);
    }, []);

    const fetchWishlist = useCallback(async () => {
        if (!user?._id) {
            setWishlist([]);
            setLoading(false);
            return;
        }

        try {
            const data = await request(`/users/${user._id}/wishlist`, "GET", null, {
                accessToken: user.accessToken,
            });

            if (mountedRef.current) {
                setWishlist(Array.isArray(data) ? data : []);
            }
        } catch (err) {
            console.error("wishlist fetch error", err);
        } finally {
            if (mountedRef.current) setLoading(false);
        }
    }, [user, request]);

    useEffect(() => {
        fetchWishlist();
    }, [fetchWishlist]);

    const toggleWishlist = async (book) => {
        if (!user?._id) return [];

        const exists = wishlist.some((x) => x._id === book._id);
        const prev = wishlist;
        const newWishlist = exists ? prev.filter((b) => b._id !== book._id) : [...prev, book]

        setWishlist(newWishlist);

        try {
            if (exists) {
                await request(
                    `/users/${user._id}/wishlist/${book._id}`,
                    "DELETE",
                    null,
                    { accessToken: user.accessToken }
                );
            } else {
                await request(
                    `/users/${user._id}/wishlist/${book._id}`,
                    "POST",
                    null,
                    { accessToken: user.accessToken }
                );
            }
        } catch (err) {
            console.error("wishlist toggle error:", err);

            if (mountedRef.current) setWishlist(prev);
            return prev
        }
        return newWishlist;
    };

    return { wishlist, loading, toggleWishlist };
}
