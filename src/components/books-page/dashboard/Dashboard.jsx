import BookFilter from "../book-filter-component/BookFilter.jsx";
import ScrollableSection from "../scrollable-component/ScrollableSection.jsx";
import BookModal from "../BookModal/BookModal.jsx";
import "./dashboard-styles.css";
import { useState } from "react";

export default function Books() {
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFilterChange = (selectedGenres) => {
    console.log("Selected genres:", selectedGenres);
  };

  const handleBookClick = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
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
      id: 5,
      title: "The Psychology of Money",
      author: "Morgan Housel",
      cover: "https://picsum.photos/200/304",
      year: 2020,
      genre: "Finance, Psychology",
      rating: 5,
      pages: 256,
      description: "Timeless lessons on wealth, greed, and happiness.",
    },
    {
      id: 6,
      title: "Sapiens",
      author: "Yuval Noah Harari",
      cover: "https://picsum.photos/200/305",
      year: 2014,
      genre: "History, Anthropology",
      rating: 4,
      pages: 443,
      description: "A Brief History of Humankind",
    },
    {
      id: 7,
      title: "The 7 Habits of Highly Effective People",
      author: "Stephen R. Covey",
      cover: "https://picsum.photos/200/306",
      year: 1989,
      genre: "Self-help, Business",
      rating: 4,
      pages: 372,
      description: "Powerful lessons in personal change",
    },
    {
      id: 8,
      title: "The Power of Now",
      author: "Eckhart Tolle",
      cover: "https://picsum.photos/200/307",
      year: 1997,
      genre: "Spirituality, Self-help",
      rating: 4,
      pages: 236,
      description: "A Guide to Spiritual Enlightenment",
    },
    {
      id: 9,
      title: "Dune",
      author: "Frank Herbert",
      cover: "https://picsum.photos/200/308",
      year: 1965,
      genre: "Science Fiction",
      rating: 5,
      pages: 412,
      description:
        "A epic science fiction novel set in the distant future amidst a feudal interstellar society.",
    },
    {
      id: 10,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      cover: "https://picsum.photos/200/309",
      year: 1960,
      genre: "Fiction, Classic",
      rating: 5,
      pages: 281,
      description:
        "A gripping story of racial injustice and childhood innocence in the American South.",
    },
    {
      id: 11,
      title: "1984",
      author: "George Orwell",
      cover: "https://picsum.photos/200/310",
      year: 1949,
      genre: "Dystopian, Classic",
      rating: 4,
      pages: 328,
      description:
        "A dystopian social science fiction novel and cautionary tale.",
    },
    {
      id: 12,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      cover: "https://picsum.photos/200/311",
      year: 1925,
      genre: "Fiction, Classic",
      rating: 4,
      pages: 180,
      description:
        "A classic novel of the Jazz Age, exploring themes of idealism and excess.",
    },
    {
      id: 13,
      title: "Pride and Prejudice",
      author: "Jane Austen",
      cover: "https://picsum.photos/200/312",
      year: 1813,
      genre: "Romance, Classic",
      rating: 5,
      pages: 432,
      description:
        "A romantic novel of manners that depicts the emotional development of protagonist Elizabeth Bennet.",
    },
  ];

  const authors = [
    {
      authorName: "Paulo Coelho",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
      booksCount: 25,
    },
    {
      authorName: "James Clear",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
      booksCount: 3,
    },
    {
      authorName: "Cal Newport",
      avatar:
        "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=200&h=200&fit=crop&crop=face",
      booksCount: 7,
    },
    {
      authorName: "Daniel Kahneman",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
      booksCount: 5,
    },
    {
      authorName: "Morgan Housel",
      avatar:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop&crop=face",
      booksCount: 2,
    },
    {
      authorName: "Yuval Noah Harari",
      avatar:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=200&h=200&fit=crop&crop=face",
      booksCount: 8,
    },
    {
      authorName: "Stephen R. Covey",
      avatar:
        "https://images.unsplash.com/photo-1517070208541-6ddc4d3efbcb?w=200&h=200&fit=crop&crop=face",
      booksCount: 12,
    },
    {
      authorName: "Eckhart Tolle",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
      booksCount: 6,
    },
    {
      authorName: "Frank Herbert",
      avatar:
        "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=200&h=200&fit=crop&crop=face",
      booksCount: 15,
    },
    {
      authorName: "Harper Lee",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
      booksCount: 2,
    },
    {
      authorName: "George Orwell",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
      booksCount: 9,
    },
    {
      authorName: "F. Scott Fitzgerald",
      avatar:
        "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=200&h=200&fit=crop&crop=face",
      booksCount: 11,
    },
    {
      authorName: "Jane Austen",
      avatar:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop&crop=face",
      booksCount: 7,
    },
  ];

  const newArrivals = [
    {
      id: 14,
      title: "The Midnight Library",
      author: "Matt Haig",
      cover: "https://picsum.photos/200/320",
      year: 2020,
      genre: "Fiction, Fantasy",
      rating: 4,
      pages: 304,
      description:
        "A novel about a library that contains books that let you experience the lives you could have lived.",
    },
    {
      id: 15,
      title: "Project Hail Mary",
      author: "Andy Weir",
      cover: "https://picsum.photos/200/321",
      year: 2021,
      genre: "Science Fiction",
      rating: 5,
      pages: 476,
      description:
        "A lone astronaut must save the earth from disaster in this incredible new science-based thriller.",
    },
    {
      id: 16,
      title: "Klara and the Sun",
      author: "Kazuo Ishiguro",
      cover: "https://picsum.photos/200/322",
      year: 2021,
      genre: "Science Fiction, Literary Fiction",
      rating: 4,
      pages: 307,
      description:
        "A moving story about an artificial friend and what it means to love.",
    },
    {
      id: 17,
      title: "The Invisible Life of Addie Larue",
      author: "V.E. Schwab",
      cover: "https://picsum.photos/200/323",
      year: 2020,
      genre: "Fantasy, Historical Fiction",
      rating: 4,
      pages: 448,
      description:
        "A life no one will remember. A story you will never forget.",
    },
    {
      id: 18,
      title: "Where the Crawdads Sing",
      author: "Delia Owens",
      cover: "https://picsum.photos/200/324",
      year: 2018,
      genre: "Mystery, Literary Fiction",
      rating: 4,
      pages: 368,
      description:
        "A stunning debut about an abandoned child who raises herself in the marshes of North Carolina.",
    },
    {
      id: 19,
      title: "Educated",
      author: "Tara Westover",
      cover: "https://picsum.photos/200/325",
      year: 2018,
      genre: "Memoir, Autobiography",
      rating: 5,
      pages: 334,
      description:
        "A memoir about a young girl who, kept out of school, leaves her survivalist family and goes on to earn a PhD.",
    },
  ];

  return (
    <>
      <main id="main-books-page">
        <article className="filter-site">
          <BookFilter onFilterChange={handleFilterChange} />

          <section className="book-grid">
            <h2>Explore Books</h2>
            <input
              type="text"
              placeholder="Search by title, author, or genre"
              className="search-bar"
            />

            <ScrollableSection
              sectionTitle="Most Popular Books"
              data={books}
              component="BookCard"
              onItemClick={handleBookClick}
            />

            <ScrollableSection
              sectionTitle="New Book Arrivals"
              data={newArrivals}
              component="BookCard"
              onItemClick={handleBookClick}
            />

            <ScrollableSection
              sectionTitle="Authors"
              data={authors}
              component="AuthorCard"
              // No onItemClick for authors since they don't need the modal
            />
          </section>
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
