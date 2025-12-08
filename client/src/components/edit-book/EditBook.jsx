import InputField from "../input/InputField.jsx";
import useForm from "../../hooks/useForm.js";
import { useNavigate, useParams } from "react-router";
import useFetch from "../../hooks/useFetch.js";
import { useEffect, useState } from "react";
import "./edit-book.css";

export default function EditBook() {
  const navigate = useNavigate();
  const { request } = useFetch();
  const { bookId } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  const handleSubmit = async (values) => {
    if (!values.title || !values.author || !values.genre || !values.description || !values.imageUrl || !values.pdfUrl) {
      return alert("All fields are required!");
    }

    try {
      await request(`/data/books/${bookId}`, 'PUT', values);
      alert("Book updated successfully!");
      navigate(`/books`);
    } catch (err) {
      alert(err.message);
    }
  };

  const { register, values, setValues, formSubmit } = useForm(handleSubmit, {
    title: '',
    author: '',
    genre: '',
    imageUrl: '',
    description: '',
    pdfUrl: '',
  });

  useEffect(() => {
    async function fetchBook() {
      try {
        const bookData = await request(`/data/books/${bookId}`, 'GET');
        setValues({
          title: bookData.title,
          author: bookData.author,
          genre: bookData.genre,
          imageUrl: bookData.imageUrl,
          description: bookData.description,
          pdfUrl: bookData.pdfUrl,
        });
        setIsLoading(false);
      } catch (err) {
        alert("Failed to load book data");
        navigate('/books');
      }
    }
    fetchBook();
  }, [bookId, request, setValues, navigate]);

  if (isLoading) return <p>Loading book data...</p>;

  return (
    <div className="create-container">
      <form className="create-form" action={formSubmit}>
        <h2>Edit Book</h2>

        <InputField label="Book Title" type="text" placeholder="Enter book title" {...register("title")} />
        <InputField label="Author" type="text" placeholder="Author's name" {...register("author")} />
        <InputField label="Genre" type="text" placeholder="Genre" {...register("genre")} />
        <InputField label="Image URL" type="text" placeholder="URL of the book cover" {...register("imageUrl")} />

        {values.imageUrl && (
          <div className="image-preview">
            <img
              src={values.imageUrl}
              alt="Book Preview"
              onError={(e) => e.target.src = 'https://via.placeholder.com/200x300?text=No+Image'}
            />
          </div>
        )}

        <InputField label="Description" placeholder="Short summary of the book" textarea {...register("description")} />
        <InputField label="PDF File URL" type="text" placeholder="Paste a PDF link here" {...register("pdfUrl")} />

        <div className="button-group">
          <button type="submit" className="create-btn">Update Book</button>
          <button type="button" className="cancel-btn" onClick={() => navigate(`/books/${bookId}/details`)}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
