import { useState, useEffect, useContext } from "react";
import useFetch from "../../hooks/useFetch.js";
import UserContext from "../../context/UserContext.jsx";

function Rating({ book, onUpdate }) {
  const [rating, setRating] = useState(book.rating || 0);
  const [hovered, setHovered] = useState(0);
  const { request } = useFetch();
  const { user } = useContext(UserContext);

  useEffect(() => {
    setRating(book.rating || 0);
  }, [book.rating]);

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
    await request(`/data/books/${book._id}`, "PUT", updatedBook, {'X-Authorization': user.accessToken});
  }

  onUpdate(updatedBook);
};
  return (
    <div className="rating-component">
      <p>Rating:</p>
      <div className="rating-stars">
        {[1, 2, 3, 4, 5].map((n) => (
          <span
            key={n}
            className={`star ${n <= (hovered || rating) ? "hovered" : ""}`}
            onClick={() => handleRate(n)}
            onMouseEnter={() => setHovered(n)}
            onMouseLeave={() => setHovered(0)}
          >
            ★
          </span>
        ))}
      </div>
      <span className="rating-number">{rating.toFixed(1)}</span>
    </div>
  );
}

export default Rating;
