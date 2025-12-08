import { useState, useContext } from "react";
import useFetch from "../../hooks/useFetch.js";
import UserContext from "../../context/UserContext.jsx";
import "./rating.css";

function Rating({ book, onUpdate }) {
  const [rating, setRating] = useState(book.rating || 0);
  const { request } = useFetch();
  const { user } = useContext(UserContext);

  const handleRate = async (newRating) => {
    const oldAvg = book.rating || 0;
    const count = book.ratingCount || 0;

    const newAvg = (oldAvg * count + newRating) / (count + 1);

    const updatedBook = {
      ...book,
      rating: newAvg,
      ratingCount: count + 1,
    };

    setRating(newAvg);

    if (user?.accessToken) {
      await request(
        `/data/books/${book._id}`,
        "PUT",
        updatedBook,
        { Authorization: `Bearer ${user.accessToken}` }
      );
    }

    onUpdate(updatedBook);
  };

  return (
    <>
     <p className="rating-title">Book Rating</p>

<div className="rating-stars">
  {[1, 2, 3, 4, 5].map((n) => (
    <span
      key={n}
      className={`star ${rating >= n ? "filled" : ""}`}
      onClick={() => handleRate(n)}
    >
      ★
    </span>
  ))}
  <span className="rating-number">{rating.toFixed(1)}</span>
</div>
    </>
    
  );
}

export default Rating;


