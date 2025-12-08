import "./book-card-styles.css";

export default function BookCard({ book, onBookClick }) {
  const handleClick = () => {
    onBookClick(book);
  };

  return (
    <article className="card" onClick={handleClick}>
      <img
        src={book.imageUrl}
        alt={`${book.title} Cover`}
      />
      <div className="book-info">
        <h2>{book.title}</h2>
        <p>{book.author}</p>
      </div>
    </article>
  );
}
