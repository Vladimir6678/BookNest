import { useState } from "react";
import "./createBook.css";

export default function CreateBook() {
  const [values, setValues] = useState({
    title: "",
    author: "",
    description: "",
    pdfUrl: "",
  });

  function handleChange(e) {
    setValues(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!values.title || !values.author || !values.description || !values.pdfUrl) {
      return alert("All fields are required!");
    }

    console.log("Submitted book:", values);

    alert("Book created successfully!");
  }

  return (
    <div className="create-container">
      <form className="create-form" onSubmit={handleSubmit}>
        <h2>Add a New Book</h2>

        <label>Book Title</label>
        <input
          type="text"
          name="title"
          placeholder="Enter book title"
          value={values.title}
          onChange={handleChange}
        />

        <label>Author</label>
        <input
          type="text"
          name="author"
          placeholder="Enter author's name"
          value={values.author}
          onChange={handleChange}
        />

        <label>Description</label>
        <textarea
          name="description"
          placeholder="Short summary of the book"
          value={values.description}
          onChange={handleChange}
        ></textarea>

        <label>PDF File URL</label>
        <input
          type="text"
          name="pdfUrl"
          placeholder="Paste a PDF link here"
          value={values.pdfUrl}
          onChange={handleChange}
        />

        <button type="submit" className="create-btn">Create Book</button>
      </form>
    </div>
  );
}
