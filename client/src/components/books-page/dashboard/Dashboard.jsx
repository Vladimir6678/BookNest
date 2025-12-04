import BookFilter from "../book-filter-component/BookFilter.jsx";
import ScrollableSection from "../scrollable-component/ScrollableSection.jsx";
import BookModal from "../BookModal/BookModal.jsx";
import "./dashboard-styles.css";

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import useFetch from "../../../hooks/useFetch.js";

export default function Books() {
  const navigate = useNavigate();
  const { request } = useFetch();
  const { id } = useParams();

  const [books, setBooks] = useState([]);
  const [latest, setLatest] = useState([]);
  const [authors, setAuthors] = useState([]);

  const [selectedView, setSelectedView] = useState("default")
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {


    async function loadingBooks() {
      try {
        const result = await request("/data/books", "GET");
        setBooks(result);
        setLatest(result.slice(7));

        const uniqueAuthors = [
          ...new Map(
            result.map((b) => [
              b.author,
              {
                authorName: b.author,
                booksCount: result.filter((x) => x.author === b.author).length,
              },
            ])
          ).values(),
        ];
        setAuthors(uniqueAuthors);
        alert("Failed to load books.");
      } catch (error) {

      }
    }
    loadingBooks();

  }, [])

  const handleFilterChange = (selectedGenres) => {
    console.log("Selected genres:", selectedGenres);
  };

  const handleBookClick = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);

    navigate(`/books/${books._id}/details`)
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null);

    navigate('/books')
  };


  return (
    <>
      <main id="main-books-page">
        <article className="filter-site">
          <BookFilter onFilterChange={handleFilterChange} />
                  {books.length === 0 ? (
              <p className="no-books-message">
                Oops! There are no books available at the moment. Check back later!
              </p>
            ): <section className="book-grid">
            <h2>Explore Books</h2>
          


            <div className="search-controls">
              <input
                type="text"
                placeholder="Search by title, author, or genre"
                className="search-bar"
              />

              <select
                className="view-select"
                value={selectedView}
                onChange={(e) => setSelectedView(e.target.value)}
              >
                <option value="default">Default View</option>
                <option value="all">All Books</option>
              </select>
            </div>


            {selectedView === "default" ? (
              <>
                <ScrollableSection
                  sectionTitle="Most Popular Books"
                  data={books}
                  component="BookCard"
                  onItemClick={handleBookClick}
                  />

                <ScrollableSection
                  sectionTitle="New Book Arrivals"
                  data={latest}
                  component="BookCard"
                  onItemClick={handleBookClick}
                />

                <ScrollableSection
                  sectionTitle="Authors"
                  data={authors}
                  component="AuthorCard"
                />
              </>
            ) : (
              <ScrollableSection
                sectionTitle="All Books"
                data={books}
                component="BookCard"
                onItemClick={handleBookClick}
              />
            )}
          </section>}
        
        </article>
      </main>

      <BookModal
        book={selectedBook}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}
