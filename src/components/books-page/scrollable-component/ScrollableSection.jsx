import BookCard from "../book-card/BookCard";
import Authors from "../author-component/Author";
import "./scrollable-section-styles.css";
import { useRef, useState } from "react";

export default function ScrollableSection({
  sectionTitle,
  data,
  component = "BookCard",
  onItemClick,
}) {
  const scrollContainerRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

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

  const renderItem = (item, index) => {
    switch (component) {
      case "BookCard":
        return <BookCard key={index} book={item} onBookClick={onItemClick} />;
      case "AuthorCard":
        return (
          <Authors
            key={index}
            authorName={item.authorName}
            avatar={item.avatar}
            booksCount={item.booksCount}
          />
        );
      default:
        return <BookCard key={index} book={item} onBookClick={onItemClick} />;
    }
  };

  return (
    <div
      className={sectionTitle.split(" ").join("-").toLowerCase()}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <h2 className="section-title">{sectionTitle}</h2>
      <div className="scrollable-section" ref={scrollContainerRef}>
        {data.map((item, index) => renderItem(item, index))}
      </div>

      <button
        className={`scroll-button scroll-left ${isHovering ? "visible" : ""}`}
        onClick={scrollLeft}
        aria-label="Scroll left"
      >
        ←
      </button>

      <button
        className={`scroll-button scroll-right ${isHovering ? "visible" : ""}`}
        onClick={scrollRight}
        aria-label="Scroll right"
      >
        →
      </button>
    </div>
  );
}
