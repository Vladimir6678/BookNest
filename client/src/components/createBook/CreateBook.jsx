import "./createBook.css";
import InputField from "../input/InputField.jsx";
import { useNavigate } from "react-router";
import useFetch from "../../hooks/useFetch.js";
import GenreDropdown from "../genre-dropdown/GenreDropDown.jsx";
import { useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import storage from "../../firebase/firebase.js";

export default function CreateBook() {
  const navigate = useNavigate();
  const { request } = useFetch();

  const [image, setImage] = useState(null);
  const [pdf, setPdf] = useState(null);

  const [formValues, setFormValues] = useState({
    title: "",
    author: "",
    genre: "",
    description: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formValues.title ||
      !formValues.author ||
      !formValues.genre ||
      !formValues.description ||
      !image ||
      !pdf
    ) {
      return alert("All fields are required!");
    }

    try {
   
      const imageRef = ref(storage, "book-covers/" + image.name);
      await uploadBytes(imageRef, image);
      const imageUrl = await getDownloadURL(imageRef);

    
      const pdfRef = ref(storage, "book-pdfs/" + pdf.name);
      await uploadBytes(pdfRef, pdf);
      const pdfUrl = await getDownloadURL(pdfRef);

      const data = {
        ...formValues,
        imageUrl,
        pdfUrl
      };

      await request("/data/books", "POST", data);

      alert("Book created successfully!");
      navigate("/books");

    } catch (err) {
      alert(err.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormValues((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="create-container">
      <form className="create-form" onSubmit={handleSubmit}>
        <h2>Add a New Book</h2>

        <InputField label="Book Title" name="title" value={formValues.title} onChange={handleInputChange} />
        <InputField label="Author" name="author" value={formValues.author} onChange={handleInputChange} />

        <GenreDropdown
          value={formValues.genre}
          onChange={(genre) => setFormValues((prev) => ({ ...prev, genre }))}
        />

        <InputField
          label="Image File"
          type="file"
          accept=".jpg,.jpeg,.png,.webp,.svg,.gif"
          onChange={(e) => setImage(e.target.files[0])}
        />

        {image && (
          <div className="image-preview">
            <img src={URL.createObjectURL(image)} />
          </div>
        )}

        <InputField
          label="PDF File"
          type="file"
          accept=".pdf"
          onChange={(e) => setPdf(e.target.files[0])}
        />

        <InputField
          label="Description"
          textarea
          name="description"
          value={formValues.description}
          onChange={handleInputChange}
        />

        <button className="create-btn">Create Book</button>
      </form>
    </div>
  );
}
