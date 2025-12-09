import BookCard from "../books-page/book-card/BookCard.jsx";
import { useBookModal } from "../../context/ModalContext.jsx";
import BookModal from "../books-page/BookModal/BookModal.jsx";
import { useWishlistContext } from "../../context/WishlistContext.jsx";
import "./wishlist.css";

export default function Wishlist() {
    const { selectedBook, openBookModal, closeBookModal } = useBookModal();
    const { wishlist, toggleWishlist } = useWishlistContext();

    if (!wishlist || wishlist.length === 0) {
        return <p className="empty-wishlist">Your wishlist is empty.</p>;
    }

    return (
        <div className="wishlist-container">
            <h2>My Wishlist</h2>
            <div className="wishlist-grid">
                {wishlist.map((book) => (
                    <BookCard
                        key={book._id}
                        book={book}
                        wishlist={wishlist}
                        onToggleWishlist={toggleWishlist}

                        onClick={() => openBookModal(book)}

                    />
                ))}
            </div>

            {selectedBook && (
                <BookModal

                    onClose={closeBookModal}
                />
            )}
        </div>
    );
}



