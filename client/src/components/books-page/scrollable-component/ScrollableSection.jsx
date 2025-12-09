import BookCard from "../book-card/BookCard";
import Authors from "../author-component/Author";
import "./scrollable-section-styles.css";
import { useRef, useState } from "react";

export default function ScrollableSection({
  sectionTitle,
  data,
  component = "BookCard",
  onItemClick,
  wishlist,
  onToggleWishlist,
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

  const renderItem = (item) => {
    switch (component) {
      case "BookCard":
        return (
          <BookCard
            key={item._id}
            book={item}
            onClick={() => onItemClick(item)}
            wishlist={wishlist}
            onToggleWishlist={onToggleWishlist}
          />
        );
      default:
        return <BookCard key={item._id} book={item} onBookClick={onItemClick} />;
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
        {data.map((item) => renderItem(item))}
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
