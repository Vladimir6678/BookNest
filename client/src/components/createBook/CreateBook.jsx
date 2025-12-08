import "./createBook.css";
import InputField from "../input/InputField.jsx";
import useForm from "../../hooks/useForm.js";
import { useNavigate } from "react-router";
import useFetch from "../../hooks/useFetch.js";

export default function CreateBook() {
  const navigate = useNavigate();
  const { request } = useFetch();

  const handleSubmit = async (values) => {
    if (!values.title || !values.author || !values.genre || !values.description || !values.imageUrl || !values.pdfUrl) {
      return alert("All fields are required!");
    }

    try {
      await request('/data/books', 'POST', values);
      alert("Book created successfully!");
      navigate('/books');
    } catch (err) {
      alert(err.message);
    }
  };

  const { register, values, formSubmit } = useForm(handleSubmit, {
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

        <button type="submit" className="create-btn">Create Book</button>
      </form>
    </div>
  );
}

