import BookFilter from "../book-filter-component/BookFilter.jsx";
import ScrollableSection from "../scrollable-component/ScrollableSection.jsx";
import BookModal from "../BookModal/BookModal.jsx";
import { getTrendingBooks } from "../../../../utills/getTrendingBooks.js";
import "./dashboard-styles.css";

import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import useFetch from "../../../hooks/useFetch.js";
import UserContext from "../../../context/UserContext.jsx";

export default function Books() {
  const navigate = useNavigate();
  const { request } = useFetch();
  const { user, isAuthenticated } = useContext(UserContext)

  const [books, setBooks] = useState([]);
  const [latest, setLatest] = useState([]);
  const [popular, setPopular] = useState([]);
  const [authors, setAuthors] = useState([]);

  const [selectedView, setSelectedView] = useState("default")
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {


    async function loadingBooks() {
      try {
        const result = await request("/data/books", "GET");
        setBooks(result);
        setLatest(result.slice(-7).reverse());
        const trending = getTrendingBooks(result, 5);
        setPopular(trending.slice(-7).reverse());

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

      } catch (error) {
        alert("Failed to load books.");
      }
    }
    loadingBooks();

  }, [])

  const handleRatingUpdate = (updatedBook) => {

    const updatedBooks = books.map(b =>
      b._id === updatedBook._id ? updatedBook : b
    );

    setBooks(updatedBooks);

    const trending = getTrendingBooks(updatedBooks);
    setPopular(trending);
    setSelectedBook(updatedBook);
  };


  const handleFilterChange = (selectedGenres) => {
    console.log("Selected genres:", selectedGenres);
  };

  const handleBookClick = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);

    navigate(`/books/${book._id}/details`)
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
              Oops! There are no books available at the moment. Check back
              later!
            </p>
          ) : (
            <section className="book-grid">
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
                    data={popular}
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
            </section>
          )}
        </article>
      </main>

      <BookModal
        book={selectedBook}
        isOpen={isModalOpen}
        onUpdate={handleRatingUpdate}
        setBook={setSelectedBook}
        onClose={handleCloseModal}
        isOwner={selectedBook?._ownerId === user?._id}
        isAuth={isAuthenticated}
      />
    </>
  );
}
