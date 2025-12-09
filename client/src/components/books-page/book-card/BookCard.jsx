import "./book-card-styles.css";
export default function BookCard({ book, onBookClick = () => {} }) {
  const handleCardClick = () => {
    onBookClick(book);
  };

  return (
    <article className="card" onClick={handleCardClick}>

      <div className="image-wrapper">
        <img
          src={book?.imageUrl}
          alt={`${book?.title} Cover`}
        />

      </div>
      
  
      <div className="book-info">
      
        <h2 className="book-title">{book?.title}</h2>
        <p className="book-author">{book?.author}</p>
      </div>

    </article>
  );
}
