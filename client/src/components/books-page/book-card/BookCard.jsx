
import { useWishlistContext } from "../../../context/WishlistContext.jsx";
import WishlistButton from "../../wishlist/wishlistButton/WishListButton.jsx";
import "./book-card-styles.css";

export default function BookCard({ book, onClick,}) {
 


  return (
    <div className="book-card" onClick={onClick}>
      <div className="image-wrapper">
        <img src={book.imageUrl} alt={book.title} className="book-image" />

       
        <WishlistButton
          book={book}
     
        />
      </div>
      <div className="book-info">
        <h3>{book.title}</h3>
        <p className="author">{book.author}</p>
      </div>

    </div>
  );
}

