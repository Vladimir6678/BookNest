import "./authors-styles.css";

export default function Authors({ authorName, avatar, booksCount }) {
  return (
    <div className="author-card">
      <div className="avatar-container">
        <img src={avatar} alt={authorName} className="author-avatar" />
        <div className="avatar-hover-effect"></div>
      </div>
      <div className="author-info">
        <h3 className="author-name">{authorName}</h3>
        {booksCount && <span className="books-count">{booksCount} books</span>}
      </div>
    </div>
  );
}
