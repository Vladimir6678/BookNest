import { FaHeart } from "react-icons/fa";
import { useWishlistContext } from "../../../context/WishlistContext.jsx";
import { useContext } from "react";
import UserContext from "../../../context/UserContext.jsx";


export default function WishlistButton({ book, style = {} }) { 

    const { wishlist, toggleWishlist } = useWishlistContext();
    const { user } = useContext(UserContext); 
    

    const isInWishlist = wishlist.some((w) => w.bookId === book._id);

    const handleClick = async (e) => {
        if (!user) {
            alert("Please log in to manage your wishlist.");
            return;
        }

        e.stopPropagation();
        
       
        await toggleWishlist(book); 
        
        
        console.log(`Toggled wishlist status for book: ${book.title}`); 
    };

    const buttonClassName = `wishlist-button ${isInWishlist ? 'active' : ''}`;

    return (
        <button className={buttonClassName} onClick={handleClick} style={style}>
            <FaHeart />
        </button>
    );
}