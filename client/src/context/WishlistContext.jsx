import { createContext, useContext, useState, useEffect } from "react";
import useFetch from "../hooks/useFetch.js";
import UserContext from "./UserContext.jsx";

const WishlistContext = createContext();

function useWishlistLogic() {
    const { request } = useFetch();
    const { user } = useContext(UserContext);
    const [wishlist, setWishlist] = useState([]);

    const loadWishlist = async () => {
        if (!user || !user.accessToken) {
            setWishlist([]);
            return;
        }
        try {
            const data = await request('/data/wishlist', 'GET', null, {
                Authorization: `Bearer ${user.accessToken}`,
            });
            setWishlist(data);
        } catch (error) {
            console.error("Failed to load wishlist:", error);
            setWishlist([]);
        }
    };

    useEffect(() => {
        loadWishlist();
    }, [user, request]);

    const toggleWishlist = async (book) => {
        if (!user || !user.accessToken) {
            alert("Please log in to manage your wishlist.");
            return wishlist;
        }

        const wishlistItem = wishlist.find((w) => w.bookId === book._id);

        if (wishlistItem) {

            const wishlistItemIdToDelete = wishlistItem._id;

            const method = 'DELETE';
            const endpoint = `/data/wishlist/${wishlistItemIdToDelete}`;

            setWishlist(w => w.filter(item => item._id !== wishlistItemIdToDelete));

            try {
                await request(endpoint, method, null, {
                    Authorization: `Bearer ${user.accessToken}`,
                });
            } catch (error) {
                console.error("Failed to remove book:", error);
                alert("Failed to update wishlist. Please try again.");
                loadWishlist();
            }
        } else {
            const method = 'POST';
            const endpoint = '/data/wishlist';

            const postData = {
                bookId: book._id,
                title: book.title,
                imageUrl: book.imageUrl,
            };

            setWishlist(w => [...w, postData]);

            try {
                const newWishlistItem = await request(endpoint, method, postData, {
                    Authorization: `Bearer ${user.accessToken}`,
                });


                setWishlist(w => {
                    return w.map(item => item.bookId === book._id && item._id === undefined ? newWishlistItem : item);
                });

            } catch (error) {
                console.error("Failed to add book:", error);
                alert("Failed to update wishlist. Please try again.");
                loadWishlist();
            }
        }
    };

    return { wishlist, toggleWishlist, loadWishlist };
}


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