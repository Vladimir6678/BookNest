import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import BookFilter from "../book-filter-component/BookFilter.jsx";
import ScrollableSection from "../scrollable-component/ScrollableSection.jsx";
import BookModal from "../BookModal/BookModal.jsx";
import { getTrendingBooks } from "../../../../utills/getTrendingBooks.js";
import useFetch from "../../../hooks/useFetch.js";
import UserContext from "../../../context/UserContext.jsx";
import { useBookModal } from "../../../context/ModalContext.jsx";
import "./dashboard-styles.css";

export default function Books({ wishlist, onToggleWishlist }) {
  const navigate = useNavigate();
  const { request } = useFetch();
  const { user, isAuthenticated } = useContext(UserContext);
  const { selectedBook, openBookModal, closeBookModal } = useBookModal();

  const [books, setBooks] = useState([]);
  const [latest, setLatest] = useState([]);
  const [popular, setPopular] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [selectedView, setSelectedView] = useState("default");

  useEffect(() => {
    async function loadBooks() {
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
      } catch {
        alert("Failed to load books.");
      }
    }
    loadBooks();
  }, [request]);

  const handleRatingUpdate = (updatedBook) => {
    const updatedBooks = books.map((b) =>
      b._id === updatedBook._id ? updatedBook : b
    );
    setBooks(updatedBooks);
    setPopular(getTrendingBooks(updatedBooks));
  };

  const handleFilterChange = (selectedGenres) => {
    console.log("Selected genres:", selectedGenres);
  };

  const handleBookClick = (book) => {
    openBookModal(book);
    navigate(`/books/${book._id}/details`);
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
                    wishlist={wishlist} 
                    onToggleWishlist={onToggleWishlist} 
                  />
                  <ScrollableSection
                    sectionTitle="New Book Arrivals"
                    data={latest}
                    component="BookCard"
                    onItemClick={handleBookClick}
                    wishlist={wishlist} 
                    onToggleWishlist={onToggleWishlist} 

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
                  wishlist={wishlist} 
                    onToggleWishlist={onToggleWishlist} 
                />
              )}
            </section>
          )}
        </article>
      </main>

      {selectedBook && (
        <BookModal
          wishlist={wishlist}
          onWishlistToggle={onToggleWishlist}
          onUpdate={handleRatingUpdate}
          isAuth={isAuthenticated}
          isOwner={selectedBook?._ownerId === user?._id}
          onClose={closeBookModal}
        />
      )}
    </>
  );
}


