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
        {wishlist.map((item) => (
          <BookCard
            key={item._id}
            book={{
              _id: item.bookId,
              title: item.title,
              author: item.author,
              genre: item.genre,
              imageUrl: item.imageUrl,
              pdfUrl: item.pdfUrl,
              description: item.description,
            }}
           wishlistItemId={item._id}
            onClick={() =>
              openBookModal({
                _id: item.bookId,
                title: item.title,
                author: item.author,
                genre: item.genre,
                imageUrl: item.imageUrl,
                pdfUrl: item.pdfUrl,
                description: item.description,
              })
            }
          />
        ))}
      </div>

      {selectedBook && <BookModal onClose={closeBookModal} />}
    </div>
  );
}
