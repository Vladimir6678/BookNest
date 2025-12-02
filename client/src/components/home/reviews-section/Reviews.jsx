import "./reviews-styles.css";
import { useState } from "react";

export default function Reviews() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleRatingClick = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleMouseEnter = (index) => {
    setHover(index);
  };

  const handleMouseLeave = () => {
    setHover(0);
  };

  return (
    <>
      <article id="reviews-section">
        <h1>User Reviews</h1>

        <section id="reviews-content">
          <h2>Leave a Review</h2>

          <div className="star-rating">
            {[5, 4, 3, 2, 1].map((star) => (
              <>
                <input
                  key={`input-${star}`}
                  type="radio"
                  id={`star${star}`}
                  name="rating"
                  value={star}
                  checked={rating === star}
                  onChange={() => handleRatingClick(star)}
                />
                <label
                  key={`label-${star}`}
                  htmlFor={`star${star}`}
                  onMouseEnter={() => handleMouseEnter(star)}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    color: star <= (hover || rating) ? "#ffd700" : "#ddd",
                  }}
                >
                  ★
                </label>
              </>
            ))}

            <div className="rating-value">
              {rating > 0
                ? `You rated: ${rating} star${rating > 1 ? "s" : ""}`
                : "Select your rating"}
            </div>
          </div>

          <div id="input-review">
            <input type="text" placeholder="Write your review here..." />
          </div>
          <div id="submit-review-section">
            <p>{new Date().toLocaleString()}</p>
            <button id="submit-review-button" type="submit">
              Submit Review
            </button>
          </div>
        </section>
      </article>
    </>
  );
}
