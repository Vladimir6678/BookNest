import { useEffect } from "react";
import useForm from "../../hooks/useForm.js";
import useFetch from "../../hooks/useFetch.js";
import UserContext from "../../context/UserContext.jsx";
import { useContext } from "react";
import "./rating.css"; 


export default function Rating({ book, setBook }) {
  const { request } = useFetch();
  const { user } = useContext(UserContext);

  const { values, register, setValues, formSubmit } = useForm(
    async (formData) => {
      if (!user) return alert("Please log in to rate the book.");

      try {
        const updatedBook = {
          ...book,
          rating: formData.rating,
          ratingCount: (book.ratingCount || 0) + 1,
        };

        const res = await request(
          `/data/books/${book._id}`,
          "PUT",
          updatedBook,
          { Authorization: `Bearer ${user.accessToken}` }
        );

        if (setBook) setBook(res);
      } catch (err) {
        console.error(err);
        alert("Failed to submit rating: " + err.message);
      }
    },
    { rating: book.rating || 0 }
  );

  useEffect(() => {
    setValues({ rating: book.rating || 0 });
  }, [book, setValues]);

  const handleStarClick = (star) => {
    register("rating").onChange({ target: { name: "rating", value: star } });
    formSubmit();
  };

  return (
    <div className="rating-container">
      <div className="stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => handleStarClick(star)}
            className={`star ${values.rating >= star ? "active" : ""} ${
              !user ? "disabled" : ""
            }`}
          >
            ★
          </span>
        ))}
      </div>
      <p className="rating-info">
        Rating: {values.rating} / 5 ({book.ratingCount || 0} ratings)
      </p>
    </div>
  );
}

