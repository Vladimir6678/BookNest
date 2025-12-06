import "./createBook.css";
import InputField from "../input/Input.jsx";
import useForm from "../../hooks/useForm.js";
import { useNavigate } from "react-router";
import useFetch from "../../hooks/useFetch.js";

export default function CreateBook() {
  const navigate = useNavigate();
  const { request } = useFetch();



  async function handleSubmit(values) {
    const bookData = values

    if (!bookData.title || !bookData.author || !bookData.genre || !bookData.description || !bookData.imageUrl || !bookData.pdfUrl) {
      return alert("All fields are required!");
    }

    try {
      await request('/data/books', 'POST', bookData);
      alert("Book created successfully!");
      navigate('/books');
    } catch (err) {
      alert(err.message)
    }
  };
  const {
    register,
    formSubmit,
  } = useForm(handleSubmit, {
    title: '',
    author: '',
    genre: '',
    imageUrl: '',
    description: '',
    pdfUrl: '',
  });

  return (
    <div className="create-container">
      <form className="create-form" action={formSubmit}>
        <h2>Add a New Book</h2>

        <InputField
          label="Book Title"
          type="text"
          placeholder="Enter book title"
          {...register("title")}
        />

        <InputField
          label="Author"
          type="text"
          placeholder="Author's name"
          {...register("author")}
        />

        <InputField
          label="Genre"
          type="text"
          placeholder="Genre"
          {...register("genre")}

        />

        <InputField
          label="Image URL"
          type="text"
          placeholder="URL of the book cover"
          {...register("imageUrl")}
        />

        <div className="form-group">
          <label>Description</label>
          <textarea
            placeholder="Short summary of the book"
            {...register("description")}
          ></textarea>
        </div>

        <InputField
          label="PDF File URL"
          type="text"
          placeholder="Paste a PDF link here"
          {...register("pdfUrl")}
        />

        <button type="submit" className="create-btn">Create Book</button>
      </form>
    </div>
  );
}
