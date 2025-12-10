import InputField from "../input/InputField.jsx";
import { useNavigate, useParams } from "react-router";
import useFetch from "../../hooks/useFetch.js";
import { useEffect, useState } from "react";
import "./edit-book.css";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import storage from "../../firebase/firebase.js";

export default function EditBook() {
  const navigate = useNavigate();
  const { request } = useFetch();
  const { bookId } = useParams();

  const [isLoading, setIsLoading] = useState(true);

  const [newImage, setNewImage] = useState(null);
  const [newPdf, setNewPdf] = useState(null);

  const [formValues, setFormValues] = useState({
    title: "",
    author: "",
    genre: "",
    imageUrl: "",
    description: "",
    pdfUrl: ""
  });

  useEffect(() => {
    async function fetchBook() {
      try {
        const bookData = await request(`/data/books/${bookId}`, "GET");

        setFormValues({
          title: bookData.title,
          author: bookData.author,
          genre: bookData.genre,
          imageUrl: bookData.imageUrl,
          description: bookData.description,
          pdfUrl: bookData.pdfUrl
        });

        setIsLoading(false);

      } catch (err) {
        alert("Failed to load book data");
        navigate("/books");
      }
    }
    fetchBook();
  }, [bookId, request, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormValues((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formValues.title ||
      !formValues.author ||
      !formValues.genre ||
      !formValues.description
    ) {
      return alert("All fields are required!");
    }

    try {
      let finalImageUrl = formValues.imageUrl;
      let finalPdfUrl = formValues.pdfUrl;

      if (newImage) {
        const imgRef = ref(storage, "book-covers/" + newImage.name);
        await uploadBytes(imgRef, newImage);
        finalImageUrl = await getDownloadURL(imgRef);
      }

      if (newPdf) {
        const pdfRef = ref(storage, "book-pdfs/" + newPdf.name);
        await uploadBytes(pdfRef, newPdf);
        finalPdfUrl = await getDownloadURL(pdfRef);
      }

      const updatedBook = {
        ...formValues,
        imageUrl: finalImageUrl,
        pdfUrl: finalPdfUrl
      };

      await request(`/data/books/${bookId}`, "PUT", updatedBook);

      
      navigate("/books");

    } catch (err) {
      alert(err.message);
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="create-container">
      <form className="create-form" onSubmit={handleSubmit}>
        <h2>Edit Book</h2>

        <InputField name="title" label="Book Title" value={formValues.title} onChange={handleInputChange} />
        <InputField name="author" label="Author" value={formValues.author} onChange={handleInputChange} />
        <InputField name="genre" label="Genre" value={formValues.genre} onChange={handleInputChange} />
        <InputField
          label="New Image File (optional)"
          type="file"
          accept=".jpg,.jpeg,.png,.webp,.svg,.gif"
          onChange={(e) => setNewImage(e.target.files[0])}
        />

        {(newImage || formValues.imageUrl) && (
          <div className="image-preview">
            <img
              src={newImage ? URL.createObjectURL(newImage) : formValues.imageUrl}
              alt="Book Preview"
            />
          </div>
        )}

       
        <InputField
          label="New PDF File (optional)"
          type="file"
          accept=".pdf"
          onChange={(e) => setNewPdf(e.target.files[0])}
        />

        {newPdf && (
          <p style={{ marginTop: "-10px", color: "green" }}>
            Selected PDF: <strong>{newPdf.name}</strong>
          </p>
        )}

        {formValues.pdfUrl && !newPdf && (
          <p>
            Current PDF:{" "}
            <a href={formValues.pdfUrl} target="_blank" rel="noreferrer">
              Open PDF
            </a>
          </p>
        )}

        <InputField
          textarea
          label="Description"
          name="description"
          value={formValues.description}
          onChange={handleInputChange}
        />

        <div className="button-group">
          <button className="create-btn">Update Book</button>
          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate(`/books/${bookId}/details`)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
