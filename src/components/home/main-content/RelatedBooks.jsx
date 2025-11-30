import "./related-books-style.css";
import { useRef, useState } from "react";
import BookCard from "../../books-page/book-card/BookCard.jsx";
import BookModal from "../../books-page/BookModal/BookModal.jsx";

export default function RelatedBooks() {
  const scrollContainerRef = useRef(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300,
        behavior: "smooth",
      });
    }
  };
  const books = [
    {
      id: 1,
      title: "The Alchemist",
      author: "Paulo Coelho",
      cover: "https://picsum.photos/200/300",
      year: 1988,
      genre: "Fiction, Adventure",
      rating: 4,
      pages: 208,
      description:
        "A mystical story of a shepherd boy's journey to discover his personal legend.",
    },
    {
      id: 2,
      title: "Atomic Habits",
      author: "James Clear",
      cover: "https://picsum.photos/200/301",
      year: 2018,
      genre: "Self-help, Productivity",
      rating: 5,
      pages: 320,
      description:
        "Tiny Changes, Remarkable Results: An Easy & Proven Way to Build Good Habits & Break Bad Ones",
    },
    {
      id: 3,
      title: "Deep Work",
      author: "Cal Newport",
      cover: "https://picsum.photos/200/302",
      year: 2016,
      genre: "Productivity, Business",
      rating: 4,
      pages: 304,
      description: "Rules for Focused Success in a Distracted World",
    },
    {
      id: 4,
      title: "Thinking, Fast and Slow",
      author: "Daniel Kahneman",
      cover: "https://picsum.photos/200/303",
      year: 2011,
      genre: "Psychology, Nonfiction",
      rating: 4,
      pages: 499,
      description:
        "Explores the two systems that drive the way we think—System 1 and System 2.",
    },
    {
      id: 1,
      title: "The Alchemist",
      author: "Paulo Coelho",
      cover: "https://picsum.photos/200/300",
      year: 1988,
      genre: "Fiction, Adventure",
      rating: 4,
      pages: 208,
      description:
        "A mystical story of a shepherd boy's journey to discover his personal legend.",
    },
    {
      id: 2,
      title: "Atomic Habits",
      author: "James Clear",
      cover: "https://picsum.photos/200/301",
      year: 2018,
      genre: "Self-help, Productivity",
      rating: 5,
      pages: 320,
      description:
        "Tiny Changes, Remarkable Results: An Easy & Proven Way to Build Good Habits & Break Bad Ones",
    },
    {
      id: 1,
      title: "The Alchemist",
      author: "Paulo Coelho",
      cover: "https://picsum.photos/200/300",
      year: 1988,
      genre: "Fiction, Adventure",
      rating: 4,
      pages: 208,
      description:
        "A mystical story of a shepherd boy's journey to discover his personal legend.",
    },
    {
      id: 2,
      title: "Atomic Habits",
      author: "James Clear",
      cover: "https://picsum.photos/200/301",
      year: 2018,
      genre: "Self-help, Productivity",
      rating: 5,
      pages: 320,
      description:
        "Tiny Changes, Remarkable Results: An Easy & Proven Way to Build Good Habits & Break Bad Ones",
    },
    {
      id: 1,
      title: "The Alchemist",
      author: "Paulo Coelho",
      cover: "https://picsum.photos/200/300",
      year: 1988,
      genre: "Fiction, Adventure",
      rating: 4,
      pages: 208,
      description:
        "A mystical story of a shepherd boy's journey to discover his personal legend.",
    },
    {
      id: 2,
      title: "Atomic Habits",
      author: "James Clear",
      cover: "https://picsum.photos/200/301",
      year: 2018,
      genre: "Self-help, Productivity",
      rating: 5,
      pages: 320,
      description:
        "Tiny Changes, Remarkable Results: An Easy & Proven Way to Build Good Habits & Break Bad Ones",
    },
  ];
  const handleBookClick = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
  };
  return (
    <>
      <main id="cards-container">
        <h1>Related Books</h1>
        <div id="cards-wrapper" ref={scrollContainerRef}>
          {books.map((book, index) => (
            <BookCard key={index} book={book} onBookClick={handleBookClick} />
          ))}
        </div>

        <div className="cards-navigation">
          <button onClick={scrollLeft} aria-label="Scroll left">
            ← Previous
          </button>
          <button onClick={scrollRight} aria-label="Scroll right">
            Next →
          </button>
        </div>
      </main>

      <BookModal
        book={selectedBook}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}
